// Global State Management
let currentUser = null;
let currentJurusan = null;
let userRole = null;
let userClass = null;
let currentQuizAnswers = [];
let currentChallengeSolutions = [];
let currentDeveloper = null;

// Developer Accounts Database
const developerAccounts = {
    "dev1": {
        username: "dev1",
        password: "dev123",
        name: "Developer 1",
        role: "developer",
        permissions: ["system_metrics", "ai_analytics", "user_management", "database"]
    },
    "dev2": {
        username: "dev2", 
        password: "dev456",
        name: "Developer 2",
        role: "developer",
        permissions: ["system_metrics", "ai_analytics", "user_management", "database"]
    }
};

// Teacher Demo Account
const demoTeacherAccount = {
    name: "Guru TJKT Demo",
    email: "guru@tjkt.sch.id",
    password: "guru123",
    jurusan: ["tjkt"],
    registeredAt: new Date().toISOString(),
    status: "approved",
    role: "teacher"
};

// Database Materi TJKT 10 Hari
const tjktMaterials = {
    day1: {
        title: "PENGENALAN PROSES BISNIS DI BIDANG TJKT",
        content: `
            <h3>1. PROSES BISNIS</h3>
            <p><strong>Pengertian:</strong> Serangkaian aktivitas terstruktur dan terorganisir yang dilakukan oleh individu atau organisasi untuk mencapai tujuan tertentu dengan cara memproduksi, membeli, dan menjual barang atau jasa.</p>
            
            <h4>Detail:</h4>
            <ul>
                <li><strong>Tahapan terstruktur:</strong> Setiap proses bisnis memiliki urutan langkah yang jelas</li>
                <li><strong>Input → Proses → Output:</strong> Dari bahan baku/sumber daya menjadi produk/jasa</li>
                <li><strong>Contoh:</strong> Pembelian bahan → Produksi → Pemasaran → Penjualan</li>
                <li><strong>Dalam konteks TJKT:</strong> Jaringan komputer digunakan untuk mendukung seluruh tahapan ini</li>
            </ul>

            <h3>2. PELAKU USAHA INDIVIDU</h3>
            <p><strong>Pengertian:</strong> Seorang entrepreneur yang menjalankan seluruh proses bisnis secara mandiri, mulai dari perencanaan, produksi, hingga pemasaran.</p>
            
            <h4>Ciri-ciri:</h4>
            <ul>
                <li>Modal terbatas</li>
                <li>Pengambilan keputusan cepat</li>
                <li>Tanggung jawab penuh pada satu orang</li>
            </ul>

            <h3>3. PELAKU USAHA KELOMPOK/ORGANISASI</h3>
            <p><strong>Pengertian:</strong> Sekumpulan orang atau divisi yang bekerja sama dengan pembagian tugas spesifik untuk menjalankan proses bisnis.</p>

            <h3>4. PERAN JARINGAN KOMPUTER DALAM PROSES BISNIS</h3>
            <p><strong>Pengertian:</strong> Pemanfaatan infrastruktu jaringan komputer untuk meningkatkan efisiensi, komunikasi, dan koordinasi dalam menjalankan bisnis.</p>
        `,
        quiz: [
            {
                question: "Apa yang dimaksud dengan proses bisnis?",
                options: [
                    "Kumpulan aktivitas tidak teratur dalam organisasi",
                    "Serangkaian aktivitas terstruktur untuk mencapai tujuan bisnis",
                    "Hanya kegiatan produksi barang",
                    "Sistem komputer dalam perusahaan"
                ],
                answer: 1,
                explanation: "Proses bisnis adalah serangkaian aktivitas terstruktur dan terorganisir untuk mencapai tujuan bisnis."
            },
            {
                question: "Apa ciri khas pelaku usaha individu?",
                options: [
                    "Modal tidak terbatas dan banyak karyawan",
                    "Pengambilan keputusan lambat dan berjenjang",
                    "Modal terbatas dan tanggung jawab pada satu orang",
                    "Biasanya perusahaan multinasional"
                ],
                answer: 2,
                explanation: "Pelaku usaha individu memiliki modal terbatas dan tanggung jawab penuh pada satu orang."
            },
            // ... (23 soal lainnya)
        ],
        challenges: [
            {
                problem: "Rancang proses bisnis sederhana untuk usaha servis komputer dengan menjelaskan tahapan input-proses-output!",
                solution: "Input: Komputer rusak, sparepart, tools. Proses: Diagnosa kerusakan, perbaikan hardware/software, testing. Output: Komputer berfungsi normal, laporan servis, invoice pembayaran.",
                points: 20
            },
            // ... (4 problem lainnya)
        ]
    }
    // ... (hari 2-10)
};

