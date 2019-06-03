const math = require("mathjs");

// returns an array with random length of 1-10 and elements from -20 to 50
const generateQueue = () => {
  const randomInteger = math.randomInt(1, 10);
  const output = Array(randomInteger)
    .fill() // fills array with undefined
    .map(number => math.randomInt(-20, 50));
  return output;
};

module.exports = { generateQueue };

