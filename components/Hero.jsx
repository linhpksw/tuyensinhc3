import { useRouter } from 'next/router';
import Container from '@/components/Container';
import { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import MyModal from './MyModal';
import ShowImage from './ShowImage';


const Hero = () => {
    const [isCorrect, setIsCorrect] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [registerPhone, setRegisterPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const router = useRouter();

    async function checkIfPhoneExists(phone) {
        const response = await fetch('/api/isExist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone }),
        });

        const data = await response.json();
        return data.exists;
    }

    const handleForm = async (e) => {
        e.preventDefault();

        const inputRegisterPhone = e.target.phone.value;

        const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

        if (regexPhoneNumber.test(inputRegisterPhone)) {
            setIsLoading(true);
            const exists = await checkIfPhoneExists(inputRegisterPhone);

            if (exists) {
                router.push(`/${inputRegisterPhone}`);

            } else {
                setIsCorrect(true);
                setShowModal(true);
                setRegisterPhone(inputRegisterPhone);
            }
        } else {
            setIsCorrect(false);
        }
    }

    const closeModal = () => {
        setShowModal(false); // set showModal state to false when the modal is closed
        setIsLoading(false);
    };


    return (
        <>
            <Container className='flex items-start flex-wrap lg:flex-nowrap lg:gap-10'>
                <div id='about' className='flex items-center w-full lg:w-1/2'>
                    <div className='max-w-2xl mb-8 lg:mb-0'>
                        <h1 className='text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight '>
                            Câu lạc bộ Toán Ánh Sáng
                        </h1>
                        <p className='py-5 tracking-wide leading-loose text-gray-500 lg:text-lg '>
                            Kính gửi các quý vị phụ huynh học sinh và các con! Năm học 2023 - 2024, Câu lạc bộ Toán Ánh Sáng tổ chức: 2 lớp toán 8 ôn thi vào chuyên toán, 2 lớp 9 ôn thi vào chuyên toán và 1 lớp 9 nâng cao ôn thi toán điều kiện vào 10, có kiểm tra đầu vào để xếp lớp. Thông tin chi tiết phụ huynh xem ở phía dưới.
                        </p>

                        <form onSubmit={handleForm} className='mt-5 sm:flex sm:w-full sm:max-w-lg'>
                            <div className='min-w-0 flex-1'>
                                <label htmlFor='hero-email' className='sr-only'>
                                    Phone
                                </label>
                                <input
                                    id='phone'
                                    type='tel'
                                    className='block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-rose-500 focus:ring-rose-500'
                                    placeholder='Nhập số điện thoại phụ huynh'
                                />

                                {!isCorrect &&
                                    <div className='flex items-center gap-2 mt-2'>
                                        <ExclamationCircleIcon className='h-5 w-5 text-red-500' />

                                        <span className='text-red-500'>Số điện thoại không hợp lệ</span>
                                    </div>

                                }
                            </div>
                            <div className='mt-4 sm:mt-0 sm:ml-3'>
                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className={`block w-full rounded-md border border-transparent bg-rose-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10 ${isLoading ? 'cursor-wait opacity-50' : ''}`}>
                                    {isLoading ? (
                                        <>
                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            <span>Đang xử lý...</span>
                                        </>
                                    ) : 'Đăng ký học'}
                                </button>
                            </div>
                        </form>


                        {showModal && <MyModal onClose={closeModal} registerPhone={registerPhone} />}
                    </div>
                </div >

                <div className='flex items-center justify-center w-full lg:w-1/2'>
                    <ShowImage />
                </div>
            </Container >

        </>
    );
};


export default Hero;
