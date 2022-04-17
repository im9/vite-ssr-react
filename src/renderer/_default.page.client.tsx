import { hydrateRoot } from "react-dom/client";
import React from "react";
import { getPage } from "vite-plugin-ssr/client";
import { PageLayout } from "./PageLayout";

hydrate();

async function hydrate() {
  const pageContext = await getPage();
  const { Page, pageProps } = pageContext as any;
  const el = document.getElementById("page-view");
  if (!el) return <></>;

  hydrateRoot(
    el,
    <PageLayout>
      <Page {...pageProps} />
    </PageLayout>
  );
}
