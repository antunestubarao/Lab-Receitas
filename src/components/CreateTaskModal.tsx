import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "../App";

import React from "react";

interface CreateTaksModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setTasks: (tasks: Task) => void;
  
}

export function CreateTaksModal(props: CreateTaksModalProps) {
  const [taskName, setTaskName] = useState("");
  const [ingName, setIngName] = useState("");
  

  function handleCreateTask() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      text: taskName,
      ting: ingName,
      done: true,
      lac: true,
    };

    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    setTaskName("");
    props.setTasks((tasks: Task[]) => [...tasks, newTask]);
    props.onClose();
  }

  

  

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inclua sua Receita mais Saborosa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Título da Receita</FormLabel>
              <Input
                placeholder="Título da Receita"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </FormControl>
            <FormLabel>Ingredientes</FormLabel>
            <Input onChange={(e) => setIngName(e.target.value)}/>
          </ModalBody>
          
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Fechar
            </Button>
            <Button colorScheme="green" onClick={() => handleCreateTask()}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
