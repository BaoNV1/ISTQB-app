# ISTQB CTFL v4.0.1 – Chương 5: Quản lý các hoạt động Kiểm thử

**Trọng tâm thi (syllabus: 335 phút):**  
Nhiều câu về nội dung test plan, entry/exit criteria, ước lượng (K3), ưu tiên test case (K3), rủi ro (project vs product, risk level), metric/báo cáo, configuration management, và **viết defect report (K3)**.

**Mục tiêu học tập:**
- FL-5.1.1 (K2) Mục đích và nội dung test plan  
- FL-5.1.2 (K1) Giá trị của tester trong lập kế hoạch iteration và release  
- FL-5.1.3 (K2) Entry criteria so với exit criteria  
- FL-5.1.4 (K3) Kỹ thuật ước lượng effort kiểm thử  
- FL-5.1.5 (K3) Áp dụng ưu tiên test case  
- FL-5.1.6 (K1) Khái niệm test pyramid  
- FL-5.1.7 (K2) Testing quadrants và quan hệ với test level / test type  
- FL-5.2.1 (K1) Risk level = likelihood × impact  
- FL-5.2.2 (K2) Project risk so với product risk  
- FL-5.2.3 (K2) Phân tích product risk ảnh hưởng độ sâu và phạm vi kiểm thử  
- FL-5.2.4 (K2) Biện pháp ứng phó product risk đã phân tích  
- FL-5.3.1 (K1) Metric dùng trong kiểm thử  
- FL-5.3.2 (K2) Mục đích, nội dung, đối tượng của test report  
- FL-5.3.3 (K2) Cách truyền đạt trạng thái kiểm thử  
- FL-5.4.1 (K2) Configuration management hỗ trợ kiểm thử như thế nào  
- FL-5.5.1 (K3) Soạn defect report  

**Từ khóa:** defect management, defect report, entry criteria, exit criteria, product risk, project risk, risk, risk analysis, risk assessment, risk control, risk identification, risk level, risk management, risk mitigation, risk monitoring, risk-based testing, test approach, test completion report, test control, test monitoring, test plan, test planning, test progress report, test pyramid, test strategy, testing quadrants  

---

## 5.1 Lập kế hoạch Kiểm thử (Test Planning)

### 5.1.1 Mục đích và Nội dung của Test Plan (FL-5.1.1)

**Test plan** mô tả mục tiêu, nguồn lực và quy trình kiểm thử của một dự án kiểm thử.

**Mục đích của test plan:**
- Ghi nhận **cách thức và lịch trình** để đạt mục tiêu kiểm thử  
- Giúp đảm bảo các hoạt động kiểm thử đáp ứng tiêu chí đã đặt ra  
- Là phương tiện **giao tiếp** với team và stakeholder  
- Thể hiện việc tuân thủ **test policy** và **test strategy** (hoặc giải thích lý do lệch)  
- Buộc suy nghĩ trước về rủi ro, lịch, người, tool, chi phí, effort  

**Nội dung điển hình của test plan:**
- Ngữ cảnh kiểm thử (phạm vi, mục tiêu, test basis)  
- Giả định và ràng buộc  
- Stakeholder (vai trò, trách nhiệm, nhu cầu đào tạo)  
- Giao tiếp (hình thức, tần suất, template)  
- Risk register (product risk, project risk)  
- **Test approach** (level, type, technique, deliverable, entry/exit criteria, độc lập kiểm thử, metric, test data, môi trường, lệch so với policy/strategy)  
- Ngân sách và lịch trình  

Chi tiết thêm: ISO/IEC/IEEE 29119-3.

**Mẹo thi:** Phân biệt **test policy** (cấp tổ chức), **test strategy** (cách tiếp cận tổng thể), và **test plan** (kế hoạch cụ thể cho dự án).

---

### 5.1.2 Đóng góp của Tester vào Lập kế hoạch Iteration và Release (FL-5.1.2)

