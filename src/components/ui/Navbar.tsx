
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";
import LoginDrawer from "@/components/common/LoginDrawer";

const Navbar = () => {
  const pages = [
    { name: "Product", section: "product" },
    { name: "Features", section: "features" },
    { name: "Pricing", section: "pricing" },
    { name: "About Us", section: "about" },
  ];

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    // Using react-scroll's scrollToTop function
    import("react-scroll").then((scroll) => {
      scroll.animateScroll.scrollToTop({ duration: 500 });
    });
  };

  return (
    <nav className="h-[70px] bg-background sticky top-0 px-6 sm:px-12 md:px-24 border-b border-border flex items-center justify-between z-50">
      {/* Logo Section */}
      <div className="flex items-center justify-start">
        <div onClick={handleLogoClick} className="cursor-pointer">
          <img
            src="/repaly-logo.png"
            alt="Logo"
            className="w-[100px] md:w-[120px] lg:w-[200px] rounded-full"
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className="hidden lg:flex justify-center gap-4 md:gap-12">
        {pages.map((page) => (
          <ScrollLink
            key={page.name}
            to={page.section}
            smooth={true}
            duration={500}
            offset={-70}
            className="text-foreground hover:text-primary cursor-pointer font-medium"
          >
            {page.name}
          </ScrollLink>
        ))}
      </div>

      {/* Right section: Theme toggle and Login Button */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LoginDrawer
          triggerButton={
            <Button
              className="px-4 xl:px-8 py-4 rounded-full font-bold transition-all hover:translate-y-[-2px] hover:shadow-lg"
            >
              Get Started
            </Button>
          }
        />
      </div>
    </nav>
  );
};

export default Navbar;
