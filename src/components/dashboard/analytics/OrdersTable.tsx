import React, { useState } from 'react';
import { Search, ArrowUp, ArrowDown, ArrowUpDown, SlidersHorizontal, Upload } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Pagination from '../../common/Pagination';
import { useAppContext } from '../../../context/AppContext';
import { cn } from '../../../lib/utils';
import { useTableData, SortConfig } from '../../../hooks/useTableData';
import { TableSettingsOverlay } from './Overlays';
import noDataAnimation from '../../../assets/NoData.json';
import Lottie from 'lottie-react';

interface OrdersTableProps {
  orders: any[];
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

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, enableCustomization = false }) => {
  const { 
    orderTableStyle,
    setOrderTableStyle,
    ordersPerPage,
    setOrdersPerPage
  } = useAppContext();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortConfig>(null);
  const [search, setSearch] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Reset page when search changes
  React.useEffect(() => {
    setPage(1);
  }, [search, ordersPerPage]);

  const { data: currentOrders, totalPages, totalItems } = useTableData(
    orders, 
    search, 
    sort, 
    page, 
    ordersPerPage, 
    ['customer', 'email', 'id', 'amount']
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
    const base = cn(
      "transition-all duration-300 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative group",
      orderTableStyle === 'compact' ? "p-4" : "p-6"
    );
    return cn(base, additionalClasses);
  };

  return (
    <div 
      className={getCardClass("lg:col-span-2 flex flex-col relative h-fit")}
      onMouseEnter={() => enableCustomization && setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      {showSettings && enableCustomization && (
        <TableSettingsOverlay 
          tableStyle={orderTableStyle}
          setTableStyle={setOrderTableStyle}
          onClose={() => setShowSettings(false)}
          perPage={ordersPerPage}
          setPerPage={setOrdersPerPage}
        />
      )}
      <div className={cn("transition-all duration-300 h-full flex flex-col", showSettings ? "blur-sm" : "")}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white">Recent Orders</h3>
          <p className="text-xs text-slate-400 mt-1">({totalItems} Transactions)</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
           <div className="relative flex-1 sm:flex-none">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search orders..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full sm:w-48 pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
             />
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-800">
              <Upload className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
         {currentOrders && currentOrders.length > 0 ? (
           <table className={cn(
             "w-full text-left border-collapse min-w-[500px]",
             orderTableStyle === 'bordered' ? "border-2 border-slate-300 dark:border-slate-500" : ""
           )}>
             <thead>
               <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                 {[
                   { key: 'id', label: '#ID', align: 'left' },
                   { key: 'customer', label: 'Customer', align: 'left' },
                   { key: 'date', label: 'Date', align: 'left' },
                   { key: 'amount', label: 'Amount', align: 'left' },
                   { key: 'payment', label: 'Payment', align: 'left' },
                   { key: 'status', label: 'Status', align: 'right' }
                 ].map((col) => (
                   <th 
                     key={col.key}
                     className={cn(
                       "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors select-none group",
                       orderTableStyle === 'compact' ? "py-2 px-2" : "py-3 px-2",
                       col.align === 'right' ? "text-right" : "text-left",
                       col.key === 'id' ? "pr-2" : "",
                       col.key === 'status' ? "pl-2" : "",
                       orderTableStyle === 'bordered' ? "border-x-2 border-slate-200 dark:border-slate-600 first:border-l-0 last:border-r-0" : ""
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
               {currentOrders.map((order) => (
                 <tr 
                   key={order.id} 
                   className={cn(
                     "group transition-all duration-200 border-b border-slate-50 dark:border-slate-800/50 last:border-0",
                     orderTableStyle === 'modern' 
                       ? "hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:scale-[1.01] hover:z-10 border-l-4 border-l-transparent hover:border-l-blue-500" 
                       : "hover:bg-slate-50 dark:hover:bg-slate-700/50",
                     orderTableStyle === 'compact' ? "py-2" : "py-3"
                   )}
                 >
                   <td className={cn(
                     "pr-2 font-medium text-slate-500",
                     orderTableStyle === 'compact' ? "py-2" : "py-3",
                     orderTableStyle === 'bordered' ? "border-r-2 border-slate-200 dark:border-slate-600" : ""
                   )}>{order.id}</td>
                   <td className={cn(
                     "px-2",
                     orderTableStyle === 'compact' ? "py-2" : "py-3",
                     orderTableStyle === 'bordered' ? "border-x-2 border-slate-200 dark:border-slate-600" : ""
                   )}>
                     <div>
                       <p className="font-bold text-slate-700 dark:text-slate-200">{order.customer}</p>
                       <p className="text-xs text-slate-400">{order.email}</p>
                     </div>
                   </td>
                   <td className={cn(
                     "px-2 text-slate-500",
                     orderTableStyle === 'compact' ? "py-2" : "py-3",
                     orderTableStyle === 'bordered' ? "border-x-2 border-slate-200 dark:border-slate-600" : ""
                   )}>{order.date}</td>
                   <td className={cn(
                     "px-2 font-medium text-slate-700 dark:text-slate-200",
                     orderTableStyle === 'compact' ? "py-2" : "py-3",
                     orderTableStyle === 'bordered' ? "border-x-2 border-slate-200 dark:border-slate-600" : ""
                   )}>{order.amount}</td>
                   <td className={cn(
                     "px-2 text-slate-500",
                     orderTableStyle === 'compact' ? "py-2" : "py-3",
                     orderTableStyle === 'bordered' ? "border-x-2 border-slate-200 dark:border-slate-600" : ""
                   )}>{order.payment}</td>
                   <td className={cn(
                     "pl-2 text-right",
                     orderTableStyle === 'compact' ? "py-2" : "py-3",
                     orderTableStyle === 'bordered' ? "border-l-2 border-slate-200 dark:border-slate-600" : ""
                   )}>
                     <span className={cn(
                       "px-2 py-0.5 rounded text-xs font-medium",
                       order.status === 'Success' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" :
                       order.status === 'Pending' ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" :
                       "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                     )}>
                       {order.status}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         ) : (
           <NoData message="No recent orders" />
         )}
      </div>

      <div className={cn(
        "flex justify-between items-center border-t border-slate-100 dark:border-slate-700",
        orderTableStyle === 'compact' ? "mt-4 pt-2" : "mt-6 pt-2"
      )}>
        <span className="text-xs text-slate-400">
          Showing {currentOrders.length > 0 ? (page - 1) * ordersPerPage + 1 : 0} to {Math.min(page * ordersPerPage, totalItems)} of {totalItems} orders
        </span>
        <Pagination 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      </div>
    </div>
  );
};

export default OrdersTable;
