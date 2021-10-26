import * as React from 'react';
import Navbar from '../components/navbar';
import Layout from '../components/layout';
import Banner from '../components/banner';
import Intro from '../components/intro';
import Stats from '../components/stats';
import Synth from '../components/synth';
import Footer from '../components/footer';
import Nearby from '../components/nearby';
import Pwa from '../components/pwa';
import { useEffect } from 'react';

// styles
const pageStyles = {
  padding: 0,
  margin: 0,
  color: '#232129',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

// markup
const IndexPage = () => {
  useEffect(() => {
    if (window.screen.width < 991) {
      window.location.href = '/app/player';
    }
  }, []);

  return (
    <Layout>
      <main style={pageStyles}>
        <title>Home</title>
        <Navbar />
        <Banner />
        <a name={'sogehts'}></a>
        <Intro />
        <a name={'nearby'}></a>
        <Nearby></Nearby>
        <Stats />
        <a name={'tellme'}></a>
        <Synth />
        <a name={'pwa'}></a>
        <Pwa />
        <Footer />
      </main>
    </Layout>
  );
};

export default IndexPage;
