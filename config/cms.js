module.exports = {
  cms: 'contentful',
  apiUrl: 'https://nerdscompanytest.prismic.io/api',
  linkResolver(doc, ctx) {
    return '/';
  }
}
