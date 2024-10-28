export type Order = {
  OrderId: string;
  CustomerId: string;
  PurchaseTime: string;
  Status: boolean;
  FileUrl: string;
  OrderCode: string;
  OrderDetails: OrderDetail[];
  WarrantyCards: WarrantyCards[];
};

type OrderDetail = {
  OrderId: string;
  ProductId: string;
  Quantity: number;
  Price: number;
  TotalPrice: number;
};

type WarrantyCards = {
  WarrantyCardId: string;
  OrderId: string;
  ProductId: string;
  StartDate: string;
  ExpireDate: string;
};
