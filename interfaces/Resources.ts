export default interface ResourcesInterface {
  publisher_name?: string;
  author?: string;
  rating: number;
  resource_id: string;
  resource_image: string;
  resource_name: string;
  isbn_code?: string;
  reviews: number;
  year?: string;
  tags?: string;
  length?: string;
  summary?: string;
  language?: string;
  material_type: string;
  resource?: string;
  material_category?: string;
  genre?: string;
  subject?: string;
  format?: string;
  wishlist?: boolean;
  table_of_content?: string;
  author_detail?: string;
  slug?:string;
}
