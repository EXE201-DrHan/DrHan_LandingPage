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
    title: "Understanding Common Allergies: A Comprehensive Guide",
    excerpt:
      "Learn about the most common types of allergies, their symptoms, and how to manage them effectively in your daily life.",
    author: "Dr. Sarah Johnson",
    date: "March 15, 2025",
    category: "Feature",
    image: undefined,
  },
  {
    id: 2,
    title: "Managing Seasonal Allergies: Tips and Tricks",
    excerpt:
      "Practical strategies to cope with seasonal allergies and maintain your quality of life.",
    author: "Dr. Sarah Johnson",
    date: "March 15, 2025",
    category: "Seasonal Allergy",
    image: undefined,
  },
  {
    id: 3,
    title: "Food Allergy Safety: What You Need to Know",
    excerpt:
      "Essential information about food allergies, cross-contamination, and safety measures.",
    author: "Dr. Sarah Johnson",
    date: "March 15, 2025",
    category: "Food Allergies",
    image: undefined,
  },
]; 