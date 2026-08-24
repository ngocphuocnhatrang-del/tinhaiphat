import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Tín Hải Phát Construction",
  description:
    "Tín Hải Phát Construction - Kiến tạo không gian, xây dựng giá trị bền vững.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${montserrat.variable} antialiased`}>
  <LanguageProvider>
    {children}
  </LanguageProvider>
</body>
    </html>
  );
}