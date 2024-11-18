export type Product = {
  productId: string;
  name: string;
  inOfStock: number;
  imageUrl: string;
  status: boolean;
  priceByDate: number;
  description?: string;
  warantyMonths?: number;
  productPriceId?: string;
  date?: string;
};
