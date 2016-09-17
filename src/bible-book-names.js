const abbr = [
  ['genesis', 'gen', 'ge', 'gn'],
  ['exodus', 'exo', 'ex', 'exod'],
  ['leviticus', 'lev', 'le', 'lv'],
  ['numbers', 'num', 'nu', 'nm', 'nb'],
  ['deuteronomy', 'deut', 'dt'],
  ['joshua', 'josh', 'jos', 'jsh'],
  ['judges', 'judg', 'jdg', 'jg', 'jdgs'],
  ['ruth', 'rth', 'ru'],
  ['1 samuel', '1 sam', '1 sa', '1samuel', '1s', 'i sa', '1 sm', '1sa', 'i sam', '1sam', 'i samuel', '1st samuel', 'first samuel'],
  ['2 samuel', '2 sam', '2 sa', '2s', 'ii sa', '2 sm', '2sa', 'ii sam', '2sam', 'ii samuel', '2samuel', '2nd samuel', 'second samuel'],
  ['1 kings', '1 kgs', '1 ki', '1k', 'i kgs', '1kgs', 'i ki', '1ki', 'i kings', '1kings', '1st kgs', '1st kings', 'first kings', 'first kgs', '1kin'],
  ['2 kings', '2 kgs', '2 ki', '2k', 'ii kgs', '2kgs', 'ii ki', '2ki', 'ii kings', '2kings', '2nd kgs', '2nd kings', 'second kings', 'second kgs', '2kin'],
  ['1 chronicles', '1 chron', '1 ch', 'i ch', '1ch', '1 chr', 'i chr', '1chr', 'i chron', '1chron', 'i chronicles', '1chronicles', '1st chronicles', 'first chronicles'],
  ['2 chronicles', '2 chron', '2 ch', 'ii ch', '2ch', 'ii chr', '2chr', 'ii chron', '2chron', 'ii chronicles', '2chronicles', '2nd chronicles', 'second chronicles'],
  ['ezra', 'ezra', 'ezr'],
  ['nehemiah', 'neh', 'ne'],
  ['esther', 'esth', 'es'],
  ['job', 'job', 'job', 'jb'],
  ['psalm', 'pslm', 'ps', 'psalms', 'psa', 'psm', 'pss'],
  ['proverbs', 'prov', 'pr', 'prv'],
  ['ecclesiastes', 'eccles', 'ec', 'qoh', 'qoheleth'],
  ['song of solomon', 'song', 'so', 'canticle of canticles', 'canticles', 'song of songs', 'sos'],
  ['isaiah', 'isa', 'is'],
  ['jeremiah', 'jer', 'je', 'jr'],
  ['lamentations', 'lam', 'la'],
  ['ezekiel', 'ezek', 'eze', 'ezk'],
  ['daniel', 'dan', 'da', 'dn'],
  ['hosea', 'hos', 'ho'],
  ['joel', 'joel', 'joe', 'jl'],
  ['amos', 'amos', 'am'],
  ['obadiah', 'obad', 'ob'],
  ['jonah', 'jnh', 'jon'],
  ['micah', 'micah', 'mic'],
  ['nahum', 'nah', 'na'],
  ['habakkuk', 'hab', 'hab'],
  ['zephaniah', 'zeph', 'zep', 'zp'],
  ['haggai', 'haggai', 'hag', 'hg'],
  ['zechariah', 'zech', 'zec', 'zc'],
  ['malachi', 'mal', 'mal', 'ml'],
  ['matthew', 'matt', 'mt'],
  ['mark', 'mrk', 'mk', 'mr'],
  ['luke', 'luk', 'lk'],
  ['john', 'john', 'jn', 'jhn'],
  ['acts', 'acts', 'ac'],
  ['romans', 'rom', 'ro', 'rm'],
  ['1 corinthians', '1 cor', '1 co', 'i co', '1co', 'i cor', '1cor', 'i corinthians', '1corinthians', '1st corinthians', 'first corinthians'],
  ['2 corinthians', '2 cor', '2 co', 'ii co', '2co', 'ii cor', '2cor', 'ii corinthians', '2corinthians', '2nd corinthians', 'second corinthians'],
  ['galatians', 'gal', 'ga'],
  ['ephesians', 'ephes', 'eph'],
  ['philippians', 'phil', 'php'],
  ['colossians', 'col', 'col'],
  ['1 thessalonians', '1 thess', '1 th', 'i th', '1th', 'i thes', '1thes', 'i thess', '1thess', 'i thessalonians', '1thessalonians', '1st thessalonians', 'first thessalonians'],
  ['2 thessalonians', '2 thess', '2 th', 'ii th', '2th', 'ii thes', '2thes', 'ii thess', '2thess', 'ii thessalonians', '2thessalonians', '2nd thessalonians', 'second thessalonians'],
  ['1 timothy', '1 tim', '1 ti', 'i ti', '1ti', 'i tim', '1tim', 'i timothy', '1timothy', '1st timothy', 'first timothy'],
  ['2 timothy', '2 tim', '2 ti', 'ii ti', '2ti', 'ii tim', '2tim', 'ii timothy', '2timothy', '2nd timothy', 'second timothy'],
  ['titus', 'titus', 'tit'],
  ['philemon', 'philem', 'phm'],
  ['hebrews', 'hebrews', 'heb'],
  ['james', 'james', 'jas', 'jm'],
  ['1 peter', '1 pet', '1 pe', 'i pe', '1pe', 'i pet', '1pet', 'i pt', '1 pt', '1pt', 'i peter', '1peter', '1st peter', 'first peter'],
  ['2 peter', '2 pet', '2 pe', 'ii pe', '2pe', 'ii pet', '2pet', 'ii pt', '2 pt', '2pt', 'ii peter', '2peter', '2nd peter', 'second peter'],
  ['1 john', '1 john', '1 jn', 'i jn', '1jn', 'i jo', '1jo', 'i joh', '1joh', 'i jhn', '1 jhn', '1jhn', 'i john', '1john', '1st john', 'first john'],
  ['2 john', '2 john', '2 jn', 'ii jn', '2jn', 'ii jo', '2jo', 'ii joh', '2joh', 'ii jhn', '2 jhn', '2jhn', 'ii john', '2john', '2nd john', 'second john'],
  ['3 john', '3 john', '3 jn', 'iii jn', '3jn', 'iii jo', '3jo', 'iii joh', '3joh', 'iii jhn', '3 jhn', '3jhn', 'iii john', '3john', '3rd john', 'third john'],
  ['jude', 'jude', 'jud'],
  ['revelation', 'rev', 're', 'the revelation']
]

