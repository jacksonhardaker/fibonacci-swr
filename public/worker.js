
const fibonacci = (num) => {
  if (num <= 1) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
};

onmessage = function(e) {
  console.log(`%cReceived [${e.data}] and calculating Fibonacci number...`, "color: blue;");
  const fib = fibonacci(e.data)
  console.log(`%cCalculated and posting Fibonacci number [${fib}]...`, "color: purple;");
  postMessage(fib);
}
