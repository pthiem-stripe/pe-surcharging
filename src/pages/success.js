import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Stripe Press</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-6  max-w-7xl mx-auto text-gray-700 text-sm">
        <main className="flex flex-col items-center justify-center ">
          <div className="w-full items-center flex flex-col mb-20  ">
            <div className="font-bold uppercase">PAyment successful</div>
            <div className="mt-4">Your books will be on their way soon</div>
            <div className="mt-8">
              <Link href="/">
                <button className="buttonPrimary w-full mt-6">restart</button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
