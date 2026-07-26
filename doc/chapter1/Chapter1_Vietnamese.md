# ISTQB CTFL v4.0.1 – Chapter 1: Fundamentals of Testing

## 1.1 Testing là gì?

Testing là tập hợp các hoạt động nhằm phát hiện lỗi (defects) và đánh giá chất lượng của các sản phẩm phần mềm (test objects).

### Mục tiêu điển hình của Testing
- Tìm defects
- Tăng sự tự tin về mức độ chất lượng
- Cung cấp thông tin cho stakeholders
- Ngăn ngừa defects (đặc biệt qua static testing sớm)
- Xác minh (verification) rằng yêu cầu đã được thực hiện đúng
- Xác nhận (validation) rằng hệ thống đáp ứng nhu cầu người dùng

### Testing vs Debugging
- **Testing**: Phát hiện defects và failures.
- **Debugging**: Tìm nguyên nhân gốc rễ và sửa lỗi (thường do developer thực hiện).

---

## 1.2 Tại sao cần Testing?

Testing cần thiết vì defects phần mềm có thể gây ra hậu quả nghiêm trọng (mất tiền, mất uy tín, ảnh hưởng an toàn…).

### Điểm chính
- Testing góp phần vào thành công của dự án bằng cách tìm lỗi sớm (chi phí sửa chữa thấp hơn nhiều).
- Testing giảm rủi ro phần mềm thất bại khi đưa vào sử dụng.
- Testing cung cấp thông tin để stakeholders đưa ra quyết định (ví dụ: có release hay không).

### Testing vs Quality Assurance (QA)
- **Testing** là một hình thức kiểm soát chất lượng (hướng sản phẩm – phát hiện lỗi).
- **QA** hướng quy trình – nhằm ngăn ngừa lỗi bằng cách cải thiện quy trình.

### Error → Defect → Failure → Root Cause
| Thuật ngữ     | Định nghĩa |
|---------------|----------|
| **Error**     | Hành động của con người dẫn đến kết quả sai (sai lầm). |
| **Defect**    | Khiếm khuyết trong sản phẩm do error gây ra (còn gọi là bug hoặc fault). |
| **Failure**   | Hệ thống chạy ra kết quả khác với kết quả mong đợi. |
| **Root Cause**| Nguyên nhân gốc rễ gây ra defect. |

---

## 1.3 7 Nguyên tắc Testing (Rất quan trọng)

1. **Testing chỉ chứng minh sự hiện diện của defects, không chứng minh sự vắng mặt của chúng**  
   Testing có thể chứng minh có lỗi, nhưng không thể chứng minh không có lỗi.

2. **Testing toàn diện (exhaustive) là không thể**  
   Không thể test tất cả mọi trường hợp (trừ hệ thống rất đơn giản). Cần dùng kỹ thuật, ưu tiên và testing dựa trên rủi ro.

3. **Testing sớm tiết kiệm thời gian và tiền bạc**  
   Càng tìm lỗi sớm thì chi phí sửa chữa càng thấp.

4. **Defects thường tập trung (cluster)**  
   Phần lớn lỗi thường nằm ở một số module nhất định (nguyên tắc Pareto).

5. **Test cases bị “mòn” (Pesticide Paradox)**  
   Lặp lại cùng một bộ test cases sẽ dần không còn phát hiện được lỗi mới. Cần cập nhật và thay đổi test cases.

6. **Testing phụ thuộc vào ngữ cảnh (context dependent)**  
   Cách testing sẽ khác nhau tùy theo ngữ cảnh (ví dụ: hệ thống an toàn tính mạng khác với ứng dụng di động).

7. **Không có lỗi không có nghĩa là hệ thống tốt (Absence-of-errors fallacy)**  
   Việc tìm và sửa hết lỗi không giúp ích nếu hệ thống được xây dựng không đáp ứng nhu cầu người dùng.

---

## 1.4 Các hoạt động Testing, Testware và Vai trò

### Các hoạt động chính của Testing (Test Process)
1. Lập kế hoạch Testing (Test Planning)
2. Giám sát và Kiểm soát Testing (Test Monitoring and Control)
3. Phân tích Testing (Test Analysis)
4. Thiết kế Testing (Test Design)
5. Triển khai Testing (Test Implementation)
6. Thực thi Testing (Test Execution)
7. Kết thúc Testing (Test Completion)

### Testware
Tất cả các sản phẩm (artifacts) được tạo ra trong quá trình testing (test plan, test case, test data, test script, defect report, test report…).

### Traceability (Truy vết)
Khả năng liên kết giữa **Test Basis** (yêu cầu, user stories…) với **Testware** (test cases).  
Rất quan trọng để phân tích ảnh hưởng, đo coverage và quản lý thay đổi.

### Vai trò trong Testing
- Test Manager / Test Lead
- Tester
- Các vai trò khác cũng có thể thực hiện hoạt động testing (developer, BA, user) → **Whole Team Approach**

---

## 1.5 Kỹ năng thiết yếu và Thực hành tốt trong Testing

### Kỹ năng chung cần có
- Tư duy phân tích
- Kỹ năng giao tiếp
- Tính tò mò và chú ý đến chi tiết
- Kiến thức domain
- Kiến thức kỹ thuật

### Whole Team Approach
Toàn bộ team cùng chịu trách nhiệm về chất lượng.  
**Ưu điểm**: Cộng tác tốt hơn, cùng sở hữu chất lượng, phản hồi sớm hơn.

### Tính độc lập của Testing (Independence of Testing)
**Ưu điểm**: Khách quan hơn, có góc nhìn khác.  
**Nhược điểm**: Có thể bị cô lập, khó giao tiếp, phản hồi chậm.

---

**Mẹo học**: Tập trung hiểu và áp dụng 7 Nguyên tắc Testing + phân biệt rõ Error – Defect – Failure – Root Cause.