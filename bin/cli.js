#!/usr/bin/env node

require('babel-polyfill');

const cli = require('../lib/cli');
cli.default.run(process);
