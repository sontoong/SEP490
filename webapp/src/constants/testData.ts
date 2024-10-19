import { ApartmentArea } from "../app/models/apartmentArea";
import { Contract } from "../app/models/contract";
import { Product } from "../app/models/product";
import { ServicePackage } from "../app/models/service";
import { Customer, Leader, Worker } from "../app/models/user";

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

export const customers: Customer[] = users.filter(
  (user) => user.Role === "5",
) as Customer[];
export const leaders: Leader[] = users.filter(
  (user) => user.Role === "3",
) as Leader[];
export const workers = users.filter((user) => user.Role === "4") as Worker[];

export const apartmentAreas: ApartmentArea[] = [
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

export const servicePackages: ServicePackage[] = [
  {
    ServicePackageId: "sp1",
    Name: "Basic Package",
    Description: "A basic service package offering essential features.",
    ImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-zGx3CM__4cH8JcOorVchRpA9Yhhd53ihYA&s",
    NumOfRequest: 100,
    Policy:
      "<ol><li><p><strong><em><s><u>Quis aute deserunt duis incididunt aliqua velit anim quis commodo amet. Amet amet quis laborum dolor laboris sint culpa aliqua irure aute pariatur consectetur. Anim adipisicing velit deserunt ut esse ex tempor magna dolor tempor culpa dolore ad. Qui aliqua aute ad dolor ipsum esse sunt ea deserunt mollit. Est irure velit proident laborum non aliquip veniam nisi ipsum ad et excepteur. Enim consequat pariatur sint aliqua minim nulla nisi officia. Labore consectetur consequat ad veniam non minim culpa duis ullamc</u></s></em></strong></p></li><li><p>o cillum veniam reprehenderit dolore.Minim ut Lorem labore veniam est nulla eu commodo ex minim adipisicing aute. Cupidatat magna ut tempor quis in enim aliquip adipisicing irure fugiat tempor aute enim id. Ipsum anim in fugiat quis minim. Duis quis adipisicing elit consequat voluptate ad exercitation in voluptate anim exercitation minim elit et.</p></li></ol>",
    Status: true,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp1p1",
      Date: "2024-01-01",
      PriceByDate: 1000,
    },
  },
  {
    ServicePackageId: "sp2",
    Name: "Premium Package",
    Description: "A premium package with extended features.",
    ImageUrl: "https://example.com/images/premium-package.jpg",
    NumOfRequest: 500,
    Policy: "Premium policy terms.",
    Status: true,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp2p1",
      Date: "2024-02-01",
      PriceByDate: 1000,
    },
  },
  {
    ServicePackageId: "sp3",
    Name: "Enterprise Package",
    Description: "An enterprise package designed for large businesses.",
    ImageUrl: "https://example.com/images/enterprise-package.jpg",
    NumOfRequest: 1000,
    Policy: "Enterprise policy terms.",
    Status: true,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp3p1",
      Date: "2024-03-01",
      PriceByDate: 1000,
    },
  },
  {
    ServicePackageId: "sp4",
    Name: "Startup Package",
    Description: "Perfect for startups looking for a cost-effective solution.",
    ImageUrl: "https://example.com/images/startup-package.jpg",
    NumOfRequest: 250,
    Policy: "Startup policy terms.",
    Status: false,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp4p1",
      Date: "2024-04-01",
      PriceByDate: 1000,
    },
  },
  {
    ServicePackageId: "sp5",
    Name: "Small Business Package",
    Description: "A package tailored for small businesses.",
    ImageUrl: "https://example.com/images/small-business-package.jpg",
    NumOfRequest: 300,
    Policy: "Small business policy terms.",
    Status: true,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp5p1",
      Date: "2024-05-01",
      PriceByDate: 1000,
    },
  },
  {
    ServicePackageId: "sp6",
    Name: "Freelancer Package",
    Description: "Ideal for freelancers and individuals.",
    ImageUrl: "https://example.com/images/freelancer-package.jpg",
    NumOfRequest: 50,
    Policy: "Freelancer policy terms.",
    Status: false,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp6p1",
      Date: "2024-06-01",
      PriceByDate: 1000,
    },
  },
  {
    ServicePackageId: "sp7",
    Name: "Pro Package",
    Description: "A professional package for serious users.",
    ImageUrl: "https://example.com/images/pro-package.jpg",
    NumOfRequest: 700,
    Policy: "Pro package policy terms.",
    Status: true,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp7p1",
      Date: "2024-07-01",
      PriceByDate: 1000,
    },
  },
  {
    ServicePackageId: "sp8",
    Name: "Unlimited Package",
    Description: "Unlimited requests and priority support.",
    ImageUrl: "https://example.com/images/unlimited-package.jpg",
    NumOfRequest: 200,
    Policy: "Unlimited policy terms.",
    Status: true,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp8p1",
      Date: "2024-08-01",
      PriceByDate: 1000,
    },
  },
  {
    ServicePackageId: "sp9",
    Name: "Seasonal Package",
    Description: "Special package available for a limited time.",
    ImageUrl: "https://example.com/images/seasonal-package.jpg",
    NumOfRequest: 200,
    Policy: "Seasonal policy terms.",
    Status: false,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp9p1",
      Date: "2024-09-01",
      PriceByDate: 1000,
    },
  },
  {
    ServicePackageId: "sp10",
    Name: "VIP Package",
    Description: "Exclusive VIP package with all perks.",
    ImageUrl: "https://example.com/images/vip-package.jpg",
    NumOfRequest: 200,
    Policy: "VIP policy terms.",
    Status: true,
    ServicePackagePrices: {
      ServicePackagePriceId: "sp10p1",
      Date: "2024-10-01",
      PriceByDate: 1000,
    },
  },
];

