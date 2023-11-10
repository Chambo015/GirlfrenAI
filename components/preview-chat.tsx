'use client';

import Image from 'next/image';
import React from 'react';
import Lottie from 'lottie-react';
import { AnimatePresence, motion } from 'framer-motion';
import animationBtnRed from '@/public/btn-red.json';


export const PreviewChat = ({ setStart } : any) => {
  function linkTo(link: string) {
    window.open(link, '_blank');
  };
  return (
    <>
      <div className="fixed h-screen w-screen bg-black">
        <Image
          src="/mad-grok-background.png"
          fill={true}
          alt="image bg"
          className="pointer-events-none select-none"
        />
        <motion.div initial={{  y: 200, opacity: 0}}
            animate={{y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1, delay: 0.5 }} className="absolute bottom-[20%] left-[35%] h-[190px] w-[580px]">
          <Image
            src="/text-main.png"
            fill={true}
            alt="text"
            className="pointer-events-none select-none"
          />
          <span className="absolute left-1/2 top-[-50px] h-[38px] w-[38px] rounded-full bg-[#FFCFCF]"></span>
          <span className="absolute left-[40%] top-[-70px] h-[27px] w-[27px] rounded-full bg-[#FFCFCF]"></span>
        </motion.div>
        <motion.button  initial={{  x: 200, opacity: 0}}
            animate={{x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1, delay: 1 }} className="absolute right-[10%] top-[10%] h-[400px] w-[400px]">
          <Image
            src="/smart-contract-btn.png"
            fill={true}
            alt="text"
            className="pointer-events-none select-none"
          />
        </motion.button>
        <motion.button  initial={{  x: 200, opacity: 0}}
            animate={{x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1.5, delay: 0.7 }}
         
          className="absolute right-[20%] top-[35%] h-[380px] w-[300px]"
          onClick={() => linkTo('https://twitter.com/Madgrokai')}
        >
          <a href="https://twitter.com/Madgrokai">
            <Image
              src="/twitter-btn.png"
              fill={true}
              alt="text"
              className="pointer-events-none select-none"
            />
          </a>
        </motion.button>
        <motion.button initial={{  x: 200, opacity: 0}}
            animate={{x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 2, delay: 0.5 }} className="absolute right-[5%] top-[35%] h-[305px] w-[300px]">
          <Image
            src="/telegram-btn.png"
            fill={true}
            alt="text"
            className="pointer-events-none select-none"
          />
        </motion.button>
        <div className="absolute bottom-[8%] right-[10%] flex flex-col items-center justify-center">
          <button onClick={() => setStart()}>
            <Lottie
              animationData={animationBtnRed}
              className="flex w-[700px] cursor-pointer items-center justify-center"
              loop={true}
              width={535}
            />
          </button>
        </div>
      </div>
    </>
  );
};
