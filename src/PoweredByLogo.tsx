import { FC } from "react";

import bynderLogo from "./images/bynder_logo.png";

export const PoweredByLogo: FC = () => (
  <div style={{ float: "right", padding: 10 }}>
    <span style={{ paddingRight: 5 }}>powered by</span>
    <img
      height={40}
      src={bynderLogo}
      alt="Bynder logo"
      title="Bynder logo"
    />
  </div>
);

PoweredByLogo.displayName = "PoweredByLogo";
