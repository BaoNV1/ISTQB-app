# Từ vựng ISTQB Chương 3 (Tiếng Việt)

Tài liệu này giải thích các khái niệm quan trọng trong Chương 3 theo cách dễ hiểu và thực tế hơn.

## 1. Cơ bản về Kiểm thử Tĩnh
- Kiểm thử tĩnh (static testing): Kiểm thử không thực thi phần mềm. Nó được thực hiện bằng cách xem xét các sản phẩm làm việc như yêu cầu, thiết kế, mã nguồn hoặc test case.
- Vì sao quan trọng: Kiểm thử tĩnh giúp tìm lỗi sớm, trước khi hệ thống được chạy.
- Ví dụ: Xem xét tài liệu yêu cầu trước khi bắt đầu lập trình.
- Kiểm thử động (dynamic testing): Kiểm thử thực thi phần mềm để quan sát hành vi của nó.
- Sự khác biệt chính: Kiểm thử tĩnh kiểm tra sản phẩm mà không chạy nó; kiểm thử động kiểm tra bằng cách chạy nó.

## 2. Các sản phẩm làm việc được xem xét trong kiểm thử tĩnh
- Sản phẩm làm việc (work product): Bất kỳ đầu ra nào được tạo ra trong vòng đời phần mềm, như yêu cầu, tài liệu thiết kế, mã nguồn hoặc test case.
- Ví dụ về các sản phẩm làm việc có thể được review:
  - tài liệu yêu cầu
  - user story và acceptance criteria
  - tài liệu kiến trúc và thiết kế
  - mã nguồn
  - test case và test plan

## 3. Giá trị của kiểm thử tĩnh
- Phát hiện lỗi sớm: Lỗi có thể được tìm thấy trước khi chúng trở nên đắt đỏ để sửa.
- Giảm chi phí: Sửa lỗi sớm thường rẻ hơn nhiều so với sửa sau này.
- Cải thiện chất lượng: Review và phân tích làm tăng độ rõ ràng và chính xác của sản phẩm làm việc.
- Tăng hiểu biết: Các thành viên trong nhóm hiểu sâu hơn về sản phẩm làm việc thông qua việc review.

## 4. Quy trình Review
- Review: Một hoạt động có cấu trúc hoặc bán cấu trúc nơi các sản phẩm làm việc được xem xét bởi người khác để tìm lỗi hoặc cải thiện.
- Các hoạt động trong quy trình review thường bao gồm:
  - lập kế hoạch review
  - chuẩn bị sản phẩm làm việc
  - xem xét sản phẩm làm việc
  - thu thập phản hồi
  - thực hiện cải thiện
- Lợi ích: Review hỗ trợ giao tiếp và cải thiện chất lượng.

## 5. Các loại review
- Review không chính thức (informal review): Một review đơn giản, ít cấu trúc hơn.
  - Ví dụ: Một đồng nghiệp nhanh chóng xem xét tài liệu yêu cầu.
- Walkthrough: Người viết giải thích sản phẩm làm việc cho người khác để nhận phản hồi.
- Technical review: Review tập trung vào tính đúng đắn và chất lượng kỹ thuật.
- Inspection: Quy trình review chính thức với vai trò, quy tắc và đầu ra được xác định rõ.
  - Ví dụ: Review chính thức tài liệu thiết kế bằng checklist và biên bản review.

## 6. Vai trò trong review
- Author: Người tạo ra sản phẩm làm việc.
- Reviewer: Người xem xét sản phẩm làm việc để tìm lỗi hoặc vấn đề.
- Moderator: Người điều phối quy trình review.
- Scribe: Người ghi lại các vấn đề và quyết định trong buổi review.
- Vì sao vai trò quan trọng: Vai trò rõ ràng giúp review hiệu quả và có tổ chức hơn.

## 7. Yếu tố dẫn đến thành công của review
- Mục tiêu rõ ràng: Mọi người phải biết vì sao review được thực hiện.
- Chuẩn bị tốt: Reviewer cần đủ thời gian để hiểu sản phẩm làm việc.
- Người tham gia có kỹ năng: Reviewer cần có kiến thức và kinh nghiệm phù hợp.
- Giao tiếp mang tính xây dựng: Phản hồi nên giúp cải thiện sản phẩm, không đổ lỗi cho người khác.
- Chọn đúng loại review: Phương pháp review nên phù hợp với mức độ quan trọng và phức tạp của sản phẩm làm việc.

## 8. Phân tích tĩnh
- Static analysis: Cách phân tích tự động mã nguồn hoặc tài liệu mà không cần thực thi phần mềm.
- Ví dụ: Một linter phát hiện vấn đề trong mã hoặc công cụ quét lỗ hổng bảo mật.

## 9. Anomaly
- Anomaly: Một điều kiện bất thường hoặc vấn đề được phát hiện trong sản phẩm làm việc.
- Trong review, anomaly có thể là defect, rủi ro hoặc thứ cần làm rõ.

## Mẹo ghi nhớ nhanh
- Hãy nhớ câu này: kiểm thử tĩnh = review và phân tích trước khi thực thi.
- Nếu chỉ nhớ một câu, hãy nhớ: review sớm giúp tiết kiệm thời gian và chi phí.