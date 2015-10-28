import weight_transmitter from '../../../src/transmission/weight-transmitter';

describe(__filename, function() {
  let sinon_sandbox;

  beforeEach(() => {
    sinon_sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sinon_sandbox.restore();
  });

  describe('transmitWeight', () => {

    describe('with a weight in grams', () => {
      const grams = 1234.5;

      describe('using a http transmitter', () => {
        let http_transmitter;
        let transmitter;

        beforeEach(() => {
          http_transmitter = {
            transmit: function() {
              return Promise.resolve();
            }
          };
          sinon_sandbox.spy(http_transmitter, 'transmit');
        });

        beforeEach(() => {
          transmitter = weight_transmitter.create(http_transmitter);
        });

        it('should use HTTP transmitter to send request', () => {
          return transmitter.transmitWeight(http_transmitter, grams).then(() => {
            http_transmitter.transmit.should.have.callCount(1);
          });
        });

      });

    });

  });

});
