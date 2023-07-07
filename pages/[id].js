import Confirmation from '@/components/Confirmation';
import Head from 'next/head';
import { client } from '@/lib/mongodb';
import { useState } from 'react';

export default function StudentDetails(props) {
    const [data, setData] = useState(props.data);

    const registerPhone = data[0]?.registerPhone;

    const fetchData = async (registerPhone) => {
        try {
            const response = await fetch(`/api/get?registerPhone=${registerPhone}`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.err(error);
        }
    };

    return (
        <>
            <Head>
                <title>Câu lạc bộ Toán Ánh Sáng</title>
                <meta
                    name='description'
                    content='Trung tâm toán câu lạc bộ Ánh Sáng luyện thi toán từ lớp 8 đến lớp 12'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Confirmation data={data} onDataUpdated={fetchData} registerPhone={registerPhone} />
        </>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query; // Get the ID from the URL path

    // Fetch the student data from the database based on the ID
    try {
        const database = client.db('tuyensinhdb');
        const student = database.collection('student');

        const query = { registerPhone: id };
        const options = {
            projection: { _id: 0 },
        };

        const cursor = student.find(query, options);

        if ((await student.countDocuments(query)) === 0) {
            console.log('No documents found!');
        }

        let docs = [];

        for await (const doc of cursor) {
            docs.push(doc);
        }

        // Pass the student data as props to the StudentDetails component
        return {
            props: {
                data: docs,
            },
        };
    } catch (err) {
        console.error(err);
    } finally {
    }
}
