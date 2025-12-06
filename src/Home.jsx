import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const openAuthModal = (mode = "login") => {
    setIsLoginMode(mode === "login");
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      console.log("Login attempt");
    } else {
      console.log("Signup attempt");
    }
  };

  return (
    <div className="page font-sans text-gray-900">
      {/* Auth Modal with Transparent Background */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur effect */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeAuthModal}
          />

          {/* Modal Content with Glass Effect */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-white/20">
            {/* Modal Header */}
            <div className="border-b border-gray-200/50 px-6 py-4 bg-gradient-to-r from-white/80 to-white/60">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isLoginMode ? "Welcome Back" : "Create Account"}
                </h2>
                <button
                  onClick={closeAuthModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-600 mt-1">
                {isLoginMode
                  ? "Sign in to your account to continue shopping"
                  : "Join SportTumbler PH for exclusive offers"}
              </p>
            </div>

            {/* Modal Body - Auth Form */}
            <form onSubmit={handleAuthSubmit} className="px-6 py-6 bg-white/50">
              {!isLoginMode && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300/80 bg-white/90 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-orange-500/80 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300/80 bg-white/90 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-orange-500/80 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300/80 bg-white/90 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-orange-500/80 focus:border-transparent transition-all"
                  placeholder={
                    isLoginMode ? "Enter your password" : "Create a password"
                  }
                  minLength="6"
                  required
                />
                {isLoginMode && (
                  <div className="text-right mt-2">
                    <button
                      type="button"
                      className="text-sm text-orange-600 hover:text-orange-800 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              {!isLoginMode && (
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-orange-600 focus:ring-orange-500"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                      >
                        Terms & Conditions
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                {isLoginMode ? "Sign In" : "Create Account"}
              </button>

              <div className="mt-6 text-center">
                <p className="text-gray-700">
                  {isLoginMode
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="text-orange-600 hover:text-orange-800 font-semibold transition-colors"
                  >
                    {isLoginMode ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </form>

            {/* Social Login Section */}
            <div className="px-6 pb-6 bg-gradient-to-b from-white/40 to-white/30">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-600">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300/50 rounded-lg shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300/50 rounded-lg shadow-sm bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="#EA4335"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest of your existing Home component */}
      <header className="nav">
        <a className="brand text-xl font-bold" href="/">
          SportTumbler PH
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm absolute left-1/2 transform -translate-x-1/2">
          <a
            href="#about"
            className="group relative px-4 py-2 font-medium text-gray-700 overflow-hidden rounded-lg transition-all duration-300"
          >
            <span className="relative flex items-center justify-center gap-2">
              About
            </span>
          </a>
        </nav>

        <div className="ml-auto">
          <button
            onClick={() => openAuthModal("login")}
            className="login px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
          >
            Login
          </button>
        </div>
      </header>

      <main className="hero">
        <div className="hero-overlay" />
        <div className="hero-content max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Sport Tumbler — Philippines
          </h1>
          <p className="lead mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Durable. Leak-proof. Keeps drinks cold for 24 hours and hot for 12.
            Designed for athletes and everyday adventures across the
            Philippines.
          </p>
          <div className="mt-6">
            <button
              onClick={() => openAuthModal("signup")}
              className="cta inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold hover:from-orange-500 hover:to-orange-700 transition-all"
            >
              Shop Now
            </button>
          </div>
        </div>
      </main>

      <section id="about" className="about py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">About SportTumbler PH</h2>

            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                At SportTumbler PH, we are dedicated to providing
                high-performance insulated drinkware specifically designed for
                the active Filipino lifestyle. Our mission is to combine
                superior thermal technology with durable, practical design to
                create tumblers that withstand the rigors of daily use, from
                intense workouts to outdoor adventures across the archipelago.
                We understand the unique needs of athletes, fitness enthusiasts,
                and active individuals who require reliable hydration solutions
                throughout their day.
              </p>

              <p className="text-lg leading-relaxed">
                Every SportTumbler product is engineered with double-wall vacuum
                insulation to maintain optimal temperatures—keeping beverages
                ice-cold for up to 24 hours or piping hot for 12 hours. Our
                leak-proof lids ensure no spills during transport, while the
                durable stainless steel construction resists dents and
                corrosion. We partner with trusted international brands and
                local manufacturers to deliver quality that exceeds
                expectations, making SportTumbler PH the preferred choice for
                those who value performance, reliability, and style in their
                hydration gear.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => openAuthModal("signup")}
                className="cta inline-block px-6 py-3 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors text-lg"
              >
                Explore Our Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            © {new Date().getFullYear()} SportTumbler PH —
            <a
              className="owner ml-2 font-medium text-gray-900"
              href="https://example.com/your-social"
              target="_blank"
              rel="noreferrer noopener"
            >
              Joshua E. Ebod
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <a
              href="https://facebook.com/your-profile"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-blue-600"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/your-profile"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-pink-600"
            >
              Instagram
            </a>
            <a
              href="mailto:contact@sporttumbler.ph"
              className="hover:text-red-600"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
