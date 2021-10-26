import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { Headline, HeadlineSmall } from './banner';

const FooterWrapper = styled.div`
  border-top: 2px solid #ccc;
  padding: 40px 120px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: space-between;
 .logo-image {
   display: block;
 } 
  
  ${HeadlineSmall} {
    text-align: center;
    color: #999;
    font-weight: 400;
    margin-bottom: 10px;
    font-size: 24px;
  }
  
  .links {
    text-align: right;
    display: flex;
    flex-direction: column;
  }
  
  .links-left {
    align-items: flex-start;
    margin-right: 50px; 
  }
  
  .links-right {
    align-items: flex-end;
    margin-left: 50px;
  }
  
  .links ${HeadlineSmall} {
    margin-bottom: 40px;
    border-bottom: 4px dotted #ddd;
  }

  .links ${HeadlineSmall}:hover {
    color: #0a3b79;
    cursor: pointer;
    border-color: #0a3b79;
  }
}
`;

const Footer = () => {
  return (
    <>
      <FooterWrapper>
        <div className={'links links-left'}>
          <HeadlineSmall>
            <a
              href={
                'https://play.google.com/store/apps/details?id=org.wikitourguide.app'
              }
            >
              Für Android im PlayStore
            </a>
          </HeadlineSmall>
          <HeadlineSmall>
            <a href={'/datapolicy'}>Datenschutz</a>
          </HeadlineSmall>
          {/*<HeadlineSmall>Source Code</HeadlineSmall>*/}
        </div>
        <StaticImage
          className={'logo-image'}
          src="../assets/wtg_blue.png"
          alt="App Logo"
          quality={100}
          width={512}
          height={512}
        />
        <div className={'links links-right'}>
          <HeadlineSmall>
            <a
              href={'https://apps.apple.com/de/app/wikitourguide/id1587761365'}
            >
              Für iOS im App Store
            </a>
          </HeadlineSmall>
          <HeadlineSmall>
            <a href={'/imprint'}>Impressum</a>
          </HeadlineSmall>
        </div>
      </FooterWrapper>
    </>
  );
};
export default Footer;
