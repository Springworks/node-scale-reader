/**
 * Sends weight value to wherever suitable, e.g. an external API.
 */


const api = {
  create(transmitter) {
    return {
      transmitWeight(grams) {
        return transmitter.transmit({
          grams,
          timestamp: new Date().toISOString(),
        });
      },
    };
  },
};

export default api;
