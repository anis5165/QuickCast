
"use client"


import { Twitter, Linkedin, Facebook, Mail, Users, Bookmark, HelpCircle, ArrowUpRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Only generate bubbles on the client to avoid hydration mismatch
    const generated = Array.from({ length: 6 }).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
    }));
    setBubbles(generated);
  }, []);

  const socialIcons = [
    { name: "twitter", icon: Twitter, href: "#twitter" },
    { name: "linkedin", icon: Linkedin, href: "#linkedin" },
    { name: "facebook", icon: Facebook, href: "#facebook" }
  ];
  
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">QuickCast</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Making presentations interactive and engaging for everyone, everywhere.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                API
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Integrations
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Community
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Status
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 QuickCast. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
}

export default Footer;