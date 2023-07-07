import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/NavBar';
import SectionTitle from '@/components/SectionTitle';
import Team from '@/components/Team';
import TimeTable from '@/components/TimeTable';
import Head from 'next/head';
import BackToTop from '@/components/BackToTop';

export default function Home() {
    return (
        <>
            <Head>
                <title>Câu lạc bộ Toán Ánh Sáng</title>
                <meta name='description' content='Trung tâm học toán chất lượng cao từ lớp 8 đến lớp 12' />

                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Navbar />
            <Hero />

            <SectionTitle
                id='schedule'
                pretitle='Thời gian học'
                title='Với giờ giấc cố định trong suốt học kỳ'></SectionTitle>

            <TimeTable />

            <SectionTitle
                id='teacher'
                pretitle='Đội ngũ giáo viên'
                title='Với nhiều năm kinh nghiệm và phương pháp dạy phù hợp'></SectionTitle>

            <Team />

            <BackToTop />

            <Footer />
        </>
    );
}

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get data.
    // You can do whatever you want here.
    // For now, we'll just return an empty object.

    return {
        props: {}, // will be passed to the page component as props
    };
}
