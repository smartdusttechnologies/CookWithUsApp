import { SvgIcon, useTheme } from "@mui/material";
import * as React from "react";

function PencilIcon(props) {
  const theme = useTheme();
  return (
    <SvgIcon
      fontSize="small"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.008 512.008"
      {...props}
    >
      <path
        fill={theme.palette.primary.main}
        d="M495.518 16.052c-21.035-21.035-57.707-21.035-78.741 0L45.79 386.868c-1.003 1.024-1.835 2.24-2.347 3.584L.776 497.119a10.612 10.612 0 002.347 11.499 10.748 10.748 0 007.552 3.115c1.323 0 2.688-.256 3.947-.768l106.667-42.667a10.758 10.758 0 005.376-4.757c6.784-8.213 65.408-68.565 368.832-368.427 10.603-10.475 16.469-24.448 16.512-39.36.042-14.934-5.761-28.992-16.491-39.702zm-15.04 63.872C197.107 360.01 128.542 429.151 111.966 449.055l-82.155 32.853 32.619-81.515 369.429-369.28c12.992-12.971 35.435-13.12 48.725.149 6.549 6.528 10.112 15.211 10.091 24.427-.021 9.174-3.648 17.793-10.197 24.235z"
      />
      <path
        fill={theme.palette.primary.main}
        d="M135.539 440.202l-64-64c-4.16-4.16-10.923-4.16-15.083 0s-4.16 10.923 0 15.083l64 64a10.716 10.716 0 007.552 3.115c2.731 0 5.461-1.045 7.531-3.115 4.16-4.161 4.16-10.923 0-15.083zM434.206 141.535l-64-64c-4.16-4.16-10.923-4.16-15.083 0s-4.16 10.923 0 15.083l64 64c2.091 2.069 4.821 3.115 7.552 3.115s5.461-1.045 7.531-3.115c4.16-4.16 4.16-10.923 0-15.083z"
      />
    </SvgIcon>
  );
}

export default PencilIcon;
