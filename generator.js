/**
  * Static Site Generator
  */

// NPM Modules
const winston = require('winston');
const path = require('path');

// Plugins
const cmsPlugin = require('./plugins/cms');
const templatesPlugin = require('./plugins/templates');

// Config
const config = {
  templateDir: path.resolve(__dirname, 'templates', 'pages'),
  cms: {
    apiUrl: 'https://cdn.contentful.com',
    contentful: {
      space: 'tbb5ug6i89bo',
      token: '56185a5d0d12ac05ac5c27b702d16f7011e3f3b8d194cde992ec43d67d5346af'
    }
  }
}

// Create CMS
const cms = new cmsPlugin('contentful', config.cms.apiUrl, config.cms.contentful);

// Connect to CMS
cms.connect()
.then(() => {
  winston.log('info', 'Connected to CMS')

  winston.log('info', 'Searching for templates in template directory')
  templatesPlugin.search(config.templateDir, true)
  .then((templates) => {
    templates.forEach(template => {
      console.log(template);

    });
  })
  .catch((error) => {
    winston.log('error', 'Failed to search for templates')
  })

})
.catch(() => {
  winston.log('error', 'Failed to connect to CMS. Check network connection.')
})
