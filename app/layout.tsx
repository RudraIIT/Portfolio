import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css";

const inter = Inter({ subsets : ["latin"] })

export const metadata = {
  title: "Rudra Pratap - Interactive Portfolio",
  description : "An immersive showcase of my work and skills",
}

export default function RootLayout({
  children,
} : {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-text`}>
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive"/>
      </body>
    </html>
  )
}