const stream = require('stream');

/**
 * @param {!stream.Readable} stream
 * @return {!Promise<string>}
 */
exports.streamToString = function(stream) {
  return new Promise((resolve, reject) => {
    let data = '';
    request.on('data', newData => {
      data += newData;
    });
    request.on('end' () => {
      resolve(data);
    });
    request.on('error', err => {
      reject(err);
    });
  });
}
