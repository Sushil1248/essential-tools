import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Personal Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">Sushil</h2>
                        <p className="text-sm mt-2">
                            Your trusted developer for innovative and efficient solutions.
                        </p>
                        <div className="mt-4 text-sm space-y-1">
                            <p>
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:sushil124maurya@gmail.com"
                                    className="text-indigo-400 hover:underline"
                                >
                                    sushil124maurya@gmail.com
                                </a>
                            </p>
                            <p>
                                <strong>Phone:</strong>{" "}
                                <a
                                    href="tel:+8219479708"
                                    className="text-indigo-400 hover:underline"
                                >
                                    8219479708
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold text-white">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a
                                      href="https://meet-sushil-kumar.vercel.app"
                                    className="text-gray-400 hover:text-indigo-400 transition"
                                >
                                    About Me
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://meet-sushil-kumar.vercel.app"
                                    className="text-gray-400 hover:text-indigo-400 transition"
                                >
                                    Portfolio
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="text-center md:text-right">
                        <h3 className="text-xl font-semibold text-white">Follow Me</h3>
                        <div className="mt-4 flex justify-center md:justify-end space-x-6">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-400 transition transform hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path d="M22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.226.792 24 1.771 24h20.454c.978 0 1.771-.774 1.771-1.728V1.727C24 .774 23.203 0 22.225 0zm-13.54 20.452H5.337V9h3.348v11.452zm-1.674-12.9a1.934 1.934 0 110-3.869 1.934 1.934 0 010 3.869zm14.013 12.9h-3.337v-5.586c0-1.33-.024-3.043-1.854-3.043-1.856 0-2.141 1.45-2.141 2.948v5.681H10.86V9h3.207v1.563h.045c.447-.845 1.539-1.732 3.168-1.732 3.387 0 4.017 2.231 4.017 5.132v6.489z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-400 transition transform hover:scale-110"
                                aria-label="GitHub"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path d="M12 .297C5.373.297 0 5.67 0 12.3c0 5.299 3.438 9.8 8.207 11.387.6.112.793-.259.793-.577v-2.036c-3.338.725-4.042-1.416-4.042-1.416-.547-1.387-1.336-1.757-1.336-1.757-1.091-.746.083-.731.083-.731 1.206.084 1.839 1.236 1.839 1.236 1.072 1.835 2.81 1.304 3.495.997.109-.776.419-1.305.762-1.605-2.665-.303-5.467-1.336-5.467-5.931 0-1.309.465-2.381 1.235-3.221-.124-.303-.536-1.522.116-3.176 0 0 1.008-.322 3.3 1.23a11.477 11.477 0 013.006-.403c1.02.005 2.047.137 3.006.403 2.291-1.552 3.297-1.23 3.297-1.23.655 1.654.243 2.873.118 3.176.771.84 1.235 1.912 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.369.815 1.102.815 2.222v3.293c0 .32.192.694.8.576C20.565 22.1 24 17.6 24 12.3c0-6.63-5.373-12.003-12-12.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Sushil. All rights reserved. Designed with passion.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
