'use client';

import { nanoid } from '@/lib/utils';
import { Chat } from '@/components/chat';
import { PreviewChat } from '@/components/preview-chat';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const runtime = 'edge';

export default function IndexPage() {
  const [start, setStart] = useState(false);
  const id = nanoid();

  return (
    <>
      <AnimatePresence>
        {!start &&  (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 isolate z-[999] h-screen w-screen bg-black'
          >
            <PreviewChat setStart={() => setStart(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      {start &&  <Chat id={id} setBack={() => setStart(false)} />}
    </>
  );
}
