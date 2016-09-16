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

const shortest = (arr) => arr.sort((a, b) => a.length - b.length)[0]

const normalise = abbr.reduce((acc, bookAbbrs) => {
  bookAbbrs.forEach(bookAbbr => acc[bookAbbr] = bookAbbrs[0])
  return acc
}, {})

const normaliseShort = abbr.reduce((acc, bookAbbrs) => {
  bookAbbrs.forEach(bookAbbr => acc[bookAbbr] = shortest(bookAbbrs))
  return acc
}, {})

export const normaliseBookName = name => normalise[name]
export const normaliseBookNameShort = name => normaliseShort[name]

export default abbr
