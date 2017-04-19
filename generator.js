/**
  * Static Site Generator
  */

// NPM Modules
const winston = require('winston');
const path = require('path');

// Plugins
const cmsPlugin = require('./plugins/cms');
const templatesPlugin = require('./plugins/templates');

// Create CMS
const cms = new cmsPlugin();

// Config
const config = {
  templateDir: path.resolve(__dirname, 'templates', 'pages'),
  cmsPageTag: 'page'
}

// Connect to CMS
cms.connect()
.then(() => {
  winston.log('info', 'Connected to CMS');

  winston.log('info', 'Searching for templates in template directory');
  templatesPlugin.search(config.templateDir, true)
  .then((template) => {
    console.log(template);
  })
  .catch((error) => {
    winston.log('error', 'Failed to search for templates');
  });

})
.catch(() => {
  winston.log('error', 'Failed to connect to CMS. Check network connection.')
});
