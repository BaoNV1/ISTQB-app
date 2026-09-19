# ISTQB CTFL v4.0.1 – Chương 3: Kiểm thử Tĩnh (Static Testing)

**Trọng tâm thi (syllabus: 80 phút):**  
Câu hỏi thường xoay quanh: work product kiểm được bằng static testing, giá trị của static testing, static so với dynamic, các bước quy trình review, vai trò, các loại review (informal / walkthrough / technical review / inspection), và yếu tố thành công.

**Mục tiêu học tập cần nắm:**
- FL-3.1.1 (K1) Nhận biết các work product có thể kiểm tra bằng static testing  
- FL-3.1.2 (K2) Giải thích giá trị của static testing  
- FL-3.1.3 (K2) So sánh static testing và dynamic testing  
- FL-3.2.1 (K1) Lợi ích của phản hồi stakeholder sớm và thường xuyên  
- FL-3.2.2 (K2) Tóm tắt các hoạt động trong quy trình review  
- FL-3.2.3 (K1) Nhớ trách nhiệm của các vai trò chính khi review  
- FL-3.2.4 (K2) So sánh các loại review  
- FL-3.2.5 (K1) Nhớ các yếu tố góp phần review thành công  

**Từ khóa:** anomaly, dynamic testing, formal review, informal review, inspection, review, static analysis, static testing, technical review, walkthrough  

---

## 3.1 Cơ bản về Static Testing

### Static testing là gì?

Trong **static testing**, phần mềm đang kiểm **không** cần được thực thi (execute).

Work product được đánh giá bằng:
- **Xem xét thủ công** (ví dụ: review)
- **Công cụ** (ví dụ: static analysis)

**Mục tiêu điển hình:** cải thiện chất lượng, phát hiện defect, đánh giá các đặc tính như khả năng đọc, đầy đủ, đúng đắn, khả năng kiểm thử (testability) và tính nhất quán.

Static testing hỗ trợ cả **verification** và **validation**.

Trong môi trường agile, tester, đại diện business (Product Owner, business analyst…) và developer cộng tác qua example mapping, viết user story chung và backlog refinement để user story đạt tiêu chí như **Definition of Ready**. Kỹ thuật review giúp story đầy đủ, dễ hiểu và có **acceptance criteria có thể kiểm thử**.

**Static analysis** có thể phát hiện vấn đề trước dynamic testing, thường tốn ít công sức hơn (không cần test case; thường dùng tool). Thường được tích hợp trong **CI**. Ngoài lỗi code, static analysis còn đánh giá **maintainability** và **security**. Công cụ kiểm chính tả / độ dễ đọc cũng là dạng static analysis.

---

### 3.1.1 Work product có thể kiểm bằng Static Testing (FL-3.1.1)

Hầu hết mọi work product đều có thể kiểm tĩnh. Ví dụ:

- Tài liệu đặc tả yêu cầu  
- Source code  
- Test plan và test case  
- Product backlog item / user story  
- Test charter  
- Tài liệu dự án  
- Hợp đồng  
- Mô hình (models)  

**Review:** mọi work product mà con người đọc và hiểu được.  
**Static analysis:** cần cấu trúc để tool kiểm tra được (code, model, cú pháp hình thức…).

**Ví dụ không phù hợp:** thứ khó diễn giải bởi người, hoặc không được phân tích bằng tool (ví dụ một số executable bên thứ ba vì lý do pháp lý).

**Mẹo thi:** Liệt kê “requirements, design, code, test cases” → static testing. Nếu phải **chạy** hệ thống → dynamic testing.

---

### 3.1.2 Giá trị của Static Testing (FL-3.1.2)

| Giá trị | Giải thích |
|---------|------------|
| Phát hiện defect sớm | Tuân thủ nguyên tắc **early testing**; sửa khi còn rẻ |
| Defect mà dynamic có thể bỏ sót | Ví dụ: code không tới được, design pattern sai, lỗi trên work product **không thực thi được** |
| Chất lượng & niềm tin | Đánh giá chất lượng work product và tăng độ tin cậy |
| Hiểu chung | Stakeholder xác nhận yêu cầu đã ghi đúng nhu cầu thực |
| Giao tiếp tốt hơn | Mời đa dạng stakeholder tham gia static testing |
| Giảm chi phí tổng thể | Review tốn công đầu nhưng thường giảm rework và chi phí dự án sau này |
| Kiểm code hiệu quả | Một số defect code tìm bằng static analysis hiệu quả hơn dynamic testing |

