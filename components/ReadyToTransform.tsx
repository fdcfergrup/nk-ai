import React from 'react';

const ReadyToTransform: React.FC = () => (
    <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold font-heading text-text-primary">Sẵn sàng để Chuyển đổi Doanh nghiệp của bạn?</h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">Bản demo này chỉ là một phần nhỏ trong những gì NK AI có thể làm. Hãy bắt đầu dùng thử đầy đủ tính năng để khai phá toàn bộ tiềm năng.</p>
            <a href="#" onClick={(e) => {e.preventDefault(); alert("Chức năng đang được phát triển!")}} className="mt-8 bg-accent text-primary font-bold py-4 px-10 rounded-lg text-lg hover:bg-accent-dark transition-transform transform hover:scale-105 inline-block shadow-lg shadow-accent/20">Bắt Đầu Dùng Thử Miễn Phí</a>
        </div>
    </section>
);

export default ReadyToTransform;