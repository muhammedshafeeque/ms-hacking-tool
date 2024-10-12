import React, { useState } from 'react';
import {
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Button,
  Flex,
  Heading,
  Container,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import apiService from '../../Services/ApiService';

function EnvironmentForm() {
  const [repoUrl, setRepoUrl] = useState('');
  const [name, setName] = useState('');
  const [environmentScripts, setEnvironmentScripts] = useState(['']);
  const [executionScripts, setExecutionScripts] = useState(['']);

  const handleScriptChange = (e, index, scriptType) => {
    const updatedScripts = scriptType === 'environment' 
      ? [...environmentScripts] 
      : [...executionScripts];
    updatedScripts[index] = e.target.value;
    scriptType === 'environment' 
      ? setEnvironmentScripts(updatedScripts)
      : setExecutionScripts(updatedScripts);
  };

  const addScript = (scriptType) => {
    scriptType === 'environment'
      ? setEnvironmentScripts([...environmentScripts, ''])
      : setExecutionScripts([...executionScripts, '']);
  };

  const removeScript = (index, scriptType) => {
    const updatedScripts = scriptType === 'environment'
      ? [...environmentScripts]
      : [...executionScripts];
    updatedScripts.splice(index, 1);
    scriptType === 'environment'
      ? setEnvironmentScripts(updatedScripts)
      : setExecutionScripts(updatedScripts);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      repoUrl,
      name,
      environment_script: environmentScripts,
      execution_script: executionScripts,
    };
    console.log(data);
    try {
      let response=await apiService.createEnvironment(data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Container maxW="container.xl" mx="auto" p={8}>
      <Heading mb={4} fontSize="xl" fontWeight="black">
        Environment Form
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Repository URL</FormLabel>
          <Input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter repository URL"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter environment name"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Environment Scripts</FormLabel>
          {environmentScripts.map((script, index) => (
            <Flex key={index} mb={2}>
              <Textarea
                value={script}
                onChange={(e) => handleScriptChange(e, index, 'environment')}
                placeholder="Enter script command"
              />
              <IconButton
                icon={<MinusIcon />}
                onClick={() => removeScript(index, 'environment')}
                ml={2}
                aria-label="Remove environment script"
              />
            </Flex>
          ))}
          <IconButton 
            icon={<AddIcon />} 
            onClick={() => addScript('environment')}
            aria-label="Add environment script"
          >
            Add Script
          </IconButton>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Execution Scripts</FormLabel>
          {executionScripts.map((script, index) => (
            <Flex key={index} mb={2}>
              <Textarea
                value={script}
                onChange={(e) => handleScriptChange(e, index, 'execution')}
                placeholder="Enter script command"
              />
              <IconButton
                icon={<MinusIcon />}
                onClick={() => removeScript(index, 'execution')}
                ml={2}
                aria-label="Remove execution script"
              />
            </Flex>
          ))}
          <IconButton 
            icon={<AddIcon />} 
            onClick={() => addScript('execution')}
            aria-label="Add execution script"
          >
            Add Script
          </IconButton>
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default EnvironmentForm;