import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const PrivacyPolicyPage = () => {
  return (
    <Flex direction="column" p={8} maxW="1300px" mx="auto" gap={10}>
      <Heading as="h1" size="5xl" textAlign="center">
        Privacy Policy
      </Heading>

      <Text fontSize="lg" color="gray.600" textAlign="center">
        Effective Date: 26-04-2025 | Last Updated: 26-04-2025
      </Text>

      <Text fontSize="2xl" mt={4}>
        Welcome to <b>Airth Research Pvt Ltd</b> ("we", "our", "us", or "Repaly.ai"). Your
        privacy is very important to us. This Privacy Policy explains how we
        collect, use, and safeguard your information when you use our services —
        designed to automate Instagram interactions (comments, DMs, and story
        replies) using Meta's official APIs.
      </Text>

      <Stack gap={8} mt={8} fontSize="xl">
        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            1. Information We Collect
          </Heading>
          <Text>
            When you use our platform, we may collect the following data:
          </Text>
          <Stack pl={6} mt={4} gap={2}>
            <Box>
              <Text fontWeight="bold" fontSize="2xl">
                a. Instagram Account Data
              </Text>
              <Stack pl={4} mt={2} gap={2}>
                <Text>- Instagram user ID</Text>
                <Text>- Page ID</Text>
                <Text>- Access tokens</Text>
                <Text>- Profile details (username, profile picture, etc.)</Text>
              </Stack>
            </Box>

            <Box>
              <Text fontWeight="bold" fontSize="2xl">
                b. Interaction Data
              </Text>
              <Stack pl={4} mt={2} gap={2}>
                <Text>- Comments on your Instagram posts</Text>
                <Text>- Direct messages and story replies</Text>
                <Text>- Timestamps and metadata of interactions</Text>
              </Stack>
            </Box>

            <Box>
              <Text fontWeight="bold" fontSize="2xl">
                c. Technical & Usage Data
              </Text>
              <Stack pl={4} mt={2} gap={2}>
                <Text>- IP address</Text>
                <Text>- Browser and device type</Text>
                <Text>
                  - Log data and interaction history with our platform
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            2. How We Use Your Information
          </Heading>
          <Stack pl={6} gap={2}>
            <Text>- Provide automated reply services on Instagram</Text>
            <Text>
              - Personalize and optimize responses based on interaction history
            </Text>
            <Text>- Monitor and analyze system performance and usage</Text>
            <Text>- Ensure platform security and fraud prevention</Text>
            <Text>- Comply with legal and platform (Meta) requirements</Text>
          </Stack>
        </Box>

        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            3. Data Sharing and Disclosure
          </Heading>
          <Text>
            We do not sell your personal data. We only share information under
            the following circumstances:
          </Text>
          <Stack pl={6} mt={4} gap={2}>
            <Text>- With Instagram / Meta: As required by API usage</Text>
            <Text>
              - With Service Providers: For hosting, database management, and
              analytics
            </Text>
            <Text>
              - As Required by Law: To comply with legal obligations or valid
              requests
            </Text>
          </Stack>
        </Box>

        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            4. Data Retention
          </Heading>
          <Text>We retain your data only as long as necessary for:</Text>
          <Stack pl={6} mt={4} gap={2}>
            <Text>- Providing our service</Text>
            <Text>- Legal or contractual compliance</Text>
            <Text>- Internal analytics and system optimization</Text>
          </Stack>
          <Text mt={4}>
            You may request deletion of your data at any time (see Section 7).
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            5. Cookies and Tracking
          </Heading>
          <Text>We may use cookies and similar technologies to:</Text>
          <Stack pl={6} mt={4} gap={2}>
            <Text>- Maintain session states</Text>
            <Text>- Track platform performance and usage</Text>
            <Text>- Improve user experience</Text>
          </Stack>
          <Text mt={4}>
            You can control cookie preferences through your browser settings.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            6. Security Measures
          </Heading>
          <Stack pl={6} gap={2}>
            <Text>- End-to-end encryption for sensitive data</Text>
            <Text>- Role-based access control</Text>
            <Text>- Regular security audits and monitoring</Text>
          </Stack>
        </Box>

        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            7. Your Rights
          </Heading>
          <Text>
            Depending on your location (e.g., GDPR or CCPA regulations), you may
            have the right to:
          </Text>
          <Stack pl={6} mt={4} gap={2}>
            <Text>- Access your data</Text>
            <Text>- Correct or update your data</Text>
            <Text>- Delete your data</Text>
            <Text>- Object to certain processing activities</Text>
          </Stack>
          <Text mt={4}>
            To exercise these rights, please contact us at <b>info@repaly.ai</b>
            .
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            8. Children’s Privacy
          </Heading>
          <Text>
            Our platform is not intended for individuals under the age of 13. We
            do not knowingly collect personal information from children.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            9. Changes to This Policy
          </Heading>
          <Text>
            We may periodically update this Privacy Policy. When significant
            changes are made, we will update the “Last Updated” date and, if
            appropriate, notify you via email or platform notifications.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="4xl" mb={4}>
            10. Contact Us
          </Heading>
          <Text>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </Text>
          <Text mt={4}>
            <b>Email:</b> info@repaly.ai
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

export default PrivacyPolicyPage;
