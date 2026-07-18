# Từ vựng ISTQB Chương 4 (Tiếng Việt)

Tài liệu này giải thích các khái niệm quan trọng trong Chương 4 theo cách dễ hiểu và thực tế hơn.

## 1. Tổng quan về kỹ thuật kiểm thử
- Test technique (kỹ thuật kiểm thử): Một phương pháp dùng để suy ra test case và xác định cần kiểm thử cái gì.
- Vì sao kỹ thuật quan trọng: Chúng giúp tester tạo ra các test tốt hơn theo cách có cấu trúc.
- Các nhóm chính:
  - kỹ thuật black-box
  - kỹ thuật white-box
  - kỹ thuật dựa trên kinh nghiệm
  - cách tiếp cận dựa trên hợp tác

## 2. Kỹ thuật kiểm thử Black-box
- Black-box testing (kiểm thử hộp đen): Kiểm thử dựa trên hành vi mong đợi của hệ thống mà không cần biết mã bên trong.
- Equivalence partitioning (phân vùng tương đương): Chia dữ liệu đầu vào thành các nhóm mà nên được xử lý giống nhau.
  - Ví dụ: Với đầu vào tuổi, các nhóm 0–17, 18–64 và 65+ có thể là các partition khác nhau.
- Boundary value analysis (phân tích giá trị biên): Kiểm thử các giá trị ở rìa của phạm vi hợp lệ hoặc không hợp lệ.
  - Ví dụ: Nếu phạm vi hợp lệ là 1 đến 100, hãy thử 1, 2, 99, 100 và các giá trị không hợp lệ như 0 hoặc 101.
- Decision table testing (kiểm thử bảng quyết định): Kiểm thử các tổ hợp điều kiện và hành động tương ứng.
  - Ví dụ: Kiểm thử các tổ hợp khác nhau của vai trò người dùng và trạng thái quyền.
- State transition testing (kiểm thử chuyển trạng thái): Kiểm thử cách hệ thống hoạt động khi chuyển từ trạng thái này sang trạng thái khác.
  - Ví dụ: Quy trình thanh toán chuyển từ “giỏ hàng” → “thanh toán” → “hoàn tất”.

## 3. Kỹ thuật kiểm thử White-box
- White-box testing (kiểm thử hộp trắng): Kiểm thử dựa trên cấu trúc bên trong, logic hoặc mã nguồn của phần mềm.
- Statement coverage (độ bao phủ câu lệnh): Tỷ lệ các câu lệnh có thể thực thi được chạy bởi test.
- Branch coverage (độ bao phủ nhánh): Tỷ lệ các nhánh quyết định được thực hiện.
- Giá trị của white-box testing: Nó giúp đảm bảo logic bên trong được kiểm thử, không chỉ hành vi bên ngoài.

## 4. Kỹ thuật dựa trên kinh nghiệm
- Experience-based testing (kiểm thử dựa trên kinh nghiệm): Các kỹ thuật kiểm thử dựa trên kiến thức, trực giác và kinh nghiệm của tester.
- Error guessing (đoán lỗi): Dự đoán các defect có khả năng xảy ra dựa trên kinh nghiệm.
  - Ví dụ: Tester có thể nghi ngờ vấn đề ở việc kiểm tra đầu vào hoặc các trường hợp biên.
- Exploratory testing (kiểm thử khám phá): Học và kiểm thử cùng lúc, thường không theo kế hoạch được viết sẵn đầy đủ.
  - Ví dụ: Tester khám phá ứng dụng một cách tự do để phát hiện vấn đề.
- Checklist-based testing (kiểm thử theo checklist): Dùng checklist các điểm quan trọng để hướng dẫn testing.
  - Ví dụ: Checklist cho đăng nhập, đăng xuất, đặt lại mật khẩu và thời gian hết phiên.

## 5. Cách tiếp cận kiểm thử dựa trên hợp tác
- Collaboration-based approach (cách tiếp cận dựa trên hợp tác): Cách kiểm thử cần sự tham gia của đại diện nghiệp vụ, developer và tester cùng nhau.
- User story (câu chuyện người dùng): Mô tả ngắn về tính năng từ góc nhìn người dùng.
- Acceptance criteria (tiêu chí chấp nhận): Các điều kiện mà tính năng phải đáp ứng để được các bên liên quan chấp nhận.
- ATDD (Acceptance Test-Driven Development – phát triển theo hướng test chấp nhận): Viết acceptance test trước khi triển khai tính năng.
- Vì sao quan trọng: Nó cải thiện sự hiểu biết chung và giảm hiểu lầm.

## Mẹo ghi nhớ nhanh
- Black-box = kiểm thử cái hệ thống làm được.
- White-box = kiểm thử cách hệ thống được xây dựng bên trong.
- Experience-based = kiểm thử bằng kinh nghiệm và trực giác của tester.
- Collaboration-based = kiểm thử cùng với business và developer.