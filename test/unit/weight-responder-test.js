import weight_responder from '../../src/weight-responder';
import analyzer from '../../src/measurement-analyzer';
import weight_transmitter from '../../src/transmission/weight-transmitter';

describe(__filename, function() {
  let sinon_sandbox;

  beforeEach(() => {
    sinon_sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sinon_sandbox.restore();
  });

  describe('with a created responder', () => {
    let measurement_analyzer;
    let responder;
    let transmitter;

    beforeEach(() => {
      measurement_analyzer = analyzer.create();
      sinon_sandbox.spy(measurement_analyzer, 'addMeasurement');
    });

    beforeEach(function mockWeightTransmission() {
      const http_transmitter = { transmit: () => Promise.resolve() };
      transmitter = weight_transmitter.create(http_transmitter);
      sinon_sandbox.spy(transmitter, 'transmitWeight');
    });

    beforeEach(() => {
      responder = weight_responder.create(transmitter, measurement_analyzer);
    });

    describe('respondToWeight', () => {

      describe('with weight as string', () => {
        const measurement_str = '1234.5 g';
        const grams = 1234;

        describe('when measurements are stabilized', () => {

          beforeEach(() => {
            sinon_sandbox.stub(measurement_analyzer, 'isStabilized').returns(true);
          });

          it('should add measurement in grams, rounded to int', () => {
            return responder.respondToWeight(measurement_str).then(() => {
              measurement_analyzer.addMeasurement.should.have.callCount(1);
              const call_args = measurement_analyzer.addMeasurement.getCall(0).args;
              call_args[0].should.eql(grams);
            });
          });

          it('should transmit weight', () => {
            return responder.respondToWeight(measurement_str).then(() => {
              transmitter.transmitWeight.should.have.callCount(1);
            });
          });

        });

      });

    });

  });

});
