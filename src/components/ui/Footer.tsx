
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  // Define footer links
  const footerLinks = {
    info: [
      { label: "FAQs", href: "faqs" },
      { label: "Check Pricing", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Documentation", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    business: [
      { label: "Influencer's", href: "#" },
      { label: "Brand Partnership", href: "#" },
      { label: "Affiliate Program", href: "#" },
      { label: "Enterprise Solutions", href: "#" },
    ],
  };

  const socialLinks = [
    {
      icon: <FaInstagram size={24} className="text-gray-400" />,
      href: "#",
      label: "Instagram",
    },
    {
      icon: <FaFacebook size={24} className="text-gray-400" />,
      href: "#",
      label: "Facebook",
    },
    {
      icon: <FaTwitter size={24} className="text-gray-400" />,
      href: "#",
      label: "Twitter",
    },
    {
      icon: <FaLinkedin size={24} className="text-gray-400" />,
      href: "#",
      label: "LinkedIn",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121826] text-white py-12">
      <div className="container mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr,1fr,1fr,1fr] gap-8 md:gap-12">
          {/* Brand column */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#7d7aff]">
              Repaly
            </h2>
            <p className="text-gray-400 mb-6 max-w-xs text-lg">
              AI-powered social media automation to help creators, influencers,
              and brands boost engagement and sales.
            </p>

            {/* Social icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Info links column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Info
            </h3>
            <div className="flex flex-col gap-3">
              {footerLinks.info.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Company links column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Company
            </h3>
            <div className="flex flex-col gap-3">
              {footerLinks.company.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Business links column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Business
            </h3>
            <div className="flex flex-col gap-3">
              {footerLinks.business.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom section with copyright and policies */}
        <div className="flex flex-col md:flex-row justify-between mt-12 items-start md:items-center gap-4 border-t border-solid border-gray-700">
          <p className="text-gray-500 mt-12 font-bold text-sm">
            © {currentYear} Repaly. All rights reserved.
          </p>

          <div className="flex gap-6 mt-12">
            <a
              href="#"
              className="text-gray-500 font-bold text-sm hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 font-bold text-sm hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 font-bold text-sm hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
