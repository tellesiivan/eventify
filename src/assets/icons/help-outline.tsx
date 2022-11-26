// icon:help-outline | Ionicons https://ionicons.com/ | Ionic Framework
import * as React from "react";

export function HelpOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={40}
        d="M160 164s1.44-33 33.54-59.46C212.6 88.83 235.49 84.28 256 84c18.73-.23 35.47 2.94 45.48 7.82C318.59 100.2 352 120.6 352 164c0 45.67-29.18 66.37-62.35 89.18S248 298.36 248 324"
      />
      <path d="M280 399.99 A32 32 0 0 1 248 431.99 A32 32 0 0 1 216 399.99 A32 32 0 0 1 280 399.99 z" />
    </svg>
  );
}
