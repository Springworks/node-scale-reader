import http_transmitter from '../../../src/transmission/http-transmitter';


describe(__filename, function() {
  let sinon_sandbox;

  beforeEach(() => {
    sinon_sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sinon_sandbox.restore();
  });

  describe('with valid config', () => {
    let mock_config;
    let transmitter;

    beforeEach(() => {
      mock_config = {
        target_url: 'http://mock.com/v1/path/to/scale',
        method: 'patch',
      };
    });

    beforeEach(() => {
      const http_response = {};
      sinon_sandbox.stub(http_transmitter.internals, 'sendRequest').returns(Promise.resolve(http_response));
    });

    beforeEach(() => {
      transmitter = http_transmitter.create(mock_config);
    });

    describe('with valid weight', () => {
      const grams = 1234.5;
      const payload = {
        grams,
        timestamp: new Date().toISOString(),
      };

      it('should execute request()', () => {
        return transmitter.transmit(payload).then(() => {
          http_transmitter.internals.sendRequest.should.have.callCount(1);
        });
      });

      it('should have proper request options', () => {
        return transmitter.transmit(payload).then(() => {
          const call_args = http_transmitter.internals.sendRequest.getCall(0).args;
          call_args[0].should.eql({
            method: mock_config.method,
            url: mock_config.target_url,
            json: payload
          });
        });
      });

    });

  });



});
