"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail, Globe } from "lucide-react";

interface DropdownItem {
  href: string;
  label: string;
  external?: boolean;
}

interface NavigationLink {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navigationLinks = [
    {
      href: "/kurumsal",
      label: "Kurumsal",
      dropdown: [
        { href: "/kurumsal", label: "Hakkımızda" },
        { href: "/sertifikalar", label: "Sertifikalarımız" },
      ],
    },
    {
      href: "/sektorler",
      label: "Sektörler",
      dropdown: [
        { href: "/sektorler/savunma-sanayi", label: "Savunma Sanayi" },
        { href: "/sektorler/denizcilik", label: "Denizcilik" },
        { href: "/sektorler/endustriyel-sanayi", label: "Endüstriyel Sanayi" },
        { href: "/sektorler/tarim", label: "Tarım" },
      ],
    },
    {
      href: "/urunler",
      label: "Ürünler",
      dropdown: [
        { href: "/urunler", label: "Tüm Dragon Winch Ürünleri" },
        { href: "/urunler?category=marine", label: "Denizcilik Vinçleri" },
        { href: "/urunler?category=industrial", label: "Endüstriyel Vinçler" },
        { href: "/urunler?category=port", label: "Liman Ekipmanları" },
      ],
    },
    {
      href: "#",
      label: "Kataloglar",
      dropdown: [
        {
          href: "/dragon-winch-katalog.pdf",
          label: "Dragon Winch Genel Katalog",
          external: true,
        },
        {
          href: "/dragon-winch-katalog-2025.pdf",
          label: "Meda Endüstri Katalog",
          external: true,
        },
      ],
    },
    // { href: "/markalar", label: "Markalar" },
    // { href: "/haberler", label: "Medya" },
    { href: "/iletisim", label: "İletişim" },
  ];

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              {/* <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+90 507 248 2699</span>
              </div> */}
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@medaendustri.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">
                Dragon Winch Yetkili Distribütörü
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled
            ? "shadow-lg border-b-0"
            : "border-b border-gray-200 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <img src="/meda-logo.webp" alt="" />
                </div>
                <div className="ml-4">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-[#d84948] transition-colors corporate-heading">
                    Meda Endüstri
                  </span>
                  <div className="text-xs text-gray-500 font-medium corporate-text">
                    Dragon Winch Yetkili Distribütörü
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigationLinks.map((link) => (
                <div key={link.href} className="relative dropdown-container">
                  <button
                    onClick={() =>
                      link.dropdown ? toggleDropdown(link.label) : null
                    }
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-[#d84948] font-medium transition-all duration-300 rounded-lg hover:bg-[#d84948]/5 group corporate-text"
                  >
                    {!link.dropdown ? (
                      <Link href={link.href} className="flex items-center">
                        {link.label}
                      </Link>
                    ) : (
                      <>
                        {link.label}
                        <ChevronDown
                          className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[100] animate-in fade-in-0 zoom-in-95 duration-200">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:text-[#d84948] hover:bg-[#d84948]/5 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                          {...((item as DropdownItem).external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/iletisim"
                className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 corporate-text"
              >
                Vinç Teklifi Al
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-[#d84948] p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
              <nav className="flex flex-col space-y-1">
                {navigationLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-gray-700 hover:text-[#d84948] hover:bg-[#d84948]/5 font-medium transition-colors rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <div className="ml-4 space-y-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-[#d84948] hover:bg-[#d84948]/5 transition-colors rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 py-3 border-t border-gray-200 mt-4">
                  <Link
                    href="/iletisim"
                    className="block w-full text-center bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white px-6 py-3 rounded-lg font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vinç Teklifi Al
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
