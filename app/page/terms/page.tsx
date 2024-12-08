export default function TermsOfServicePage() {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="space-y-6 text-gray-300">
            <p>
              Welcome to FindMyAITool. By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our website or use our services.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of Our Services</h2>
            <p>
              You may use our services only as permitted by law and as described in these Terms. You agree not to misuse our services or help anyone else do so.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Content</h2>
            <p>
              Our website allows you to submit, post, and share content. You retain ownership of any intellectual property rights that you hold in that content. By submitting content, you grant FindMyAITool a worldwide, royalty-free license to use, reproduce, modify, and distribute that content.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              The content, features, and functionality of our website are owned by FindMyAITool and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Termination</h2>
            <p>
              We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall FindMyAITool, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms on this page.
            </p>
            <p className="mt-8">
              If you have any questions about these Terms, please contact us at terms@findmyaitool.com.
            </p>
            <p className="mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  