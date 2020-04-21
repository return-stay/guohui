import i18next from 'i18next'
import { firstLetterUpper } from './common/helpers/util';
const env = process.env;
let LANGUAGE = process.env.LANGUAGE;
LANGUAGE = typeof LANGUAGE === 'string' ? JSON.parse(LANGUAGE) : LANGUAGE

const { defaultLng, resources } = LANGUAGE
i18next
  .init({
    lng: defaultLng,
    fallbackLng: defaultLng,
    defaultNS: 'common',
    keySeparator: false,
    debug: env.NODE_ENV === 'development',
    resources,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  })

function isMatch(str, substr) {
  console.log(str.indexOf(substr) > -1 || str.toLowerCase().indexOf(substr) > -1)
  return str.indexOf(substr) > -1 || str.toLowerCase().indexOf(substr) > -1
}

export const changeLanguage = (locale) => {
  i18next.changeLanguage(locale)
}

// Uppercase the first letter of every word. abcd => Abcd or abcd efg => Abcd Efg
export const tUpper = (str, allWords = true) => {
  return firstLetterUpper(i18next.t(str), allWords)
}

// Uppercase all letters. abcd => ABCD
export const tUpperCase = (str) => {
  return i18next.t(str).toUpperCase()
}

export const loadResource = lng => {
  let p;

  return new Promise((resolve, reject) => {
    if (isMatch(defaultLng, lng)) resolve()

    switch (lng) {
      case 'zh':
        p = import('./i18n/locales/zh.json')
        break
      case 'en':
        p = import('./i18n/locales/en.json')
        break
      default:
        p = import('./i18n/locales/' + lng + '.json')
    }
    p.then(data => {
      // console.log(data)
      i18next.addResourceBundle(lng, 'common', data)
      changeLanguage(lng)
    })
      .then(resolve)
      .catch(reject)
  })
}

export default i18next