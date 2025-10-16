import { FaShoppingCart, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import OrderTable from './OrderTable';
import { useSelector } from 'react-redux';
import useOrderFilter from '../../../hooks/useOrderFilter';
import ModernLoader from '../../shared/ModernLoader';

const Orders = () => {
  const {adminOrder, pagination} = useSelector((state) => state.order);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useOrderFilter();

  console.log('Orders Component - adminOrder:', adminOrder);
  console.log('Orders Component - pagination:', pagination);
  console.log('Orders Component - isLoading:', isLoading);
  console.log('Orders Component - errorMessage:', errorMessage);

  // Show loading state
  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 pb-12 pt-24'>
        <div className="max-w-7xl mx-auto px-4">
          <ModernLoader text="Loading your orders..." />
        </div>
      </div>
    );
  }

  // Show error state
  if (errorMessage) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 pb-12 pt-24'>
        <div className="max-w-7xl mx-auto px-4">
          <div className='flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl border border-red-200 shadow-2xl py-20 animate-scaleIn'>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-xl mb-6 animate-bounce">
              <FaExclamationTriangle size={50} className='text-white'/>
            </div>
            <h2 className='text-4xl font-bold text-red-700 mb-3'>Error Loading Orders</h2>
            <p className='text-red-600 text-lg mt-2'>{errorMessage}</p>
            <p className='text-sm text-gray-500 mt-6'>Please try refreshing the page or contact support</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if orders are empty
  const emptyOrder = !adminOrder || adminOrder?.length === 0;
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 pb-12 pt-24'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative Background Elements */}
        <div className="absolute top-40 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {emptyOrder ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl mb-8 animate-float">
              <FaBoxOpen size={56} className='text-white'/>
            </div>
            <h2 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4'>
              No Orders Yet
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className='text-gray-600 text-xl mb-10'>Start your shopping journey today and create your first order!</p>
            <a href="/products" className="font-semibold py-4 px-10 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <MdShoppingCart size={24} />
              Browse Products
            </a>
          </div>
        ) : (
          <OrderTable adminOrder={adminOrder} pagination={pagination}/>
        )}
      </div>
    </div>
  )
}

export default Orders