import Image from "next/image"
import Container from "./Container"
import giaovien1 from '../public/img/giaovien-1.jpg'
import giaovien2 from '../public/img/giaovien-2.jpg'
import giaovien3 from '../public/img/giaovien-3.jpg'
import giaovien4 from '../public/img/giaovien-4.jpg'
import giaovien5 from '../public/img/giaovien-5.jpg'

const Team = () => {
    const people = [
        {
            name: 'Thầy Đinh Hữu Lâm',
            src: giaovien3,
            bio: 'Cựu học sinh chuyên toán khối phổ thông chuyên toán Sư Phạm; Cựu sinh viên lớp chất lượng cao K50 trường ĐHSP Hà Nội; Thạc sĩ chuyên ngành hình học trường ĐH KHTN; giải nhất Giáo viên giỏi thành phố Hà Nội 2014; Hiệu phó trường THPT chuyên Nguyễn Huệ, chuyên viên môn toán khối THPT Sở GDĐT Hà Nội, bồi dưỡng nhiều học sinh giỏi quốc gia.',
        },
        {
            name: 'Thầy Nghiêm Ngọc Phương',
            src: giaovien5,
            bio: 'Cựu học sinh chuyên toán Nguyễn Huệ, Giải Ba HSG QG môn toán, Cựu sinh viên lớp chất lượng cao K54 trường ĐHSP Hà Nội; GVCN lớp 10 chuyên toán THPT chuyên Nguyễn Huệ, tổ trưởng tổ Toán trường THPT chuyên Nguyễn Huệ, bồi dưỡng nhiều học sinh giỏi quốc gia.',
        },
        {
            name: 'Cô Đặng Thị Hường',
            src: giaovien2,
            bio: 'Thạc sĩ toán học - Giáo viên toán trường THPT chuyên Nguyễn Huệ, luyện thi vào 10 và thi THPTQG lâu năm.',
        },
        {
            name: 'Thầy Trần Bá Hưng',
            src: giaovien4,
            bio: 'Giáo viên toán trường THPT chuyên Nguyễn Huệ, tốt nghiệp bằng xuất sắc ĐHSP toán, được vào thẳng hệ cao học, điểm 10 thi THPTQG toán 2019.',
        },
    ]

    return (
        <Container>
            <div className="space-y-6 md:space-y-12">
                {
                    people.map((person) =>
                        <div key={person.name} className="md:flex gap-10 pb-6 md:pb-12 pt-[10px] md:pt-[1px] border-b-[1px] md:tracking-wide">
                            <div className=" md:w-1/3 lg:w-1/4">
                                <Image src={person.src} className="object-cover max-w-[150px] md:max-w-full rounded-lg shadow-lg" alt='teacher' />
                            </div>

                            <div className="mt-10 md:mt-2 md:w-2/3 lg:w-3/4">
                                <h3 className="text-2xl font-medium leading-6 mb-3 text-slate-700">{person.name}</h3>

                                <p className="text-gray-500 mt-5 leading-loose text-lg">{person.bio}</p>
                            </div>
                        </div>
                    )
                }

            </div>


        </Container>
    )
}

export default Team