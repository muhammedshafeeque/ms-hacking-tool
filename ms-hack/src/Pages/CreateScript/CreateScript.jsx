import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  Heading,
  Container,
  Box,
} from "@chakra-ui/react";
import apiService from "../../Services/ApiService";
import { useNavigate } from "react-router-dom";

function CreateScript() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    let script = await apiService.createScript(data);
    navigate("/scripts");
  };
  const getScriptTypes = async () => {
    setTypes(await apiService.getScriptTypes());
    
  };
  useEffect(() => {
    getScriptTypes();
  }, []);

  return (
    <Container maxW="container.xl" mx="auto" p={8}>
      <Box p={8} borderRadius="lg" boxShadow="lg" bg="white" mb={8}>
        <Heading mb={4} fontSize="xl" fontWeight="black">
          Create Script
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6}>
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel fontSize="md" fontWeight="medium">
                Name
              </FormLabel>
              <Input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 50,
                    message: "Name should not exceed 50 characters",
                  },
                })}
                size="lg"
                placeholder="Enter script name"
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.scriptType}>
              <FormLabel fontSize="md" fontWeight="medium">
                Script Type
              </FormLabel>
              <Select
                {...register("scriptType", {
                  required: "Script Type is required",
                })}
                size="lg"
              >
                {types.map((type) => {
                  return (
                    <option key={type.key} value={type.value}>
                      {type.key}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>{errors.scriptType?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.comment}>
              <FormLabel fontSize="md" fontWeight="medium">
                Comment
              </FormLabel>
              <Textarea
                {...register("comment", {
                  required: "Comment is required",
                  maxLength: {
                    value: 200,
                    message: "Comment should not exceed 200 characters",
                  },
                })}
                size="lg"
                rows={6}
                placeholder="Enter script comment"
              />
              <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              fontWeight="medium"
            >
              Create Script
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}

export default CreateScript;
