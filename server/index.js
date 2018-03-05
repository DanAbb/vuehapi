/* @flow */

import Hapi from 'hapi';
import routes from './Handlers';
import plugins from './Plugins';
import mongoose from 'mongoose';
import consoleTime from 'console-stamp'

consoleTime(console, {
  pattern: 'dd/mm/yyyy HH:MM:ss.l',
  colors: {
    stamp: 'yellow'
  }
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

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

const mongoUser = process.env.MONGO_USER || 'user'
const mongoPassword = process.env.MONGO_PASSWORD || 'pass'
const mongoURI = process.env.MONGO_URI || 'localhost:27017'
const mongoDbName = process.env.MONGO_DB || 'db'

mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@${mongoURI}/${mongoDbName}`)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('tits')
})
