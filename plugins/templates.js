/**
  * Templates module
  * This module is responsible to parse templates
  * Handlebars is used to parse the templates
  */

// Module dependencies
const fs = require('fs');
const handlebars = require('handlebars');
const frontmatter = require('yaml-front-matter');

function parseFrontMatter(content) {
  return frontmatter.loadFront(content);
}

function searchTemplatesAsync(path, folder) {
  return new Promise((resolve, reject) => {
    if (folder) {
      let parsedTemplates = [];
      fs.readdir(path, (err, templates) => {
        if (err) return reject(err);
        templates.forEach((templateFileName, index) => {
          fs.readFile(path + `/${templateFileName}`, 'utf8', (err, template) => {
            if (err) return reject(err);

            const templateFrontMatter = parseFrontMatter(template);
            parsedTemplates.push(templateFrontMatter);

            if ((index + 1) === templates.length) {
              resolve(parsedTemplates);
            }
          });
        });
      });
    } else {
      fs.readFile(path, 'utf8', (err, template) => {
        if (err) return reject(err);
        resolve(template);
      });
    }
  });
}

const templatePlugin = {
  search: searchTemplatesAsync,
}

// Export templatePlugin module
module.exports = templatePlugin;
