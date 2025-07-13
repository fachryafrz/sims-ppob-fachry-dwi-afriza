"use client";

import { useConfirmation } from "@/hooks/use-confirmation";
import ModalConfirmation from "./confirmation";
import ModalStatus from "./status";
import { useStatus } from "@/hooks/use-status";

export default function Modal() {
  const { isOpen: isOpenConfirmation } = useConfirmation();
  const { isOpen: isOpenStatus } = useStatus();

  return (
    <>
      {isOpenConfirmation && <ModalConfirmation />}

      {isOpenStatus && <ModalStatus />}
    </>
  );
}
