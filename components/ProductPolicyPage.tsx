import React from 'react';

const PolicySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold font-heading text-accent mb-3">{title}</h2>
        <div className="prose prose-lg max-w-none text-text-primary leading-relaxed prose-a:text-accent prose-strong:text-text-primary prose-ul:text-text-secondary">
            {children}
        </div>
    </div>
);

const ProductPolicyPage: React.FC = () => {
    return (
        <div className="bg-secondary py-16 md:py-24 animate-fade-in">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="text-center mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-text-primary">Chính sách Sản phẩm NK AI</h1>
                    <p className="mt-4 text-lg text-text-secondary">Ngày có hiệu lực: 24 tháng 7, 2024</p>
                </header>

                <PolicySection title="1. Mục đích và Phạm vi">
                    <p>Chính sách này mô tả các quy tắc và hướng dẫn cho việc sử dụng Nền tảng Trợ lý AI của NK ("NK AI"). Chính sách này áp dụng cho tất cả người dùng, bao gồm cả người dùng thử nghiệm và khách hàng trả phí, nhằm đảm bảo một môi trường an toàn, công bằng và hiệu quả.</p>
                </PolicySection>

                <PolicySection title="2. Chính sách về Dữ liệu và Bảo mật">
                    <p><strong>Bảo mật Dữ liệu:</strong> Chúng tôi cam kết bảo vệ tuyệt đối dữ liệu bạn cung cấp. Dữ liệu đầu vào (prompts) và nội dung bạn tương tác với AI được xử lý một cách an toàn.</p>
                    <p><strong>Sử dụng Dữ liệu:</strong> Dữ liệu của bạn chỉ được sử dụng để cung cấp dịch vụ cho bạn. Chúng tôi không sử dụng dữ liệu kinh doanh của khách hàng để huấn luyện các mô hình AI công khai. Mọi thông tin bạn nhập vào đều được coi là thông tin bí mật.</p>
                    <p><strong>Lưu trữ:</strong> Chúng tôi không lưu trữ lâu dài các truy vấn hoặc kết quả của bạn trừ khi cần thiết cho việc gỡ lỗi hoặc được bạn cho phép rõ ràng.</p>
                </PolicySection>

                <PolicySection title="3. Chính sách Sử dụng Hợp lý (Fair Use)">
                    <p>Để đảm bảo hiệu suất và sự ổn định cho tất cả người dùng, chúng tôi áp dụng chính sách sử dụng hợp lý. Người dùng không được:</p>
                    <ul>
                        <li>Sử dụng các công cụ tự động để truy cập dịch vụ với tần suất quá cao.</li>
                        <li>Sử dụng dịch vụ cho các mục đích bất hợp pháp, bao gồm tạo nội dung thù địch, lừa đảo hoặc vi phạm bản quyền.</li>
                        <li>Cố gắng khai thác, tấn công hoặc làm quá tải hệ thống của chúng tôi.</li>
                    </ul>
                    <p>Chúng tôi có quyền tạm thời giới hạn quyền truy cập nếu phát hiện hành vi lạm dụng.</p>
                </PolicySection>
                
                <PolicySection title="4. Cập nhật và Bảo trì">
                    <p>Chúng tôi liên tục cải tiến NK AI để mang lại giá trị tốt nhất. Điều này có nghĩa là các tính năng có thể được thêm, thay đổi hoặc xóa bỏ. Chúng tôi sẽ thông báo trước cho người dùng về các thay đổi quan trọng có thể ảnh hưởng đến trải nghiệm của họ qua email hoặc thông báo trên nền tảng.</p>
                </PolicySection>

                <PolicySection title="5. Miễn trừ Trách nhiệm">
                    <p>Các nội dung do AI tạo ra (bao gồm văn bản, phân tích, đề xuất) chỉ mang tính chất tham khảo. Chúng được cung cấp "nguyên trạng" mà không có bất kỳ sự đảm bảo nào về tính chính xác, đầy đủ hoặc phù hợp cho một mục đích cụ thể. Người dùng chịu hoàn toàn trách nhiệm trong việc xác minh và sử dụng thông tin do AI cung cấp. NK AI không chịu trách nhiệm cho bất kỳ quyết định kinh doanh hoặc tổn thất nào phát sinh từ việc sử dụng các kết quả này.</p>
                </PolicySection>

                <PolicySection title="6. Liên hệ">
                    <p>Nếu bạn có bất kỳ câu hỏi nào về chính sách này, vui lòng liên hệ với chúng tôi qua Hotline: <a href="tel:0817477788" className="hover:underline">0817 477 788</a> hoặc email hỗ trợ của chúng tôi.</p>
                </PolicySection>
            </div>
        </div>
    );
};

export default ProductPolicyPage;