export const chinese = [
  ['gn', '创世记', 'chuang4shi4ji4', 'genesis'],
  ['ex', '出埃及记', 'chu1ai1ji2ji4', 'exodus'],
  ['lv', '利未记', 'li4wei4ji4', 'leviticus'],
  ['nm', '民数记', 'min2shu4ji4', 'numbers'],
  ['dt', '申命记', 'shen1ming4ji4', 'deuteronomy'],
  ['js', '约书亚记', 'yue1shu1ya4ji4', 'joshua'],
  ['jg', '士师记', 'shi4shi1ji4', 'judges'],
  ['rt', '路得记', 'lu4de2ji4', 'ruth'],
  ['1sm', '撒母耳记上', 'sa1mu3er3ji4shang4', '1 samuel'],
  ['2sm', '撒母耳记下', 'sa1mu3er3ji4xia4', '2 samuel'],
  ['1kn', '列王纪上', 'lie4wang2ji4shang', '1 kings'],
  ['2kn', '列王纪下', 'lie4wang2ji4xia4', '2 kings'],
  ['1ch', '历代志上', 'li4dai4zhi4shang4', '1 chronicles'],
  ['2ch', '历代志下', 'li4dai4zhi4xia4', '2 chronicles'],
  ['ez', '以斯拉记', 'yi3si1la1ji4', 'ezra'],
  ['nh', '尼希米记', 'ni2xi1mi3ji4', 'nehemiah'],
  ['es', '以斯帖记', 'yi3si1tie4ji4', 'esther'],
  ['jb', '约伯记', 'yue1bo2', 'job'],
  ['ps', '诗篇', 'shi1pian1', 'psalms'],
  ['pr', '箴言', 'zhen1yan2', 'proverbs'],
  ['ec', '传道书', 'chuan2dao4shu1', 'ecclesiastes'],
  ['sn', '雅歌', 'ya3ge1', 'song of songs'],
  ['is', '以赛亚书', 'yi3sai4ya4shu1', 'isaiah'],
  ['jr', '耶利米书', 'ye1li4mi3shu1', 'jeremiah'],
  ['lm', '耶利米哀歌', 'ye1li4mi3ai1ge1', 'lamentations'],
  ['ek', '以西结书', 'yi3si1jie1shu1', 'ezekiel'],
  ['dn', '但以理书', 'dan4yi3li3shu1', 'daniel'],
  ['hs', '何西阿书', 'he2xi1a1shu1', 'hosea'],
  ['jl', '约珥书', 'yue1er3shu1', 'joel'],
  ['am', '阿摩司书', 'a1mo2si1shu1', 'amos'],
  ['ob', '俄巴底亚书', 'e2ba1di3ya4shu1', 'obadiah'],
  ['jn', '约拿书', 'yue1na2shu1', 'jonah'],
  ['mc', '弥迦书', 'mi2jia1shu1', 'micah'],
  ['na', '那鸿书', 'na4hong2shu1', 'nahum'],
  ['hk', '哈巴谷书', 'ha1ba1gu3shu1', 'habakkuk'],
  ['zp', '西番雅书', 'xi1fan1ya3shu1', 'zephaniah'],
  ['hg', '哈该书', 'ha1gai1shu1', 'haggai'],
  ['zc', '撒迦利亚书', 'sa1jia1li4ya4shu1', 'zechariah'],
  ['ml', '玛拉基书', 'ma3la1ji1shu1', 'malachi'],
  ['mt', '马太福音', 'ma3tai4fu2yin1', 'matthew'],
  ['mr', '马可福音', 'ma3ke3fu2yin1', 'mark'],
  ['lk', '路加福音', 'lu4jia1fu2yin1', 'luke'],
  ['jh', '约翰福音', 'yue1han4fu2yin1', 'john'],
  ['ac', '使徒行传', 'shi3tu2xing2zhuan4', 'acts'],
  ['rm', '罗马书', 'luo2ma3shu1', 'romans'],
  ['1cr', '哥林多前书', 'ge1lin2duo1qian2shu1', '1 corinthians'],
  ['2cr', '哥林多后书', 'ge1lin2duo1hou4shu1', '2 corinthians'],
  ['gl', '加拉太书', 'jia1la1tai4shu1', 'galatians'],
  ['ep', '以弗所书', 'yi3fu2suo3shu1', 'ephesians'],
  ['ph', '腓立比书', 'fei2li4bi3shu1', 'philippians'],
  ['cl', '歌罗西书', 'ge1luo2xi1shu1', 'colossians'],
  ['1th', '帖撒罗尼迦前书', 'tie4sa1luo2ni2jia1qian2shu1', '1 thessalonians'],
  ['2th', '帖撒罗尼迦后书', 'tie4sa1luo2ni2jia1hou4shu1', '2 thessalonians'],
  ['1tm', '提摩太前书', 'ti2mo2tai4qian2shu1', '1 timothy'],
  ['2tm', '提摩太后书', 'ti2mo2tai4hou4shu1', '2 timothy'],
  ['tt', '提多书', 'ti2duo1shu1', 'titus'],
  ['pl', '腓利门书', 'fei2li4men2shu1', 'philemon'],
  ['hb', '希伯来书', 'xi1bo2lai2shu1', 'hebrews'],
  ['jm', '雅各书', 'ya3ge4shu1', 'james'],
  ['1pt', '彼得前书', 'bi3de2qian2shu1', '1 peter'],
  ['2pt', '彼得后书', 'bi3de2hou4shu1', '2 peter'],
  ['1jh', '约翰一书', 'yue1han4yi1shu1', '1 john'],
  ['2jh', '约翰二书', 'yue1han4er2shu1', '2 john'],
  ['3jh', '约翰三书', 'yue1han4san1shu1', '3 john'],
  ['jd', '犹大书', 'you2da4shu1', 'jude'],
  ['rv', '启示录', 'qi3shi4lu4', 'revelation'],
]

