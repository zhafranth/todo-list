"use client";

import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useUpdateStatus } from "@/actions/hooks";
import { Task } from "@prisma/client";

interface IModalConfirmation {
  toggle: () => void;
  data: Task;
}

const ModalConfirmation: React.FC<IModalConfirmation> = ({ toggle, data }) => {
  const { id, status } = data ?? {};
  const { mutate } = useUpdateStatus();
  const handleChangeStatus = useCallback(() => {
    mutate(
      {
        id,
        status: !status,
      },
      {
        onSuccess: () => {
          toggle();
        },
      }
    );
  }, [id, mutate, status, toggle]);
  return (
    <Dialog open onOpenChange={toggle}>
      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Apakah status {status ? "Belum Selesai" : "Selesai"} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleChangeStatus}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalConfirmation;
