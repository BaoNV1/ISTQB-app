# ISTQB CTFL v4.0.1 – Chương 4: Phân tích và Thiết kế Kiểm thử

**Trọng tâm thi:** Chương này thường ra nhiều câu. Cần nắm vững:
- Tính số partition EP và giá trị BVA
- Đọc bảng quyết định và đếm số rule
- Độ bao phủ chuyển trạng thái (state so với transition)
- Quan hệ Statement coverage và Branch coverage
- Kỹ thuật dựa trên kinh nghiệm và ATDD

---

## 4.1 Tổng quan về Kỹ thuật Kiểm thử

**Mục đích của kỹ thuật kiểm thử:**  
Giúp suy ra **điều kiện kiểm thử (test conditions)** và **ca kiểm thử (test cases)** một cách có hệ thống từ **test basis** (yêu cầu, đặc tả, mô hình, code, kinh nghiệm…).

### Ba nhóm chính (cần nhớ)

| Nhóm | Còn gọi là | Dựa trên | Kỹ thuật điển hình |
|------|------------|----------|-------------------|
| **Black-box** (Hộp đen) | Specification-based | Hành vi bên ngoài / đặc tả | EP, BVA, Bảng quyết định, Chuyển trạng thái |
| **White-box** (Hộp trắng) | Structure-based | Cấu trúc bên trong (code) | Statement testing, Branch testing |
| **Experience-based** | — | Kiến thức & kinh nghiệm tester | Error guessing, Exploratory, Checklist-based |

**Điểm thi quan trọng:**
- Các kỹ thuật có thể **kết hợp** với nhau.
- Lựa chọn kỹ thuật phụ thuộc **ngữ cảnh** (rủi ro, chất lượng tài liệu, thời gian, kỹ năng).
- Black-box **không** cần biết cấu trúc code bên trong.
- White-box **cần** truy cập code / cấu trúc.

---

## 4.2 Kỹ thuật Hộp đen (Black-box)

### 4.2.1 Phân vùng tương đương (Equivalence Partitioning – EP)

**Ý tưởng:** Chia dữ liệu đầu vào (hoặc đầu ra, hoặc giá trị nội bộ) thành các **partition** (nhóm) sao cho hệ thống xử lý **giống nhau** với mọi giá trị trong cùng một partition.

- Bao gồm cả partition **hợp lệ (valid)** và **không hợp lệ (invalid)**.
- Thường chỉ cần **một giá trị đại diện** từ mỗi partition để đạt coverage.

**Công thức coverage:**

EP Coverage (%) = (Số partition đã kiểm thử ÷ Tổng số partition) × 100

**Ví dụ kiểu đề thi:** Trường tuổi chấp nhận từ 18 đến 60 (bao gồm hai đầu).

| Partition | Khoảng giá trị | Loại |
|-----------|----------------|------|
| 1 | age < 18 | Không hợp lệ |
| 2 | 18 ≤ age ≤ 60 | Hợp lệ |
| 3 | age > 60 | Không hợp lệ |

→ **3 partition** → cần ít nhất **3 giá trị** để đạt 100% EP coverage (ví dụ: 10, 30, 70).

**Mẹo thi:**
- Luôn xem xét partition **không hợp lệ**, trừ khi đề nói khác.
- Có thể phân vùng theo output hoặc giá trị nội bộ.
- EP **một mình** không tập trung đặc biệt vào lỗi biên.

---

### 4.2.2 Phân tích giá trị biên (Boundary Value Analysis – BVA)

**Ý tưởng:** Lỗi thường xuất hiện ở **biên** của các partition có thứ tự. Cần kiểm thử các giá trị biên.

BVA gần như luôn dùng **kết hợp với EP**.

#### 2-value BVA (theo syllabus)
Với mỗi biên đã xác định:
- **giá trị biên**
- **giá trị lân cận gần nhất** thuộc partition kế bên

#### 3-value BVA (theo syllabus)
Với mỗi giá trị biên:
- giá trị biên
- **một giá trị lân cận phía trong** partition
- **một giá trị lân cận phía ngoài** partition

**Ví dụ:** Khoảng hợp lệ 18–60 (số nguyên).

**2-value BVA** thường kiểm:  
`17, 18, 60, 61`  
(và thường vẫn chọn thêm 1 giá trị giữa nếu kết hợp EP).

**3-value BVA** thường kiểm:  
`17, 18, 19` và `59, 60, 61`.

**Coverage:**  
(Số giá trị biên đã kiểm ÷ Tổng số giá trị biên xác định) × 100%.

**Mẹo thi:**
- Phân biệt rõ **2-value** và **3-value** BVA.
- Biên tồn tại cho cả partition hợp lệ và không hợp lệ (khi có thứ tự).
- Với khoảng min–max đơn giản, 2-value BVA tập trung vào min, min−1, max, max+1.
- BVA chỉ áp dụng cho partition **có thứ tự** (số, ngày, danh sách có thứ tự…).

