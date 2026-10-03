import classNames from 'classnames';
import NextLink, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import type { ComponentProps } from 'react';

type Props = LinkProps &
  Omit<ComponentProps<'a'>, keyof LinkProps> & {
    defaultClass?: string;
    activeClass?: string;
  };

export default function Link({
  defaultClass,
  activeClass,
  className,
  href,
  as,
  children,
  ...rest
}: Props) {
  const router = useRouter();
  const active = router.asPath === href || router.asPath === as;
  return (
    <NextLink
      {...rest}
      href={href}
      as={as}
      className={classNames(className, defaultClass, active && activeClass)}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </NextLink>
  );
}
