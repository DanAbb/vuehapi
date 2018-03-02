/* @flow */

import Hapi from 'hapi';
import Good from 'good';

const server = new Hapi.server({
  port: 3001,
});

const options = {
  reporters: {
    myConsoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }],
      },
      {
        module: 'good-console',
      },
      'stdout',
    ],
  },
};

async function start() {
  try {
    await server.register({
      plugin: Good,
      options,
    });

    await server.start();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

server.route({
  method: 'GET',
  path: '/name/{name}',
  handler: function(request) {
    const name = request.params.name;
    return `Hello  ${name}`;
  },
});

start();
