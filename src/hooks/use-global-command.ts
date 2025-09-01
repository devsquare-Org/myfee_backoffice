import { useState, useEffect } from "react";

let globalSetOpen:
  | ((open: boolean | ((prev: boolean) => boolean)) => void)
  | null = null;

export function useGlobalCommand() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    globalSetOpen = setOpen;
    return () => {
      globalSetOpen = null;
    };
  }, []);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const toggleDialog = () => setOpen((prev) => !prev);

  return {
    open,
    setOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
}

export function openGlobalCommand() {
  if (globalSetOpen) {
    globalSetOpen(true);
  }
}

export function closeGlobalCommand() {
  if (globalSetOpen) {
    globalSetOpen(false);
  }
}

export function toggleGlobalCommand() {
  if (globalSetOpen) {
    globalSetOpen((prev: boolean) => !prev);
  }
}
