export type Product = {
  ProductId: string;
  Name: string;
  Description: string;
  ImageUrl: string;
  In_Of_stock: number;
  WarrantyMonths: number;
  ProductPrices: ProductPrice;
  Status: boolean;
};

type ProductPrice = {
  ProductPriceId: string;
  Date: string;
  PriceByDate: number;
};
