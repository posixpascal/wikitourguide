import { Inject, Injectable, Logger } from '@nestjs/common';
import textToSpeech from '@google-cloud/text-to-speech';
import { google } from '@google-cloud/text-to-speech/build/protos/protos';
import { InjectModel } from '@nestjs/mongoose';
import { PageDe, PageDeDocument } from '../database/schemas/page-de.schema';
import { Model } from 'mongoose';
import { PageEn, PageEnDocument } from '../database/schemas/page-en.schema';
import { SUPPORTED_LANGUAGES } from '../runtime.config';
import { VOICES } from './voices';
import {
  SynthArticle,
  SynthArticleDocument,
} from '../database/schemas/synth-article.schema';
import * as AWS from 'aws-sdk';
import AudioEncoding = google.cloud.texttospeech.v1.AudioEncoding;
import ISynthesizeSpeechResponse = google.cloud.texttospeech.v1.ISynthesizeSpeechResponse;
import { ConfigService } from '@nestjs/config';
import TimepointType = google.cloud.texttospeech.v1beta1.SynthesizeSpeechRequest.TimepointType;

const TextToSpeechClient = textToSpeech.v1beta1.TextToSpeechClient;

export const slugify = (...args: (string | number)[]): string => {
  const value = args.join(' ');

  return value
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-'); // separator
};

type Language = typeof SUPPORTED_LANGUAGES[number];
type LanguageMapping<T> = Record<Language, T>;

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  './wikitourguide-6730edca35f3.json';

const MAX_WORDS = 5000;

const sectionSSML = (
  section: { title: string; text: string; index: number; children: any[] },
  n = 0,
) => {
  const children = section.children
    ? section.children.map(() => sectionSSML(section, n + 1))
    : '';

  const title = section.title;
  const text = (section.text || '')
    .split(' ')
    .map((word, index) => `<mark name="${n++}" /> ${word}`)
    .reduce((acc, cur) => {
      const exceedsTotalCount =
        title.length + acc.join(' ').length + cur.length + 100 >= MAX_WORDS;
      if (exceedsTotalCount) {
        return [...acc];
      }
      return [...acc, cur];
    }, [])
    .join(' ');

  return `<speak>
<mark name="${n++}" />
${title}...
 
<break time="0.4s" strength="x-strong"/>

${text}.

</speak>`;
};

@Injectable()
export class SynthesizerService {
  #logger = new Logger(SynthesizerService.name);
  #tts = new TextToSpeechClient();

  constructor(
    @InjectModel(PageDe.name) private pagesDeModel: Model<PageDeDocument>,
    @InjectModel(PageEn.name) private pagesEnModel: Model<PageEnDocument>,
    @InjectModel(SynthArticle.name)
    private synthArticleModel: Model<SynthArticleDocument>,
    private configService: ConfigService,
    @Inject('S3Client') private s3Client: AWS.S3,
  ) {}

  async create({
    pageID,
    lang,
    voice,
  }: {
    pageID: string;
    lang: Language;
    voice: string;
  }) {
    this.#logger.log(
      `Creating synth article for ${pageID} in ${lang} using voice ${voice}`,
    );
    const pageModel = lang === 'de' ? this.pagesDeModel : this.pagesEnModel;
    const page = await pageModel
      .findOne({
        pageID,
      })
      .exec();

    page.sections.unshift({
      title: page.title,
      text: page.summary,
    });

    const responses: {
      title: string;
      text: string;
      ssml: string;
      response: ISynthesizeSpeechResponse & { timepoints: any[] };
    }[] = await Promise.all(
      page.sections.map(async (section) => {
        const ssml = sectionSSML(section); //.substr(0, 5000);

        return {
          ssml,
          title: section.title || 'Einführung',
          text: section.text,
          response: await this.perform({
            lang,
            voice,
            ssml,
          }),
        };
      }),
    );

    this.#logger.log(
      `Generated ${responses.length} audio segments for ${pageID}`,
    );

    const segments = await Promise.all(
      responses.map(async (segment, index) => {
        const url = `article-audio/${lang}/${pageID}/${voice}/${index}_${slugify(
          segment.title,
        )}-v1.mp3`;

        // Uplodas the synthesized text to digitalocean spaces using s3-compliant api.
        await this.upload(url, segment);

        this.#logger.log(`Uploaded audio segment for ${pageID}: ${url}`);
        return {
          title: segment.title,
          text: segment.text,
          url: 'https://cdn.wikitour.guide/' + url,
          ssml: segment.ssml,
          timePoints: segment.response.timepoints,
        };
      }),
    );

    if (!page.voiceDurations) {
      page.voiceDurations = {};
    }

    if (voice !== 'OnDeviceSynth') {
      page.voiceDurations[lang] = segments.reduce((cur, acc) => {
        return cur + acc.timePoints[acc.timePoints.length - 1].timeSeconds;
      }, 0);
    }

    await page.save();

    const article = new this.synthArticleModel();
    article.segments = segments;
    article.pageID = pageID;
    article.lang = lang;
    article.voice = voice;
    await article.save();

    return article;
  }

  private async perform(options: {
    lang: Language;
    voice: string;
    ssml: string;
  }) {
    const languageCodes: LanguageMapping<string> = {
      de: 'de-DE',
      en: 'en-EN',
    };

    if (options.voice === 'OnDeviceSynth'){
      // Mock response as we're doing tts on the device instead
      return {
        timepoints: []
      }
    }

    // Construct the request
    const request = {
      input: { ssml: options.ssml },
      voice: { languageCode: languageCodes[options.lang], name: options.voice },
      audioConfig: { audioEncoding: AudioEncoding.MP3 },
      enableTimePointing: [TimepointType.SSML_MARK],
    };

    // Performs the text-to-speech request
    const [response, _request] = await this.#tts.synthesizeSpeech(request);
    return response;
  }

  protected upload(url: string, segment) {
    return new Promise((resolve, reject) => {
      // upload the file:
      this.s3Client.upload(
        {
          Bucket: this.configService.get('SPACES_NAME'),
          Key: url,
          Body: segment.response.audioContent,
          ACL: 'public-read',
          Metadata: {
            'x-time-points': JSON.stringify(segment.response.timepoints),
          },
        },
        (err, data) => {
          if (err) {
            this.#logger.error(err.message);
            return reject(err);
          }
          resolve(url);
        },
      );
    });
  }
}
