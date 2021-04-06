import {
  Link as MaterialLink,
  LinkProps as MaterialLinkProps,
} from "@material-ui/core";
import { default as NextLink } from "next/link";

type LinkProps = {
  href: string;
} & Omit<MaterialLinkProps, "href">;

export const Link: React.FC<LinkProps> = (props) => {
  return (
    <NextLink href={props.href}>
      <MaterialLink {...props}>{props.children}</MaterialLink>
    </NextLink>
  );
};
