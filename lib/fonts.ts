import {
  JetBrains_Mono as FontMono,
  Inter as FontSans
} from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const fontDaysOne = localFont({
  src: [
    {
      path: '../assets/fonts/DaysOne-Regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-days'
});
