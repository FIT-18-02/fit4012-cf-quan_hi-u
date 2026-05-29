# 🔐 CF04 - Demo Bảo Mật Mật Khẩu: Hashing & Mật Khẩu Yếu

> Một bài demo giáo dục toàn diện minh họa sự khác biệt tới tại giữa lưu trữ mật khẩu không an toàn dạng plaintext và các kỹ thuật hashing hiện đại sử dụng bcrypt.

---

## 🎯 Tổng Quan

**CF04** là một bài demo tương tác trên web dạy về các khái niệm bảo mật mật khẩu thông qua các ví dụ thực tế. Demo này so sánh hai phương pháp xác thực:

1. **Hệ Thống Cũ (Không An Toàn):** Lưu trữ mật khẩu dạng plaintext
2. **Hệ Thống Mới (An Toàn):** Sử dụng hashing bcrypt kết hợp salt

Bằng cách tương tác với cả hai hệ thống song song, những người học sẽ có kinh nghiệm thực hành hiểu rõ tại sao hashing mật khẩu đúng cách là rất quan trọng cho bảo mật ứng dụng.

---

## 💡 Các Khái Niệm Chính

### Lưu Trữ Mật Khẩu Plaintext ❌
- Mật khẩu được lưu trữ trực tiếp trong cơ sở dữ liệu
- **Rủi Ro Tới Hạn:** Nếu cơ sở dữ liệu bị lộ, tất cả mật khẩu bị đọc ngay lập tức
- Vi phạm các nguyên tắc bảo mật cơ bản
- Dễ bị tấn công vỡ dữ liệu và truy cập trái phép

### Phương Pháp Hash + Salt ✅
- **Hàm Hash:** Hàm mật mã không thể đảo ngược, chuyển đổi mật khẩu thành chuỗi độ dài cố định
- **Salt:** Dữ liệu ngẫu nhiên được thêm trước khi hash để ngăn chặn tấn công rainbow table
- **Bcrypt:** Thư viện tiêu chuẩn công nghiệp triển khai PBKDF2 với quản lý salt tích hợp
- Ngay cả khi cơ sở dữ liệu bị lộ, mật khẩu vẫn được bảo vệ

---

## ✨ Tính Năng

### Bảng Điều Khiển Tương Tác
- **Giao Diện So Sánh:** Xem phương pháp xác thực cũ và mới cùng lúc
- **Xác Thực Chính Sách Mật Khẩu:** Minh họa tính năng phát hiện mật khẩu yếu
- **Hashing Thời Gian Thực:** Xem mật khẩu được hash với bcrypt
- **Mô Phỏng Cơ Sở Dữ Liệu:** Trình bày trực quan dữ liệu được lưu trữ

### Hệ Thống Xác Thực
- ✔️ Đăng ký người dùng với xác thực độ mạnh mật khẩu
- ✔️ Hashing mật khẩu an toàn sử dụng bcrypt.js
- ✔️ Xác minh đăng nhập theo các hash được lưu trữ
- ✔️ Phát hiện và ngăn chặn mật khẩu yếu

### Tính Năng Bảo Mật
- **Yêu Cầu Độ Phức Tạp Mật Khẩu:** Tối thiểu 8 ký tự
- **Danh Sách Đen Mật Khẩu Yếu:** Phát hiện các mẫu phổ biến (ví dụ: "123456", "password")
- **Xác Minh Hash:** Minh họa so khớp mật khẩu an toàn mà không cần lộ mật khẩu gốc

---

## 🛠️ Công Nghệ Sử Dụng

| Công Nghệ | Mục Đích | Phiên Bản |
|-----------|----------|----------|
| **HTML5** | Cấu trúc và markup | - |
| **CSS3** | Kiểu dáng và bố cục | - |
| **JavaScript (Vanilla)** | Logic và tương tác | ES6+ |
| **Bcrypt.js** | Thư viện hashing mật khẩu | 2.4.3 |

### Thư Viện Sử Dụng
- **bcryptjs** - Hashing mật khẩu phía client thông qua CDN
  - Tạo salt an toàn (`genSaltSync()`)
  - Tạo hash (`hashSync()`)
  - Xác minh hash (`compareSync()`)

---

## 📋 Yêu Cầu Hệ Thống

- Trình duyệt web hiện đại (Chrome, Firefox, Edge, Safari)
- Không cần cài đặt - chạy hoàn toàn trong trình duyệt
- JavaScript được bật trong trình duyệt của bạn
- Không yêu cầu backend hoặc máy chủ

---

## 📖 Hướng Dẫn Sử Dụng

### Cho Giáo Viên/Người Thuyết Trình

