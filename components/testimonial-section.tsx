export function TestimonialSection() {
  return (
    <section className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="text-6xl text-purple-300 mb-4">"</div>

            <blockquote className="text-xl text-gray-800 leading-relaxed mb-8">
              Tôi đã là một trong những người dùng đầu tiên thử Ứng dụng Nutri-Guardian, và cảm giác thật tuyệt vời. Tôi yêu thích 
              sự lựa chọn đa dạng của các kế hoạch ăn uống dựa trên tình trạng dị ứng thực phẩm của mình, thực sự giúp tôi giảm thời gian 
              quyết định nên ăn gì
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
