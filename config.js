module.exports = {
  prismic: {
    apiUrl: 'https://nerdscompanytest.prismic.io/api',
    linkResolver(doc, ctx) {
      return '/';
    }
  },
  pages: [
    {
      id: 'homepage',
      template: 'homepage',
      elements: [
        {
          id: 'title',
          structuredText: false
        },
        {
          id: 'intro',
          structuredText: true
        },
        {
          id: 'intro-picture',
          image: true
        },
      ],
    }
  ]
};
