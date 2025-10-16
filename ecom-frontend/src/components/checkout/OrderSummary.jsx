import { formatPriceCalculation } from '../../utils/formatPrice'
import { FaMapMarkerAlt, FaCreditCard, FaBox, FaCheckCircle } from 'react-icons/fa'

const OrderSummary = ({ totalPrice, cart, address, paymentMethod}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 py-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 mb-8 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg mb-6 animate-float">
              <FaCheckCircle size={40} className="text-white" />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4'>
              Order Summary
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-gray-600">Review your order details before confirmation</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="w-full lg:w-8/12">
            <div className="space-y-6">
        {/* Billing Address Card */}
        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <FaMapMarkerAlt size={20} className="text-white" />
              </div>
              <h2 className='text-2xl font-bold text-gray-800'>Billing Address</h2>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Building:</span>
                  <span>{address?.buildingName}</span>
              </p>
              <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Street:</span>
                  <span>{address?.street}</span>
              </p>
              <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">City:</span>
                  <span>{address?.city}</span>
              </p>
              <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">State:</span>
                  <span>{address?.state}</span>
              </p>
              <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Pincode:</span>
                  <span>{address?.pincode}</span>
              </p>
              <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Country:</span>
                  <span>{address?.country}</span>
              </p>
            </div>
        </div>

        {/* Payment Method Card */}
        <div className='p-6 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300'>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <FaCreditCard size={20} className="text-white" />
              </div>
              <h2 className='text-2xl font-bold text-gray-800'>
                  Payment Method
              </h2>
            </div>
            <p className="text-gray-600">
                <span className="font-semibold text-gray-700">Method: </span>
                <span className="text-lg font-medium text-blue-600">{paymentMethod}</span>
            </p>
        </div>

        {/* Order Items Card */}
        <div className='p-6 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300'>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <FaBox size={20} className="text-white" />
              </div>
              <h2 className='text-2xl font-bold text-gray-800'>Order Items</h2>
            </div>
            <div className='space-y-4'>
                {cart?.map((item) => (
                    <div key={item?.productId} className='flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300'>
                        <img 
                          src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`}
                          alt={item?.productName}
                          className='w-16 h-16 rounded-lg object-cover shadow-md border-2 border-white'
                        />
                        <div className='flex-1'>
                            <p className="font-semibold text-gray-800 text-lg">{item?.productName}</p>
                            <p className="text-gray-600 mt-1">
                              <span className="font-medium">{item?.quantity}</span> × <span className="font-medium text-blue-600">${item?.specialPrice}</span> = <span className="font-bold text-green-600">${formatPriceCalculation(item?.quantity, item?.specialPrice)}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
       </div>
      </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6 sticky top-24 hover:shadow-2xl transition-all duration-300">
              {/* Decorative Top Border */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-4 -mt-2 -mx-2"></div>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium text-lg">Products</span>
                  <span className="text-lg font-semibold text-gray-900">${formatPriceCalculation(totalPrice, 1)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium text-lg">Tax (0%)</span>
                  <span className="text-lg font-semibold text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between items-center py-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl px-4 mt-4">
                  <span className="text-xl font-bold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${formatPriceCalculation(totalPrice, 1)}</span>
                </div>
              </div>
          </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default OrderSummary