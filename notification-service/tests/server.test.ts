// tests/server.test.ts
import { app } from '../index';
import http from 'http';

let server: http.Server | null = null;
let port: number;

export const startServer = async (): Promise<http.Server> => {
  return new Promise((resolve, reject) => {
    try {
      server = app.listen(0, () => {
        if (!server) {
          reject(new Error('Server failed to start'));
          return;
        }
        port = (server.address() as { port: number }).port;
        resolve(server);
      });

      server.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const stopServer = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!server) {
      resolve();
      return;
    }

    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      server = null;
      resolve();
    });
  });
};

export const getPort = (): number => {
  if (!server) {
    throw new Error('Server not started');
  }
  return port;
};