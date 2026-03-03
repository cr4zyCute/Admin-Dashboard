import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  const [goToPage, setGoToPage] = useState('');

  // Update input when current page changes externally
  useEffect(() => {
    setGoToPage('');
  }, [currentPage]);

  const handleGoToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(goToPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setGoToPage('');
    }
  };

  // Calculate page range to show (max 5 pages)
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current
    const range = [];

    let left = Math.max(1, currentPage - delta);
    let right = Math.min(totalPages, currentPage + delta);

    // Adjust range to always show 5 numbers if possible
    if (totalPages >= 5) {
      if (currentPage <= 3) {
        left = 1;
        right = 5;
      } else if (currentPage >= totalPages - 2) {
        right = totalPages;
        left = totalPages - 4;
      }
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    return range;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 py-2", className)}>
      
      {/* Page Navigation */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 text-slate-400 hover:text-blue-600 disabled:text-slate-200 disabled:cursor-not-allowed transition-colors"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-slate-400 hover:text-blue-600 disabled:text-slate-200 disabled:cursor-not-allowed transition-colors mr-2"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200",
                currentPage === page
                  ? "bg-blue-500 text-white shadow-md shadow-blue-500/30 scale-110"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-400"
              )}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-slate-400 hover:text-blue-600 disabled:text-slate-200 disabled:cursor-not-allowed transition-colors ml-2"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-slate-400 hover:text-blue-600 disabled:text-slate-200 disabled:cursor-not-allowed transition-colors"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

      {/* Go to Page Input */}
      <form onSubmit={handleGoToPage} className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
        <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">Go to page</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={goToPage}
          onChange={(e) => setGoToPage(e.target.value)}
          placeholder={String(currentPage)}
          className="w-12 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
      </form>
    </div>
  );
};

export default Pagination;
