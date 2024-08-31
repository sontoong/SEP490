import { Envs } from "../../utils/env";

export default function HomePage() {
  return (
    <div>
      <div>{Envs.environment}</div>
      <div>HomePage</div>
    </div>
  );
}
