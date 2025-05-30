import type { SVGProps } from 'react';

export function SpinnerLogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      data-ai-hint="abstract spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <path d="M12 2v4" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 2.83 2.83" />
      <path d="m16.24 16.24 2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h2" />
      <path d="m4.93 19.07 2.83-2.83" />
      <path d="m16.24 7.76-2.83 2.83" />
    </svg>
  );
}
