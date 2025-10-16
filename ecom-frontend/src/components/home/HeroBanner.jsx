// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';

const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

const HeroBanner = () => {
    return (
        <div className='py-4 rounded-3xl overflow-hidden shadow-2xl relative'>
            {/* Background Animation Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
                <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <Swiper
                grabCursor = {true}
                autoplay = {{
                    delay:6000,
                    disableOnInteraction: false,
                }}
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{clickable: true, dynamicBullets: true}}
                scrollbar={{ draggable: true}}
                slidesPerView={1}
                effect="fade"
                className="rounded-3xl">

                    {bannerLists.map((item, i) => (
                        <SwiperSlide key={item.id}>
                            <div className={`carousel-item rounded-3xl lg:h-[700px] md:h-[600px] h-96 ${colors[i]} relative overflow-hidden`}>
                                {/* Animated Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                                       radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                                        backgroundSize: '50px 50px',
                                        animation: 'gradientShift 10s ease infinite'
                                    }}></div>
                                </div>

                                <div className='flex items-center justify-center h-full relative z-10'>
                                    <div className='hidden lg:flex justify-center w-1/2 p-12'>
                                        <div className='text-center space-y-8 animate-fadeInLeft'>
                                            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 animate-slideInFromTop">
                                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                                <span className="text-white text-sm font-semibold">New Collection</span>
                                            </div>
                                            <h3 className='text-4xl text-white font-bold drop-shadow-lg animate-fadeInUp animate-delay-200'>
                                                {item.title}
                                            </h3>
                                            <h1 className='text-6xl text-white font-bold drop-shadow-lg leading-tight animate-fadeInUp animate-delay-300'>
                                                {item.subtitle}
                                            </h1>
                                            <p className='text-white text-xl font-semibold drop-shadow-md max-w-md mx-auto leading-relaxed animate-fadeInUp animate-delay-400'>
                                                {item.description}
                                            </p>
                                            <div className="animate-fadeInUp animate-delay-500">
                                                <Link 
                                                    className='group inline-flex items-center space-x-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white py-4 px-8 rounded-full font-bold text-lg shadow-xl hover:from-white/30 hover:to-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl'
                                                    to="/products">
                                                    <span>Shop Now</span>
                                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </Link>
                                            </div>
                                            {/* Trust Badges */}
                                            <div className="flex justify-center items-center space-x-6 mt-8 animate-fadeInUp animate-delay-600">
                                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                                    <span className="text-white text-sm">⭐ 4.9/5 Rating</span>
                                                </div>
                                                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                                    <span className="text-white text-sm">🚚 Free Shipping</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-center lg:w-1/2 p-8'>
                                        <div className="relative animate-fadeInRight">
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-xl animate-pulse-custom"></div>
                                            <img 
                                                src={item?.image} 
                                                className="relative max-h-80 lg:max-h-96 object-contain drop-shadow-2xl transform hover:scale-110 transition-transform duration-700 hover:rotate-2"
                                                alt={item.title}
                                            />
                                            {/* Floating Elements */}
                                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Mobile content */}
                                <div className='lg:hidden absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/20 backdrop-blur-sm'>
                                    <div className="animate-slideUp">
                                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                            <span className="text-white text-xs font-semibold">New Collection</span>
                                        </div>
                                        <h3 className='text-2xl text-white font-bold mb-2 drop-shadow-lg'>
                                            {item.title}
                                        </h3>
                                        <h1 className='text-3xl text-white font-bold mb-4 drop-shadow-lg'>
                                            {item.subtitle}
                                        </h1>
                                        <p className='text-white text-sm font-semibold mb-6 drop-shadow-md max-w-xs mx-auto'>
                                            {item.description}
                                        </p>
                                        <Link 
                                            className='inline-flex items-center space-x-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white py-3 px-6 rounded-full font-bold shadow-xl hover:from-white/30 hover:to-white/20 transition-all duration-300 transform hover:scale-105'
                                            to="/products">
                                            <span>Shop Now</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}


export default HeroBanner;