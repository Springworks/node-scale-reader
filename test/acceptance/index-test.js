describe('test/acceptance/index-test.js', () => {

  describe('load index', () => {

    it('should not fail', () => {
      // eslint-disable-next-line global-require
      const index = require('../../src/index');
      should.exist(index);
    });

  });

});
