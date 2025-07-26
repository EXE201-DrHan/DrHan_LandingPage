export function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dị ứng thực phẩm là vấn đề nghiêm trọng...</h2>

            <div className="space-y-4 text-gray-700">
              <p>
                Dựa trên nghiên cứu của <span className="font-semibold">Dr. Han</span> trên{" "}
                <span className="font-semibold">108 người</span> trong độ tuổi <span className="font-semibold">18-24</span>.
              </p>
              <p>
                <span className="font-semibold">30.6%</span> trong số họ <span className="font-semibold">không</span>{" "}
                biết liệu họ có bị <span className="font-semibold">dị ứng thực phẩm</span> hay không.
              </p>

              <div className="mt-8">
                <p className="font-semibold text-gray-900 mb-2">Dị ứng thực phẩm</p>
                <p>
                  có thể gây ra các phản ứng nhẹ đến nghiêm trọng, bao gồm các vấn đề tiêu hóa, vấn đề về da, và thậm chí
                  phản vệ đe dọa tính mạng, ảnh hưởng đáng kể đến cuộc sống hàng ngày và sức khỏe tổng thể.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl mb-4">
              <h3 className="font-bold text-lg">DỊCH BỆNH DỊ ỨNG THỰC PHẨM</h3>
              <div className="flex items-center justify-between mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">13 triệu</div>
                  <div className="text-sm opacity-90">Người Mỹ</div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🇺🇸</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-100 p-4 rounded-xl text-center">
                <div className="text-purple-600 font-bold text-lg">1 trong 10</div>
                <div className="text-purple-600 text-sm">NGƯỜI LỚN</div>
              </div>
              <div className="bg-green-100 p-4 rounded-xl text-center">
                <div className="text-green-600 font-bold text-lg">1 trong 13</div>
                <div className="text-green-600 text-sm">TRẺ EM</div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded-xl">
              <div className="text-blue-600 font-bold text-2xl">37.7%</div>
              <div className="text-blue-600 text-sm">trẻ em dị ứng thực phẩm đã trải qua phản ứng nghiêm trọng</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
