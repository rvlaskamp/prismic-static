const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const frontmatter = require('yaml-front-matter');

const prismic = require('./prismic');
const prismicApi = new prismic();

// Connect to the Prismic.io API server
prismicApi.connect()
.then((api) => {
  const templateDir = path.resolve(__dirname, 'templates', 'pages');
  // Get templates
  fs.readdir(templateDir, (err, templates) => {
    templates.forEach(file => {
      const filePath = path.resolve(__dirname, 'templates', 'pages', file);
      const srcPath = path.resolve(__dirname, 'src','pages', file.replace('.hbs', '.html'));
      fs.readFile(filePath, 'utf8', (err, template) => {
        const content = frontmatter.loadFront(template);
        const fields = content.prismic.document.fields;
        const templateCompile = Handlebars.compile(content.__content);
        const templateData = {};
        // Query document type
        prismicApi.queryByType(content.prismic.document.type)
        .then((document) => {

          const documentResult = document.results[0];

          if (fields.length > 0) {
            fields.forEach(field => {
              //Create field id
              const id = `${content.prismic.document.type}.${field.id}`;

              switch (field.type) {
                case 'text':
                  // Render field als plain text
                  templateData[field.id] = {
                    content: documentResult.getText(id)
                  };
                  break;
                case 'richText':
                  templateData[field.id] = {
                    content: documentResult.getStructuredText(id).asHtml()
                  };
                  break;
                case 'image':
                  templateData[field.id] = {
                    url: documentResult.getImage(id).url
                  };
                  break;
              }
            });

            const html = templateCompile(templateData);

            fs.writeFile(srcPath, html, 'utf8', (err) => {
              if (err) throw err;
              console.log('file is saved');
            });

          }
        });
      });
    });
  });
})
.catch((error) => {
  console.error(error);
});
