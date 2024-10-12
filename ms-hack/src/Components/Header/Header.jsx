import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Header() {
  const bgColor = useColorModeValue("primary", "primaryDark");
  const textColor = useColorModeValue("textLight", "textDark");
  const hoverColor = useColorModeValue("primaryHover", "primaryDarkHover");
  const buttonColor = useColorModeValue("secondary", "secondaryDark");
  const buttonTextColor = useColorModeValue("primary", "primaryDark");
  const navigate=useNavigate()
  return (
    <Box
      bg={bgColor}
      color={textColor}
      py={4}
      boxShadow="lg"
      position="sticky"
      top={0}
      zIndex={10}
      fontSize="lg"
      fontWeight="medium"
      fontFamily="heading"
      letterSpacing="wide"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <Heading
              as="h1"
              size="xl"
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="short"
              color="heading"
              mb={-2}
              onClick={()=>{navigate('/')}}
            >
              Da Mone ...!
            </Heading>
            <Text
              fontSize="md"
              fontWeight="medium"
              color="text"
              letterSpacing="wide"
            >
              
            </Text>
          </Flex>
          <Flex align="center" justify="flex-end">
            <Link
              fontSize="xl"
              fontWeight="medium"
              color={textColor}
              href="/scripts"
              mr={4}
              _hover={{ textDecoration: "underline" }}
            >
              Scripts
            </Link>
            <Link
              fontSize="xl"
              fontWeight="medium"
              color={textColor}
              href="/create-environment"
              mr={8}
              _hover={{ textDecoration: "underline" }}
            >
              Environment
            </Link>
            <Button
              bg={buttonColor}
              color={buttonTextColor}
              variant="solid"
              size="xl"
              _hover={{ bg: hoverColor }}
              borderRadius="md"
              boxShadow="md"
              fontSize="xl"
              fontWeight="bold"
            >
              Sign In
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