export const products: Product[] = [
  {
    ProductId: "1",
    Name: "Laptop Pro",
    Description: "A high-performance laptop with a sleek design.",
    ImageUrl: "https://example.com/images/laptop-pro.jpg",
    In_Of_stock: 25,
    WarrantyMonths: 24,
    ProductPrices: {
      ProductPriceId: "p1",
      Date: "2024-10-01",
      PriceByDate: 1200.99,
    },
    Status: true,
  },
  {
    ProductId: "2",
    Name: "Smartphone Max",
    Description: "A smartphone with a stunning display and powerful processor.",
    ImageUrl: "https://example.com/images/smartphone-max.jpg",
    In_Of_stock: 50,
    WarrantyMonths: 12,
    ProductPrices: {
      ProductPriceId: "p2",
      Date: "2024-10-02",
      PriceByDate: 999.99,
    },
    Status: true,
  },
  {
    ProductId: "3",
    Name: "Wireless Headphones",
    Description: "Noise-cancelling wireless headphones with long battery life.",
    ImageUrl: "https://example.com/images/headphones.jpg",
    In_Of_stock: 100,
    WarrantyMonths: 18,
    ProductPrices: {
      ProductPriceId: "p3",
      Date: "2024-10-03",
      PriceByDate: 199.99,
    },
    Status: true,
  },
  {
    ProductId: "4",
    Name: "Gaming Keyboard",
    Description: "RGB backlit mechanical keyboard with custom keycaps.",
    ImageUrl: "https://example.com/images/keyboard.jpg",
    In_Of_stock: 75,
    WarrantyMonths: 36,
    ProductPrices: {
      ProductPriceId: "p4",
      Date: "2024-10-04",
      PriceByDate: 129.99,
    },
    Status: true,
  },
  {
    ProductId: "5",
    Name: "4K Monitor",
    Description: "Ultra-HD monitor with HDR and high refresh rate.",
    ImageUrl: "https://example.com/images/4k-monitor.jpg",
    In_Of_stock: 30,
    WarrantyMonths: 24,
    ProductPrices: {
      ProductPriceId: "p5",
      Date: "2024-10-05",
      PriceByDate: 499.99,
    },
    Status: true,
  },
  {
    ProductId: "6",
    Name: "Smartwatch",
    Description: "Fitness tracking smartwatch with heart rate monitor.",
    ImageUrl: "https://example.com/images/smartwatch.jpg",
    In_Of_stock: 80,
    WarrantyMonths: 12,
    ProductPrices: {
      ProductPriceId: "p6",
      Date: "2024-10-06",
      PriceByDate: 249.99,
    },
    Status: true,
  },
  {
    ProductId: "7",
    Name: "Bluetooth Speaker",
    Description: "Portable Bluetooth speaker with powerful sound.",
    ImageUrl: "https://example.com/images/speaker.jpg",
    In_Of_stock: 150,
    WarrantyMonths: 12,
    ProductPrices: {
      ProductPriceId: "p7",
      Date: "2024-10-07",
      PriceByDate: 79.99,
    },
    Status: true,
  },
  {
    ProductId: "8",
    Name: "Tablet Pro",
    Description: "10-inch tablet with a sharp display and fast processor.",
    ImageUrl: "https://example.com/images/tablet-pro.jpg",
    In_Of_stock: 40,
    WarrantyMonths: 12,
    ProductPrices: {
      ProductPriceId: "p8",
      Date: "2024-10-08",
      PriceByDate: 699.99,
    },
    Status: true,
  },
  {
    ProductId: "9",
    Name: "Gaming Mouse",
    Description: "Precision gaming mouse with customizable buttons.",
    ImageUrl: "https://example.com/images/mouse.jpg",
    In_Of_stock: 120,
    WarrantyMonths: 24,
    ProductPrices: {
      ProductPriceId: "p9",
      Date: "2024-10-09",
      PriceByDate: 59.99,
    },
    Status: true,
  },
  {
    ProductId: "10",
    Name: "USB-C Hub",
    Description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.",
    ImageUrl: "https://example.com/images/usb-hub.jpg",
    In_Of_stock: 200,
    WarrantyMonths: 12,
    ProductPrices: {
      ProductPriceId: "p10",
      Date: "2024-10-10",
      PriceByDate: 49.99,
    },
    Status: true,
  },
];

