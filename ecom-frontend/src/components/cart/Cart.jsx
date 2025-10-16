import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const newCart = { ...cart };

    newCart.totalPrice = cart?.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity), 0
    );

    if (!cart || cart.length === 0) return <CartEmpty />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
            <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-12">
                <div className="flex flex-col items-center mb-16">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-6">
                            <MdShoppingCart size={40} className="text-white" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                            Your Cart
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
                        <p className="text-xl text-gray-600 max-w-md text-center">All your carefully selected items</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="grid md:grid-cols-5 grid-cols-4 gap-4 p-6 font-semibold items-center bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="md:col-span-2 justify-self-start text-lg text-gray-800 font-bold">
                            Product
                        </div>

                        <div className="justify-self-center text-lg text-gray-800 font-bold">
                            Price
                        </div>

                        <div className="justify-self-center text-lg text-gray-800 font-bold">
                            Quantity
                        </div>

                        <div className="justify-self-center text-lg text-gray-800 font-bold">
                            Total
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {cart && cart.length > 0 &&
                            cart.map((item, i) => <ItemContent key={i} {...item}/>)}
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-t border-gray-200">
                        <div className="flex sm:flex-row flex-col sm:justify-between gap-6">
                            <div></div>
                            <div className="flex text-sm gap-4 flex-col max-w-md w-full">
                                <div className="flex justify-between w-full text-lg font-bold text-gray-800">
                                    <span>Subtotal</span>
                                    <span className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        {formatPrice(newCart?.totalPrice)}
                                    </span>
                                </div>

                                <p className="text-gray-500 text-sm">
                                    Taxes and shipping calculated at checkout
                                </p>

                                <Link className="w-full" to="/checkout">
                                <button
                                    onClick={() => {}}
                                    className="font-semibold w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    <MdShoppingCart size={20} />
                                    Proceed to Checkout
                                </button>
                                </Link>

                                <Link className="flex gap-2 items-center justify-center mt-4 text-gray-600 hover:text-gray-800 transition-colors duration-300" to="/products">
                                    <MdArrowBack />
                                    <span>Continue Shopping</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;