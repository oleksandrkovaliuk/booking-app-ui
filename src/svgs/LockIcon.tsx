import { SvgProps } from "@/utilities/interfaces";
import React from "react";

export const LockIcon = (props: SvgProps) => {
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
        d="M0 0 C0.78892639 0.00149048 1.57785278 0.00298096 2.39068604 0.0045166 C19.38288407 0.06216832 35.02006387 1.90252129 51.25 7.3125 C52.1786084 7.61945801 52.1786084 7.61945801 53.12597656 7.93261719 C94.26491864 21.75579762 128.62316901 53.60220847 148.1796875 92.0546875 C157.55045521 111.07074265 163.46059663 132.80839286 163.36352539 154.09350586 C163.36367142 154.94308868 163.36381744 155.79267151 163.3639679 156.66799927 C163.36327554 159.45447411 163.35551507 162.2408807 163.34765625 165.02734375 C163.34578966 166.96790022 163.34436689 168.90845717 163.34336853 170.84901428 C163.33956233 175.94037187 163.32974832 181.03170063 163.31866455 186.12304688 C163.30840956 191.32486583 163.30386217 196.52668946 163.29882812 201.72851562 C163.28812427 211.9231897 163.27107075 222.11784245 163.25 232.3125 C164.26030273 232.30089844 165.27060547 232.28929687 166.31152344 232.27734375 C167.66080543 232.26795744 169.01008944 232.25885815 170.359375 232.25 C172.3388916 232.23259766 172.3388916 232.23259766 174.35839844 232.21484375 C185.21860798 232.48737097 193.26822973 235.93775756 201.25 243.3125 C211.70447452 254.98310727 210.68507874 269.81432389 210.63818359 284.49023438 C210.6422536 286.63161994 210.64759788 288.77300341 210.65411377 290.91438293 C210.66774208 296.70566054 210.66250723 302.49677706 210.65297651 308.28805733 C210.64535666 314.36208643 210.65243198 320.43610217 210.65713501 326.51013184 C210.66258579 336.70843978 210.65541871 346.90668245 210.64111328 357.10498047 C210.62478813 368.87875204 210.63007711 380.65236774 210.6465925 392.42613554 C210.66022665 402.55299824 210.66211758 412.67981414 210.65427649 422.80668306 C210.6496106 428.84707473 210.64894529 434.88739324 210.65888596 440.92778015 C210.66758141 446.60780282 210.66148656 452.28762541 210.64420319 457.96762657 C210.64025212 460.04643612 210.64134861 462.12526264 210.64799118 464.20406532 C210.69245163 479.53708871 210.4867777 491.61884943 199.43359375 503.21875 C190.21391817 512.01003661 180.53103238 512.90267965 168.2199707 512.82043457 C166.70878405 512.82504974 165.19760189 512.83140678 163.68642902 512.83934355 C159.55522913 512.85597556 155.42440089 512.84781862 151.29320002 512.83539867 C146.82958672 512.82632528 142.36603604 512.84032924 137.9024353 512.85131836 C129.16670418 512.86908377 120.43111071 512.86527242 111.69537425 512.8536678 C104.59423746 512.84462596 97.49313919 512.84341272 90.39199829 512.84776306 C89.38045821 512.84837599 88.36891812 512.84898893 87.3267253 512.84962043 C85.27165595 512.85089936 83.2165866 512.85219622 81.16151726 512.8535108 C61.90133964 512.8649108 42.64123824 512.85181198 23.38107312 512.83030933 C6.86306006 512.81243888 -9.65484054 512.81554316 -26.17285156 512.83398438 C-45.36517214 512.85540131 -64.55742596 512.86381222 -83.74975681 512.85153532 C-85.79717063 512.85026115 -87.84458445 512.84900367 -89.89199829 512.84776306 C-90.89930565 512.84714596 -91.90661301 512.84652886 -92.94444484 512.84589306 C-100.03519432 512.84244263 -107.12590138 512.84826188 -114.21664429 512.85768127 C-122.86057074 512.86891177 -131.50435193 512.86583909 -140.14826179 512.8445583 C-144.55663149 512.83406205 -148.9647592 512.82990169 -153.37312698 512.84315491 C-157.41227673 512.85511426 -161.45096122 512.84845832 -165.49006903 512.8272447 C-166.94753806 512.82279358 -168.40504676 512.82501128 -169.86249006 512.83474785 C-179.95694517 512.89698736 -189.44873636 512.13225362 -197.125 504.875 C-197.76566406 504.27042969 -198.40632813 503.66585938 -199.06640625 503.04296875 C-201.14695328 500.90449466 -203.0209406 498.74599101 -204.75 496.3125 C-205.554375 495.19875 -205.554375 495.19875 -206.375 494.0625 C-209.68843376 487.43563249 -210.04436412 480.28076279 -210.01069641 472.99014282 C-210.01643473 471.64880297 -210.01643473 471.64880297 -210.02228898 470.28036535 C-210.03254297 467.30745453 -210.02864136 464.33473961 -210.0246582 461.36181641 C-210.02900888 459.22072675 -210.03419322 457.07963866 -210.04014587 454.93855286 C-210.05350872 449.13892779 -210.05411756 443.339368 -210.05158257 437.53973055 C-210.05051103 432.69143508 -210.05540092 427.84315271 -210.060188 422.99486005 C-210.07127378 411.55352949 -210.07172579 400.11223177 -210.06567383 388.67089844 C-210.05963395 376.88240628 -210.07194761 365.09403346 -210.0932439 353.30556166 C-210.11087792 343.17025259 -210.11685841 333.03498145 -210.11360615 322.89965761 C-210.11179605 316.85252217 -210.11440233 310.80547187 -210.12832069 304.75835037 C-210.14092368 299.07015751 -210.13893145 293.3821503 -210.12590981 287.69396019 C-210.12354988 285.61192321 -210.12625768 283.52987306 -210.13453293 281.44785118 C-210.22897159 255.83119112 -210.22897159 255.83119112 -202.75 246.3125 C-202.193125 245.4875 -201.63625 244.6625 -201.0625 243.8125 C-194.5903265 236.81555568 -187.07711744 233.68528305 -177.75 232.3125 C-175.1181252 232.23843223 -172.48435028 232.21612029 -169.8515625 232.2421875 C-169.16489502 232.24726318 -168.47822754 232.25233887 -167.77075195 232.25756836 C-166.09711915 232.27067775 -164.4235441 232.29084897 -162.75 232.3125 C-162.75666183 231.26252838 -162.76332367 230.21255676 -162.77018738 229.13076782 C-162.8314223 219.15886267 -162.87617379 209.18699645 -162.90543652 199.21494484 C-162.92098727 194.09015596 -162.94202806 188.96552078 -162.97631836 183.84082031 C-163.00929456 178.88057352 -163.02693226 173.92047306 -163.03463173 168.96012497 C-163.04010748 167.08262203 -163.05079641 165.20512566 -163.06719017 163.32768631 C-163.45083914 117.50276546 -145.33622725 78.29419841 -113.625 45.8125 C-83.05359463 15.32398141 -42.88539425 -0.2010906 0 0 Z M-69.21875 101.54296875 C-101.51936213 136.88422492 -92.75 188.18557659 -92.75 232.3125 C-31.37 232.3125 30.01 232.3125 93.25 232.3125 C97.71444066 161.45538222 97.71444066 161.45538222 69.25 101.3125 C68.41726563 100.38695313 67.58453125 99.46140625 66.7265625 98.5078125 C50.06369501 80.86765073 27.4479638 71.34385682 3.32446289 70.33618164 C-25.51215124 69.67794504 -49.29728128 81.0898878 -69.21875 101.54296875 Z "
        fill="#000000"
        transform="translate(255.75,-0.3125)"
      />
    </svg>
  );
};
