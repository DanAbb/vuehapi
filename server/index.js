/* @flow */

import Hapi from 'hapi';
import routes from './Handlers';
import plugins from './Plugins';
import mongoose from 'mongoose';

const server = new Hapi.Server({
  port: 3001
});

async function start () {
  try {
    await server.register(plugins);

    await server.start();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

server.route(routes);

start();

mongoose.connect('mongodb://fuck:you@ds161136.mlab.com:61136/reservations')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('tits')
})
