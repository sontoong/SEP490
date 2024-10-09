export function roleNameGenerator(isDisabled: string) {
  switch (isDisabled) {
    case "1":
      return "Quản trị viên";
    case "2":
      return "Quản lý";
    case "3":
      return "Lãnh đạo";
    case "4":
      return "Nhân viên";
    case "5":
      return "Khách hàng";
    default:
      return "Unknown";
  }
}
