import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (req, res) => {
    try {
        const { data } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'clbtoananhsang@gmail.com',
                pass: 'wisyjomatdyzotsq',
            },
        });

        const htmlContent = generateHtmlContent(data);

        const mailOptions = {
            from: '"Câu lạc bộ Toán Ánh Sáng" <' + 'clbtoananhsang@gmail.com' + '>',
            to: data[0].email,
            subject: 'Thư xác nhận đăng ký học thành công',
            html: htmlContent,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred while sending email:', error);
                res.status(500).send(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent!');
            }
        });
    } catch (error) {
        console.log('An error occurred in the sendEmail function:', error);
        res.status(500).send(error);
    }
};

export default sendEmail;

function generateHtmlContent(data) {
    const info = {
        'Lớp 10A0 - vận dụng cao': 'Khai giảng vào 19h30 Thứ Tư ngày 02/08.',
        'Lớp 10A1 - nâng cao': 'Khai giảng vào 19h30 Thứ Tư ngày 02/08.',
    };

    const note = info[data[0].subject];

    const studentNum = data.length;

    let htmlContent = `
    <head>
  <style>
    body {
      line-height: 1.5;
      letter-spacing: 0.01em;
    }

    .info-table {
      width: 500px;
      border-collapse: collapse;
      color: #374151;
    }
    .info-table td {
      padding-top: 10px;
      padding-bottom: 10px;
      padding-right: 40px;
      padding-left: 40px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <p style="color: #374151;">Câu lạc bộ Toán Ánh Sáng xin thông báo,</p>

  <p style="color: #374151;">
    Đơn đăng kí học cho con đã được trung tâm xác nhận. Phụ huynh vui lòng kiểm tra kĩ lại thông tin bên dưới.
  </p>

  <p style="color: #e11d48;">
    Lưu ý: ${note}
  </p>

  <p style="color: #e11d48;">
    Cụ thể thông tin chi tiết, lớp toán sẽ gửi đến quý phụ huynh trong thời gian sớm nhất. Phụ huynh chú ý kiểm tra email và điện thoại để không lỡ mất các thông tin quan trọng ạ.
  </p>

  ${data
      .map(
          (item, index) => `
  <h2 style="color: #e11d48">${studentNum > 1 ? 'Thông tin học sinh thứ ' + (index + 1) : 'Thông tin học sinh'}</h2>
  <table class="info-table">
    <tr style="background-color: #f2f2f2;">
      <td>Họ và tên</td>
      <td>${item.studentName}</td>
    </tr>
    <tr>
      <td>Đăng kí lớp học</td>
      <td>${item.subject}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <td>Năm sinh</td>
      <td>${item.year}</td>
    </tr>
    <tr>
      <td>Trường</td>
      <td>${item.school}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <td>Số điện thoại</td>
      <td>${item.studentPhone}</td>
    </tr>
  </table>
  `
      )
      .join('')}

  <h2 style="color: #e11d48">Thông tin phụ huynh</h2>
  <table class="info-table">
    <tr style="background-color: #f2f2f2;">
      <td>Số điện thoại đăng ký</td>
      <td>${data[0].registerPhone}</td>
    </tr>
    <tr>
      <td>Số điện thoại dự phòng</td>
      <td>${data[0].backupPhone}</td>
    </tr>
    <tr style="background-color: #f2f2f2;">
      <td>Email</td>
      <td>${data[0].email}</td>
    </tr>
  </table>

  <p>
    Nếu thông tin trên không chính xác, phụ huynh nhấn chỉnh sửa
    <a href="https://tuyensinhc3.clbanhsang.com/${data[0].registerPhone}"
      >tại đây</a
    >.
  </p>

  <hr style="margin-top: 30px" />

  <a href="https://tuyensinh.clbanhsang.com">
    <img
      src="https://tuyensinh.clbanhsang.com/img/logo-alter.png"
      alt="Logo Câu lạc bộ Toán Ánh Sáng"
      style="width:252px; height:40px; padding-top:20px"
    />
  </a>

  <p style="margin-top: 20px; color: #4b5563;">
    <b>Trung tâm Toán Câu lạc bộ Ánh Sáng</b>
  </p>

  <p>
    <b style="color: #4b5563;">Địa chỉ:</b>
    <a href="https://goo.gl/maps/proqtNoL24gvuNxy9"
      >Trường THPT DL Lê Hồng Phong - số 27 Tô Hiệu, Hà Đông</a
    >
  </p>
  <p>
    <b style="color: #4b5563;">Cô Hường phụ trách: </b>
    <a href="tel:0362860970">036 286 0970</a>
  </p>
</body>
  `;

    return htmlContent;
}
