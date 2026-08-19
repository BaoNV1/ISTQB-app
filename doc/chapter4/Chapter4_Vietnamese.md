# ISTQB CTFL v4.0.1 – Chương 4: Phân tích và Thiết kế Kiểm thử

## 4.1 Tổng quan về Kỹ thuật Kiểm thử

Kỹ thuật kiểm thử giúp suy ra điều kiện kiểm thử và ca kiểm thử một cách có hệ thống từ test basis.

Ba nhóm chính:
- **Black-box** (dựa trên đặc tả)
- **White-box** (dựa trên cấu trúc)
- **Experience-based** (dựa trên kinh nghiệm)

---

## 4.2 Kỹ thuật Hộp đen (Black-box)

### 4.2.1 Phân vùng tương đương (Equivalence Partitioning - EP)
- Chia dữ liệu vào/ra thành các nhóm (partition) mà hệ thống xử lý giống nhau.
- Bao gồm cả partition **hợp lệ** và **không hợp lệ**.
- Coverage: Ít nhất 1 giá trị từ mỗi partition → 100% EP coverage.

### 4.2.2 Phân tích giá trị biên (Boundary Value Analysis - BVA)
- Tập trung vào các biên của partition có thứ tự (lỗi thường xảy ra ở biên).
- Hai biến thể trong syllabus:
  - **2-value BVA**: Mỗi biên → giá trị biên + giá trị lân cận thuộc partition kế bên.
  - **3-value BVA**: Mỗi giá trị biên → biên + cả hai phía (bên trong và bên ngoài).
- Thường kết hợp với EP.

### 4.2.3 Kiểm thử bảng quyết định (Decision Table Testing)
- Dùng khi hành vi phụ thuộc vào tổ hợp nhiều điều kiện (business rules).
- Cấu trúc: Conditions + Actions.
- Mỗi cột = một tổ hợp điều kiện = một test case.
- Coverage: Bao phủ tất cả các cột khả thi.

### 4.2.4 Kiểm thử chuyển trạng thái (State Transition Testing)
- Mô hình hóa hệ thống bằng: State – Event – Transition – Guard.
- Phù hợp với hệ thống có trạng thái (login, workflow, ATM…).
- Coverage: Tất cả state, tất cả transition hợp lệ, và transition không hợp lệ.

---

## 4.3 Kỹ thuật Hộp trắng (White-box)

### 4.3.1 Kiểm thử câu lệnh & Statement Coverage
- Mục tiêu: Thực thi mọi câu lệnh có thể thực thi ít nhất một lần.
- Coverage = (Số câu lệnh đã thực thi / Tổng số câu lệnh) × 100%

### 4.3.2 Kiểm thử nhánh & Branch Coverage
- Mục tiêu: Thực thi mọi nhánh (True/False của mỗi decision) ít nhất một lần.
- Branch coverage mạnh hơn Statement coverage.
- 100% Branch coverage ⇒ 100% Statement coverage (ngược lại không đúng).

### 4.3.3 Giá trị của White-box Testing
- Tìm lỗi liên quan đến luồng điều khiển của code.
- Bổ sung cho black-box.
- Độ bao phủ cao **không** chứng minh test đã đúng hoặc đầy đủ.

---

## 4.4 Kỹ thuật dựa trên Kinh nghiệm

### 4.4.1 Error Guessing
- Dựa vào kinh nghiệm để dự đoán nơi dễ xảy ra lỗi.

### 4.4.2 Exploratory Testing
- Kết hợp học hỏi + thiết kế + thực thi kiểm thử cùng lúc (thường theo session có charter).

### 4.4.3 Checklist-based Testing
- Sử dụng danh sách các điểm cần kiểm tra để đảm bảo tính nhất quán.

---

## 4.5 Phương pháp dựa trên Cộng tác

### 4.5.1 Viết User Story cộng tác
- User story được viết cùng nhau giữa Dev, Tester và Business.

### 4.5.2 Acceptance Criteria
- Điều kiện mà user story phải thỏa mãn để được chấp nhận.

### 4.5.3 ATDD (Acceptance Test-Driven Development)
- Team cùng viết acceptance test **trước khi** code.
- Các test này trở thành ví dụ thực thi được của hành vi mong đợi.