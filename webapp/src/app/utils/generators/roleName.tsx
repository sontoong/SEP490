export function roleNameGenerator(roleId?: string) {
  switch (roleId) {
    case "1":
      return "Quản trị viên";
    case "2":
      return "Quản lý";
    case "3":
      return "Trưởng nhóm";
    case "4":
      return "Nhân viên";
    case "5":
      return "Khách hàng";
    default:
      return "Unknown";
  }
}
