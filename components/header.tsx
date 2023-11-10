import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
// import { auth } from '@/auth';
// import { clearChats } from '@/app/actions';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sidebar } from '@/components/sidebar';
import { SidebarList } from '@/components/sidebar-list';
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons';
import { SidebarFooter } from '@/components/sidebar-footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { ClearHistory } from '@/components/clear-history';
import { UserMenu } from '@/components/user-menu';
import { LoginButton } from '@/components/login-button';
import Image from 'next/image';
import { MadButton } from './ui/MadButton';
import { IconContract } from './icons/icon-contract';
import { IconTwitter } from './icons/icon-twitter';
import { IconTelegram } from './icons/icon-telegram';

export function Header({setBack}: any) {
  // const session = await auth();
  return (
    <header className="sticky top-0 z-50 flex h-20 w-full shrink-0 items-center justify-between rounded-b-[140px] border-b border-black bg-[#0D001E] px-4 backdrop-blur-xl max-md:rounded-b-[40px]">
      <div className="flex w-full items-center justify-between px-5 max-md:px-2">
        <Image
          width={180}
          height={50}
          src="/MadGrokHeader.png"
          alt="logo"
          className=" ml-5 mr-auto shrink-0 max-md:ml-0 max-md:w-[170px] "
          style={{cursor: 'pointer'}}
          onClick={() => setBack()}
        />

        <div className='mr-5 flex items-center gap-9 max-md:gap-3'>
        <MadButton
                  type="submit"
                  variant="gray"
                  size="md" 
                >
                  <span className='bubble gray max-sm:hidden'></span>
        <span className='bubble gray max-sm:hidden'></span>
        <span className='bubble gray max-sm:hidden'></span>
        <span className='max-md:hidden'> twitter/x</span>
                  <span className='md:hidden'><IconTwitter /></span>
                </MadButton>
                <MadButton
                  type="submit"
                  variant="gray"
                  size="md" 
                >
                  <span className='bubble gray max-sm:hidden'></span>
        <span className='bubble gray max-sm:hidden'></span>
        <span className='bubble gray max-sm:hidden'></span>
        <span className='max-md:hidden'> telegram</span>
                  <span className='md:hidden'><IconTelegram /></span>
                </MadButton>
                <MadButton
                  type="submit"
                  variant="gray"
                  size="md" 
                > <span className='bubble gray max-sm:hidden'></span>
                <span className='bubble gray max-sm:hidden'></span>
                <span className='bubble gray max-sm:hidden'></span>
                  <span className='max-md:hidden'>smart contract</span>
                  <span className='md:hidden'><IconContract/></span>
                 
                </MadButton>
        </div>
      </div>
      {/* <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="hidden ml-2 md:flex">GitHub</span>
        </a>
        <a
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          target="_blank"
          className={cn(buttonVariants())}
        >
          <IconVercel className="mr-2" />
          <span className="hidden sm:block">Deploy to Vercel</span>
          <span className="sm:hidden">Deploy</span>
        </a>
      </div> */}
    </header>
  );
}
