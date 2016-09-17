import {
  getNormaliseBookName,
  getNormaliseBookNameShort,
  getLanguages,
} from './bible-book-names'

export default function BibleBookRegex(...languageNames) {
  const bookNames = getLanguages(...languageNames)
  const normaliseBookName = getNormaliseBookName(bookNames)
  const normaliseBookNameShort = getNormaliseBookNameShort(bookNames)
  const anyBookInAnyForm = bookNames.map(names =>
    names.join('|')).join('|')
  const chapter = '\\d{1,3}'
  const verse = '\\d{1,3}'

  const bookChapterVerse =
    new RegExp(`^(${anyBookInAnyForm})\\s*(${chapter})[ ]*:[ ]*(${verse})\\b`)
  const bookChapter = new RegExp(`^(${anyBookInAnyForm})[ ]*(${chapter})\\b`)
  const bookRegex = new RegExp(`^(?:${anyBookInAnyForm})`)
  const chapterVerse = new RegExp(`^(${chapter})[ ]*:[ ]*(${verse})\\b`)
  const bookFf = new RegExp(`^(?:${anyBookInAnyForm})[ ]*ff`)

  /* eslint-disable no-cond-assign */
  function rightToRangeEnd(right, isFf, ctx) {
    let match
    let out = {}
    // unterminated range
    if (right === '') return {}
    if (isFf) {
      if (ctx.book && ctx.chapter && ctx.verse) {
        out = {
          book: ctx.book,
          chapter: ctx.chapter,
        }
      } else if (ctx.book && ctx.chapter) {
        out = {
          book: ctx.book,
        }
      }
      return out
    }

    if (right === undefined) return { ...ctx }

    if (match = right.match(bookChapterVerse)) {
      out = {
        book: normaliseBookName(match[1]),
        chapter: match[2],
        verse: match[3],
      }
    } else if (match = right.match(bookChapter)) {
      out = {
        book: normaliseBookName(match[1]),
        chapter: match[2],
      }
    } else if (match = right.match(bookRegex)) {
      out = {
        book: normaliseBookName(match[0]),
      }
    } else if (match = right.match(chapterVerse)) {
      out = {
        book: ctx.book,
        chapter: match[1],
        verse: match[2],
      }
    } else if (match = right.match(/(\d{1,3}\b)/)) {
      if (ctx.verse) {
        out = {
          book: ctx.book,
          chapter: ctx.chapter,
          verse: match[1],
        }
      } else {
        out = {
          book: ctx.book,
          chapter: match[1],
        }
      }
    } else {
      out = { ...ctx }
    }
    return out
  }

  function partToRange(part, ctx) {
    let match
    let start
    let isFf = false
    let [left, right] = part.split('-')
      .map(s => s.trim().toLowerCase())
    if (
      /\d{1,3}[ ]*ff$/i.test(left) ||
      bookFf.test(left)
    ) {
      left = left.replace(/[ ]*ff$/, '')
      isFf = true
    }

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
    } else{
      console.log('match none',bookRegex)
    }

    return {
      start,
      end: rightToRangeEnd(right, isFf, ctx),
      ctx,
    }
  }

  /* eslint-enable no-cond-assign */

  const getVerseRanges = refs => {
    const { ranges } = refs.split(/[,\n;]+/g)
    .reduce((acc, ref) => {
      const range = partToRange(ref, acc.ctx)
      acc.ctx = range.ctx
      if (range.start) {
        acc.ranges.push({
          start: range.start,
          end: range.end,
        })
      }
      return acc
    }, {
      ctx: { book: 'genesis' },
      ranges: [],
    })
    return ranges
  }

  this.getVerseRanges = getVerseRanges
  this.bookNames = bookNames
  this.normaliseBookName = normaliseBookName
  this.normaliseBookNameShort = normaliseBookNameShort
  this.partToRange = partToRange
}

