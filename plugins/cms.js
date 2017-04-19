/**
  * CMS module
  * This module is responsible to get content from the CMS cmsModule
  */

// CMS Constructor function

const cmsModule = function(cmsProvider, apiUrl, apiOptions) {
  this.apiUrl = apiUrl;
  this.api = {};

  switch (cmsProvider) {
    case 'contentful':
      this.cms = {
        contentful: true,
        auth: {
          space: apiOptions.space,
          token: apiOptions.token
        },
        module: require('./cms/contentful')
      }
      break;
  }
}

/**
  * connect
  * Connect to the given CMS Provider
  */
cmsModule.prototype.connect = function() {
  if (this.cms.contentful) {
    return this.cms.module.init(this.cms.auth.space, this.cms.auth.token)
    .then((client) => {
      this.cms.client = client
      return;
    });
  }
}

/**
  * fetch
  * Get documents from given CMS Provider
  */
cmsModule.prototype.queryByType = function(type) {
  if (this.cms.contentful) {
    return this.cms.module.getByContentType(this.cms.client, type);
  }
}

// Export CMS module
module.exports = cmsModule;
