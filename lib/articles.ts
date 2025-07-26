export interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  content?: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Hiểu Về Dị Ứng Phổ Biến: Hướng Dẫn Toàn Diện",
    excerpt:
      "Tìm hiểu về các loại dị ứng phổ biến nhất, triệu chứng của chúng và cách quản lý hiệu quả trong cuộc sống hàng ngày.",
    author: "Dr. Sarah Johnson",
    date: "15 tháng 3, 2025",
    category: "Nổi Bật",
    image: undefined,
  },
  {
    id: 2,
    title: "Quản Lý Dị Ứng Theo Mùa: Mẹo và Thủ Thuật",
    excerpt:
      "Các chiến lược thực tế để đối phó với dị ứng theo mùa và duy trì chất lượng cuộc sống.",
    author: "Dr. Sarah Johnson",
    date: "15 tháng 3, 2025",
    category: "Dị Ứng Theo Mùa",
    image: undefined,
  },
  {
    id: 3,
    title: "An Toàn Dị Ứng Thực Phẩm: Những Điều Bạn Cần Biết",
    excerpt:
      "Thông tin thiết yếu về dị ứng thực phẩm, nhiễm chéo và các biện pháp an toàn.",
    author: "Dr. Sarah Johnson",
    date: "15 tháng 3, 2025",
    category: "Dị Ứng Thực Phẩm",
    image: undefined,
  },
]; 