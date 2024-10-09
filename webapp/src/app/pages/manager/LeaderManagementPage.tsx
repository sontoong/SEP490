import { useTitle } from "../../hooks/useTitle";

export default function LeaderManagementPage() {
  useTitle({
    tabTitle: "Leaders - EWMH",
    paths: [{ title: "Danh sách Leader", path: "/leaders" }],
  });
  return <div>LeaderManagementPage</div>;
}
