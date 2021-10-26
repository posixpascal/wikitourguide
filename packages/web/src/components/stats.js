import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';
import lottie from 'lottie-web';
import animation from '../assets/animation.json';

export const Headline = styled.div`
  font-size: 82px;
  color: #1f4ea1;
  font-family: 'Work Sans', sans-serif;
  font-weight: 600;
  text-align: center;
  margin-bottom: 60px;
`;

const StatPoints = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StatPoint = styled.div`
  text-align: center;
  font-family: 'Work Sans', sans-serif;
  padding: 0 20px;

  .number {
    font-size: 48px;
  }

  .description {
    font-size: 32px;
    color: #0a3b79;
  }
`;

export const StatsSection = styled.div`
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 100px);
  position: relative;
  justify-content: center;
  flex-direction: row;

  .animation-container {
    height: 240px;
  }
`;

const Stats = () => {
  let animationContainer = createRef();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animation,
    });

    return () => anim.destroy();
  }, [animationContainer]);

  return (
    <StatsSection>
      <div>
        <div>
          <div className={'animation-container'} ref={animationContainer} />
        </div>
        <Headline>Das klingt nach Musik:</Headline>
        <StatPoints>
          <StatPoint>
            <div className={'number'}>&gt; 700,000</div>
            <div className={'description'}>🇩🇪 deu. Artikel</div>
          </StatPoint>
          <StatPoint>
            <div className={'number'}>&gt; 2,400,000</div>
            <div className={'description'}>🏴󠁧󠁢󠁥󠁮󠁧󠁿 engl. Artikel</div>
          </StatPoint>
          <StatPoint>
            <div className={'number'}>14</div>
            <div className={'description'}>🐡 Sprachen</div>
          </StatPoint>
        </StatPoints>
      </div>
    </StatsSection>
  );
};
export default Stats;
