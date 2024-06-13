import Footer from "@/components/footer";
import Header from "@/components/header";
import HeaderInfo from "@/components/header-info";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:locale" content="en_US" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Ahmad Hisyam" />
        <meta property="og:type" content="website" />


        {/* <!-- Google Font --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />


      </Head>
      <body>
        <HeaderInfo />
        <Header />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
