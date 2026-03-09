export default function Footer() {
  const sections = [
    {
      title: "Why Us",
      items: ["Digital Transformation", "Branding", "Customer Engagement", "Sales Growth", "Revenue Acceleration"]
    },
    {
      title: "Products",
      items: ["URL Shortener", "QR Codes", "Landing Pages", "Social Media Integration"]
    },
    {
      title: "Solutions",
      items: ["Website Builder", "Content Management", "CRM Software", "Marketing Automation"]
    },
    {
      title: "Resources",
      items: ["Blog", "Podcasts", "Webinars", "Ebooks", "Case Studies"]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2024 Connections Platform. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}