export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
};

export type GetProductsApiResponse = {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
};
