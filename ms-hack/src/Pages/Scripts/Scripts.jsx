import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Heading,
  Container,
  Input,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../Components/Pagination/Pagination";
import apiService from "../../Services/ApiService";

function Scripts() {
  const [scripts, setScripts] = useState([]);
  const [filteredScripts, setFilteredScripts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scriptsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await apiService.getScripts();

        setScripts(response);
        setFilteredScripts(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchScripts();
  }, []);

  const indexOfLastScript = currentPage * scriptsPerPage;
  const indexOfFirstScript = indexOfLastScript - scriptsPerPage;
  const currentScripts = filteredScripts.slice(
    indexOfFirstScript,
    indexOfLastScript
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchName(searchValue);
    const filtered = scripts.filter(
      (script) =>
        script.name.toLowerCase().includes(searchValue) &&
        (selectedType === "" ? true : script.scriptType === selectedType)
    );
    setFilteredScripts(filtered);
  };

  const handleTypeChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedType(selectedValue);
    const filtered = scripts.filter(
      (script) =>
        script.name.toLowerCase().includes(searchName) &&
        (selectedValue === "" ? true : script.scriptType === selectedValue)
    );
    setFilteredScripts(filtered);
  };
  const getScriptTypes = async () => {
    setTypes(await apiService.getScriptTypes());
  };
  useEffect(() => {
    getScriptTypes();
  }, []);

  return (
    <Container maxW="container.xl" mx="auto" p={8}>
      <Flex justify="space-between" mb={4}>
        <Heading fontSize="xl" fontWeight="black">
          Scripts
        </Heading>
        <Link to="/create-script">
          <Button colorScheme="blue">Create Script</Button>
        </Link>
      </Flex>
      <Flex mb={4} justify="space-between">
        <Input
          placeholder="Search by name"
          value={searchName}
          onChange={handleSearch}
          width="30%"
        />
        <Select
          placeholder="Select script type"
          value={selectedType}
          onChange={handleTypeChange}
          width="30%"
        >
          {types.map((type) => {
            return (
              <option key={type.key} value={type.value}>
                {type.key}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Script Type</Th>
            <Th>Comment</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentScripts.map((script) => (
            <Tr key={script._id}>
              <Td>{script.name}</Td>
              <Td>{script.scriptType}</Td>
              <Td>{script.comment}</Td>
              <Td>
                <Flex>
                  <Link to={`/run-script/${script._id}`}>
                    <Button colorScheme="red" mr={2} size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/run-script/${script._id}`}>
                    <Button colorScheme="teal" size="sm">
                      Run
                    </Button>
                  </Link>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {filteredScripts.length > 0 && (
        <Pagination
          pagesCount={Math.ceil(filteredScripts.length / scriptsPerPage)}
          currentPage={currentPage}
          onPageChange={paginate}
        />
      )}
    </Container>
  );
}

export default Scripts;
