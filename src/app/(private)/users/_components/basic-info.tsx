'use client';

import { CustomAlert } from '@/components/custom-alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  nickname: string;
  name: string;
  phone: string;
  email: string;
  point: number;
  shopbyUserId: string;
};

export default function BasicInfo({
  nickname,
  name,
  phone,
  email,
  point,
  shopbyUserId,
}: Props) {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success('클립보드에 복사되었습니다.');
  }

  function handleMallClick() {
    window.open(
      `https://enterprise-remote.shopby.co.kr/crm/${shopbyUserId}`,
      '_blank'
    );
  }

  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-3 max-w-xl'>
        <Label className='mb-2'>닉네임</Label>
        <div className='flex items-center gap-2 mb-6'>
          <Input value={nickname} readOnly />
          <button
            type='button'
            onClick={() => copyToClipboard(nickname)}
            className='border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30'
          >
            <Copy className='w-[14px] h-[14px]' />
          </button>
        </div>

        <Label className='mb-2'>이름</Label>
        <div className='flex items-center gap-2 mb-6'>
          <Input value={name} readOnly />
          <button
            type='button'
            onClick={() => copyToClipboard(name)}
            className='border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30'
          >
            <Copy className='w-[14px] h-[14px]' />
          </button>
        </div>

        <Label className='mb-2'>전화번호</Label>
        <div className='flex items-center gap-2 mb-6'>
          <Input value={phone} readOnly />
          <button
            onClick={() => copyToClipboard(phone)}
            className='border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30'
          >
            <Copy className='w-[14px] h-[14px]' />
          </button>
        </div>

        <Label className='mb-2'>이메일</Label>
        <div className='flex items-center gap-2 mb-6'>
          <Input value={email} readOnly />
          <button
            onClick={() => copyToClipboard(email)}
            className='border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30'
          >
            <Copy className='w-[14px] h-[14px]' />
          </button>
        </div>

        <Label className='mb-2'>보유 포인트</Label>
        <div className='flex items-center gap-2  mb-6'>
          <Input value={point.toLocaleString()} readOnly />
          <button
            onClick={() => copyToClipboard(point.toLocaleString())}
            className='border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30'
          >
            <Copy className='w-[14px] h-[14px]' />
          </button>
        </div>

        <Label className='mb-2'>쇼핑몰 아이디</Label>
        <div className='flex items-center gap-2'>
          <Input value={shopbyUserId} readOnly />

          <button
            type='button'
            onClick={handleMallClick}
            className='border p-1 rounded-md h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-secondary dark:bg-input/30'
          >
            <ExternalLink className='w-[14px] h-[14px]' />
          </button>
        </div>
      </div>
      <CustomAlert
        className='mb-4 col-span-1'
        title='유저 정보 안내'
        description={
          <ul className='flex flex-col gap-1 mt-2 list-disc list-outside'>
            <li>유저 상세 정보는 관리자가 수정할 수 없습니다.</li>
            <li>
              주문 내역이나 적립금, 쿠폰 등의 쇼핑 데이터는 쇼핑 어드민에서 확인
              가능합니다.
            </li>
          </ul>
        }
        type='default'
      />
    </div>
  );
}