**Mẹo thi:** “Tìm được defect mà dynamic testing không tìm được” và “rẻ hơn khi tìm sớm” là ý hay gặp.

---

### 3.1.3 Static Testing so với Dynamic Testing (FL-3.1.3)

Hai cách tiếp cận **bổ sung** cho nhau, cùng hướng tới phát hiện defect, nhưng khác nhau:

| Khía cạnh | Static testing | Dynamic testing |
|-----------|----------------|-----------------|
| Thực thi | Phần mềm **không** được chạy | Phần mềm **được** chạy |
| Cách xuất hiện defect | Tìm **defect trực tiếp** | Gây ra **failure**; sau đó phân tích mới ra defect |
| Work product | Cả có thể chạy và **không** chạy được (requirements, docs, models…) | Tập trung phần mềm có thể thực thi |
| Phát hiện điển hình | Thiếu yêu cầu, lỗi thiết kế, vi phạm chuẩn, unreachable code | Lỗi chức năng, crash, vấn đề hiệu năng |
| Kỹ thuật | Review, static analysis | Chạy test case |
| Thời điểm | Có thể bắt đầu **rất sớm** (kể cả trước khi có code) | Cần có code / bản build chạy được |

**Đối chiếu quan trọng trong đề:**
- Static → defect **trực tiếp**; dynamic → **failure** trước, rồi mới phân tích defect  
- Có defect chỉ static tìm được; có defect chỉ dynamic tìm được  
- Static mạnh với path ít chạy / khó tới và với tài liệu  

---

## 3.2 Phản hồi và Quy trình Review

### 3.2.1 Lợi ích phản hồi stakeholder sớm và thường xuyên (FL-3.2.1)

- Phát hiện hiểu nhầm **sớm**  
- Cải thiện chất lượng sản phẩm  
- Tăng sự tham gia và trách nhiệm của stakeholder  
- Giảm rework tốn kém về sau  
- Xây dựng hiểu chung về nhu cầu và work product  

**Mẹo thi:** Liên hệ với early testing và cộng tác trên user story / acceptance criteria.

---

### 3.2.2 Các hoạt động trong quy trình Review (FL-3.2.2)

Quy trình review **chung** (theo syllabus):

1. **Planning (Lập kế hoạch)**  
   Xác định phạm vi, mục đích, work product, vai trò, entry/exit criteria, effort và khung thời gian.

2. **Review initiation (Khởi động / kick-off)**  
   Đảm bảo mọi người sẵn sàng: có quyền truy cập work product, hiểu vai trò, nhận đủ tài liệu cần thiết.

3. **Individual review (Xem xét cá nhân / chuẩn bị)**  
   Mỗi reviewer đánh giá chất lượng và ghi lại anomaly, khuyến nghị, câu hỏi (ví dụ checklist-based, scenario-based).

4. **Communication and analysis (Trao đổi và phân tích)**  
   Anomaly **không** đương nhiên là defect. Thảo luận để quyết định trạng thái, người sở hữu và hành động. Thường diễn ra trong cuộc họp review; có thể đánh giá mức chất lượng và nhu cầu follow-up.

5. **Fixing and reporting (Sửa và báo cáo)**  
   Tạo defect report cho defect thật; theo dõi hành động sửa. Khi đạt exit criteria thì chấp nhận work product và báo cáo kết quả review.

**Mẹo thi:** Nhớ thứ tự: Planning → Initiation → Individual review → Communication/analysis → Fixing and reporting.  
“Anomaly ≠ defect cho đến khi được phân tích” là bẫy hay gặp.

---

### 3.2.3 Vai trò và trách nhiệm trong Review (FL-3.2.3)

| Vai trò | Trách nhiệm chính |
|---------|-------------------|
| **Manager** | Quyết định cái gì được review; cung cấp nguồn lực (người, thời gian) |
| **Author** | Tạo work product; **sửa** các vấn đề |
| **Moderator / Facilitator** | Đảm bảo cuộc họp review hiệu quả; tuân thủ quy trình |
| **Reviewer** | Phát hiện defect / anomaly tiềm ẩn |
| **Scribe / Recorder** | Ghi lại vấn đề, quyết định và hành động |

**Quy tắc Inspection (hay ra đề):** Trong **inspection**, **author không được** làm review leader (moderator) hoặc scribe.

Ở review ít formal hơn, một người có thể kiêm nhiều vai (trừ ràng buộc formal của inspection ở trên).

---

### 3.2.4 Các loại Review (FL-3.2.4)

So sánh mức formal, người dẫn và mục tiêu chính:

