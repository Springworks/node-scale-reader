/**
 * Reads weight from a file and passes it along to a weight responder.
 */

import Tail from 'always-tail';


const internals = {

  provideTail(file_path) {
    const tail_separator = '\n';
    return new Tail(file_path, tail_separator, { interval: 100 });
  },

  handleUpdate(weight_responder, data) {
    weight_responder.respondToWeight(data);
  },

};

const api = {

  create(file_path, weight_responder) {
    const tail = internals.provideTail(file_path);
    tail.on('line', function(data) {
      internals.handleUpdate(weight_responder, data);
    });
    tail.on('error', function(data) {
      console.error('weight-reader failed:', data);
    });

    return {
      read() {
        tail.watch();
      },
    };
  },

};

export default api;


/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  api.internals = internals;
}
