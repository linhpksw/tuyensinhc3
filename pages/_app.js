import '@/styles/globals.css';

import { Inter } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['vietnamese'] });

export default function App({ Component, pageProps }) {
    return (
        <main className={inter.className}>
            <Component {...pageProps} />
            {/* <script src='/js/flowbite.min.js' defer></script> */}
        </main>
    );
}
