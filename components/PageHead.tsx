import Head from "next/head";
import { useContext } from "react";
import { AppInfoCtx } from "../context";

type PageHeadProps = {
  title?: string;
  replaceTitle?: boolean;
};

export const PageHead: React.FC<PageHeadProps> = ({
  title,
  replaceTitle,
  children,
}) => {
  const appInfo = useContext(AppInfoCtx);

  return (
    <Head>
      <title>
        {replaceTitle ? title : `${appInfo.name}${title && ` • ${title}`}`}
      </title>
      {children}
    </Head>
  );
};
