"use client";

import { useAction } from "next-safe-action/hooks";
import { notificationAction } from "@/app/notification/_action/action";
import { notificationFormSchema } from "@/app/notification/_action/shcema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as z from "zod";
import { CustomAlert } from "@/components/custom-alert";
import SendDialog from "@/app/notification/_components/send-dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function NotificationSend() {
  const [isSubmit, setIsSubmit] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);
  const { execute, isExecuting } = useAction(notificationAction, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      form.reset();
      form.setFocus("title");
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
    },
  });

  const form = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit() {
    if (isSubmit) execute(form.getValues());
  }

  async function handleValidate() {
    return await form.trigger();
  }

  useEffect(() => {
    submitRef.current?.click();
  }, [isSubmit]);

  return (
    <>
      <CustomAlert
        className="mb-4"
        type="default"
        title="푸시 알림 발송 주의사항"
        description="푸시 알림은 전체 유저를 대상으로 발송되며 알림 발송 후 수정이 불가능합니다."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <div className="mb-4">
                {form.formState.errors.title ? (
                  <FormMessage className="mb-2" />
                ) : (
                  <FormLabel className="mb-2">제목</FormLabel>
                )}
                <FormItem className="mb-2">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="3자 이상 20자 이하로 입력해주세요."
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <div className="mb-4">
                {form.formState.errors.content ? (
                  <FormMessage className="mb-2" />
                ) : (
                  <FormLabel className="mb-2">내용</FormLabel>
                )}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="5자 이상 40자 이하로 입력해주세요."
                  />
                </FormControl>
              </div>
            )}
          />

          <Button
            ref={submitRef}
            className="sr-only"
            variant="default"
            type="submit"
            disabled={
              !form.formState.isDirty || !form.formState.isValid || isExecuting
            }
          >
            push notification
          </Button>
        </form>
      </Form>
      <SendDialog
        loading={isExecuting}
        disabled={!form.formState.isDirty || !form.formState.isValid}
        setIsSubmit={setIsSubmit}
        title={form.getValues("title")}
        content={form.getValues("content")}
        onValidate={handleValidate}
      />
    </>
  );
}
