describe('test/acceptance/index-test.js', function() {

  describe('load index', () => {

    it('should not fail', () => {
      const index = require('../../src/index');
      should.exist(index);
    });

  });

});
