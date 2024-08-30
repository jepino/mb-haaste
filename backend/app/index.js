/* eslint-disable no-console */
import app from './app.js';
import config from './config.js';

const server = app.listen(config.port, () => {
  console.log(`Listening on ${config.port}`);
});

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});
