import { Leader } from "../app/models/user";

export const users = [
  {
    AccountId: "1",
    Fullname: "John Doe",
    Email: "john.doe@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7890",
    AvatarUrl: "https://example.com/avatar1.png",
    DateOfBirth: "1990-01-01",
    IsDisabled: false,
    DisabledReason: "",
    Role: "3", // Leader
    LeaderId: "LDR001",
    ApartmentAreaName: "Vinhome",
  },
  {
    AccountId: "2",
    Fullname: "Jane Smith",
    Email: "jane.smith@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7891",
    AvatarUrl: "https://example.com/avatar2.png",
    DateOfBirth: "1992-02-02",
    IsDisabled: false,
    DisabledReason: "",
    Role: "4", // Worker
    WorkerId: "WRK001",
  },
  {
    AccountId: "3",
    Fullname: "Robert Johnson",
    Email: "robert.johnson@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7892",
    AvatarUrl: "https://example.com/avatar3.png",
    DateOfBirth: "1988-03-03",
    IsDisabled: false,
    DisabledReason: "",
    Role: "5", // Customer
    CustomerId: "CST001",
    RoomId: "RM001",
  },
  {
    AccountId: "4",
    Fullname: "Emily Davis",
    Email: "emily.davis@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7893",
    AvatarUrl: "https://example.com/avatar4.png",
    DateOfBirth: "1995-04-04",
    IsDisabled: true,
    DisabledReason: "Account Suspended",
    Role: "3", // Leader
    LeaderId: "LDR002",
  },
  {
    AccountId: "5",
    Fullname: "Michael Brown",
    Email: "michael.brown@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7894",
    AvatarUrl: "https://example.com/avatar5.png",
    DateOfBirth: "1993-05-05",
    IsDisabled: false,
    DisabledReason: "",
    Role: "4", // Worker
    WorkerId: "WRK002",
    LeaderId: "LDR002",
  },
  {
    AccountId: "6",
    Fullname: "Sarah Wilson",
    Email: "sarah.wilson@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7895",
    AvatarUrl: "https://example.com/avatar6.png",
    DateOfBirth: "1985-06-06",
    IsDisabled: false,
    DisabledReason: "",
    Role: "5", // Customer
    CustomerId: "CST002",
    RoomId: "RM002",
  },
  {
    AccountId: "7",
    Fullname: "David Miller",
    Email: "david.miller@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7896",
    AvatarUrl: "https://example.com/avatar7.png",
    DateOfBirth: "1989-07-07",
    IsDisabled: false,
    DisabledReason: "",
    Role: "3", // Leader
    LeaderId: "LDR003",
  },
  {
    AccountId: "8",
    Fullname: "Olivia Moore",
    Email: "olivia.moore@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7897",
    AvatarUrl: "https://example.com/avatar8.png",
    DateOfBirth: "1991-08-08",
    IsDisabled: false,
    DisabledReason: "",
    Role: "4", // Worker
    WorkerId: "WRK003",
    LeaderId: "LDR003",
  },
  {
    AccountId: "9",
    Fullname: "James Taylor",
    Email: "james.taylor@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7898",
    AvatarUrl: "https://example.com/avatar9.png",
    DateOfBirth: "1987-09-09",
    IsDisabled: false,
    DisabledReason: "",
    Role: "5", // Customer
    CustomerId: "CST003",
    RoomId: "RM003",
  },
  {
    AccountId: "10",
    Fullname: "Sophia Anderson",
    Email: "sophia.anderson@example.com",
    Password: "password123",
    PhoneNumber: "123-456-7899",
    AvatarUrl: "https://example.com/avatar10.png",
    DateOfBirth: "1994-10-10",
    IsDisabled: true,
    DisabledReason: "Violation of Terms",
    Role: "4", // Worker
    WorkerId: "WRK004",
    LeaderId: "LDR003",
  },
];

export const leaders: Leader[] = users.filter(
  (user) => user.Role === "3",
) as Leader[];
export const workers = users.filter((user) => user.Role === "4");

export const apartmentAreas = [
  {
    AreaId: "A001",
    LeaderId: "L001",
    Name: "Sunrise Apartments",
    Description:
      "A modern apartment complex located near the city center with excellent amenities.",
    Address: "123 Sunset Blvd, New York, NY",
    ManagementCompany: "Urban Living Co.",
    AvatarUrl: "https://example.com/avatars/sunrise.jpg",
  },
  {
    AreaId: "A002",
    LeaderId: "L002",
    Name: "Greenwood Estates",
    Description:
      "A serene residential area surrounded by greenery, perfect for families.",
    Address: "456 Oakwood Drive, Los Angeles, CA",
    ManagementCompany: "Green Management Ltd.",
    AvatarUrl: "https://example.com/avatars/greenwood.jpg",
  },
  {
    AreaId: "A003",
    LeaderId: "L003",
    Name: "Oceanview Towers",
    Description:
      "Luxury apartments offering stunning views of the ocean, with premium facilities.",
    Address: "789 Seaside Ave, Miami, FL",
    ManagementCompany: "Seaside Properties LLC",
    AvatarUrl: "https://example.com/avatars/oceanview.jpg",
  },
  {
    AreaId: "A004",
    LeaderId: "L004",
    Name: "Downtown Heights",
    Description:
      "High-rise apartments located in the heart of the city, close to major attractions.",
    Address: "101 Main Street, Chicago, IL",
    ManagementCompany: "Skyline Realty Group",
    AvatarUrl: "https://example.com/avatars/downtown.jpg",
  },
];
