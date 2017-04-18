const Prismic = require('prismic.io');
const Handlebars = require('handlebars');
const fs = require('fs');

// Template
const template = fs.readFileSync('./templates/test.hbs', 'utf8');

Prismic.api('https://nerdscompanytest.prismic.io/api')
.then((api) => {
  return api.query([
    Prismic.Predicates.at('document.type', 'blog-post')
  ]);
})
.then((response) => {
  const data = {};

  data.content = response.results[0].getStructuredText('blog-post.content').asHtml();

  const compiledTemplate = Handlebars.compile(template);
  console.log(compiledTemplate(data));
})
.catch(console.error);
