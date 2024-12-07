export interface AIToolCategory {
    name: string;
  }
  
  export interface FeaturedImage {
    node: {
      sourceUrl: string;
    };
  }
  
  export interface AITool {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    aiToolCategories: {
      nodes: AIToolCategory[];
    };
    featuredImage: FeaturedImage;
  }
  
  