module.exports = {
  siteMetadata: {
    siteUrl: `https://www.wikitour.guide`,
  },
  proxy: {
    prefix: '/api',
    url: 'http://localhost:3000',
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
  ],
};
