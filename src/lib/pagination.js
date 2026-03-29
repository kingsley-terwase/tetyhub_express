import { useState, useMemo } from "react";

/**
 * @template T
 * @param {{ data: T[], defaultPerPage?: number }} props
 * @returns {{
 *   page:        number,
 *   perPage:     number,
 *   totalPages:  number,
 *   paginated:   T[],
 *   setPage:     (p: number) => void,
 *   setPerPage:  (n: number) => void,
 * }}
 */
export function usePagination({ data, defaultPerPage = 5 }) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultPerPage);

  const totalPages = Math.max(1, Math.ceil(data.length / perPage));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(
    () => data.slice((safePage - 1) * perPage, safePage * perPage),
    [data, safePage, perPage],
  );

  /** @param {number} p */
  const handleSetPage = (p) => setPage(Math.max(1, Math.min(p, totalPages)));

  /** @param {number} n */
  const handleSetPerPage = (n) => {
    setPerPage(n);
    setPage(1);
  };

  return {
    page: safePage,
    perPage,
    totalPages,
    paginated,
    setPage: handleSetPage,
    setPerPage: handleSetPerPage,
  };
}
