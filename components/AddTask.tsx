import React, { useState } from "react";
import { Button } from "./ui/button";
import { HiPlus } from "react-icons/hi";
import FormTask from "./FormTask";

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <Button
        variant="secondary"
        color="primary"
        className="rounded-lg"
        onClick={toggle}
      >
        <HiPlus /> Tambah Task
      </Button>
      <FormTask mode="add" isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default AddTask;
