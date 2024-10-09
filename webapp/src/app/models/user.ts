export type User = {
  AccountId: string;
  Fullname: string;
  Email: string;
  Password?: string;
  PhoneNumber: string;
  AvatarUrl: string;
  DateOfBirth: string;
  IsDisabled: boolean;
  DisabledReason: string;
  Role: string;
};

export type Leader = User & {
  LeaderId: string;
};

export type Worker = User & {
  WorkerId: string;
  LeaderId: string;
};

export type Customer = User & {
  CustomerId: string;
  RoomId: string;
};
