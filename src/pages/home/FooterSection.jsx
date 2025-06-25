import React from 'react'

const FooterSection = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                    Ceramics Haven
                </h3>
                <p className="mb-4">Bringing art to your table since 2010.</p>
                <div className="flex space-x-4">
                    {["Facebook", "Instagram", "Pinterest", "Twitter"].map(
                        (social) => (
                            <a
                                key={social}
                                href="#"
                                className="hover:text-white transition">
                                {social}
                            </a>
                        )
                    )}
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4">Shop</h4>
                <ul className="space-y-2">
                    {[
                        "All Products",
                        "New Arrivals",
                        "Best Sellers",
                        "Sale Items",
                    ].map((item) => (
                        <li key={item}>
                            <a href="#" className="hover:text-white transition">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4">Information</h4>
                <ul className="space-y-2">
                    {["About Us", "Our Artisans", "Sustainability", "Blog"].map(
                        (item) => (
                            <li key={item}>
                                <a href="#" className="hover:text-white transition">
                                    {item}
                                </a>
                            </li>
                        )
                    )}
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4">Customer Service</h4>
                <ul className="space-y-2">
                    {["Contact Us", "FAQs", "Shipping & Returns", "Care Guide"].map(
                        (item) => (
                            <li key={item}>
                                <a href="#" className="hover:text-white transition">
                                    {item}
                                </a>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>


    </div>
</footer>
  )
}

export default FooterSection
