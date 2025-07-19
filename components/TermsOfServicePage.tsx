import React from 'react';

const TermsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold font-heading text-accent mb-3">{title}</h2>
        <div className="prose prose-lg max-w-none text-text-primary leading-relaxed prose-a:text-accent prose-strong:text-text-primary prose-ul:text-text-secondary">
            {children}
        </div>
    </div>
);


const TermsOfServicePage: React.FC = () => {
    return (
        <div className="bg-secondary py-16 md:py-24 animate-fade-in">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="text-center mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-text-primary">Điều khoản Dịch vụ NK AI</h1>
                    <p className="mt-4 text-lg text-text-secondary">Ngày có hiệu lực: 24 tháng 7, 2024</p>
                </header>

                <TermsSection title="1. Chấp nhận Điều khoản">
                    <p>Bằng cách truy cập hoặc sử dụng Nền tảng Trợ lý AI của NK ("Dịch vụ"), bạn đồng ý bị ràng buộc bởi các Điều khoản Dịch vụ này ("Điều khoản"). Nếu bạn không đồng ý với bất kỳ phần nào của Điều khoản, bạn không được phép truy cập Dịch vụ.</p>
                </TermsSection>

                <TermsSection title="2. Quyền và Nghĩa vụ của Người dùng">
                    <p><strong>Tài khoản:</strong> Bạn có trách nhiệm bảo mật thông tin tài khoản của mình, bao gồm mật khẩu. Bạn đồng ý không tiết lộ mật khẩu của mình cho bất kỳ bên thứ ba nào.</p>
                    <p><strong>Hành vi Người dùng:</strong> Bạn đồng ý không sử dụng Dịch vụ để:</p>
                    <ul>
                        <li>Thực hiện bất kỳ hành vi bất hợp pháp nào hoặc quảng bá hoạt động bất hợp pháp.</li>
                        <li>Xâm phạm quyền sở hữu trí tuệ của người khác.</li>
                        <li>Phân phối vi-rút, phần mềm độc hại hoặc bất kỳ mã độc nào khác.</li>
                        <li>Cố gắng can thiệp vào tính toàn vẹn hoặc bảo mật của Dịch vụ.</li>
                    </ul>
                </TermsSection>
                
                <TermsSection title="3. Quyền sở hữu Trí tuệ">
                    <p><strong>Dịch vụ:</strong> Dịch vụ và tất cả nội dung gốc, tính năng và chức năng của nó là và sẽ vẫn là tài sản độc quyền của NK Technology và các nhà cấp phép của nó. Dịch vụ được bảo vệ bởi bản quyền, nhãn hiệu và các luật khác.</p>
                    <p><strong>Nội dung của bạn:</strong> Bạn giữ quyền sở hữu trí tuệ đối với nội dung bạn cung cấp cho Dịch vụ. Bằng cách sử dụng Dịch vụ, bạn cấp cho chúng tôi giấy phép có giới hạn để sử dụng, xử lý và lưu trữ nội dung của bạn chỉ nhằm mục đích cung cấp và cải thiện Dịch vụ cho bạn.</p>
                </TermsSection>
                
                <TermsSection title="4. Giới hạn Trách nhiệm">
                    <p>Trong mọi trường hợp, NK Technology, cũng như các giám đốc, nhân viên, đối tác của mình, sẽ không chịu trách nhiệm pháp lý cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, do hậu quả hoặc mang tính trừng phạt nào, bao gồm nhưng không giới hạn ở việc mất lợi nhuận, dữ liệu, hoặc các tổn thất vô hình khác, phát sinh từ (i) việc bạn truy cập hoặc sử dụng hoặc không thể truy cập hoặc sử dụng Dịch vụ; (ii) mọi nội dung thu được từ Dịch vụ; và (iii) truy cập, sử dụng hoặc thay đổi trái phép các nội dung của bạn, cho dù dựa trên bảo hành, hợp đồng, sai phạm (bao gồm cả sơ suất) hay bất kỳ lý thuyết pháp lý nào khác.</p>
                </TermsSection>

                <TermsSection title="5. Tạm ngưng và Chấm dứt">
                    <p>Chúng tôi có thể chấm dứt hoặc tạm ngưng quyền truy cập của bạn vào Dịch vụ ngay lập tức, không cần thông báo trước hoặc chịu trách nhiệm pháp lý, vì bất kỳ lý do gì, bao gồm nhưng không giới hạn nếu bạn vi phạm các Điều khoản này. Khi chấm dứt, quyền sử dụng Dịch vụ của bạn sẽ ngay lập tức chấm dứt.</p>
                </TermsSection>

                <TermsSection title="6. Thay đổi Điều khoản">
                    <p>Chúng tôi có quyền, theo quyết định riêng của mình, sửa đổi hoặc thay thế các Điều khoản này bất kỳ lúc nào. Nếu một bản sửa đổi là quan trọng, chúng tôi sẽ cố gắng cung cấp thông báo ít nhất 30 ngày trước khi bất kỳ điều khoản mới nào có hiệu lực. Việc bạn tiếp tục sử dụng Dịch vụ sau những thay đổi đó cấu thành sự chấp nhận của bạn đối với các điều khoản mới.</p>
                </TermsSection>
                
                <TermsSection title="7. Luật pháp Điều chỉnh">
                    <p>Các Điều khoản này sẽ được điều chỉnh và hiểu theo luật pháp của Việt Nam, không tính đến các xung đột về quy định pháp luật.</p>
                </TermsSection>
            </div>
        </div>
    );
};

export default TermsOfServicePage;