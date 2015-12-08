import weight_responder from './weight-responder';
import measurement_analyzer from './measurement-analyzer';
import http_transmitter from './transmission/http-transmitter';
import weight_transmitter from './transmission/weight-transmitter';
import weight_reader from './weight-reader';

const api = {
  run(filename, target_url) {
    const http_config = {
      target_url: target_url,
      method: 'patch',
    };

    const transmitter = weight_transmitter.create(http_transmitter.create(http_config));
    const analyzer = measurement_analyzer.create();
    const responder = weight_responder.create(transmitter, analyzer);
    const reader = weight_reader.create(filename, responder);
    reader.read();
  },
};

export default api;
