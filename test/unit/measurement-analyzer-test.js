import measurement_analyzer from '../../src/measurement-analyzer';

describe(__filename, () => {

  describe('with created analyzer', () => {
    let analyzer;

    beforeEach(() => {
      analyzer = measurement_analyzer.create();
    });

    describe('isLatestValueDifferent', () => {
      const grams = 1000;

      describe('having added one previous measurement', () => {

        beforeEach(() => {
          analyzer.addMeasurement(grams);
        });

        it('should return true', () => {
          analyzer.isLatestValueDifferent().should.eql(true);
        });

        describe('adding one more of the same value', () => {

          beforeEach(() => {
            analyzer.addMeasurement(grams);
          });

          it('should return false', () => {
            analyzer.isLatestValueDifferent().should.eql(false);
          });

        });

        describe('adding another new value', () => {

          beforeEach(() => {
            analyzer.addMeasurement(grams + 1);
          });

          it('should return true', () => {
            analyzer.isLatestValueDifferent().should.eql(true);
          });

        });

      });

    });


  });

});
