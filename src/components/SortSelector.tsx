"use client";

import { SortOrder } from "@/types/cars";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const sortOptions = [
  { value: "", label: "По умолчанию" },
  { value: "asc", label: "Цена: по возрастанию" },
  { value: "desc", label: "Цена: по убыванию" },
];

export default function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentOrder = (searchParams.get("order") as SortOrder) || "";

  const updateSort = useCallback(
    (order: SortOrder) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", "1");

      if (order) {
        params.set("sort", "price");
        params.set("order", order);
      } else {
        params.delete("sort");
        params.delete("order");
      }

      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="mb-8 bg-white p-5 rounded-xl shadow-sm">
      <label htmlFor="sort" className="block mb-2 font-medium text-gray-700">
        Сортировка:
      </label>
      <select
        id="sort"
        value={currentOrder}
        onChange={(e) => updateSort(e.target.value as SortOrder)}
        className="w-full md:w-64 p-3 border border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
