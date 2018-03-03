/* @flow */
import Good from 'good';

const options = {
  reporters: {
    myConsoleReporter: [
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
};

const plugins = {
  plugin: Good,
  options
};

export default plugins;
