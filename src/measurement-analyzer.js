import takeRight from 'lodash.takeright';

const api = {
  create() {
    const recent_measurements = [];
    return {
      isStabilized() {
        const MINIMUM_EQUAL_VALUES_FOR_STABILITY = 3;
        const tail = takeRight(recent_measurements, MINIMUM_EQUAL_VALUES_FOR_STABILITY);
        if (tail.length < MINIMUM_EQUAL_VALUES_FOR_STABILITY) {
          return false;
        }

        let previous = null;
        for (let i = 0; i < tail.length; i++) {
          const value = tail[i];
          if (previous !== null && value !== previous) {
            return false;
          }
          previous = value;
        }

        return true;
      },

      addMeasurement(measurement) {
        recent_measurements.push(measurement);
        return recent_measurements;
      },
    };
  },
};

export default api;
