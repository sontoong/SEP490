export type ServicePackage = {
  ServicePackageId: string;
  Name: string;
  Description: string;
  ImageUrl: string;
  NumOfRequest: number;
  Policy: string;
  Status: boolean;
  ServicePackagePrices: ServicepackagePrice;
};

type ServicepackagePrice = {
  ServicePackagePriceId: string;
  Date: string;
  PriceByDate: number;
};
