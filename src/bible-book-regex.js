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


