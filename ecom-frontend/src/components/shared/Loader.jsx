import { RotatingLines } from "react-loader-spinner";

const Loader = ({ text }) => {
    return (
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center gap-8">
                {/* Animated Loader Container */}
                <div className="relative">
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full animate-pulse-custom blur-lg opacity-50"></div>
                    
                    {/* Middle Ring */}
                    <div className="absolute inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-spin opacity-30"></div>
                    
                    {/* Inner Ring */}
                    <div className="absolute inset-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-spin opacity-20" style={{animationDirection: 'reverse', animationDuration: '2s'}}></div>
                    
                    {/* Main Loader */}
                    <div className="relative z-10">
                        <RotatingLines
                            visible={true}
                            height="96"
                            width="96"
                            color="#3b82f6"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                    
                    {/* Floating Dots */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-2 -left-4 w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Text Animation */}
                <div className="text-center animate-fadeInUp">
                    <p className="text-xl font-semibold text-gray-700 mb-4 animate-pulse">
                        {text ? text : "Loading amazing content..." }
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-shimmer"></div>
                    </div>
                    
                    {/* Loading Dots */}
                    <div className="flex justify-center space-x-1 mt-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;