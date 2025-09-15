import React from "react";
import { Twitter, Github, Linkedin, Mail } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Twitter", href: "#", icon: <Twitter /> },
    { name: "Github", href: "#", icon: <Github /> },
    { name: "LinkedIn", href: "#", icon: <Linkedin /> },
    { name: "Gmail", href: "#", icon: <Mail /> },
  ];

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden w-full">

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-44">
        <div className="py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className='flex items-center'>
                <div className="text-accent-dark text-3xl font-bold">pix</div>
                <div className="text-2xl font-bold text-neutral-100">EDiT</div>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Simple controls and intuitive design let you edit your photos<br /> like a pro in just a few clicks.
              </p>
            </div>

            <div className="space-y-3 text-neutral-300 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✉️</span> hello@pixedit.com
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">📞</span> +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">📍</span> New York, NY
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4">
            <span className="text-neutral-300">Follow us:</span>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-8 h-8 hover:bg-green-600 rounded-xl flex items-center justify-center transition"
                aria-label={social.name}
              >
                <span className="stroke-1 font-thin">{social.icon}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 text-neutral-400 text-sm">
            <div className="flex items-center gap-2">
              <span>© {currentYear} pixEDiT.</span>
              <span className="text-green-600">💚</span>
              <span>Give Your Photos a Fresh Look!</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
