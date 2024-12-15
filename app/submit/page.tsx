import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: 'Submit Your AI Tool | Geekdroid',
  description: 'Submit your innovative AI tool for review and potential inclusion in our curated directory. Join the Geekdroid community and showcase your AI solution to a global audience of developers, businesses, and AI enthusiasts.',
  openGraph: {
    title: 'Submit Your AI Tool | Geekdroid',
    description: 'Submit your innovative AI tool for review and potential inclusion in our curated directory. Join the Geekdroid community and showcase your AI solution to a global audience.',
    url: 'https://geekdroid.in/submit',
    siteName: 'Geekdroid',
    images: [
      {
        url: 'https://geekdroid.in/og-submit.png',
        width: 1200,
        height: 630,
        alt: 'Submit Your AI Tool to Geekdroid',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Submit Your AI Tool | Geekdroid',
    description: 'Submit your innovative AI tool for review and potential inclusion in our curated directory. Join the Geekdroid community and showcase your AI solution.',
    images: ['https://geekdroid.in/og-submit.png'],
  },
}

export default function SubmitToolPage() {
  const currentDate = new Date().toISOString()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://geekdroid.in/submit"
            },
            "headline": "Submit Your AI Tool to Geekdroid",
            "description": "Learn how to submit your innovative AI tool for review and potential inclusion in our curated directory. Join the Geekdroid community and showcase your AI solution to a global audience of developers, businesses, and AI enthusiasts.",
            "image": "https://geekdroid.in/og-submit.png",
            "author": {
              "@type": "Organization",
              "name": "Geekdroid"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Geekdroid",
              "logo": {
                "@type": "ImageObject",
                "url": "https://geekdroid.in/logo.png"
              }
            },
            "datePublished": currentDate,
            "dateModified": currentDate
          })
        }}
      />
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Submit Your AI Tool</h1>
          <p className="text-gray-400 mb-8">
            Have an amazing AI tool that you'd like to share with our community? Submit it here for review and potential inclusion in our directory. Join the Geekdroid ecosystem and showcase your innovative AI solution to a global audience of developers, businesses, and AI enthusiasts.
          </p>
          <form className="max-w-2xl">
            <div className="space-y-6">
              <div>
                <label htmlFor="toolName" className="block text-sm font-medium text-gray-300 mb-1">Tool Name</label>
                <Input id="toolName" placeholder="Enter the name of your AI tool" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label htmlFor="toolDescription" className="block text-sm font-medium text-gray-300 mb-1">Tool Description</label>
                <Textarea id="toolDescription" placeholder="Describe your AI tool in detail (max 1000 characters)" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label htmlFor="toolCategory" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nlp">Natural Language Processing</SelectItem>
                    <SelectItem value="cv">Computer Vision</SelectItem>
                    <SelectItem value="ml">Machine Learning</SelectItem>
                    <SelectItem value="robotics">Robotics</SelectItem>
                    <SelectItem value="data-analytics">Data Analytics</SelectItem>
                    <SelectItem value="ai-automation">AI Automation</SelectItem>
                    <SelectItem value="generative-ai">Generative AI</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="toolWebsite" className="block text-sm font-medium text-gray-300 mb-1">Tool Website</label>
                <Input id="toolWebsite" type="url" placeholder="https://www.example.com" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-1">Contact Email</label>
                <Input id="contactEmail" type="email" placeholder="your@email.com" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label htmlFor="toolFeatures" className="block text-sm font-medium text-gray-300 mb-1">Key Features</label>
                <Textarea id="toolFeatures" placeholder="List the key features of your AI tool" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label htmlFor="toolUseCases" className="block text-sm font-medium text-gray-300 mb-1">Use Cases</label>
                <Textarea id="toolUseCases" placeholder="Describe potential use cases for your AI tool" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Submit for Review</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

