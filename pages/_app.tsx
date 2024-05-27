import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Piazzolla } from "next/font/google";

const piazzolla = Piazzolla({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={piazzolla.className}>
      <Component {...pageProps} />
    </div>
  );
}
