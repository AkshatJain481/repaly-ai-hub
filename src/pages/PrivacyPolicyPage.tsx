import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col p-8 max-w-[1300px] mx-auto gap-10">
      <h1 className="text-5xl text-center">
        Privacy Policy
      </h1>

      <p className="text-lg text-gray-600 text-center">
        Effective Date: 26-04-2025 | Last Updated: 26-04-2025
      </p>

      <p className="text-2xl mt-4">
        Welcome to <b>Airth Research Pvt Ltd</b> ("we", "our", "us", or "Repaly.ai"). Your
        privacy is very important to us. This Privacy Policy explains how we
        collect, use, and safeguard your information when you use our services —
        designed to automate Instagram interactions (comments, DMs, and story
        replies) using Meta's official APIs.
      </p>

      <div className="flex flex-col gap-8 mt-8 text-xl">
        <div>
          <h2 className="text-4xl mb-4">
            1. Information We Collect
          </h2>
          <p>
            When you use our platform, we may collect the following data:
          </p>
          <div className="pl-6 mt-4 flex flex-col gap-2">
            <div>
              <p className="font-bold text-2xl">
                a. Instagram Account Data
              </p>
              <div className="pl-4 mt-2 flex flex-col gap-2">
                <p>- Instagram user ID</p>
                <p>- Page ID</p>
                <p>- Access tokens</p>
                <p>- Profile details (username, profile picture, etc.)</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-2xl">
                b. Interaction Data
              </p>
              <div className="pl-4 mt-2 flex flex-col gap-2">
                <p>- Comments on your Instagram posts</p>
                <p>- Direct messages and story replies</p>
                <p>- Timestamps and metadata of interactions</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-2xl">
                c. Technical & Usage Data
              </p>
              <div className="pl-4 mt-2 flex flex-col gap-2">
                <p>- IP address</p>
                <p>- Browser and device type</p>
                <p>- Log data and interaction history with our platform</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl mb-4">
            2. How We Use Your Information
          </h2>
          <div className="pl-6 flex flex-col gap-2">
            <p>- Provide automated reply services on Instagram</p>
            <p>- Personalize and optimize responses based on interaction history</p>
            <p>- Monitor and analyze system performance and usage</p>
            <p>- Ensure platform security and fraud prevention</p>
            <p>- Comply with legal and platform (Meta) requirements</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl mb-4">
            3. Data Sharing and Disclosure
          </h2>
          <p>
            We do not sell your personal data. We only share information under
            the following circumstances:
          </p>
          <div className="pl-6 mt-4 flex flex-col gap-2">
            <p>- With Instagram / Meta: As required by API usage</p>
            <p>- With Service Providers: For hosting, database management, and analytics</p>
            <p>- As Required by Law: To comply with legal obligations or valid requests</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl mb-4">
            4. Data Retention
          </h2>
          <p>We retain your data only as long as necessary for:</p>
          <div className="pl-6 mt-4 flex flex-col gap-2">
            <p>- Providing our service</p>
            <p>- Legal or contractual compliance</p>
            <p>- Internal analytics and system optimization</p>
          </div>
          <p mt-4>
            You may request deletion of your data at any time (see Section 7).
          </p>
        </div>

        <div>
          <h2 className="text-4xl mb-4">
            5. Cookies and Tracking
          </h2>
          <p>We may use cookies and similar technologies to:</p>
          <div className="pl-6 mt-4 flex flex-col gap-2">
            <p>- Maintain session states</p>
            <p>- Track platform performance and usage</p>
            <p>- Improve user experience</p>
          </div>
          <p mt-4>
            You can control cookie preferences through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-4xl mb-4">
            6. Security Measures
          </h2>
          <div className="pl-6 flex flex-col gap-2">
            <p>- End-to-end encryption for sensitive data</p>
            <p>- Role-based access control</p>
            <p>- Regular security audits and monitoring</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl mb-4">
            7. Your Rights
          </h2>
          <p>
            Depending on your location (e.g., GDPR or CCPA regulations), you may
            have the right to:
          </p>
          <div className="pl-6 mt-4 flex flex-col gap-2">
            <p>- Access your data</p>
            <p>- Correct or update your data</p>
            <p>- Delete your data</p>
            <p>- Object to certain processing activities</p>
          </div>
          <p mt-4>
            To exercise these rights, please contact us at <b>info@repaly.ai</b>
            .
          </p>
        </div>

        <div>
          <h2 className="text-4xl mb-4">
            8. Children’s Privacy
          </h2>
          <p>
            Our platform is not intended for individuals under the age of 13. We
            do not knowingly collect personal information from children.
          </p>
        </div>

        <div>
          <h2 className="text-4xl mb-4">
            9. Changes to This Policy
          </h2>
          <p>
            We may periodically update this Privacy Policy. When significant
            changes are made, we will update the “Last Updated” date and, if
            appropriate, notify you via email or platform notifications.
          </p>
        </div>

        <div>
          <h2 className="text-4xl mb-4">
            10. Contact Us
          </h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p mt-4>
            <b>Email:</b> info@repaly.ai
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
