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
import { bannerUpdateAction } from "@/app/content/_action/action";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { bannerDetailSchema } from "@/app/content/_action/schema";
import BannerImagePreview from "@/app/content/_components/banner-image-preview";
import BannerImageUploadButton from "@/app/content/_components/banner-image-upload-button";
import ClipboardUrlPreview from "@/app/content/_components/clipboard-url-preview";
import BannerConfirmDialog from "@/app/content/_components/banner-confirm-dialog";
import { CustomAlert } from "@/components/custom-alert";

// 클라이언트용 스키마 (리졸버용)
const clientSchema = z.object({
  title: z.string().min(3, "제목을 3글자 이상 입력해주세요."),
  imageFile: z
    .instanceof(File, { message: "이미지를 첨부해주세요." })
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "이미지 크기는 5MB 이하여야 합니다.",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "이미지 파일만 업로드 가능합니다.",
    }),
  linkUrl: z.url({ message: "링크를 정확하게 입력해주세요." }),
});

type Props = {
  data: z.infer<typeof bannerDetailSchema>;
};

export default function BannerDetailEdit({ data }: Props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.image);
  const [clipboardUrl, setClipboardUrl] = useState<string | null>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { execute, isExecuting } = useAction(bannerUpdateAction, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      setIsSubmit(false);

      // 폼 상태 초기화 (isDirty를 false로 만들기 위해)
      const currentValues = form.getValues();
      form.reset({
        title: currentValues.title,
        linkUrl: currentValues.linkUrl,
        imageFile: undefined, // 파일은 항상 undefined로 초기화
      });

      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
    },
  });

  const defaultValues = {
    title: data.title,
    imageFile: undefined as File | undefined,
    linkUrl: data.linkUrl,
  };

  // 클립보드 URL을 input에 적용하는 함수
  function applyClipboardUrl() {
    if (clipboardUrl) {
      form.setValue("linkUrl", clipboardUrl, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setClipboardUrl(null);
    }
  }

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {
    if (isSubmit) {
      const formData = new FormData();
      const values = form.getValues();

      formData.append("id", data.id);
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
      // 이전 미리보기 URL 정리 (기존 이미지가 아닌 경우)
      if (previewUrl && previewUrl !== data.image) {
        URL.revokeObjectURL(previewUrl);
      }

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
    // 미리보기 URL 정리 (기존 이미지가 아닌 경우)
    if (previewUrl && previewUrl !== data.image) {
      URL.revokeObjectURL(previewUrl);
    }

    // 미리보기 제거 (null로 설정하여 업로드 버튼 표시)
    setPreviewUrl(null);

    // 폼 값 초기화
    form.resetField("imageFile");

    // 파일 입력 초기화
    if (fileInputRef.current) fileInputRef.current.value = "";

    // 폼의 dirty 상태를 수동으로 설정 (이미지 제거도 변경사항으로 간주)
    form.setValue("title", form.getValues("title"), { shouldDirty: true });
  }

  // 컴포넌트 마운트 시 클립보드 확인
  useEffect(() => {
    async function checkClipboardOnMount() {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const clipboardText = await navigator.clipboard.readText();
        const urlPattern = /https:\/\/[^\s]+/g;
        const urls = clipboardText.match(urlPattern);

        if (urls && urls.length > 0) {
          const extractedUrl = urls[0];
          setClipboardUrl(extractedUrl); // 바로 input에 넣지 않고 미리보기로 설정
        }
      }
    }

    checkClipboardOnMount();
  }, []);

  // 컴포넌트 언마운트 시 URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== data.image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, data.image]);

  useEffect(() => {
    submitRef.current?.click();
    setIsSubmit(false);
  }, [isSubmit]);

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 max-w-xl">
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
                        placeholder="제목을 3글자 이상 입력해주세요."
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
                      <div className="space-y-2">
                        <Input
                          {...field}
                          placeholder="링크를 입력해주세요. (http:// 또는 https:// 포함)"
                        />
                        {clipboardUrl && (
                          <ClipboardUrlPreview
                            url={clipboardUrl}
                            onApply={applyClipboardUrl}
                            onDismiss={() => setClipboardUrl(null)}
                          />
                        )}
                      </div>
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
              배너 수정
            </Button>
          </form>
        </Form>
        <BannerConfirmDialog
          loading={isExecuting}
          disabled={!form.formState.isValid || !form.formState.isDirty}
          setIsSubmit={setIsSubmit}
          title={form.getValues("title")}
          link={form.getValues("linkUrl")}
          previewUrl={previewUrl!}
          onValidate={handleValidate}
          mode="edit"
        />
      </div>
      <div>
        <CustomAlert
          className="mb-4 col-span-1"
          title="배너 생성 및 수정 일시"
          description={
            <ul className="flex flex-col gap-1 mt-2 list-disc list-outside">
              <li>최소 생성일: {data.createdAt}</li>
              <li>마지막 수정일: {data.updatedAt}</li>
            </ul>
          }
          type="default"
        />
        <CustomAlert
          className="mb-4 col-span-1"
          title="배너 수정 주의사항"
          description={
            <ul className="flex flex-col gap-1 mt-2 list-disc list-outside">
              <li>배너는 추가 즉시 반영됩니다.</li>
              <li>제목은 3글자 이상 입력해주세요.</li>
              <li>배너 이미지는 5MB 이하여야 합니다.</li>
              <li>이미지 파일만 업로드 가능합니다.</li>
              <li>링크는 가급적 붙여넣기를 사용해주세요.</li>
            </ul>
          }
          type="destructive"
        />
      </div>
    </div>
  );
}
