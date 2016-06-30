import { startsWithBook, bookRegex } from './bible-book-regex'
import {
  normaliseBookName,
} from './bible-book-names'

const BOOK = 'BOOK'
const NUMBER = 'NUMBER'
const COMMA = 'COMMA'
const SEMICOLON = 'SEMICOLON'
const COLON = 'COLON'
const HYPHEN = 'HYPHEN'
const END = 'END'
const NEWLINE = 'NEWLINE'

const tokens = [
  { type: BOOK,      regex: bookRegex },
  { type: NUMBER,    regex: /^\d{1,3}\b/ },
  { type: COMMA,     regex: /^,/ },
  { type: SEMICOLON, regex: /^;/ },
  { type: COLON,     regex: /^:/ },
  { type: HYPHEN,    regex: /^-/ },
  { type: NEWLINE,    regex: /^\n/ },
]


function parseFirstToken(tail) {
  tail = tail.trim()
  if (tail.length === 0) return {
    type: END,
    tail: '',
  }
  let match
  for (let i = 0; i < tokens.length; i++) {
    match = tail.match(tokens[i].regex)
    if (match) return {
      type: tokens[i].type,
      head: match[0],
      tail: tail.substr(match[0].length),
    }
  }
}

export const parseQuery = query => {
  const verses = withRoot({
    tail: query.toLowerCase(),
    verseList: [],
  })
  console.log(verses.verseList)
  return verses.verseList
}

function withRoot(state) {
  const token = parseFirstToken(state.tail)
  console.log('root', token)
  switch(token.type) {
    case BOOK: {
      return withBook({
        book: normaliseBookName(token.head),
        chapter: undefined,
        verse: undefined,
        tail: token.tail,
        verseList: state.verseList,
      })
    }
    default: return state
  }
}

function withBook(state) {
  const token = parseFirstToken(state.tail)
  console.log('book', token, state)
  switch(token.type) {
    case NUMBER: {
      return withChapter({
        book: state.book,
        chapter: token.head,
        tail: token.tail,
        verseList: state.verseList,
      })
    }
    case SEMICOLON:
    case END:
    case COMMA: {
      return withRoot({
        tail: token.tail,
        verseList: [
          ...state.verseList,
          {
            start: {
              book: state.book,
            },
          },
        ],
      })
    }
    default: return state
  }
}

function withChapter(state) {
  const token = parseFirstToken(state.tail)
  console.log('chapter', token, state)
  switch(token.type) {
    case END: {
      return {
        verseList: [
          ...state.verseList,
          {
            start: {
              book: state.book,
              chapter: state.chapter,
            },
          },
        ],
      }
    }
    case BOOK: {
      return withRoot(state)
    }
    case COMMA: {
      return withChapter({
        book: state.book,
        chapter: token.head,
        verse: undefined,
        tail: token.tail,
        verseList: [
          ...state.verseList,
          {
            start: {
              book: state.book,
              chapter: state.chapter,
            },
          },
        ],
      })
    }
    case HYPHEN: {
      return withRange({
        book: state.book,
        chapter: state.chapter,
        tail: token.tail,
        verseList: state.verseList,
      })
    }
    case COLON: {
      return withVerse({
        book: state.book,
        chapter: state.chapter,
        verse: token.head,
        tail: token.tail,
        verseList: state.verseList,
      })
    }
    default: return state
  }
}
//reverts to chapter
function withRange(state) {
  const token = parseFirstToken(state.tail)
  switch(token.type) {
    case NUMBER:
  }
}
function withVerse(state) {}
