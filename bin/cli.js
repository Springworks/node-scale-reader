#!/usr/bin/env node

require('babel-polyfill');

var cli = require('../lib/cli');
cli.run(process);
