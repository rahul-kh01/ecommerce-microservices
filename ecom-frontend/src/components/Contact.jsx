import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaClock, FaHeadset, FaShieldAlt, FaRocket } from "react-icons/fa";

const Contact = () => {
    const contactInfo = [
        { icon: FaPhone, title: "Phone", info: "+1 (555) 123-4567", color: "from-blue-500 to-cyan-500", bgColor: "from-blue-50 to-cyan-50" },
        { icon: FaEnvelope, title: "Email", info: "support@eshop.com", color: "from-green-500 to-emerald-500", bgColor: "from-green-50 to-emerald-50" },
        { icon: FaMapMarkedAlt, title: "Address", info: "123 Business Ave, City, State 12345", color: "from-orange-500 to-red-500", bgColor: "from-orange-50 to-red-50" },
        { icon: FaClock, title: "Hours", info: "Mon-Fri: 9AM-6PM", color: "from-purple-500 to-pink-500", bgColor: "from-purple-50 to-pink-50" }
    ];

    const features = [
        { icon: FaHeadset, title: "24/7 Support", description: "Always here to help" },
        { icon: FaRocket, title: "Fast Response", description: "Quick reply within hours" },
        { icon: FaShieldAlt, title: "Secure Communication", description: "Your data is protected" }
    ];

    return(
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
                            <FaEnvelope className="text-white text-3xl" />
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-6 animate-fadeInUp">
                            Contact Us
                        </h1>
                        <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8 animate-pulse"></div>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animate-delay-200">
                            We would love to hear from you! Get in touch with us for any inquiries or support.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-16">

                {/* Contact Form */}
                <div className="glass-card-modern rounded-3xl p-8 mb-16 scroll-reveal">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-white mb-4 gradient-text">Send us a Message</h2>
                        <p className="text-gray-300">We'll get back to you within 24 hours</p>
                    </div>
                    
                    <form className="space-y-6 max-w-2xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Full Name
                                </label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full bg-dark-card/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Email Address
                                </label>
                                <input 
                                    type="email"
                                    required
                                    className="w-full bg-dark-card/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Subject
                            </label>
                            <input 
                                type="text"
                                required
                                className="w-full bg-dark-card/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                placeholder="What can we help you with?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Message
                            </label>
                            <textarea 
                                rows="5"
                                required
                                className="w-full bg-dark-card/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                                placeholder="Tell us more about your inquiry..."
                            />
                        </div>

                        <button className="w-full btn-primary">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Information & Features */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="glass-card-modern rounded-3xl p-8 scroll-reveal-left">
                            <h2 className="text-3xl font-bold text-white mb-8 gradient-text">Get in Touch</h2>
                            <div className="space-y-6">
                                {contactInfo.map((contact, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 glass-card-modern rounded-2xl hover-magnetic">
                                        <div className={`p-3 bg-gradient-to-r ${contact.color} rounded-full animate-glow`}>
                                            <contact.icon className="text-white text-xl"/>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{contact.title}</h3>
                                            <p className="text-gray-300">{contact.info}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-8">
                        <div className="glass-card-modern rounded-3xl p-8 scroll-reveal-right">
                            <h2 className="text-3xl font-bold text-white mb-8 gradient-text">Why Contact Us?</h2>
                            <div className="space-y-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 hover-magnetic">
                                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-glow">
                                            <feature.icon className="text-white text-xl"/>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{feature.title}</h3>
                                            <p className="text-gray-300">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card-modern rounded-3xl p-8 scroll-reveal-right">
                            <h3 className="text-2xl font-bold text-white mb-6 gradient-text">Response Time</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">General Inquiries</span>
                                    <span className="text-blue-400 font-semibold">Within 24 hours</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Technical Support</span>
                                    <span className="text-green-400 font-semibold">Within 4 hours</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Urgent Issues</span>
                                    <span className="text-red-400 font-semibold">Within 1 hour</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;