import React from "react";
import {Flex, Button, Stack} from "@chakra-ui/core";

import {Tenant} from "../types";
import SettingsForm from "../forms/Settings";
import {useTenant, useTenantActions} from "../hooks";

const AdminScreen: React.FC = () => {
  const tenant = useTenant();
  const {update} = useTenantActions();

  function handleUpdate(tenant: Tenant) {
    return update(tenant);
  }

  return (
    <SettingsForm defaultValues={tenant} onSubmit={handleUpdate}>
      {({form, isLoading, submit}) => (
        <Flex maxWidth="480px">
          <Stack spacing={{base: 3, sm: 6}} width="100%">
            {form}
            <Button
              alignSelf="flex-end"
              isLoading={isLoading}
              mt={4}
              type="submit"
              onClick={submit}
            >
              Guardar
            </Button>
          </Stack>
        </Flex>
      )}
    </SettingsForm>
  );
};

export default AdminScreen;