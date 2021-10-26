import * as React from 'react';
import Navbar from '../components/navbar';
import Layout from '../components/layout';
import Footer from '../components/footer';
import { Imprint } from '../components/imprint';

// styles
const pageStyles = {
  padding: 0,
  margin: 0,
  color: '#232129',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

// markup
const ImprintPage = () => {
  return (
    <Layout>
      <main style={pageStyles}>
        <title>Home</title>
        <Navbar />
        <Imprint />
        <Footer />
      </main>
    </Layout>
  );
};

export default ImprintPage;
