# Threat Model - CF04 Password Hashing & Weak Password

**Đề tài:** Password Hashing & Weak Password  
**Môn học:** FIT4012 - Cyber Fortress

---

## 1. Asset - Tài sản cần bảo vệ

| Asset | Mô tả | Mức độ quan trọng |
|-------|-------|-------------------|
| Tài khoản người dùng | Username và password của sinh viên, giảng viên | 🔴 Cực kỳ quan trọng |
| Dữ liệu cá nhân | Email, số điện thoại, điểm số, thông tin liên lạc | 🔴 Cực kỳ quan trọng |
| Database users | Toàn bộ cơ sở dữ liệu chứa thông tin đăng nhập | 🔴 Cực kỳ quan trọng |
| Hệ thống backend | Server xử lý đăng nhập, xác thực người dùng | 🟠 Rất quan trọng |
| Tính sẵn sàng | Hệ thống hoạt động 24/7, không bị gián đoạn | 🟡 Quan trọng |

---

## 2. Threat - Mối đe dọa

| Threat | Mô tả | Nguồn gốc | Mức độ |
|--------|-------|-----------|--------|
| Tấn công database | Hacker đột nhập database qua SQL Injection, lỗ hổng bảo mật | Bên ngoài | 🔴 Cao |
| Insider threat | Nhân viên (DBA) hoặc người có quyền truy cập đọc trộm dữ liệu | Nội bộ | 🟠 Trung bình |
| Brute-force attack | Tự động thử hàng triệu mật khẩu để đoán đúng | Bot/script | 🔴 Cao |
| Rainbow table attack | Dùng bảng băm tính trước để giải mã hash (nếu không có salt) | Bên ngoài | 🟠 Trung bình |
| Credential stuffing | Dùng mật khẩu bị lộ từ nơi khác để đăng nhập | Bên ngoài | 🔴 Cao |
| Social engineering | Lừa người dùng cung cấp mật khẩu | Bên ngoài | 🟡 Thấp |

---

## 3. Vulnerability - Lỗ hổng (Phân tích theo Demo thực tế)

### Lỗ hổng 1: Lưu mật khẩu dạng Plain Text
- **Mô tả:** Mật khẩu được lưu trong database dưới dạng chữ rõ (Như trong Bảng 1 của Demo).
- **Điều kiện xảy ra:** Lập trình viên thiếu hiểu biết về bảo mật, hệ thống cũ chưa nâng cấp.
- **Cách khai thác:** Hacker lấy được file DB là đọc được ngay mật khẩu (vd: `sinhvien01` dùng pass `123456`).

### Lỗ hổng 2: Không sử dụng Salt
- **Mô tả:** Băm mật khẩu nhưng không trộn thêm Salt, dẫn đến 2 người đặt cùng mật khẩu sẽ có mã hash y hệt nhau.
- **Điều kiện xảy ra:** Chỉ dùng hàm băm thuần túy (MD5, SHA-1).
- **Cách khai thác:** Dùng Rainbow table để tra ngược hàng loạt hash chỉ trong vài giây.

### Lỗ hổng 3: Cho phép mật khẩu yếu
- **Mô tả:** Hệ thống không kiểm tra, cho phép người dùng đặt pass như "123456", "password", "qwerty".
- **Điều kiện xảy ra:** Thiếu logic kiểm tra ở frontend và backend (Password Policy).
- **Cách khai thác:** Tấn công Dictionary Attack dò trúng tài khoản gần như ngay lập tức.

### Lỗ hổng 4: Không giới hạn số lần đăng nhập sai
- **Mô tả:** Cho phép thử mật khẩu liên tục không điểm dừng.
- **Điều kiện xảy ra:** Thiếu cơ chế Rate Limit hoặc Account Lockout.
- **Cách khai thác:** Bot tự động chạy Brute-force hàng ngàn lần/phút cho đến khi trúng.

---