---

### 4.2.3 Kiểm thử bảng quyết định (Decision Table Testing)

**Khi nào dùng:** Hành vi phụ thuộc vào **tổ hợp nhiều điều kiện** (business rules, logic phức tạp).

**Cấu trúc:**
- Hàng **Conditions** (thường True/False)
- Hàng **Actions** (hệ thống làm gì)
- Mỗi **cột** = một rule (một tổ hợp) → thường tương ứng một test case

**Coverage:** Bao phủ tất cả các cột (rule) **khả thi**.

**Bảng thu gọn (collapsed):**  
Có thể gộp cột khi một điều kiện không ảnh hưởng kết quả (ký hiệu “–” hoặc “N/A”). Giảm số test case nhưng vẫn bao phủ logic quyết định.

**Mẹo thi:**
- Đếm cột cẩn thận — mỗi cột thường = một test.
- Chú ý tổ hợp không thể xảy ra (có thể loại bỏ).
- Bảng quyết định mạnh hơn việc test từng điều kiện riêng lẻ khi có tương tác giữa các điều kiện.

---

### 4.2.4 Kiểm thử chuyển trạng thái (State Transition Testing)

**Thành phần mô hình:**
- **States** (trạng thái)
- **Events** (sự kiện kích hoạt)
- **Transitions** (chuyển đổi)
- **Guards** / điều kiện (tùy chọn)
- **Actions** (tùy chọn)

Phù hợp với: luồng đăng nhập, workflow, ATM, trạng thái đơn hàng, chế độ thiết bị…

**Tiêu chí coverage thường gặp trong đề:**
1. Bao phủ tất cả **states**
2. Bao phủ tất cả **valid transitions**
3. Bao phủ **invalid transitions** (test âm — hệ thống phải từ chối)

**Độ mạnh:**  
Bao phủ **tất cả transition hợp lệ** **mạnh hơn** chỉ bao phủ các state.

**Mẹo thi:**
- Đọc được sơ đồ trạng thái đơn giản và liệt kê test cần thiết.
- “All transitions” > “all states”.
- Invalid transitions quan trọng cho kiểm thử độ bền / negative testing.

---

## 4.3 Kỹ thuật Hộp trắng (White-box)

### 4.3.1 Kiểm thử câu lệnh & Statement Coverage

**Mục tiêu:** Thực thi mọi **câu lệnh có thể thực thi** ít nhất một lần.

Statement Coverage (%) = (Số câu lệnh đã thực thi ÷ Tổng số câu lệnh có thể thực thi) × 100

### 4.3.2 Kiểm thử nhánh & Branch Coverage

**Mục tiêu:** Thực thi mọi **nhánh** (kết quả True và False của mỗi decision) ít nhất một lần.

Branch Coverage (%) = (Số nhánh đã thực thi ÷ Tổng số nhánh) × 100

**Quan hệ quan trọng trong đề thi:**
- **100% branch coverage → 100% statement coverage** (luôn đúng)
- **100% statement coverage → 100% branch coverage** (không phải lúc nào cũng đúng)

Branch coverage **mạnh hơn** statement coverage.

**Giá trị của white-box:**
- Tìm lỗi liên quan đến luồng điều khiển (thiếu path, điều kiện sai…).
- Bổ sung cho black-box.
- Độ bao phủ cao **không** có nghĩa test đã đúng, đầy đủ, hay đã đáp ứng yêu cầu.

**Mẹo thi:**
- “100% branch coverage đảm bảo 100% statement coverage” → **Đúng**.
- “100% statement coverage đảm bảo tìm hết mọi lỗi” → **Sai**.
- White-box cần truy cập cấu trúc code.

---

## 4.4 Kỹ thuật dựa trên Kinh nghiệm

### 4.4.1 Error Guessing (Đoán lỗi)

- Dựa vào kiến thức của tester về **lỗi điển hình**, sự cố trước đây và điểm yếu hệ thống.
- Thường hỗ trợ bằng taxonomy lỗi hoặc checklist lỗi phổ biến.
- Bổ sung kỹ thuật có hệ thống; **không thay thế** chúng.

### 4.4.2 Exploratory Testing (Kiểm thử khám phá)

- **Đồng thời** học hỏi, thiết kế test và thực thi test.
- Thường thực hiện theo **session giới hạn thời gian** với **charter** (nhiệm vụ + phạm vi).
- Linh hoạt cao; phù hợp khi đặc tả chưa đầy đủ hoặc thời gian hạn chế.
- Có thể ghi nhận bằng session notes / debrief.

### 4.4.3 Checklist-based Testing

