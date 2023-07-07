import Image from 'next/image'
import hocbong1 from '../public/img/hocbong-1.jpg'
import hocbong2 from '../public/img/hocbong-2.jpg'
import hocbong3 from '../public/img/hocbong-3.jpg'
import hocbong4 from '../public/img/hocbong-4.jpg'
import hocbong5 from '../public/img/hocbong-5.jpg'
import thi1 from '../public/img/thi-1.jpg'
import thi2 from '../public/img/thi-2.jpg'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const ShowImage = () => {
    const items = [
        {
            src: thi1,
            alt: 'thi kiểm tra định kỳ hàng tháng 1',
            title: 'Thi kiểm tra định kỳ hàng tháng',
        },
        {
            src: thi2,
            alt: 'thi kiểm tra định kỳ hàng tháng 2',
            title: 'Thi kiểm tra định kỳ hàng tháng',
        },
        {
            src: hocbong1,
            alt: 'trao học bổng 1',
            title: 'Trao học bổng kiểm tra định kỳ',
        },
        {
            src: hocbong2,
            alt: 'trao học bổng 2',
            title: 'Trao học bổng kiểm tra định kỳ',
        },
        {
            src: hocbong3,
            alt: 'trao học bổng 3',
            title: 'Trao học bổng kiểm tra định kỳ',
        },
        {
            src: hocbong4,
            alt: 'trao học bổng 4',
            title: 'Trao học bổng kiểm tra định kỳ',
        },
        {
            src: hocbong5,
            alt: 'trao học bổng 5',
            title: 'Trao học bổng kiểm tra định kỳ',
        },
    ]

    return (
        <div id="default-carousel" className='relative w-full' data-carousel="slide">
            {/* <!-- Carousel wrapper --> */}
            <div className="relative  overflow-hidden rounded-lg h-56 md:h-96 lg:h-80">
                {items.map((item, i) =>
                    <div key={i} data-carousel-item>
                        <Image src={item.src} priority={i == 0 ? true : false} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={item.alt} />

                        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                            <p className="text-center">{item.title}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* <!-- Slider indicators --> */}
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                {items.map((_, i) => (
                    <button key={i} type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label={`Slide ${i + 1}`} data-carousel-slide-to={i}></button>
                ))}
            </div>

            {/* <!-- Slider controls --> */}
            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <ChevronLeftIcon className="text-white w-6 h-6 stroke-2" />
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <ChevronRightIcon className="text-white w-6 h-6 stroke-2" />
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    )
}

export default ShowImage