import { FAQStructuredData } from '@/components/structured-data'

export function NutriGuardianFAQ() {
  const faqData = [
    {
      question: "What is Nutri-Guardian app?",
      answer: "Nutri-Guardian is a comprehensive food allergy management app developed by the Dr. Han Team. It provides personalized nutrition plans, allergen detection, ingredient analysis, and expert guidance for people with food allergies and dietary restrictions."
    },
    {
      question: "How does Nutri Guardian help with food allergies?",
      answer: "Nutri Guardian offers real-time ingredient scanning, personalized meal planning based on your specific allergies, nutritional guidance from experts, allergy-safe recipe recommendations, and educational resources about food allergy management."
    },
    {
      question: "Who created the Nutri-Guardian app?",
      answer: "Nutri-Guardian was created by the Dr. Han Team, a group of nutrition experts and healthcare professionals specializing in food allergy management and personalized nutrition solutions."
    },
    {
      question: "Is Nutri Guardian free to use?",
      answer: "Yes, Nutri Guardian offers free features including basic allergen detection and nutrition guidance. Download the app from CH Play to start managing your food allergies safely with expert support."
    },
    {
      question: "What food allergies does Nutri-Guardian support?",
      answer: "Nutri Guardian supports all major food allergies including nuts, dairy, eggs, seafood, wheat, soy, and many other allergens. The app's comprehensive database covers thousands of ingredients and food products."
    },
    {
      question: "How accurate is Nutri Guardian's allergen detection?",
      answer: "Nutri Guardian uses advanced algorithms and maintains an extensive, regularly updated database of food ingredients and allergens. Our expert team ensures high accuracy in allergen detection and food safety recommendations."
    },
    {
      question: "Can I get personalized meal plans with Nutri Guardian?",
      answer: "Yes! Nutri Guardian creates customized meal plans based on your specific food allergies, dietary preferences, nutritional needs, and health goals. Each plan is designed to ensure safe, nutritious, and delicious eating."
    },
    {
      question: "How do I download Nutri-Guardian app?",
      answer: "You can download Nutri Guardian from CH Play (Google Play Store). Simply search for 'Nutri Guardian' or 'Nutri-Guardian' and look for the app by Dr. Han Team. It's available for Android devices."
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <FAQStructuredData questions={faqData} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions About Nutri-Guardian
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about the Nutri Guardian food allergy management app
          </p>
        </div>
        
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to Start Your Safe Eating Journey?
          </h3>
          <p className="text-gray-600 mb-6">
            Download Nutri-Guardian today and join thousands of users managing their food allergies safely
          </p>
          <a 
            href="#" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Download Nutri Guardian App
          </a>
        </div>
      </div>
    </section>
  )
}