#### Tình Huống Demo 1: Hiển Thị Từ Chối Mật Khẩu Yếu
1. Đi đến **"Hệ Thống Xác Thực Mới"** (New Authentication System)
2. Nhập username: `testuser`
3. Thử các mật khẩu yếu: `123456` hoặc `password`
4. **Kết Quả:** Hệ thống từ chối với thông báo lỗi rõ ràng
5. **Điểm Học Tập:** Minh họa việc xác thực chính sách mật khẩu

#### Tình Huống Demo 2: Đăng Ký Với Mật Khẩu Mạnh
1. Nhập username: `sinhvien01`
2. Nhập mật khẩu mạnh: `SinhVienIT@2026` hoặc tương tự (8+ ký tự, không nằm trong danh sách đen)
3. Nhấp **"Đăng Ký (Băm Mật Khẩu)"** (Register - Hash Password)
4. **Quan Sát:** 
   - Hệ thống hash mật khẩu
   - Người dùng xuất hiện trong bảng **"Database Mới"** (New Database)
   - Hash là chuỗi dài, không thể đảo ngược trong bảng hash
   - So sánh với mật khẩu plaintext trong **"Database Cũ"** (Old Database)
5. **Điểm Học Tập:** Hiển thị sự khác biệt giữa lưu trữ plaintext và lưu trữ hashed

#### Tình Huống Demo 3: Xác Minh Đăng Nhập
1. Thử đăng nhập với mật khẩu đúng: `SinhVienIT@2026`
   - **Kết Quả:** Thông báo thành công, minh họa xác minh hash hoạt động
2. Thử đăng nhập với mật khẩu sai
   - **Kết Quả:** Thông báo thất bại, hiển thị xác minh hashing ngăn chặn truy cập trái phép
3. **Điểm Học Tập:** Giải thích cách so khớp hash hoạt động mà không lưu trữ plaintext

#### Tình Huống Demo 4: So Sánh Bảo Mật
1. **Điểm 1 - Database Cũ:** Nếu bị xâm phạm, tất cả mật khẩu sẽ bị lộ ngay lập tức
2. **Điểm 2 - Database Mới:** Ngay cả khi bị xâm phạm, hash không thể bị đảo ngược để lấy mật khẩu gốc
3. **Điểm 3 - Tính Duy Nhất Của Hash:** Cùng một mật khẩu tạo ra hash khác nhau mỗi lần (do salt)

### Cho Người Học

1. **Hiểu Vấn Đề:** Đọc các mật khẩu plaintext trong database cũ
2. **Thử Giải Pháp:** Đăng ký tài khoản và xem hash bảo vệ mật khẩu như thế nào
3. **Xác Minh Bảo Mật:** Kiểm tra đăng nhập với mật khẩu đúng và sai
4. **So Sánh Phương Pháp:** Chú ý sự khác biệt trực quan giữa cả hai hệ thống

---

## 📁 Cấu Trúc Dự Án

```
CF04. Password Hashing & Weak Password/
│
├── demo/                           # Bài demo tương tác
│   ├── index.html                 # Giao diện chính và cấu trúc
│   ├── script.js                  # Logic xác thực và hashing
│   └── style.css                  # Kiểu dáng và bố cục
│
├── slides/                         # Tài liệu giáo dục
│   ├── README.md                  # Tổng quan dự án và hướng dẫn
│   ├── threat-model.md            # Phân tích mối đe dọa bảo mật
│   ├── ethics-safe-use.md         # Cân nhắc đạo đức
│   
│
├── evidences/                      # Tài liệu hỗ trợ
    ├── after-hash.png (ảnh chụp, sơ đồ, v.v.)
    └── before-plaintext.png
```

### Giải Thích Các Tập Tin Chính

| Tập Tin | Mục Đích |
|---------|----------|
| `demo/index.html` | Giao diện chính với input form và bảng database |
| `demo/script.js` | Logic cốt lõi: hashing mật khẩu, xác minh, xác thực |
| `demo/style.css` | Thiết kế trực quan và bố cục responsive |
| `slides/threat-model.md` | Phân tích mối đe dọa bảo mật và giảm thiểu |
| `slides/ethics-safe-use.md` | Cân nhắc đạo đức trong quản lý mật khẩu |

---

## 🔐 Các Khái Niệm Bảo Mật Được Minh Họa

### 1. **Hashing Mật Khẩu**
- Hàm mật mã một chiều
- Cùng đầu vào luôn tạo ra cùng đầu ra
- Không thể thực tế đảo ngược mà không dùng vũ phu

### 2. **Salt**
- Dữ liệu ngẫu nhiên được thêm trước khi hash
- Mỗi mật khẩu có salt duy nhất
- Ngăn chặn tấn công rainbow table
- Hai mật khẩu giống nhau tạo ra hash khác nhau

