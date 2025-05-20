'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import './globals.css'
import { Inter } from 'next/font/google'
import GlobalState from "@/src/context"
import Navbar from '@/src/components/Navbar'
import { useEffect } from "react";
import Footer from "@/src/components/Footer/Footer";
import "@/public/css/style.css"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
useEffect(() => {
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}, []);


  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=Alumni+Sans+Collegiate+One&family=Inclusive+Sans&family=Rubik&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet"></link>
      </head>
      <body className={`${inter.className} w-screen flex-grow flex flex-col min-h-screen text-black`}>
        <GlobalState>
          <Navbar/>
          <main className='flex-grow bg-white pt-[12vh] flex flex-col md:pt-[29vh]'>
            {children}
          </main>
          <Footer/>
        </GlobalState>
      </body>
    </html>
  )
}
