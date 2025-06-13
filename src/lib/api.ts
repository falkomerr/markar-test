"use client";

import { ApiResponse, SortOrder } from "@/types/cars";

export async function getCars(
  page: number = 1,
  sortBy: string = "",
  order: SortOrder = ""
): Promise<ApiResponse> {
  const limit = 12;

  // Используем абсолютный URL с origin для fetch запроса
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000");

  let url = `${baseUrl}/api/cars?_limit=${limit}&_page=${page}`;

  if (sortBy && order) {
    url += `&_sort=${sortBy}&_order=${order}`;
  }

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }

  return response.json();
}
