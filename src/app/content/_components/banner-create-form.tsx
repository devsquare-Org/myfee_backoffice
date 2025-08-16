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
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { bannerCreateAction } from "@/app/content/_action/action";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  const [clipboardUrl, setClipboardUrl] = useState<string | null>(null);
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
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
                        <AnimatePresence>
                          {clipboardUrl && (
                            <motion.div
                              layout
                              initial={{ opacity: 1, y: 0, height: "auto" }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{
                                opacity: 0,
                                y: -20,
                                height: 0,
                                marginTop: 0,
                                marginBottom: 0,
                                paddingTop: 0,
                                paddingBottom: 0,
                              }}
                              transition={{ duration: 0.1, ease: "easeOut" }}
                            >
                              <ClipboardUrlPreview
                                url={clipboardUrl}
                                onApply={applyClipboardUrl}
                                onDismiss={() => setClipboardUrl(null)}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
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
              배너 생성
            </Button>
          </form>
        </Form>
        <BannerConfirmDialog
          loading={isExecuting}
          disabled={!form.formState.isValid}
          setIsSubmit={setIsSubmit}
          title={form.getValues("title")}
          link={form.getValues("linkUrl")}
          previewUrl={previewUrl!}
          onValidate={handleValidate}
        />
      </div>
      <CustomAlert
        className="mb-4 col-span-1"
        title="배너 추가 주의사항"
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
  );
}
