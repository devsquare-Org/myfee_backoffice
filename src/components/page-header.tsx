import { ReactNode } from "react";

type BaseProps = {
  title: ReactNode;
  description: string;
  button?: ReactNode;
};

export function PageHeader({ title, description, button }: BaseProps) {
  return (
    <div className="mb-4 flex flex-col md:flex-row justify-between md:gap-0">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">{title}</div>
        <div className="!mt-0 text-xs font-semibold text-muted-foreground">
          {description}
        </div>
      </div>
      {button}
    </div>
  );
}
