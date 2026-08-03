# ISTQB CTFL v4.0.1 – Chapter 2: Testing Throughout the Software Development Lifecycle

## 2.1 Testing in the Context of a Software Development Lifecycle (SDLC)

### 2.1.1 Impact of the SDLC on Testing
Mô hình SDLC được chọn ảnh hưởng đến:
- Phạm vi và thời điểm của các hoạt động testing (test levels, test types)
- Mức độ chi tiết của tài liệu testing
- Lựa chọn kỹ thuật và cách tiếp cận testing
- Mức độ tự động hóa testing
- Vai trò và trách nhiệm của tester

### 2.1.2 Good Testing Practices (áp dụng cho mọi SDLC)
- Mỗi hoạt động phát triển đều có hoạt động testing tương ứng
- Mỗi test level có mục tiêu riêng biệt (tránh trùng lặp)
- Test analysis & design bắt đầu sớm (tuân thủ nguyên tắc Early Testing)
- Tester tham gia review work product càng sớm càng tốt

### 2.1.3 Testing as a Driver for Software Development (Test-First Approaches)
- **TDD** (Test-Driven Development): Viết test trước → viết code → refactor
- **ATDD** (Acceptance Test-Driven Development): Viết acceptance test trước
- **BDD** (Behavior-Driven Development): Viết test dựa trên hành vi (Given-When-Then)

### 2.1.4 DevOps and Testing
DevOps thúc đẩy Continuous Integration / Continuous Delivery (CI/CD).

**Lợi ích đối với testing:**
- Phản hồi nhanh về chất lượng code
- Thúc đẩy Shift-Left
- Tăng tự động hóa (đặc biệt component test + static analysis)
- Tập trung hơn vào non-functional quality characteristics
- Giảm thiểu testing thủ công lặp lại

### 2.1.5 Shift-Left Approach
Di chuyển các hoạt động testing **sớm hơn** trong SDLC (không đợi đến khi code xong hoặc tích hợp xong).  
Vẫn cần testing ở giai đoạn sau (không bỏ qua testing muộn).

### 2.1.6 Retrospectives and Process Improvement
Retrospective giúp team:
- Phân tích những gì đã làm tốt / chưa tốt
- Đưa ra hành động cải tiến quy trình testing và phát triển

---

## 2.2 Test Levels and Test Types

### 2.2.1 Test Levels (5 mức chính)
| Test Level                  | Mục tiêu chính                          | Người thực hiện thường gặp | Test Basis điển hình          |
|----------------------------|------------------------------------------|-----------------------------|-------------------------------|
| Component (Unit) Testing   | Test component riêng lẻ                  | Developers                  | Code, detailed design         |
| Component Integration      | Test giao diện giữa các component        | Developers / Testers        | Architecture, design          |
| System Testing             | Test toàn hệ thống                       | Independent testers         | Requirements, system design   |
| System Integration Testing | Test tích hợp hệ thống với hệ thống khác | Testers                     | System architecture           |
| Acceptance Testing         | Xác nhận hệ thống đáp ứng nhu cầu người dùng | Users / Customers / Testers | User requirements, business processes |

**Lưu ý:** Trong Agile/iterative, các level có thể chồng chéo về thời gian.

### 2.2.2 Test Types
- **Functional Testing**: Kiểm tra chức năng (black-box chủ yếu)
- **Non-functional Testing**: Performance, Security, Usability, Reliability…
- **White-box Testing**: Dựa trên cấu trúc nội bộ (code, architecture)
- **Black-box Testing**: Dựa trên đặc tả bên ngoài

Test types có thể được thực hiện ở **mọi test level**.

### 2.2.3 Confirmation Testing vs Regression Testing
- **Confirmation Testing (Retest)**: Chạy lại các test case liên quan đến defect đã được sửa để xác nhận defect đã được fix.
- **Regression Testing**: Kiểm tra xem việc sửa lỗi hoặc thay đổi mới có làm hỏng các chức năng đã hoạt động tốt trước đó hay không.

---

## 2.3 Maintenance Testing

Testing được thực hiện trên hệ thống đang vận hành khi có:
- **Modifications** (sửa lỗi, thêm tính năng)
- **Migration** (chuyển đổi môi trường/platform)
- **Retirement** (ngừng sử dụng hệ thống)

**Quan trọng:** Cần làm **Impact Analysis** để xác định phạm vi testing cần thiết.