### 3. **Thuật Toán Bcrypt**
- Tiêu chuẩn công nghiệp cho hashing mật khẩu
- Thích ứng - có thể tăng hệ số chi phí theo thời gian
- Quản lý salt tích hợp
- Được thiết kế đặc biệt cho lưu trữ mật khẩu

### 4. **Phát Hiện Mật Khẩu Yếu**
- Yêu cầu độ dài tối thiểu (8 ký tự)
- Danh sách đen các mẫu phổ biến
- Xác thực phản hồi thời gian thực

### 5. **Xác Minh Hash**
- So sánh hash mới với hash được lưu trữ
- Minh họa xác thực an toàn mà không cần so khớp plaintext

---

## 🎓 Mục Tiêu Giáo Dục

### Sinh Viên Sẽ Hiểu:
1. ✔️ Tại sao lưu trữ mật khẩu plaintext là lỗ hổng bảo mật tới hạn
2. ✔️ Làm thế nào hashing mật mã bảo vệ mật khẩu
3. ✔️ Vai trò của salt trong ngăn chặn tấn công rainbow table
4. ✔️ Cách các hệ thống xác thực hiện đại hoạt động
5. ✔️ Các thực tiễn tốt nhất cho lưu trữ mật khẩu trong ứng dụng
6. ✔️ Sự khác biệt giữa mã hóa và hashing
7. ✔️ Tác động của vỡ mật khẩu đối với người dùng

### Sinh Viên Sẽ Học:
- Chi tiết triển khai của hashing bcrypt
- Thiết kế và xác thực chính sách mật khẩu
- Các nguyên tắc bảo mật cơ sở dữ liệu
- Các khái niệm xác thực vs. ủy quyền
- Bảo mật thực tế trong các ứng dụng web

---

## 📊 Kết Quả Học Tập

Sau khi hoàn thành bài demo này, sinh viên có thể:

| Kết Quả | Mô Tả |
|---------|-------|
| **Kiến Thức** | Giải thích tại sao lưu trữ mật khẩu plaintext nguy hiểm |
| **Hiểu Biết** | Mô tả cách hashing kết hợp salt bảo vệ mật khẩu |
| **Ứng Dụng** | Triển khai hashing mật khẩu đúng cách trong dự án của họ |
| **Phân Tích** | So sánh các phương pháp lưu trữ mật khẩu khác nhau |
| **Đánh Giá** | Đánh giá bảo mật mật khẩu trong các hệ thống hiện có |

---

## 💻 Chi Tiết Kỹ Thuật

### Tích Hợp Bcrypt
```javascript
// Tạo salt (Cost factor: 10)
const salt = dcodeIO.bcrypt.genSaltSync(10);

// Tạo hash
const hash = dcodeIO.bcrypt.hashSync(pass, salt);
usersDatabase[user] = hash; // Lưu vào database

// Xác minh hash khi đăng nhập
const storedHash = usersDatabase[user];
const isMatch = dcodeIO.bcrypt.compareSync(pass, storedHash);

if (isMatch) {
    showMessage(`ĐĂNG NHẬP THÀNH CÔNG! Chào mừng ${user}.`);
} else {
    showMessage(`ĐĂNG NHẬP THẤT BẠI: Sai mật khẩu!`, true);
}
```

### Quy Tắc Xác Thực Mật Khẩu
- **Độ Dài Tối Thiểu:** 8 ký tự
- **Mật Khẩu Yếu Bị Chặn:** Các mẫu phổ biến (123456, password, qwerty, admin, v.v.)
- **Phân Biệt Hoa/Thường:** Có
- **Ký Tự Đặc Biệt:** Được khuyến cáo nhưng không bắt buộc

---

## 🌐 Tương Thích Trình Duyệt

| Trình Duyệt | Hỗ Trợ |
|-----------|--------|
| Chrome | ✅ Hỗ trợ đầy đủ |
| Firefox | ✅ Hỗ trợ đầy đủ |
| Edge | ✅ Hỗ trợ đầy đủ |
| Safari | ✅ Hỗ trợ đầy đủ |
| IE 11 | ⚠️ Có thể cần polyfills |

---

### Đọc Thêm
- [OWASP - Cheat Sheet Lưu Trữ Mật Khẩu](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Kho Lưu Trữ GitHub bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Hàm Hash Mật Mã - Wikipedia](https://en.wikipedia.org/wiki/Cryptographic_hash_function)



## Người thực hiện

**Thành viên nhóm:**
- Ngô Văn Hiếu
- Phạm Anh Quân
