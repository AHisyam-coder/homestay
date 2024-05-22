import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Piazzolla } from "next/font/google";

const piazolla = Piazzolla({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${piazolla.style}`}>
      <style jsx global>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: var(--font-playfair);
        }
      `}</style>
      <Component {...pageProps} />
    </div>
  );
}
