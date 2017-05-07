'use strict';

describe('le_taste.version module', function() {
  beforeEach(module('le_taste.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
