export default function UseCasesSection() {
  const cases = [
    {
      category: "RETAIL",
      title: "Attract customers and keep loyal shoppers coming back",
      description: "Whether you're a brick-and-mortar shop or a major department store, make it easy to manage and track your in-person and online retail customer connections."
    },
    {
      category: "CONSUMER PACKAGED GOODS",
      title: "Thriving brands start with having fans and powerful connections",
      description: "Give consumers the power to learn about your products and interact directly with your brand."
    },
    {
      category: "HOSPITALITY",
      title: "Delight your guests and make their every need as seamless as possible",
      description: "With a simple booking experience, you can focus on what matters most: delivering exceptional service."
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          See how other businesses use our platform
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item) => (
            <div key={item.category} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <span className="text-sm font-semibold text-blue-600 mb-2 block">{item.category}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center gap-1">
                Read more <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}