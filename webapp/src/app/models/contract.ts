import { Customer } from "./user";

export type Contract = {
  item: {
    contractId: string;
    customerId: string;
    servicePackageId: string;
    name: string;
    fileUrl: string;
    purchaseTime: string;
    remainingNumOfRequests: number;
    orderCode: string | null;
    isOnlinePayment: boolean;
    totalPrice: number;
  };
  getCusInfo: (Customer & {
    customers: {
      customerId: string;
      cmT_CCCD: string;
      orders: [];
      requests: [];
      rooms: [];
    };
  })[];
};
