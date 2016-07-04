import test from 'ava'
import is from 'is_js'
import {
  parseQuery,
} from '../imperative-books'

test('should parse single book', t => {
  t.deepEqual(
    parseQuery('john'), [
      {
        start: { book: 'john' },
      },
    ]
  )
})

test('should parse list of books', t => {
  t.deepEqual(
    parseQuery('john, james, daniel'), [
      {
        start: { book: 'john' },
      },
      {
        start: { book: 'james' },
      },
      {
        start: { book: 'daniel' },
      },
    ]
  )
})

test('should parse books with chapter', t => {
  t.deepEqual(
    parseQuery('john 1'), [
      {
        start: {
          book: 'john',
          chapter: '1',
        },
      },
    ]
  )
})

test('should parse multiple books with chapter', t => {
  t.deepEqual(
    parseQuery('john 1, james 4'), [
      {
        start: {
          book: 'john',
          chapter: '1',
        },
      },
      {
        start: {
          book: 'james',
          chapter: '4',
        },
      },
    ]
  )
})

test.only('should parse Mark 5-12', t => {
  t.deepEqual(
    parseQuery('Mark 5-12'), [
      {
        start: {
          book: 'mark',
          chapter: '5',
        },
        stop: {
          book: 'mark',
          chapter: '12',
        },
      },
    ]
  )
})
