import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Link,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  // Define colors to match the rest of the app
  const bgColor = "#121826";
  const primaryColor = "#4fbdc9";
  const textColor = "#ffffff";
  const secondaryTextColor = "#9ca3af";
  const brandColor = "#7d7aff"; // Purple color for the logo

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
      icon: <FaInstagram size={24} color={secondaryTextColor} />,
      href: "#",
      label: "Instagram",
    },
    {
      icon: <FaFacebook size={24} color={secondaryTextColor} />,
      href: "#",
      label: "Facebook",
    },
    {
      icon: <FaTwitter size={24} color={secondaryTextColor} />,
      href: "#",
      label: "Twitter",
    },
    {
      icon: <FaLinkedin size={24} color={secondaryTextColor} />,
      href: "#",
      label: "LinkedIn",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <Box bg={bgColor} color={textColor} py={12}>
      <Container maxW="container.xl">
        {/* Main footer content */}
        <Grid
          templateColumns={{ base: "1fr", md: "1.5fr repeat(3, 1fr)" }}
          gap={{ base: 8, md: 12 }}
        >
          {/* Brand column */}
          <GridItem>
            <Heading
              as="h2"
              fontSize="2xl"
              fontWeight="bold"
              mb={4}
              color={brandColor}
            >
              Repaly
            </Heading>
            <Text color={secondaryTextColor} mb={6} maxW="xs" fontSize={"lg"}>
              AI-powered social media automation to help creators, influencers,
              and brands boost engagement and sales.
            </Text>

            {/* Social icons */}
            <HStack gap={4}>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  _hover={{ color: primaryColor }}
                  transition="color 0.2s"
                >
                  {social.icon}
                </Link>
              ))}
            </HStack>
          </GridItem>

          {/* Info links column */}
          <GridItem>
            <Heading as="h3" fontSize="lg" fontWeight="semibold" mb={4}>
              Info
            </Heading>
            <Stack gap={3}>
              {footerLinks.info.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color={secondaryTextColor}
                  _hover={{ color: textColor }}
                  transition="color 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </GridItem>

          {/* Company links column */}
          <GridItem>
            <Heading as="h3" fontSize="lg" fontWeight="semibold" mb={4}>
              Company
            </Heading>
            <Stack gap={3}>
              {footerLinks.company.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color={secondaryTextColor}
                  _hover={{ color: textColor }}
                  transition="color 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </GridItem>

          {/* Business links column */}
          <GridItem>
            <Heading as="h3" fontSize="lg" fontWeight="semibold" mb={4}>
              Business
            </Heading>
            <Stack gap={3}>
              {footerLinks.business.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color={secondaryTextColor}
                  _hover={{ color: textColor }}
                  transition="color 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </GridItem>
        </Grid>

        {/* Footer bottom section with copyright and policies */}

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          mt={12}
          align={{ base: "flex-start", md: "center" }}
          gap={4}
          borderTop={"1px"}
          borderStyle={"solid"}
          borderColor={"gray.700"}
        >
          <Text color={"gray.500"} mt={12} fontWeight={"bold"} fontSize="sm">
            © {currentYear} Repaly. All rights reserved.
          </Text>

          <HStack gap={6} mt={12}>
            <Link
              href="#"
              color={"gray.500"}
              fontWeight={"bold"}
              fontSize="sm"
              _hover={{ color: textColor }}
              transition="color 0.2s"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color={"gray.500"}
              fontWeight={"bold"}
              fontSize="sm"
              _hover={{ color: textColor }}
              transition="color 0.2s"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color={"gray.500"}
              fontWeight={"bold"}
              fontSize="sm"
              _hover={{ color: textColor }}
              transition="color 0.2s"
            >
              Cookie Policy
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
