import test from 'ava'
import is from 'is_js'
import {
  booksRegex,
  refRegex,
  endRange,
  partToRange,
  getRanges,
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

test('partToRange(john 3:16)', t => {
  t.deepEqual(
    partToRange('john 3:16'), {
      start: { book: 'john', chapter:'3', verse:'16' },
      end: { book: 'john', chapter:'3', verse:'16' },
      ctx:{ book:'john', chapter:'3', verse:'16' },
    }
  )
})

test('partToRange(john 3)', t => {
  t.deepEqual(
    partToRange('john 3'), {
      start: { book: 'john', chapter:'3', verse:'1' },
      end: { book: 'john', chapter:'3' },
      ctx:{ book:'john', chapter:'3' },
    }
  )
})

test('partToRange(john)', t => {
  t.deepEqual(
    partToRange('john'), {
      start: { book: 'john', chapter:'1', verse:'1' },
      end: { book: 'john' },
      ctx:{ book:'john' },
    }
  )
})

test('partToRange(john 3-4)', t => {
  t.deepEqual(
    partToRange('john 3-4'), {
      start: { book: 'john', chapter:'3', verse:'1' },
      end: { book: 'john', chapter:'4' },
      ctx:{ book:'john', chapter:'3' },
    }
  )
})

test.only('partToRange(3-4) with context john', t => {
  t.deepEqual(
    partToRange('3-4', { book: 'john' } ), {
      start: { book: 'john', chapter:'3', verse:'1' },
      end: { book: 'john', chapter:'4' },
      ctx:{ book:'john', chapter:'3' },
    }
  )
})

test.only('partToRange(3-4) with context john 1', t => {
  t.deepEqual(
    partToRange('3-4', { book: 'john', chapter: '1' } ), {
      start: { book: 'john', chapter:'3', verse:'1' },
      end: { book: 'john', chapter:'4' },
      ctx:{ book:'john', chapter:'3' },
    }
  )
})

test.only('partToRange(3-4) with context john 1:2', t => {
  t.deepEqual(
    partToRange('3-4', {
      book: 'john',
      chapter: '1',
      verse: '2',
    } ), {
      start: { book: 'john', chapter:'1', verse: '3' },
      end: { book: 'john', chapter:'1', verse: '4' },
      ctx:{ book:'john', chapter:'1', verse: '3' },
    }
  )
})

test.only('partToRange(3) with context john 1:2', t => {
  t.deepEqual(
    partToRange('3', {
      book: 'john',
      chapter: '1',
      verse: '2',
    } ), {
      start: { book: 'john', chapter:'1', verse: '3' },
      end: { book: 'john', chapter:'1', verse: '3' },
      ctx:{ book:'john', chapter:'1', verse: '3' },
    }
  )
})

test.only('partToRange(3) with context john', t => {
  t.deepEqual(
    partToRange('3', {
      book: 'john',
    } ), {
      start: { book: 'john', chapter:'3', verse: '1' },
      end: { book: 'john', chapter:'3' },
      ctx:{ book:'john', chapter:'3' },
    }
  )
})

test('partToRange(john 3-4:5)', t => {
  t.deepEqual(
    partToRange('john 3-4:5'), {
      start: { book: 'john', chapter:'3', verse:'1' },
      end: { book: 'john', chapter:'4', verse:'5' },
      ctx:{ book:'john', chapter:'3' },
    }
  )
})

test('partToRange(john 3:2-4)', t => {
  t.deepEqual(
    partToRange('john 3:2-4'), {
      start: { book: 'john', chapter:'3', verse:'2' },
      end: { book: 'john', chapter:'3', verse:'4' },
      ctx:{ book:'john', chapter:'3', verse: '2' },
    }
  )
})

test('partToRange(john 3:2-4:5)', t => {
  t.deepEqual(
    partToRange('john 3:2-4:5'), {
      start: { book: 'john', chapter:'3', verse:'2' },
      end: { book: 'john', chapter:'4', verse:'5' },
      ctx:{ book:'john', chapter:'3', verse: '2' },
    }
  )
})

test.only('partToRange(john 3:2 - acts 4:5)', t => {
  t.deepEqual(
    partToRange('john 3:2 - acts 4:5'), {
      start: { book: 'john', chapter:'3', verse:'2' },
      end: { book: 'acts', chapter:'4', verse:'5' },
      ctx:{ book:'john', chapter:'3', verse: '2' },
    }
  )
})

test.only('getRanges(john, matt, rev 5)', t => {
  t.deepEqual(
    getRanges('john, matt, rev 5'), [
      {
        start: { book: 'john', chapter:'1', verse:'1' },
        end: { book: 'john' },
      },
      {
        start: { book: 'matthew', chapter:'1', verse:'1' },
        end: { book: 'matthew' },
      },
      {
        start: { book: 'revelation', chapter:'5', verse:'1' },
        end: { book: 'revelation', chapter:'5' },
      },
    ]
  )
})

test.only('getRanges(john 1:8,10,11)', t => {
  t.deepEqual(
    getRanges('john 1:8,10,11'), [
      {
        start: { book: 'john', chapter:'1', verse:'8' },
        end: { book: 'john', chapter:'1', verse:'8' },
      },
      {
        start: { book: 'john', chapter:'1', verse:'10' },
        end: { book: 'john', chapter:'1', verse:'10' },
      },
      {
        start: { book: 'john', chapter:'1', verse:'11' },
        end: { book: 'john', chapter:'1', verse:'11' },
      },
    ]
  )
})

test.only('getRanges(john 1:8,10-15,11)', t => {
  t.deepEqual(
    getRanges('john 1:8,10-15,11'), [
      {
        start: { book: 'john', chapter:'1', verse:'8' },
        end: { book: 'john', chapter:'1', verse:'8' },
      },
      {
        start: { book: 'john', chapter:'1', verse:'10' },
        end: { book: 'john', chapter:'1', verse:'15' },
      },
      {
        start: { book: 'john', chapter:'1', verse:'11' },
        end: { book: 'john', chapter:'1', verse:'11' },
      },
    ]
  )
})

test.only('getRanges(john 1,10-15,11)', t => {
  t.deepEqual(
    getRanges('john 1,10-15,11'), [
      {
        start: { book: 'john', chapter:'1', verse:'1' },
        end: { book: 'john', chapter:'1' },
      },
      {
        start: { book: 'john', chapter:'10', verse:'1' },
        end: { book: 'john', chapter:'15' },
      },
      {
        start: { book: 'john', chapter:'11', verse:'1' },
        end: { book: 'john', chapter:'11' },
      },
    ]
  )
})


