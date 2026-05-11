import Head from "next/head";
import Board from "./Component/board";

export default function Home() {
  return (
    <>
      <Head>
        <title>Play Game 2048 </title>
        <meta name="description" content="Game 2048 Ceate React " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Board />
    </>
  );
}