// System Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    setupEventListeners();
    createDemoAccounts();
});

function initializeSystem() {
    // Check for existing user session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        const userData = getUserData(currentUser.email);
        if (userData) {
            currentJurusan = userData.jurusan;
            userClass = userData.class;
            userRole = userData.role || 'student';
            
            if (userRole === 'student') {
                showStudentDashboard();
            } else if (userRole === 'teacher') {
                showTeacherDashboard();
            } else if (userRole === 'developer') {
                showDeveloperDashboard();
            }
        }
    }
}

function createDemoAccounts() {
    // Create demo teacher account if not exists
    if (!localStorage.getItem('teacher_guru@tjkt.sch.id')) {
        localStorage.setItem('teacher_guru@tjkt.sch.id', JSON.stringify(demoTeacherAccount));
        localStorage.setItem('user_guru@tjkt.sch.id', JSON.stringify({
            ...demoTeacherAccount,
            profileCompleted: true
        }));
        console.log('✅ Demo teacher account created');
    }
}

function setupEventListeners() {
    // Email Registration
    document.getElementById('emailRegForm').addEventListener('submit', handleEmailRegistration);
    
    // Profile Setup
    document.getElementById('profileSetupForm').addEventListener('submit', handleProfileSetup);
    
    // Teacher Registration
    document.getElementById('teacherRegForm').addEventListener('submit', handleTeacherRegistration);
    
    // Teacher Login
    document.getElementById('teacherLoginForm').addEventListener('submit', handleTeacherLogin);
    
    // Developer Login
    document.getElementById('developerLoginForm').addEventListener('submit', handleDeveloperLogin);
    
    // Profile Editor
    document.getElementById('profileEditForm').addEventListener('submit', handleProfileEdit);
    
    // Profile Picture Change
    document.getElementById('profilePicture').addEventListener('change', handleProfilePictureChange);
    document.getElementById('profileEditPicture').addEventListener('change', handleProfileEditPictureChange);
    
    // Leaderboard Filters
    document.getElementById('leaderboardClassFilter').addEventListener('change', updateLeaderboard);
    document.getElementById('leaderboardTypeFilter').addEventListener('change', updateLeaderboard);
    
    // AI Chat Input
    document.getElementById('aiInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendAIMessage();
        }
    });
}

// ==================== AUTHENTICATION SYSTEM ====================

// Google Login Handler
function handleGoogleLogin(response) {
    try {
        const userData = decodeJWTResponse(response.credential);
        
        currentUser = {
            id: userData.sub,
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
            role: 'student'
        };
        
        // Save user session
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Check if user exists and has completed profile
        const userExists = checkUserExists(userData.email);
        
        if (!userExists) {
            showJurusanSelection();
        } else {
            const userData = getUserData(currentUser.email);
            if (userData.profileCompleted) {
                currentJurusan = userData.jurusan;
                userClass = userData.class;
                userRole = 'student';
                showStudentDashboard();
            } else {
                showProfileSetup();
            }
        }
    } catch (error) {
        console.error('Google login error:', error);
        alert('Terjadi error saat login dengan Google. Silakan coba lagi.');
    }
}

function decodeJWTResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Teacher Registration Handler
function handleTeacherRegistration(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    
    // Validation
    if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok');
        return;
    }
    
    if (password.length < 6) {
        alert('Password harus minimal 6 karakter');
        return;
    }
    
    // Get selected jurusan
    const selectedJurusan = [];
    form.querySelectorAll('input[name="jurusan"]:checked').forEach(checkbox => {
        selectedJurusan.push(checkbox.value);
    });
    
    if (selectedJurusan.length === 0) {
        alert('Pilih minimal satu jurusan yang diajar');
        return;
    }
    
    // Save teacher registration
    const teacherData = {
        name: name,
        email: email,
        password: password,
        jurusan: selectedJurusan,
        registeredAt: new Date().toISOString(),
        status: 'approved', // Auto-approve for demo
        role: 'teacher'
    };
    
    localStorage.setItem(`teacher_${email}`, JSON.stringify(teacherData));
    localStorage.setItem(`user_${email}`, JSON.stringify({
        ...teacherData,
        profileCompleted: true
    }));
    
    alert('Pendaftaran akun guru berhasil! Akun sudah aktif.');
    showPage('loginPage');
    form.reset();
}

// Teacher Login Handler
function handleTeacherLogin(e) {
    e.preventDefault();
    const email = document.getElementById('teacherEmailInput').value;
    const password = document.getElementById('teacherPasswordInput').value;
    
    console.log('Teacher login attempt:', email);
    
    // Check if demo teacher account
    if (email === 'guru@tjkt.sch.id' && password === 'guru123') {
        loginTeacher(demoTeacherAccount);
        return;
    }
    
    // Check if teacher account exists
    const teacherData = localStorage.getItem(`teacher_${email}`);
    
    if (!teacherData) {
        alert('Akun guru tidak ditemukan. Silakan daftar terlebih dahulu.');
        return;
    }
    
    const teacher = JSON.parse(teacherData);
    
    // Verify password
    if (teacher.password === password) {
        if (teacher.status === 'approved') {
            loginTeacher(teacher);
        } else {
            alert('Akun guru menunggu persetujuan administrator.');
        }
    } else {
        alert('Password salah. Silakan coba lagi.');
    }
}

function loginTeacher(teacher) {
    userRole = 'teacher';
    currentUser = {
        id: 'teacher_' + teacher.email,
        name: teacher.name,
        email: teacher.email,
        picture: 'https://via.placeholder.com/150/667eea/ffffff?text=T',
        class: 'teacher',
        role: 'teacher'
    };
    
    // Save user session
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Redirect to teacher dashboard
    showTeacherDashboard();
}

// Developer Login System
function showDeveloperLogin() {
    document.getElementById('developerLoginModal').style.display = 'block';
}

function closeDeveloperLogin() {
    document.getElementById('developerLoginModal').style.display = 'none';
}

function handleDeveloperLogin(e) {
    e.preventDefault();
    const username = document.getElementById('devUsername').value;
    const password = document.getElementById('devPassword').value;
    
    console.log('Developer login attempt:', username);
    
    // Check developer accounts
    const developer = developerAccounts[username];
    
    if (developer && developer.password === password) {
        loginDeveloper(developer);
    } else {
        alert('Username atau password developer salah.');
    }
}

function loginDeveloper(developer) {
    userRole = 'developer';
    currentDeveloper = developer;
    currentUser = {
        id: 'developer_' + developer.username,
        name: developer.name,
        username: developer.username,
        role: 'developer'
    };
    
    // Save user session
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('currentDeveloper', JSON.stringify(developer));
    
    closeDeveloperLogin();
    showDeveloperDashboard();
}

// ==================== DASHBOARD SYSTEMS ====================

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(sectionId + 'Section').classList.add('active');
    document.querySelector(`.nav-btn[onclick="showSection('${sectionId}')"]`).classList.add('active');
    
    switch(sectionId) {
        case 'home': loadHomeSection(); break;
        case 'materials': loadMaterialsSection(); break;
        case 'leaderboard': loadLeaderboardSection(); break;
        case 'profile': loadProfileSection(); break;
    }
}

// Student Dashboard
function showStudentDashboard() {
    showPage('studentDashboard');
    showSection('home');
}

