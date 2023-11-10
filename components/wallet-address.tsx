import React from 'react';
import useClipboard from 'react-use-clipboard';
import { cn } from '@/lib/utils';

const wallet = '0x3e0c3bef809c7d132236A760e8C33907586625A7'

export const WalletAddress = () => {
  
  const [isCopied, setCopied] = useClipboard(wallet);
  return (
    <div onClick={setCopied} className={cn('relative mx-auto inline-flex cursor-pointer items-center gap-3 rounded-[30px] bg-[#331313] px-[25px] py-[15px] font-days', isCopied ? 'ring ring-[#fcb800] text-[#fcb800]': 'text-white')}>
      <p className={cn(isCopied ? 'text-[#fcb800]': 'text-white')}>0x3e0c....86625A7</p>
      <span className='h-[24px] w-[20px] shrink-0'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 18q-.825 0-1.413-.588T7 16V4q0-.825.588-1.413T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.588 1.413T18 18H9Zm0-2h9V4H9v12Zm-4 6q-.825 0-1.413-.588T3 20V7q0-.425.288-.713T4 6q.425 0 .713.288T5 7v13h10q.425 0 .713.288T16 21q0 .425-.288.713T15 22H5Zm4-6V4v12Z"/></svg>
      </span>
      {isCopied && <span className='absolute left-1/2 top-0 translate-x-[-50%] translate-y-[-120%] text-[#fcb800]'>Copied!</span>}
    </div>
  );
};