Trong SDLC lặp (iterative) thường có hai tầng lập kế hoạch:

| Loại lập kế hoạch | Trọng tâm | Đóng góp của tester |
|-------------------|-----------|---------------------|
| **Release planning** | Cả release / product backlog | User story & acceptance criteria có thể kiểm thử; phân tích rủi ro dự án/chất lượng; ước lượng effort kiểm thử qua các iteration; định hình test approach tổng thể |
| **Iteration planning** | Iteration / sprint tiếp theo | Chia nhỏ công việc; tinh chỉnh ước lượng; xác định task kiểm thử; làm rõ sẵn sàng (Definition of Ready) |

Tester thêm giá trị bằng cách xác định effort và rủi ro kiểm thử, phản hồi về **testability**, làm rõ acceptance criteria, và tham gia ước lượng.

---

### 5.1.3 Entry Criteria và Exit Criteria (FL-5.1.3)

| | **Entry criteria** | **Exit criteria** |
|--|--------------------|-------------------|
| Ý nghĩa | Điều kiện trước khi **bắt đầu** kiểm thử (hoặc một phase) | Điều kiện trước khi coi kiểm thử **đã hoàn thành** |
| Ví dụ | Nguồn lực sẵn sàng (người, tool, môi trường, data); testware có sẵn; chất lượng ban đầu (ví dụ smoke test pass) | Đạt mục tiêu coverage; số defect chưa xử lý trong ngưỡng; test đã lên kế hoạch đã chạy; defect đã báo cáo; regression đã tự động hóa |
| Tên trong Agile | Thường gọi **Definition of Ready** | Thường gọi **Definition of Done** |

**Điểm thi quan trọng:**
- Hết **thời gian hoặc ngân sách** vẫn có thể là exit criterion hợp lệ nếu stakeholder chấp nhận rủi ro còn lại.  
- Entry/exit có thể áp dụng cho một **test level**, iteration, hoặc cả dự án.  

---

### 5.1.4 Kỹ thuật Ước lượng (FL-5.1.4) — K3

Ước lượng effort kiểm thử là dự đoán khối lượng công việc để đạt mục tiêu kiểm thử. Ước lượng dựa trên giả định và luôn có sai số. Task **nhỏ** thường ước lượng chính xác hơn task lớn → nên chia nhỏ.

**Bốn kỹ thuật trong syllabus:**

| Kỹ thuật | Loại | Ý tưởng |
|----------|------|---------|
| **Estimation based on ratios** | Dựa trên metric | Dùng tỷ lệ lịch sử (ví dụ development:test = 3:2). Nếu effort dev = 600 person-days → test ≈ 400 |
| **Extrapolation** | Dựa trên metric | Từ effort đã dùng và tiến độ hiện tại, suy ra effort còn lại |
| **Wideband Delphi** | Dựa trên chuyên gia | Chuyên gia ước lượng lặp, thảo luận, ước lượng lại đến khi đồng thuận. **Planning Poker** là biến thể |
| **Three-point estimation** | Dựa trên chuyên gia | Lạc quan (a), Có khả năng nhất (m), Bi quan (b). Thường E = (a + 4m + b) / 6 |

**Mẹo thi:** Có thể phải tính nhanh theo tỷ lệ hoặc công thức three-point.

---

### 5.1.5 Ưu tiên Test Case (FL-5.1.5) — K3

Ưu tiên để test quan trọng chạy sớm (thời gian hạn chế, tập trung rủi ro, phản hồi nhanh).

**Chiến lược ưu tiên phổ biến:**
- **Dựa trên rủi ro** — product risk cao trước  
- **Tầm quan trọng business / requirement**  
- **Dựa trên coverage** (requirements, code, risks)  
- **Phụ thuộc** (test setup trước)  
- **Tần suất sử dụng / critical path**  
- **Độ phức tạp / lịch sử defect**  

