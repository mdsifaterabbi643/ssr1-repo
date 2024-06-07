import { Inter } from "next/font/google";
import "./globals.css";
import Head from "./head";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <Head />
      </head>

      <body className={inter.className}>
        <div className="w-[80%] mx-auto border text-center py-[50px]">
          <h1>Header</h1>
        </div>
        <div className="w-[80%] mx-auto border text-center py-[50px]">
          {children}
        </div>
        <div className="w-[80%] mx-auto border text-center py-[50px]">
          <h1>Footer</h1>
        </div>
      </body>
    </html>
  );
}