| Loại review | Mức formal | Ai dẫn | Đặc điểm / mục tiêu chính |
|-------------|------------|--------|---------------------------|
| **Informal review** | Thấp | Thường không / peer | Ít hoặc không có quy trình; phản hồi nhanh (buddy check, pair programming) |
| **Walkthrough** | Trung bình | **Author** | Author giải thích work product; đào tạo, đồng thuận, ý tưởng mới, phát hiện anomaly; chuẩn bị cá nhân không bắt buộc |
| **Technical review** | Trung–Cao | **Moderator** | Reviewer đủ năng lực kỹ thuật; đồng thuận và quyết định kỹ thuật; phát hiện anomaly; đánh giá chất lượng |
| **Inspection** | Cao nhất | **Moderator** (không phải author) | Theo đủ quy trình chung; tối đa phát hiện anomaly; thu thập metric; author **không** làm leader hoặc scribe |

**Mục tiêu có thể gặp ở nhiều loại:** phát hiện anomaly, đánh giá chất lượng, tăng niềm tin, đào tạo, đạt đồng thuận, tạo ý tưởng mới, giúp author cải thiện.

**Mẹo thi:**  
- Author dẫn → thường là **walkthrough**  
- Formal nhất + metric + author không moderate → **inspection**  
- Peer xem nhanh → **informal**  
- Đồng thuận kỹ thuật có moderator → **technical review**

---

### 3.2.5 Yếu tố thành công của Review (FL-3.2.5)

- Mục tiêu **rõ ràng** và exit criteria **đo được**  
  - **Không bao giờ** lấy việc đánh giá **con người** làm mục tiêu review  
- Chọn **đúng loại review** theo mục tiêu, work product, người tham gia và ngữ cảnh  
- Review theo **phần nhỏ** để không mất tập trung  
- Cung cấp **phản hồi** cho stakeholder và author (cải thiện sản phẩm và quy trình)  
- Cho **đủ thời gian chuẩn bị**  
- **Sự hỗ trợ của quản lý** đối với quy trình review  
- Đưa review vào **văn hóa tổ chức** (học hỏi và cải tiến)  
- **Đào tạo đủ** để mọi người biết cách thực hiện vai trò  
- **Điều phối (facilitate)** cuộc họp hiệu quả  

**Mẹo thi:** “Không dùng review để đánh giá cá nhân author” là điểm success factor kinh điển.

---

## Checklist nhanh trước thi – Chương 3

| Chủ đề | Cần nhớ |
|--------|---------|
| Static vs dynamic | Không chạy vs có chạy; defect trực tiếp vs failure rồi mới ra defect |
| Giá trị | Sớm, rẻ, tài liệu + code, defect dynamic có thể bỏ sót |
| Thứ tự quy trình | Plan → Initiate → Individual review → Communicate/analyze → Fix & report |
| Vai trò | Manager, Author, Moderator, Reviewer, Scribe |
| Inspection | Formal nhất; có metric; author ≠ moderator/scribe |
| Walkthrough | Author dẫn |
| Thành công | Mục tiêu rõ, đúng loại, phần nhỏ, thời gian chuẩn bị, không đổ lỗi, quản lý hỗ trợ |

---

## Dạng câu hỏi thi điển hình

1. Work product nào kiểm được bằng static testing?  
2. Lợi ích của static testing so với chỉ dùng dynamic testing?  
3. Static testing tìm defect **trực tiếp** — đúng hay sai?  
4. Thứ tự các hoạt động trong quy trình review  
5. Ai sửa work product? → **Author**  
6. Ai dẫn walkthrough? → **Author**  
7. Loại review formal nhất? → **Inspection**  
8. Author có được làm moderator trong inspection không? → **Không**  
9. Success factor: có nên lấy việc đánh giá người tham gia làm mục tiêu review không? → **Không**  
10. Lợi ích của phản hồi stakeholder sớm  

---

## Mẹo học Chương 3

1. Thuộc **bốn loại review** và ai dẫn từng loại.  
2. Luyện bảng **static vs dynamic** đến mức phản xạ.  
3. Học **năm bước quy trình** theo đúng thứ tự.  
4. Liên hệ static testing với **early testing** và chi phí defect thấp hơn.  
5. Luyện câu theo LO: K1 = nhớ; K2 = giải thích / so sánh.  

**Luyện tập trong app**
- Quiz Chương 3 (Quiz 1, 2, 3)  
- Mock exam (nhiều câu static testing / review)  
- Tab Glossary Chương 3 cho từ khóa  
