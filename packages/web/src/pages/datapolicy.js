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
import { Datapolicy } from '../components/datapolicy';

// styles
const pageStyles = {
  padding: 0,
  margin: 0,
  color: '#232129',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

// markup
const DataPolicyPage = () => {
  return (
    <Layout>
      <main style={pageStyles}>
        <title>Home</title>
        <Navbar />
        <Datapolicy />
        <Footer />
      </main>
    </Layout>
  );
};

export default DataPolicyPage;
