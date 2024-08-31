import { SvgProps } from "@/_utilities/interfaces";
import React from "react";

export const Logo: React.FC<SvgProps> = (props) => {
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
        d="M0 0 C10.96575295 9.35723629 19.31811332 22.29854942 20.4921875 37 C20.49857642 38.58445295 20.4178971 40.16904352 20.3125 41.75 C20.98941391 41.92613831 21.66632782 42.10227661 22.36375427 42.28375244 C28.82475923 44.00004381 35.12025363 45.97566135 41.41015625 48.234375 C42.34715866 48.56731064 43.28416107 48.90024628 44.2495575 49.24327087 C46.25461 49.9563334 48.25901593 50.67121625 50.26281738 51.38778687 C53.41924902 52.51581345 56.57799652 53.63713742 59.73730469 54.75708008 C69.3945699 58.18503646 79.0414808 61.63831465 88.66038513 65.17263794 C92.53872053 66.59717677 96.42065443 68.01176683 100.30270386 69.42614746 C103.02646974 70.42429638 105.74369007 71.43901956 108.46118164 72.45410156 C110.11443668 73.05748908 111.76798457 73.66007504 113.421875 74.26171875 C114.16757248 74.5461937 114.91326996 74.83066864 115.68156433 75.12376404 C119.63866876 76.58167933 119.63866876 76.58167933 123.69824219 75.98657227 C124.23094727 75.57850342 124.76365234 75.17043457 125.3125 74.75 C125.8796875 74.32203125 126.446875 73.8940625 127.03125 73.453125 C127.6190625 72.97359375 128.206875 72.4940625 128.8125 72 C142.37237769 61.6975231 156.7201255 59.33305939 173.3125 60.75 C189.00883578 63.63970199 201.40550314 71.90736494 210.453125 84.8125 C219.33351134 98.84201791 221.53241908 114.35124742 218.625 130.58984375 C214.84946115 143.81996115 206.89680216 153.19981175 197.3125 162.75 C197.85777344 164.37010986 197.85777344 164.37010986 198.4140625 166.02294922 C199.75888631 170.02128584 201.09977037 174.02093427 202.43945312 178.02099609 C203.02040528 179.75378013 203.60243274 181.48620403 204.18554688 183.21826172 C205.02234713 185.70446929 205.85530229 188.19193615 206.6875 190.6796875 C206.94998535 191.45682098 207.2124707 192.23395447 207.48291016 193.03463745 C209.3125 198.52225659 209.3125 198.52225659 209.3125 200.75 C209.993125 200.70359375 210.67375 200.6571875 211.375 200.609375 C227.71045271 200.00114006 243.58546107 205.09474452 255.6875 216.1875 C257.59570815 218.01234719 259.45462902 219.87274735 261.3125 221.75 C261.91964844 222.33523438 262.52679688 222.92046875 263.15234375 223.5234375 C274.4479668 235.32841226 277.82735448 251.69568548 277.73242188 267.40966797 C277.2511687 285.60165498 270.33195813 300.05227477 257.3125 312.75 C244.67375996 324.56585045 228.55442144 330.51919684 211.23828125 329.96875 C193.45428624 328.63910551 177.7339505 322.10592292 165.328125 309.09765625 C157.3125 299.76162791 157.3125 299.76162791 157.3125 295.75 C156.29043457 295.88780884 155.26836914 296.02561768 154.21533203 296.16760254 C144.56476429 297.46812297 134.91346478 298.76308561 125.26142883 300.05266571 C120.29972169 300.71576503 115.33828925 301.38079281 110.37744141 302.05029297 C105.58644388 302.69679737 100.79478203 303.33815083 96.00262451 303.97599792 C94.17803563 304.21976395 92.35369003 304.46535846 90.52960205 304.71284485 C87.96697717 305.06020987 85.40355002 305.40095567 82.83984375 305.74023438 C82.09249466 305.8430925 81.34514557 305.94595062 80.57514954 306.05192566 C75.78117366 306.67742216 71.14767541 306.83801442 66.3125 306.75 C66.16554688 307.33265625 66.01859375 307.9153125 65.8671875 308.515625 C62.5168303 320.76175822 56.75899096 330.33006594 48.3125 339.75 C47.77109375 340.38550781 47.2296875 341.02101563 46.671875 341.67578125 C34.40162234 355.15446788 14.8498056 363.09756251 -3.05078125 364.03515625 C-23.09048905 364.6402667 -40.97824418 359.56544554 -56.6875 346.75 C-57.47898438 346.12222656 -58.27046875 345.49445313 -59.0859375 344.84765625 C-73.39138428 332.91017591 -82.45972136 315.17702125 -84.6875 296.75 C-85.03650105 291.63586723 -85.04285621 286.52919807 -84.92578125 281.40625 C-84.90854004 280.62950928 -84.89129883 279.85276855 -84.87353516 279.05249023 C-84.6875 276.75 -84.6875 276.75 -84.09130859 274.52758789 C-83.46394382 271.99773806 -83.23432812 270.32959378 -83.6875 267.75 C-86.50729903 263.70553382 -90.05425627 260.48627545 -93.6875 257.1875 C-95.58542063 255.39674087 -97.48129241 253.60380753 -99.375 251.80859375 C-100.29941895 250.94145752 -101.22383789 250.07432129 -102.17626953 249.1809082 C-104.86096187 246.58208635 -107.27719824 243.85998532 -109.69433594 241.01635742 C-113.96036805 236.16560092 -118.51417877 231.58098093 -123.04931641 226.9831543 C-124.23460093 225.77604163 -125.41356511 224.56269339 -126.58642578 223.34350586 C-128.29602324 221.56731609 -130.0242294 219.81134144 -131.7578125 218.05859375 C-132.27876495 217.50981064 -132.79971741 216.96102753 -133.3364563 216.39561462 C-134.98238134 214.69110239 -134.98238134 214.69110239 -137.6875 212.75 C-141.25174629 212.89611751 -144.07082587 214.25097217 -147.3125 215.6875 C-161.86914729 221.59174485 -179.0401747 221.67011052 -193.69824219 215.96777344 C-203.0216126 212.00588945 -210.64343631 207.12139007 -217.6875 199.75 C-218.31914062 199.13769531 -218.95078125 198.52539062 -219.6015625 197.89453125 C-230.44707887 186.69068284 -235.28954994 170.8582165 -235.1875 155.5625 C-235.18250488 154.56581299 -235.17750977 153.56912598 -235.17236328 152.54223633 C-234.74846176 134.37440169 -227.28149145 120.6129023 -214.6875 107.75 C-214.16929687 107.19570312 -213.65109375 106.64140625 -213.1171875 106.0703125 C-201.71966799 95.03083026 -184.26756285 90.21235057 -168.85083008 90.32763672 C-155.09869135 90.83166767 -142.59910048 95.31603358 -131.6875 103.75 C-128.43542908 102.33261511 -126.37388933 100.62473588 -123.9375 98.0625 C-121.37974022 95.38115098 -118.73180842 92.899885 -115.92578125 90.484375 C-111.61738112 86.74792625 -107.61690031 82.75683775 -103.625 78.6875 C-98.82182978 73.7916939 -93.95791345 69.14315348 -88.6875 64.75 C-88.9040625 63.9971875 -89.120625 63.244375 -89.34375 62.46875 C-93.68059848 45.92447617 -92.72263605 30.07617244 -84.609375 14.7734375 C-78.82545595 5.67434534 -71.4321834 -1.4964959 -61.6875 -6.25 C-60.92566406 -6.63671875 -60.16382813 -7.0234375 -59.37890625 -7.421875 C-39.71150602 -16.82950492 -16.93062296 -13.24002395 0 0 Z M-55.6875 25.75 C-60.79918132 32.03229536 -63.03660669 38.61751435 -62.625 46.6875 C-61.56335166 54.63155827 -57.70595069 60.62804739 -51.453125 65.53515625 C-44.50091318 70.31864713 -37.7890749 71.83183952 -29.484375 70.359375 C-22.20106113 68.37301667 -16.73411157 63.86250597 -12.26953125 57.8359375 C-8.77765182 51.70939092 -7.82839014 44.71471195 -9.31640625 37.84765625 C-12.03223658 29.56380558 -15.80600824 24.07389163 -23.5 19.875 C-35.13147571 14.62431889 -46.51201965 16.69713186 -55.6875 25.75 Z M-18.6875 104.75 C-19.49445313 105.46542969 -20.30140625 106.18085938 -21.1328125 106.91796875 C-35.71495197 120.58593739 -44.98479254 139.29555375 -45.97265625 159.37109375 C-46.52601156 178.84056692 -41.55262361 197.10368315 -29.6875 212.75 C-28.58535156 212.59402344 -27.48320312 212.43804687 -26.34765625 212.27734375 C-2.67551774 209.14562115 18.54493382 211.71398671 38.5 226 C44.12364307 230.34924701 48.7913857 235.28127841 53.3125 240.75 C68.21541511 237.38369447 79.8312324 229.50953134 90.3125 218.75 C91.06273437 217.9971875 91.81296875 217.244375 92.5859375 216.46875 C106.9712805 201.25666315 112.91557738 181.20552406 112.55859375 160.60546875 C111.16811418 138.82128889 102.05762511 120.39075535 86.328125 105.3203125 C77.72234131 97.98533107 68.04941912 92.36679574 57.3125 88.75 C55.89517578 88.27240234 55.89517578 88.27240234 54.44921875 87.78515625 C29.35214729 80.72151876 0.60070299 87.17226029 -18.6875 104.75 Z M-84.40234375 101.44140625 C-86.36521818 103.41266061 -88.32464346 105.38726086 -90.28222656 107.36376953 C-94.03337115 111.13880067 -97.85610918 114.74345038 -101.8984375 118.20703125 C-104.0502359 120.06283992 -106.16856858 121.94019862 -108.25 123.875 C-108.93191406 124.49632812 -109.61382812 125.11765625 -110.31640625 125.7578125 C-111.94877654 127.68269776 -111.94877654 127.68269776 -111.5 130.1796875 C-110.97881801 131.82842669 -110.45676041 133.4768895 -109.93359375 135.125 C-104.98853828 151.17851342 -106.49084113 168.56657577 -113.72265625 183.58203125 C-114.90855512 186.2467028 -115.7788315 188.98008379 -116.6875 191.75 C-115.81536865 192.61689453 -114.9432373 193.48378906 -114.04467773 194.37695312 C-110.77872598 197.62466792 -107.51619701 200.87580327 -104.25463867 204.12792969 C-102.84832925 205.52924133 -101.44111978 206.92965036 -100.03295898 208.32910156 C-97.99740344 210.35239038 -95.96521469 212.37901128 -93.93359375 214.40625 C-93.31350937 215.0211731 -92.69342499 215.63609619 -92.05455017 216.26965332 C-88.28620511 220.03752408 -84.71579098 223.92480187 -81.24438477 227.96826172 C-79.01953432 230.51443681 -76.65745881 232.87552008 -74.25 235.25 C-73.38503906 236.1059375 -72.52007812 236.961875 -71.62890625 237.84375 C-70.66791016 238.78734375 -70.66791016 238.78734375 -69.6875 239.75 C-64.76814098 235.63380164 -60.16102044 231.34589638 -55.6875 226.75 C-56.23277344 225.78513672 -56.23277344 225.78513672 -56.7890625 224.80078125 C-71.99999417 197.46010664 -79.64443003 166.66983487 -70.9453125 135.6796875 C-67.0852304 123.26747423 -61.90907943 110.87300595 -53.94921875 100.48046875 C-52.49111755 98.83759168 -52.49111755 98.83759168 -52.6875 96.75 C-53.50734375 96.42386719 -54.3271875 96.09773438 -55.171875 95.76171875 C-56.24953125 95.32472656 -57.3271875 94.88773437 -58.4375 94.4375 C-59.50484375 94.00824219 -60.5721875 93.57898438 -61.671875 93.13671875 C-64.35986635 91.90066055 -66.3609785 90.53681043 -68.6875 88.75 C-74.15798171 88.75 -80.57827413 97.61929518 -84.40234375 101.44140625 Z M143.6796875 98.609375 C137.56650228 106.46496567 136.52753149 112.83977252 137.3125 122.75 C137.96648853 125.57032553 138.81661237 127.1708834 140.3125 129.75 C140.6528125 130.34296875 140.993125 130.9359375 141.34375 131.546875 C144.9456129 137.24171228 149.52805004 140.57609381 155.95703125 142.5703125 C163.9770966 144.34257869 170.3554247 143.64898057 177.5 139.5625 C183.99127875 135.14015471 188.61378673 129.51354082 190.3125 121.75 C191.4550078 113.16003397 189.08217009 106.20125551 184.5625 98.9375 C178.82002054 93.35453386 172.00711005 89.76856092 163.9375 89.4375 C156.27614224 89.63064347 148.78728236 92.79307081 143.6796875 98.609375 Z M-196.0625 130.625 C-203.40281842 138.5128825 -206.19654739 146.85929899 -206.0078125 157.6171875 C-204.89212246 168.52918037 -199.37635485 176.95630919 -191.15234375 183.9140625 C-182.46806085 190.3825458 -173.12536483 190.75977307 -162.6875 189.75 C-154.42711165 188.06897757 -148.10612085 183.06395235 -142.6875 176.75 C-137.20537088 167.88740993 -134.70437622 160.14687064 -135.6875 149.75 C-138.42917275 139.01059795 -143.77235271 131.30361141 -152.6875 124.75 C-167.32423101 116.74338696 -183.97324851 119.07304858 -196.0625 130.625 Z M141.3125 168.75 C141.07466797 170.6371875 141.07466797 170.6371875 140.83203125 172.5625 C136.85705605 202.42615129 124.82992603 230.24106741 100.46191406 249.18896484 C89.87918486 256.93888811 78.31534167 262.54876861 66.3125 267.75 C66.9725 270.72 67.6325 273.69 68.3125 276.75 C83.29858731 276.26643159 98.09582314 274.05686055 112.93341064 272.03112793 C115.70902899 271.65354743 118.48537102 271.28145444 121.26175213 270.90953064 C124.59536803 270.46268741 127.92854947 270.01266353 131.26171875 269.5625 C132.49814621 269.39580811 133.73457367 269.22911621 135.00846863 269.05737305 C136.73230522 268.82207886 136.73230522 268.82207886 138.4909668 268.58203125 C139.49749802 268.44514893 140.50402924 268.3082666 141.5410614 268.16723633 C144.15291738 267.77402495 146.72785733 267.29205585 149.3125 266.75 C149.44205078 265.15285156 149.44205078 265.15285156 149.57421875 263.5234375 C151.39331336 243.77653624 158.06772303 227.93210886 173.3125 214.75 C175.92221155 212.87809058 178.499356 211.31285778 181.3125 209.75 C179.17129693 201.36282353 176.49846986 193.22462092 173.625 185.0625 C173.00141602 183.27682617 173.00141602 183.27682617 172.36523438 181.45507812 C171.35097718 178.55220407 170.33334668 175.65056187 169.3125 172.75 C168.04535156 172.62882813 166.77820313 172.50765625 165.47265625 172.3828125 C163.77340914 172.2138266 162.07419195 172.04453963 160.375 171.875 C159.54419922 171.79636719 158.71339844 171.71773437 157.85742188 171.63671875 C152.21308288 171.06569613 146.82966817 170.07501112 141.3125 168.75 Z M185.91796875 242.65234375 C179.76830441 250.68730664 177.5423672 259.83810562 178.3125 269.75 C180.04114537 279.34544676 184.82926274 287.37591019 192.4453125 293.46875 C201.46222123 299.65608486 210.60446012 300.79740736 221.3125 299.75 C224.66565312 298.86104594 227.37551988 297.57295318 230.3125 295.75 C231.34375 295.1725 232.375 294.595 233.4375 294 C241.12154712 287.98639791 246.39753866 280.41513509 248.3125 270.75 C249.16972482 259.35880099 247.11980553 251.24966792 240.33203125 242.046875 C233.62352768 234.41708757 224.03167711 230.42657 214.0234375 229.6875 C202.83457233 229.94545655 193.5569743 234.69868809 185.91796875 242.65234375 Z M-42.6875 254.75 C-43.17992187 255.27335937 -43.67234375 255.79671875 -44.1796875 256.3359375 C-52.95177691 265.98087163 -56.19060948 277.88040082 -55.6875 290.875 C-54.74952196 300.04863141 -51.30572602 308.42928125 -45.6875 315.75 C-45.26984375 316.31074219 -44.8521875 316.87148438 -44.421875 317.44921875 C-40.5426985 322.36213184 -36.08551089 325.63054647 -30.6875 328.75 C-30.01074219 329.14316406 -29.33398438 329.53632813 -28.63671875 329.94140625 C-18.22550758 335.25484924 -5.82438493 335.86768496 5.3125 332.75 C17.18958287 328.73359516 27.65175972 320.90346048 33.91796875 309.94140625 C35.19347314 307.24451866 36.29942975 304.55509787 37.3125 301.75 C37.55742187 301.09644531 37.80234375 300.44289063 38.0546875 299.76953125 C41.79783694 287.74530463 39.35032758 274.81494474 33.83984375 263.80859375 C26.73257551 251.72791795 17.09313606 245.00637648 3.9921875 240.64453125 C-13.33258288 236.43288325 -30.71506055 241.48324277 -42.6875 254.75 Z "
        fill="#ff395c"
        transform="translate(234.6875,80.25)"
      />
    </svg>
  );
};
