import CarsList from "@/components/CarsList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Каталог автомобилей",
  description: "Выбирайте автомобили по лучшим ценам",
};

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="flex flex-col space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-pulse">
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            </div>

            <div className="mb-8 bg-white p-5 rounded-xl shadow-sm animate-pulse">
              <div className="h-6 w-1/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-64 bg-gray-200 rounded"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm p-4 animate-pulse"
                >
                  <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <CarsList />
      </Suspense>
    </main>
  );
}