**Mẹo thi:** Cho scenario ngắn, chọn test nào chạy trước và giải thích (thường là risk hoặc business impact).

---

### 5.1.6 Test Pyramid (FL-5.1.6)

Khái niệm về hình dạng bộ test tự động.

| Tầng | Test điển hình | Số lượng tương đối |
|------|----------------|--------------------|
| **Đỉnh** | E2E / UI / system | Ít (chậm, dễ gãy) |
| **Giữa** | Integration / API | Trung bình |
| **Đáy** | Unit / component | Nhiều (nhanh, ổn định) |

**Ý tưởng:** Ưu tiên nhiều test tầng thấp nhanh; ít test tầng cao đắt đỏ. Hỗ trợ CI và phản hồi nhanh.

---

### 5.1.7 Testing Quadrants (FL-5.1.7)

Hai trục:
- **Business-facing** vs **Technology-facing**  
- **Support the team** (hỗ trợ phát triển) vs **Critique the product** (đánh giá sản phẩm)

| Góc phần tư | Hướng | Mục đích | Ví dụ test |
|-------------|-------|----------|------------|
| **Q1** | Technology | Support the team | Component test, component integration; thường tự động trong CI |
| **Q2** | Business | Support the team | Functional test, example, user story test, prototype, API theo acceptance criteria |
| **Q3** | Business | Critique the product | Exploratory, usability, UAT; thường thủ công, hướng người dùng |
| **Q4** | Technology | Critique the product | Smoke, performance, security, non-functional khác (trừ usability); thường tự động |

**Mẹo thi:** Gán một loại test vào đúng quadrant (ví dụ performance → Q4; exploratory → Q3; unit → Q1).

---

## 5.2 Quản lý Rủi ro (Risk Management)

**Risk-based testing:** chọn, ưu tiên và quản lý hoạt động kiểm thử dựa trên phân tích và kiểm soát rủi ro.

Hoạt động chính:
1. **Risk analysis** = nhận diện rủi ro + đánh giá rủi ro  
2. **Risk control** = giảm thiểu rủi ro + giám sát rủi ro  

---

### 5.2.1 Risk Level (FL-5.2.1)

**Risk** = sự kiện/tình huống tiềm ẩn khi xảy ra gây ảnh hưởng bất lợi.

| Yếu tố | Ý nghĩa |
|--------|---------|
| **Risk likelihood** | Xác suất xảy ra (lớn hơn 0 và nhỏ hơn 1) |
| **Risk impact** | Hậu quả / mức thiệt hại nếu xảy ra |
| **Risk level** | Mức rủi ro kết hợp likelihood và impact (thường likelihood × impact) |

Risk level càng cao → càng cần xử lý.

---

### 5.2.2 Project Risk so với Product Risk (FL-5.2.2)

| | **Project risk** | **Product risk** |
|--|------------------|------------------|
| Liên quan | Thành công của **dự án** | Chất lượng của **sản phẩm** |
| Ví dụ | Trễ lịch, thiếu kỹ năng, tool chậm, ngân sách, môi trường chưa sẵn | Lỗi chức năng, hiệu năng, bảo mật, độ tin cậy, thiếu tính năng |
| Liên hệ kiểm thử | Có thể chặn hoặc làm chậm kiểm thử | Thường được xử lý **bằng** kiểm thử (test cái gì / test bao nhiêu) |

**Mẹo thi:** “Tester rời dự án” → project risk. “Thanh toán lỗi dưới tải cao” → product risk.

---

### 5.2.3 Phân tích Product Risk ảnh hưởng Kiểm thử (FL-5.2.3)

Phân tích product risk ảnh hưởng:
- **Cái gì** cần test (phạm vi)  
- Test **kỹ đến đâu** (độ sâu, kỹ thuật, coverage)  
- **Thứ tự** kiểm thử (ưu tiên)  
- Phân bổ **effort và kỹ năng**  

