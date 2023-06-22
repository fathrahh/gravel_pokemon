import Link from "next/link";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { UrlObject } from "url";

interface Props {
  href: string | UrlObject;
}

export default function ButtonLink({
  href,
  children,
  ...rest
}: PropsWithChildren<Props & ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <Link {...{ href }} passHref>
      <button
        className="bg-violet-600 min-w-[120px] font-semibold rounded-md px-3 py-2 text-white"
        {...rest}
      >
        {children}
      </button>
    </Link>
  );
}
