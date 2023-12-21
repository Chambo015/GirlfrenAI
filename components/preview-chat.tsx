'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import animationBtnRed from '@/public/btn-red.json';

export const PreviewChat: React.FC<{
  setStart: () => void;
  setOpenDialog: () => void;
}> = ({ setStart, setOpenDialog }) => {
  const [isAngry, setIsAngry] = useState(false);
  function linkTo(link: string) {
    window.open(link, '_blank');
  }
  return (
    <>
      <div className="fixed inset-0 h-[100lvh] w-screen bg-[radial-gradient(74.44%_61.85%_at_47%_50%,_#FF3327_0%,_#F3120C_20%,_#840305_100%)]">
      <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1, delay: 0.5 }}
          className="absolute bottom-[7%] left-0 aspect-[0.5] h-[70vh] blur-[3px]"
        >
          <Image
            src="/left-col-heart.png"
            fill={true}
            alt="text"
            className="pointer-events-none select-none"
          />
        </motion.div>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1, delay: 0.5 }}
          className="absolute bottom-0 right-[3%] aspect-[0.5] h-[70vh] blur-[3px]"
        >
          <Image
            src="/right-col-heart.png"
            fill={true}
            alt="text"
            className="pointer-events-none select-none"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1 }}
          className="absolute left-[calc(50%-calc(779px/2))] top-0 aspect-[3.41] w-[779px] max-md:left-[calc(50%-calc(100vw/2))] max-md:top-[30%] max-md:h-auto max-md:w-screen"
        >
          <Image
            src="/girlfrienai-logo.png"
            fill={true}
            alt="girlfrienai"
            className="pointer-events-none w-full select-none"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '100%', scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ease: 'easeOut', duration: 1 }}
          className="absolute bottom-0 left-[calc(50%-calc(max(50vh,40vw)/2))] aspect-[1.04] w-[max(50vh,40vw)] max-md:left-0 max-md:w-screen"
        >
          <Image
            src="/aigul.png"
            fill={true}
            alt="image bg"
            className="pointer-events-none aspect-[1.04] w-full select-none"
          />
          <Image
            src="/aigul2.png"
            fill={true}
            alt="image bg"
            className={`pointer-events-none aspect-[1.04] w-full select-none drop-shadow-[0px_0px_50px_#710101] transition-opacity duration-700 ${isAngry ? 'opacity-100': 'opacity-0'}` }
          />
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 1, delay: 1.5 }}
            className="absolute right-[65%] top-[64%] aspect-[3.05] h-[min(190px,25%)] max-md:fixed max-md:bottom-[7%] max-md:right-[5vw] max-md:top-[initial] max-md:h-auto max-md:w-[90vw]"
          >
            <Image
              src="/text-main.png"
              fill={true}
              alt="text"
              className="pointer-events-none select-none"
            />
            <span className="absolute right-[-5%] top-0 aspect-square h-[15%] rounded-full bg-[#FFCFCF] max-md:right-[67%] max-md:top-[-30px]"></span>
            <span className="absolute right-[-11%] top-[-5%] aspect-square h-[10%] rounded-full bg-[#ffcfcf] max-md:right-[60%] max-md:top-[-50px]"></span>
          </motion.div>
        </motion.div>
        <motion.button
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1, delay: 0.5 }}
          className="absolute left-[10%] top-[5%] aspect-square w-[min(30vh,30vw)] drop-shadow-[0px_0px_16px_rgba(0,0,0,0.2)] hover:drop-shadow-[0px_0px_16px_rgba(255,255,255,0.5)] max-md:right-0 max-md:top-4 max-md:w-[50vw]"
          onClick={() => setOpenDialog()}
        >
          <Image
            src="/contract-address-heart.png"
            fill={true}
            alt="text"
            className="pointer-events-none select-none"
          />
        </motion.button>
        <motion.button
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.7, delay: 0.7 }}
          className="absolute right-[10%] top-0 aspect-[1.23] w-[min(30vh,30vw)] drop-shadow-[0px_0px_16px_rgba(0,0,0,0.2)] hover:drop-shadow-[0px_0px_16px_rgba(255,255,255,0.5)] max-md:right-[10vw] max-md:top-0 max-md:w-[40vw]"
          onClick={() => linkTo('https://twitter.com/Madgrokai')}
        >
          <a href="https://twitter.com/Madgrokai">
            <Image
              src="/twitter-heart.png"
              fill={true}
              alt="text"
              className="pointer-events-none select-none"
            />
          </a>
        </motion.button>
       
        <div onMouseEnter={() => setIsAngry(true)} onMouseLeave={() => setIsAngry(false)} className="absolute bottom-[5%] right-[6%] flex flex-col items-center justify-center max-md:bottom-[40%] max-md:right-[calc(50%-calc(100vw/2))]">
          <button onClick={() => setStart()}>
            <Lottie
              animationData={animationBtnRed}
              className="flex w-[35vw] cursor-pointer items-center justify-center max-md:w-[100vw]"
              loop={true}
              width={535}
            />
          </button>
        </div>
      </div>
    </>
  );
};
