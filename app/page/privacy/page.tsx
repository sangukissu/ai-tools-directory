export default function PrivacyPolicyPage() {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-gray-300">
            <p>
              At FindMyAITool, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our website and services.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email address, and other details you provide when you register for an account, submit a tool, or interact with our website. We also collect non-personal information such as browser type, IP address, and pages visited to improve our services.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to provide and improve our services, communicate with you, and personalize your experience. We may also use your information for analytics purposes and to send you relevant updates and marketing communications.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
            <p>
              We may use third-party services to help us operate our website and provide our services. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. If you wish to exercise these rights or have any questions about our privacy practices, please contact us using the information provided at the end of this policy.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.
            </p>
            <p className="mt-8">
              If you have any questions about this Privacy Policy, please contact us at privacy@findmyaitool.com.
            </p>
            <p className="mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  