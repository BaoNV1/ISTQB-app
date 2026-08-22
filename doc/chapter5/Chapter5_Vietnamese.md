# ISTQB CTFL v4.0.1 – Chương 5: Quản lý các hoạt động Kiểm thử

## 5.1 Lập kế hoạch Kiểm thử (Test Planning)

### 5.1.1 Mục đích và Nội dung của Test Plan
Test plan mô tả mục tiêu, cách tiếp cận, nguồn lực, lịch trình và các hoạt động kiểm thử.

Nội dung điển hình của Test Plan bao gồm:
- Mục tiêu và phạm vi kiểm thử
- Cách tiếp cận / chiến lược kiểm thử
- Entry criteria và Exit criteria
- Sản phẩm bàn giao (deliverables)
- Nguồn lực và trách nhiệm
- Lịch trình và các mốc quan trọng
- Rủi ro và biện pháp giảm thiểu
- Công cụ và môi trường

### 5.1.2 Đóng góp của Tester vào Lập kế hoạch Iteration và Release
Tester đóng góp bằng cách:
- Xác định effort và rủi ro kiểm thử
- Đánh giá khả năng kiểm thử (testability)
- Ước lượng công việc kiểm thử
- Làm rõ acceptance criteria

### 5.1.3 Entry Criteria và Exit Criteria
- **Entry criteria**: Điều kiện phải thỏa mãn trước khi bắt đầu kiểm thử (ví dụ: yêu cầu đã được phê duyệt, môi trường sẵn sàng).
- **Exit criteria**: Điều kiện phải thỏa mãn để kết thúc kiểm thử (ví dụ: đạt mục tiêu coverage, các defect nghiêm trọng đã được sửa).

### 5.1.4 Kỹ thuật Ước lượng
Các kỹ thuật phổ biến:
- Ước lượng dựa trên metrics (dữ liệu lịch sử)
- Ước lượng dựa trên chuyên gia
- Ước lượng ba điểm (lạc quan, có khả năng cao nhất, bi quan)

### 5.1.5 Ưu tiên hóa Test Case
Test case có thể được ưu tiên dựa trên:
- Mức độ rủi ro
- Tầm quan trọng nghiệp vụ
- Tần suất sử dụng
- Độ phức tạp
- Sự phụ thuộc

### 5.1.6 Test Pyramid
Test Pyramid đề xuất:
- Nhiều unit/component test tự động ở tầng dưới
- Ít integration test hơn ở tầng giữa
- Rất ít end-to-end / UI test ở tầng trên

### 5.1.7 Testing Quadrants
Testing Quadrants phân loại kiểm thử theo:
- Hướng nghiệp vụ (Business-facing) vs Hướng kỹ thuật (Technology-facing)
- Hỗ trợ team vs Phê bình sản phẩm

---

## 5.2 Quản lý Rủi ro (Risk Management)

### 5.2.1 Định nghĩa và Thuộc tính của Rủi ro
**Rủi ro** = Sự kiện tiềm ẩn có thể gây ra tác động tiêu cực.  
Rủi ro được đặc trưng bởi:
- **Likelihood** (Xác suất xảy ra)
- **Impact** (Mức độ ảnh hưởng)

**Risk Level** = Likelihood × Impact

### 5.2.2 Project Risks vs Product Risks
- **Project Risks**: Rủi ro liên quan đến thành công của dự án (lịch trình, nguồn lực, ngân sách, kỹ năng…).
- **Product Risks**: Rủi ro liên quan đến chất lượng sản phẩm (lỗi chức năng, hiệu năng, bảo mật…).

### 5.2.3 Phân tích Rủi ro Sản phẩm
Phân tích rủi ro sản phẩm ảnh hưởng đến:
- Phạm vi kiểm thử
- Mức độ kỹ lưỡng của kiểm thử
- Ưu tiên kiểm thử

### 5.2.4 Kiểm soát Rủi ro Sản phẩm
Các biện pháp có thể thực hiện:
- Tăng effort kiểm thử ở vùng rủi ro cao
- Sử dụng kỹ thuật kiểm thử nghiêm ngặt hơn
- Thực hiện review sớm
- Thêm các biện pháp giảm thiểu ngoài kiểm thử

---

## 5.3 Giám sát, Kiểm soát và Kết thúc Kiểm thử

### 5.3.1 Metrics sử dụng trong Kiểm thử
Các metrics phổ biến:
- Tiến độ thực thi test case
- Tỷ lệ phát hiện defect
- Mật độ defect
- Coverage (yêu cầu, rủi ro, code)
- Tỷ lệ pass/fail

### 5.3.2 Mục đích, Nội dung và Đối tượng của Test Report
- **Test Progress Report**: Báo cáo tiến độ trong quá trình kiểm thử.
- **Test Summary / Completion Report**: Báo cáo tổng kết khi kết thúc kiểm thử.

Báo cáo cần phù hợp với đối tượng nhận (ban quản lý, team, stakeholder).

### 5.3.3 Truyền đạt trạng thái Kiểm thử
Có thể truyền đạt qua:
- Dashboard
- Báo cáo tiến độ
- Họp
- Defect report

---

## 5.4 Quản lý Cấu hình (Configuration Management)
Quản lý cấu hình đảm bảo:
- Sử dụng đúng phiên bản của các sản phẩm công việc
- Kiểm soát thay đổi
- Duy trì khả năng truy vết (traceability)

Nó hỗ trợ kiểm thử bằng cách cung cấp môi trường và testware ổn định, được kiểm soát.

---

## 5.5 Quản lý Defect (Defect Management)
Bao gồm:
- Ghi nhận defect
- Phân loại và ưu tiên defect
- Theo dõi trạng thái defect
- Báo cáo và phân tích defect

Một defect report tốt phải rõ ràng, đầy đủ và có thể tái hiện được.