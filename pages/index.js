import { useContext, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr/immutable";
import { ctx } from "./_app";

const fetcherMachine = (worker) => async (num) => {
  return new Promise((resolve) => {
    if (worker) {
      worker.onmessage = function (e) {
        console.log(
          `%cReceived [${e.data}] and returning via useSWR...`,
          "color: green;"
        );
        resolve(e.data);
      };
      console.log(`%cPosting [${num}] to Web Worker...`, "color: orange;");
      worker.postMessage?.(num);
    }
  });
};

const Loading = () => {
  const [dots, setDots] = useState("");
  const timeout = useRef(null);

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setDots((d) => (d.length === 6 ? "" : d + "."));
    }, 200);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [dots]);

  return <span>{dots}</span>;
};

export default function Home() {
  const [num, setNum] = useState(40);
  const worker = useContext(ctx);
  const fetcher = useMemo(() => fetcherMachine(worker), [worker]);
  const { data, isValidating } = useSWR(worker ? num : null, fetcher);

  return (
    <div className="App">
      <div>
        <button onClick={() => setNum((n) => n - 1)}>-</button>
        <span>{num}</span>
        <button onClick={() => setNum((n) => n + 1)}>+</button>
      </div>
      <h2>
        Fibonacci at index {num} is {isValidating ? <Loading /> : data}
      </h2>
    </div>
  );
}
