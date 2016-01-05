import measurement_analyzer from '../../src/measurement-analyzer';


describe(__filename, function() {

  describe('with created analyzer', () => {
    let analyzer;

    beforeEach(() => {
      analyzer = measurement_analyzer.create();
    });

    describe('having no added measurements', () => {

      describe('adding one measurement', () => {
        const grams = 1000;

        it('should return array of recent measurements', () => {
          const measurements = analyzer.addMeasurement(grams);
          measurements.should.eql([grams]);
        });

        it('should consider measurements stable', () => {
          analyzer.addMeasurement(grams);
          analyzer.isStabilized().should.eql(true);
        });

      });

    });

  });

});
