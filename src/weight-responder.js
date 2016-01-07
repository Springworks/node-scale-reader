/**
 * Acts on a scale weight value and acts accordingly.
 */

const internals = {
  parseWeightToGrams(weight_str) {
    // weight_str is something like "1234 g" (but could also be "oz" sometimes)
    return parseInt(weight_str, 10);
  },
};

const api = {
  create(weight_transmitter, measurement_analyzer) {
    return {
      respondToWeight(weight_str) {
        const grams = internals.parseWeightToGrams(weight_str);

        console.log('Responding to read weight: %d g', grams);

        measurement_analyzer.addMeasurement(grams);
        if (measurement_analyzer.isLatestValueDifferent()) {
          return weight_transmitter.transmitWeight(grams)
              .then(() => {
                console.log('Transmitted weight: %d g', grams);
              })
              .catch(err => {
                console.error('Failed to transmit weight', err);
              });
        }
        return Promise.resolve();
      },
    };
  },
};

export default api;