function loadHomeSection() {
    loadStudentData();
    updateTaskStatus();
    loadClassLeaderboardPreview();
}

function loadStudentData() {
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userAvatar').src = currentUser.picture;
        document.getElementById('userJurusan').textContent = currentJurusan ? 'TJKT' : '';
        document.getElementById('userClass').textContent = getClassDisplayName(currentUser.class);
        
        const progress = getStudentProgress(currentUser.email);
        document.getElementById('materialsCompleted').textContent = progress.materialsCompleted || 0;
        document.getElementById('averageScore').textContent = (progress.averageScore || 0) + '%';
        document.getElementById('currentStreak').textContent = progress.currentStreak || 0;
        document.getElementById('userRank').textContent = '#' + (progress.rank || '-');
        
        const progressBar = document.getElementById('dailyProgress');
        const day = getCurrentDay();
        const dailyProgress = calculateDailyProgress(day);
        progressBar.style.width = dailyProgress + '%';
        
        document.getElementById('currentDay').textContent = day;
    }
}

// Teacher Dashboard
function showTeacherDashboard() {
    showPage('teacherDashboard');
    loadTeacherData();
}

function loadTeacherData() {
    updateOnlineStudents();
    startRealTimeMonitoring();
    loadStudentsList();
    loadTeacherProfile();
    updateTeacherStats();
}

function loadTeacherProfile() {
    if (currentUser) {
        const teacherData = JSON.parse(localStorage.getItem(`teacher_${currentUser.email}`)) || demoTeacherAccount;
        document.getElementById('teacherName').textContent = teacherData.name;
        document.getElementById('teacherEmail').textContent = currentUser.email;
        document.getElementById('teacherJurusan').textContent = teacherData.jurusan.map(j => j.toUpperCase()).join(', ');
    }
}

function updateOnlineStudents() {
    const onlineCount = Math.floor(Math.random() * 15) + 5;
    const submissionCount = Math.floor(Math.random() * 10) + 2;
    
    document.getElementById('onlineStudents').textContent = onlineCount;
    document.getElementById('todaySubmissions').textContent = submissionCount;
}

function startRealTimeMonitoring() {
    setInterval(() => {
        updateOnlineStudents();
        addSampleActivity();
    }, 5000);
}

function addSampleActivity() {
    const activities = [
        'Andi menyelesaikan materi jaringan komputer',
        'Budi mengumpulkan kuis akuntansi - Nilai: 85%',
        'Citra memulai tantangan problem solving',
        'Dewi berinteraksi dengan AI assistant',
        'Eka menyelesaikan kuis dengan nilai 90%',
        'Fajar menyelesaikan semua aktivitas hari ini',
        'Gita bertanya tentang konfigurasi router'
    ];
    
    const activityFeed = document.getElementById('teacherActivityFeed');
    const activity = document.createElement('div');
    activity.className = 'activity-item';
    activity.textContent = activities[Math.floor(Math.random() * activities.length)];
    
    activityFeed.insertBefore(activity, activityFeed.firstChild);
    
    if (activityFeed.children.length > 10) {
        activityFeed.removeChild(activityFeed.lastChild);
    }
}

function loadStudentsList() {
    const studentsGrid = document.getElementById('studentsGrid');
    const students = getAllStudents();
    
    studentsGrid.innerHTML = students.map(student => `
        <div class="student-item">
            <img src="https://via.placeholder.com/50/667eea/ffffff?text=${student.name.charAt(0)}" alt="${student.name}">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 5px 0;">${student.name}</h4>
                <p style="margin: 0; color: #666; font-size: 0.85em;">${student.email}</p>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 0.8em;">
                    Kelas: ${getClassDisplayName(student.class)} | 
                    Hari Aktif: ${student.daysActive || 0}
                </p>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 1.2em; font-weight: bold; color: #667eea;">${student.progress || 0}%</div>
                <div style="font-size: 0.75em; color: #666;">Progress</div>
            </div>
        </div>
    `).join('');
}

