import React from "react";
import { ISvgProps } from "@/_utilities/interfaces";

export const Arrow: React.FC<ISvgProps> = (props) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        d="M0 0 C4.67980997 3.7884176 7.70970545 8.55427348 8.53515625 14.51953125 C9.08319533 21.37561198 7.88697637 26.74830917 3.46975994 32.14905167 C2.57068322 33.10583691 1.6716065 34.06262215 0.74528503 35.04840088 C0.25686038 35.57023838 -0.23156427 36.09207589 -0.73478967 36.62972665 C-5.686108 41.89184996 -10.77055926 47.02140244 -15.8894043 52.12011719 C-16.89615547 53.12658519 -17.90268434 54.13327562 -18.90901184 55.14016724 C-21.60025699 57.8316953 -24.29453888 60.52016361 -26.98944449 63.20802593 C-29.82061544 66.03287781 -32.64888969 68.86062711 -35.47749329 71.68804932 C-40.81584327 77.02331091 -46.15673346 82.35602185 -51.49857789 87.68778443 C-57.58778183 93.76574915 -63.67409239 99.8466078 -69.76018083 105.92769194 C-82.26272141 118.41982465 -94.76882841 130.90838128 -107.27734375 143.39453125 C-105.76084811 146.96419371 -103.67326676 149.23870771 -100.93241882 151.95977783 C-100.0197525 152.870858 -99.10708618 153.78193817 -98.16676331 154.72062683 C-97.15251555 155.72301211 -96.13818475 156.72531337 -95.1237793 157.72753906 C-94.05726789 158.78857374 -92.99121892 159.85007341 -91.92559814 160.91200256 C-89.63063753 163.1972545 -87.3326563 165.47940977 -85.03235435 167.75928497 C-81.39138127 171.36841711 -77.75860224 174.98572132 -74.12715149 178.60443115 C-65.1033443 187.59416321 -56.07032917 196.57462794 -47.03234863 205.55010986 C-40.01290591 212.52103256 -32.99671674 219.49515397 -25.99103767 226.47991252 C-22.38598743 230.07347396 -18.77411836 233.65999033 -15.15690076 237.24130201 C-12.90115577 239.47777025 -10.65176886 241.72055139 -8.40405273 243.96508598 C-7.36547963 244.9996609 -6.32434025 246.03166745 -5.28037453 247.06080055 C9.35363456 261.49444747 9.35363456 261.49444747 9.84765625 272.65625 C9.56039949 278.94896845 7.79943687 283.60516938 3.53515625 288.26953125 C-1.12234745 292.48672472 -6.00995273 294.46290742 -12.27734375 294.76953125 C-27.00426132 293.9959383 -36.88971765 279.93442384 -46.64013672 270.19287109 C-47.84674192 268.9909062 -49.05353972 267.78913464 -50.26051331 266.58753967 C-53.50845006 263.35259892 -56.75315658 260.11443821 -59.99683523 256.8752284 C-62.02703008 254.84798081 -64.05780366 252.82131466 -66.08874893 250.79481888 C-72.45445397 244.44274538 -78.81818599 238.08870521 -85.1790179 231.7317518 C-92.50272947 224.41253209 -99.83295783 217.09992199 -107.16885459 209.7929157 C-112.85675406 204.12663672 -118.53887178 198.45460214 -124.21663964 192.77817118 C-127.60115712 189.39470001 -130.98804411 186.01368613 -134.38097763 182.6386528 C-137.56743321 179.46868761 -140.74663721 176.29162463 -143.92046928 173.10902214 C-145.08366343 171.94505857 -146.24941109 170.78364017 -147.4179287 169.62502098 C-149.01703691 168.03866495 -150.60653426 166.44324049 -152.19406128 164.8453064 C-153.08443022 163.95640402 -153.97479916 163.06750164 -154.89214897 162.15166283 C-160.06497527 156.17220871 -162.68878978 150.49964055 -162.46875 142.51953125 C-161.84275 135.56965375 -159.03527094 131.88626909 -154.39546204 126.89282227 C-153.6658473 126.10724741 -153.6658473 126.10724741 -152.92149287 125.30580235 C-147.47120564 119.4722869 -141.84596867 113.81493618 -136.19995117 108.171875 C-135.03546925 107.00439125 -133.87118908 105.83670625 -132.70709229 104.6688385 C-129.58380175 101.53681807 -126.45737473 98.40794784 -123.33003783 95.27996826 C-121.37202159 93.3212364 -119.41472107 91.3617922 -117.4576664 89.40209961 C-110.61922801 82.55445166 -103.77825465 75.70934835 -96.93481445 68.86669922 C-90.56979054 62.50227827 -84.21039206 56.13227397 -77.85354537 49.75968647 C-72.37574204 44.26880569 -66.89408831 38.7817891 -61.4094227 33.29776287 C-58.14189098 30.03048563 -54.87591772 26.7616876 -51.61382103 23.48898315 C-48.55247658 20.41795171 -45.48636 17.35176611 -42.41653442 14.28921318 C-41.29334344 13.16706654 -40.17184855 12.04321918 -39.05220985 10.91752815 C-37.52025676 9.37783258 -35.98221814 7.84447591 -34.44255066 6.3125 C-33.5848215 5.45422607 -32.72709234 4.59595215 -31.84337139 3.71166992 C-22.25734386 -4.94457163 -11.07768164 -7.6420587 0 0 Z "
        fill="#000000"
        transform="translate(332.27734375,111.60546875)"
      />
    </svg>
  );
};