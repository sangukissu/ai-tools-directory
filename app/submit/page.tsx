import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SubmitToolPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Submit Your AI Tool</h1>
        <p className="text-gray-400 mb-8">
          Have an amazing AI tool that you'd like to share with our community? Submit it here for review and potential inclusion in our directory.
        </p>
        <form className="max-w-2xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="toolName" className="block text-sm font-medium text-gray-300 mb-1">Tool Name</label>
              <Input id="toolName" placeholder="Enter the name of your AI tool" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label htmlFor="toolDescription" className="block text-sm font-medium text-gray-300 mb-1">Tool Description</label>
              <Textarea id="toolDescription" placeholder="Describe your AI tool (max 500 characters)" className="bg-gray-800 border-gray-700 text-white" />
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
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Submit for Review</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