function updateTeacherStats() {
    const students = getAllStudents();
    const totalStudents = students.length;
    const avgProgress = students.reduce((sum, student) => sum + (student.progress || 0), 0) / totalStudents || 0;
    const activeToday = Math.floor(totalStudents * 0.7);
    const problemsSolved = students.reduce((sum, student) => sum + (student.problemsSolved || 0), 0);
    
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('avgProgress').textContent = Math.round(avgProgress) + '%';
    document.getElementById('activeToday').textContent = activeToday;
    document.getElementById('problemsSolved').textContent = problemsSolved;
}

function generateReport() {
    const students = getAllStudents();
    const report = {
        title: 'Laporan Progress Siswa',
        generatedAt: new Date().toLocaleDateString('id-ID'),
        totalStudents: students.length,
        averageProgress: students.reduce((sum, student) => sum + (student.progress || 0), 0) / students.length || 0,
        students: students
    };
    
    alert(`Laporan berhasil digenerate!\n\nTotal Siswa: ${report.totalStudents}\nRata-rata Progress: ${Math.round(report.averageProgress)}%\n\nLaporan lengkap akan dikirim ke email.`);
}

function manageContent() {
    alert('Membuka panel manajemen konten...\n\nFitur ini memungkinkan guru untuk:\n- Menambah/mengedit materi\n- Membuat soal quiz\n- Mengatur problem solving\n- Melihat statistik pembelajaran');
}

// Developer Dashboard
function showDeveloperDashboard() {
    showPage('developerDashboard');
    showDevSection('metrics');
    loadDeveloperInfo();
}

function loadDeveloperInfo() {
    if (currentDeveloper) {
        document.getElementById('devUserName').textContent = currentDeveloper.name;
    }
}

function showDevSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById('dev' + capitalizeFirst(sectionId) + 'Section').classList.add('active');
    document.querySelector(`.nav-btn[onclick="showDevSection('${sectionId}')"]`).classList.add('active');
    
    switch(sectionId) {
        case 'metrics': loadMetricsSection(); break;
        case 'users': loadUsersSection(); break;
        case 'ai': loadAISection(); break;
        case 'database': loadDatabaseSection(); break;
    }
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadMetricsSection() {
    document.getElementById('devActiveUsers').textContent = calculateActiveUsers();
    document.getElementById('devServerLoad').textContent = calculateServerLoad() + '%';
    document.getElementById('devAIInteractions').textContent = calculateAIInteractions();
    document.getElementById('devStorageUsage').textContent = calculateStorageUsage() + 'MB';
}

function loadUsersSection() {
    const users = getAllUsers();
    const teachers = users.filter(u => u.role === 'teacher');
    const students = users.filter(u => u.role === 'student');
    
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalTeachers').textContent = teachers.length;
    document.getElementById('totalStudentsDev').textContent = students.length;
    
    const usersHTML = users.map(user => `
        <div class="user-item">
            <strong>${user.name}</strong> 
            <span>(${user.role}) - ${user.email}</span>
            <span>Kelas: ${user.class || 'N/A'}</span>
            <span>Status: ${user.status || 'active'}</span>
        </div>
    `).join('');
    
    document.getElementById('usersList').innerHTML = usersHTML || '<p>No users found</p>';
}

function loadAISection() {
    const aiStats = getAIAnalytics();
    document.getElementById('totalConversations').textContent = aiStats.totalConversations;
    document.getElementById('avgResponseTime').textContent = aiStats.avgResponseTime + 'ms';
    document.getElementById('satisfactionRate').textContent = aiStats.satisfactionRate + '%';
}

function loadDatabaseSection() {
    document.getElementById('dbStorageUsage').textContent = calculateStorageUsageKB() + 'KB';
    document.getElementById('dbTotalItems').textContent = localStorage.length;
}

function refreshMetrics() {
    loadMetricsSection();
    alert('Metrics refreshed!');
}

