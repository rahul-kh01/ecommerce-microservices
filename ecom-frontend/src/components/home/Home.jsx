import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import ModernLoader from "../shared/ModernLoader";
import { FaExclamationTriangle, FaStar, FaTruck, FaShieldAlt, FaHeadset, FaGift, FaFire, FaArrowRight, FaRocket, FaUsers, FaAward, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('hero');
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const statsRef = useRef(null);
    const productsRef = useRef(null);

    useEffect(() => {
        dispatch(fetchProducts());
        // Trigger animations after component mounts
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, [dispatch]);

    // Scroll animation effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            
            // Update active section based on scroll position
            const sections = [
                { ref: heroRef, id: 'hero' },
                { ref: featuresRef, id: 'features' },
                { ref: statsRef, id: 'stats' },
                { ref: productsRef, id: 'products' }
            ];
            
            for (const section of sections) {
                if (section.ref.current) {
                    const rect = section.ref.current.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll reveal animation
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [products]);

    const features = [
        { icon: FaTruck, title: "Free Shipping", desc: "On orders over $50", color: "from-blue-500 to-cyan-500" },
        { icon: FaShieldAlt, title: "Secure Payment", desc: "100% protected", color: "from-green-500 to-emerald-500" },
        { icon: FaHeadset, title: "24/7 Support", desc: "Always here to help", color: "from-purple-500 to-pink-500" },
        { icon: FaGift, title: "Gift Cards", desc: "Perfect for any occasion", color: "from-orange-500 to-red-500" },
        { icon: FaRocket, title: "Fast Delivery", desc: "Same day shipping", color: "from-indigo-500 to-blue-500" },
        { icon: FaAward, title: "Quality Guarantee", desc: "Premium products only", color: "from-yellow-500 to-orange-500" }
    ];

    const stats = [
        { number: "10K+", label: "Happy Customers", icon: FaUsers, color: "text-blue-500", bgColor: "from-blue-500 to-blue-600" },
        { number: "500+", label: "Products", icon: FaShoppingBag, color: "text-green-500", bgColor: "from-green-500 to-green-600" },
        { number: "50+", label: "Categories", icon: FaFire, color: "text-orange-500", bgColor: "from-orange-500 to-orange-600" },
        { number: "24/7", label: "Support", icon: FaHeadset, color: "text-purple-500", bgColor: "from-purple-500 to-purple-600" }
    ];

    return (
        <div className="min-h-screen bg-gradient-modern overflow-hidden relative pt-20">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div 
                    className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float blur-xl"
                    style={{ animationDelay: '0s' }}
                ></div>
                <div 
                    className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full animate-float blur-xl"
                    style={{ animationDelay: '2s' }}
                ></div>
                <div 
                    className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-float blur-xl"
                    style={{ animationDelay: '4s' }}
                ></div>
                <div 
                    className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-float blur-xl"
                    style={{ animationDelay: '1s' }}
                ></div>
            </div>

            {/* Parallax Hero Section */}
            <div 
                ref={heroRef}
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} relative z-10`}
                style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            >
                <div className="py-8 animate-slideInFromTop">
                <HeroBanner />
                </div>
            </div>
            
            {/* Enhanced Features Section */}
            <div ref={featuresRef} className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-16 relative z-10">
                <div className="text-center mb-16 scroll-reveal">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                        Why Choose Us?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience the difference with our premium services and cutting-edge technology
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group glass-card-modern rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-700 hover-lift border border-gray-700/30 scroll-reveal interactive-card`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className={`p-5 bg-gradient-to-r ${feature.color} rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg animate-glow`}>
                                    <feature.icon className="text-white text-3xl" />
                                </div>
                                <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
                                
                                {/* Hover Effect Indicator */}
                                <div className="w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 group-hover:w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Stats Section */}
                <div ref={statsRef} className="relative mb-20">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl scroll-reveal glass-card-dark overflow-hidden">
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                               radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                                backgroundSize: '50px 50px',
                                animation: 'gradientShift 10s ease infinite'
                            }}></div>
                        </div>
                        
                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-neon">
                                    Our Success Story
                                </h2>
                                <p className="text-blue-100 text-xl">Numbers that speak for themselves</p>
                                <div className="w-32 h-1 bg-gradient-to-r from-white/50 to-white/30 mx-auto rounded-full mt-4 animate-pulse"></div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="text-center group animate-bounceIn hover-magnetic"
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    >
                                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.bgColor} rounded-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                            <stat.icon className={`text-2xl ${stat.color}`} />
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                            {stat.number}
                                        </div>
                                        <div className="text-blue-100 text-sm font-medium group-hover:text-white transition-colors duration-300">
                                            {stat.label}
                                        </div>
                                        
                                        {/* Progress Indicator */}
                                        <div className="mt-3 w-full bg-white/20 rounded-full h-1 overflow-hidden">
                                            <div 
                                                className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                                                style={{ 
                                                    width: '0%',
                                                    animation: `slideInLeft 1s ease-out ${index * 0.2}s forwards`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Enhanced Featured Products Section */}
                <div ref={productsRef} className="py-12 relative">
                    <div className="flex flex-col justify-center items-center space-y-8 mb-16 scroll-reveal">
                        <div className="text-center">
                            <div className="inline-flex items-center space-x-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse shadow-lg">
                                    <FaFire className="text-white text-2xl" />
                                </div>
                                <span className="text-orange-500 font-bold text-lg uppercase tracking-wide animate-wave">Featured Collection</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold gradient-text-animated mb-6 animate-fadeInUp">
                                Premium Products
                            </h1>
                            <div className="w-40 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full animate-pulse-custom shadow-lg"></div>
                        </div>
                        <p className="text-xl text-gray-600 max-w-4xl text-center leading-relaxed animate-fadeInUp animate-delay-200">
                            Discover our handpicked selection of premium products, carefully curated with the latest technology and exceptional quality just for you!
                        </p>
                        <Link
                            to="/products"
                            className="btn-primary inline-flex items-center space-x-3 text-lg animate-fadeInUp animate-delay-300"
                        >
                            <span>Explore All Products</span>
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300 text-xl" />
                        </Link>
                </div>

                {isLoading ? (
                        <ModernLoader text="Loading amazing products..." />
                ) : errorMessage ? (
                        <div className="flex flex-col justify-center items-center h-64 bg-red-50 rounded-2xl border border-red-200 animate-scaleIn glass-card">
                            <FaExclamationTriangle className="text-red-500 text-5xl mb-6 animate-bounce"/>
                            <span className="text-red-700 text-xl font-semibold">
                            {errorMessage}
                        </span>
                            <p className="text-red-600 text-sm mt-2">Please try again later</p>
                    </div>
                ) : (
                        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8 relative">
                            {/* Background Decoration */}
                            <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float blur-xl"></div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full animate-float blur-xl" style={{animationDelay: '2s'}}></div>
                            
                       {products && 
                            products?.slice(0,8)
                                    .map((item, i) => (
                                        <div
                                            key={i}
                                            className="scroll-reveal hover-magnetic"
                                            style={{ animationDelay: `${i * 0.15}s` }}
                                        >
                                            <ProductCard {...item} />
                                        </div>
                                    ))
                            }
                    </div>
                    )}
                </div>

                {/* Enhanced Newsletter Section */}
                <div className="relative mt-20">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 scroll-reveal glass-card-dark overflow-hidden">
                        {/* Animated Background */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)`,
                                backgroundSize: '30px 30px',
                                animation: 'gradientShift 20s linear infinite'
                            }}></div>
                        </div>
                        
                        <div className="relative z-10 text-center max-w-4xl mx-auto">
                            <div className="mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-pulse">
                                    <FaGift className="text-white text-3xl" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-neon">
                                    Stay in the Loop
                                </h2>
                                <p className="text-blue-100 text-xl md:text-2xl leading-relaxed">
                                    Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers!
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 px-6 py-4 rounded-2xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:bg-white/20"
                                />
                                <button className="btn-primary">
                                    Subscribe Now
                                </button>
                            </div>
                            
                            <div className="flex flex-wrap justify-center items-center gap-8">
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                                    <FaStar className="text-yellow-400 animate-pulse" />
                                    <span className="text-white font-semibold">4.9/5 Rating</span>
                                </div>
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                                    <FaTruck className="text-green-400 animate-pulse" />
                                    <span className="text-white font-semibold">Free Delivery</span>
                                </div>
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                                    <FaShieldAlt className="text-blue-400 animate-pulse" />
                                    <span className="text-white font-semibold">Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;