/**
  * Contentful CMS Plugin
  * Wrapper for the Contentful Delivery Api
  */

const contentful = require('contentful');

const apiWrapper = {
  init(space, accessToken) {
    const client = contentful.createClient({
      space,
      accessToken
    });

    return new Promise((resolve, reject) => {
      if (client) {
        resolve(client);
      } else {
        reject('Failed to create Contentful client');
      }
    });
  },
  getByContentType(client, contentType) {
    return client.getEntries({
      content_type: contentType
    });
  }
}

module.exports = apiWrapper;
