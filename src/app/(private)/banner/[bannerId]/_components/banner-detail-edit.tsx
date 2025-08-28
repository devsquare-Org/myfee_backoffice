'use client';

import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { bannerUpdateAction } from '@/app/(private)/banner/_action/action';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { bannerDetailResponse } from '@/app/(private)/banner/_action/schema';
import BannerImagePreview from '@/app/(private)/banner/_components/banner-image-preview';
import BannerConfirmDialog from '@/app/(private)/banner/_components/banner-confirm-dialog';
import { CustomAlert } from '@/components/custom-alert';
import CustomFormLabel from '@/components/custom-form-label';
import ClipboardUrlProposal from '@/app/(private)/banner/_components/clipboard-url-proposal';
import { Card } from '@/components/ui/card';

// 클라이언트용 스키마 (리졸버용)
const clientSchema = z.object({
  title: z.string().min(3, '제목을 3글자 이상 입력해주세요.'),
  imageFile: z
    .instanceof(File, { message: '이미지를 첨부해주세요.' })
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: '이미지 크기는 5MB 이하여야 합니다.',
    })
    .refine((file) => !file || file.type.startsWith('image/'), {
      message: '이미지 파일만 업로드 가능합니다.',
    }),
  linkUrl: z.url({ message: '링크를 정확하게 입력해주세요.' }),
});

type Props = {
  data: z.infer<typeof bannerDetailResponse>;
};

export default function BannerDetailEdit({ data }: Props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.image);

  const submitRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { execute, isExecuting } = useAction(bannerUpdateAction, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      form.reset();
      setIsSubmit(false);
      fileInputRef.current!.value = '';
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
    },
  });

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    mode: 'onChange',
    defaultValues: {
      title: data.title,
      imageFile: undefined as File | undefined,
      linkUrl: data.linkUrl,
    },
  });

  function onSubmit() {
    if (isSubmit) {
      const formData = new FormData();
      const values = form.getValues();
      formData.append('id', data.id);
      formData.append('title', values.title);
      formData.append('linkUrl', values.linkUrl);
      if (values.imageFile) formData.append('imageFile', values.imageFile);

      execute(formData);
    }
  }

  function handleFileChange(file: File | undefined) {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      form.setValue('imageFile', file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }

  function handleRemoveImage() {
    setPreviewUrl(null);
    form.resetField('imageFile');
    fileInputRef.current!.value = '';
    form.setError('imageFile', {
      type: 'manual',
      message: '이미지를 첨부해주세요.',
    });
  }

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
    <div className='grid grid-cols-4'>
      <Card className='col-span-3 max-w-xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <div className='mb-4'>
                  <FormItem>
                    <CustomFormLabel error={form.formState.errors.title}>
                      제목
                    </CustomFormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='제목을 3글자 이상 입력해주세요.'
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name='linkUrl'
              render={({ field }) => (
                <div className='mb-4'>
                  <FormItem>
                    <CustomFormLabel error={form.formState.errors.linkUrl}>
                      링크
                    </CustomFormLabel>

                    <FormControl>
                      <div className='space-y-2'>
                        <Input
                          {...field}
                          placeholder='링크를 입력해주세요. (http:// 또는 https:// 포함)'
                        />
                        <ClipboardUrlProposal
                          setValue={(name, value, options) =>
                            form.setValue(name as 'linkUrl', value, options)
                          }
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name='imageFile'
              render={({ field: { name, onBlur } }) => (
                <div className='mb-6'>
                  <CustomFormLabel
                    error={form.formState.errors.imageFile}
                    className='mb-2'
                  >
                    배너 이미지
                  </CustomFormLabel>

                  <BannerImagePreview
                    previewUrl={previewUrl}
                    handleRemoveImage={handleRemoveImage}
                    fileInputRef={fileInputRef}
                  />

                  <FormControl>
                    <Input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      name={name}
                      onBlur={onBlur}
                      onChange={(e) => handleFileChange(e.target.files?.[0])}
                      className='hidden'
                    />
                  </FormControl>
                </div>
              )}
            />

            <Button
              ref={submitRef}
              className='sr-only'
              variant='default'
              type='submit'
              disabled={!form.formState.isValid || isExecuting}
            >
              배너 수정
            </Button>
          </form>
        </Form>
        <BannerConfirmDialog
          loading={isExecuting}
          disabled={
            !form.formState.isValid || !form.formState.isDirty || !previewUrl
          }
          setIsSubmit={setIsSubmit}
          title={form.getValues('title')}
          link={form.getValues('linkUrl')}
          previewUrl={previewUrl || ''}
          onValidate={() => form.trigger()}
          mode='edit'
        />
      </Card>
      <AlertArea data={data} />
    </div>
  );
}

function AlertArea({ data }: { data: z.infer<typeof bannerDetailResponse> }) {
  return (
    <div>
      <CustomAlert
        className='mb-4 col-span-1'
        title='배너 생성 및 수정 일시'
        description={
          <ul className='flex flex-col gap-1 mt-2 list-disc list-outside'>
            <li>최초 생성일: {data.createdAt}</li>
            <li>마지막 수정일: {data.updatedAt}</li>
          </ul>
        }
        type='default'
      />
      <CustomAlert
        className='mb-4 col-span-1'
        title='배너 수정 주의사항'
        description={
          <ul className='flex flex-col gap-1 mt-2 list-disc list-outside'>
            <li>배너는 추가 즉시 반영됩니다.</li>
            <li>제목은 3글자 이상 입력해주세요.</li>
            <li>배너 이미지는 5MB 이하여야 합니다.</li>
            <li>이미지 파일만 업로드 가능합니다.</li>
            <li>링크는 가급적 붙여넣기를 사용해주세요.</li>
          </ul>
        }
        type='destructive'
      />
    </div>
  );
}
