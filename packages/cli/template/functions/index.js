const admin = require('firebase-admin');
const functions = require('firebase-functions');

const ectoplasm = require('@poltergeist/ectoplasm');
const thoughtography = require('@poltergeist/thoughtography');
const ghostbuster = require('@poltergeist/ghostbuster');

ectoplasm(exports, functions, admin);
ghostbuster(exports, functions, admin);
thoughtography(exports, functions, admin);
