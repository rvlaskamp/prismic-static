const prismic = require('./prismic');
const config = require('./config');

const prismicApi = new prismic(config.prismic);

// Connect to the Prismic.io API server
prismicApi.connect()
.then((api) => {
  // Parse the pages
  const pages = config.pages;

  pages.map((page) => {
    prismicApi.queryByType(page.id)
    .then((document) => {
      // Handlebars template data
      const templateData = {};
      // Get the document elements
    })
  });
})
.catch((error) => {
  console.error(error);
});
