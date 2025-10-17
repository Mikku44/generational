import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e : React.DOMAttributes<HTMLButtonElement>) => {
    // e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Add your login logic here
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80"
          alt="Classic Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold tracking-wider">GENERATIONAL</h2>
          <p className="text-sm tracking-widest mt-2">ADMIN PORTAL</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to access the admin dashboard</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="admin@generational.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-black"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-gray-900 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition duration-200"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Protected by enterprise security
          </div>
        </div>
      </div>
    </div>
  );
}