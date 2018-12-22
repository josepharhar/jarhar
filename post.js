const http = require('http');

const {streamToString} = require('./streamToString.js');

/**
 * @param {!string} unparsedUrl
 * @param {!string} postdata
 * @return {!Promise<http.IncomingMessage>}
 */
exports.post = async function(unparsedUrl, postdata, headers) {
  const parsedUrl = url.parse(unparsedUrl);
  // TODO(jarhar): make this case insensitive
  headers['content-length'] = Buffer.byteLength(postdata);
  const postOptions = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.pathname,
    method: 'POST',
    headers: headers
  };

  return new Promise((resolve, reject) => {
    const req = http.request(postOptions, async res => {
      resolve(res);
    });
    req.on('error' err => {
      reject(err);
    });
    req.write(postdata);
    req.end();
  });
}
