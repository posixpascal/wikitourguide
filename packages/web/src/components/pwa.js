import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';
import lottie from 'lottie-web';
import rocket from '../assets/rocket.json';
import cloud from '../assets/cloud.json';

export const Headline = styled.div`
  font-size: 82px;
  color: #1f4ea1;
  font-family: 'Work Sans', sans-serif;
  font-weight: 600;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
`;

export const SubHeadline = styled.div`
  text-align: center;
  font-size: 42px;
  color: #1f4ea1;
  font-family: 'Work Sans', sans-serif;
  text-align: center;
  margin-bottom: 60px;
  z-index: 2;
`;

const PwaWrapper = styled.div`
  padding: 120px 120px;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    font-weight: 300;
    border: 1px solid #1f4ea1;
    padding: 20px 60px;
    background-color: #fff;
    font-size: 52px;
    color: #1f4ea1;
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

  .flex {
    display: flex;
    position: relative;
  }

  .animation-container {
    height: 100px;
    opacity: 0;
    pointer-events: none;
    transition: opacity ease-in-out 0.3s;
    position: absolute;
    right: -30px;
  }

  .animation-container2 {
    position: absolute;
    top: -80px;
    height: 100%;
    z-index: -1;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.8;
  }

  strong {
    font-weight: 600;
  }
`;

const Pwa = () => {
  let animationContainer = createRef();
  let animationContainer2 = createRef();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: rocket,
    });

    return () => anim.destroy();
  }, [animationContainer]);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer2.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: cloud,
    });

    return () => anim.destroy();
  }, [animationContainer]);

  return (
    <PwaWrapper>
      <Headline>
        <span style={{ zIndex: 2 }}>Läuft ohne Installation</span>
      </Headline>
      <div className={'animation-container2'} ref={animationContainer2} />
      <SubHeadline>
        Wiki Tour Guide nutzt neueste Web-Technologie und funktioniert{' '}
        <strong>ohne App Installation</strong>! Du kannst ihn also einfach
        kostenlos in deinem Web Browser verwenden! Und das von{' '}
        <strong>jedem Gerät</strong> und <strong>jedem Standort</strong>.
      </SubHeadline>
      <div className={'flex'}>
        <a href={'/app/'} target={'_blank'}>
          Wiki Tour Guide testen
        </a>
        <div className={'animation-container'} ref={animationContainer} />
      </div>
    </PwaWrapper>
  );
};
export default Pwa;
