import { Megaphone } from "lucide-react"

const announcements = [
  {
    title: "Welcome to Nutri-Guardian!",
    date: "2025-06-01",
    description: "We are excited to launch our new platform for allergy-friendly eating and food allergy management.",
  },
  {
    title: "New Article Series: Allergy Safety",
    date: "2025-06-05",
    description: "Check out our latest articles on how to stay safe and healthy with food allergies.",
  },
  {
    title: "Community Forum Coming Soon",
    date: "2025-06-10",
    description: "We're building a space for you to connect, share, and support each other. Stay tuned!",
  },
];

export default function UpdatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-10 text-center flex flex-col items-center">
        <Megaphone className="w-16 h-16 text-blue-400 mb-4" />
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Website Announcements</h1>
        <div className="w-full space-y-6">
          {announcements.map((item, idx) => (
            <div key={idx} className="bg-blue-50 rounded-xl p-5 text-left shadow flex flex-col">
              <div className="flex items-center mb-2">
                <span className="text-blue-600 font-semibold mr-2">{item.title}</span>
                <span className="text-xs text-gray-400 ml-auto">{item.date}</span>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 