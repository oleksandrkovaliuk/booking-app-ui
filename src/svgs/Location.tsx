import { SvgProps } from "@/_utilities/interfaces";
import React from "react";

export const Location: React.FC<SvgProps> = (props) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="512.000000pt"
      height="512.000000pt"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M2425 5114 c-424 -42 -779 -207 -1070 -499 -406 -405 -579 -983 -465
  -1546 25 -122 69 -257 121 -368 22 -47 360 -665 752 -1374 745 -1350 731
  -1327 797 -1327 66 0 52 -23 798 1327 391 710 730 1328 751 1374 186 400 205
  883 52 1296 -90 241 -217 440 -396 618 -259 260 -560 415 -930 481 -80 14
  -335 26 -410 18z m220 -854 c215 -24 389 -111 537 -268 162 -172 236 -375 225
  -616 -7 -143 -23 -209 -82 -333 -106 -218 -293 -377 -530 -449 -80 -24 -106
  -27 -235 -27 -129 0 -155 3 -235 27 -171 52 -318 149 -426 284 -65 80 -138
  223 -164 317 -25 92 -31 285 -11 381 73 363 373 641 736 683 41 5 80 9 85 10
  6 0 51 -4 100 -9z"
        />
      </g>
    </svg>
  );
};
