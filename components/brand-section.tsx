import React from 'react'

export function BrandSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tại Sao Chọn Nutri-Guardian?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nutri-Guardian của Đội Dr. Han là ứng dụng quản lý dị ứng thực phẩm đáng tin cậy nhất, 
            giúp hàng nghìn người dùng ăn uống an toàn và sống khỏe mạnh hơn.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Ứng Dụng Dị Ứng Thực Phẩm Hàng Đầu</h3>
            <p className="text-gray-600">
              Nutri-Guardian được công nhận là ứng dụng quản lý dị ứng thực phẩm hàng đầu, 
              được người dùng trên toàn thế giới tin tưởng về khả năng phát hiện chất gây dị ứng chính xác và hướng dẫn ăn uống an toàn.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Đội Chuyên Gia Dr. Han</h3>
            <p className="text-gray-600">
              Được tạo ra bởi Đội Dr. Han, kết hợp chuyên môn y tế với công nghệ tiên tiến 
              để cung cấp các giải pháp quản lý dị ứng thực phẩm đáng tin cậy nhất.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Miễn Phí Tải Xuống</h3>
            <p className="text-gray-600">
              Tải xuống ứng dụng Nutri Guardian hoàn toàn miễn phí. Không có chi phí ẩn, không có đăng ký - 
              chỉ có quản lý dị ứng thực phẩm toàn diện trong tầm tay bạn.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Điều Gì Làm Cho Nutri-Guardian Đặc Biệt?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">🔍 Phát Hiện Chất Gây Dị Ứng Tiên Tiến</h4>
                <p className="text-gray-600">Phân tích thành phần theo thời gian thực với cơ sở dữ liệu chất gây dị ứng toàn diện</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">🍽️ Kế Hoạch Ăn Uống Cá Nhân Hóa</h4>
                <p className="text-gray-600">Kế hoạch dinh dưỡng tùy chỉnh dựa trên dị ứng cụ thể và sở thích của bạn</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">👨‍⚕️ Hướng Dẫn Chuyên Gia</h4>
                <p className="text-gray-600">Lời khuyên chuyên nghiệp từ các chuyên gia dinh dưỡng của Đội Dr. Han</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">📚 Tài Nguyên Giáo Dục</h4>
                <p className="text-gray-600">Tài liệu học tập toàn diện về dị ứng thực phẩm và ăn uống an toàn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
