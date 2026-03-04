import React, { useState } from 'react';
import { Search, ArrowUp, ArrowDown, ArrowUpDown, SlidersHorizontal, Check } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Pagination from '../../common/Pagination';
import { useAppContext } from '../../../context/AppContext';
import { cn } from '../../../lib/utils';
import { useTableData, SortConfig } from '../../../hooks/useTableData';
import { TableSettingsOverlay } from './Overlays';
import noDataAnimation from '../../../assets/NoData.json';
import Lottie from 'lottie-react';

interface ProductsTableProps {
  products: any[];
  enableCustomization?: boolean;
}

const NoData = ({ message }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center h-full w-full min-h-[150px] p-4">
    <div className="w-24 h-24 opacity-80">
      <Lottie animationData={noDataAnimation} loop={true} />
    </div>
    {message && <p className="text-slate-400 mt-2">{message}</p>}
  </div>
);

const ProductsTable: React.FC<ProductsTableProps> = ({ products, enableCustomization = false }) => {
  const { 
    productTableStyle,
    setProductTableStyle,
    productsPerPage,
    setProductsPerPage
  } = useAppContext();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortConfig>(null);
  const [search, setSearch] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Reset page when search changes
  React.useEffect(() => {
    setPage(1);
  }, [search, productsPerPage]);

  const { data: currentProducts, totalPages, totalItems } = useTableData(
    products, 
    search, 
    sort, 
    page, 
    productsPerPage, 
    ['name', 'id']
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sort && sort.key === key && sort.direction === 'asc') {
      direction = 'desc';
    }
    setSort({ key, direction });
  };

  const getCardClass = (additionalClasses = "") => {
    // Basic card style logic - could be shared but kept simple here
    const base = cn(
      "transition-all duration-300 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative group overflow-hidden",
      productTableStyle === 'compact' ? "p-4" : "p-6"
    );
    return cn(base, additionalClasses);
  };

  return (
    <div 
      className={getCardClass("lg:col-span-2 flex flex-col relative h-fit")}
      onMouseEnter={() => enableCustomization && setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      <div className={cn("transition-all duration-300 h-full flex flex-col", showSettings ? "blur-sm" : "")}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">Best Selling Products</h3>
            <p className="text-xs text-slate-400 mt-1">Top performance by revenue</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search products..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full sm:w-48 pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
               />
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-x-auto">
          {currentProducts && currentProducts.length > 0 ? (
            <table className={cn(
              "w-full text-left border-collapse",
              productTableStyle === 'bordered' ? "border-2 border-slate-300 dark:border-slate-500" : ""
            )}>
              <thead>
                <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                  {[
                    { key: 'name', label: 'Product', align: 'left' },
                    { key: 'id', label: 'ID', align: 'right' },
                    { key: 'sold', label: 'Sold', align: 'right' },
                    { key: 'revenue', label: 'Revenue', align: 'right' },
                    { key: 'rating', label: 'Rating', align: 'right' }
                  ].map((col) => (
                    <th 
                      key={col.key}
                      className={cn(
                        "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors select-none group",
                        productTableStyle === 'compact' ? "py-2 px-2" : "py-4 px-4",
                        col.align === 'right' ? "text-right" : "text-left",
                        col.key === 'product' ? "pl-2" : "",
                        productTableStyle === 'bordered' ? "border-x-2 border-slate-200 dark:border-slate-600 first:border-l-0 last:border-r-0" : ""
                      )}
                      onClick={() => handleSort(col.key)}
                    >
                      <div className={cn("flex items-center gap-1", col.align === 'right' ? "justify-end" : "justify-start")}>
                        {col.label}
                        <div className="flex flex-col ml-1">
                          {sort?.key === col.key ? (
                            sort.direction === 'asc' ? <ArrowUp className="w-3 h-3 text-blue-500" /> : <ArrowDown className="w-3 h-3 text-blue-500" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-50 transition-opacity" />
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    className={cn(
                      "group transition-all duration-200 border-b border-slate-50 dark:border-slate-800/50 last:border-0",
                      // Modern Style Replacement
                      productTableStyle === 'modern' 
                        ? "hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:scale-[1.01] hover:z-10 border-l-4 border-l-transparent hover:border-l-blue-500" 
                        : "hover:bg-slate-50 dark:hover:bg-slate-700/50",
                      productTableStyle === 'compact' ? "py-2" : "py-4"
                    )}
                  >
                    <td className={cn(
                      "pr-4 pl-2", 
                      productTableStyle === 'compact' ? "py-2" : "py-4",
                      productTableStyle === 'bordered' ? "border-r-2 border-slate-200 dark:border-slate-600" : ""
                    )}>
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-600 shadow-sm",
                          productTableStyle === 'compact' ? "w-8 h-8 rounded-lg" : "w-12 h-12"
                        )}>
                          <img src={product.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">Electronics</p>
                        </div>
                      </div>
                    </td>
                    <td className={cn(
                      "px-4 text-right font-mono text-xs text-slate-400",
                      productTableStyle === 'compact' ? "py-2" : "py-4",
                      productTableStyle === 'bordered' ? "border-x-2 border-slate-200 dark:border-slate-600" : ""
                    )}>{product.id}</td>
                    <td className={cn(
                      "px-4 text-right",
                      productTableStyle === 'compact' ? "py-2" : "py-4",
                      productTableStyle === 'bordered' ? "border-x-2 border-slate-200 dark:border-slate-600" : ""
                    )}>
                       <span className="font-bold text-slate-700 dark:text-slate-200">{product.sold}</span>
                       <span className="text-xs text-slate-400 ml-1">pcs</span>
                    </td>
                    <td className={cn(
                      "px-4 text-right font-bold text-emerald-600 dark:text-emerald-400",
                      productTableStyle === 'compact' ? "py-2" : "py-4",
                      productTableStyle === 'bordered' ? "border-x-2 border-slate-200 dark:border-slate-600" : ""
                    )}>{product.revenue}</td>
                    <td className={cn(
                      "pl-4 pr-2 text-right",
                      productTableStyle === 'compact' ? "py-2" : "py-4",
                      productTableStyle === 'bordered' ? "border-l-2 border-slate-200 dark:border-slate-600" : ""
                    )}>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                        <span className="text-amber-500 text-xs fill-amber-500">★</span> 
                        <span className="font-bold text-amber-700 dark:text-amber-400 text-xs">{product.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData message="No products found" />
          )}
        </div>

        <div className={cn(
          "flex justify-between items-center border-t border-slate-100 dark:border-slate-700",
          productTableStyle === 'compact' ? "mt-4 pt-2" : "mt-6 pt-2"
        )}>
          <span className="text-xs text-slate-400">
            Showing {currentProducts.length > 0 ? (page - 1) * productsPerPage + 1 : 0} to {Math.min(page * productsPerPage, totalItems)} of {totalItems} products
          </span>
          <Pagination 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {showSettings && enableCustomization && (
        <TableSettingsOverlay 
          itemsPerPage={productsPerPage}
          setItemsPerPage={setProductsPerPage}
          tableStyle={productTableStyle}
          setTableStyle={setProductTableStyle}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default ProductsTable;