function showSystemMetrics() {
    const metrics = {
        activeUsers: calculateActiveUsers(),
        serverLoad: calculateServerLoad(),
        aiInteractions: calculateAIInteractions(),
        storageUsage: calculateStorageUsage(),
        totalUsers: getAllUsers().length,
        uptime: '99.9%',
        responseTime: '125ms'
    };
    
    alert(`📊 Detailed System Metrics:\n\n` +
          `Active Users: ${metrics.activeUsers}\n` +
          `Server Load: ${metrics.serverLoad}%\n` +
          `AI Interactions: ${metrics.aiInteractions}\n` +
          `Storage Usage: ${metrics.storageUsage}MB\n` +
          `Total Users: ${metrics.totalUsers}\n` +
          `Uptime: ${metrics.uptime}\n` +
          `Avg Response Time: ${metrics.responseTime}`);
}

function showAIAnalytics() {
    const aiStats = getAIAnalytics();
    alert(`🤖 AI Analytics Dashboard:\n\n` +
          `Total Conversations: ${aiStats.totalConversations}\n` +
          `Most Common Questions: ${aiStats.commonQuestions.join(', ')}\n` +
          `Average Response Time: ${aiStats.avgResponseTime}ms\n` +
          `User Satisfaction: ${aiStats.satisfactionRate}%`);
}

function clearCache() {
    if (confirm('Clear all cached data? This will reset user sessions but keep progress data.')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentDeveloper');
        alert('Cache cleared! Users will need to login again.');
    }
}

function exportData() {
    const data = {
        users: getAllUsers(),
        timestamp: new Date().toISOString(),
        exportBy: currentDeveloper.name
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'e-learning-data-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
    
    alert('Data exported successfully!');
}

function showDatabaseInfo() {
    let info = 'Local Storage Contents:\n\n';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        info += `${key}: ${value.length} characters\n`;
    }
    alert(info);
}

function clearAllData() {
    if (confirm('⚠️ DANGER! This will delete ALL data including user accounts and progress. This action cannot be undone!\n\nAre you sure?')) {
        localStorage.clear();
        alert('All data has been cleared. The page will reload.');
        location.reload();
    }
}

// ==================== UTILITY FUNCTIONS ====================

function calculateActiveUsers() {
    const users = Object.keys(localStorage).filter(key => key.startsWith('user_'));
    return users.length;
}

function calculateServerLoad() {
    return Math.floor(Math.random() * 40) + 10;
}

function calculateAIInteractions() {
    return Math.floor(Math.random() * 200) + 100;
}

function calculateStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length;
        }
    }
    return Math.round(total / 1024 / 1024 * 100) / 100;
}

function calculateStorageUsageKB() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length;
        }
    }
    return Math.round(total / 1024);
}

function getAIAnalytics() {
    return {
        totalConversations: Math.floor(Math.random() * 500) + 200,
        commonQuestions: ['Materi jaringan', 'Cara konfigurasi', 'Problem solving', 'Quiz help'],
        avgResponseTime: Math.floor(Math.random() * 500) + 1000,
        satisfactionRate: Math.floor(Math.random() * 30) + 70
    };
}

function getAllUsers() {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_')) {
            try {
                const userData = JSON.parse(localStorage.getItem(key));
                if (userData && userData.name) {
                    const progress = getStudentProgress(userData.email);
                    users.push({
                        ...userData,
                        progress: progress.averageScore || 0,
                        daysActive: progress.daysActive || 0,
                        problemsSolved: progress.problemsSolved || 0
                    });
                }
            } catch (e) {
                console.log('Error parsing user data:', key);
            }
        }
    }
    return users;
}

function getAllStudents() {
    return getAllUsers().filter(user => user.role === 'student');
}

// ==================== PROFILE SYSTEM ====================

function showProfileSetup() {
    showPage('profileSetup');
}

