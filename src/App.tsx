import { useEffect, useState } from "react";
import { FaCircleCheck, FaCircleExclamation, FaPlus } from "react-icons/fa6";
import { CreateTaksModal } from "./components/CreateTaskModal";
import { EditTaskModal } from "./components/EditTaskModal";
import {
  AbsoluteCenter,
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import "./global.css";

export interface Task {
  id: string;
  text: string;
  done: boolean;
  lac: boolean;
}

// MODAL FUNCTION

function App() {
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

// FUNCTION

  const [tasks, setTasks] = useState<Task[]>([]);

  const [selectedTask, setSelectedTask] = useState<Task>();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

// RETURN

  return (
    <Center h="100vh" w="100vh">

{/* OUT BOX     */}
    <Box
      maxW="600px"
      m="0 auto 300px"
      bg="#FFDFD4"
      p="20px 30px"
      borderRadius={50}
    >

{/* HEADER */}
      <Stack spacing="10">
        <Heading color="#804a37" fontFamily="Ubuntu" textAlign={"center"}>
          Receitas Online
        </Heading>
        <Box display="contents">
          
{/* BUTTON HEADER           */}
          <ButtonGroup
            size="lg"
            isAttached
            variant="outline"
            onClick={onOpenCreateModal}
          >
            <Button bg={"white"}>Inclua sua Receita</Button>
            <IconButton aria-label="Add" bg={"tomato"}icon={<FaPlus />} />
          </ButtonGroup>
        </Box>
        <Stack>

{/* FILTER */}
          <Box position="relative" padding="5">
            <Divider border="2px solid #804a37" />
            <AbsoluteCenter  bg='#FFDFD4' fontSize="xl" color="#804a37" padding="0.5rem">
              Filtre suas Receitas Receitas
            </AbsoluteCenter>
          </Box>
          <ButtonGroup variant="outline" spacing="6">
            <Button
              colorScheme="#804a37"
              onClick={() => {
                const storedTasks = JSON.parse(
                  localStorage.getItem("tasks") || "[]"
                );
                setTasks(storedTasks);
              }}
            >
              Todas
            </Button>
            <Button
              colorScheme="#804a37"
              onClick={() => {
                const storedTasks = JSON.parse(
                  localStorage.getItem("tasks") || "[]"
                );
                const newTasks = storedTasks.filter((task: Task) => task.done);
                setTasks(newTasks);
              }}
            >
              Sem Glúten
            </Button>
            <Button
              colorScheme="#804a37"
              onClick={() => {
                const storedTasks = JSON.parse(
                  localStorage.getItem("tasks") || "[]"
                );
                const newTasks = storedTasks.filter((task: Task) => task.lac);
                setTasks(newTasks);
              }}
            >
              Sem Lactose
            </Button>
          </ButtonGroup>
        </Stack>

{/* LIST */}
        <Box position="relative" padding="5">
          <Divider border="2px solid #804a37" />
          <AbsoluteCenter bg='#FFDFD4' fontSize="xl" color="#804a37" padding="0.5rem">
            Lista de Receitas Receitas
          </AbsoluteCenter>
        </Box>

        <List spacing={3}>
          {tasks.map((todo) => (
            <ListItem key={todo.id}>
              <ListIcon
                as={todo.done ? FaCircleCheck : FaCircleExclamation}
                color={todo.done ? "green.500" : "red.500"}
              />
              <ListIcon
                as={todo.lac ? FaCircleCheck : FaCircleExclamation}
                color={todo.lac ? "green.500" : "red.500"}
              />

              {todo.text}
              <ButtonGroup p={3} size="sm">
                <Button
                  onClick={() => {
                    const newTasks = tasks.map((task) => {
                      if (task.id === todo.id) {
                        task.done = !task.done;
                      }
                      return task;
                    });
                    setTasks(newTasks);
                    localStorage.setItem("tasks", JSON.stringify(newTasks));
                  }}
                >
                  {todo.done ? "Sem Glútem" : "Contém Glútem"}
                </Button>

                <Button
                  onClick={() => {
                    const newTasks = tasks.map((task) => {
                      if (task.id === todo.id) {
                        task.lac = !task.lac;
                      }
                      return task;
                    });
                    setTasks(newTasks);
                    localStorage.setItem("tasks", JSON.stringify(newTasks));
                  }}
                >
                  {todo.lac ? "Sem Lactose" : "Contém lactose"}
                </Button>

                <Button
                  onClick={() => {
                    const newTasks = tasks.filter(
                      (task) => task.id !== todo.id
                    );
                    setTasks(newTasks);
                    localStorage.setItem("tasks", JSON.stringify(newTasks));
                  }}
                >
                  Excluir Receita
                </Button>
                <Button
                  onClick={() => {
                    setSelectedTask(todo);
                    onOpenEditModal();
                  }}
                >
                  Editar
                </Button>
              </ButtonGroup>
              {isOpenEditModal && (
                <EditTaskModal
                  key={todo.id}
                  isOpen={isOpenEditModal}
                  onClose={onCloseEditModal}
                  onOpen={onOpenEditModal}
                  setTasks={setTasks}
                  selectedTask={selectedTask as Task}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Stack>

      <CreateTaksModal
        setTasks={setTasks}
        isOpen={isOpenCreateModal}
        onOpen={onOpenCreateModal}
        onClose={onCloseCreateModal}
      />
    </Box>
    </Center>
  );
}

export default App;
