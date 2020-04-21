import React from "react";
import {Global, css} from "@emotion/core";
import {Flex, Heading, Image, ThemeProvider, CSSReset} from "@chakra-ui/core";
import Link from "next/link";
import Head from "next/head";

import {Provider as ProductProvider} from "~/product/context";
import {Provider as TenantProvider} from "~/tenant/context";
import {Provider as CartProvider} from "~/cart/context";
import getTheme from "~/theme";

function App({Component, pageProps}) {
  const {tenant, products} = pageProps;

  return (
    <ThemeProvider theme={getTheme(tenant?.color)}>
      <CSSReset />
      <Global
        styles={css`
          body {
            height: 100%;
            max-height: 100vh;
            width: 100%;
            max-width: 100vw;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
              "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overscroll-behavior: contain;
            overflow: hidden;
            position: fixed;
          }

          #__next {
            height: 100%;
          }

          /* Drawer hack */
          [role="dialog"] {
            height: 100% !important;
          }

          * {
            touch-action: manipulation;
          }
        `}
      />
      {tenant && products ? (
        <>
          <Head>
            <link href="public/favicon.ico" rel="icon" />
            <meta
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              name="viewport"
            />
            <meta content={tenant.color} name="theme-color" />
            <meta content={tenant.description} name="description" />
            <link href={tenant.logo} rel="apple-touch-icon" />
            <meta content={tenant.color} name="theme-color" />
            <meta content={tenant.description} name="description" />
            <meta content={tenant.keywords} name="keywords" />
            <meta content={tenant.name} name="author" />
            <meta content="summary_large_image" name="twitter:card" />
            <meta content="goncy" name="twitter:site" />
            <meta content="goncy" name="twitter:creator" />
            <meta content="https://pency.now.sh" property="og:url" />
            <meta content="website" property="og:type" />
            <meta content={tenant.title} property="og:title" />
            <meta content={tenant.description} property="og:description" />
            <meta content={tenant.banner} property="og:image" />
            <meta content={tenant.banner} property="og:image:url" />
            <meta content="image/jpeg" property="og:image:type" />
            <meta content="1200" property="og:image:width" />
            <meta content="630" property="og:image:height" />
            <meta content={tenant.title} property="og:image:alt" />
            <title>{tenant.title}</title>
          </Head>
          <Flex direction="column" height="100%">
            <Flex
              align="center"
              as="nav"
              bg={`primary.${tenant.hue}`}
              color="white"
              justifyContent="space-between"
              paddingX={{base: 3, sm: 6}}
              paddingY={3}
              wrap="wrap"
            >
              <Link href={`/${tenant.slug}`}>
                <Heading as="h1" size="lg">
                  {tenant.logo ? <Image maxHeight={16} src={tenant.logo} /> : tenant.slug}
                </Heading>
              </Link>
            </Flex>

            <TenantProvider initialValue={tenant}>
              <ProductProvider initialValues={products}>
                <CartProvider>
                  <Component {...pageProps} />
                </CartProvider>
              </ProductProvider>
            </TenantProvider>
          </Flex>
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

export default App;