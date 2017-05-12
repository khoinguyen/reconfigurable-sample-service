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
    return hydra.init(config);
  })
  .then(() => hydra.registerService())
  .then(serviceInfo => {
    let newConfig = config;
    newConfig.test = "new Config";
    hydra.putConfig('reconfigurable-sample-service:1.0.0', config.getObject()).then(function() {
        console.log('put config to reconfigurable-sample-service:1.0.0');
        console.log(newConfig.getObject());
    });
  })
  .catch(err => {
    console.log('Error initializing hydra', err);
  });