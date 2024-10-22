export type Request = {
  RequestId: string;
  LeaderId: string;
  CustomerId: string;
  Start: string;
  End: string;
  CustomerProblem: string;
  Conclusion: string;
  Status: number;
  CategoryRequest: number;
  TotalPrice: number;
  FileUrl: string;
  RequestDetails: RequestDetails[];
  PriceRequests: PriceRequest[];
  Feedback: Feedback;
};

type RequestDetails = {
  RequestDetailId: string;
  RequestId: string;
  ProductId: string;
  Quantity: number;
  isCustomerPaying: boolean;
  Description: string;
};

type PriceRequest = {
  PriceRequestId: string;
  Date: string;
  PriceByDate: number;
};

type Feedback = {
  FeedbackId: string;
  Content: string;
  Rate: number;
  Status: boolean;
};
