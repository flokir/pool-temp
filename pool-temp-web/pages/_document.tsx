import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="container flex max-w-full flex-wrap items-center justify-between bg-emerald-400 px-8 py-6">
          <ul className="flex w-full flex-row">
            <p className="my-auto block text-xl">PoolTemp</p>
            <Link href="/" className="mx-4 my-auto block hover:text-white">
              Home
            </Link>
          </ul>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
