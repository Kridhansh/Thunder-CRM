export function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of businesses already using CRM Pro to grow their sales.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-lg">
            Start Free Trial
          </a>
          <a href="#" className="w-full sm:w-auto px-8 py-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors font-semibold text-lg border border-blue-500">
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
}
