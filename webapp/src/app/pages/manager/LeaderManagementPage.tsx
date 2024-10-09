import { useTitle } from "../../hooks/useTitle";

export default function LeaderManagementPage() {
  useTitle({
    tabTitle: "Leaders - EWMH",
    title: `Danh sách Leader`,
    path: "/leader-manage",
  });
  return <div>LeaderManagementPage</div>;
}
