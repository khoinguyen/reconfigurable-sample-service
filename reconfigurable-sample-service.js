/**
* @name Reconfigurable-sample
* @summary Reconfigurable-sample Hydra Express service entry point
* @description 
*/
'use strict';
const ReconfigurablePlugin = require('hydra-reconfigurable-plugin');

const version = require('./package.json').version;
const hydra = require('hydra');
let config = require('fwsp-config');

config.init('./config/config.json')
  .then(() => {
    config.version = version;
    config.hydra.serviceVersion = version;
    /**
     * Initialize hydra
     */
    hydra.use(new ReconfigurablePlugin());
    return hydra.init(config);
  })
  .then(() => hydra.registerService())
  .then(serviceInfo => {
    console.log("listen for 'reconfigure' event");
    hydra.on('reconfigure', (label, newConfig) => {
        console.log('re-configuring');
        console.log(newConfig.test);
      });
  })
  .catch(err => {
    console.log('Error initializing hydra', err);
  });
