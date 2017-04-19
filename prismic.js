const Prismic = require('prismic.io');

const Api = function PrismicApi(config) {
  this.apiUrl = config.apiUrl;
  this.linkResolver = config.linkResolver;
  this.api = {};
}

Api.prototype.connect = function connect() {
  return Prismic.api(this.apiUrl)
  .then((api) => {
    this.api = api;
    return api;
  });
}

Api.prototype.queryAll = function queryAll() {
  return this.api.then((api) => {
    return api.query('');
  });
}

Api.prototype.queryByType = function queryByType(type) {
  return this.api.query(
    Prismic.Predicates.at('document.type', type)
  );
}

module.exports = Api;

/*

// Connect to the Prismic API server
Prismic.api(config.prismic.apiUrl)
.then((api) => {
  return api.query([
    Prismic.Predicates.at('document.type', 'blog-post')
  ]);
})
.then((response) => {
  const templateData = {
    content = response.results[0].getStructuredText('blog-post.content').asHtml()
  };

  const compiledTemplate = Handlebars.compile(templateData);
  console.log(compiledTemplate(data));
})
.catch(console.error);

*/
