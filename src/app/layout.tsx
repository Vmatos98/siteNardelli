import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nardelli Usinagem - Precisão e Qualidade desde 1991",
  description: "Soluções completas em usinagem de precisão, torno CNC e manutenção industrial. Atendemos grandes empresas como Petrobrás com qualidade e pontualidade.",
  keywords: "usinagem, torno CNC, manutenção industrial, engrenagens, eixos, polias, Sergipe, Aracaju",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
