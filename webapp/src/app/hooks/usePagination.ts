import { useState } from "react";

export function usePagination(initialPage = 1, initialPageSize = 8) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);

  const goToPage = (page: number) => setCurrentPage(page);
  const setPageSize = (size: number) => setCurrentPageSize(size);

  return {
    currentPage,
    currentPageSize,
    goToPage,
    setPageSize,
  };
}
