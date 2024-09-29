import React, { useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Button,
  Flex,
  Heading,
  Container,
} from "@chakra-ui/react";
import apiService from "../../Services/ApiService";

function ScriptRunForm() {
  const [scriptName, setScriptName] = useState("");
  const [command, setCommand] = useState("");
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        scriptName,
        command,
        ip: ip.trim() !== "" ? ip : null,
        port: port.trim() !== "" ? port : null,
        url: url.trim() !== "" ? url : null,
      };
      const response = await apiService.runScript(data);
      console.log(response);
      // Handle success response
    } catch (error) {
      console.error(error);
      // Handle error response
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" mx="auto" p={8}>
      <Flex justify="space-between" mb={4}>
        <Heading fontSize="xl" fontWeight="black">
          Run Script
        </Heading>
      </Flex>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Script Name</FormLabel>
          <Input
            type="text"
            value={scriptName}
            onChange={(e) => setScriptName(e.target.value)}
            placeholder="Enter script name"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Command</FormLabel>
          <Textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>IP (Optional)</FormLabel>
          <Input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP address"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Port (Optional)</FormLabel>
          <Input
            type="number"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            placeholder="Enter port number"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>URL (Optional)</FormLabel>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Run Script
        </Button>
      </form>
    </Container>
  );
}

export default ScriptRunForm;