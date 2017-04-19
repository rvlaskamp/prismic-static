module.exports = {
  cms: 'prismic',
  apiUrl: 'https://nerdscompanytest.prismic.io/api',
  linkResolver(doc, ctx) {
    return '/';
  }
}
