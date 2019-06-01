const { generateQueue } = require("../src/queueService");
const math = require("mathjs");

const spyRandomInt = jest.spyOn(math, "randomInt");

beforeEach(() => jest.resetAllMocks());

describe("Test generateQueue", () => {
  it("should call math.randomInt twice when randomInteger and number are both 1", () => {
    spyRandomInt.mockImplementation(() => 1);
    expect(generateQueue()).toEqual([1]);
    expect(spyRandomInt).toBeCalledTimes(2);
  });
  it("should return array with positive numbers when randomInteger and number are both positive", () => {
    // array.length = 3, number = 3
    spyRandomInt.mockImplementation(() => 3);
    expect(generateQueue()).toEqual([3, 3, 3]);
    // array.length = 5, number = 3
    spyRandomInt.mockImplementationOnce(() => 5);
    expect(generateQueue()).toEqual([3, 3, 3, 3, 3]);
    // array.length = 5, number = 2
    spyRandomInt.mockImplementationOnce(() => 5);
    spyRandomInt.mockImplementation(() => 2);
    expect(generateQueue()).toEqual([2, 2, 2, 2, 2]);
  });
  it("should return array with negative numbers when randomInteger is positive and number is negative", () => {
    // array.length = 4, number = -20
    spyRandomInt.mockImplementationOnce(() => 4);
    spyRandomInt.mockImplementation(() => -20);
    expect(generateQueue()).toEqual([-20, -20, -20, -20]);
    // array.length = 2, number = -20
    spyRandomInt.mockImplementationOnce(() => 2);
    spyRandomInt.mockImplementation(() => -20);
    expect(generateQueue()).toEqual([-20, -20]);
    // array.length = 2, number = -5
    spyRandomInt.mockImplementationOnce(() => 2);
    spyRandomInt.mockImplementation(() => -5);
    expect(generateQueue()).toEqual([-5, -5]);
  });
  it("should return mixed array when number is either positive or negative", () => {
    spyRandomInt.mockImplementationOnce(() => 3);
    spyRandomInt.mockImplementationOnce(() => 1);
    spyRandomInt.mockImplementationOnce(() => -14);
    spyRandomInt.mockImplementation(() => 5);
    expect(generateQueue()).toEqual([1, -14, 5]);
  });
  it("should return an array when mock is removed", () => {
    spyRandomInt.mockRestore();
    const t = generateQueue();
    console.log("Restored randomInt returns:", t);
    expect(Array.isArray(t)).toBe(true);
  });
});
