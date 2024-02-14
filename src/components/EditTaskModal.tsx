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

interface EditTaskModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setTasks: (tasks: Task) => void;
  selectedTask: Task;
}

export function EditTaskModal(props: EditTaskModalProps) {
  const [taskName, setTaskName] = useState("");

  function handleEditTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updatedTasks = tasks.map((task: Task) => {
      if (task.id === props.selectedTask.id) {
        task.text = taskName;
      }
      return task;
    });

    props.setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
                placeholder="Altere o Título da Receita"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </FormControl>
            <FormLabel>Ingredientes</FormLabel>
            <Input placeholder="refaça os ingredientes"></Input>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Fechar
            </Button>
            <Button colorScheme="green" onClick={() => handleEditTask()}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
