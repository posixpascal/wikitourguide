import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BannerWrapper, Headline } from './banner';
import lottie from 'lottie-web';
import animation from '../assets/radar.json';
import axios from 'axios';

const NearbyWrapper = styled.div`
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

  .animation-container {
    position: absolute;
    bottom: 30px;
    left: 0;
    pointer-events: none;
    right: 0;
    top: 30px;

    opacity: 0.2;
    z-index: 0;
  }

  .animation-container.upfront {
    z-index: 20 !important;
    opacity: 1 !important;
  }

  .alts {
    max-width: 850px;
    margin: 30px auto;
    text-align: center;
  }

  button.preset-btn {
    border: none;
    background: transparent;
    color: #fff;
    text-transform: uppercase;
    margin: 5px;
    padding: 4px 18px !important;
  }

  .alternatives,
  .alternatives-2,
  .alternatives-3 {
    margin: 20px 0 0;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    text-transform: uppercase;
  }

  .alternatives-2 {
    font-size: 20px;
  }

  .alternatives button.preset-btn {
    font-size: 30px;
  }

  button.preset-btn:hover {
    background-color: #0d96f2;
    border-radius: 8px;
    cursor: pointer;
  }

  .alternatives-2 button.preset-btn {
    font-size: 20px;
  }

  .alternatives-3 {
    font-size: 12px;
  }

  .special {
    color: #0a3b79;
    text-transform: uppercase;
    border-bottom: 1px dotted #0a3b79;
  }

  button.cta {
    border: 1px solid #fff;
    padding: 20px 60px;
    font-size: 52px;
    background: none;
    color: #fff;
    border-radius: 16px;
    cursor: pointer;
    z-index: 2;

    &:hover {
      background-color: #fff;
      color: #1f4ea1;
    }
  }

  .cards {
    display: flex;
    overflow: auto;
    width: 100%;
    margin-bottom: 60px;
  }

  .cards .card {
    min-width: 420px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .cards .card img {
    display: none;
  }

  .cards .card .title {
    color: #222;
    font-size: 24px;
    border-bottom: 1px solid #ccc;
    padding: 12px;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }

  .cards .card .content {
    max-height: 200px;
    overflow: auto;
    color: #333;
    font-size: 16px;
    text-align: left;
    padding: 20px;
    line-height: 32px;
  }

  .cards .card .download {
    background-color: #1f4ea1;
    color: #fff;
    font-size: 16px;
    display: flex;
    padding: 20px 40px;
    text-align: center;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 4px 4px;
  }

  ${Headline} {
    margin-bottom: 120px;
    z-index: 2;
  }
`;

const Nearby = () => {
  let [articles, setArticles] = useState([]);
  let [isSearching, setSearching] = useState(false);
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

  const fetchLocation = async (coords) => {
    const { data } = await axios.get(
      `/api/wikipedia/coords?lang=de&lat=${coords.latitude}&lng=${coords.longitude}`,
    );
    setArticles(data);
    setSearching(false);
  };

  const fetchPreset = async (locationName) => {
    setSearching(true);
    await fetchLocation(LocationMap[locationName]);
  };

  const discoverNearby = () => {
    setSearching(true);
    navigator.geolocation.getCurrentPosition(async function (location) {
      await fetchLocation(location.coords);
    });
  };

  const renderAlts = () => (
    <div className={'alts'}>
      <div className={'alternatives'}>
        <button className="preset-btn" onClick={() => fetchPreset('Paris')}>
          Paris
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Berlin')}>
          Berlin
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Barcelona')}>
          Barcelona
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Tokyo')}>
          Tokyo
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Moskau')}>
          Moskau
        </button>
      </div>
      <div className={'alternatives-2'}>
        <button className="preset-btn" onClick={() => fetchPreset('Erfurt')}>
          Erfurt
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Dresden')}>
          Dresden
        </button>{' '}
        <button
          className="preset-btn"
          onClick={() => fetchPreset('Leverkusen')}
        >
          Leverkusen
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Selters')}>
          Selters
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Leipzig')}>
          Leipzig
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Bremen')}>
          Bremen
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Hamburg')}>
          Hamburg
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Hamburg')}>
          Frankfurt am Main
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Potsdam')}>
          Potsdam
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Hannover')}>
          Hannover
        </button>
      </div>
      <div className={'alternatives-3'}>
        <button
          className="preset-btn"
          onClick={() => fetchPreset('Düsseldorf')}
        >
          Düsseldorf
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Nürnberg')}>
          Nürnberg
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Bochum')}>
          Bochum
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Wuppertal')}>
          Wuppertal
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Mannheim')}>
          Mannheim
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Halle')}>
          Halle
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Magdeburg')}>
          Magdeburg
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Lübeck')}>
          Lübeck
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Kassel')}>
          Kassel
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Bonn')}>
          Bonn
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Münster')}>
          Münster
        </button>{' '}
        <button
          className="preset-btn"
          onClick={() => fetchPreset('Saarbrücken')}
        >
          Saarbrücken
        </button>
        <button
          className="preset-btn"
          onClick={() => fetchPreset('Regensburg')}
        >
          Regensburg
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Thüringen')}>
          Thüringen
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Jena')}>
          Jena
        </button>{' '}
        <button
          className="preset-btn"
          onClick={() => fetchPreset('Heidelberg')}
        >
          Heidelberg
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Aachen')}>
          Aachen
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Bielefeld')}>
          Bielefeld
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Essen')}>
          Essen
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Wiesbaden')}>
          Wiesbaden
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Mainz')}>
          Mainz
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Kiel')}>
          Kiel
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('München')}>
          München
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Stuttgart')}>
          Stuttgart
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Wolfsburg')}>
          Wolfsburg
        </button>
        <button className="preset-btn" onClick={() => fetchPreset('Köln')}>
          Köln
        </button>{' '}
        <button className="preset-btn" onClick={() => fetchPreset('Dortmund')}>
          Dortmund
        </button>
      </div>
    </div>
  );

  if (articles.length) {
    return (
      <BannerWrapper key={2}>
        <NearbyWrapper>
          <Headline>Das habe ich gefunden:</Headline>

          <div className={'cards'}>
            {articles
              .filter((article) => article.sections.length > 0)
              .map((article) => (
                <div className={'card'} key={article.pageID}>
                  {article.images.length ? (
                    <img src={article.images[0].url} />
                  ) : (
                    <></>
                  )}
                  <div className={'title'}>{article.title}</div>
                  <p className={'content'}>
                    {article.sections[0]
                      ? article.sections[0].text
                      : 'Kein Inhalt vorhanden'}
                  </p>
                  <a
                    className={'download'}
                    target="_blank"
                    href={
                      'https://play.google.com/store/apps/details?id=org.wikitourguide.app'
                    }
                  >
                    Jetzt anhören
                  </a>
                </div>
              ))}
          </div>

          <button className="cta" onClick={discoverNearby}>
            Zeig mir Artikel in meiner Nähe
          </button>
          {renderAlts()}
        </NearbyWrapper>
      </BannerWrapper>
    );
  }

  return (
    <BannerWrapper key={1}>
      <NearbyWrapper>
        <Headline>Wissen was um dich herum passiert</Headline>
        <div
          className={'animation-container ' + (isSearching ? ' upfront' : '')}
          ref={animationContainer}
        />
        <button className="cta" onClick={discoverNearby}>
          Zeig mir Artikel in meiner Nähe
        </button>
        {renderAlts()}
      </NearbyWrapper>
    </BannerWrapper>
  );
};
export default Nearby;

