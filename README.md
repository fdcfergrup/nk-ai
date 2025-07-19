# NK AI - Ứng dụng AI với React và Gemini

Ứng dụng web hiện đại sử dụng React, TypeScript và Google Gemini AI API.

## 🚀 Chạy ứng dụng local

**Yêu cầu:** Node.js 18+ và npm

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Cấu hình API Key:**
   - Tạo file `.env.local` (nếu chưa có)
   - Thêm Gemini API key của bạn:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Chạy ứng dụng:**
   ```bash
   npm run dev
   ```

4. **Mở trình duyệt:** http://localhost:5173

## 🏗️ Build cho production

```bash
npm run build
npm run preview
```

## ☁️ Triển khai lên Azure

Ứng dụng này được cấu hình để triển khai tự động lên Azure Static Web Apps thông qua GitHub Actions.

### Thiết lập Azure Static Web Apps:

1. Tạo Azure Static Web App resource
2. Kết nối với GitHub repository
3. Thêm secrets trong GitHub:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - `GEMINI_API_KEY`

### Cấu hình build:
- **App location:** `/`
- **Api location:** `` (để trống)
- **Output location:** `dist`

## 🛠️ Công nghệ sử dụng

- **Frontend:** React 19, TypeScript, Vite
- **AI:** Google Gemini API
- **Charts:** Chart.js
- **Deployment:** Azure Static Web Apps
- **CI/CD:** GitHub Actions

## 📁 Cấu trúc dự án

```
├── components/          # React components
├── contexts/           # React contexts
├── data/              # Static data
├── services/          # API services
├── .github/workflows/ # GitHub Actions
├── dist/             # Build output
└── public/           # Static assets
```

## 🔧 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview build local
- `npm start` - Start production server

## 📝 Ghi chú

- Đảm bảo có Gemini API key hợp lệ
- Kiểm tra Azure Static Web Apps configuration
- Xem logs trong GitHub Actions để debug deployment
