import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';

export default function DeleteModal({ onClose, registerPhone }) {
    let [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    function closeModal() {
        onClose();
        setIsOpen(false)
    }

    const router = useRouter();
    const handleDelete = async () => {
        try {
            setIsLoading(true);

            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ registerPhone: registerPhone }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                router.push('/');
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="font-semibold leading-6 text-gray-900">
                                                    Xoá thông tin đăng ký
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className=" text-gray-500">
                                                        Phụ huynh có chắc chắn muốn xoá thông tin đã đăng ký này không? Thao tác này không thể hoàn tác.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            onClick={handleDelete}
                                            disabled={isLoading}
                                            type="button"
                                            className="flex items-center gap-3 w-full justify-center rounded-md bg-red-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        >
                                            {isLoading ?
                                                <div className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-5 w-5"></div>
                                                : null}
                                            {isLoading ? 'Đang xoá...' : 'Xác nhận'}

                                        </button>
                                        <button
                                            onClick={closeModal}
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-200 px-3 py-2 font-semibold text-gray-900 shadow-sm hover:bg-blue-100 sm:mt-0 sm:w-auto"
                                        >
                                            Huỷ bỏ
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