function handleProfileSetup(e) {
    e.preventDefault();
    const bio = document.getElementById('userBio').value;
    const profession = document.getElementById('professionSelect').value;
    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
    
    const userData = getUserData(currentUser.email);
    userData.bio = bio;
    userData.profession = profession;
    userData.skills = skills;
    userData.profileCompleted = true;
    userData.jurusan = currentJurusan;
    
    saveUserData(currentUser.email, userData);
    
    currentUser = { ...currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Profil berhasil disimpan!');
    userRole = 'student';
    showStudentDashboard();
}

function showProfileEditor() {
    const userData = getUserData(currentUser.email);
    const modal = document.getElementById('profileEditor');
    
    document.getElementById('profileEditPreview').src = currentUser.picture;
    document.getElementById('profileEditBio').value = userData.bio || '';
    document.getElementById('profileEditProfession').value = userData.profession || '';
    
    document.querySelectorAll('input[name="edit_skills"]').forEach(checkbox => {
        checkbox.checked = (userData.skills || []).includes(checkbox.value);
    });
    
    modal.style.display = 'block';
}

function closeProfileEditor() {
    document.getElementById('profileEditor').style.display = 'none';
}

function handleProfileEdit(e) {
    e.preventDefault();
    const bio = document.getElementById('profileEditBio').value;
    const profession = document.getElementById('profileEditProfession').value;
    const skills = Array.from(document.querySelectorAll('input[name="edit_skills"]:checked')).map(cb => cb.value);
    
    const userData = getUserData(currentUser.email);
    userData.bio = bio;
    userData.profession = profession;
    userData.skills = skills;
    
    saveUserData(currentUser.email, userData);
    currentUser = { ...currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeProfileEditor();
    if (userRole === 'student') loadProfileSection();
    alert('Profil berhasil diperbarui!');
}

// ==================== LOCAL STORAGE MANAGEMENT ====================

function checkUserExists(email) {
    return localStorage.getItem(`user_${email}`) !== null;
}

function getUserData(email) {
    return JSON.parse(localStorage.getItem(`user_${email}`)) || {};
}

function saveUserData(email, data) {
    localStorage.setItem(`user_${email}`, JSON.stringify(data));
}

function getStudentProgress(email) {
    return JSON.parse(localStorage.getItem(`progress_${email}`)) || {
        materialsCompleted: 0,
        averageScore: 0,
        currentStreak: 0,
        totalScore: 0,
        daysActive: 0,
        problemsSolved: 0,
        currentDay: 1
    };
}

function getCurrentDay() {
    const userProgress = getUserProgress(currentUser.email);
    return userProgress.currentDay || 1;
}

function getUserProgress(email) {
    return JSON.parse(localStorage.getItem(`user_progress_${email}`)) || {
        currentDay: 1,
        lastAccessDate: null,
        completedDays: [],
        dailyProgress: {}
    };
}

function getClassDisplayName(classId) {
    const classNames = {
        '10_tjkt_1': 'X TJKT 1',
        '10_tjkt_2': 'X TJKT 2',
        '10_tjkt_3': 'X TJKT 3',
        '11_tjkt_1': 'XI TJKT 1',
        '11_tjkt_2': 'XI TJKT 2',
        '12_tjkt_1': 'XII TJKT 1',
        '12_tjkt_2': 'XII TJKT 2',
        'teacher': 'Guru',
        'developer': 'Developer'
    };
    return classNames[classId] || classId;
}

// ==================== DEMO ACCOUNT INFO ====================

// Email Registration Handler
function handleEmailRegistration(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    const userClass = form.querySelector('#classSelect').value;
    
    if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok');
        return;
    }
    
    if (password.length < 6) {
        alert('Password harus minimal 6 karakter');
        return;
    }
    
    if (!userClass) {
        alert('Pilih kelas terlebih dahulu');
        return;
    }
    
    currentUser = {
        id: 'email_' + Date.now(),
        name: name,
        email: email,
        picture: 'https://via.placeholder.com/150/667eea/ffffff?text=' + name.charAt(0).toUpperCase(),
        class: userClass,
        role: 'student'
    };
    
    saveUserData(currentUser.email, {
        ...currentUser,
        jurusan: currentJurusan,
        class: userClass,
        profileCompleted: false,
        registeredAt: new Date().toISOString()
    });
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Pendaftaran berhasil! Silakan lengkapi profil Anda.');
    showProfileSetup();
    form.reset();
}

function selectJurusan(jurusan) {
    currentJurusan = jurusan;
    document.querySelectorAll('.jurusan-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    showProfileSetup();
}

function showJurusanSelection() {
    if (currentUser) {
        document.getElementById('welcomeMessage').textContent = 
            `Halo ${currentUser.name}, pilih jurusan untuk melanjutkan`;
    }
    showPage('jurusanSelection');
}

function showEmailRegistration() {
    showPage('emailRegistration');
}

function showTeacherRegistration() {
    showPage('teacherRegistration');
}

// Profile Picture Handlers
function handleProfilePictureChange(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePreview').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function handleProfileEditPictureChange(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileEditPreview').src = e.target.result;
            currentUser.picture = e.target.result;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        reader.readAsDataURL(file);
    }
}