const merge = (a, b) => a.concat(b.filter(bb => a.indexOf(bb) === -1))
const mergeTwoLanguages = (a, b) =>
  a.length ? a.map((book, i) => merge(book, b[i])) : [...b]

export const mergeLanguages = (...args) => {
  if (!args) return []
  if (args.length === 1) return [...args[0]]
  return args.reduce((acc, lang) => {
    return mergeTwoLanguages(acc, lang)
  }, [])
}

const shortest = (arr) =>
  arr.sort((a, b) => a.length - b.length)[0]

export const abbrs = {
  english: abbr,
  chinese,
}

export const getLanguage = language => abbrs[language]
export const getLanguages = (...languageNames) =>
  mergeLanguages(...(languageNames.map(name => abbrs[name])))

const getNormalise = abbr => abbr.reduce((acc, bookAbbrs) => {
  bookAbbrs.forEach(bookAbbr => acc[bookAbbr] = bookAbbrs[0])
  return acc
}, {})

const getNormaliseShort = abbr => abbr.reduce((acc, bookAbbrs) => {
  bookAbbrs.forEach(
    bookAbbr => acc[bookAbbr] = shortest(bookAbbrs.filter(x => x !== ''))
  )
  return acc
}, {})

export const getNormaliseBookName = abbr => {
  const normalise = getNormalise(abbr)
  return name => normalise[name]
}

export const getNormaliseBookNameShort = abbr => {
  const normaliseShort = getNormaliseShort(abbr)
  return name => normaliseShort[name]
}
