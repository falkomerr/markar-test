"use client";

import { getCars } from "@/lib/api";
import { ApiResponse, SortOrder } from "@/types/cars";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CarsGrid from "./CarsGrid";
import Pagination from "./Pagination";
import SortSelector from "./SortSelector";

export default function CarsList() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<ApiResponse["data"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  });

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const sortField = searchParams.get("sort") || "";
  const sortOrder = (searchParams.get("order") as SortOrder) || "";

  useEffect(() => {
    const fetchCarsData = async () => {
      setLoading(true);
      try {
        const response = await getCars(page, sortField, sortOrder);
        setCars(response.data);
        setMeta(response.meta);
        setError(null);
      } catch (err) {
        setError(
          "Не удалось загрузить автомобили. Пожалуйста, попробуйте позже."
        );
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarsData();
  }, [page, sortField, sortOrder]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Каталог автомобилей
        </h1>
        <p className="text-gray-600">Найдено {meta.total} предложений</p>
      </div>

      <SortSelector />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center text-red-500">
          {error}
        </div>
      ) : (
        <CarsGrid cars={cars} />
      )}

      <Pagination currentPage={meta.current_page} totalPages={meta.last_page} />
    </>
  );
}
