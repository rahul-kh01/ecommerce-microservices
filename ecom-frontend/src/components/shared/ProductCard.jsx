import { useState, useRef, useEffect, memo, useCallback } from "react";
import { FaShoppingCart, FaHeart, FaShare, FaEye, FaStar, FaFire, FaClock, FaTag } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = memo(({
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
        about = false,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();
    const cardRef = useRef(null);

    // Generate random rating for demo
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 500) + 10;
    const isNew = Math.random() > 0.7;
    const isHot = Math.random() > 0.8;
    const discountPercent = specialPrice ? Math.round(((price - specialPrice) / price) * 100) : 0;

    useEffect(() => {
        const card = cardRef.current;
        if (card) {
            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            };

            const handleMouseLeave = () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                setIsHovered(false);
                setShowQuickActions(false);
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    const handleProductView = (product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        setIsAnimating(true);
        dispatch(addToCart(cartItems, 1, toast));
        toast.success("Product added to cart! 🛒", {
            duration: 2000,
            style: {
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                color: 'white',
                borderRadius: '10px',
                border: 'none',
            },
        });
        setTimeout(() => setIsAnimating(false), 1000);
    };

    const handleWishlist = (e) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist! ❤️", {
            duration: 1500,
            style: {
                background: 'linear-gradient(45deg, #ec4899, #f97316)',
                color: 'white',
                borderRadius: '10px',
            },
        });
    };

    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: productName,
                text: description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard! 📋");
        }
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        handleProductView({
            id: productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice,
        });
    };

    return (
        <div 
            ref={cardRef}
            className="group glass-card-modern rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-700 border border-gray-700/30 hover:border-blue-500/50 relative interactive-card hover-3d"
            onMouseEnter={() => {
                setIsHovered(true);
                setShowQuickActions(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowQuickActions(false);
            }}
        >
            {/* Advanced Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/15 group-hover:to-pink-500/20 transition-all duration-700 rounded-3xl"></div>
            
            {/* Magnetic Field Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-500/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-500/5 group-hover:to-pink-400/10 transition-all duration-500 rounded-3xl opacity-0 group-hover:opacity-100"></div>
            
            {/* Product Image Section */}
            <div 
                onClick={() => {
                    handleProductView({
                        id: productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice,
                    })
                }}
                className="relative w-full overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 cursor-pointer group/image"
            >
                {/* Main Image */}
                <img
                    className="w-full h-full transition-all duration-1000 transform group-hover:scale-110 group-hover:rotate-1 object-cover"
                    src={image}
                    alt={productName}
                    loading="lazy"
                />
                
                {/* Dynamic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex flex-col gap-2">
                        {isNew && (
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounceIn">
                                <span className="flex items-center gap-1">
                                    <FaTag className="text-xs" />
                                    New
                                </span>
                            </div>
                        )}
                        {isHot && (
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounceIn">
                                <span className="flex items-center gap-1">
                                    <FaFire className="text-xs" />
                                    Hot
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Discount Badge */}
                {specialPrice && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse-custom neon-border">
                        <span className="relative z-10 flex items-center gap-1">
                            <FaTag className="text-xs" />
                            -{discountPercent}%
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-shimmer"></div>
                    </div>
                )}

                {/* Quick Actions Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${showQuickActions ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    <div className="flex gap-3">
                        {/* Quick View Button */}
                        <button
                            onClick={handleQuickView}
                            className="btn-icon"
                            title="Quick View"
                        >
                            <FaEye className="w-5 h-5 text-white" />
                        </button>
                        
                        {/* Wishlist Button */}
                        <button
                            onClick={handleWishlist}
                            className={`btn-icon ${isWishlisted ? 'bg-red-500/20 border-red-500/50 animate-heartbeat' : ''}`}
                            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <FaHeart className={`w-5 h-5 transition-all duration-300 ${
                                isWishlisted ? 'text-red-500' : 'text-white hover:text-red-400'
                            }`} />
                        </button>
                        
                        {/* Share Button */}
                        <button
                            onClick={handleShare}
                            className="btn-icon"
                            title="Share Product"
                        >
                            <FaShare className="w-5 h-5 text-white hover:text-purple-400 transition-colors duration-300" />
                        </button>
                    </div>
                </div>

                {/* Rating Stars */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <FaStar 
                                    key={i} 
                                    className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                />
                            ))}
                        </div>
                        <span className="text-xs font-semibold text-gray-700 ml-1">{rating}</span>
                        <span className="text-xs text-gray-500">({reviewCount})</span>
                    </div>
                </div>

                {/* Stock Status */}
                {!isAvailable && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold animate-bounceIn shadow-xl">
                            <div className="flex items-center gap-2">
                                <FaClock className="text-sm" />
                                Out of Stock
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Product Information Section */}
            <div className="p-6 relative bg-gradient-to-b from-gray-800/50 to-gray-900/50">
                {/* Product Title */}
                <h2 
                    onClick={() => {
                        handleProductView({
                            id: productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        })
                    }}
                    className="text-xl font-bold mb-3 cursor-pointer text-white hover:text-blue-400 transition-all duration-300 line-clamp-2 group-hover:text-blue-400 hover:scale-105 transform"
                >
                    {truncateText(productName, 50)}
                </h2>

                {/* Product Description */}
                <div className="min-h-16 max-h-16 mb-4">
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {truncateText(description, 80)}
                    </p>
                </div>

                {/* Rating Section */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <FaStar 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            />
                        ))}
                    </div>
                    <span className="text-sm font-semibold text-white">{rating}</span>
                    <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
                </div>

                {/* Price and Add to Cart Section */}
                { !about && (
                    <div className="flex items-center justify-between pt-2">
                        {/* Price Display */}
                        <div className="flex flex-col">
                            {specialPrice ? (
                                <div className="flex flex-col animate-scaleIn">
                                    <span className="text-gray-400 line-through text-sm">
                                        ${Number(price).toFixed(2)}
                                    </span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        ${Number(specialPrice).toFixed(2)}
                                    </span>
                                    <span className="text-xs text-green-600 font-semibold">
                                        Save ${(Number(price) - Number(specialPrice)).toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-white">
                                        ${Number(price).toFixed(2)}
                                    </span>
                                    <span className="text-xs text-gray-400">Regular price</span>
                                </div>
                            )}
                        </div>

                        {/* Enhanced Add to Cart Button */}
                        <button
                            disabled={!isAvailable || btnLoader}
                            onClick={() => addToCartHandler({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })}
                            className={`${isAvailable ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'} ${isAnimating ? 'animate-rubberBand btn-loading' : ''} min-w-[140px] flex items-center justify-center`}
                        >
                            <FaShoppingCart className={`mr-2 text-lg transition-all duration-300 ${
                                isAnimating ? 'animate-bounce' : ''
                            }`}/>
                            <span className="font-semibold">
                                {isAvailable ? (isAnimating ? "Added!" : "Add to Cart") : "Out of Stock"}
                            </span>
                        </button>
                    </div>
                )}

                {/* Additional Features */}
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Free Shipping
                            </span>
                            <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                Secure Payment
                            </span>
                        </div>
                        <span className="text-gray-400">
                            {quantity} in stock
                        </span>
                    </div>
                </div>
            </div>
            <ProductViewModal 
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    )
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;