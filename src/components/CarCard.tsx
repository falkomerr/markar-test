"use client";

import { Car } from "@/types/cars";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextImageIndex, setNextImageIndex] = useState<number | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const formatEngineVolume = (volume: number) => {
    return (volume / 1000).toFixed(1);
  };

  const getCarImages = (): string[] => {
    if (car.images && car.images.image && car.images.image.length > 0) {
      return car.images.image;
    }
    if (car.photos && car.photos.length > 0) {
      return car.photos;
    }
    return ["/placeholder.jpg"];
  };

  const images = getCarImages();

  const prevImage = () => {
    if (isAnimating || images.length <= 1) return;
    setIsAnimating(true);
    setDirection(-1);
    const newIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setNextImageIndex(newIndex);
  };

  const nextImage = () => {
    if (isAnimating || images.length <= 1) return;
    setIsAnimating(true);
    setDirection(1);
    const newIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setNextImageIndex(newIndex);
  };

  const goToImage = (index: number) => {
    if (isAnimating || index === currentImageIndex || images.length <= 1)
      return;
    setIsAnimating(true);
    setDirection(index > currentImageIndex ? 1 : -1);
    setNextImageIndex(index);
  };

  useEffect(() => {
    if (!isAnimating || nextImageIndex === null) return;

    const timer = setTimeout(() => {
      setCurrentImageIndex(nextImageIndex);
      setIsAnimating(false);
      setNextImageIndex(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [isAnimating, nextImageIndex]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full relative">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Текущее изображение */}
          <div
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              isAnimating
                ? direction > 0
                  ? "translate-x-[-100%]"
                  : "translate-x-[100%]"
                : ""
            }`}
          >
            <Image
              src={images[currentImageIndex]}
              alt={`${car.mark_id} ${car.folder_id}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoadingComplete={() => setIsImageLoading(false)}
              className="transition-opacity duration-300"
              priority={currentImageIndex === 0}
            />
          </div>

          {/* Следующее изображение (для анимации) */}
          {isAnimating && nextImageIndex !== null && (
            <div
              className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
                direction > 0
                  ? "translate-x-[100%] -translate-x-full"
                  : "translate-x-[-100%] translate-x-full"
              }`}
            >
              <Image
                src={images[nextImageIndex]}
                alt={`${car.mark_id} ${car.folder_id}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="transition-opacity duration-300"
              />
            </div>
          )}

          {images.length > 1 && (
            <>
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md z-20">
                {currentImageIndex + 1} / {images.length}
              </div>

              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
                {images.length <= 10 &&
                  images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      onClick={() => goToImage(index)}
                    />
                  ))}
              </div>

              <button
                className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 z-20 ${
                  isAnimating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={prevImage}
                aria-label="Предыдущее изображение"
                disabled={isAnimating}
              >
                &lt;
              </button>
              <button
                className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 z-20 ${
                  isAnimating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={nextImage}
                aria-label="Следующее изображение"
                disabled={isAnimating}
              >
                &gt;
              </button>
            </>
          )}
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {car.mark_id} {car.folder_id}
        </h2>
        <p className="text-xl font-bold text-blue-600 mb-3">
          {formatPrice(car.price)} ₽
        </p>

        <div className="mb-4 border rounded-lg overflow-hidden">
          <table className="w-full text-sm text-gray-700">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3 bg-blue-50 font-medium">Пробег</td>
                <td className="py-2 px-3">{car.run.toLocaleString()} км</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3 bg-blue-50 font-medium">Топливо</td>
                <td className="py-2 px-3">{car.engine_type}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3 bg-blue-50 font-medium">Коробка</td>
                <td className="py-2 px-3">{car.gearbox}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 bg-blue-50 font-medium">Двигатель</td>
                <td className="py-2 px-3">
                  {formatEngineVolume(car.engine_volume)} л ({car.engine_power})
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-auto">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl transition-colors font-medium">
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
