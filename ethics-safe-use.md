## 1. Cam kết chung
Nhóm chúng tôi, thực hiện đề tài CF04 - Password Hashing & Weak Password, xin cam kết tuân thủ nghiêm ngặt các quy định về đạo đức và an toàn thông tin trong suốt quá trình thực hiện demo.
## 2. Những điều CHÚNG TÔI KHÔNG làm

| STT | Hành vi bị cấm | Cam kết |
|-----|----------------|---------|
| 1 | Tấn công website, server, tài khoản, camera, router hoặc hệ thống thật | ✅ **KHÔNG thực hiện** |
| 2 | Chạy công cụ rà quét, dò mật khẩu (Brute-force, Dictionary Attack) ngoài môi trường lab | ✅ **KHÔNG thực hiện** |
| 3 | Sử dụng mật khẩu thật, API key, token hoặc thông tin định danh cá nhân thật | ✅ **KHÔNG thực hiện** |
| 4 | Thu thập hoặc gửi bất kỳ dữ liệu người dùng nào ra máy chủ bên ngoài | ✅ **KHÔNG thực hiện** |
| 5 | Phát tán mã độc, ransomware, webshell hoặc script gây hại | ✅ **KHÔNG thực hiện** |
| 6 | Công khai thông tin nhạy cảm của cá nhân, lớp học, nhà trường | ✅ **KHÔNG thực hiện** |

## 3. Những điều CHÚNG TÔI THỰC HIỆN

| STT | Hành vi được phép | Cam kết thực hiện |
|-----|-------------------|-------------------|
| 1 | Demo trên máy cá nhân, môi trường local | ✅ **Đã thực hiện** |
| 2 | Sử dụng hoàn toàn dữ liệu giả lập (sinhvien01, sinhvien02, admin_sv) | ✅ **Đã thực hiện** |
| 3 | Minh họa thuật toán băm (Bcrypt) và chính sách mật khẩu qua giao diện tĩnh | ✅ **Đã thực hiện** |
| 4 | Trình bày rủi ro rò rỉ dữ liệu bằng cách hiển thị so sánh bảng Plaintext vs Hashed | ✅ **Đã thực hiện** |

## 4. Phạm vi demo cụ thể

### 4.1 Môi trường chạy demo
```yaml
Hệ điều hành: Đa nền tảng (Windows / macOS / Linux)
Trình duyệt: Chrome / Edge / Firefox
Kết nối mạng: Chỉ sử dụng tải thư viện mã nguồn mở bcrypt.js qua CDN (cdnjs), hoàn toàn không gửi dữ liệu đi.
Server: KHÔNG dùng backend server, chạy trực tiếp index.html qua giao thức file:// hoặc Local Live Server.
Database: KHÔNG dùng database vật lý, dữ liệu giả lập được lưu trữ tạm thời trên bộ nhớ RAM (In-memory JavaScript Object) và tự xóa khi tải lại trang.