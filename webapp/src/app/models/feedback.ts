export type Feedback = {
  feedbackId: string;
  requestId: string;
  customerName: string;
  customerEmail: string;
  avatarUrl: string;
  content: string;
  rate: number;
  status: boolean;
};

export type FeedbackDetails = {
  customerAddress: string;
  customerPhone: string;
  feedbackId: string;
  customerName: string;
  customerEmail: string;
  avatarUrl: string;
  content: string;
  rate: number;
  status: boolean;
};
