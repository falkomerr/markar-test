"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    pages.push(1);
    pages.push(2);
    pages.push(3);

    if (currentPage > 4) {
      pages.push("ellipsis");
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(currentPage);
    }

    if (currentPage < totalPages - 3) {
      pages.push("ellipsis-end");
    }

    pages.push(totalPages);

    return [...new Set(pages)].sort((a, b) => {
      if (a === "ellipsis" || a === "ellipsis-end") return 0;
      if (b === "ellipsis" || b === "ellipsis-end") return 0;
      return Number(a) - Number(b);
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-8">
      <nav className="flex items-center flex-wrap justify-center">
        <button
          onClick={() => currentPage > 1 && navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded-xl ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-blue-600 hover:bg-blue-50 border border-gray-300"
          }`}
          aria-label="Previous page"
        >
          &lt;
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis" || page === "ellipsis-end") {
            return (
              <span
                key={`${page}-${index}`}
                className="px-4 py-2 mx-1 text-gray-600"
              >
                ...
              </span>
            );
          }

          const pageNum = Number(page);
          return (
            <button
              key={`page-${page}`}
              onClick={() => navigateToPage(pageNum)}
              className={`px-4 py-2 mx-1 rounded-xl font-medium ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-50 border border-gray-300"
              }`}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() =>
            currentPage < totalPages && navigateToPage(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded-xl ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-blue-600 hover:bg-blue-50 border border-gray-300"
          }`}
          aria-label="Next page"
        >
          &gt;
        </button>
      </nav>
    </div>
  );
}
