'use client';

import { nanoid } from '@/lib/utils';
import { Chat } from '@/components/chat';
import { PreviewChat } from '@/components/preview-chat';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { MadButton } from '@/components/ui/MadButton';
import { WalletAddress } from '@/components/wallet-address';
export const runtime = 'edge';

export default function IndexPage() {
  const [start, setStart] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const id = nanoid();
  function linkTo(link: string) {
    window.open(link, '_blank');
  }

  return (
    <>
      <AnimatePresence>
        {!start &&  (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 isolate z-[99] h-screen w-screen bg-black'
          >
            <PreviewChat setStart={() => setStart(true)} setOpenDialog={() => setOpenDialog(true)}/>
          </motion.div>
        )}
      </AnimatePresence>
      {start &&  <Chat id={id} setBack={() => setStart(false)} setOpenDialog={() => setOpenDialog(true)} />}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <MadButton
                  type="submit"
                  variant='secondary'
                  size="lg"
                  className='mx-auto'
                  onClick={() => linkTo('https://dexscreener.com/ethereum/0x3e0c3bef809c7d132236A760e8C33907586625A7')}
                >
                  <span className="bubble blue"></span>
                  <span className="bubble blue"></span>
                  <span className="bubble blue"></span>
                  <span className="bubble blue"></span>
                  <span className="">Dexscreener</span>
                </MadButton>
                <MadButton
                  type="submit"
                  size="lg"
                  className='mx-auto'
                  variant='secondary'
                  onClick={() => linkTo('https://www.dextools.io/app/en/ether/pair-explorer/0x3e0c3bef809c7d132236A760e8C33907586625A7')}
                >
                  <span className="bubble blue"></span>
                  <span className="bubble blue"></span>
                  <span className="bubble blue"></span>
                  <span className="bubble blue"></span>
                  <span className="">Dextools</span>
                </MadButton>
                <WalletAddress />
            </DialogHeader>
            <DialogFooter className="items-center">
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  );
}
