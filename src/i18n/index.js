const path = require('path')
const fs = require('fs')
const fetch = require('isomorphic-fetch')
const localesHash = require('./localesHash')

const argv = process.argv.slice(2)
const country = (argv[0] || '').toUpperCase()

const i18nServerURI = locale => {
    const keywords = {
        'en': 'en',
        'zh': 'zh'
    }
    const keyword = keywords[locale]
    return keyword === 'en'
        ? 'your/transify/website/json/download'
        : `your/transify/website/${keyword}/json/download`
}

const fetchKeys = async (locale) => {
    const uri = i18nServerURI(locale)
    console.log(`Downloading ${locale} keys...\n${uri}`)
    const respones = await fetch(uri)
    console.log(respones)
    const keys = await respones.json()
    return keys
}

const access = async (filepath) => {
    return new Promise((resolve, reject) => {
        fs.access(filepath, (err) => {
            if (err) {
                if (err.code === 'EXIST') {
                    resolve(true)
                }
                resolve(false)
            }
            resolve(true)
        })
    })
}

const run = async () => {
    const locales = localesHash[country] || Object
        .values(localesHash)
        .reduce(
            (previous, current) =>
                previous.concat(current), []
        )
    if (locales === undefined) {
        console.error('This country is not in service.')
        return
    }
    for (const locale of locales) {
        const keys = await fetchKeys(locale)
        const data = JSON.stringify(keys, null, 2)
        const directoryPath = path.resolve(__dirname, 'locales')
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath)
        }
        const filepath = path.resolve(__dirname, `locales/${locale}.json`)
        const isExist = await access(filepath)
        const operation = isExist ? 'update' : 'create'
        console.log(operation)
        fs.writeFileSync(filepath, `${data}\n`)
        console.log(`${operation}\t${filepath}`)
    }
}

run();