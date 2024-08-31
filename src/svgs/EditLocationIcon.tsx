import React from "react";
import { SvgProps } from "@/_utilities/interfaces";

export const EditLocationIcon: React.FC<SvgProps> = (props) => {
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
        d="M0 0 C0.84143555 0.00215515 1.68287109 0.0043103 2.54980469 0.00653076 C14.71658508 0.05657006 26.44379008 0.41930379 38.3125 3.3125 C39.56063477 3.59456299 39.56063477 3.59456299 40.83398438 3.88232422 C87.38403491 14.53662384 127.34873265 43.40892366 153.3125 83.3125 C171.63297479 112.53936043 180.77233882 145.28192968 180.6875 179.6875 C180.68668427 180.93806686 180.68668427 180.93806686 180.68585205 182.21389771 C180.64392797 196.24789844 179.53641682 209.61511797 176.3125 223.3125 C176.09287598 224.2710791 175.87325195 225.2296582 175.64697266 226.21728516 C158.82482025 298.35134135 115.37633257 361.60017222 73.3125 421.3125 C72.24848951 422.82928091 71.1846785 424.34620178 70.12109375 425.86328125 C65.11512812 432.99106071 60.04935177 440.07282178 54.9375 447.125 C48.55683518 455.9294392 42.31782422 464.82920107 36.10058594 473.74951172 C34.28118291 476.35738897 32.45771269 478.96237319 30.6328125 481.56640625 C30.02937012 482.4277417 29.42592773 483.28907715 28.80419922 484.17651367 C27.6141358 485.87400468 26.42307664 487.57079809 25.23095703 489.2668457 C22.65403529 492.93857407 20.09424893 496.6167783 17.609375 500.3515625 C17.00283081 501.25563843 17.00283081 501.25563843 16.3840332 502.17797852 C15.34046 503.73963133 14.3083455 505.30892537 13.27734375 506.87890625 C10.40365734 510.43816397 7.95367519 512.0673177 3.41015625 512.74609375 C1.90775391 512.74802734 1.90775391 512.74802734 0.375 512.75 C-0.62402344 512.76933594 -1.62304688 512.78867187 -2.65234375 512.80859375 C-7.60573391 511.99896627 -10.32005243 510.03117487 -13.37182617 506.19555664 C-15.24879771 503.54312756 -17.03913675 500.84776053 -18.8125 498.125 C-20.14336212 496.12682499 -21.47540628 494.12943679 -22.80859375 492.1328125 C-23.46456543 491.14442383 -24.12053711 490.15603516 -24.79638672 489.13769531 C-27.4243826 485.21164725 -30.13670352 481.34960179 -32.875 477.5 C-33.60046021 476.4776123 -33.60046021 476.4776123 -34.34057617 475.43457031 C-35.30661699 474.07352974 -36.27316472 472.71284881 -37.24023438 471.35253906 C-38.71219909 469.27768462 -40.17743281 467.19823621 -41.640625 465.1171875 C-46.69033307 457.93727619 -51.77994646 450.79037734 -56.9375 443.6875 C-63.9717925 433.98751391 -70.79618056 424.145018 -77.6171875 414.29443359 C-79.69522908 411.30136757 -81.78346834 408.31568311 -83.875 405.33203125 C-91.23914158 394.81764947 -98.48321096 384.25739557 -105.35449219 373.41357422 C-106.75260937 371.20987523 -108.1610681 369.01300368 -109.5703125 366.81640625 C-142.32616212 315.5826221 -179.5121749 253.70249929 -179.890625 190.88671875 C-179.89763931 190.1056778 -179.90465363 189.32463684 -179.91188049 188.51992798 C-179.92929225 186.01322605 -179.93573267 183.50676018 -179.9375 181 C-179.93817474 180.14457611 -179.93884949 179.28915222 -179.93954468 178.4078064 C-179.92410614 166.1131004 -179.54585859 154.31875172 -176.6875 142.3125 C-176.45401855 141.21808594 -176.45401855 141.21808594 -176.21582031 140.1015625 C-166.26590036 93.549442 -136.28898659 53.07970883 -96.6875 27.3125 C-67.3304851 8.91043959 -34.5454713 -0.15917611 0 0 Z M-107.6875 76.3125 C-136.87868883 105.99950521 -149.24038444 145.41288662 -148.98786926 186.24612427 C-148.85182906 197.90735169 -147.49536528 208.97959864 -144.6875 220.3125 C-144.45675781 221.25641602 -144.22601563 222.20033203 -143.98828125 223.17285156 C-129.42006178 280.96397614 -95.36587162 333.90878766 -61.6875 382.3125 C-60.37351953 384.2082097 -59.05972602 386.104049 -57.74609375 388 C-47.71775338 402.4583296 -37.6394748 416.87811645 -27.3125 431.125 C-22.56953231 437.66989371 -17.88721004 444.25473193 -13.25 450.875 C-12.68297363 451.68364502 -12.11594727 452.49229004 -11.53173828 453.32543945 C-8.23469737 458.04502934 -5.04233011 462.80938858 -1.96459961 467.67553711 C-1.54315674 468.21573486 -1.12171387 468.75593262 -0.6875 469.3125 C-0.0275 469.3125 0.6325 469.3125 1.3125 469.3125 C2.61605405 467.80040224 2.61605405 467.80040224 3.89453125 465.7890625 C4.66422241 464.64219971 4.66422241 464.64219971 5.44946289 463.47216797 C6.27885376 462.21750732 6.27885376 462.21750732 7.125 460.9375 C8.30531376 459.18096099 9.48765688 457.42578415 10.671875 455.671875 C11.27708984 454.77533203 11.88230469 453.87878906 12.50585938 452.95507812 C15.22362196 448.97979945 18.04053872 445.08005718 20.875 441.1875 C27.10222574 432.61877777 33.22818568 423.98317127 39.3125 415.3125 C39.84955566 414.54744141 40.38661133 413.78238281 40.93994141 412.99414062 C44.44323706 408.00140764 47.93899925 403.0034613 51.43115234 398.00292969 C53.38398482 395.21027281 55.34226319 392.4214843 57.30078125 389.6328125 C65.36337226 378.1294856 73.23092742 366.52990413 80.79199219 354.69042969 C82.27286983 352.37447781 83.76461934 350.06583689 85.2578125 347.7578125 C103.73323628 319.04292296 120.48852805 288.99178275 133.3125 257.3125 C133.64330566 256.49910156 133.97411133 255.68570313 134.31494141 254.84765625 C139.48097312 241.97353527 143.16842278 228.81266095 146.3125 215.3125 C146.49329102 214.57837891 146.67408203 213.84425781 146.86035156 213.08789062 C151.8039158 192.54703723 151.72971386 166.71442639 146.3125 146.3125 C146.14621094 145.6412207 145.97992188 144.96994141 145.80859375 144.27832031 C136.16655287 105.62087865 111.20217497 72.83557796 77.48828125 51.88671875 C17.12030084 15.83031208 -58.28319055 27.576946 -107.6875 76.3125 Z "
        fill="#000000"
        transform="translate(255.6875,-0.3125)"
      />
      <path
        d="M0 0 C2.4326433 1.91056917 4.75364666 3.90013189 7.06640625 5.953125 C8.071875 6.74589844 8.071875 6.74589844 9.09765625 7.5546875 C24.92395041 20.30364668 35.37692769 40.98391777 38.06640625 60.953125 C40.19360372 85.61095037 36.61650695 109.57429039 21.00390625 129.453125 C19.70140416 130.96181468 18.38957864 132.4625308 17.06640625 133.953125 C16.53789062 134.6234375 16.009375 135.29375 15.46484375 135.984375 C2.71588457 151.81066916 -17.96438652 162.26364644 -37.93359375 164.953125 C-62.59141912 167.08032247 -86.55475914 163.5032257 -106.43359375 147.890625 C-107.94228343 146.58812291 -109.44299955 145.27629739 -110.93359375 143.953125 C-111.60390625 143.42460937 -112.27421875 142.89609375 -112.96484375 142.3515625 C-128.79113791 129.60260332 -139.24411519 108.92233223 -141.93359375 88.953125 C-144.06079122 64.29529963 -140.48369445 40.33195961 -124.87109375 20.453125 C-123.56859166 18.94443532 -122.25676614 17.4437192 -120.93359375 15.953125 C-120.40507812 15.2828125 -119.8765625 14.6125 -119.33203125 13.921875 C-91.27616577 -20.90609594 -35.55651168 -24.80907073 0 0 Z M-95.12109375 33.640625 C-106.96171125 46.08907708 -111.5712103 60.31245221 -111.40673828 77.13793945 C-110.8369353 94.20584871 -103.99332024 107.05366065 -91.93359375 118.953125 C-80.43420136 129.32275252 -66.44086741 134.9341906 -50.93359375 134.953125 C-33.28612183 133.84385534 -18.95236358 126.9144163 -6.77734375 114.140625 C5.52663226 99.54268736 8.45310947 83.48921642 7.06640625 64.953125 C6.20974088 60.36251603 4.87187468 56.25157467 3.06640625 51.953125 C2.73898437 51.09847656 2.4115625 50.24382812 2.07421875 49.36328125 C-4.00567147 35.31740349 -17.16251794 24.85201571 -30.93359375 18.953125 C-54.14637758 9.98793125 -77.38681908 17.28644953 -95.12109375 33.640625 Z "
        fill="#000000"
        transform="translate(307.93359375,105.046875)"
      />
    </svg>
  );
};