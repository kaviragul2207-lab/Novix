import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-black lg:grid lg:grid-cols-5 text-white">
            <div className="relative block h-32 lg:col-span-2 lg:h-full">
                <img
                    src="Footer.png"
                    alt=" Novix   Studios"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                        <p>
                            <span className="text-xs tracking-wide uppercase text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110"> Call us </span>

                            <a href="#" className="block text-lg font-medium sm:text-xl text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                                +91  88709 36313
                            </a>
                        </p>

                        <ul className="mt-8 flex gap-6">

                            {/* Social Icons Footer */}
                            <div className="social-icons w-full mt-16 pt-8 border-t border-slate-800/50 flex justify-center space-x-8">
                                <a
                                    href="https://www.linkedin.com/company/archaelix/posts/?feedView=all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                                >
                                    <i className="fab fa-linkedin text-3xl"></i>
                                </a>
                                <a
                                    href="https://www.instagram.com/novixstudios/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                                >
                                    <i className="fab fa-instagram text-3xl"></i>
                                </a>
                            </div>

                        </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <p className="font-medium text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">Services</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link to="/services" className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                                        1on1 Coaching
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/services" className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                                        Company Review
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/services" className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                                        Accounts Review
                                    </Link>
                                </li>

                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">Our Company</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link to="/who-we-are" className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                                        About
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/who-we-are" className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                                        Meet the Team
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-100 pt-12">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <ul className="flex flex-wrap gap-4 text-xs">
                            <li>
                                <a href="#" className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                                    Terms & Conditions
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110"> Privacy Policy </a>
                            </li>

                            <li>
                                <a href="#" className="text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110"> Cookies </a>
                            </li>
                        </ul>

                        <p className="mt-8 text-xs sm:mt-0 text-white-700 hover:text-red-500 transition-all duration-300 transform hover:scale-110">
                            &copy; 2026. Novix Studios. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
