/* @flow */
import Good from 'good';
import Inert from 'inert'
import Vision from 'vision'
import HapiSwagger from 'hapi-swagger'

const swaggerOptions = {
  info: {
    title: 'Test API Documentation',
    version: '1.0.0'
  }
}

const goodOptions = {
  reporters: {
    myConsoleReporter: [
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
};

const plugins = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  },
  {
    plugin: Good,
    options: goodOptions
  }
]

export default plugins;
