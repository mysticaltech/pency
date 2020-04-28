import React from "react";
import {Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading} from "@chakra-ui/core";

import {api as tenantApi} from "~/pages/api/tenant";
import {api as productApi} from "~/pages/api/product";
import {Provider as SessionProvider} from "~/session/context";
import ProductsAdminScreen from "~/product/screens/Admin";
import TenantAdminScreen from "~/tenant/screens/Admin";

const AdminScreen: React.FC = () => {
  return (
    <SessionProvider>
      <Box as="main" height="100%" overflowY="auto" padding={4}>
        <Heading as="h1" mb={4} size="2xl">
          Panel de administración
        </Heading>
        <Tabs variant="soft-rounded" variantColor="primary">
          <TabList mb={4}>
            <Tab>Productos</Tab>
            <Tab>Tienda</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProductsAdminScreen />
            </TabPanel>
            <TabPanel>
              <TenantAdminScreen />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </SessionProvider>
  );
};

export async function getServerSideProps({params: {slug}}) {
  try {
    const tenant = await tenantApi.fetch(slug);
    const products = await productApi.list(tenant.id);

    return {props: {tenant, products}};
  } catch (e) {
    const {status, statusText: text} = e;
    return {props: {error: {status, text}}};
  }
}

export default AdminScreen;
