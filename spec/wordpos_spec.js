/**
 * wordpos_spec.js
 *
 * spec file for main wordpos functionality
 *
 * Usage:
 *   npm install jasmine-node -g
 *   jasmine-node wordpos_spec.js --verbose
 *
 * Copyright (c) 2012 mooster@42at.com
 * https://github.com/moos/wordpos
 *
 * Released under MIT license
 */
var WordPOS = require('../src/wordpos'),
  wordpos = new WordPOS();

var str = "The angry bear chased the frightened little squirrel",
  expected = {
    nouns: [ 'bear', 'squirrel', 'little', 'chased' ],
    verbs: [ 'bear' ],
    adjectives: [ 'little', 'angry', 'frightened' ],
    adverbs: [ 'little' ],
    rest: [ 'the' ]
  },
  garble = 'garblegarble';	// expect not to find word


describe('getX()...', function() {

  beforeEach(function() {
    this.addMatchers({
    // unordered (multiset) comparison -- NOTE: doesn't handle deep!
    toEqualUnordered: function(expected) {
      var mismatchKeys=[],
        mismatchValues=[],
        result = this.env.compareObjects_(this.actual, expected, mismatchKeys, mismatchValues);
        return result || (mismatchKeys.length == 0 && mismatchValues.length > 0);
      }
    });
  });

  it('should get all POS', function() {
    wordpos.getPOS(str, function(result) {
      expect(result.nouns).toEqualUnordered(expected.nouns);
      expect(result.verbs).toEqualUnordered(expected.verbs);
      expect(result.adjectives).toEqualUnordered(expected.adjectives);
      expect(result.adverbs).toEqualUnordered(expected.adverbs);
      expect(result.rest).toEqualUnordered(expected.rest);
      asyncSpecDone();
    });
    asyncSpecWait();
  });

  it('should get nouns', function() {
    wordpos.getNouns(str, function(result) {
      expect(result).toEqualUnordered(expected.nouns);
      asyncSpecDone();
    });
    asyncSpecWait();
  });

  it('should get verbs', function() {
    wordpos.getVerbs(str, function(result) {
      expect(result).toEqualUnordered(expected.verbs);
      asyncSpecDone();
    });
    asyncSpecWait();
  });

  it('should get adjectives', function() {
    wordpos.getAdjectives(str, function(result) {
      expect(result).toEqualUnordered(expected.adjectives);
      asyncSpecDone();
    });
    asyncSpecWait();
  });

  it('should get adverbs', function() {
    wordpos.getAdverbs(str, function(result) {
      expect(result).toEqualUnordered(expected.adverbs);
      asyncSpecDone();
    });
    asyncSpecWait();
  });
});

describe('isX()...', function() {
  it('should check if noun', function() {
    wordpos.isNoun(expected.nouns[0], function(result) {
      expect(result).toBeTruthy();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  it('should check if verb', function() {
    wordpos.isVerb(expected.verbs[0], function(result) {
      expect(result).toBeTruthy();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  it('should check if adjective', function() {
    wordpos.isAdjective(expected.adjectives[0], function(result) {
      expect(result).toBeTruthy();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  it('should check if adverb', function() {
    wordpos.isAdverb(expected.adverbs[0], function(result) {
      expect(result).toBeTruthy();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
});

describe('!isX()...', function() {
  it('should check if !noun', function() {
    wordpos.isNoun(garble, function(result) {
      expect(result).not.toBeTruthy();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  it('should check if !verb', function() {
    wordpos.isVerb(garble, function(result) {
      expect(result).not.toBeTruthy();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  it('should check if !adjective', function() {
    wordpos.isAdjective(garble, function(result) {
      expect(result).not.toBeTruthy();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  it('should check if !adverb', function() {
    wordpos.isAdverb(garble, function(result) {
      expect(result).not.toBeTruthy();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
});

describe('lookupX()...', function() {
  it('should lookup noun', function() {
    wordpos.lookupNoun('squirrel', function(result) {
      expect(result[0].pos).toBe('n');
      expect(result[0].lemma).toBe('squirrel');
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  it('should lookup verb', function() {
    wordpos.lookupVerb('bear', function(result) {
      expect(result[0].pos).toBe('v');
      expect(result[0].lemma).toBe('have_a_bun_in_the_oven');
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  it('should lookup adjective', function() {
    wordpos.lookupAdjective('angry', function(result) {
      expect(result[0].pos).toBe('s');
      expect(result[0].lemma).toBe('angry');
      asyncSpecDone();
    });
    asyncSpecWait();
  });
  it('should lookup adverb', function() {
    wordpos.lookupAdverb('little', function(result) {
      expect(result[0].pos).toBe('r');
      expect(result[0].lemma).toBe('little');
      asyncSpecDone();
    });
    asyncSpecWait();
  });
});

describe('options passed to constructor', function() {
    var wp, origProfile = WordPOS.defaults.profile;

    it('should override default option', function(){
      wp = new WordPOS({profile:123});
      expect(wp.options.profile).toEqual(123);
      expect(WordPOS.defaults.profile).toEqual(origProfile);
    });

    it('should not erase default option', function(){
      wp = new WordPOS({aaa:123});
      expect(wp.options.aaa).toEqual(123);
      expect(wp.options.profile).toEqual(WordPOS.defaults.profile);
    });
});

describe('profile option', function() {

  var wp = new WordPOS({profile : true});

  it('should return time argument for isX()', function(){
    wp.isNoun(garble, function(result, word, time) {
      expect(word).toEqual(garble);
      expect(time).toBeDefined();
      asyncSpecDone();
    });
    asyncSpecWait();
  });

  it('should return time argument for getX()', function(){
    wp.getNouns(garble, function(result, time) {
      expect(time).toBeDefined();
      asyncSpecDone();
    });
    asyncSpecWait();
  });

  it('should return time argument for lookupX()', function(){
    wp.isNoun(garble, function(result, time) {
      expect(time).toBeDefined();
      asyncSpecDone();
    });
    asyncSpecWait();
  });
});
