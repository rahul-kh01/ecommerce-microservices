import React, { useState, useEffect } from 'react';
import { FaStore, FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';

const ModernLoader = ({ text = "Loading amazing content...", showProgress = true }) => {
    const [progress, setProgress] = useState(0);
    const [dots, setDots] = useState('');

    useEffect(() => {
        // Progress animation
        if (showProgress) {
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        return 100;
                    }
                    return prev + Math.random() * 15;
                });
            }, 200);

            return () => clearInterval(progressInterval);
        }
    }, [showProgress]);

    useEffect(() => {
        // Loading dots animation
        const dotsInterval = setInterval(() => {
            setDots(prev => {
                if (prev === '...') return '';
                return prev + '.';
            });
        }, 500);

        return () => clearInterval(dotsInterval);
    }, []);

    return (
        <div className="loader-container">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-float blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full animate-float blur-xl" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full animate-pulse blur-2xl"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-8">
                {/* Main Loader */}
                <div className="relative">
                    {/* Outer Ring */}
                    <div className="w-32 h-32 border-4 border-gray-700/30 rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
                    
                    {/* Middle Ring */}
                    <div className="absolute inset-2 w-28 h-28 border-4 border-blue-500/50 rounded-full animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
                    
                    {/* Inner Ring */}
                    <div className="absolute inset-4 w-24 h-24 border-4 border-purple-500/70 rounded-full animate-spin" style={{animationDuration: '1s'}}></div>
                    
                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                            <FaStore className="text-white text-2xl" />
                        </div>
                    </div>

                    {/* Floating Icons */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                        <FaShoppingCart className="text-white text-xs" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
                        <FaHeart className="text-white text-xs" />
                    </div>
                    <div className="absolute top-2 -left-4 w-5 h-5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}>
                        <FaStar className="text-white text-xs" />
                    </div>
                </div>

                {/* Loading Text */}
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-white animate-pulse">
                        {text}
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Please wait{dots}
                    </p>
                </div>

                {/* Progress Bar */}
                {showProgress && (
                    <div className="w-80 max-w-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">Loading</span>
                            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative"
                                style={{ width: `${progress}%` }}
                            >
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading Dots */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
            </div>
        </div>
    );
};

export default ModernLoader;