## 4. Impact - Tác động

| Tác động | Mô tả | Mức độ |
|----------|-------|--------|
| Mất bí mật dữ liệu | 100% mật khẩu người dùng bị lộ nếu database Plain Text bị tấn công. | 🔴 Nghiêm trọng |
| Chiếm quyền tài khoản | Hacker đăng nhập vào tài khoản nạn nhân (Account Takeover), sửa điểm, xóa dữ liệu. | 🔴 Nghiêm trọng |
| Tấn công dây chuyền | Dùng mật khẩu bị lộ ở trường đại học để dò vào email, Facebook của sinh viên. | 🔴 Nghiêm trọng |
| Mất uy tín | Nhà trường mất niềm tin từ sinh viên và xã hội. | 🟠 Nặng |
| Rắc rối pháp lý | Vi phạm các quy định bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP). | 🟠 Nặng |

**Số liệu thực tế tham khảo:**
- LinkedIn (2012): 117 triệu mật khẩu băm không an toàn bị lộ → Thiệt hại hàng triệu USD.
- Collection #1 (2019): 773 triệu email và hàng chục triệu mật khẩu plain text bị chia sẻ miễn phí trên mạng.

---

## 5. Mitigation - Biện pháp giảm thiểu

### 5.1 Biện pháp kỹ thuật (Đã minh họa trong Demo)

| STT | Biện pháp | Mô tả | Mức độ ưu tiên |
|-----|-----------|-------|----------------|
| 1 | **Hash + Salt** | Sử dụng thư viện `bcrypt.js`, luôn sinh Salt ngẫu nhiên cho từng user. | 🔴 Bắt buộc |
| 2 | **Chính sách mật khẩu mạnh** | Code JS chặn mật khẩu < 8 ký tự. | 🟠 Cao |
| 3 | **Chặn mật khẩu phổ biến** | Từ chối list pass yếu (`123456`, `password`, `qwerty`, `admin`). | 🟠 Cao |
| 4 | **Rate limit** | Mô phỏng delay/khóa tài khoản nếu nhập sai quá nhiều lần. | 🟠 Cao |
| 5 | **MFA (Đề xuất)** | Tích hợp xác thực 2 bước (Google Authenticator/OTP SMS). | 🟡 Trung bình |

### 5.2 Biện pháp quy trình

| STT | Biện pháp | Mô tả |
|-----|-----------|-------|
| 1 | Secure Code Review | Đảm bảo code không hardcode thông tin nhạy cảm. |
| 2 | Đào tạo nhân sự | Tập huấn tư duy "Security by Design" cho đội ngũ dev. |
| 3 | Incident Response Plan | Sẵn sàng kịch bản vô hiệu hóa phiên đăng nhập nếu DB bị rò rỉ. |

### 5.3 Biện pháp nâng cao nhận thức

| STT | Biện pháp | Đối tượng |
|-----|-----------|-----------|
| 1 | Cảnh báo trực quan | Hiện thông báo đỏ khi người dùng gõ mật khẩu yếu (Như đã làm ở form đăng ký). |
| 2 | Hướng dẫn an toàn | Khuyến cáo sinh viên dùng Password Manager. |

---

## 6. Kết luận

**Tóm tắt rủi ro:** Hệ thống cũ lưu mật khẩu **Plain text + Cho phép pass yếu + Không Rate limit = Mất an toàn 100%** khi xảy ra sự cố lộ dữ liệu.

**Ưu tiên khắc phục:**
1. ✅ Chuyển đổi toàn bộ mật khẩu sang định dạng Hash + Salt (Sử dụng Bcrypt).
2. ✅ Thiết lập màng lọc chặn mật khẩu yếu ngay từ form đăng ký.
3. ✅ Bổ sung Rate limit chặn Bot Brute-force.
4. ✅ Khuyến nghị người dùng kích hoạt MFA cho các tài khoản quản trị (Admin).