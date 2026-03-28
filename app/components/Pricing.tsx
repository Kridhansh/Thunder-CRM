const monthlyFeatures = [
  'Unlimited contacts',
  '5GB storage',
  'Email support',
  'Basic analytics',
  'Mobile app access'
];

const annualFeatures = [
  'Everything in Monthly',
  'Unlimited storage',
  'Priority support',
  'Advanced analytics',
  'API access',
  'Custom integrations'
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your business. No hidden fees.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$25</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-500 mb-6">Perfect for small teams</p>
            </div>
            <ul className="space-y-4 mb-8">
              {monthlyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#" className="block w-full py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-center">
              Get Started
            </a>
          </div>

          {/* Annual Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
              Save $50
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Annual</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">$250</span>
                <span className="text-blue-100">/year</span>
              </div>
              <p className="text-blue-100 mb-6">Best value for growing businesses</p>
            </div>
            <ul className="space-y-4 mb-8">
              {annualFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#" className="block w-full py-3 px-6 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-center">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
