import { FormLabel, FormMessage } from "@/components/ui/form";
import { FieldError } from "react-hook-form";

export default function CustomFormLabel({
  error,
  children,
  className,
  ...props
}: {
  error?: FieldError | undefined;
} & React.ComponentProps<typeof FormLabel>) {
  return (
    <>
      {error ? (
        <FormMessage className={className} />
      ) : (
        <FormLabel {...props} className={className}>
          {children}
        </FormLabel>
      )}
    </>
  );
}
