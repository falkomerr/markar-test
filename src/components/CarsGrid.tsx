import { Car } from "@/types/cars";
import CarCard from "./CarCard";

interface CarsGridProps {
  cars: Car[];
}

export default function CarsGrid({ cars }: CarsGridProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <p className="text-lg text-gray-600">
          К сожалению, автомобили не найдены.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map((car) => (
        <div
          key={car.unique_id || `car-${car.mark_id}-${car.vin}`}
          className="h-full"
        >
          <CarCard car={car} />
        </div>
      ))}
    </div>
  );
}
