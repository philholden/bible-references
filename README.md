# Bible References

[![https://api.travis-ci.org/philholden/bible-references.svg]](https://travis-ci.org/philholden/bible-references)

Parses Bible references in a forgiving way so as to enable as-you-type Bible searches. Enables lists of verses parsed:

* John 3:16
* Acts 2:42-47
* Rom 3:23,5:12-14,6:12,23, Gal 3:22
* Mrk, Rev, Rom - Eph
* Gn 1:1; Jn 1:1
* mark16:1,3
* Luke 3:10ff
* Luke 2:1\nDan 1

## Features

Tolerates whitespace:

```
John3:16-17
John  3: 16 - 17  
```
Book names are case insensitive

```
john 3:16
JOhN 3:16
```

Book name are recognised in many forms:

```
1 samuel, 1 sam, 1 sa, 1samuel, 1s, i sa, 1 sm, 1sa, i sam, 1sam, i samuel, 1st samuel, first samuel
```

Comma newline and semicolon [,\n;] can be used interchangeably as group separators 

```
Job 1:8,9, Mark 5
```
```
Job 1:8,9; Mark 5
```
```
Job 1:8;9; Mark 5
```
```
Job 1:8,9
Mark 5
```
```
Job 1:8,9,
Mark 5
```
Open ranges can be expressed as follows:

```
// range ends at end of chapter
John 3:16ff

// range ends at end of book
John 3ff

// range ends at end of Bible
John 3:16 - 
```

## Output

The output is expressed as an array of ranges:

```javascript
// john 1:8,10-15,11
[
  {
    start: { book: 'john', chapter: '1', verse: '8' },
    end: { book: 'john', chapter: '1', verse: '8' },
  },
  {
    start: { book: 'john', chapter: '1', verse: '10' },
    end: { book: 'john', chapter: '1', verse: '15' },
  },
  {
    start: { book: 'john', chapter: '1', verse: '11' },
    end: { book: 'john', chapter: '1', verse: '11' },
  },
]
```

An `end` property being `undefined` indicates the range continues to the end of smallest defined `end` property. i.e:

* `end.verse === undefined` range ends at end of `end.chapter`
* `end.chapter === undefined` range ends at end of `end.book`
* `end.book === undefined` range ends at end of Bible

## How it works

We first split the input into parts using the group separator `/[,;\n]+/`:

```
'john 1:8,10-15,11' -> ['john 1:8', '10-15', '11']
```

Each of these parts will be mapped to a range of Bible verses. In the case above `'john 1:8'` is a range that starts and ends on the same verse.

It also sets the context for the following ranges. Because `'john 1:8'` specifies a verse we know any groups following that do not specify a book or chapter will be verses in John 1. However if the next range does specify a book or chapter then the context for the following ranges will be set to that book and/or chapter. Note only start books and chapters (on the left of `'-'`) change the context for following verse.  


## Installation

```bash
npm install --save-dev bible-references
```

## When setting up a new repo

`semantic-release-cli setup`

## License

CC0 (public domain)
