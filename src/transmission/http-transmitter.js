import request from 'request';

const internals = {
  sendRequest(req_opts) {
    return new Promise((resolve, reject) => {
      request(req_opts, (err, res, response_body) => {
        if (err) {
          reject(err);
          return;
        }
        else if (res.statusCode >= 400) {
          reject(new Error(`Request responded with status code ${res.statusCode}`));
          return;
        }
        resolve(response_body);
      });
    });
  },
};

const api = {
  create(config) {
    return {
      transmit(payload) {
        const req_opts = {
          method: config.method,
          url: config.target_url,
          json: payload,
        };
        return internals.sendRequest(req_opts);
      },
    };
  },
};

export default api;


/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  api.internals = internals;
}
