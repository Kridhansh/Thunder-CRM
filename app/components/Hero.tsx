export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Trusted by 10,000+ businesses
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Customers
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Streamline your workflow, automate tasks, and grow your business with our powerful yet simple CRM solution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40">
              Start Free Trial
            </a>
            <a href="#" className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold text-lg">
              Watch Demo
            </a>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <div className="h-32 bg-white rounded-xl p-4">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                  <div className="flex items-end gap-2 h-20">
                    <div className="w-1/5 h-12 bg-blue-500 rounded"></div>
                    <div className="w-1/5 h-16 bg-blue-500 rounded"></div>
                    <div className="w-1/5 h-8 bg-blue-500 rounded"></div>
                    <div className="w-1/5 h-20 bg-blue-500 rounded"></div>
                    <div className="w-1/5 h-14 bg-blue-500 rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-white rounded-xl p-4">
                    <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
                    <div className="text-2xl font-bold text-gray-900">1,234</div>
                  </div>
                  <div className="h-24 bg-white rounded-xl p-4">
                    <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
                    <div className="text-2xl font-bold text-gray-900">$45K</div>
                  </div>
                  <div className="h-24 bg-white rounded-xl p-4">
                    <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
                    <div className="text-2xl font-bold text-gray-900">89%</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-40 bg-white rounded-xl p-4">
                  <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-100 rounded"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="h-32 bg-white rounded-xl p-4">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
