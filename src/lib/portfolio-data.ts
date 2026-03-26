export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  blurDataURL: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  tags: string[];
  year: number;
  location: string;
  dominantColors?: string[];
  panoramaImageUrl?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "modern-minimalist-living",
    title: "Modern Minimalist Living",
    category: "Residential",
    description:
      "A serene living space that balances form and function with clean lines and natural materials.",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    panoramaImageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIhAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFERIhMUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amsy1kbHQy47dBnxFrPJLYB4PkEZIrF2rZNpZ/cYLLVtCWw2UFKlJUQkkgY7/ALSlKA//2Q==",
    beforeImageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    afterImageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    tags: ["minimalist", "modern", "living room"],
    year: 2024,
    location: "New York, NY",
    dominantColors: ["#E8D5B7", "#8B7355", "#2C2C2C"],
  },
  {
    id: "luxury-master-bedroom",
    title: "Luxury Master Bedroom",
    category: "Residential",
    description:
      "An opulent master suite featuring custom millwork, plush textures, and bespoke lighting design.",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    panoramaImageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAA/9k=",
    tags: ["luxury", "bedroom", "bespoke"],
    year: 2024,
    location: "Beverly Hills, CA",
    dominantColors: ["#C4A882", "#6B5344", "#F5F0E8"],
  },
  {
    id: "contemporary-kitchen",
    title: "Contemporary Kitchen",
    category: "Residential",
    description:
      "A culinary masterpiece with integrated smart appliances, waterfall island, and custom cabinetry.",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    panoramaImageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAHxAAAQMFAQEAAAAAAAAAAAAAAQACAxEEEiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAB//EABkRAQADAQEAAAAAAAAAAAAAAAEAAhExIf/aAAwDAQACEQMRAD8Amq1rZ7bK2WQIKykAeqlVPLRXTH0jKRbfnvSiDZAJYoN6n//Z",
    tags: ["contemporary", "kitchen", "smart home"],
    year: 2023,
    location: "Chicago, IL",
    dominantColors: ["#F8F8F8", "#2C2C2C", "#C9A84C"],
  },
  {
    id: "zen-bathroom-retreat",
    title: "Zen Bathroom Retreat",
    category: "Residential",
    description:
      "A spa-inspired sanctuary featuring natural stone, rainfall showers, and ambient lighting.",
    imageUrl:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    panoramaImageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMG/8QAHxAAAgIBBQEAAAAAAAAAAAAAAQIDAAQREiEx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAWEQEBAQAAAAAAAAAAAAAAAAAAAxH/2oAMAwEAAhEDEQA/AI7eSB2KHNZdONStT49xW3M7P0AO/wBBpH+FKUBqf//Z",
    tags: ["zen", "bathroom", "spa"],
    year: 2023,
    location: "Miami, FL",
    dominantColors: ["#E8E0D8", "#8B7355", "#4A6741"],
  },
  {
    id: "corporate-executive-office",
    title: "Corporate Executive Office",
    category: "Commercial",
    description:
      "A sophisticated executive workspace that commands authority while maintaining comfort and style.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    panoramaImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgQH/8QAHRAAAQQCAwAAAAAAAAAAAAAAAQACAxEEEiFC/8QAFAEBAAAAAAAAAAAAAAAAAAAAB//EABkRAQADAQEAAAAAAAAAAAAAAAEAAgMhMf/aAAwDAQACEQMRAD8Al7LdxLUlBK08qSAD28mrS3jUutbG8yRw8UoGgCLBWAT6KKAP/9k=",
    tags: ["commercial", "office", "executive"],
    year: 2024,
    location: "San Francisco, CA",
    dominantColors: ["#1C2B3A", "#8B7355", "#E8E0D8"],
  },
  {
    id: "boutique-hotel-lobby",
    title: "Boutique Hotel Lobby",
    category: "Hospitality",
    description:
      "An immersive arrival experience that sets the tone for the entire hotel journey.",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    panoramaImageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgUEB//EAB8QAAIBBAMBAAAAAAAAAAAAAAECAwAEERIhMUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A0NpWPDXaECTNsABopJZMbvOOBjnFV3mXSSZUPsUoAZcaoBHB96KKAf/Z",
    tags: ["hospitality", "hotel", "lobby"],
    year: 2023,
    location: "Paris, France",
    dominantColors: ["#D4AF84", "#2C1810", "#F5EFE6"],
  },
];
