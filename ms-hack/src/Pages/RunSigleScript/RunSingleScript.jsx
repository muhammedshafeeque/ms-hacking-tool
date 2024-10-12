import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Button,
  Flex,
  Heading,
  Container,
  FormErrorMessage,
} from "@chakra-ui/react";
import apiService from "../../Services/ApiService";
import { useParams } from "react-router-dom";
import ResultPopup from "../../Components/ResultPopup/ResultPopup";

function ScriptRunForm() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [response,setResponse]=useState(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await apiService.getScriptById(id);
        setValue("name", response.name);
        setValue("comment", response.comment);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    if (id) {
      fetchInitialData();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        ip: data.ip?.trim() !== "" ? data.ip : null,
        port: data.port?.trim() !== "" ? data.port : null,
        url: data.url?.trim() !== "" ? data.url : null,
        script:id
      };
      const response = await apiService.runScript(formattedData);
      setResponse(response); 
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <Container maxW="container.xl" mx="auto" p={8}>
      <Flex justify="space-between" mb={4}>
        <Heading fontSize="xl" fontWeight="black">
          Run Script
        </Heading>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name} mb={4}>
          <FormLabel>Script Name</FormLabel>
          <Input
            {...register("name", { required: "Script name is required" })}
            isDisabled
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.comment} mb={4}>
          <FormLabel>Command</FormLabel>
          <Textarea
            {...register("comment", { required: "Command is required" })}
          />
          <FormErrorMessage>
            {errors.comment && errors.comment.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>IP (Optional)</FormLabel>
          <Input {...register("ip")} placeholder="Enter IP address" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Port (Optional)</FormLabel>
          <Input
            {...register("port", {
              pattern: {
                value: /^\d*$/,
                message: "Please enter a valid port number",
              },
            })}
            placeholder="Enter port number"
          />
          <FormErrorMessage>
            {errors.port && errors.port.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>URL (Optional)</FormLabel>
          <Input
            {...register("url", {
              pattern: {
                value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                message: "Please enter a valid URL",
              },
            })}
            placeholder="Enter URL"
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
          Run Script
        </Button>
      </form>
      <ResultPopup response={response} />
    </Container>
  );
}

export default ScriptRunForm;