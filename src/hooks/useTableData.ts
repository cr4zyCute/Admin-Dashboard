import { useMemo } from 'react';

export type SortConfig = { key: string; direction: 'asc' | 'desc' } | null;

export const useTableData = <T extends Record<string, any>>(
  data: T[],
  searchQuery: string,
  sortConfig: SortConfig,
  page: number,
  perPage: number,
  searchKeys: (keyof T)[]
) => {
  return useMemo(() => {
    let processed = [...data];

    // Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      processed = processed.filter(item => 
        searchKeys.some(key => String(item[key]).toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortConfig) {
      processed.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle numeric values (strip currency symbols if needed)
        const aNum = parseFloat(String(aValue).replace(/[^0-9.-]+/g, ""));
        const bNum = parseFloat(String(bValue).replace(/[^0-9.-]+/g, ""));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Pagination
    const totalPages = Math.ceil(processed.length / perPage);
    const paginated = processed.slice((page - 1) * perPage, page * perPage);

    return { data: paginated, totalPages, totalItems: processed.length };
  }, [data, searchQuery, sortConfig, page, perPage, searchKeys]); // eslint-disable-line react-hooks/exhaustive-deps
};
