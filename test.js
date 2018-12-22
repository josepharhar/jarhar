const http = require('http');
const querystring = require('querystring');

const jarhar = import('./index.js');
const testRunner = import('./testrunner.js');

async function testPost() {
  let capturedPost = null;
  const server = http.createServer((req, res) => {
    switch (req.url) {
      case '/post':
        res.writeHead(200, {'content-type': 'text/plain'});
        capturedPost = jarhar.streamToString(req);
        res.write('post data: ' + jarhar.streamToString(req));
        break;

      default:
        res.writeHead(404, {'content-type': 'text/plain'});
        res.write('404 not found');
    }
    res.end();
  });
  server.listen(8000);

  await jarhar.post('http://localhost:8000/post', 'test post data', {
    'content-type': 'text/plain'
  });
}
