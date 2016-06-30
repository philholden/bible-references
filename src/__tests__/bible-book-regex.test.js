import test from 'ava'
import is from 'is_js'
import {
  booksRegex,
  refRegex,
  endRange,
} from '../bible-book-regex'

test('endRange should parse book chapter verse', t => {
  t.deepEqual(
    endRange('john 3:16,'), {
      book: 'john',
      chapter: '3',
      verse: '16',
      tail: ',',
    }
  )
})

test('endRange should parse book chapter', t => {
  t.deepEqual(
    endRange('john 3,'), {
      book: 'john',
      chapter: '3',
      tail: ',',
    }
  )
})

test('endRange should parse book', t => {
  t.deepEqual(
    endRange('john,'), {
      book: 'john',
      tail: ',',
    }
  )
})

test('endRange should parse verse chapter', t => {
  t.deepEqual(
    endRange('3:16,'), {
      chapter: '3',
      verse: '16',
      tail: ',',
    }
  )
})

test('endRange should parse number', t => {
  t.deepEqual(
    endRange('16,'), {
      number: '16',
      tail: ',',
    }
  )
})


