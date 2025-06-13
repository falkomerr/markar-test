import CarsGrid from "@/components/CarsGrid";
import Pagination from "@/components/Pagination";
import SortSelector from "@/components/SortSelector";
import { ApiResponse, SortOrder } from "@/types/cars";
import { Metadata } from "next";

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    order?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Каталог автомобилей",
  description: "Выбирайте автомобили по лучшим ценам",
};

async function fetchCars(
  page: number,
  sortField: string,
  sortOrder: SortOrder
): Promise<ApiResponse> {
  const limit = 12;

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = process.env.VERCEL_URL || "localhost:3000";
  const baseUrl = `${protocol}://${host}`;

  let url = `${baseUrl}/api/cars?_limit=${limit}&_page=${page}`;

  if (sortField && sortOrder) {
    url += `&_sort=${sortField}&_order=${sortOrder}`;
  }

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      return {
        data: [],
        meta: { current_page: 1, last_page: 1, per_page: limit, total: 0 },
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return {
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: limit, total: 0 },
    };
  }
}

export default async function Home(props: HomePageProps) {
  const searchParams = await props.searchParams;

  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const sortField = searchParams.sort || "";
  const sortOrder = (searchParams.order as SortOrder) || "";

  const { data: cars, meta } = await fetchCars(
    currentPage,
    sortField,
    sortOrder
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Каталог автомобилей
        </h1>
        <p className="text-gray-600">Найдено {meta.total} предложений</p>
      </div>

      <SortSelector />

      <CarsGrid cars={cars} />

      <Pagination currentPage={meta.current_page} totalPages={meta.last_page} />
    </main>
  );
}
