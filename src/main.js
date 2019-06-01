const { makePayment, refundPayment } = require("./paymentService");
const { generateQueue } = require("./queueService");

// Generates random queue and prints amount to pay or refund
const processPayments = () => {
  const paymentQueue = generateQueue();

  while (paymentQueue.length > 0) {
    const currentItem = paymentQueue.shift(); // removes first item from queue
    if (currentItem >= 0) {
      makePayment(currentItem);
    } else {
      refundPayment(currentItem);
    }
  }
};

// uncomment the next line and run: node src/main.js a few times to see how this function works
// processPayments();

module.exports = processPayments;
