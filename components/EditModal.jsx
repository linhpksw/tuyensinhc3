import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment } from 'react'
import { UserIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function EditModal({ data, onDataUpdated, registerPhone, onClose }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    function closeModal() {
        onClose();
        setIsOpen(false);
    }

    const [numStudents, setNumStudents] = useState(data.length);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const output = data.map((v, i) => {
            return {
                studentId: v.studentId,
                time: new Date(),
                registerPhone: v.registerPhone,
                studentName: e.target[`studentName${i + 1}`].value,
                studentPhone: e.target[`studentPhone${i + 1}`].value,
                school: e.target[`school${i + 1}`].value,
                year: e.target[`year${i + 1}`].value,
                subject: e.target[`subject${i + 1}`].value,
                backupPhone: e.target.backupPhone.value,
                email: e.target.email.value
            }
        })

        await updateData(output);
    }

    const updateData = async (data) => {
        try {
            // Delete the old submission
            await deleteOldData(data);
            // Add the new submission
            const addResponse = await addNewData(data);

            if (addResponse.status === 'success') {
                const emailResponse = await fetch("/api/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ data }),
                });

                if (emailResponse.ok) {
                    console.log("Confirmation email sent!");
                } else {
                    console.log("Failed to send confirmation email!");
                }
                closeModal();
                onDataUpdated(registerPhone);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteOldData = async (data) => {
        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ registerPhone: data[0].registerPhone }),
            });

            const responseData = await response.json();

            if (responseData.status === 'error') {
                throw new Error('Failed to delete old submission');
            }
        } catch (error) {
            throw new Error('An error occurred while deleting old submission');
        }
    };

    const addNewData = async (data) => {
        try {
            const JSONdata = JSON.stringify(data);
            const endpoint = '/api/add';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            };

            const response = await fetch(endpoint, options);
            const responseData = await response.json();

            return responseData;
        } catch (error) {
            throw new Error('An error occurred while adding new submission');
        }
    };


    const subjectOptions = [
        'Lớp 10A0 - vận dụng cao',
        // 'Lớp 10A1 - nâng cao',
    ];

    const renderStudentFields = () => {
        let fields = [];

        for (let i = 1; i <= numStudents; i++) {
            const student = data[i - 1] || {};
            // console.log(student)
            fields.push(
                <div key={i}>
                    {/* Thong tin hoc sinh */}
                    <div className='flex items-center gap-1 mb-5'>
                        <UserIcon className="h-6 w-6 text-rose-600" />
                        <span className='text-rose-600 font-medium text-lg'>{numStudents == 1 ? 'Thông tin học sinh' : 'Thông tin học sinh thứ ' + i}</span>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        {/* Ho va ten */}
                        <div className="relative w-full mb-6 group">
                            <input
                                defaultValue={student.studentName || ''}

                                id={`studentName${i}`} type="text" name="studentName" className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label
                                htmlFor="studentName" className=" peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Họ tên <span className='text-red-600'>*</span></label>
                        </div>
                        {/* Nam sinh */}
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                defaultValue={student.year || ''}
                                id={`year${i}`} type="number" min="2000" max="2023" name="year" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="year" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Năm sinh <span className='text-red-600'>*</span></label>
                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 md:gap-6">
                        {/* Truong */}
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                defaultValue={student.school || ''}
                                id={`school${i}`} type="text" name="school" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="school" className="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Trường <span className='text-red-600'>*</span></label>
                        </div>
                        {/* So dien thoai */}
                        <div className="relative z-0 w-full mb-3 group">
                            <input
                                defaultValue={student.studentPhone || ''}
                                id={`studentPhone${i}`} type="tel" name="studentPhone" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " pattern="0[35789][0-9]{8}" title="Số điện thoại không hợp lệ." />

                            <label htmlFor="studentPhone" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại</label>
                        </div>
                    </div>

                    <div>
                        <select
                            defaultValue={student.subject || ''}
                            id={`subject${i}`} className="mb-5 block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-300 peer" required>
                            <option value="" className='text-gray-500'>Chọn lớp học...</option>
                            {subjectOptions.map((option) => (
                                <option key={option} value={option} className=' text-gray-500'>{option}</option>
                            ))}
                        </select>
                    </div>

                </div>
            );
        }
        return fields;
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

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md lg:max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h1"
                                        className="text-2xl  font-bold text-gray-900 mb-4"
                                    >
                                        Phiếu đăng kí học tại lớp toán Câu lạc bộ Ánh Sáng
                                    </Dialog.Title>

                                    <form onSubmit={handleSubmit}>
                                        {/* <div>
                                            <select id="quantity" value={numStudents} onChange={handleNumStudentsChange} className="mb-5 block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">

                                                {[1, 2, 3, 4, 5].map((num, id) =>
                                                    (<option key={id} value={num} className=" text-gray-500">Đăng kí cho {num} học sinh</option>)
                                                )}
                                            </select>
                                        </div> */}

                                        {numStudents > 0 && renderStudentFields()} {/* Render the student fields only if numStudents > 0 */}

                                        {/* Phan ko lap lai */}
                                        <div className='flex items-center gap-1 mb-5'>
                                            <UsersIcon className="h-6 w-6 text-rose-600" />
                                            <span className='text-rose-600 font-medium text-lg'>Thông tin phụ huynh</span>
                                        </div>

                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            {/* Backup Phone */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input
                                                    defaultValue={data[0].backupPhone || ''}
                                                    type="tel" name="backupPhone" id="backupPhone" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " pattern="0[35789][0-9]{8}" title="Số điện thoại không hợp lệ." required />

                                                <label htmlFor="backupPhone" className="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại dự phòng <span className='text-red-600'>*</span></label>
                                            </div>
                                            {/* Email */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input
                                                    defaultValue={data[0].email || ''}
                                                    type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="email" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Email phụ huynh <span className='text-red-600'>*</span></label>
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-2 gap-5">
                                            <button
                                                className='flex items-center gap-3 bg-blue-100 rounded-md border border-transparent  font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 px-4 py-2'
                                                type="submit" disabled={isLoading}>
                                                {isLoading ?
                                                    <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-900 border-2 h-5 w-5"></div>
                                                    : null}

                                                {isLoading ? 'Đang cập nhật...' : 'Chỉnh sửa'}


                                            </button>

                                            <button type="button" onClick={closeModal} className="text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg px-4 py-2 text-center">Huỷ bỏ</button>

                                        </div>
                                    </form>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
