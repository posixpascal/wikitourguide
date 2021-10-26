// Imports the Google Cloud client library
process.env.GOOGLE_APPLICATION_CREDENTIALS =
    './packages/api/wikitourguide-6730edca35f3.json';
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {
  // The text to synthesize
  const text = fs.readFileSync(0, 'utf-8');

  // Construct the request
  const request = {
    input: { ssml: '<speak>' + text + '</speak>' },
    voice: {
      languageCode: 'de-DE',
      ssmlGender: 'MALE',
      name: 'de-DE-Wavenet-B',
    },
    audioConfig: { audioEncoding: 'MP3' },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  process.stdout.write(response.audioContent);
}
quickStart();
