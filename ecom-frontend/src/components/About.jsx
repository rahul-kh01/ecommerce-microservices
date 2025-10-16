import ProductCard from "./shared/ProductCard";
import { FaUsers, FaShoppingBag, FaHeadset, FaAward, FaRocket, FaShieldAlt, FaStar, FaHeart } from "react-icons/fa";

const products = [
    {
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "iPhone 13 Pro Max",
        description:
          "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
        specialPrice: 720,
        price: 780,
      },
      {
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "Samsung Galaxy S21",
        description:
          "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
        specialPrice: 699,
        price: 799,
      },
      {
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "Google Pixel 6",
        description:
          "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
        price: 599,
        specialPrice: 400,
      }
];

const About = () => {
    const stats = [
        { icon: FaUsers, number: "10K+", label: "Happy Customers", color: "from-blue-500 to-cyan-500" },
        { icon: FaShoppingBag, number: "500+", label: "Products", color: "from-green-500 to-emerald-500" },
        { icon: FaHeadset, number: "24/7", label: "Support", color: "from-orange-500 to-red-500" },
        { icon: FaAward, number: "4.9", label: "Rating", color: "from-purple-500 to-pink-500" }
    ];

    const features = [
        { icon: FaRocket, title: "Fast Delivery", description: "Same day shipping worldwide" },
        { icon: FaShieldAlt, title: "Secure Payment", description: "100% protected transactions" },
        { icon: FaStar, title: "Quality Guarantee", description: "Premium products only" },
        { icon: FaHeart, title: "Customer Care", description: "Dedicated support team" }
    ];

    return (
        <div className="min-h-screen bg-gradient-modern pt-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-float blur-xl"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full animate-float blur-xl" style={{animationDelay: '2s'}}></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-20">
                    <div className="text-center mb-16 scroll-reveal">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8 animate-pulse">
                            <FaAward className="text-white text-3xl" />
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-6 animate-fadeInUp">
                            About Us
                        </h1>
                        <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8 animate-pulse"></div>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animate-delay-200">
                            We are passionate about delivering exceptional products and creating unforgettable shopping experiences for our valued customers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="glass-card-modern rounded-3xl p-6 text-center scroll-reveal hover-magnetic"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 animate-glow`}>
                                <stat.icon className="text-white text-2xl" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-gray-300 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 scroll-reveal-left">
                        <div className="glass-card-modern rounded-3xl p-8">
                            <h2 className="text-4xl font-bold text-white mb-6 gradient-text">Our Story</h2>
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                Welcome to our premium e-commerce store! We are passionate about providing 
                                the finest products and exceptional services to our valued customers. 
                                Our mission is to deliver a seamless shopping experience while maintaining 
                                the highest standards of quality and innovation.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Since our founding, we've been committed to revolutionizing the online shopping experience 
                                with cutting-edge technology, unparalleled customer service, and a curated selection 
                                of the world's best products.
                            </p>
                        </div>
                    </div>

                    <div className="scroll-reveal-right">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-6 animate-float"></div>
                            <img
                                src="https://embarkx.com/sample/placeholder.png"
                                alt="About Us"
                                className="relative w-full h-auto rounded-3xl shadow-2xl transform transition-transform duration-500 hover:scale-105 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-16">
                <div className="text-center mb-16 scroll-reveal">
                    <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Why Choose Us?</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">We provide exceptional service and quality products</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card-modern rounded-3xl p-6 text-center scroll-reveal hover-magnetic"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 animate-glow">
                                <feature.icon className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-300 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-16">
                <div className="text-center mb-16 scroll-reveal">
                    <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Featured Products</h2>
                    <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover some of our most popular and highly-rated products
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {products.map((product, index) => (
                    <div key={index} className="scroll-reveal" style={{animationDelay: `${index * 0.1}s`}}>
                        <ProductCard 
                            image={product.image}
                            productName={product.productName}
                            description={product.description}
                            specialPrice={product.specialPrice}
                            price={product.price}
                            about
                        />
                    </div>
                   ))}
                </div>
            </div>
        </div>
    );
}

export default About;