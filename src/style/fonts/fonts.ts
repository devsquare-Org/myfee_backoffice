import localFont from 'next/font/local';

export const dm_sans = localFont({
  src: [
    {
      path: './DmSans.ttf',
      weight: '300 400 500 700 900',
    },
  ],
  display: 'swap',
});