Vùng rủi ro cao được test nhiều hơn, sớm hơn, và mạnh hơn.

---

### 5.2.4 Biện pháp ứng phó Product Risk (FL-5.2.4)

Các lựa chọn: giảm thiểu bằng testing, chấp nhận, chuyển giao, hoặc kế hoạch dự phòng.

**Giảm thiểu bằng testing (ví dụ):**
- Chọn tester có kỹ năng phù hợp loại rủi ro  
- Tăng mức **độc lập** của kiểm thử  
- Review và static analysis  
- Kỹ thuật mạnh hơn và coverage cao hơn  
- Test type nhắm đúng đặc tính chất lượng bị ảnh hưởng  
- Dynamic testing kể cả **regression**  

**Risk monitoring** kiểm tra biện pháp có hiệu quả và theo dõi rủi ro mới.

---

## 5.3 Giám sát, Kiểm soát và Hoàn thành Kiểm thử

| Hoạt động | Vai trò |
|-----------|---------|
| **Test monitoring** | Thu thập thông tin; đánh giá tiến độ; kiểm tra exit criteria (coverage rủi ro, requirement, acceptance criteria…) |
| **Test control** | Dùng dữ liệu monitoring để đưa **control directive** (hành động điều chỉnh) |
| **Test completion** | Ở các mốc: tổng hợp dữ liệu, kinh nghiệm, testware; lập báo cáo hoàn thành |

**Ví dụ control directive:**
- Ưu tiên lại test khi rủi ro trở thành vấn đề thực tế  
- Đánh giá lại entry/exit sau rework  
- Điều chỉnh lịch nếu môi trường trễ  
- Bổ sung nguồn lực khi cần  

---

### 5.3.1 Metric dùng trong Kiểm thử (FL-5.3.1)

Metric phổ biến:
- Tiến độ test case (kế hoạch / đã chạy / pass / fail / blocked)  
- Metric defect (tìm thấy, đã sửa, còn mở, severity, density, detection rate)  
- Coverage (requirement, risk, code, acceptance criteria)  
- Lịch và chi phí so với kế hoạch  
- Tỷ lệ pass/fail  

Metric hỗ trợ monitoring, control và báo cáo — không thay thế phán đoán chuyên môn.

---

### 5.3.2 Test Report — Mục đích, Nội dung, Đối tượng (FL-5.3.2)

| Loại báo cáo | Khi nào | Mục đích |
|--------------|---------|----------|
| **Test progress report** | Trong quá trình test | Trạng thái so với kế hoạch; hỗ trợ quyết định control |
| **Test completion report** | Kết thúc level / dự án / mốc | Tóm tắt kết quả, rủi ro còn lại, khuyến nghị |

Điều chỉnh **nội dung và mức chi tiết** theo **đối tượng** (team vs quản lý vs khách hàng).

Nội dung điển hình: tiến độ, metric, defect, rủi ro, lệch kế hoạch, blocker, khuyến nghị.

---

### 5.3.3 Truyền đạt Trạng thái Kiểm thử (FL-5.3.3)

- Dashboard và biểu đồ  
- Progress / completion report  
- Stand-up và họp review  
- Tóm tắt defect và rủi ro  

Giao tiếp cần **kịp thời, chính xác, phù hợp đối tượng**.

---

## 5.4 Configuration Management (FL-5.4.1)

**Configuration management (CM)** nhận diện, kiểm soát và theo dõi phiên bản các work product.

**CM hỗ trợ kiểm thử như thế nào:**
- Đúng **phiên bản** code, testware và tài liệu được sử dụng  
- Thay đổi được kiểm soát và biết rõ  
- **Truy xuất nguồn gốc (traceability)** giữa requirement, test, build và kết quả  
- Môi trường và baseline kiểm thử có thể tái tạo  
- Có thể chạy lại test trên cấu hình đã biết  

