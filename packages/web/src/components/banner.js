import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import Container from './container';

export const BannerWrapper = styled.nav`
  background-image: radial-gradient(50% 97%, #4585c4 0%, #1f4ea1 98%);
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 100px);
  position: relative;
  @media (max-width: 991px) {
    overflow: hidden;
    min-height: 800px;
    align-items: flex-start;
    padding-top: 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 10px;
  }

  @keyframes slideOut {
    0% {
      transform: translateX(0) scale(1);
    }

    100% {
      transform: translateX(-100px) scale(0.95);
    }
  }

  @keyframes slideOut2 {
    0% {
      transform: translateX(0) scale(1);
    }

    100% {
      transform: translateX(-200px) scale(0.85);
    }
  }

  @keyframes slideOut3 {
    0% {
      transform: translateX(0) scale(1);
    }

    100% {
      transform: translateX(-280px) scale(0.75);
    }
  }

  .phone {
    position: absolute;
    right: 0px;
  }

  .phone-1 {
    z-index: 4;
  }

  .phone-2 {
    z-index: 3;
    animation: slideOut forwards 1s;
    animation-delay: 0.5s;
  }

  .phone-3 {
    z-index: 2;
    animation: slideOut2 forwards 1s;
    animation-delay: 0.75s;
  }

  .phone-4 {
    z-index: 1;
    animation: slideOut3 forwards 1s;
    animation-delay: 1s;
  }

  ${Container} {
    display: flex;
    padding: 0 40px;
    height: 100%;
    .phones {
      width: 50%;
    }

    @media (max-width: 1440px) {
      .phone-4 {
        display: none;
      }
    }

    @media (max-width: 1200px) {
      .phone-3 {
        display: none;
      }
    }

    @media (max-width: 991px) {
      flex-direction: column;
      align-items: center;
      .phone-4,
      .phone-3 {
        display: block;
      }
    }

    .center {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      height: 100%;
      text-align: left;
    }
  }

  .dl-app {
    border: 1px solid #fff;
    color: #fff;
    padding: 20px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 32px;
    margin-right: 40px;
    &:hover {
      background: #fff;
      cursor: pointer;
      color: #1f4ea1;
    }
  }

  @media (max-width: 991px) {
    .dl-app {
      margin-bottom: 40px;
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-right: 20px;
  }

  .dl-l {
    margin: 40px 0 10px;
    color: #fff;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
  }
`;

export const HeadlineSmall = styled.div`
  font-size: 48px;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  a {
    color: currentColor;
    text-decoration: none;
    font-weight: 300;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Headline = styled.div`
  font-size: 82px;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  font-weight: 900;
  margin: 30px 0;
  text-shadow: 2px 2px 0 #0a3b79;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Banner = () => {
  return (
    <BannerWrapper>
      <Container>
        <div className={'center'}>
          <HeadlineSmall>Sag Hallo zum neuen</HeadlineSmall>
          <Headline>
            <span
              style={{
                position: 'relative',
                paddingRight: '20px',
                display: 'inline-block',
              }}
            >
              Wiki Tour Guide!
            </span>
          </Headline>
          <HeadlineSmall>
            Dein allwissender & offener{' '}
            <span style={{ fontWeight: 600 }}>Reisebegleiter</span>
          </HeadlineSmall>
          <div className={'dl-l'}>Jetzt herunterladen im:</div>
          <div className={'buttons'}>
            <a
              className="dl-app"
              href={'https://apps.apple.com/de/app/wikitourguide/id1587761365'}
            >
              Apple AppStore
            </a>
            <a
              className="dl-app"
              href={
                'https://play.google.com/store/apps/details?id=org.wikitourguide.app'
              }
            >
              Google PlayStore
            </a>
          </div>
        </div>
        <div className={'phones'}>
          <div className={'phone phone-1'}>
            <StaticImage
              src="../images/phone1.png"
              alt="App Logo"
              placeholder="blurred"
              quality={100}
              width={280}
            />
          </div>

          <div className={'phone phone-2'}>
            <StaticImage
              src="../images/phone4.png"
              alt="App Logo"
              placeholder="blurred"
              quality={100}
              width={280}
            />
          </div>

          <div className={'phone phone-3'}>
            <StaticImage
              src="../images/phone2.png"
              alt="App Logo"
              placeholder="blurred"
              quality={100}
              width={280}
            />
          </div>

          <div className={'phone phone-4'}>
            <StaticImage
              src="../images/phone3.png"
              alt="App Logo"
              placeholder="blurred"
              quality={100}
              width={280}
            />
          </div>
        </div>
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
