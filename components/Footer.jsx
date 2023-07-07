import Container from "./Container"
import logoImg from '../public/img/logo.svg'
import Image from "next/image"

import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Link as LinkScroll } from 'react-scroll';

const Footer = () => {
    const navigation = [
        { name: 'Về chúng tôi', href: 'about' },
        { name: 'Lịch học', href: 'schedule' },
        { name: 'Giáo viên', href: 'teacher' },
        { name: 'Thông tin', href: 'infor' },
    ]

    return (
        <>
            <div className="container w-full px-8 lg:pt-8 pb-8 lg:pb-16 border-b-[1px] mx-auto xl:px-0">

                <h3 id="infor" className="text-2xl md:text-3xl font-semibold flex justify-center mb-4 uppercase text-gray-600">Thông tin lớp học</h3>

                <div className="flex flex-col gap-5 md:flex-row md:justify-center md:items-center md:gap-20">

                    <div className="flex items-start md:items-center gap-2">
                        <MapPinIcon className="w-9 h-9 sm:w-8 sm:h-8 md:w-7 md:h-7 text-indigo-500" />

                        <p className="text-gray-500">
                            Địa chỉ: <Link className="text-indigo-500 hover:text-indigo-400" href='https://goo.gl/maps/proqtNoL24gvuNxy9'>Trường THPT DL Lê Hồng Phong - số 27 Tô Hiệu, Hà Đông</Link>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />

                        <p className="text-gray-500">Điện thoại: <a href="tel:0362860970" className="text-indigo-500 hover:text-indigo-400 whitespace-nowrap">036 286 0970</a></p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 lg:gap-6 py-8 lg:py-16">
                <nav className="flex flex-wrap justify-center">
                    {navigation.map((item, index) => (
                        <div key={index} className="px-5 py-2">
                            <LinkScroll
                                key={index}
                                activeClass='active'
                                to={item.href}
                                spy={true}
                                smooth={true}
                                duration={700}
                                offset={-150}
                                className="text-gray-500 text-sm md:text-base hover:text-indigo-500 cursor-pointer"
                            >
                                {item.name}
                            </LinkScroll>
                        </div>
                    ))}
                </nav>

                <div className="flex justify-center md:hidden">
                    <Image src={logoImg} alt="logo" width={200} height={200} />
                </div>

                <div className="hidden md:flex justify-center">
                    <Image src={logoImg} alt="logo" width={250} height={250} />
                </div>

                <p className="text-sm text-center text-gray-500">2023 &copy; All rights reserved.</p>
            </div>
        </>

    )
}

export default Footer