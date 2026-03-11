export default function TestimonialsSection() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-xl md:text-2xl text-gray-800 italic mb-6">
            "When it came to deciding on a platform to use for generating all of our QR Codes, 
            there was a general consensus among the team—of course we should use Bitly! 
            We didn't even give it a second thought."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"></div>
            <div>
              <p className="font-semibold text-gray-900">Sarah Johnson</p>
              <p className="text-sm text-gray-600">Marketing Director, TechCorp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

