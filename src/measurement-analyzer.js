import takeRight from 'lodash.takeright';

const api = {
  create() {
    const recent_measurements = [];
    return {

      isLatestValueDifferent() {
        const tail = takeRight(recent_measurements, 2);
        return tail.length === 1 || tail[0] !== tail[1];
      },

      addMeasurement(measurement) {
        recent_measurements.push(measurement);
        return recent_measurements;
      },

    };
  },
};

export default api;
