// firstLetterUpper

export const firstLetterUpper = (str, allWords = true) => {
    let tmp = str.replace(/^(.)/g, $1 => $1.toUpperCase())
    if (allWords) {
        tmp = tmp.replace(/\s(.)/g, $1 => $1.toUpperCase())
    }
    return tmp;
}