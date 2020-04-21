const path = require('path');
const paths = require('./paths');
const localesHash = require('../src/i18n/localesHash');
const resourcesHash = require('../src/i18n/resourcesHash');

const COUNTRY = process.env.COUNTRY || 'zh';
// console.log(COUNTRY)
const country = (COUNTRY).toUpperCase();
const defaultLng = localesHash[country][0];

const langs = [
  'en',
  'zh'
];

const prefixLangs = [];
const entries = {};

for (let i = 0, len = langs.length; i < len; i++) {
  const prefixLang = `dict_${langs[i]}`
  prefixLangs.push(prefixLang)
  entries[prefixLang] = path.resolve(paths.appSrc, `../i18n/locales/${langs[i]}.json`)
}

const resources = {
  [defaultLng]: {
    common: resourcesHash[defaultLng]
  }
}

exports.resources = resources;
exports.defaultLng = defaultLng;