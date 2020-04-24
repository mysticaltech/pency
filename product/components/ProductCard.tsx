import React from "react";
import {
  Box,
  Text,
  Flex,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Image,
} from "@chakra-ui/core";

import ProductOptionsForm from "../forms/ProductOptionsForm";

import {Product} from "~/product/types";
import {useProductCartCount} from "~/cart/hooks";

interface Props {
  product: Product;
  add: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({product, add}) => {
  const {id, category, image, description, title, price, options} = product;
  const {isOpen: isImageOpen, onToggle: toggleImage} = useDisclosure();
  const {isOpen: isOptionsOpen, onToggle: toggleOptions} = useDisclosure();
  const count = useProductCartCount(id);

  function handleAdd() {
    if (options?.length) {
      return toggleOptions();
    }

    return add(product);
  }

  function handleAddWithOptions(options) {
    toggleOptions();

    return add({...product, options});
  }

  return (
    <>
      <Flex
        alignItems="flex-end"
        borderColor={Boolean(count) ? "primary.500" : "gray.200"}
        borderWidth="1px"
        direction="column"
        justifyContent="space-between"
        position="relative"
        rounded="lg"
        transition="transform 0.2s"
      >
        {Boolean(count) && (
          <Flex
            alignItems="center"
            backgroundColor="primary.500"
            border="2px solid white"
            borderRadius="50%"
            color="white"
            fontSize="16px"
            height="26px"
            justifyContent="center"
            position="absolute"
            right="-13px"
            top="-13px"
            width="26px"
          >
            {count}
          </Flex>
        )}
        {image ? (
          <Box
            backgroundImage={`url(${image})`}
            backgroundPosition="center"
            backgroundSize="cover"
            borderBottom={1}
            borderBottomStyle="solid"
            borderColor="gray.100"
            cursor={"pointer"}
            flexShrink={0}
            height={64}
            roundedTop="lg"
            width="100%"
            onClick={toggleImage}
          />
        ) : (
          <Flex
            alignItems="center"
            backgroundColor="gray.100"
            borderBottom={1}
            borderBottomStyle="solid"
            borderColor="gray.100"
            flexShrink={0}
            height={64}
            justifyContent="center"
            roundedTop="lg"
            width="100%"
          >
            <Text color="gray.400" fontSize="2xl">
              sin foto
            </Text>
          </Flex>
        )}
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
          p={4}
          width="100%"
        >
          <Flex direction="column">
            <Badge mb={2} variantColor="primary" width="fit-content">
              {category}
            </Badge>
            <Text display="block" fontSize="lg" fontWeight="semibold" lineHeight="normal" mb={2}>
              {title}
            </Text>
            {description && (
              <Text color="gray.500" mb={2}>
                {description}
              </Text>
            )}
          </Flex>
          <Flex alignItems="flex-end">
            <Text
              color="primary.500"
              flex={1}
              fontSize="lg"
              fontWeight="bold"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              ${price}
            </Text>
            <Button onClick={handleAdd}>Agregar</Button>
          </Flex>
        </Box>
      </Flex>
      <Modal isCentered id="image" isOpen={isImageOpen} onClose={toggleImage}>
        <ModalOverlay />
        <ModalCloseButton color="white" right={1} size="lg" top={1} zIndex={1500} />
        <ModalContent
          alignItems="center"
          backgroundColor="transparent"
          boxShadow="none"
          height="auto"
          justifyContent="center"
          margin={4}
          maxHeight="60vh"
          maxWidth="640px"
        >
          <Image height="100%" objectFit="contain" src={image} width="100%" />
        </ModalContent>
      </Modal>
      {Boolean(options?.length) && (
        <Modal isCentered id="options" isOpen={isOptionsOpen} onClose={toggleOptions}>
          <ModalOverlay />
          <ModalContent
            alignItems="center"
            height="auto"
            justifyContent="center"
            margin={{base: 0, sm: 4}}
            maxHeight={{base: "none", sm: "60vh"}}
            maxWidth={{base: "none", sm: "640px"}}
            rounded={{base: 0, sm: "lg"}}
          >
            <ProductOptionsForm
              options={options}
              onCancel={toggleOptions}
              onSubmit={handleAddWithOptions}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ProductCard;
