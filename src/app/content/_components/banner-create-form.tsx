"use client";

import { useAction } from "next-safe-action/hooks";
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
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import { bannerCreateAction } from "@/app/content/_action/action";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CreateDialog from "@/app/content/_components/create-dialog";

// 클라이언트용 스키마 (리졸버용)
const clientSchema = z.object({
  title: z.string().min(3, "제목을 3자 이상 입력해주세요."),
  imageFile: z
    .instanceof(File, { message: "이미지를 첨부해주세요." })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "이미지 크기는 5MB 이하여야 합니다.",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "이미지 파일만 업로드 가능합니다.",
    }),
  linkUrl: z.url({ message: "링크를 정확하게 입력해주세요." }),
});

export default function BannerCreateForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { execute, isExecuting } = useAction(bannerCreateAction, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      form.reset();

      // 미리보기 초기화
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsSubmit(false);
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
    },
  });

  const defaultValues = {
    title: "",
    imageFile: undefined as File | undefined,
    linkUrl: "",
  };

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {
    if (isSubmit) {
      const formData = new FormData();
      const values = form.getValues();

      formData.append("title", values.title);
      formData.append("linkUrl", values.linkUrl);
      if (values.imageFile) formData.append("imageFile", values.imageFile);

      execute(formData);
    }
  }

  async function handleValidate() {
    return await form.trigger();
  }

  function handleFileChange(file: File | undefined) {
    if (file) {
      // 이전 미리보기 URL 정리
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      // 새 미리보기 URL 생성
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      form.setValue("imageFile", file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }

  function handleRemoveImage() {
    // 미리보기 URL 정리
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    // 폼 값 초기화
    form.resetField("imageFile");

    // 파일 입력 초기화
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // 컴포넌트 언마운트 시 URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    submitRef.current?.click();
    setIsSubmit(false);
  }, [isSubmit]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <div className="mb-4">
                <FormItem>
                  {form.formState.errors.title ? (
                    <FormMessage />
                  ) : (
                    <FormLabel>제목</FormLabel>
                  )}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="제목을 3자 이상 입력해주세요."
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="linkUrl"
            render={({ field }) => (
              <div className="mb-4">
                <FormItem>
                  {form.formState.errors.linkUrl ? (
                    <FormMessage />
                  ) : (
                    <FormLabel>링크</FormLabel>
                  )}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="링크를 입력해주세요. (http:// 또는 https:// 포함)"
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="imageFile"
            render={({ field: { name, onBlur } }) => (
              <div className="mb-6">
                {form.formState.errors.imageFile ? (
                  <FormMessage className="mb-2" />
                ) : (
                  <FormLabel className="mb-2">배너 이미지</FormLabel>
                )}

                {previewUrl ? (
                  // 미리보기가 있을 때
                  <BannerImagePreview
                    previewUrl={previewUrl}
                    handleRemoveImage={handleRemoveImage}
                  />
                ) : (
                  // 미리보기가 없을 때
                  <BannerImageUploadButton fileInputRef={fileInputRef} />
                )}

                <FormControl>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                    className="hidden"
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
            disabled={!form.formState.isValid || isExecuting}
          >
            배너 생성
          </Button>
        </form>
      </Form>
      <CreateDialog
        loading={isExecuting}
        disabled={!form.formState.isValid}
        setIsSubmit={setIsSubmit}
        title={form.getValues("title")}
        link={form.getValues("linkUrl")}
        previewUrl={previewUrl!}
        onValidate={handleValidate}
      />
    </>
  );
}

function BannerImagePreview({
  previewUrl,
  handleRemoveImage,
}: {
  previewUrl: string;
  handleRemoveImage: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="relative w-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border">
          <Image
            src={previewUrl}
            alt="배너 미리보기"
            fill
            className="object-cover"
          />
        </div>
        <button
          type="button"
          onClick={handleRemoveImage}
          className="absolute -top-2 -right-2 bg-secondary rounded-full p-1 shadow-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function BannerImageUploadButton({
  fileInputRef,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <FormItem>
      <FormLabel
        className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer w-full aspect-[4/3] dark:bg-input/30"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-8 h-8 text-muted-foreground" />
        <div className="text-center">
          <p className="text-sm font-medium">이미지를 선택해주세요</p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, GIF (최대 5MB)
          </p>
        </div>
      </FormLabel>
    </FormItem>
  );
}
