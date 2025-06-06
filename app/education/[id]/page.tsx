import { Heart, MessageCircle, Share, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const author = {
  name: "Quy Co Dep Trai",
  avatar: "/images/author.jpg",
  description:
    "Dr. Han is an award-winning allergist and immunologist, dedicated to advancing research and treatment for allergy-related conditions. As the founder of The Allergy Care Initiative, a global movement focused on improving allergy awareness and treatment accessibility, she has worked to encourage 500 medical institutions and organizations to commit to better allergy care and patient inclusion.",
}

const relatedTopics = [
  {
    image: "/images/related1.jpg",
    title: "Beef allergy. How to survive?",
    likes: 2,
    shares: 8,
    comments: 7,
    bookmarks: 2,
  },
  {
    image: "/images/related2.jpg",
    title: "Furry friend but watch out, maybe he allergic to you.",
    likes: 2,
    shares: 8,
    comments: 7,
    bookmarks: 2,
  },
  {
    image: "/images/related3.jpg",
    title: "Why is fast food so attracted?",
    likes: 27,
    shares: 19,
    comments: 7,
    bookmarks: 2,
  },
  {
    image: "/images/related4.jpg",
    title: "10 ingredient you can use to cook at home for your allergy friends.",
    likes: 2,
    shares: 8,
    comments: 7,
    bookmarks: 2,
  },
  {
    image: "/images/related5.jpg",
    title: "Fish!!! Yes, Fish!!!",
    likes: 2,
    shares: 8,
    comments: 7,
    bookmarks: 2,
  },
]

export default function ArticleDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-96 bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/placeholder.svg?height=400&width=800')",
              }}
            />
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-4xl font-bold text-white mb-4">Allergies: Causes, Symptoms and Prevention</h1>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-8 text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>12 hours ago</span>
                <span>by Carolina Cassey</span>
                <span>4min read</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Allergies occur when the immune system overreacts to substances that are generally harmless, known as
                allergens. These allergens can include pollen, pet dander, certain foods, medications, insect stings,
                and chemicals. The body mistakenly identifies these substances as threats and releases histamines and
                other chemicals, leading to allergic reactions.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Common causes of allergies include seasonal allergies triggered by pollen, food allergies caused by
                items like milk, eggs, peanuts, and seafood, drug allergies to antibiotics such as penicillin, insect
                sting allergies from bees or mosquitoes, and contact allergies from substances like nickel or certain
                cosmetics.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Symptoms vary depending on the type of allergy and the individual's sensitivity. Mild symptoms may
                include sneezing, runny nose, itchy eyes, and hives. Moderate symptoms can involve swelling of the lips
                or eyes, rashes, nausea, or digestive issues. Severe cases, such as anaphylaxis, can cause difficulty
                breathing, a drop in blood pressure, and loss of consciousness, requiring immediate medical attention.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                To prevent allergies, it is best to avoid known allergens whenever possible. Those allergic to pollen
                should stay indoors on windy days, individuals with food allergies must check ingredient labels
                carefully, and maintaining a clean home environment helps reduce exposure to dust and pet dander.
                Medications like antihistamines or nasal sprays can help relieve symptoms, while allergy immunotherapy
                (allergy shots) may be an option for long-term relief in some cases.
              </p>

              <div className="my-8">
                <img src="/placeholder.svg?height=300&width=600" alt="Skin allergy" className="w-full rounded-lg" />
                <p className="text-center text-gray-500 text-sm mt-2">Skin allergy</p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                If allergy symptoms persist or worsen, especially if breathing difficulties or severe swelling occur,
                seeking medical advice is essential. Proper management and early intervention can significantly improve
                quality of life for individuals with allergies.
              </p>

              <p className="text-gray-700 leading-relaxed">
                In recent years, advancements in medical research have led to the development of new treatment options
                for allergies. Biologic medications, such as monoclonal antibodies, target specific immune system
                pathways to reduce severe allergic reactions, particularly in conditions like asthma and chronic
                urticaria. Additionally, researchers are exploring gene therapy as a potential way to alter the body's
                response to allergens at a cellular level. While these treatments are still being studied, they offer
                promising options for individuals with life-threatening allergies. Meanwhile, lifestyle modifications,
                such as using air purifiers, practicing mindful eating to avoid trigger foods, and maintaining good
                hygiene, remain fundamental strategies for allergy management.
              </p>
            </div>

            <div className="flex items-center justify-between pt-8 border-t">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
                  <Heart className="w-5 h-5" />
                  <span>28</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
                  <MessageCircle className="w-5 h-5" />
                  <span>21</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Author Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-sm p-8 mt-8 mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Image src={author.avatar} alt={author.name} width={64} height={64} className="rounded-full object-cover" />
            <div>
              <div className="font-semibold text-lg">Author</div>
              <div className="font-bold text-xl mb-1">{author.name}</div>
              <div className="text-gray-600 max-w-md">{author.description}</div>
            </div>
          </div>
          <Button variant="outline" className="ml-0 md:ml-8 mt-4 md:mt-0">
            <span className="mr-2">TWITTER</span> FOLLOW
          </Button>
        </div>

        {/* Related Topics Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Related Topics</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {relatedTopics.map((topic, idx) => (
              <div key={idx} className="min-w-[220px] bg-white rounded-xl shadow-sm p-3 flex flex-col">
                <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
                  <Image src={topic.image} alt={topic.title} fill className="object-cover" />
                </div>
                <div className="font-semibold mb-2 text-sm">{topic.title}</div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>{topic.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{topic.comments}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Share className="w-4 h-4" />
                    <span>{topic.shares}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bookmark className="w-4 h-4" />
                    <span>{topic.bookmarks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
