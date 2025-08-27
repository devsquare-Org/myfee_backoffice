"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormLabel from "@/components/custom-form-label";
import { z } from "zod";
import { loginFormSchema } from "@/app/signin/_action/schema";
import { useAction } from "next-safe-action/hooks";
import { loginAction } from "@/app/signin/_action/action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ROUTES } from "@/lib/routes-config";

export function LoginForm() {
  const router = useRouter();

  const { execute, isExecuting } = useAction(loginAction, {
    onSuccess: () => {
      router.push(ROUTES.DASHBOARD);
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit() {
    execute(form.getValues());
  }

  return (
    <div className="w-[400px] border rounded-lg py-8 px-6">
      <div className="text-2xl font-bold mb-4">로그인</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <CustomFormLabel error={form.formState.errors.email}>
                  이메일
                </CustomFormLabel>

                <FormControl>
                  <Input type="text" {...field} placeholder="Email" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <CustomFormLabel error={form.formState.errors.password}>
                  비밀번호
                </CustomFormLabel>

                <FormControl>
                  <Input type="password" {...field} placeholder="Password" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isExecuting || !form.formState.isValid}
            className="w-full"
          >
            {isExecuting ? <Loader2 className="animate-spin" /> : "로그인"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
