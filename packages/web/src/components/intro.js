import styled from 'styled-components';
import React from 'react';
import Container from './container';
import Mapmarker from '../assets/mapmarker.svg';
import Headphone from '../assets/headphones.svg';
import AccountVoice from '../assets/account-voice.svg';
import Wikipedia from '../assets/wikipedia.svg';
import Plus from '../assets/plus.svg';
import Equal from '../assets/equal.svg';
import { StaticImage } from 'gatsby-plugin-image';

const Headline = styled.h1`
  font-size: 82px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 900;
  margin-top: 0;
  color: #1f4ea1;
  margin-bottom: 80px;
  text-align: center;
`;

const IntroWrapper = styled.div`
  background: #fdfdfd;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 100px);
  position: relative;
  justify-content: center;
`;

const Facts = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  svg * {
    fill: #999;
    text-shadow: 1px 1px 0 5px #fff;
  }
  svg {
    width: 48px;
    height: 48px;
  }

  .symbol {
    display: flex;

    display: none !important;
    align-self: center;

    * {
      fill: #1f4ea1;
    }
  }

  strong {
    color: #1f4ea1;
    font-weight: 600;
  }
`;

const Fact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 32px;
  padding: 0 30px;
  svg,
  img {
    width: 96px;
    height: 96px;
  }

  font-weight: 500;

  svg * {
    fill: #1f4ea1;
    max-height: 80px;
    text-shadow: 1px 1px 0 5px #fff;
  }

  .title {
    color: #1f4ea1;
    text-transform: uppercase;
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: 300;
    font-family: 'Work Sans', sans-serif;
  }

  .image {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .description {
    font-size: 20px;
    line-height: 42px;
    color: #666;
    font-family: 'Work Sans', sans-serif;
  }

  a {
    color: #1f4ea1;
  }
`;

const Intro = () => {
  return (
    <IntroWrapper>
      <Container>
        <Headline>
          So funktioniert der
          <br />
          Wiki Tour Guide
        </Headline>
        <Facts>
          <Fact>
            <div className={'image'}>
              <Mapmarker width={96} height={96} />
            </div>
            <div className={'title'}>Dein Standort</div>
            <div className={'description'}>
              <strong>Wiki Tour Guide</strong> analysiert Deine Umgebung und
              findet interessante Artikel, Sehenswürdigkeiten oder Geschichten
              aus Wikipedia.
            </div>
          </Fact>
          <div className={'symbol'}>
            <Plus></Plus>
          </div>
          <Fact>
            <div className={'image'}>
              <Wikipedia width={96} height={96} />
            </div>
            <div className={'title'}>Artikel in nähe Nähe</div>
            <div className={'description'}>
              Wir analysieren jeden Artikel und filtern alle nicht relevanten
              Informationen für Dich automatisch heraus.
            </div>
          </Fact>
          <div className={'symbol'}>
            <Plus></Plus>
          </div>
          <Fact>
            <div className={'image'}>
              <AccountVoice width={96} height={96} />
            </div>
            <div className={'title'}>Sprachassistent</div>
            <div className={'description'}>
              Jeder Artikel in deiner Nähe wird Dir von unserem intelligentem
              Sprachassistent mit{' '}
              <a
                href={'https://en.wikipedia.org/wiki/WaveNet'}
                target={'_blank'}
              >
                WaveNet
              </a>{' '}
              Technologie vorgelesen.
            </div>
          </Fact>
          <div className={'symbol'}>
            <Equal></Equal>
          </div>
          {/*<Fact>
            <div className={'image'}>
              <StaticImage
                src={'../images/icon.png'}
                placeholder={'blurred'}
                width={72}
                height={72}
              />
            </div>
            <div className={'title'}>Wiki Tour Guide</div>
            <div className={'description'}>
              Das ist das <strong className={'hearts'}>&hearts;</strong> von Wiki Tour Guide! <br/> Warum probierst Du ihn nicht gleich, kostenlos und ohne Registrierung, auf dieser Seite aus?
            </div>
          </Fact>*/}
        </Facts>
      </Container>
    </IntroWrapper>
  );
};
export default Intro;
