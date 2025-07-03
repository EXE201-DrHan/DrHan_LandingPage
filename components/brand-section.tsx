import React from 'react'

export function BrandSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Nutri-Guardian?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nutri-Guardian by Dr. Han Team is the most trusted food allergy management app, 
            helping thousands of users eat safely and live healthier lives.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Leading Food Allergy App</h3>
            <p className="text-gray-600">
              Nutri-Guardian is recognized as the leading food allergy management app, 
              trusted by users worldwide for accurate allergen detection and safe eating guidance.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Dr. Han Team</h3>
            <p className="text-gray-600">
              Created by Dr. Han Team, combining medical expertise with cutting-edge technology 
              to provide the most reliable food allergy management solutions.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Free to Download</h3>
            <p className="text-gray-600">
              Download Nutri Guardian app completely free. No hidden costs, no subscriptions - 
              just comprehensive food allergy management at your fingertips.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              What Makes Nutri-Guardian Special?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">🔍 Advanced Allergen Detection</h4>
                <p className="text-gray-600">Real-time ingredient analysis with comprehensive allergen database</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">🍽️ Personalized Meal Plans</h4>
                <p className="text-gray-600">Custom nutrition plans based on your specific allergies and preferences</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">👨‍⚕️ Expert Guidance</h4>
                <p className="text-gray-600">Professional advice from Dr. Han Team's nutrition specialists</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">📚 Educational Resources</h4>
                <p className="text-gray-600">Comprehensive learning materials about food allergies and safe eating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
