# ISTQB CTFL v4.0.1 – Chương 3: Kiểm thử tĩnh (Static Testing)

## 3.1 Cơ bản về Kiểm thử tĩnh

### Kiểm thử tĩnh là gì?
Kiểm thử tĩnh là việc **xem xét / rà soát** các sản phẩm công việc **mà không thực thi** phần mềm.  
Có thể áp dụng cho hầu hết các sản phẩm công việc (yêu cầu, thiết kế, mã nguồn, test case…).

### 3.1.1 Các sản phẩm công việc có thể kiểm thử tĩnh
- Đặc tả yêu cầu / User stories
- Tài liệu thiết kế / Kiến trúc
- Mã nguồn
- Test case, test plan
- Tài liệu hướng dẫn người dùng
- Mô hình, hợp đồng…

### 3.1.2 Giá trị của Kiểm thử tĩnh
- Phát hiện lỗi sớm → chi phí sửa chữa thấp hơn
- Ngăn lỗi lan sang các giai đoạn sau
- Cải thiện chất lượng sản phẩm và tài liệu
- Tăng cường giao tiếp và sự hiểu biết chung trong team
- Có thể tìm ra các lỗi khó phát hiện bằng kiểm thử động (thiếu yêu cầu, lỗi thiết kế…)

### 3.1.3 Sự khác biệt giữa Kiểm thử tĩnh và Kiểm thử động

| Khía cạnh          | Kiểm thử tĩnh                              | Kiểm thử động                               |
|--------------------|--------------------------------------------|---------------------------------------------|
| Thực thi           | Không chạy code                            | Phải chạy phần mềm                          |
| Thời điểm          | Sớm (thậm chí trước khi có code)           | Sau khi có code                             |
| Loại lỗi tìm được  | Thiếu yêu cầu, lỗi thiết kế, vi phạm chuẩn…| Lỗi chức năng, hiệu năng, crash…            |
| Kỹ thuật           | Review, phân tích tĩnh                     | Thực thi test case                          |

Cả hai phương pháp bổ sung cho nhau.

---

## 3.2 Quy trình Phản hồi và Rà soát

### 3.2.1 Lợi ích của phản hồi sớm và thường xuyên từ stakeholder
- Phát hiện hiểu nhầm sớm
- Cải thiện chất lượng sản phẩm
- Tăng sự tham gia và trách nhiệm của stakeholder
- Giảm rework ở giai đoạn sau

### 3.2.2 Các hoạt động trong quy trình Review
1. Lập kế hoạch
2. Khởi động review (kick-off)
3. Review cá nhân (chuẩn bị)
4. Trao đổi và phân tích vấn đề (họp review)
5. Sửa lỗi và báo cáo
6. Theo dõi (follow-up)

### 3.2.3 Vai trò trong Review
- **Author (Tác giả)**: Tạo sản phẩm công việc và chịu trách nhiệm sửa lỗi
- **Manager**: Quyết định thực hiện review và phân bổ nguồn lực
- **Moderator / Facilitator**: Lập kế hoạch, điều hành cuộc họp review
- **Reviewer**: Tìm kiếm các lỗi tiềm ẩn
- **Scribe**: Ghi nhận vấn đề, quyết định và action items

### 3.2.4 Các loại Review
| Loại Review       | Mức độ chính thức | Đặc điểm chính                                      | Trường hợp sử dụng điển hình     |
|-------------------|-------------------|-----------------------------------------------------|----------------------------------|
| Informal Review   | Thấp              | Không có quy trình chính thức, phản hồi nhanh       | Pair programming, buddy check    |
| Walkthrough       | Trung bình        | Tác giả dẫn dắt và giải thích sản phẩm              | Chia sẻ kiến thức, training      |
| Technical Review  | Trung bình – Cao  | Tập trung vào tính đúng đắn và chất lượng kỹ thuật  | Review thiết kế / kiến trúc      |
| Inspection        | Cao               | Quy trình chính thức, có vai trò, metrics, ghi nhận | Tài liệu hoặc code quan trọng    |

### 3.2.5 Yếu tố thành công của Review
- Mục tiêu và phạm vi rõ ràng
- Người tham gia phù hợp và có kỹ năng
- Thời gian chuẩn bị đầy đủ
- Điều hành tốt
- Không khí an toàn tâm lý (không đổ lỗi)
- Có follow-up các vấn đề đã phát hiện
- Có sự hỗ trợ của quản lý