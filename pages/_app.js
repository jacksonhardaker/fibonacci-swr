import { createContext, useEffect, useState } from "react";
import "../styles/globals.css";

export const ctx = createContext();

function MyApp({ Component, pageProps }) {
  const[worker, setWorker] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Worker) {
      setWorker(new Worker("worker.js"));
    }
  }, []);

  return <ctx.Provider value={worker}><Component {...pageProps} /></ctx.Provider>;
}

export default MyApp;
