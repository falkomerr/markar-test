import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Каталог автомобилей",
  description: "Выбирайте автомобили по лучшим ценам",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <div className="min-h-screen bg-gray-100">
          <div className="py-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
