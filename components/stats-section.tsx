export function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Food Allergy is a serious matter...</h2>

            <div className="space-y-4 text-gray-700">
              <p>
                Base on <span className="font-semibold">Dr. Han</span> Research on{" "}
                <span className="font-semibold">108 people</span> between <span className="font-semibold">18-24</span>.
              </p>
              <p>
                <span className="font-semibold">30.6%</span> of them <span className="font-semibold">does not</span>{" "}
                know whether they have <span className="font-semibold">food allergy</span> or not.
              </p>

              <div className="mt-8">
                <p className="font-semibold text-gray-900 mb-2">Food allergies</p>
                <p>
                  can cause mild to severe reactions, including digestive issues, skin problems, and even
                  life-threatening anaphylaxis, significantly impacting daily life and overall well-being.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl mb-4">
              <h3 className="font-bold text-lg">THE FOOD ALLERGY EPIDEMIC</h3>
              <div className="flex items-center justify-between mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">13 million</div>
                  <div className="text-sm opacity-90">Americans</div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🇺🇸</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-100 p-4 rounded-xl text-center">
                <div className="text-purple-600 font-bold text-lg">1 in 10</div>
                <div className="text-purple-600 text-sm">ADULTS</div>
              </div>
              <div className="bg-green-100 p-4 rounded-xl text-center">
                <div className="text-green-600 font-bold text-lg">1 in 13</div>
                <div className="text-green-600 text-sm">CHILDREN</div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded-xl">
              <div className="text-blue-600 font-bold text-2xl">37.7%</div>
              <div className="text-blue-600 text-sm">of food allergic children have experienced a severe reaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
