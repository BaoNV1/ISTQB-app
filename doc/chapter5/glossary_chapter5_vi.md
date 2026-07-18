# Từ vựng ISTQB Chương 5 (Tiếng Việt)

Tài liệu này giải thích các khái niệm quan trọng trong Chương 5 theo cách dễ hiểu và thực tế hơn.

## 1. Lập kế hoạch kiểm thử
- Test plan (kế hoạch kiểm thử): Tài liệu mô tả cách tiếp cận, phạm vi, nguồn lực và lịch trình cho kiểm thử.
- Mục đích của test planning: Đảm bảo kiểm thử được tổ chức và phù hợp với mục tiêu dự án.
- Entry criteria (tiêu chí vào): Các điều kiện phải được thỏa mãn trước khi kiểm thử bắt đầu.
  - Ví dụ: Yêu cầu phải được phê duyệt trước khi bắt đầu kiểm thử hệ thống.
- Exit criteria (tiêu chí ra): Các điều kiện phải đạt được trước khi kiểm thử được coi là hoàn tất.
  - Ví dụ: Tất cả defect critical phải được sửa và retest.
- Estimation (ước lượng): Dự đoán lượng công sức, thời gian và nguồn lực cần cho kiểm thử.
- Test case prioritization (ưu tiên test case): Quyết định test nào nên được thực thi trước dựa trên mức độ quan trọng hoặc rủi ro.

## 2. Test pyramid và testing quadrants
- Test pyramid (kim tự tháp kiểm thử): Một mô hình đề xuất có nhiều unit test nhỏ, nhanh, ít integration test hơn và thậm chí ít UI test hơn.
- Testing quadrants (các góc phần tư kiểm thử): Một mô hình phân loại kiểm thử dựa trên mối quan tâm hướng tới doanh nghiệp và hướng tới công nghệ.
- Vì sao chúng quan trọng: Chúng giúp đội nhóm cân bằng chi phí, tốc độ và độ bao phủ.

## 3. Quản lý rủi ro
- Risk (rủi ro): Khả năng xảy ra một sự kiện hoặc kết quả tiêu cực.
- Project risk (rủi ro dự án): Rủi ro liên quan đến dự án, ví dụ chậm tiến độ, thiếu nguồn lực hoặc lập kế hoạch kém.
- Product risk (rủi ro sản phẩm): Rủi ro liên quan đến chất lượng hoặc hành vi của sản phẩm, ví dụ defect nghiêm trọng ảnh hưởng tới người dùng.
- Risk likelihood (xác suất rủi ro): Khả năng rủi ro xảy ra.
- Risk impact (tác động rủi ro): Mức độ nghiêm trọng nếu rủi ro xảy ra.
- Risk analysis (phân tích rủi ro): Xem xét rủi ro để hiểu xác suất và tác động của nó.
- Risk control (kiểm soát rủi ro): Các hành động nhằm giảm hoặc quản lý rủi ro.
- Risk-based testing (kiểm thử dựa trên rủi ro): Kiểm thử kỹ hơn ở các khu vực có rủi ro cao hơn.

## 4. Giám sát và điều khiển kiểm thử
- Test monitoring (giám sát kiểm thử): Theo dõi tiến độ và so sánh kết quả thực tế với kế hoạch.
- Test control (điều khiển kiểm thử): Hành động để giữ kiểm thử phù hợp với mục tiêu.
- Ví dụ: Nếu kiểm thử chậm tiến độ, đội nhóm có thể thay đổi ưu tiên hoặc bổ sung nguồn lực.

## 5. Báo cáo kiểm thử và giao tiếp
- Test progress report (báo cáo tiến độ kiểm thử): Báo cáo cho thấy đã kiểm thử những gì, phần còn lại và trạng thái hiện tại.
- Test completion report (báo cáo hoàn tất kiểm thử): Báo cáo được tạo khi kiểm thử kết thúc, tóm tắt kết quả và rủi ro còn lại.
- Vì sao báo cáo quan trọng: Chúng giúp các bên liên quan đưa ra quyết định đúng đắn.

## 6. Quản lý cấu hình
- Configuration management (quản lý cấu hình): Quá trình kiểm soát thay đổi đối với sản phẩm làm việc và giữ tổ chức các phiên bản.
- Vì sao quan trọng: Nó giúp đảm bảo sử dụng đúng phiên bản của yêu cầu, mã nguồn và tài nguyên kiểm thử.

## 7. Quản lý defect
- Defect management (quản lý defect): Quá trình báo cáo, theo dõi và giải quyết defect.
- Defect report (báo cáo defect): Tài liệu mô tả defect một cách rõ ràng và bao gồm các chi tiết liên quan như bước tái hiện, kết quả mong đợi và kết quả thực tế.
- Vì sao quan trọng: Báo cáo defect tốt giúp developer hiểu và sửa lỗi nhanh hơn.

## Mẹo ghi nhớ nhanh
- Lập kế hoạch trước, sau đó giám sát, điều khiển và báo cáo.
- Các khu vực có rủi ro cao cần được chú ý nhiều hơn trong kiểm thử.