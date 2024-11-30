export type Contract = {
  item: {
    contractId: string;
    customerId: string;
    servicePackageId: string;
    name: string;
    fileUrl: string;
    purchaseTime: string;
    expireDate: string;
    numOfRequest: number;
    remainingNumOfRequests: number;
    orderCode: string | null;
    isOnlinePayment: boolean;
    totalPrice: number;
  };
  getCusInfo: {
    accountId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    avatarUrl: string;
    dateOfBirth: string;
    cmT_CCCD: string;
  };
  requestIdList: { requestId: string; start: string }[];
};
