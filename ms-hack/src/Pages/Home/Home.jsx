import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Box, Flex, Input, Button } from "@chakra-ui/react";

function Home() {
  const { register, handleSubmit, control, errors } = useForm();
  const { fields, append, remove } = useFieldArray({
    control, 
    name: "rows", 
  });

  const onSubmit = async (data) => {
    data.row.forEach((item)=>{
        console.log(item)
    })
  };
  
  useEffect(() => {
    append({ ipAddress: "", url: "" });
  }, []);

  return (
    <Box p={4} maxWidth="container.xl" mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Flex key={field.id} mb={4}>
            <Input
              {...register(`rows.${index}.ipAddress`)}
              type="text"
              placeholder="Enter IP Address"
              mr={4}
              size="md"
              width="50%"
            />
            <Input
              {...register(`rows.${index}.url`)}
              type="text"
              placeholder="Enter URL"
              size="md"
              width="50%"
            />
            {fields.length > 1 && (
              <Button
                onClick={() => remove(index)}
                size="sm"
                variant="outline"
                colorScheme="red"
                ml={4}
              >
                Remove
              </Button>
            )}
          </Flex>
        ))}
        <Flex justify="flex-end">
          <Button
            onClick={() => append({ ipAddress: "", url: "" })}
            size="md"
            colorScheme="teal"
            mr={4}
          >
            Add Row
          </Button>
          <Button type="submit" colorScheme="blue" size="md">
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default Home;