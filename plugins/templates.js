/**
  * Templates module
  * This module is responsible to parse templates
  * Handlebars is used to parse the templates
  */

// Module dependencies
const fs = require('fs');
const handlebars = require('handlebars');

function searchTemplatesAsync(path, folder) {
  return new Promise((resolve, reject) => {
    if (folder) {
      fs.readdir(path, (err, templates) => {
        if (err) return reject(err);
        resolve(templates);
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
