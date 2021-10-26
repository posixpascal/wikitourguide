import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';
import { BannerWrapper, Headline } from './banner';
import lottie from 'lottie-web';
import animation from '../assets/synth.animation.json';
import voice from '../assets/voice.json';

const SynthWrapper = styled.div`
  text-align: center;
  font-size: 64px;
  color: #fff;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 100px);
  position: relative;
  justify-content: center;
  width: 100%;
  flex-direction: column;

  .flags {
    margin-top: 40px;
    display: flex;
    span {
      padding: 0 20px;
    }
  }

  .animation-container2 {
    position: absolute;
    bottom: 80px;
    left: 0;
    pointer-events: none;
    right: 0;
    top: 0;

    opacity: 0.2;
  }

  button {
    border: 1px solid #fff;
    padding: 20px 60px;
    font-size: 52px;
    background: none;
    color: #fff;
    border-radius: 16px;
    cursor: pointer;
    &:hover {
      background-color: #fff;
      color: #1f4ea1;
    }
  }

  .flex {
    display: flex;
    position: relative;
  }

  .animation-container2 {
    position: absolute;
    top: -150px;
    height: 100%;
    z-index: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.4;
  }

  ${Headline} {
    margin-bottom: 120px;
    z-index: 2;
  }

  button {
    border: 1px solid #fff;
    padding: 20px 60px;
    background-color: transparent;
    font-size: 52px;
    color: #fff;
    border-radius: 16px;
    transition: background 0.2s ease-in-out, padding-right 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: #f1f1f1;
      color: #1f4ea1;
      padding-right: 120px;
      & ~ .animation-container {
        opacity: 1;
      }
    }
  }

  .animation-container {
    height: 115px;
    opacity: 0;
    pointer-events: none;
    transition: opacity ease-in-out 0.3s;
    position: absolute;
    right: 20px;
  }

  .flags-soon {
    font-size: 24px;
    color: #ccc;
  }

  .flags span {
    cursor: pointer;
  }
`;

const Synth = () => {
  let animationContainer = createRef();
  let animationContainer2 = createRef();
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer2.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animation,
    });

    return () => anim.destroy();
  }, [animationContainer]);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: voice,
    });

    return () => anim.destroy();
  }, [animationContainer]);

  const listen = (lang) => {
    const audio = new Audio(
      require('../assets/sounds/intro_' + lang + '.mp3').default,
    );
    audio.play();
  };

  return (
    <>
      <BannerWrapper>
        <SynthWrapper>
          <Headline>
            Die neueste Generation
            <br />
            der Sprachsynthese
          </Headline>
          <div className={'animation-container2'} ref={animationContainer2} />
          <div className={'flex'}>
            <button onClick={() => listen('de')}>Jetzt anhören</button>
            <div className={'animation-container'} ref={animationContainer} />
          </div>
          <div className={'flags'}>
            <span onClick={() => listen('de')}> 🇩🇪 </span>
            <span onClick={() => listen('en')}> 🏴󠁧󠁢󠁥󠁮󠁧󠁿 </span>
          </div>
          <div className={'flags-soon'}>
            <span className={'soon'}> 🇮🇹 bald verfügbar</span>
            <br />
            <span className={'soon'}> 🇪🇸 bald verfügbar</span>
            <br />
            <span className={'soon'}> 🇫🇷 bald verfügbar</span>
            <br />
          </div>
        </SynthWrapper>
      </BannerWrapper>
    </>
  );
};
export default Synth;
