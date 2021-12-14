import { useContext, useMemo, useState } from "react";
import useSWR from "swr";
import { ctx } from "./_app";

const fetcherMachine = (worker) => async (num) => {
  return new Promise((resolve) => {
    if (worker) {
      worker.onmessage = function(e) {
        e.data;
        resolve(e.data);
      }
      worker?.postMessage?.(num)
    }
  });
};

export default function Home() {
  const [num, setNum] = useState(40);
  const worker = useContext(ctx);
  const fetcher = useMemo(() => fetcherMachine(worker), [worker]);
  const { data, isValidating } = useSWR(worker ? num: null, fetcher);

  return (
    <div className="App">
      <div>
        <button onClick={() => setNum((n) => n - 1)}>-</button>
        <span>{num}</span>
        <button onClick={() => setNum((n) => n + 1)}>+</button>
      </div>
      <h2>
        Fibonacci at index {num} is {isValidating ? "..." : data}
      </h2>
    </div>
  );
}
