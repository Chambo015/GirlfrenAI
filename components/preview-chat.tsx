'use client';

import Image from 'next/image';
import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import animationBtnRed from '@/public/btn-red.json';

export const PreviewChat: React.FC< {setStart: () => void}> = ({ setStart }) => {
  function linkTo(link: string) {
    window.open(link, '_blank');
  }
  return (
    <>
      <div className="fixed inset-0 h-screen w-screen bg-black">
        <Image
          src="/mad-background.png"
          fill={true}
          alt="image bg"
          className="pointer-events-none select-none object-cover max-md:object-right-bottom"
        />
        <div className="absolute bottom-[3vh] left-[15vw] aspect-[0.89] w-[max(50vh,40vw)] max-md:left-0 max-md:w-screen">
          <Image
            src="/mad-grok.png"
            fill={true}
            alt="image bg"
            className="pointer-events-none aspect-[0.89] w-full select-none"
          />
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1, }}
            transition={{ ease: 'easeOut', duration: 1, delay: 0.5 }}
            className="absolute left-[31%] top-[68%] aspect-[3.05] h-[min(190px,25%)] max-md:left-[5vw] max-md:top-[initial] max-md:bottom-[7%] max-md:h-auto max-md:w-[90vw]"
          >
            <Image
              src="/text-main.png"
              fill={true}
              alt="text"
              className="pointer-events-none select-none"
            />
            <span className="absolute left-[47%] top-[-50px] aspect-square h-[20%] rounded-full bg-[#FFCFCF] max-md:left-[67%] max-md:top-[-30px]"></span>
            <span className="absolute left-[40%] top-[-70px] aspect-square h-[15%] rounded-full bg-[#FFCFCF] max-md:left-[60%] max-md:top-[-50px]"></span>
          </motion.div>
        </div>
        <motion.button
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1, delay: 1 }}
          className="absolute right-[10%] top-[10%] aspect-square w-[min(30vh,30vw)] max-md:right-0 max-md:top-4 max-md:w-[50vw]"
        >
          <Image
            src="/smart-contract-btn.png"
            fill={true}
            alt="text"
            className="pointer-events-none select-none"
          />
        </motion.button>
        <motion.button
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1.5, delay: 0.7 }}
          className="absolute right-[20%] top-[35%] aspect-[0.88] w-[min(25vh,25vw)] max-md:left-[30vw] max-md:top-[40vw] max-md:w-[40vw]"
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
        <motion.button
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 2, delay: 0.5 }}
          className="absolute right-[5%] top-[35%] aspect-square w-[min(25vh,25vw)] max-md:left-2 max-md:top-6 max-md:w-[40vw] max-sm:right-[none]"
          onClick={() => linkTo('https://t.me/madgrokportal')}
        >
          <Image
            src="/telegram-btn.png"
            fill={true}
            alt="text"
            className="pointer-events-none select-none"
          />
        </motion.button>
        <div className="absolute bottom-[5%] right-[5%] flex flex-col items-center justify-center max-md:bottom-1/2 max-md:right-[5vw]">
          <button onClick={() => setStart()}>
            <Lottie
              animationData={animationBtnRed}
              className="flex w-[35vw] cursor-pointer items-center justify-center max-md:w-[90vw]"
              loop={true}
              width={535}
            />
          </button>
        </div>
      </div>
    </>
  );
};
