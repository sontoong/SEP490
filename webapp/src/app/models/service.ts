export type ServicePackage = {
  servicePackageId: string;
  name: string;
  numOfRequest: number;
  imageUrl: string;
  description: string;
  status: boolean;
  priceByDate: number;
  policy?: string;
  servicePackagePriceId?: string;
  date?: string;
};
