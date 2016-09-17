import test from 'ava'

import {
  getNormaliseBookName,
  getNormaliseBookNameShort,
  getLanguages,
} from '../bible-book-names'

const english = getLanguages('english')
const normaliseBookName = getNormaliseBookName(english)
const normaliseBookNameShort = getNormaliseBookNameShort(english)

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

test('should normalise so to song of solomon', t => {
  t.true(
    normaliseBookNameShort('song of solomon') === 'so'
  )
})
