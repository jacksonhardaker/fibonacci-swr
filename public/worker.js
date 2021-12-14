
const fibonacci = (num) => {
  if (num <= 1) return 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
};

onmessage = function(e) {
  const fib = fibonacci(e.data)
  postMessage(fib);
}
