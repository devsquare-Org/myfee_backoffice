"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddBanner() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>배너 추가</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>배너 추가</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