const LocationMap = {
  Paris: {
    latitude: 48.856666666667,
    longitude: 2.351667,
  },
  Berlin: {
    latitude: 52.518611,
    longitude: 13.408333,
  },
  Barcelona: {
    latitude: 41.4,
    longitude: 2.166667,
  },
  Tokyo: {
    latitude: 35.683889,
    longitude: 139.774444,
  },
  Moskau: {
    latitude: 55.75,
    longitude: 37.616667,
  },
  Erfurt: {
    latitude: 50.978056,
    longitude: 11.029167,
  },
  Dresden: {
    latitude: 51.049259,
    longitude: 13.73836,
  },
  Leverkusen: {
    latitude: 51.033333,
    longitude: 6.983333,
  },
  Selters: {
    latitude: 50.529053,
    longitude: 7.754554,
  },
  Leipzig: {
    latitude: 51.340333,
    longitude: 12.37475,
  },
  Bremen: {
    latitude: 53.075878,
    longitude: 8.807311,
  },
  Hamburg: {
    latitude: 53.550556,
    longitude: 9.993333,
  },
  'Frankfurt am Main': {
    latitude: 50.110556,
    longitude: 8.682222,
  },
  Potsdam: {
    latitude: 52.395833,
    longitude: 13.061389,
  },
  Hannover: {
    latitude: 52.374444,
    longitude: 9.738611,
  },
  Düsseldorf: {
    latitude: 51.225556,
    longitude: 6.782778,
  },
  Nürnberg: {
    latitude: 49.455556,
    longitude: 11.078611,
  },
  Bochum: {
    latitude: 51.48012,
    longitude: 7.21662,
  },
  Wuppertal: {
    latitude: 51.256176,
    longitude: 7.150829,
  },
  Mannheim: {
    latitude: 49.48776,
    longitude: 8.46622,
  },
  Halle: {
    latitude: 51.482778,
    longitude: 11.97,
  },
  Magdeburg: {
    latitude: 52.133333,
    longitude: 11.616667,
  },
  Lübeck: {
    latitude: 53.866111,
    longitude: 10.683889,
  },
  Kassel: {
    latitude: 51.316667,
    longitude: 9.5,
  },
  Bonn: {
    latitude: 50.733992,
    longitude: 7.099814,
  },
  Münster: {
    latitude: 51.962944,
    longitude: 7.628694,
  },
  Saarbrücken: {
    latitude: 49.23265,
    longitude: 6.99619,
  },
  Regensburg: {
    latitude: 49.017222,
    longitude: 12.096944,
  },
  Thüringen: {
    latitude: 50.861444,
    longitude: 11.052246,
  },
  Jena: {
    latitude: 50.927206,
    longitude: 11.586361,
  },
  Heidelberg: {
    latitude: 49.41032,
    longitude: 8.69707,
  },
  Aachen: {
    latitude: 50.776667,
    longitude: 6.083611,
  },
  Bielefeld: {
    latitude: 52.02182,
    longitude: 8.53509,
  },
  Essen: {
    latitude: 51.458069,
    longitude: 7.014761,
  },
  Wiesbaden: {
    latitude: 50.0825,
    longitude: 8.24,
  },
  Mainz: {
    latitude: 50,
    longitude: 8.271111,
  },
  Kiel: {
    latitude: 54.32321,
    longitude: 10.14019,
  },
  München: {
    latitude: 48.137222,
    longitude: 11.575556,
  },
  Stuttgart: {
    latitude: 48.775556,
    longitude: 9.182778,
  },
  Wolfsburg: {
    latitude: 52.423056,
    longitude: 10.787222,
  },
  Köln: {
    latitude: 50.938056,
    longitude: 6.956944,
  },
  Dortmund: {
    latitude: 51.514167,
    longitude: 7.463889,
  },
};
