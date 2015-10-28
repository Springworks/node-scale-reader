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

        it('should not consider measurements stable', () => {
          analyzer.addMeasurement(grams);
          analyzer.isStabilized().should.eql(false);
        });

      });

      describe('adding equal measurement 3 times (min required count) to 1 different measurement', () => {
        const initial_grams = 2000;
        const grams = 1000;

        beforeEach(() => {
          analyzer.addMeasurement(initial_grams);
        });

        it('should return array of recent measurements', () => {
          analyzer.addMeasurement(grams);
          analyzer.addMeasurement(grams);
          const measurements = analyzer.addMeasurement(grams);
          measurements.should.eql([
            initial_grams,
            grams,
            grams,
            grams,
          ]);
        });

        it('should consider measurements stable', () => {
          analyzer.addMeasurement(grams);
          analyzer.addMeasurement(grams);
          analyzer.addMeasurement(grams);
          analyzer.isStabilized().should.eql(true);
        });

      });

    });

  });

});
