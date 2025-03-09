import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import ModalConfirmation from "./ModalConfirmation";
import { useUpdateTask } from "@/actions/hooks";
import { Task } from "@prisma/client";
import FormTask from "./FormTask";

interface IActionTodo {
  data: Task;
}

const ActionTodo: React.FC<IActionTodo> = ({ data }) => {
  const { id, title } = data ?? {};

  const [openedModal, setOpenedModal] = useState<null | "del" | "edit">(null);
  const { mutateDeleteTask } = useUpdateTask();

  const handleShowModal = (modal: "del" | "edit") => {
    setOpenedModal(modal);
  };

  const closeModal = () => setOpenedModal(null);

  const handleDeleteTask = () => {
    mutateDeleteTask(id);
    closeModal();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-1" variant="ghost">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleShowModal("del")}>
            <Trash />
            Hapus
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShowModal("edit")}>
            <Pencil />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openedModal === "del" && (
        <ModalConfirmation
          title="Hapus Task"
          description={
            <p>
              Apakah anda yakin akan menghapus{" "}
              <span className="font-semibold">{title}</span>
            </p>
          }
          onClose={closeModal}
          onSubmit={handleDeleteTask}
        />
      )}
      <FormTask
        isOpen={openedModal === "edit"}
        mode="edit"
        toggle={closeModal}
        data={data}
      />
    </>
  );
};

export default ActionTodo;
