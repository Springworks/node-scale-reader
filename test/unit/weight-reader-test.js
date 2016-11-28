import weight_reader from '../../src/weight-reader';

describe('test/unit/weight-reader-test.js', () => {
  let sinon_sandbox;

  beforeEach(() => {
    sinon_sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sinon_sandbox.restore();
  });

  describe('create', () => {

    describe('with valid file_path, weight_responder', () => {
      const file_path = '/dev/null';
      let weight_responder;
      let mock_tail;
      let tail_on_spy;

      beforeEach('mockWeightResponder', () => {
        weight_responder = {};
      });

      beforeEach(() => {
        mock_tail = weight_reader.internals.provideTail();
        tail_on_spy = sinon_sandbox.spy(mock_tail, 'on');
        sinon_sandbox.stub(weight_reader.internals, 'provideTail').returns(mock_tail);
      });

      it('should return object with read() function', () => {
        const reader = weight_reader.create(file_path, weight_responder);
        reader.should.have.keys([
          'read',
        ]);
      });

      it('should listen on "line" event', () => {
        weight_reader.create(file_path, weight_responder);
        tail_on_spy.getCall(0).args[0].should.eql('line');
      });

      it('should listen on "error" event', () => {
        weight_reader.create(file_path, weight_responder);
        tail_on_spy.getCall(1).args[0].should.eql('error');
      });

    });

  });

});
