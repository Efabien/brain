const struct = [
  {
    a: 1,
    b: 5,
    c: 2
  },
  {
    a: 7,
    b: 4,
    c: 8
  },
  {
    a: 5,
    b: 41,
    c: 14
  }
];
const average = (struct) => {
  if (!struct.length) return {};
  const keys = Object.keys(struct[0]);
  const tensor = keys.map(key => {
    return struct.map(item => item[key]);
  });
  return keys.reduce((result, key, index) => {
    result[key] = tensor[index].reduce((sum, value) => sum + value) / tensor[index].length;
    return result;
  }, {});
}

const substract = (struct) => {
  if (!struct.length) return [];
  const keys = Object.keys(struct[0]);
  const tensor = keys.map(key => {
    return struct.map(item => item[key]);
  });
  return tensor.map(row => {
    return row.reduce((result, item) => {
      const value = result - item;
      return value < 0 ? value * -1 : value;
    }, 0);
  });
}

exports.average = average;
exports.substract = substract;