- Tester dùng **danh sách các mục / điều kiện** cần kiểm tra.
- Tăng tính nhất quán và giúp bao phủ các vùng rủi ro hoặc đặc tính chất lượng đã biết.
- Checklist có thể xây từ kinh nghiệm, chuẩn, hoặc lỗi cũ.

**So sánh nhanh (thi hay hỏi):**

| Kỹ thuật | Cơ sở chính | Mức cấu trúc |
|----------|-------------|--------------|
| Error guessing | Kinh nghiệm về vị trí lỗi | Thấp (danh sách ad-hoc) |
| Exploratory | Học hỏi + charter + time-box | Trung bình (theo session) |
| Checklist-based | Checklist có sẵn | Trung bình–Cao (lặp lại được) |

---

## 4.5 Phương pháp dựa trên Cộng tác

### 4.5.1 Viết User Story cộng tác

User story được viết **cùng nhau** bởi:
- Đại diện business
- Developers
- Testers

Tester đóng góp bằng cách đặt câu hỏi, làm rõ mơ hồ, và nghĩ về khả năng kiểm thử (testability) cũng như acceptance.

### 4.5.2 Acceptance Criteria (Tiêu chí chấp nhận)

- Điều kiện mà user story phải thỏa mãn để được chấp nhận.
- Làm cho story **có thể kiểm thử được**.
- Định dạng: danh sách bullet, Given–When–Then (Gherkin), quy tắc, ví dụ…

### 4.5.3 ATDD (Acceptance Test-Driven Development)

**Ý tưởng cốt lõi:**  
Team **cùng tạo acceptance test trước khi** triển khai (code).

- Các test đóng vai trò **ví dụ có thể thực thi** về hành vi mong đợi.
- Hỗ trợ hiểu chung về “done”.
- Liên quan chặt với BDD và Specification by Example.

**Từ khóa thi cho ATDD:**
- Cộng tác (collaborative)
- **Trước** khi code
- Acceptance tests / examples
- Hiểu chung / definition of done

**Thuật ngữ liên quan có thể gặp:**
- BDD (Behavior-Driven Development)
- Specification by Example

---

## Bảng so sánh nhanh (Cheat sheet thi)

### Black-box vs White-box vs Experience-based

| Khía cạnh | Black-box | White-box | Experience-based |
|-----------|-----------|-----------|------------------|
| Cơ sở | Đặc tả / yêu cầu | Cấu trúc code | Kiến thức & kinh nghiệm |
| Cần code? | Không | Có | Không |
| Mục tiêu điển hình | Bao phủ hành vi | Bao phủ cấu trúc | Tìm lỗi dễ xảy ra / khám phá |

### Độ mạnh coverage

| Kỹ thuật | Mạnh hơn |
|----------|----------|
| Branch coverage | Statement coverage |
| Tất cả transitions (state) | Chỉ tất cả states |
| Decision table (mọi rule) | Test từng điều kiện riêng lẻ |

---

## Dạng câu hỏi thi điển hình – Chương 4

1. **Đếm EP:** “Có bao nhiêu partition…?” → đếm valid + invalid.
2. **Giá trị BVA:** “Tập giá trị nào cho 2-value / 3-value BVA?”
3. **Bảng quyết định:** “Bảng này cần bao nhiêu test case?”
4. **Mô hình trạng thái:** “Tối thiểu bao nhiêu test để cover mọi transition?”
5. **Quan hệ coverage:** “100% branch coverage suy ra…?”
6. **Thời điểm ATDD:** “Acceptance test trong ATDD được viết khi nào?”
7. **Chọn kỹ thuật:** “Kỹ thuật phù hợp nhất cho business rule phức tạp?” → Decision table.
8. **Exploratory:** “Thiết kế và thực thi diễn ra cùng lúc” → Exploratory.

---

## Mẹo học cho kỳ thi

1. Luyện bài **EP + BVA** (đếm partition, chọn giá trị) đến mức tự động.
2. Vẽ sơ đồ **state** đơn giản và liệt kê transition.
3. Đọc **bảng quyết định** nhỏ và đếm cột/rule.
4. Nhớ: **Branch > Statement**; transitions > states.
5. ATDD = acceptance test **trước** khi code, tạo **cộng tác**.
6. Đừng nhầm “độ bao phủ cao” với “không còn lỗi” hoặc “đã đúng yêu cầu người dùng”.
7. Kết hợp kỹ thuật theo ngữ cảnh; đề hay hỏi kỹ thuật **phù hợp nhất**.

---

**Luyện tập trong app**
- Quiz Chương 4 (Quiz 1, 2, 3)
- Trang Mock Exam → Focus Set 2 (Test Techniques)
- Full Practice Exam A & B (nhiều câu kiểu Chương 4)
