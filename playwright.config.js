// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      geolocation: { longitude: 48.858455, latitude: 2.294474 },
      permissions: ['notifications', 'geolocation'],
    },
  };
  
  module.exports = config;