const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['js', 'ts', 'tsx'],
  env: {
    ...(() => {
      const file = path.join(__dirname, `env/${process.env.APP_ENV}.yml`);
      return yaml.load(fs.readFileSync(file, 'utf8'));
    })(),
    APP_ENV: process.env.APP_ENV,
  },
};