Không có CM, kết quả test có thể không đáng tin (“đã test build nào?”).

---

## 5.5 Quản lý Defect (FL-5.5.1) — K3

Quản lý defect: ghi nhận anomaly từ phát hiện đến đóng, với quy tắc phân loại. Nên xử lý tương tự với phát hiện từ static testing khi phù hợp.

**Mục tiêu của defect report:**
- Cung cấp đủ thông tin để người xử lý sửa được vấn đề  
- Theo dõi chất lượng work product  
- Đưa ý tưởng cải tiến quy trình phát triển và kiểm thử  

### Nội dung điển hình của defect report (dynamic testing)

| Trường | Vì sao quan trọng |
|--------|-------------------|
| Unique identifier | Theo dõi |
| Title / tóm tắt ngắn | Hiểu nhanh |
| Ngày, author, tổ chức, vai trò | Trách nhiệm |
| Test object và **môi trường** | Tái hiện |
| Ngữ cảnh (test case, hoạt động, phase, kỹ thuật, data) | Phân tích |
| Các bước tái hiện + log/screenshot | Sửa và xác nhận |
| Kết quả **mong đợi** vs **thực tế** | Rõ ràng |
| **Severity** (mức ảnh hưởng stakeholder) | Tác động chất lượng |
| **Priority** sửa | Lịch xử lý |
| Status (open, deferred, duplicate, fixed, retest, closed, rejected…) | Quy trình |
| Tham chiếu (ví dụ test case id) | Traceability |

**Mẹo thi (K3):** Cho scenario, chọn thông tin bắt buộc trong defect report (đặc biệt: bước tái hiện, expected/actual, môi trường, severity/priority).

---

## Checklist nhanh trước thi – Chương 5

| Chủ đề | Cần nhớ |
|--------|---------|
| Test plan | Mục tiêu, approach, entry/exit, rủi ro, lịch, nguồn lực |
| Entry vs exit | Điều kiện bắt đầu vs kết thúc; DoR / DoD trong Agile |
| Ước lượng | Ratio, extrapolation, Wideband Delphi / Planning Poker, three-point |
| Ưu tiên | Risk và business impact trước |
| Pyramid | Nhiều unit, ít E2E |
| Quadrants | Q1 unit/CI; Q2 story/acceptance; Q3 exploratory/UAT; Q4 performance/security |
| Risk level | Likelihood × impact |
| Project vs product risk | Giao hàng dự án vs chất lượng sản phẩm |
| Monitoring vs control | Thu thập dữ liệu vs hành động điều chỉnh |
| CM | Đúng phiên bản, traceability, baseline tái tạo được |
| Defect report | Bước, expected/actual, môi trường, severity, priority |

---

## Dạng câu hỏi thi điển hình

1. Nội dung nào thuộc test plan?  
2. Entry hay exit criterion — cái nào là cái nào?  
3. Tính effort test từ tỷ lệ dev:test hoặc công thức three-point.  
4. Test nào chạy trước khi thiếu thời gian?  
5. Gán loại test vào đúng testing quadrant.  
6. Project risk hay product risk?  
7. Product risk cao thay đổi kiểm thử như thế nào?  
8. Ví dụ control directive sau monitoring.  
9. CM giúp kiểm thử thế nào?  
10. Defect report tốt cần những trường nào?

---

## Mẹo học Chương 5

1. Luyện mục **K3**: tính ước lượng, scenario ưu tiên, nội dung defect report.  
2. Thuộc **entry vs exit** và **DoR / DoD** trong Agile.  
3. Luyện **project vs product risk** bằng ví dụ.  
4. Ghép test với **pyramid** và **quadrants**.  
5. Phân biệt **progress report** và **completion report**.  

**Luyện tập trong app**
- Quiz Chương 5 (Quiz 1, 2, 3)  
- Mock exam (câu planning, risk, defect report)  
- Tab Glossary Chương 5 cho từ khóa  
