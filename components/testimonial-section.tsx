export function TestimonialSection() {
  return (
    <section className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="text-6xl text-purple-300 mb-4">"</div>

            <blockquote className="text-xl text-gray-800 leading-relaxed mb-8">
              I have been one of the earliest users to try the Nutri-Guardian App, and it feel incredible. I love the
              versatile choices of meal plans on my condition of food allergy, really help me reduce the time to decide
              what to eat
            </blockquote>

            <div className="flex items-center justify-between">
              <div className="text-6xl text-purple-300">"</div>
              <cite className="text-gray-600 italic">- Phuc Hong -</cite>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-80 h-80 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-64 h-64 bg-yellow-300 rounded-full flex items-center justify-center">
                <img
                  src="/images/phuchong.jpg"
                  alt="persona"
                  className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
