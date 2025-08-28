'use server';

import { updateUserPointRequestParams } from '@/app/(private)/users/_action/schema';
import { actionClient } from '@/lib/utils';

export const updateUserPointAction = actionClient
  .inputSchema(updateUserPointRequestParams)
  .action(async ({ parsedInput }) => {
    const typeText = parsedInput.type === 'add' ? '지급' : '차감';
    console.log('>>>>>', parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: `포인트가 ${typeText} 되었습니다.` };
  });
