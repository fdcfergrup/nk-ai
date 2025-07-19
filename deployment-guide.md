# Hướng dẫn triển khai NK AI lên Azure và GitHub

## 📋 Checklist trước khi triển khai

- [ ] Có tài khoản GitHub
- [ ] Có tài khoản Azure (có thể dùng free tier)
- [ ] Có Gemini API Key từ Google AI Studio
- [ ] Node.js 18+ đã cài đặt

## 🔧 Bước 1: Thiết lập local

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Cấu hình API Key:**
   - Mở file `.env.local`
   - Thay `PLACEHOLDER_API_KEY` bằng Gemini API key thật của bạn

3. **Test local:**
   ```bash
   npm run dev
   ```

## 📤 Bước 2: Đẩy code lên GitHub

1. **Khởi tạo Git repository (nếu chưa có):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: NK AI application"
   ```

2. **Tạo repository trên GitHub:**
   - Vào github.com
   - Tạo new repository tên "nk-ai"
   - Không tích "Initialize with README" (vì đã có sẵn)

3. **Kết nối và push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nk-ai.git
   git branch -M main
   git push -u origin main
   ```

## ☁️ Bước 3: Triển khai lên Azure Static Web Apps

### 3.1 Tạo Azure Static Web App

1. **Đăng nhập Azure Portal:** https://portal.azure.com
2. **Tạo resource mới:**
   - Search "Static Web Apps"
   - Click "Create"
   - Chọn subscription và resource group
   - Tên: "nk-ai-app"
   - Region: "East Asia" hoặc gần nhất
   - Source: "GitHub"

3. **Kết nối GitHub:**
   - Authorize Azure để access GitHub
   - Chọn organization và repository "nk-ai"
   - Branch: "main"

4. **Build configuration:**
   - Build Presets: "React"
   - App location: `/`
   - Api location: `` (để trống)
   - Output location: `dist`

5. **Review và Create**

### 3.2 Cấu hình Secrets

1. **Trong GitHub repository:**
   - Vào Settings > Secrets and variables > Actions
   - Thêm secrets:
     - `GEMINI_API_KEY`: API key thật của bạn
     - `AZURE_STATIC_WEB_APPS_API_TOKEN`: Sẽ tự động được thêm bởi Azure

## 🚀 Bước 4: Kiểm tra deployment

1. **GitHub Actions:**
   - Vào tab "Actions" trong GitHub repo
   - Xem workflow "Azure Static Web Apps CI/CD"
   - Đảm bảo build thành công

2. **Azure Portal:**
   - Vào Static Web App resource
   - Copy URL từ "URL" field
   - Test ứng dụng

## 🔄 Bước 5: Cập nhật và maintain

### Cập nhật code:
```bash
git add .
git commit -m "Update: description of changes"
git push
```

### Monitor:
- GitHub Actions logs
- Azure Static Web Apps logs
- Application Insights (nếu enable)

## 🛠️ Troubleshooting

### Build fails:
- Kiểm tra Node.js version trong pipeline
- Xem logs trong GitHub Actions
- Đảm bảo dependencies đúng trong package.json

### API không hoạt động:
- Kiểm tra GEMINI_API_KEY trong GitHub Secrets
- Verify API key còn valid
- Check network requests trong browser DevTools

### Static Web App không load:
- Kiểm tra staticwebapp.config.json
- Verify build output trong dist/
- Check routing configuration

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. GitHub Actions logs
2. Azure Static Web Apps deployment logs
3. Browser console errors
4. Network tab trong DevTools