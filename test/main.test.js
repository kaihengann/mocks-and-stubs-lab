const processPayments = require("../src/main");
const paymentService = require("../src/paymentService");
const queueService = require("../src/queueService");
const makePayment = paymentService.makePayment;
const refundPayment = paymentService.refundPayment;
const generateQueue = queueService.generateQueue;

jest.mock("../src/queueService");
jest.mock("../src/paymentService");

beforeEach(() => jest.resetAllMocks());

// const spyGenerateQueue = jest.spyOn(queueService, 'generateQueue');
// const spyMakePayment = jest.spyOn(paymentService, 'makePayment');
// const spyRefundPayment = jest.spyOn(paymentService, 'refundPayment');

describe("Test processPayments", () => {
  it("should not call makePayment or refundPayment when paymentQueue is empty", () => {
    generateQueue.mockImplementation(() => []);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(0);
    expect(refundPayment).toBeCalledTimes(0);
  });
  it('should call makePayment when next item in paymentQueue is positive', () => {
    generateQueue.mockImplementation(() => [1]);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(1);
    expect(refundPayment).toBeCalledTimes(0);
  });
  it('should call refundPayment when next item in paymentQueue is negative', () => {
    generateQueue.mockImplementation(() => [-1]);
    expect(processPayments()).toBe(undefined);
    expect(makePayment).toBeCalledTimes(0);
    expect(refundPayment).toBeCalledTimes(1);
  });
});

// mock generateq, paymentq empty, no while loop
// q > 0 , returns output
// q = 1 , c
// calls only make
//
// mock paymentservice and queueservice
