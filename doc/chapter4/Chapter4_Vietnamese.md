# Chương 4: Phân tích và thiết kế kiểm thử

## 4.1 Kỹ thuật kiểm thử

Kỹ thuật kiểm thử giúp kiểm thử viên suy ra điều kiện và ca kiểm thử từ yêu cầu, mô hình, mã nguồn và kinh nghiệm. Kỹ thuật phù hợp làm rõ lý do chọn ca kiểm thử và giúp phát hiện các khoảng trống trong độ bao phủ.

## 4.2 Kỹ thuật hộp đen

Kỹ thuật hộp đen thiết kế kiểm thử dựa trên hành vi mong đợi của hệ thống mà không phụ thuộc vào cách cài đặt bên trong.

- **Phân vùng tương đương** chia dữ liệu vào hoặc ra thành các nhóm mà hệ thống dự kiến xử lý giống nhau. Chọn giá trị đại diện cho cả phân vùng hợp lệ và không hợp lệ.
- **Phân tích giá trị biên** tập trung vào ranh giới của các phân vùng. Các giá trị tại, ngay dưới và ngay trên biên thường có giá trị cao.
- **Kiểm thử bảng quyết định** biểu diễn các tổ hợp điều kiện và hành động tương ứng, phù hợp với nhiều luật nghiệp vụ.
- **Kiểm thử chuyển trạng thái** mô hình hóa trạng thái, sự kiện, điều kiện và chuyển đổi. Cần kiểm thử cả chuyển đổi hợp lệ lẫn sự kiện không hợp lệ.

## 4.3 Kỹ thuật hộp trắng

Kỹ thuật hộp trắng sử dụng cấu trúc bên trong của phần mềm. Kiểm thử câu lệnh hướng đến việc thực thi các câu lệnh có thể chạy; kiểm thử nhánh hướng đến các kết quả của quyết định. Độ bao phủ là chỉ báo hữu ích nhưng không chứng minh kiểm thử đã đầy đủ.

## 4.4 Kỹ thuật dựa trên kinh nghiệm

Đoán lỗi dự đoán các lỗi có khả năng xảy ra dựa trên kinh nghiệm. Kiểm thử thăm dò kết hợp việc học, thiết kế và thực thi kiểm thử. Kiểm thử dựa trên danh sách kiểm tra dùng một danh sách các điểm cần kiểm tra để tạo sự nhất quán.

## 4.5 Phương pháp cộng tác

User story mô tả tính năng từ góc nhìn người dùng. Tiêu chí chấp nhận xác định các điều kiện tính năng phải đáp ứng. Với ATDD, nhóm cùng thảo luận và viết kiểm thử chấp nhận trước khi triển khai.
