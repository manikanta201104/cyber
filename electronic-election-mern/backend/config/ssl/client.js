const https = require('https');

const options = {
  hostname: '192.168.50.217',
  port: 3000,
  path: '/',
  method: 'GET',
  rejectUnauthorized: false // Disable hostname/IP verification
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