// AI Chat System
function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => {
            const aiResponse = generateAIResponse(message);
            addChatMessage(aiResponse, 'ai');
        }, 1000);
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(message) {
    const contextKeywords = {
        'proses bisnis': 'Berdasarkan materi hari 1, proses bisnis adalah serangkaian aktivitas terstruktur untuk mencapai tujuan bisnis...',
        'jaringan': 'Dalam konteks TJKT, jaringan komputer berperan dalam mendukung seluruh proses bisnis...',
        'guru': 'Sebagai guru, Anda dapat memantau progress siswa melalui dashboard monitoring...',
        'developer': 'Developer memiliki akses ke sistem metrics dan analytics untuk monitoring performa...',
        'quiz': 'Untuk persiapan quiz, fokuslah pada konsep-konsep utama yang telah dipelajari...',
        'problem': 'Dalam problem solving, mulailah dengan analisis kebutuhan dan buat solusi bertahap...'
    };
    
    for (let keyword in contextKeywords) {
        if (message.toLowerCase().includes(keyword)) {
            return contextKeywords[keyword];
        }
    }
    
    const generalResponses = [
        "Itu pertanyaan yang bagus! Mari kita bahas bersama...",
        "Berdasarkan materi yang sedang Anda pelajari...",
        "Saya bisa membantu Anda memahami konsep ini. Pertama...",
        "Untuk menjawab pertanyaan Anda, perlu diketahui bahwa...",
        "Dalam konteks TJKT, hal tersebut berkaitan dengan..."
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// Initialize demo accounts on first load
createDemoAccounts();

// Navigation System - PERBAIKAN
function showSection(sectionId) {
    console.log('Showing section:', sectionId); // Debug
    
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Deactivate all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    } else {
        console.error('Section not found:', sectionId + 'Section');
        return;
    }
    
    // Activate corresponding nav button
    const navButton = document.querySelector(`.nav-btn[onclick="showSection('${sectionId}')"]`);
    if (navButton) {
        navButton.classList.add('active');
    }
    
    // Load section-specific content
    switch(sectionId) {
        case 'home':
            loadHomeSection();
            break;
        case 'materials':
            loadMaterialsSection();
            break;
        case 'leaderboard':
            loadLeaderboardSection();
            break;
        case 'profile':
            loadProfileSection();
            break;
        default:
            console.log('Unknown section:', sectionId);
    }
}

// Developer Navigation - PERBAIKAN
function showDevSection(sectionId) {
    console.log('Showing dev section:', sectionId);
    
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Deactivate all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById('dev' + capitalizeFirst(sectionId) + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    } else {
        console.error('Dev section not found:', 'dev' + capitalizeFirst(sectionId) + 'Section');
        return;
    }
    
    // Activate corresponding nav button
    const navButton = document.querySelector(`.nav-btn[onclick="showDevSection('${sectionId}')"]`);
    if (navButton) {
        navButton.classList.add('active');
    }
    
    // Load section-specific content
    switch(sectionId) {
        case 'metrics':
            loadMetricsSection();
            break;
        case 'users':
            loadUsersSection();
            break;
        case 'ai':
            loadAISection();
            break;
        case 'database':
            loadDatabaseSection();
            break;
        default:
            console.log('Unknown dev section:', sectionId);
    }
}
