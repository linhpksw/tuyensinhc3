import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='vn'>
            <Head>
                <meta property='og:image' content='https://tuyensinh.clbanhsang.com/img/hocbong-4.jpg' />

                <meta property='og:url' content='https://tuyensinh.clbanhsang.com/' />
                <meta property='og:type' content='website' />
                <meta property='og:title' content='Câu lạc bộ Toán Ánh Sáng' />
                <meta property='og:description' content='Trung tâm học toán chất lượng cao từ lớp 8 đến lớp 12' />
                <script src='/js/flowbite.min.js' defer></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
