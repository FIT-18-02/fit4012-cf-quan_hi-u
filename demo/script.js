// Database giả lập lưu trên RAM
const usersDatabase = {};

// Hàm xử lý ẩn hiện bằng chữ [Hiện mật khẩu] / [Ẩn mật khẩu]
function toggleTextPassword(inputId, btnId) {
    const passwordInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById(btnId);
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.innerText = "[Ẩn mật khẩu]";
    } else {
        passwordInput.type = "password";
        toggleBtn.innerText = "[Hiện mật khẩu]";
    }
}

function showMessage(msg, isError = false) {
    const msgBox = document.getElementById('systemMessage');
    msgBox.style.color = isError ? '#ff4d4d' : '#00ff00';
    msgBox.innerHTML = `> ${msg}`;
}

function updateDatabaseView() {
    const tbody = document.getElementById('hashedTableBody');
    tbody.innerHTML = '';
    for (const [user, hash] of Object.entries(usersDatabase)) {
        tbody.innerHTML += `<tr><td>${user}</td><td class="hash-text">${hash}</td></tr>`;
    }
}

// 1. Chức năng Đăng ký
function register() {
    const user = document.getElementById('regUser').value.trim();
    const pass = document.getElementById('regPass').value;

    if (!user || !pass) {
        showMessage("Vui lòng nhập Username và Password!", true);
        return;
    }

    if (usersDatabase[user]) {
        showMessage("Tài khoản đã tồn tại!", true);
        return;
    }

    // Kiểm tra chính sách mật khẩu (Weak Password Policy)
    const weakPasswords = ['123456', 'password', 'qwerty', '12345678', 'admin'];
    if (pass.length < 8) {
        showMessage("LỖI: Mật khẩu phải có ít nhất 8 ký tự!", true);
        return;
    }
    if (weakPasswords.includes(pass.toLowerCase())) {
        showMessage("LỖI: Mật khẩu quá yếu, dễ bị tấn công Dictionary Attack!", true);
        return;
    }

    // Băm mật khẩu (Hash + Salt)
    showMessage(`Đang tạo Salt và băm mật khẩu bằng Bcrypt cho ${user}...`);
    setTimeout(() => {
        const bLib = (typeof dcodeIO !== 'undefined') ? dcodeIO.bcrypt : dcodeIO;
        const salt = bLib.genSaltSync(10);
        const hash = bLib.hashSync(pass, salt);

        usersDatabase[user] = hash; // Lưu vào DB giả lập
        updateDatabaseView();
        showMessage(`Đăng ký thành công! Chuỗi Hash đã được lưu an toàn vào Database Mới.`);
        
        document.getElementById('regUser').value = '';
        document.getElementById('regPass').value = '';
        document.getElementById('btnToggleReg').innerText = "[Hiện mật khẩu]";
    }, 500); 
}

// 2. Chức năng Đăng Nhập (Hiển thị thông báo chi tiết khi bấm nút)
function login() {
    const user = document.getElementById('logUser').value.trim();
    const pass = document.getElementById('logPass').value;

    if (!user || !pass) {
        showMessage("Vui lòng nhập đầy đủ thông tin đăng nhập!", true);
        return;
    }

    if (!usersDatabase[user]) {
        showMessage(`ĐĂNG NHẬP THẤT BẠI: Tài khoản "${user}" không tồn tại trên hệ thống băm mới!`, true);
        return;
    }

    // Giai đoạn xử lý: Báo cho người xem biết hệ thống đang làm gì
    showMessage(`[Xử lý] Đang truy vấn chuỗi Hash của "${user}"... Tiến hành dùng thuật toán đối sánh dữ liệu đầu vào...`);
    
    setTimeout(() => {
        const bLib = (typeof dcodeIO !== 'undefined') ? dcodeIO.bcrypt : dcodeIO;
        const storedHash = usersDatabase[user];
        
        // Bcrypt tiến hành so sánh đối chiếu
        const isMatch = bLib.compareSync(pass, storedHash);

        if (isMatch) {
            showMessage(`ĐĂNG NHẬP THÀNH CÔNG!<br>+ Trạng thái: Khớp dữ liệu.<br>+ Lời nhắn: Chào mừng sinh viên ${user} truy cập hệ thống.`);
            document.getElementById('logPass').value = ''; 
            document.getElementById('btnToggleLog').innerText = "[Hiện mật khẩu]";
        } else {
            showMessage(`ĐĂNG NHẬP THẤT BẠI!<br>+ Trạng thái: Sai mật khẩu.<br>+ Chi tiết: Chuỗi Hash tạo ra từ văn bản vừa nhập không trùng với chuỗi lưu trong database!`, true);
        }
    }, 800); // Tăng delay lên 800ms một chút để người xem slide kịp đọc dòng trạng thái xử lý nền
}