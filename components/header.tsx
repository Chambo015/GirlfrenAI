import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { MadButton } from './ui/MadButton';
import { IconContract } from './icons/icon-contract';
import { IconTwitter } from './icons/icon-twitter';
import { IconTelegram } from './icons/icon-telegram';
import { WalletAddress } from './wallet-address';

export function Header({ setBack, setOpenDialog }: any) {
  function linkTo(link: string) {
    window.open(link, '_blank');
  }
  return (
   <>
      <header className="sticky top-0 z-50 flex h-20 w-full shrink-0 items-center justify-between rounded-b-[140px] border-b border-black bg-[#0D001E] px-4 backdrop-blur-xl max-md:rounded-b-[40px]">
        <div className="flex w-full items-center justify-between px-5 max-md:px-2">
          <Image
            width={180}
            height={50}
            src="/MadGrokHeader.png"
            alt="logo"
            className=" ml-5 mr-auto shrink-0 max-md:ml-0 max-md:w-[170px] "
            style={{ cursor: 'pointer' }}
            onClick={() => setBack()}
          />
  
          <div className="mr-5 flex items-center gap-9 max-md:gap-3">
            <MadButton
              type="submit"
              variant="gray"
              size="md"
              onClick={() => linkTo('https://twitter.com/Madgrokai')}
            >
              <span className="bubble gray max-sm:hidden"></span>
              <span className="bubble gray max-sm:hidden"></span>
              <span className="bubble gray max-sm:hidden"></span>
              <span className="max-md:hidden"> twitter/x</span>
              <span className="md:hidden">
                <IconTwitter />
              </span>
            </MadButton>
            <MadButton
              type="submit"
              variant="gray"
              size="md"
              onClick={() => linkTo('https://t.me/madgrokportal')}
            >
              <span className="bubble gray max-sm:hidden"></span>
              <span className="bubble gray max-sm:hidden"></span>
              <span className="bubble gray max-sm:hidden"></span>
              <span className="max-md:hidden"> telegram</span>
              <span className="md:hidden">
                <IconTelegram />
              </span>
            </MadButton>
            <MadButton
              type="submit"
              variant="gray"
              size="md"
              onClick={() => setOpenDialog(true)}
            >
              <span className="bubble gray max-sm:hidden"></span>
              <span className="bubble gray max-sm:hidden"></span>
              <span className="bubble gray max-sm:hidden"></span>
              <span className="max-md:hidden">contract address</span>
              <span className="md:hidden">
                <IconContract />
              </span>
            </MadButton>
          </div>
        </div>
        
      </header>
   </>
  );
}
