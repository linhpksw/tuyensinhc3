import { client } from '@/lib/mongodb';

export default async function handler(req, res) {
    const { body } = req;

    try {
        const database = client.db('tuyensinhdb');
        const student = database.collection('student');

        const docs = body.map((item) => ({ ...item }));

        /*  const docs = body.map((item) => {
            return {
                studentId: item.studentId,
                registerPhone: item.registerPhone,
                studentName: item.studentName,
                studentPhone: item.studentPhone,
                school: item.school,
                year: item.year,
                subject: item.subject,
                backupPhone: item.backupPhone,
                email: item.email,
            };
        }); */

        const result = await student.insertMany(docs, { ordered: true });

        if (result.insertedCount >= 1) {
            res.status(200).json({ status: 'success' });
        } else {
            res.status(400).json({ status: 'failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'failed', message: 'An error occurred on the server.' });
    } finally {
    }
}
