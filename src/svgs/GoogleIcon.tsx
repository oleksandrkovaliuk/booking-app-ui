import { SvgProps } from "@/utilities/interfaces";
import React from "react";

export const GoogleIcon: React.FC<SvgProps> = (props) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox=" 0 0 512 512"
      {...props}
    >
      <path
        d="M0 0 C0.96955627 0.00182281 1.93911255 0.00364563 2.93804932 0.00552368 C17.26740966 0.05086508 31.28739418 0.46052545 45.375 3.3125 C46.2928125 3.49474121 47.210625 3.67698242 48.15625 3.86474609 C54.60780257 5.17631342 60.99790118 6.67894516 67.375 8.3125 C68.11911133 8.50038086 68.86322266 8.68826172 69.62988281 8.88183594 C103.87019192 17.69726201 136.45378488 35.48228154 163.5 58.125 C164.03262451 58.56900146 164.56524902 59.01300293 165.11401367 59.47045898 C169.6573172 63.356477 173.96129518 67.13567244 174.578125 73.36328125 C174.59359375 74.10964844 174.6090625 74.85601562 174.625 75.625 C174.65078125 76.36363281 174.6765625 77.10226563 174.703125 77.86328125 C173.91607735 83.73802976 170.3952804 87.66967378 166.34033203 91.73535156 C165.84073975 92.24020081 165.34114746 92.74505005 164.82641602 93.26519775 C163.1859728 94.91875999 161.53490141 96.56120422 159.8828125 98.203125 C158.73278682 99.35517342 157.58320664 100.50766671 156.43405151 101.6605835 C154.02972717 104.06931996 151.62008789 106.47257396 149.20654297 108.87207031 C146.11731785 111.94418513 143.04178297 115.02959862 139.97009468 118.11923599 C137.60088274 120.49929928 135.2245585 122.87215774 132.846035 125.24291229 C131.70916552 126.37778452 130.57450934 127.51487851 129.44214249 128.65424347 C127.85807079 130.24595384 126.26466418 131.8276985 124.66845703 133.40722656 C123.76483429 134.30846252 122.86121155 135.20969849 121.9302063 136.13824463 C118.195718 139.31596506 114.81327456 140.59892634 109.9375 140.625 C109.21691406 140.64175781 108.49632812 140.65851563 107.75390625 140.67578125 C101.74812334 139.75864199 97.1737238 135.78420814 92.5 132.1875 C75.07044515 119.1532242 55.46780441 110.51969441 34.375 105.3125 C33.72112305 105.14733887 33.06724609 104.98217773 32.39355469 104.81201172 C-3.5029923 96.18148936 -42.71754116 103.77728603 -74.625 121.3125 C-76.18927734 122.14201172 -76.18927734 122.14201172 -77.78515625 122.98828125 C-112.42223748 142.10941041 -136.87963314 176.21946658 -148.32470703 213.59765625 C-149.62228311 218.12633031 -150.75249008 222.68216579 -151.625 227.3125 C-151.80015137 228.24199463 -151.97530273 229.17148926 -152.15576172 230.12915039 C-153.62413053 238.67935328 -154.02684646 247.08585665 -154 255.75 C-153.99868576 256.7950621 -153.99868576 256.7950621 -153.99734497 257.86123657 C-153.88965614 283.99086995 -147.34614739 308.47830658 -134.625 331.3125 C-134.27711426 331.94881348 -133.92922852 332.58512695 -133.57080078 333.24072266 C-128.58432957 342.28483498 -122.84147483 350.17288272 -115.9375 357.84423828 C-114.70783646 359.21983288 -113.50893135 360.62274952 -112.3125 362.02734375 C-106.96403231 368.22583577 -101.13233659 373.35776132 -94.625 378.3125 C-94.10309082 378.7146875 -93.58118164 379.116875 -93.04345703 379.53125 C-60.10960004 404.73623472 -18.38898219 414.72563359 22.6328125 409.6640625 C58.62228759 404.12454631 95.45190876 385.01184637 118.375 356.3125 C118.81070312 355.7673877 119.24640625 355.22227539 119.6953125 354.66064453 C125.41884721 347.43544714 130.77079657 340.09406163 135.3125 332.0625 C135.6532959 331.46244141 135.9940918 330.86238281 136.34521484 330.24414062 C138.50512942 326.28694809 140.28085263 322.22203007 142.00219727 318.05566406 C142.44789566 316.97899475 142.89359406 315.90232544 143.35279846 314.79302979 C143.69012497 313.97445496 144.02745148 313.15588013 144.375 312.3125 C143.75785094 312.31618717 143.14070189 312.31987434 142.50485134 312.32367325 C127.47272608 312.41209679 112.44068088 312.47824472 97.40836239 312.51974869 C90.13876429 312.54035436 82.86934002 312.56843649 75.59985352 312.61425781 C69.26210348 312.65418706 62.92447937 312.67994732 56.58660704 312.68885398 C53.23218508 312.69405854 49.87812332 312.70624863 46.52381706 312.73542023 C42.77469406 312.76446023 39.02631701 312.76845555 35.27709961 312.76660156 C33.61769096 312.78817322 33.61769096 312.78817322 31.92475891 312.81018066 C25.50378829 312.77582676 21.59140286 312.14805085 16.375 308.3125 C11.94010666 303.41077578 11.22198773 300.37101865 11.19799805 293.92871094 C11.19142685 293.16752457 11.18485565 292.4063382 11.17808533 291.62208557 C11.158337 289.09701442 11.14668544 286.57200282 11.13671875 284.046875 C11.13264322 283.18462563 11.1285677 282.32237625 11.12436867 281.43399811 C11.10349988 276.86892434 11.08920253 272.3038807 11.07983398 267.73876953 C11.06877686 263.02650852 11.03438754 258.31472068 10.99466228 253.6026268 C10.96849583 249.97716402 10.96014206 246.35181386 10.95655251 242.72626495 C10.95168542 240.98955342 10.94006792 239.25284697 10.92151451 237.51622772 C10.89712518 235.08172846 10.89808743 232.64845162 10.9050293 230.21386719 C10.88581421 229.14287529 10.88581421 229.14287529 10.86621094 228.05024719 C10.91842559 223.01155259 12.24398741 220.20748208 15.375 216.3125 C20.76462743 211.44868988 24.94415666 211.16476925 31.97151184 211.17205811 C33.30432828 211.16760142 33.30432828 211.16760142 34.66407031 211.1630547 C37.65341634 211.15435524 40.64272238 211.1528584 43.63208008 211.15136719 C45.77054429 211.14673991 47.90900768 211.14171538 50.04747009 211.13632202 C55.86569126 211.12318766 61.68390088 211.11675109 67.50213456 211.11231136 C71.13531732 211.10938243 74.76849692 211.10527797 78.40167809 211.10080719 C89.76383761 211.08712979 101.12598991 211.07746421 112.48815709 211.0736053 C125.6139001 211.06912321 138.73953905 211.05156927 151.86525041 211.0226047 C162.00460106 211.00100508 172.14392239 210.99090194 182.28329581 210.98956418 C188.34210595 210.98851496 194.4008183 210.98258219 200.45960426 210.96474457 C206.15836142 210.94829357 211.85694697 210.94609398 217.55571938 210.95488358 C219.64791828 210.95565553 221.7401263 210.95129045 223.83230209 210.94142532 C226.68758597 210.92875101 229.54225787 210.93455815 232.39753723 210.94500732 C233.22624055 210.93695092 234.05494387 210.92889452 234.90875942 210.92059398 C241.04402912 210.97313681 246.10370601 212.46621639 250.5625 216.9375 C253.37616341 220.59911676 254.26776393 224.29795532 255.02734375 228.765625 C255.15432648 229.5057785 255.2813092 230.24593201 255.41213989 231.0085144 C256.8850103 240.45047133 256.83351174 249.90439379 256.75 259.4375 C256.74302094 260.85781525 256.74302094 260.85781525 256.73590088 262.30682373 C256.65427998 276.48225033 256.2387768 290.3847158 253.375 304.3125 C253.07698486 305.78130615 253.07698486 305.78130615 252.77294922 307.27978516 C244.65881003 346.05139106 229.10397318 382.19747331 204.375 413.3125 C203.67117188 414.20839844 202.96734375 415.10429687 202.2421875 416.02734375 C196.30115951 423.44830524 189.90465314 430.4121467 183.375 437.3125 C182.73691406 437.993125 182.09882813 438.67375 181.44140625 439.375 C177.34169661 443.62218121 172.8391592 447.31199742 168.23828125 451.00390625 C166.4241531 452.46659348 164.62731811 453.9512174 162.85546875 455.46484375 C129.70919697 483.62135419 87.94443672 501.67340043 45.375 509.3125 C44.54371582 509.47476074 43.71243164 509.63702148 42.85595703 509.80419922 C15.13006942 515.10015528 -16.95751622 514.71299548 -44.625 509.3125 C-45.52202637 509.15152832 -46.41905273 508.99055664 -47.34326172 508.82470703 C-107.97595828 497.85327697 -167.34416169 462.65947509 -203.625 412.3125 C-204.1101709 411.65040527 -204.5953418 410.98831055 -205.09521484 410.30615234 C-238.04861259 365.26531886 -256.11337981 313.03891603 -256 257.0625 C-255.99945618 256.05048523 -255.99891235 255.03847046 -255.99835205 253.99578857 C-255.95761077 237.46362709 -255.04182284 221.538508 -251.625 205.3125 C-251.41069336 204.28125 -251.19638672 203.25 -250.97558594 202.1875 C-242.52446637 162.82275092 -224.69622654 126.69423587 -199.625 95.3125 C-198.82835937 94.30832031 -198.03171875 93.30414063 -197.2109375 92.26953125 C-185.86916381 78.41711726 -173.02916792 64.99510914 -158.625 54.3125 C-157.97740723 53.82620117 -157.32981445 53.33990234 -156.66259766 52.83886719 C-146.66772704 45.35562025 -136.50709127 38.434207 -125.625 32.3125 C-124.99899902 31.95236816 -124.37299805 31.59223633 -123.72802734 31.22119141 C-97.69343308 16.31518727 -68.27243866 6.6672795 -38.625 2.3125 C-37.42037109 2.13517334 -36.21574219 1.95784668 -34.97460938 1.77514648 C-23.3173269 0.17617506 -11.75313934 -0.04590972 0 0 Z "
        fill="#157DE6"
        transform="translate(255.625,-0.3125)"
      />
      <path
        d="M0 0 C0.96955627 0.00182281 1.93911255 0.00364563 2.93804932 0.00552368 C17.26740966 0.05086508 31.28739418 0.46052545 45.375 3.3125 C46.2928125 3.49474121 47.210625 3.67698242 48.15625 3.86474609 C54.60780257 5.17631342 60.99790118 6.67894516 67.375 8.3125 C68.11911133 8.50038086 68.86322266 8.68826172 69.62988281 8.88183594 C103.87019192 17.69726201 136.45378488 35.48228154 163.5 58.125 C164.03262451 58.56900146 164.56524902 59.01300293 165.11401367 59.47045898 C169.6573172 63.356477 173.96129518 67.13567244 174.578125 73.36328125 C174.59359375 74.10964844 174.6090625 74.85601562 174.625 75.625 C174.65078125 76.36363281 174.6765625 77.10226563 174.703125 77.86328125 C173.91607735 83.73802976 170.3952804 87.66967378 166.34033203 91.73535156 C165.84073975 92.24020081 165.34114746 92.74505005 164.82641602 93.26519775 C163.1859728 94.91875999 161.53490141 96.56120422 159.8828125 98.203125 C158.73278682 99.35517342 157.58320664 100.50766671 156.43405151 101.6605835 C154.02972717 104.06931996 151.62008789 106.47257396 149.20654297 108.87207031 C146.11731785 111.94418513 143.04178297 115.02959862 139.97009468 118.11923599 C137.60088274 120.49929928 135.2245585 122.87215774 132.846035 125.24291229 C131.70916552 126.37778452 130.57450934 127.51487851 129.44214249 128.65424347 C127.85807079 130.24595384 126.26466418 131.8276985 124.66845703 133.40722656 C123.76483429 134.30846252 122.86121155 135.20969849 121.9302063 136.13824463 C118.195718 139.31596506 114.81327456 140.59892634 109.9375 140.625 C109.21691406 140.64175781 108.49632812 140.65851563 107.75390625 140.67578125 C101.74812334 139.75864199 97.1737238 135.78420814 92.5 132.1875 C75.07044515 119.1532242 55.46780441 110.51969441 34.375 105.3125 C33.72112305 105.14733887 33.06724609 104.98217773 32.39355469 104.81201172 C-3.5029923 96.18148936 -42.71754116 103.77728603 -74.625 121.3125 C-76.18927734 122.14201172 -76.18927734 122.14201172 -77.78515625 122.98828125 C-112.42223748 142.10941041 -136.87963314 176.21946658 -148.32470703 213.59765625 C-149.62228311 218.12633031 -150.75249008 222.68216579 -151.625 227.3125 C-151.80015137 228.24199463 -151.97530273 229.17148926 -152.15576172 230.12915039 C-153.62413053 238.67935328 -154.02684646 247.08585665 -154 255.75 C-153.99868576 256.7950621 -153.99868576 256.7950621 -153.99734497 257.86123657 C-153.89443725 282.83077966 -147.99275098 306.20357032 -136.2265625 328.2578125 C-134.625 331.3125 -134.625 331.3125 -133.625 334.3125 C-134.7087793 334.92955811 -134.7087793 334.92955811 -135.81445312 335.55908203 C-148.44951754 342.75659898 -161.07676421 349.96427023 -173.625 357.3125 C-185.96788971 364.53964872 -198.38166023 371.64117861 -210.81689453 378.70800781 C-212.52142101 379.68193826 -214.22161807 380.66357161 -215.91357422 381.65917969 C-220.4260791 384.3125 -220.4260791 384.3125 -222.625 384.3125 C-245.0419261 345.38798075 -256.09066001 301.82198809 -256 257.0625 C-255.99945618 256.05048523 -255.99891235 255.03847046 -255.99835205 253.99578857 C-255.95761077 237.46362709 -255.04182284 221.538508 -251.625 205.3125 C-251.41069336 204.28125 -251.19638672 203.25 -250.97558594 202.1875 C-242.52446637 162.82275092 -224.69622654 126.69423587 -199.625 95.3125 C-198.82835937 94.30832031 -198.03171875 93.30414063 -197.2109375 92.26953125 C-185.86916381 78.41711726 -173.02916792 64.99510914 -158.625 54.3125 C-157.97740723 53.82620117 -157.32981445 53.33990234 -156.66259766 52.83886719 C-146.66772704 45.35562025 -136.50709127 38.434207 -125.625 32.3125 C-124.99899902 31.95236816 -124.37299805 31.59223633 -123.72802734 31.22119141 C-97.69343308 16.31518727 -68.27243866 6.6672795 -38.625 2.3125 C-37.42037109 2.13517334 -36.21574219 1.95784668 -34.97460938 1.77514648 C-23.3173269 0.17617506 -11.75313934 -0.04590972 0 0 Z "
        fill="#FF4B25"
        transform="translate(255.625,-0.3125)"
      />
      <path
        d="M0 0 C3.84994503 1.47817846 5.14466022 3.42179796 7.1875 6.9375 C10.96219076 13.09747407 15.28654626 18.53579911 20 24 C20.79535156 24.93070312 21.59070313 25.86140625 22.41015625 26.8203125 C28.09861323 33.29307338 34.13973901 38.79597616 41 44 C41.52045898 44.4007373 42.04091797 44.80147461 42.57714844 45.21435547 C75.51194484 70.42236909 117.23314718 80.41348779 158.2578125 75.3515625 C175.69957988 72.66691782 192.40428735 66.89287579 207.9453125 58.6015625 C211 57 211 57 214 56 C224.40957413 73.79991062 234.73702996 91.64579792 245.02441406 109.51660156 C246.38115258 111.87346291 247.73833221 114.23006924 249.09594727 116.58642578 C250.36546119 118.79006869 251.63423268 120.99413955 252.90209961 123.19873047 C253.4822583 124.20564941 254.06241699 125.21256836 254.66015625 126.25 C255.21461426 127.21292969 255.76907227 128.17585937 256.34033203 129.16796875 C258.46964934 132.80140222 260.68759761 136.37766114 262.93139648 139.94140625 C264 142 264 142 264 145 C236.3310761 160.49987394 206.44333498 171.38142933 175 176 C173.79537109 176.17732666 172.59074219 176.35465332 171.34960938 176.53735352 C159.69232646 178.136325 148.12813902 178.3584053 136.375 178.3125 C135.40511139 178.31067719 134.43522278 178.30885437 133.4359436 178.30697632 C119.08443945 178.26158309 105.12057082 177.7562347 91 175 C90.10297363 174.83902832 89.20594727 174.67805664 88.28173828 174.51220703 C27.69593589 163.54926243 -31.78232525 128.36058263 -68 78 C-68.50112305 77.31131836 -69.00224609 76.62263672 -69.51855469 75.91308594 C-75.38327972 67.83431076 -81.11484579 59.72042879 -86 51 C-83.50615208 48.20436225 -80.74784919 46.56746596 -77.49609375 44.734375 C-76.37638184 44.09943115 -75.25666992 43.4644873 -74.10302734 42.81030273 C-73.5065741 42.47505585 -72.91012085 42.13980896 -72.29559326 41.79440308 C-69.76158447 40.37007921 -67.23366239 38.93510114 -64.7052002 37.5009613 C-63.39750414 36.75946655 -62.08947639 36.01855649 -60.78112793 35.2782135 C-54.45870526 31.69987197 -48.16419059 28.07390633 -41.875 24.4375 C-39.75653391 23.213501 -37.63804422 21.98954285 -35.51953125 20.765625 C-34.46330566 20.15525391 -33.40708008 19.54488281 -32.31884766 18.91601562 C-28.78065403 16.87336861 -25.24018311 14.83471305 -21.69921875 12.796875 C-19.9015896 11.76180196 -18.1040131 10.72663757 -16.30645752 9.69143677 C-14.59970307 8.70891654 -12.89238699 7.72737214 -11.18505859 6.74584961 C-10.15590332 6.15296143 -9.12674805 5.56007324 -8.06640625 4.94921875 C-7.15834229 4.42674561 -6.25027832 3.90427246 -5.31469727 3.3659668 C-3.50873799 2.30022034 -1.74478871 1.16319248 0 0 Z "
        fill="#12B346"
        transform="translate(120,334)"
      />
      <path
        d="M0 0 C3.54434427 1.34455698 6.80799193 2.91228344 10.11328125 4.765625 C11.10110596 5.31847168 12.08893066 5.87131836 13.10668945 6.44091797 C14.16460693 7.03791504 15.22252441 7.63491211 16.3125 8.25 C17.42262451 8.87406738 18.53274902 9.49813477 19.67651367 10.14111328 C28.07329257 14.87659935 36.41194096 19.70793849 44.72753906 24.58447266 C52.80817286 29.31961268 60.9276589 33.98386385 69.0625 38.625 C69.66204498 38.96706482 70.26158997 39.30912964 70.87930298 39.66156006 C73.64710807 41.24034116 76.41543332 42.81820662 79.18408203 44.39550781 C82.45770391 46.26079678 85.72926612 48.1296529 89 50 C88.43152344 51.12792969 87.86304687 52.25585938 87.27734375 53.41796875 C67.86576797 92.65916383 62.6819911 134.83054692 76.25 176.875 C78.97704426 184.91209083 82.4066996 192.46330128 86.3984375 199.9453125 C88 203 88 203 89 206 C87.9162207 206.61705811 87.9162207 206.61705811 86.81054688 207.24658203 C74.17548246 214.44409898 61.54823579 221.65177023 49 229 C36.65711029 236.22714872 24.24333977 243.32867861 11.80810547 250.39550781 C10.10357899 251.36943826 8.40338193 252.35107161 6.71142578 253.34667969 C2.1989209 256 2.1989209 256 0 256 C-22.4169261 217.07548075 -33.46566001 173.50948809 -33.375 128.75 C-33.37445618 127.73798523 -33.37391235 126.72597046 -33.37335205 125.68328857 C-33.33261077 109.15112709 -32.41682284 93.226008 -29 77 C-28.78569336 75.96875 -28.57138672 74.9375 -28.35058594 73.875 C-22.82695964 48.14631858 -13.30552034 22.74983086 0 0 Z "
        fill="#FED400"
        transform="translate(33,128)"
      />
      <path
        d="M0 0 C25.57355332 0 25.57355332 0 33.5 1.1875 C34.90499756 1.38496826 34.90499756 1.38496826 36.33837891 1.58642578 C46.69412754 3.12272768 56.86356427 5.40345506 67 8 C67.74411133 8.18788086 68.48822266 8.37576172 69.25488281 8.56933594 C103.49519192 17.38476201 136.07878488 35.16978154 163.125 57.8125 C163.65762451 58.25650146 164.19024902 58.70050293 164.73901367 59.15795898 C169.2823172 63.043977 173.58629518 66.82317244 174.203125 73.05078125 C174.22632813 74.17033203 174.22632813 74.17033203 174.25 75.3125 C174.28867187 76.42044922 174.28867187 76.42044922 174.328125 77.55078125 C173.54107735 83.42552976 170.0202804 87.35717378 165.96533203 91.42285156 C165.46573975 91.92770081 164.96614746 92.43255005 164.45141602 92.95269775 C162.8109728 94.60625999 161.15990141 96.24870422 159.5078125 97.890625 C158.35778682 99.04267342 157.20820664 100.19516671 156.05905151 101.3480835 C153.65472717 103.75681996 151.24508789 106.16007396 148.83154297 108.55957031 C145.74231785 111.63168513 142.66678297 114.71709862 139.59509468 117.80673599 C137.22588274 120.18679928 134.8495585 122.55965774 132.471035 124.93041229 C131.33416552 126.06528452 130.19950934 127.20237851 129.06714249 128.34174347 C127.48307079 129.93345384 125.88966418 131.5151985 124.29345703 133.09472656 C122.93802292 134.44658051 122.93802292 134.44658051 121.5552063 135.82574463 C117.820718 139.00346506 114.43827456 140.28642634 109.5625 140.3125 C108.84191406 140.32925781 108.12132812 140.34601563 107.37890625 140.36328125 C101.37312334 139.44614199 96.7987238 135.47170814 92.125 131.875 C72.30664015 117.05431351 49.30706866 107.47437619 24.9375 103.25 C23.94955444 103.07645996 23.94955444 103.07645996 22.94165039 102.89941406 C15.29288095 101.69436431 7.80889666 101.48805604 0 101 C0 67.67 0 34.34 0 0 Z "
        fill="#D93F21"
        transform="translate(256,0)"
      />
      <path
        d="M0 0 C2.79563775 2.49384792 4.43253404 5.25215081 6.265625 8.50390625 C6.90056885 9.62361816 7.5355127 10.74333008 8.18969727 11.89697266 C8.52494415 12.4934259 8.86019104 13.08987915 9.20559692 13.70440674 C10.62992079 16.23841553 12.06489886 18.76633761 13.4990387 21.2947998 C14.24053345 22.60249586 14.98144351 23.91052361 15.7217865 25.21887207 C19.30012803 31.54129474 22.92609367 37.83580941 26.5625 44.125 C27.786499 46.24346609 29.01045715 48.36195578 30.234375 50.48046875 C30.84474609 51.53669434 31.45511719 52.59291992 32.08398438 53.68115234 C34.12663139 57.21934597 36.16528695 60.75981689 38.203125 64.30078125 C39.23819804 66.0984104 40.27336243 67.8959869 41.30856323 69.69354248 C42.29108346 71.40029693 43.27262786 73.10761301 44.25415039 74.81494141 C44.84703857 75.84409668 45.43992676 76.87325195 46.05078125 77.93359375 C46.83449097 79.2956897 46.83449097 79.2956897 47.6340332 80.68530273 C48.69977966 82.49126201 49.83680752 84.25521129 51 86 C51 86.99 51 87.98 51 89 C23.1927064 104.57738736 -6.50034267 115.04913173 -38 120 C-39.09054687 120.17571533 -39.09054687 120.17571533 -40.203125 120.35498047 C-52.6028612 122.28669863 -64.28111297 122 -77 122 C-77 88.67 -77 55.34 -77 21 C-69.41 20.34 -61.82 19.68 -54 19 C-34.51081629 15.62687205 -17.41173455 9.24623145 0 0 Z "
        fill="#0F993E"
        transform="translate(333,390)"
      />
    </svg>
  );
};
