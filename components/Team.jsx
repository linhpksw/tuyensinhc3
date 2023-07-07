import Image from "next/image"
import Container from "./Container"
import giaovien1 from '../public/img/giaovien-1.jpg'
import giaovien2 from '../public/img/giaovien-2.jpg'
import giaovien3 from '../public/img/giaovien-3.jpg'

const Team = () => {
    const people = [
        {
            name: 'Thầy Đinh Hữu Lâm',
            src: giaovien3,
            bio: 'Cựu học sinh chuyên toán khối phổ thông chuyên toán Sư Phạm; Cựu sinh viên lớp chất lượng cao K50 trường ĐHSP Hà Nội; Thạc sĩ chuyên ngành hình học trường ĐH KHTN; giải nhất Giáo viên giỏi thành phố Hà Nội 2014; tổ trưởng tổ Toán trường THPT chuyên Nguyễn Huệ, chuyên viên môn toán khối THPT Sở GDĐT Hà Nội, bồi dưỡng nhiều học sinh giỏi quốc gia.',
        },
        {
            name: 'Thầy Phùng Văn Mạnh',
            src: giaovien1,
            bio: 'Cựu học sinh chuyên toán trường chuyên Hưng Yên, giải NHÌ quốc gia môn toán; lớp trưởng lớp chất lượng cao K50 trường ĐHSP Hà Nội; học bổng toàn phần làm tiến sĩ khoa học tại Pháp; giảng viên tổ giải tích trường ĐHSP Hà Nội, năm 2017 thầy được vinh dự phong chức danh PGS ở tuổi 35.',
        },
        {
            name: 'Cô Đặng Thị Hường',
            src: giaovien2,
            bio: 'Giáo viên toán trường THPT chuyên Nguyễn Huệ, luyện thi vào 10 và thi THPTQG lâu năm.',
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