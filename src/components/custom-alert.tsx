import { AlertCircleIcon, Flag } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type AlerBaseProps = {
  title: string;
  description?: string;
};

type CustomAlertProps = AlerBaseProps & {
  type: "default" | "simple" | "destructive";
  className?: string;
};

export function CustomAlert({
  type,
  title,
  description,
  className,
}: CustomAlertProps) {
  return (
    <div className={cn("grid w-full max-w-xl items-start gap-4", className)}>
      {type === "default" && (
        <DefaultAlert title={title} description={description} />
      )}
      {type === "simple" && <SimpleAlert title={title} />}
      {type === "destructive" && (
        <DestructiveAlert title={title} description={description} />
      )}
    </div>
  );
}

function DefaultAlert({ title, description }: AlerBaseProps) {
  return (
    <Alert>
      <Flag />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

function SimpleAlert({ title }: AlerBaseProps) {
  return (
    <Alert>
      <Flag />
      <AlertTitle>{title}</AlertTitle>
    </Alert>
  );
}

function DestructiveAlert({ title, description }: AlerBaseProps) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
