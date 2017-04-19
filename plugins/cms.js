/**
  * CMS module
  * This module is responsible to get content from the CMS cmsModule
  */

// Module dependencies
const prismic = require('prismic.io');

// Configuration
const config = require('../config/cms');

// CMS Constructor function

const cmsModule = function() {
  this.apiUrl = config.apiUrl;
  this.linkResolver = config.linkResolver;
  this.api = {};
}

cmsModule.prototype.connect = function() {
  return prismic.api(this.apiUrl);
}

cmsModule.prototype.queryByType = function(type) {
  return this.api.query(
    prismic.Predicates.at('document.type', type)
  );
}

cmsModule.prototype.queryByTag = function(tag) {
  return this.api.query(
    prismic.Predicates.at('document.tags', [tag])
  );
}

// Export CMS module
module.exports = cmsModule;
