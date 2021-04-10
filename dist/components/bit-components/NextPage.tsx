import ellipsize from "ellipsize";
import Head from "next/head";
import { useEffect } from "react";

type NextPageProps = {
  // Required:
  title: string;
  // Optional:
  description?: string;
  author?: string;
  copyright?: string;
  keywords?: string[];
  // Defined by default:
  charset?: string;
  language?: string;
  viewport?: string;
  // Additional:
  head?: Parameters<typeof Head>[0]["children"];
  // Helpers/Miscellaneous:
  ellipsizeDescription?: boolean;
  // Children rendering:
  wrapper?: (children: React.ReactNode) => JSX.Element;
};

export const NextPage: React.FC<NextPageProps> = ({
  title,
  description,
  author,
  copyright,
  keywords,
  charset,
  language,
  viewport,
  head,
  ellipsizeDescription,
  wrapper,
  children,
}) => {
  if (description.length > 150 && ellipsizeDescription) {
    description = ellipsize(description, 150);
  }

  useEffect(() => {
    if (title.length > 70) {
      console.warn(
        `Site titles should be at most 70 characters long (found: ${title.length}).`
      );
    }
    if (description.length > 150 && !ellipsizeDescription) {
      console.warn(
        `Site descriptions should be at most 150 characters long (found: ${description.length}).
        You might want to set \`ellipsizeDescription\` to \`true\` to enable auto ellipsizing.`
      );
    }
  }, [title, description]);

  return (
    <>
      <Head>
        {/* Default (but overridable) meta tags: */}
        <meta charSet={charset || "utf-8"} />
        <meta name="language" content={language || "English"} />
        <meta
          name="viewport"
          content={viewport || "width=device-width, initial-scale=1.0"}
        />

        {/* Very important/Required meta tags: */}
        <title>{title}</title>

        {/* Less important/Optional meta tags: */}
        {description && <meta name="description" content={description} />}
        {author && <meta name="author" content={author} />}
        {copyright && <meta name="copyright" content={copyright} />}
        {keywords && <meta name="keywords" content={keywords.join(", ")} />}

        {/* Additional, user-defined meta tags: */}
        {head}
      </Head>

      {wrapper ? wrapper(children) : children}
    </>
  );
};
