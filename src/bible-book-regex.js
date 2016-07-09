import bookNames, {
  normaliseBookName
} from './bible-book-names'

const bookNamesToRegex = (acc, book) => {
  const bookForms = book.join('|')
  const capture = `(${bookForms})`
  const noCapture = `(?:${bookForms})`
  acc.push({
    captureBook: new RegExp(`^\\s?${capture}\\b`,'i'),
    captureRef: new RegExp(`^\\s?(?:${noCapture}\\s+)?(?:(?:(\\d{1,3})(?::(\\d{1,3}))?)?\\s*)?$`,'i')
  })
  return acc
}
export const booksRegex = bookNames.reduce(bookNamesToRegex, [])
export const anyBookInAnyForm = bookNames.map(names =>
    names.join('|')).join('|')
const chapter = '\\d{1,3}'
const verse = '\\d{1,3}'
// export const bookChapterVerse = new RegExp(
//   `^(${anyBookInAnyForm})(\\s+(${chapter}(:${verse})?)?\\s*)?$`
// )
export const startsWithBook = new RegExp(`^(${anyBookInAnyForm})\\b`)
const bookChapterVerse =
  new RegExp(`^(${anyBookInAnyForm})\\s+(${chapter}):(${verse})\\b`)
const bookChapter = new RegExp(`^(${anyBookInAnyForm})\\s+(${chapter})\\b`)
//const book = new RegExp(`^(${anyBookInAnyForm})\\b`)
export const bookRegex = new RegExp(`^(?:${anyBookInAnyForm})\\b`)
const chapterVerse = new RegExp(`^(${chapter}):(${verse})\\b`)

// export function partToAbstractLocation(part) {
//   let match
//   match = part.match(bookChapterVerse)
//   if (match) return {
//     book: normaliseBookName(match[1]),
//     chapter: match[2],
//     verse: match[3],
//   }
//   match = part.match(bookChapter)
//   if (match) return {
//     book: normaliseBookName(match[1]),
//     chapter: match[2],
//   }
//   match = part.match(bookRegex)
//   if (match) return {
//     book: normaliseBookName(match[0]),
//   }
//   match = part.match(chapterVerse)
//   if (match) return {
//     chapter: match[1],
//     verse: match[2],
//   }
//   match = part.match(/(\d{1,3}\b)/)
//   if (match) return {
//     number: match[1],
//   }
// }
/* eslint-disable no-cond-assign */
export function partToRange(part, ctx) {
  let match
  let start
  let [ left, right ] = part.split('-')
    .map(s => s.trim().toLowerCase())
  if (match = left.match(bookChapterVerse)) {
    start = {
      book: normaliseBookName(match[1]),
      chapter: match[2],
      verse: match[3],
    }
    ctx = { ...start }
  } else if (match = left.match(bookChapter)) {
    start = {
      book: normaliseBookName(match[1]),
      chapter: match[2],
      verse: '1',
    }
    ctx = {
      book: start.book,
      chapter: start.chapter,
    }
  } else if (match = left.match(bookRegex)) {
    start = {
      book: normaliseBookName(match[0]),
      chapter: '1',
      verse: '1',
    }
    ctx = { book: start.book }
  } else if (match = left.match(chapterVerse)) {
    start = {
      book: ctx.book,
      chapter: match[1],
      verse: match[2],
    }
    ctx = { ...start }
  } else if (match = left.match(/(\d{1,3}\b)/)) {
    if (ctx.verse) {
      start = {
        book: ctx.book,
        chapter: ctx.chapter,
        verse: match[1],
      }
      ctx = { ...start }
    } else {
      start = {
        book: ctx.book,
        chapter: match[1],
        verse: '1',
      }
      ctx = {
        book: start.book,
        chapter: start.chapter,
      }
    }
  }

  return {
    start,
    end: rightToRangeEnd(right, ctx),
    ctx,
  }
}
/* eslint-enable no-cond-assign */

export function rightToRangeEnd(right, ctx) {
  let match
  if (right === undefined) return { ...ctx }

  match = right.match(bookChapterVerse)
  if (match) return {
    book: normaliseBookName(match[1]),
    chapter: match[2],
    verse: match[3],
  }
  match = right.match(bookChapter)
  if (match) return {
    book: normaliseBookName(match[1]),
    chapter: match[2],
  }
  match = right.match(bookRegex)
  if (match) return {
    book: normaliseBookName(match[0]),
  }
  match = right.match(chapterVerse)
  if (match) return {
    book: ctx.book,
    chapter: match[1],
    verse: match[2],
  }
  match = right.match(/(\d{1,3}\b)/)
  if (match) {
    if (ctx.verse) {
      return {
        book: ctx.book,
        chapter: ctx.chapter,
        verse: match[1],
      }
    } else {
      return {
        book: ctx.book,
        chapter: match[1],
      }
    }
  }
  return { ...ctx }
}

export const getRanges = refs => {

  const { ranges } = refs.split(/[,\n;]/g)
  .reduce((acc, ref) => {
    const range = partToRange(ref, acc.ctx)
    acc.ctx = range.ctx
    acc.ranges.push({
      start: range.start,
      end: range.end,
    })
    return acc
  },{
    ctx: { book: 'genesis' },
    ranges: [],
  })
  return ranges
}


export function endRange(tail) {
  let match
  match = tail.match(bookChapterVerse)
  if (match) return {
    book: normaliseBookName(match[1]),
    chapter: match[2],
    verse: match[3],
    tail: tail.substr(match[0].length),
  }
  match = tail.match(bookChapter)
  if (match) return {
    book: normaliseBookName(match[1]),
    chapter: match[2],
    tail: tail.substr(match[0].length),
  }
  match = tail.match(bookRegex)
  if (match) return {
    book: normaliseBookName(match[0]),
    tail: tail.substr(match[0].length),
  }
  match = tail.match(chapterVerse)
  if (match) return {
    chapter: match[1],
    verse: match[2],
    tail: tail.substr(match[0].length),
  }
  match = tail.match(/(\d{1,3}\b)/)
  if (match) return {
    number: match[1],
    tail: tail.substr(match[0].length),
  }
}


