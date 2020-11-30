var connection=require('./connection');
var express = require("express");
var router = express.Router();

connection.query('SELECT * FROM hcmus_book_store.book_info', function (err, rows, fields) {
    if (err) throw err
    exports.list=rows;
  });


/*
exports.list = () => {
    return [
        {
            id: 0,
            title: 'The Two Towers : The Lord of the Rings, Part 2',
            image: 'images/b1.jpg',
            basePrice: 157000,
            ISBN: '9780007488339',
            supplier: 'Usborne',
            author: 'J R R Tolkien',
            NXB: 'Harpercollins Publishers',
            publicYear: '30/08/2012',
            weight: '259 gr',
            size: '2.0 x 19.0 x 12.0',
            numberOfPage: 352,
            page: 'Bìa Mềm',
            Categories: 'Novel',
            descriptionTitle: 'Sản phẩm bán chạy nhất	Top 100 sản phẩm 3 con mèo bán chạy của tháng',
            description: "Building on the story begun in The Hobbit and The Fellowship of the Ring, this is the second part of Tolkien's epic masterpiece, The Lord of the Rings, featuring an exclusive cover image from the film, the definitive text, and a detailed map of Middle-earth. Frodo and the Companions of the Ring have been beset by danger during their quest to prevent the Ruling Ring from falling into the hands of the Dark Lord by destroying it in the Cracks of Doom. They have lost the wizard, Gandalf, in the battle with an evil spirit in the Mines of Moria; and at the Falls of Rauros, Boromir, seduced by the power of the Ring, tried to seize it by force. While Frodo and Sam made their escape the rest of the company were attacked by Orcs. Now they continue their journey alone down the great River Anduin - alone, that is, save for the mysterious creeping figure that follows wherever they go. To celebrate the release of the first of Peter Jackson's two-part film adaptation of The Hobbit, THE HOBBIT: AN UNEXPECTED JOURNEY, this second part of The Lord of the Rings is available for a limited time with an exclusive cover image from Peter Jackson's award-winning trilogy."
        },
        {
            id: 1,
            title: 'Totto-Chan Bên Cửa Sổ (Tái Bản 2019)',
            image: 'images/b2.jpg',
            basePrice: 98000,
            ISBN: '8935235220232',
            supplier: 'Nhã Nam',
            author: 'Kuroyanagi Tetsuko',
            NXB: 'NXB Hội Nhà Văn',
            publicYear: '2019',
            weight: '400 gr',
            size: '14 x 19',
            numberOfPage: 359,
            page: 'Bìa Mềm',
            Categories: 'Novel, Education',
            descriptionTitle: 'Sản phẩm hiển thị trong	COUPON 111K - ĐẾM CHỮ BẮT VÀNG',
            description: "Vừa vào lớp một được vài ngày, Totto-chan đã bị đuổi học!!! Không còn cách nào khác, mẹ đành đưa Totto-chan đến một ngôi trường mới, trường Tomoe. Đấy là một ngôi trường kỳ lạ, lớp học thì ở trong toa xe điện cũ, học sinh thì được thoả thích thay đổi chỗ ngồi mỗi ngày, muốn học môn nào trước cũng được, chẳng những thế, khi đã học hết bài, các bạn còn được cô giáo cho đi dạo. Đặc biệt hơn ở đó còn có một thầy hiệu trưởng có thể chăm chú lắng nghe Totto-chan kể chuyện suốt bốn tiếng đồng hồ! Chính nhờ ngôi trường đó, một Totto-chan hiếu động, cá biệt đã thu nhận được những điều vô cùng quý giá để lớn lên thành một con người hoàn thiện, mạnh mẽ. Totto-chan bên cửa sổ là cuốn sách gối đầu giường của nhiều thế hệ trẻ em trên toàn thế giới suốt ba mươi năm nay. Sau khi xuất bản lần đầu vào năm 1981, cuốn sách đã gây được tiếng vang lớn không chỉ ở Nhật Bản mà còn trên toàn thế giới. Tính đến năm 2001, tổng số bản sách bán ra ở Nhật đã lên đến 9,3 triệu bản, trở thành một trong những cuốn sách bán chạy nhất trong lịch sử ngành xuất bản nước này. Cuốn sách đã được dịch ra 33 thứ tiếng khác nhau, như Anh, Pháp, Đức, Hàn Quốc, Trung Quốc…Khi bản tiếng Anh của Totto-chan được xuất bản tại Mỹ, tờ New York Times đã đăng liền hai bài giới thiệu trọn trang, một “vinh dự” hầu như không tác phẩm nào có được."
        },
        {
            id: 2,
            title: 'Colorful',
            image: 'images/b3.jpg',
            basePrice: 80000,
            ISBN: '8935250754606',
            supplier: 'IPM',
            author: 'Mori Eto',
            NXB: 'NXB Hội Nhà Văn',
            publicYear: '3/2016',
            weight: '400 gr',
            size: '13 x 18',
            numberOfPage: 280,
            page: 'Bìa Mềm',
            Categories: 'Novel',
            descriptionTitle: 'Sản phẩm hiển thị trong 1111 - MƯA SALE ĐỔ BỘ COUPON 111K - ĐẾM CHỮ BẮT VÀNG',
            description: "Có một người phạm tội nặng, chết đi không được luân hồi. Nhưng trong lúc linh hồn người này đang mất trí nhớ và trôi nổi vô định về một nơi tối tăm xứng đáng với cậu ta, thì một thiên sứ cánh trắng xuất hiện, giơ tay chặn lại, thông báo rằng cậu vừa trúng phiên xổ số may mắn của thiên đình, nhận được cơ hội tu hành kiêm tái thử thách. Theo đó, hồn cậu sẽ quay về trần gian, nhập vào xác một người vừa tự sát, ở trọ nhà người ta, nếm trải nhân tình thế thái và xử lý đống hỗn độn mà họ để lại. Mức độ hỗn độn tương đương với mức độ tội lỗi cậu phạm phải trong kiếp trước. Nếu việc tu hành diễn ra thuận lợi, ký ức kiếp trước sẽ dần dần quay về. Giây phút nhớ được tội lỗi mình đã gây ra cũng là lúc kết thúc quá trình ở trọ. Linh hồn cậu sẽ rời khỏi thân xác đi mượn và quay lên thiên giới, thuận lợi đặt chân vào vòng luân hồi, đầu thai sang kiếp khác. Colorful men theo những bất an bình thường mà ai cũng có thể gặp phải trong cuộc sống, nhưng một số người lại thấy chúng quá dị thường, quá kinh khủng, dẫn đến khổ tâm dằn vặt và rồi không thể vượt được qua. Để giải phóng những bình thường ấy, Colorful trình chiếu một giải pháp đặc biệt khác thường. Cuộc đời có muôn vàn nghiệm đúng, người ta tùy ý sống theo cách mình thích, nhưng một khi đã rút lui khỏi nó, thì chẳng còn nghiệm nào cho ta lựa chọn cả."
        },
        {
            id: 3,
            title: 'Sherlock Holmes Toàn Tập - Tập 1',
            image: "images/b4.jpg",
            basePrice: 122000,
            ISBN: '8935212310116',
            supplier: 'Đinh Tị',
            author: 'Sir Arthur Conan Doyle',
            NXB: 'NXB Phụ Nữ',
            publicYear: '2017',
            weight: '880 gr',
            size: '16 x 24',
            numberOfPage: 576,
            page: 'Bìa Mềm',
            Categories: 'Detective',
            descriptionTitle: 'Sản phẩm hiển thị trong Đinh Tị Sản phẩm bán chạy nhất	Top 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng',
            description: "Từ khi xuất hiện lần đầu tiên vào năm 1887, thám tử Sherlock Holmes đã trở thành một trong những nhân vật hư cấu được yêu thích nhất. Là bậc thầy về khoa học suy luận, có thể làm sáng tỏ ngay cả những vụ án khó và phức tạp nhất bằng cách phát hiện ra những manh mối mà với người khác là quá mơ hồ và không thể nhận biết, thám tử Sherlock Holmes là nhân vật chính trong bộ tác phẩm gồm sáu mươi câu chuyện được viết bởi Sir Arthur Conan Doyle từ năm 1887 đến năm 1927. Với sự giúp đỡ của người bạn tận tụy và trung thành là bác sĩ Watson, thám tử Sherlock Holmes đã khiến vô số những kẻ lừa đảo, kẻ cướp và kẻ sát nhân bị đưa ra truy tố trước pháp luật. Nhiều câu chuyện về Sherlock Holmes đã được xếp vào hàng những tác phẩm trinh thám hư cấu hay nhất mọi thời đại, trong số đó có 'Chiếc nhẫn tình cờ', 'Vụ bê bối ở Bohemia', 'Dải băng lốm đốm' và 'Con chó săn của dòng họ Baskerville'. Bộ Sherlock Holmes toàn tập này sẽ giới thiệu với bạn đọc trọn bộ tác phẩm gồm 56 truyện ngắn và 4 tiểu thuyết, được sắp xếp theo trình tự thời gian xuất bản. Tập một: Chiếc nhẫn tình cờ (tiểu thuyết), Dấu bộ tứ (tiểu thuyết), Những cuộc phiêu lưu của Sherlock Holmes (12 truyện ngắn). Tập hai: Hồi ức của Sherlock Holmes (11 truyện ngắn), Sherlock Holmes trở về (13 truyện ngắn), Con chó săn của dòng họ Baskerville (tiểu thuyết). Tập ba: Thung lũng khủng khiếp (tiểu thuyết), Cung đàn sau cuối (18 truyện ngắn), Tàng thư của Sherlock Holmes (12 truyện ngắn). Hy vọng bộ sách này sẽ mang đến cho độc giả những giờ phút thư giãn thú vị và trở thành một phần không thể thiếu trong tủ sách của mỗi gia đình."
        },
        {
            id: 4,
            title: 'Tiếng Việt 1 - Tập 1 (Bộ Sách Cánh Diều)',
            image: 'images/b5.jpg',
            basePrice: 34000,
            ISBN: '9786049873256',
            supplier: 'Công ty Cổ Phần Đầu Tư Xuât Bản - Thiết Bị Giáo Dục Việt Nam',
            author: 'Nguyễn Minh Thuyết, Hoàng Hòa Bình, Nguyễn Thị Ly Kha, Lê Hữu Thỉnh',
            NXB: 'NXB Đại Học Sư Phạm TPHCM',
            publicYear: '2020',
            weight: '315 gr',
            size: '26 x 18.5 x 0.5 cm',
            numberOfPage: 172,
            page: 'Bìa Mềm',
            Categories: 'Education',
            descriptionTitle: 'Sản phẩm hiển thị trong	Bộ Sách Giáo Khoa Cánh Diều  Sách Giáo Khoa Cấp 1',
            description: "Sách giáo khoa Tiếng Việt 1 (thuộc bộ sách CÁNH DIỀU) biên soạn theo Chương trình Giáo dục phổ thông 2018 và thống nhất về tư tưởng “Mang cuộc sống vào bài học – Đưa bài học vào cuộc sống”. Sách dạy học sinh lớp 1 học đọc, học viết và phát triển các kĩ năng nghe, nói tiếng Việt. Các bài học chữ sắp xếp theo nhóm nét chữ kết hợp thứ tự trong bảng chữ cái. Các bài học vần sắp xếp theo mô hình vần. Mỗi bài nói chung chỉ dạy 2 chữ hoặc vần, vừa sức học sinh. Ngay từ những bài đầu, sách đã có nhiều bài tập đọc thú vị, hấp dẫn dựa trên những chữ và vần mới học, nhờ đó học sinh không quên chữ, vần đã học, đồng thời đọc, viết nhanh và chính xác hơn. Ở phần Luyện tập tổng hợp, sách có thêm các bài hướng dẫn học sinh tự đọc sách, tạo lập các văn bản đa phương thức (kết hợp chữ với tranh ảnh, hiện vật tự làm hoặc sưu tầm), tổ chức trưng bày, giới thiệu sản phẩm học tập. Nội dung và hình thức trình bày các bài học hấp dẫn, khơi gợi trí tò mò khoa học, phát huy tính tích cực, tăng cường vốn từ, vốn sống và bồi dưỡng tình cảm, đạo đức, lối sống cho học sinh. Tổng Chủ biên sách là GS.TS Nguyễn Minh Thuyết. Tác giả sách là những nhà giáo, nhà khoa học có uy tín, giàu kinh nghiệm và tâm huyết trong giáo dục tiểu học."
        }
    ]
}
*/
