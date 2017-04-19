const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const frontmatter = require('yaml-front-matter');

const templateDir = path.resolve(__dirname, 'templates', 'pages');

// Get templates
fs.readdir(templateDir, (err, templates) => {
  templates.forEach(file => {
    const filePath = path.resolve(__dirname, 'templates', 'pages', file);
    fs.readFile(filePath, 'utf8', (err, template) => {
      const content = frontmatter.loadFront(template);


    });
  });
});
