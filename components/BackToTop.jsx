import { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import { ArrowUpIcon } from '@heroicons/react/24/outline';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300 && (window.innerHeight + window.scrollY) < (document.body.offsetHeight - 50)) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-5 right-5  md:bottom-6 md:right-6">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="transition flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-white hover:bg-indigo-400 bg-indigo-500 rounded-full shadow-lg"
                    aria-label="Scroll to top of page"
                >
                    <ArrowUpIcon className="w-4 h-4 md:w-5 md:h-5 stroke-2" />
                </button>
            )}
        </div>
    );
}

export default ScrollToTop;
