import test from 'ava'

import {
  normaliseBookName,
} from '../bible-book-names'

test('should normalise jhn', t => {
  t.true(
    normaliseBookName('jhn') === 'john'
  )
})

test('should normalise john', t => {
  t.true(
    normaliseBookName('john') === 'john'
  )
})

test('should normalise iii jn', t => {
  t.true(
    normaliseBookName('iii jn') === '3 john'
  )
})

test('should normalise so to song of solomon', t => {
  t.true(
    normaliseBookName('so') === 'song of solomon'
  )
})
