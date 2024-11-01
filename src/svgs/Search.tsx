import { ISvgProps } from "@/_utilities/interfaces";
import React from "react";

export const Search: React.FC<ISvgProps> = (props) => {
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
          d="M1940 5109 c-298 -33 -624 -145 -870 -299 -250 -156 -472 -371 -634
          -614 -214 -320 -328 -675 -343 -1066 -40 -1063 729 -1979 1785 -2124 144 -20
          406 -21 555 -1 287 38 589 148 824 301 l82 53 497 -517 c858 -892 796 -836
          924 -837 65 0 82 4 129 30 63 35 105 82 126 144 28 82 17 168 -30 238 -11 17
          -286 307 -610 644 -324 337 -599 624 -612 639 l-22 26 69 92 c216 287 354 633
          400 1002 15 122 12 361 -5 497 -118 909 -828 1637 -1735 1779 -118 18 -416 26
          -530 13z m490 -554 c613 -118 1087 -579 1221 -1188 32 -145 37 -408 11 -562
          -112 -653 -619 -1156 -1270 -1261 -109 -17 -348 -19 -453 -4 -555 84 -1011
          452 -1214 980 -110 284 -125 651 -39 948 121 417 403 756 792 951 158 80 308
          124 527 155 65 9 344 -3 425 -19z"
        />
      </g>
    </svg>
  );
};