export const contracts: Contract[] = [
  {
    ContractId: "49125066-5383-4c5e-8d52-ffb5ac336c4b",
    CustomerId: "1aff316c-decf-4ca4-8f23-5a20c09cd6ee",
    ServicePackageId: "c0e7f349-4c60-4942-a919-1885b89eb2dc",
    FileUrl: "http://gomez.info/",
    PurchaseTime: "2024-03-03T21:31:18",
    RemainingNumOfRequests: 0,
  },
  {
    ContractId: "fbd64ffc-b225-419f-8c4f-82f0df15030f",
    CustomerId: "7c334083-dc57-43d7-8f56-60a610869cac",
    ServicePackageId: "fb4ea98b-4f36-49ec-93d5-f25e05614dbd",
    FileUrl: "https://baldwin.com/",
    PurchaseTime: "2024-05-15T17:39:50",
    RemainingNumOfRequests: 13,
  },
  {
    ContractId: "9d6eaa5c-abeb-4bd2-9b2c-6a951f1b1661",
    CustomerId: "357df805-2472-4b13-970b-a67801b573c6",
    ServicePackageId: "b3bf5184-2d92-4184-96e0-94004e2f5e11",
    FileUrl: "http://brown.net/",
    PurchaseTime: "2024-04-14T20:56:34",
    RemainingNumOfRequests: 90,
  },
  {
    ContractId: "62a73a37-1f4a-4a21-8877-58367bbd8b39",
    CustomerId: "51f2adcf-eb8c-4e38-921d-5bbd04e29b4c",
    ServicePackageId: "91e4c93d-8c4f-42fe-9a2e-b351a3353ab2",
    FileUrl: "http://www.miller.com/",
    PurchaseTime: "2024-01-20T14:55:28",
    RemainingNumOfRequests: 38,
  },
  {
    ContractId: "51fae428-ff2d-4c5a-901d-eb30c0fd3274",
    CustomerId: "9b6e1986-ff79-4599-9ba0-175f05fe8eda",
    ServicePackageId: "094340ff-f7d1-4378-ac82-fd01d4b039bb",
    FileUrl: "https://russell-duran.com/",
    PurchaseTime: "2024-04-07T22:20:26",
    RemainingNumOfRequests: 36,
  },
  {
    ContractId: "7e5b7a67-75f9-4bcf-bc61-e8489c624870",
    CustomerId: "7c3ab6c6-c0b5-48a0-b972-133febcb4585",
    ServicePackageId: "74de5738-f1a4-4ef7-b42e-4c4201495b48",
    FileUrl: "http://www.cook.com/",
    PurchaseTime: "2024-05-07T09:42:36",
    RemainingNumOfRequests: 48,
  },
  {
    ContractId: "b477d918-59a5-4785-bf10-98cc194bf015",
    CustomerId: "0c1777a2-97ac-4075-b3eb-b299bf744de8",
    ServicePackageId: "a25cfc2c-5332-48f5-8c71-1d5cb1a6f010",
    FileUrl: "https://www.berry.com/",
    PurchaseTime: "2024-09-23T02:32:11",
    RemainingNumOfRequests: 71,
  },
  {
    ContractId: "6dde4507-296d-43de-92e9-5b6f1bcb0f9d",
    CustomerId: "117b392f-a3e1-426c-a596-55e259055508",
    ServicePackageId: "a6a47745-f0a6-4a87-8c10-1ca807228f48",
    FileUrl: "https://www.rodriguez-lawrence.biz/",
    PurchaseTime: "2024-10-15T15:44:25",
    RemainingNumOfRequests: 86,
  },
  {
    ContractId: "05d00615-5de9-4490-a6fb-50410a3049ce",
    CustomerId: "80af820a-b1c5-462c-9448-dc32b3a20600",
    ServicePackageId: "aa0a95ef-6030-45dc-990e-05aafec176da",
    FileUrl: "http://www.lewis-king.com/",
    PurchaseTime: "2024-07-03T06:02:49",
    RemainingNumOfRequests: 17,
  },
  {
    ContractId: "3abbc62a-7a26-446d-a9b3-fb7c60720541",
    CustomerId: "a639d850-761b-45f9-bb72-5c94397401f2",
    ServicePackageId: "595692be-9521-468c-88ba-bd2e2213508c",
    FileUrl: "http://shaw-bowman.com/",
    PurchaseTime: "2024-04-01T11:56:21",
    RemainingNumOfRequests: 46,
  },
];
