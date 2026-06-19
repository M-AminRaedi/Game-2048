import SocialLinks from "./Components/SocialLinks";
import Footer from "./Components/Footer";
import Head from "next/head";
import Score from "./Components/score";
import Board from "./Components/board";
import styles from "../styles/index.module.css";
export default function Home() {
  return (
    <div className={styles.twenty48}>
      <Head>
        <title>Play 2048</title>
        <meta
          name="description"
          content="Fully-functional 2048 game built in NextJS and TypeScript. Including animations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      {/* Header */}
      <header style={{ textAlign: "center" }}>
        <h1>2048</h1>
        <Score />
      </header>

      {/* Game */}
      <main>
        <Board />
      </main>

      {/* Social Links */}
      <SocialLinks />

      {/* Footer */}
      <Footer />
    </div>
  );
}
