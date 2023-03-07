import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-black">
        <div className="flex flex-wrap items-center justify-between bg-emerald-600 px-4 lg:px-8 py-6">
          <ul className="flex w-full flex-row">
            <p className="my-auto block text-2xl text-black">PoolTemp</p>

            <Link
              href="/"
              className=" ml-4 lg:ml-8 my-auto text-xl block hover:text-white text-black"
            >
              Home
            </Link>
            <Link
              href="/sensors"
              className="mx-4 my-auto text-xl block hover:text-white text-black"
            >
              Sensors
            </Link>
          </ul>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
