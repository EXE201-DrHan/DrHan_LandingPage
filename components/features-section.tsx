import { Utensils, Users, TestTube, Handshake } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Utensils,
      title: "Food suggestion",
      description: "Provides meal plans and diet suggestions suitable for allergy conditions and limitations.",
    },
    {
      icon: Users,
      title: "Membership",
      description:
        "Offers membership packages to access all special features including meal plans for a day or a week, storing history for easy tracking, and making suggestions in mixed suggestions.",
    },
    {
      icon: TestTube,
      title: "Allergy test information",
      description:
        "Provides test information on how to test for allergies at home or commercial locations for accurate testing.",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description:
        "We have most popular restaurants and medications from hospitals to create a diverse and comprehensive menu.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nutri-Guardian would be your best partner!!</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
