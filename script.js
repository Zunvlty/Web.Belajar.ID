// Global State Management
let currentUser = null;
let currentJurusan = null;
let userRole = null;
let userClass = null;
let currentQuizAnswers = [];
let currentChallengeSolutions = [];

// Database Materi TJKT 10 Hari (Hari 1-10)
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
            <p><strong>Pengertian:</strong> Pemanfaatan infrastruktur jaringan komputer untuk meningkatkan efisiensi, komunikasi, dan koordinasi dalam menjalankan bisnis.</p>
        `,
        // 25 SOAL EVALUASI
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
            {
                question: "Struktur organisasi dalam pelaku usaha kelompok biasanya terdiri dari:",
                options: [
                    "Hanya CEO saja",
                    "CEO, manajer, dan staff pelaksana",
                    "Hanya staff lapangan",
                    "Tidak ada struktur yang jelas"
                ],
                answer: 1,
                explanation: "Struktur organisasi kelompok memiliki pembagian tugas yang jelas: CEO, manajer, dan staff."
            },
            {
                question: "Fungsi utama jaringan komputer dalam proses bisnis adalah:",
                options: [
                    "Hanya untuk bermain game",
                    "Meningkatkan efisiensi dan komunikasi",
                    "Menggantikan semua karyawan",
                    "Hanya untuk kepentingan pribadi"
                ],
                answer: 1,
                explanation: "Jaringan komputer meningkatkan efisiensi, komunikasi, dan koordinasi dalam bisnis."
            },
            {
                question: "Contoh implementasi jaringan komputer dalam bisnis:",
                options: [
                    "Hanya untuk email pribadi",
                    "Sistem inventory dan remote monitoring",
                    "Hanya untuk media sosial",
                    "Tidak ada implementasi nyata"
                ],
                answer: 1,
                explanation: "Jaringan digunakan untuk sistem inventory, monitoring, dan koordinasi antar divisi."
            },
            {
                question: "Apa yang dimaksud dengan input dalam proses bisnis?",
                options: [
                    "Hasil akhir dari produksi",
                    "Bahan baku dan sumber daya yang digunakan",
                    "Laporan keuangan",
                    "Pemasaran produk"
                ],
                answer: 1,
                explanation: "Input adalah bahan baku dan sumber daya yang dimasukkan ke dalam proses produksi."
            },
            {
                question: "Keuntungan utama proses bisnis yang terstruktur:",
                options: [
                    "Menghambat produktivitas",
                    "Menciptakan kekacauan",
                    "Meningkatkan efisiensi dan konsistensi",
                    "Memperlambat operasional"
                ],
                answer: 2,
                explanation: "Proses terstruktur meningkatkan efisiensi dan konsistensi hasil."
            },
            {
                question: "Dalam konteks TJKT, jaringan komputer mendukung:",
                options: [
                    "Hanya bagian produksi",
                    "Seluruh tahapan proses bisnis",
                    "Hanya bagian pemasaran",
                    "Hanya bagian keuangan"
                ],
                answer: 1,
                explanation: "Jaringan komputer mendukung seluruh tahapan proses bisnis dari awal hingga akhir."
            },
            {
                question: "Apa perbedaan utama pelaku usaha individu dan kelompok?",
                options: [
                    "Tidak ada perbedaan",
                    "Individu: tanggung jawab terpusat, Kelompok: pembagian tugas",
                    "Kelompok: tanggung jawab satu orang, Individu: banyak orang",
                    "Hanya berbeda dalam jumlah modal"
                ],
                answer: 1,
                explanation: "Pelaku individu tanggung jawab terpusat, kelompok ada pembagian tugas spesifik."
            },
            {
                question: "Contoh proses bisnis sederhana untuk pedagang kue:",
                options: [
                    "Beli bahan → Produksi → Jual langsung",
                    "Jual saja tanpa produksi",
                    "Produksi tanpa bahan baku",
                    "Tidak perlu proses yang jelas"
                ],
                answer: 0,
                explanation: "Proses sederhana: beli bahan, produksi kue, jual langsung ke konsumen."
            },
            {
                question: "Apa tujuan pembagian kerja dalam organisasi?",
                options: [
                    "Memperlambat pekerjaan",
                    "Meningkatkan efisiensi dan spesialisasi",
                    "Menciptakan konflik",
                    "Mengurangi produktivitas"
                ],
                answer: 1,
                explanation: "Pembagian kerja meningkatkan efisiensi melalui spesialisasi tugas."
            },
            {
                question: "Komunikasi internal dalam bisnis dapat difasilitasi oleh:",
                options: [
                    "Jaringan komputer dengan email dan chat",
                    "Hanya meeting tatap muka",
                    "Surat menyurat manual",
                    "Tidak perlu komunikasi internal"
                ],
                answer: 0,
                explanation: "Jaringan komputer memfasilitasi komunikasi internal melalui email, chat, dll."
            },
            {
                question: "Apa yang dimaksud dengan 'output' dalam proses bisnis?",
                options: [
                    "Bahan baku yang digunakan",
                    "Produk atau jasa yang dihasilkan",
                    "Proses produksi",
                    "Dokumen perencanaan"
                ],
                answer: 1,
                explanation: "Output adalah produk atau jasa akhir yang dihasilkan dari proses bisnis."
            },
            {
                question: "Mengapa jaringan komputer penting untuk monitoring proses produksi?",
                options: [
                    "Agar bisa main game saat kerja",
                    "Untuk remote monitoring dan kontrol kualitas",
                    "Hanya untuk hiasan",
                    "Tidak penting sama sekali"
                ],
                answer: 1,
                explanation: "Jaringan memungkinkan remote monitoring dan kontrol kualitas produksi."
            },
            {
                question: "Contoh perusahaan yang termasuk pelaku usaha kelompok:",
                options: [
                    "Pedagang kaki lima",
                    "Perusahaan ISP dan vendor jaringan",
                    "Tukang servis komputer independen",
                    "Tidak ada contohnya"
                ],
                answer: 1,
                explanation: "Perusahaan ISP dan vendor jaringan adalah contoh pelaku usaha kelompok."
            },
            {
                question: "Apa keuntungan pengambilan keputusan cepat pada pelaku usaha individu?",
                options: [
                    "Lebih lambat merespon pasar",
                    "Dapat merespon perubahan pasar dengan cepat",
                    "Selalu membuat keputusan salah",
                    "Tidak ada keuntungan"
                ],
                answer: 1,
                explanation: "Pengambilan keputusan cepat memungkinkan respons cepat terhadap perubahan pasar."
            },
            {
                question: "Dalam proses bisnis, 'produksi' termasuk dalam tahap:",
                options: [
                    "Input",
                    "Proses",
                    "Output",
                    "Pemasaran"
                ],
                answer: 1,
                explanation: "Produksi adalah bagian dari tahap proses dalam alur bisnis."
            },
            {
                question: "Apa fungsi berbagi data dalam jaringan komputer bisnis?",
                options: [
                    "Memperlambat kerja tim",
                    "Meningkatkan koordinasi dan kolaborasi",
                    "Menyembunyikan informasi",
                    "Membuat konflik data"
                ],
                answer: 1,
                explanation: "Berbagi data meningkatkan koordinasi dan kolaborasi antar tim."
            },
            {
                question: "Modal terbatas pada pelaku usaha individu berarti:",
                options: [
                    "Tidak bisa memulai usaha",
                    "Harus mengelola keuangan dengan efisien",
                    "Bisa menghamburkan uang",
                    "Tidak perlu perencanaan keuangan"
                ],
                answer: 1,
                explanation: "Modal terbatas mengharuskan pengelolaan keuangan yang efisien."
            },
            {
                question: "Contoh layanan pelanggan yang didukung jaringan komputer:",
                options: [
                    "Hanya telepon saja",
                    "Chat support, ticketing system, knowledge base",
                    "Hanya email pribadi",
                    "Tidak ada layanan yang didukung"
                ],
                answer: 1,
                explanation: "Jaringan mendukung berbagai layanan pelanggan seperti chat, ticketing, dll."
            },
            {
                question: "Apa yang membedakan proses bisnis dengan aktivitas biasa?",
                options: [
                    "Tidak ada bedanya",
                    "Proses bisnis terstruktur dan berulang",
                    "Aktivitas biasa lebih penting",
                    "Hanya berbeda namanya"
                ],
                answer: 1,
                explanation: "Proses bisnis bersifat terstruktur, terorganisir, dan dapat diulang."
            },
            {
                question: "Mengapa koordinasi penting dalam pelaku usaha kelompok?",
                options: [
                    "Agar bisa kerja sendiri-sendiri",
                    "Untuk menyelaraskan kerja tim mencapai tujuan bersama",
                    "Menciptakan kompetisi internal",
                    "Tidak penting"
                ],
                answer: 1,
                explanation: "Koordinasi menyelaraskan kerja tim untuk mencapai tujuan bersama."
            },
            {
                question: "Teknologi informasi dalam TJKT membantu proses bisnis dengan:",
                options: [
                    "Memperlambat operasional",
                    "Mengotomasi tugas dan meningkatkan akurasi",
                    "Menghilangkan kebutuhan SDM",
                    "Hanya untuk dokumentasi"
                ],
                answer: 1,
                explanation: "TI mengotomasi tugas dan meningkatkan akurasi proses bisnis."
            },
            {
                question: "Apa contoh 'resources' dalam input proses bisnis?",
                options: [
                    "Hanya uang saja",
                    "SDM, material, peralatan, dan modal",
                    "Hanya bahan baku",
                    "Hanya dokumen"
                ],
                answer: 1,
                explanation: "Resources mencakup SDM, material, peralatan, modal, dan informasi."
            },
            {
                question: "Efisiensi dalam proses bisnis berarti:",
                options: [
                    "Menggunakan sumber daya seminimal mungkin untuk hasil maksimal",
                    "Menghabiskan semua resources",
                    "Bekerja semaunya",
                    "Tidak peduli dengan biaya"
                ],
                answer: 0,
                explanation: "Efisiensi adalah menggunakan sumber daya minimal untuk hasil maksimal."
            }
        ],
        // 5 PROBLEM SOLVING CHALLENGE
        challenges: [
            {
                problem: "Rancang proses bisnis sederhana untuk usaha servis komputer dengan menjelaskan tahapan input-proses-output!",
                solution: "Input: Komputer rusak, sparepart, tools. Proses: Diagnosa kerusakan, perbaikan hardware/software, testing. Output: Komputer berfungsi normal, laporan servis, invoice pembayaran.",
                points: 20
            },
            {
                problem: "Analisis perbedaan kebutuhan jaringan untuk pelaku usaha individu vs kelompok dalam bidang TJKT!",
                solution: "Usaha individu: Jaringan sederhana (Wi-Fi, 1-2 komputer). Usaha kelompok: Jaringan kompleks (LAN, server, multiple devices, security system).",
                points: 25
            },
            {
                problem: "Buat diagram alur proses bisnis untuk vendor jaringan komputer yang melayani instalasi jaringan untuk sekolah!",
                solution: "1. Survei kebutuhan 2. Desain jaringan 3. Approval client 4. Procurement perangkat 5. Instalasi 6. Testing 7. Serah terima 8. Maintenance.",
                points: 30
            },
            {
                problem: "Identifikasi 3 titik dalam proses bisnis yang dapat dioptimalkan dengan teknologi jaringan komputer!",
                solution: "1. Komunikasi internal (email/chat) 2. Berbagi data proyek (cloud storage) 3. Monitoring progress (project management tools) 4. Layanan pelanggan (helpdesk system).",
                points: 20
            },
            {
                problem: "Hitung ROI (Return on Investment) untuk implementasi jaringan komputer dalam usaha dengan modal awal Rp 50 juta dan penghematan biaya operasional Rp 15 juta/tahun!",
                solution: "ROI = (Penghematan tahunan / Modal awal) × 100% = (15.000.000 / 50.000.000) × 100% = 30% per tahun. Payback period = 3.3 tahun.",
                points: 25
            }
        ]
    },
    day2: {
        title: "PERENCANAAN JARINGAN BERDASARKAN KEBUTUHAN PELANGGAN",
        content: `
            <h3>5. SURVEI KEBUTUHAN PELANGGAN</h3>
            <p><strong>Pengertian:</strong> Proses pengumpulan data dan informasi secara sistematis tentang kebutuhan, keinginan, dan spesifikasi yang diharapkan pengguna dari jaringan komputer yang akan dibangun.</p>
            
            <h4>Tujuan:</h4>
            <ul>
                <li>Memahami kebutuhan riil user</li>
                <li>Menghindari over/under specification</li>
                <li>Menyusun desain jaringan yang tepat</li>
            </ul>

            <h3>6. DOKUMEN SURVEI</h3>
            <p><strong>Pengertian:</strong> Formulir atau format standar yang digunakan untuk mencatat semua informasi kebutuhan pelanggan secara terstruktur.</p>

            <h3>7. CUSTOMER HANDLING</h3>
            <p><strong>Pengertian:</strong> Kemampuan dalam menangani dan berinteraksi dengan pelanggan selama proses survei maupun implementasi jaringan.</p>
        `,
        quiz: [
            // 25 soal untuk hari 2
            {
                question: "Apa tujuan utama survei kebutuhan pelanggan?",
                options: [
                    "Agar project lebih mahal",
                    "Memahami kebutuhan riil user dan menghindari over/under specification",
                    "Membuat jaringan sesuka hati",
                    "Tidak perlu survei"
                ],
                answer: 1,
                explanation: "Survei untuk memahami kebutuhan riil dan menghindari spesifikasi tidak tepat."
            },
            // ... (23 soal lainnya untuk hari 2)
        ],
        challenges: [
            // 5 problem solving untuk hari 2
            {
                problem: "Buat form survei kebutuhan jaringan untuk sekolah dengan 3 lab komputer!",
                solution: "Form survei: Jumlah device, aplikasi yang digunakan, bandwidth requirement, lokasi titik akses, budget, timeline.",
                points: 20
            },
            // ... (4 problem lainnya untuk hari 2)
        ]
    }
    // ... (hari 3-10)
};

// Database Kelas dan Siswa
const classDatabase = {
    "10_tjkt_1": [
        { name: "Ahmad Wijaya", score: 850, daysActive: 8 },
        { name: "Siti Nurhaliza", score: 920, daysActive: 9 },
        { name: "Budi Santoso", score: 780, daysActive: 7 },
        { name: "Citra Dewi", score: 890, daysActive: 8 },
        { name: "Dodi Pratama", score: 810, daysActive: 7 }
    ],
    "10_tjkt_2": [
        { name: "Eka Putra", score: 880, daysActive: 8 },
        { name: "Fitriani", score: 790, daysActive: 7 },
        { name: "Gunawan", score: 910, daysActive: 9 },
        { name: "Hana Lestari", score: 830, daysActive: 8 },
        { name: "Irfan Maulana", score: 760, daysActive: 6 }
    ],
    "10_tjkt_3": [
        { name: "Joko Susilo", score: 900, daysActive: 9 },
        { name: "Kartika Sari", score: 870, daysActive: 8 },
        { name: "Lukman Hakim", score: 820, daysActive: 7 },
        { name: "Maya Indah", score: 940, daysActive: 10 },
        { name: "Nugroho", score: 800, daysActive: 7 }
    ]
};

// System Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    setupEventListeners();
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
            userRole = 'student';
            showStudentDashboard();
        }
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

// Google Login Handler
function handleGoogleLogin(response) {
    try {
        const userData = decodeJWTResponse(response.credential);
        
        currentUser = {
            id: userData.sub,
            name: userData.name,
            email: userData.email,
            picture: userData.picture
        };
        
        // Save user session
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Check if user exists and has completed profile
        const userExists = checkUserExists(userData.email);
        
        if (!userExists) {
            showJurusanSelection();
        } else {
            const userData = getUserData(userData.email);
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

// Page Navigation Functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Deactivate all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(sectionId + 'Section').classList.add('active');
    
    // Activate corresponding nav button
    document.querySelector(`.nav-btn[onclick="showSection('${sectionId}')"]`).classList.add('active');
    
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
    }
}

function showEmailRegistration() {
    showPage('emailRegistration');
}

function showProfileSetup() {
    showPage('profileSetup');
}

function showTeacherRegistration() {
    showPage('teacherRegistration');
}

function showJurusanSelection() {
    if (currentUser) {
        document.getElementById('welcomeMessage').textContent = 
            `Halo ${currentUser.name}, pilih jurusan untuk melanjutkan`;
    }
    showPage('jurusanSelection');
}

function selectJurusan(jurusan) {
    currentJurusan = jurusan;
    
    // Update UI to show selection
    document.querySelectorAll('.jurusan-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // Move to profile setup
    showProfileSetup();
}

// Email Registration Handler
function handleEmailRegistration(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    const userClass = this.querySelector('#classSelect').value;
    
    // Validation
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
    
    // Create user account
    currentUser = {
        id: 'email_' + Date.now(),
        name: name,
        email: email,
        picture: 'https://via.placeholder.com/150/667eea/ffffff?text=' + name.charAt(0).toUpperCase(),
        class: userClass
    };
    
    // Save user data
    saveUserData(currentUser.email, {
        ...currentUser,
        jurusan: currentJurusan,
        class: userClass,
        profileCompleted: false,
        registeredAt: new Date().toISOString()
    });
    
    // Save user session
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Pendaftaran berhasil! Silakan lengkapi profil Anda.');
    showProfileSetup();
    
    // Reset form
    this.reset();
}

// Profile Setup Handler
function handleProfileSetup(e) {
    e.preventDefault();
    const bio = document.getElementById('userBio').value;
    const profession = document.getElementById('professionSelect').value;
    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
    
    // Update user data
    const userData = getUserData(currentUser.email);
    userData.bio = bio;
    userData.profession = profession;
    userData.skills = skills;
    userData.profileCompleted = true;
    
    saveUserData(currentUser.email, userData);
    
    // Update current user
    currentUser = { ...currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Profil berhasil disimpan!');
    userRole = 'student';
    showStudentDashboard();
}

// Student Dashboard Functions
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
        document.getElementById('materialsCompleted').textContent = progress.materialsCompleted;
        document.getElementById('averageScore').textContent = progress.averageScore + '%';
        document.getElementById('currentStreak').textContent = progress.currentStreak;
        document.getElementById('userRank').textContent = '#' + (progress.rank || '-');
        
        // Update progress bar
        const progressBar = document.getElementById('dailyProgress');
        const day = getCurrentDay();
        const dailyProgress = calculateDailyProgress(day);
        progressBar.style.width = dailyProgress + '%';
        
        document.getElementById('currentDay').textContent = day;
    }
}

function loadMaterialsSection() {
    const day = getCurrentDay();
    const material = tjktMaterials['day' + day];
    
    if (material) {
        document.getElementById('materialDay').textContent = day;
        document.getElementById('materialDate').textContent = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        document.getElementById('materialContent').innerHTML = `
            <h3>${material.title}</h3>
            ${material.content}
        `;
        
        // Reset buttons
        resetDailyButtons();
        
        // Check existing progress
        checkExistingProgress(day);
    }
}

function updateTaskStatus() {
    const day = getCurrentDay();
    const progress = getDailyProgress(day);
    
    document.getElementById('materialStatus').textContent = progress.materialCompleted ? 'Selesai' : 'Belum';
    document.getElementById('materialStatus').className = progress.materialCompleted ? 'task-status completed' : 'task-status';
    
    document.getElementById('quizStatus').textContent = progress.quizCompleted ? 'Selesai' : 'Belum';
    document.getElementById('quizStatus').className = progress.quizCompleted ? 'task-status completed' : 'task-status';
    
    document.getElementById('challengeStatus').textContent = progress.challengeCompleted ? 'Selesai' : 'Belum';
    document.getElementById('challengeStatus').className = progress.challengeCompleted ? 'task-status completed' : 'task-status';
}

// Quiz System
function startQuiz() {
    const day = getCurrentDay();
    const material = tjktMaterials['day' + day];
    
    if (material) {
        const quizHTML = material.quiz.map((q, index) => `
            <div class="quiz-question">
                <h4>${index + 1}. ${q.question}</h4>
                <div class="quiz-options">
                    ${q.options.map((option, optIndex) => `
                        <div class="quiz-option" onclick="selectAnswer(${index}, ${optIndex})">
                            <input type="radio" name="q${index}" value="${optIndex}" style="display: none;">
                            <span class="option-letter">${String.fromCharCode(65 + optIndex)}.</span>
                            <span class="option-text">${option}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        document.getElementById('quizContent').innerHTML = quizHTML;
        document.getElementById('quizBtn').textContent = 'Submit Jawaban (25 Soal)';
        document.getElementById('quizBtn').onclick = submitQuiz;
        document.getElementById('quizProgress').textContent = '0/25 selesai';
        
        currentQuizAnswers = new Array(material.quiz.length).fill(null);
    }
}

function selectAnswer(questionIndex, answerIndex) {
    // Remove selected class from all options in this question
    const questionElement = document.querySelectorAll('.quiz-question')[questionIndex];
    questionElement.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to chosen option
    const selectedOption = questionElement.querySelectorAll('.quiz-option')[answerIndex];
    selectedOption.classList.add('selected');
    
    // Store answer
    currentQuizAnswers[questionIndex] = answerIndex;
    
    // Update progress
    const answeredCount = currentQuizAnswers.filter(answer => answer !== null).length;
    document.getElementById('quizProgress').textContent = `${answeredCount}/25 selesai`;
}

function submitQuiz() {
    const day = getCurrentDay();
    const material = tjktMaterials['day' + day];
    let correctCount = 0;
    
    // Calculate score and show results
    material.quiz.forEach((question, index) => {
        const userAnswer = currentQuizAnswers[index];
        const isCorrect = userAnswer === question.answer;
        
        if (isCorrect) correctCount++;
        
        // Highlight correct/incorrect answers
        const questionElement = document.querySelectorAll('.quiz-question')[index];
        const options = questionElement.querySelectorAll('.quiz-option');
        
        options.forEach((option, optIndex) => {
            if (optIndex === question.answer) {
                option.classList.add('correct');
            } else if (optIndex === userAnswer && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
    });
    
    const score = Math.round((correctCount / material.quiz.length) * 100);
    
    // Save quiz result
    saveQuizResult(day, score, currentQuizAnswers);
    
    document.getElementById('quizStatus').textContent = `Nilai: ${score}%`;
    document.getElementById('quizBtn').textContent = '✅ Sudah Dikerjakan';
    document.getElementById('quizBtn').disabled = true;
    document.getElementById('quizBtn').style.background = '#4CAF50';
    
    updateProgressBar();
    updateTaskStatus();
    
    // Show result in AI chat
    addChatMessage(`Saya telah menyelesaikan kuis dengan nilai ${score}% (${correctCount}/25 benar)`, 'user');
    setTimeout(() => {
        if (score >= 80) {
            addChatMessage(`Excellent! ${correctCount} dari 25 soal benar. Pemahaman Anda sangat baik!`, 'ai');
        } else if (score >= 60) {
            addChatMessage(`Bagus! ${correctCount} dari 25 soal benar. Terus tingkatkan pemahaman!`, 'ai');
        } else {
            addChatMessage(`${correctCount} dari 25 soal benar. Mari review materinya lagi untuk pemahaman yang lebih baik.`, 'ai');
        }
    }, 1000);
}

// Problem Solving System
function startChallenge() {
    const day = getCurrentDay();
    const material = tjktMaterials['day' + day];
    
    if (material) {
        const challengeHTML = material.challenges.map((challenge, index) => `
            <div class="challenge-item">
                <h4>Problem ${index + 1}:</h4>
                <p>${challenge.problem}</p>
                <textarea class="challenge-solution" placeholder="Tulis solusi Anda di sini..." rows="4" 
                          oninput="updateChallengeSolution(${index}, this.value)"></textarea>
                <div class="solution-feedback" id="feedback${index}" style="display: none; margin-top: 10px; padding: 10px; border-radius: 5px; background: #f8f9fa;"></div>
            </div>
        `).join('');
        
        document.getElementById('challengeContent').innerHTML = challengeHTML;
        document.getElementById('challengeBtn').textContent = 'Submit Semua Solution';
        document.getElementById('challengeBtn').onclick = submitAllChallenges;
        document.getElementById('challengeProgress').textContent = '0/5 selesai';
        
        currentChallengeSolutions = new Array(material.challenges.length).fill('');
    }
}

function updateChallengeSolution(index, solution) {
    currentChallengeSolutions[index] = solution;
    
    const solvedCount = currentChallengeSolutions.filter(sol => sol.trim().length > 0).length;
    document.getElementById('challengeProgress').textContent = `${solvedCount}/5 selesai`;
}

function submitAllChallenges() {
    const day = getCurrentDay();
    const material = tjktMaterials['day' + day];
    let totalPoints = 0;
    
    material.challenges.forEach((challenge, index) => {
        const userSolution = currentChallengeSolutions[index];
        const feedbackElement = document.getElementById('feedback' + index);
        
        if (userSolution.trim().length > 0) {
            // Simple evaluation - in real app, this would be more sophisticated
            const similarity = calculateSolutionSimilarity(userSolution, challenge.solution);
            const points = Math.round(challenge.points * similarity);
            totalPoints += points;
            
            feedbackElement.innerHTML = `
                <strong>Solusi Model:</strong> ${challenge.solution}<br>
                <strong>Points Earned:</strong> ${points}/${challenge.points}<br>
                <em>${getFeedbackBasedOnSimilarity(similarity)}</em>
            `;
            feedbackElement.style.display = 'block';
            feedbackElement.style.background = similarity >= 0.7 ? '#e8f5e8' : '#fff3cd';
        }
    });
    
    // Save challenge result
    saveChallengeResult(day, totalPoints, currentChallengeSolutions);
    
    document.getElementById('challengeStatus').textContent = 'Tantangan Diselesaikan';
    document.getElementById('challengeBtn').textContent = '✅ Sudah Dikerjakan';
    document.getElementById('challengeBtn').disabled = true;
    document.getElementById('challengeBtn').style.background = '#4CAF50';
    
    updateProgressBar();
    updateTaskStatus();
    
    addChatMessage(`Saya telah menyelesaikan 5 problem solving dengan total ${totalPoints} points!`, 'user');
    setTimeout(() => {
        addChatMessage(`Hebat! ${totalPoints} points dari 120 points maksimal. Problem solving skill Anda berkembang!`, 'ai');
    }, 1000);
}

// Leaderboard System
function loadLeaderboardSection() {
    updateLeaderboard();
}

function updateLeaderboard() {
    const classFilter = document.getElementById('leaderboardClassFilter').value;
    const typeFilter = document.getElementById('leaderboardTypeFilter').value;
    
    let leaderboardData = [];
    
    if (classFilter === 'all') {
        // Combine all classes
        Object.values(classDatabase).forEach(students => {
            leaderboardData = leaderboardData.concat(students);
        });
    } else {
        leaderboardData = classDatabase[classFilter] || [];
    }
    
    // Sort by score
    leaderboardData.sort((a, b) => b.score - a.score);
    
    // Update podium
    updatePodium(leaderboardData.slice(0, 3));
    
    // Update full leaderboard
    updateFullLeaderboard(leaderboardData);
}

function updatePodium(top3) {
    const podiumItems = document.querySelectorAll('.podium-item');
    
    podiumItems.forEach((item, index) => {
        if (top3[index]) {
            const student = top3[index];
            item.querySelector('.student-name').textContent = student.name;
            item.querySelector('.student-score').textContent = student.score + ' pts';
        } else {
            item.querySelector('.student-name').textContent = '-';
            item.querySelector('.student-score').textContent = '-';
        }
    });
}

function updateFullLeaderboard(students) {
    const leaderboardElement = document.getElementById('fullLeaderboard');
    
    const leaderboardHTML = students.map((student, index) => {
        const isCurrentUser = currentUser && student.name === currentUser.name;
        return `
            <div class="leaderboard-item ${isCurrentUser ? 'current-user' : ''}">
                <div class="leaderboard-rank">#${index + 1}</div>
                <div class="leaderboard-user">
                    <img src="https://via.placeholder.com/40/667eea/ffffff?text=${student.name.charAt(0)}" alt="${student.name}">
                    <div>
                        <div class="student-name">${student.name}</div>
                        <div class="student-details">${student.daysActive} hari aktif</div>
                    </div>
                </div>
                <div class="leaderboard-score">${student.score} pts</div>
            </div>
        `;
    }).join('');
    
    leaderboardElement.innerHTML = leaderboardHTML;
}

function loadClassLeaderboardPreview() {
    const userClass = currentUser.class;
    const classData = classDatabase[userClass] || [];
    
    document.getElementById('previewClass').textContent = getClassDisplayName(userClass);
    
    const previewHTML = classData.slice(0, 5).map((student, index) => `
        <div class="leaderboard-item">
            <div class="leaderboard-rank">#${index + 1}</div>
            <div class="leaderboard-user">
                <img src="https://via.placeholder.com/30/667eea/ffffff?text=${student.name.charAt(0)}" alt="${student.name}">
                <span class="student-name">${student.name}</span>
            </div>
            <div class="leaderboard-score">${student.score}</div>
        </div>
    `).join('');
    
    document.getElementById('classLeaderboardPreview').innerHTML = previewHTML;
}

// Profile System
function loadProfileSection() {
    if (currentUser) {
        const userData = getUserData(currentUser.email);
        const progress = getStudentProgress(currentUser.email);
        
        document.getElementById('profileFullName').textContent = currentUser.name;
        document.getElementById('profileFullAvatar').src = currentUser.picture;
        document.getElementById('profileFullClass').textContent = getClassDisplayName(currentUser.class);
        document.getElementById('profileFullProfession').textContent = getProfessionDisplayName(userData.profession);
        document.getElementById('profileFullBio').textContent = userData.bio || 'Belum ada bio';
        
        document.getElementById('profileTotalScore').textContent = progress.totalScore || 0;
        document.getElementById('profileDaysActive').textContent = progress.daysActive || 0;
        document.getElementById('profileProblemsSolved').textContent = progress.problemsSolved || 0;
        document.getElementById('profileRank').textContent = '#' + (progress.rank || '-');
        
        // Load skills
        const skillsHTML = (userData.skills || []).map(skill => 
            `<span class="skill-tag">${getSkillDisplayName(skill)}</span>`
        ).join('');
        document.getElementById('profileSkillsTags').innerHTML = skillsHTML;
        
        // Load achievements
        loadAchievements(progress);
    }
}

function showProfileEditor() {
    const userData = getUserData(currentUser.email);
    const modal = document.getElementById('profileEditor');
    
    document.getElementById('profileEditPreview').src = currentUser.picture;
    document.getElementById('profileEditBio').value = userData.bio || '';
    document.getElementById('profileEditProfession').value = userData.profession || '';
    
    // Check skills checkboxes
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
    
    // Update user data
    const userData = getUserData(currentUser.email);
    userData.bio = bio;
    userData.profession = profession;
    userData.skills = skills;
    
    saveUserData(currentUser.email, userData);
    
    // Update current user
    currentUser = { ...currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeProfileEditor();
    loadProfileSection();
    alert('Profil berhasil diperbarui!');
}

// AI Chat System
function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        // Simulate AI thinking
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
    const day = getCurrentDay();
    const material = tjktMaterials['day' + day];
    const contextKeywords = {
        'proses bisnis': 'Berdasarkan materi hari 1, proses bisnis adalah...',
        'jaringan': 'Dalam konteks TJKT, jaringan komputer berperan dalam...',
        'survei': 'Survei kebutuhan pelanggan penting untuk...',
        'quiz': 'Untuk persiapan quiz, fokuslah pada konsep...',
        'problem': 'Dalam problem solving, mulailah dengan analisis kebutuhan...'
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
        "Untuk menjawab pertanyaan Anda, perlu diketahui bahwa..."
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// Utility Functions
function getCurrentDay() {
    const userProgress = getUserProgress(currentUser.email);
    return userProgress.currentDay || 1;
}

function calculateDailyProgress(day) {
    const progress = getDailyProgress(day);
    let totalProgress = 0;
    
    if (progress.materialCompleted) totalProgress += 33;
    if (progress.quizCompleted) totalProgress += 33;
    if (progress.challengeCompleted) totalProgress += 34;
    
    return totalProgress;
}

function getClassDisplayName(classId) {
    const classNames = {
        '10_tjkt_1': 'X TJKT 1',
        '10_tjkt_2': 'X TJKT 2',
        '10_tjkt_3': 'X TJKT 3',
        '11_tjkt_1': 'XI TJKT 1',
        '11_tjkt_2': 'XI TJKT 2',
        '12_tjkt_1': 'XII TJKT 1',
        '12_tjkt_2': 'XII TJKT 2'
    };
    return classNames[classId] || classId;
}

function getProfessionDisplayName(profession) {
    const professions = {
        'network_engineer': 'Network Engineer',
        'security_analyst': 'Security Analyst',
        'system_admin': 'System Administrator',
        'cloud_engineer': 'Cloud Engineer',
        'iot_developer': 'IoT Developer',
        'network_technician': 'Network Technician',
        'cybersecurity': 'Cybersecurity Specialist',
        'data_center': 'Data Center Technician'
    };
    return professions[profession] || profession;
}

function getSkillDisplayName(skill) {
    const skills = {
        'networking': 'Jaringan Komputer',
        'security': 'Keamanan Jaringan',
        'routing': 'Routing & Switching',
        'wireless': 'Jaringan Nirkabel',
        'fiber': 'Fiber Optic',
        'voip': 'VoIP',
        'cloud': 'Cloud Computing',
        'iot': 'Internet of Things'
    };
    return skills[skill] || skill;
}

// Local Storage Management
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

function getUserProgress(email) {
    return JSON.parse(localStorage.getItem(`user_progress_${email}`)) || {
        currentDay: 1,
        lastAccessDate: null,
        completedDays: [],
        dailyProgress: {}
    };
}

function getDailyProgress(day) {
    const progress = getUserProgress(currentUser.email);
    return progress.dailyProgress[day] || {
        materialCompleted: false,
        quizCompleted: false,
        challengeCompleted: false,
        quizScore: 0,
        challengePoints: 0
    };
}

function saveQuizResult(day, score, answers) {
    const progress = getUserProgress(currentUser.email);
    if (!progress.dailyProgress[day]) {
        progress.dailyProgress[day] = {};
    }
    progress.dailyProgress[day].quizCompleted = true;
    progress.dailyProgress[day].quizScore = score;
    progress.dailyProgress[day].quizAnswers = answers;
    
    localStorage.setItem(`user_progress_${currentUser.email}`, JSON.stringify(progress));
}

function saveChallengeResult(day, points, solutions) {
    const progress = getUserProgress(currentUser.email);
    if (!progress.dailyProgress[day]) {
        progress.dailyProgress[day] = {};
    }
    progress.dailyProgress[day].challengeCompleted = true;
    progress.dailyProgress[day].challengePoints = points;
    progress.dailyProgress[day].challengeSolutions = solutions;
    
    localStorage.setItem(`user_progress_${currentUser.email}`, JSON.stringify(progress));
}

// Teacher and Developer Functions (simplified)
function handleTeacherRegistration(e) {
    e.preventDefault();
    alert('Pendaftaran akun guru berhasil! Menunggu persetujuan administrator.');
    showPage('loginPage');
}

function handleTeacherLogin(e) {
    e.preventDefault();
    alert('Login guru berhasil!');
    userRole = 'teacher';
    // Redirect to teacher dashboard
}

// Teacher Registration Handler - PERBAIKAN
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
        password: password, // In real app, hash this password
        jurusan: selectedJurusan,
        registeredAt: new Date().toISOString(),
        status: 'pending',
        role: 'teacher'
    };
    
    localStorage.setItem(`teacher_${email}`, JSON.stringify(teacherData));
    localStorage.setItem(`user_${email}`, JSON.stringify({
        ...teacherData,
        profileCompleted: true
    }));
    
    alert('Pendaftaran akun guru berhasil! Menunggu persetujuan administrator.');
    showPage('loginPage');
    
    // Reset form
    form.reset();
}

// Teacher Login Handler - PERBAIKAN
function handleTeacherLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    // Cek apakah akun guru ada
    const teacherData = localStorage.getItem(`teacher_${email}`);
    
    if (!teacherData) {
        alert('Akun guru tidak ditemukan. Silakan daftar terlebih dahulu.');
        return;
    }
    
    const teacher = JSON.parse(teacherData);
    
    // Verifikasi password
    if (teacher.password === password) {
        if (teacher.status === 'approved') {
            // Login berhasil
            userRole = 'teacher';
            currentUser = {
                id: 'teacher_' + email,
                name: teacher.name,
                email: email,
                picture: 'https://via.placeholder.com/150/667eea/ffffff?text=T',
                class: 'teacher'
            };
            
            // Save user session
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Redirect to teacher dashboard
            showTeacherDashboard();
        } else {
            alert('Akun guru menunggu persetujuan administrator.');
        }
    } else {
        alert('Password salah. Silakan coba lagi.');
    }
}

// Teacher Dashboard Functions - PERBAIKAN
function showTeacherDashboard() {
    showPage('teacherDashboard');
    loadTeacherData();
}

function loadTeacherData() {
    updateOnlineStudents();
    startRealTimeMonitoring();
    loadStudentsList();
    loadTeacherProfile();
}

function loadTeacherProfile() {
    if (currentUser) {
        const teacherData = JSON.parse(localStorage.getItem(`teacher_${currentUser.email}`));
        if (teacherData) {
            document.getElementById('teacherName').textContent = teacherData.name;
            document.getElementById('teacherEmail').textContent = teacherData.email;
            document.getElementById('teacherJurusan').textContent = teacherData.jurusan.map(j => j.toUpperCase()).join(', ');
        }
    }
}

function updateOnlineStudents() {
    // Simulate online students count
    const onlineCount = Math.floor(Math.random() * 15) + 5;
    const submissionCount = Math.floor(Math.random() * 10) + 2;
    
    document.getElementById('onlineStudents').textContent = onlineCount;
    document.getElementById('todaySubmissions').textContent = submissionCount;
}

function startRealTimeMonitoring() {
    // Update metrics every 5 seconds
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
    
    // Keep only last 10 activities
    if (activityFeed.children.length > 10) {
        activityFeed.removeChild(activityFeed.lastChild);
    }
}

function loadStudentsList() {
    const studentsGrid = document.getElementById('studentsGrid');
    
    // Get all students from localStorage
    const students = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_') && !key.includes('teacher')) {
            try {
                const userData = JSON.parse(localStorage.getItem(key));
                if (userData.role !== 'teacher' && userData.class) {
                    const progress = getStudentProgress(userData.email);
                    students.push({
                        name: userData.name,
                        email: userData.email,
                        class: userData.class,
                        progress: progress.averageScore || 0,
                        daysActive: progress.daysActive || 0
                    });
                }
            } catch (e) {
                console.log('Error parsing user data:', key);
            }
        }
    }
    
    if (students.length === 0) {
        // Sample data for demo
        const sampleStudents = [
            { name: 'Ahmad Wijaya', email: 'ahmad@school.com', class: '10_tjkt_1', progress: 85, daysActive: 8 },
            { name: 'Siti Nurhaliza', email: 'siti@school.com', class: '10_tjkt_1', progress: 92, daysActive: 9 },
            { name: 'Budi Santoso', email: 'budi@school.com', class: '10_tjkt_2', progress: 78, daysActive: 7 },
            { name: 'Citra Dewi', email: 'citra@school.com', class: '10_tjkt_2', progress: 89, daysActive: 8 },
            { name: 'Dodi Pratama', email: 'dodi@school.com', class: '10_tjkt_3', progress: 81, daysActive: 7 }
        ];
        
        students.push(...sampleStudents);
    }
    
    studentsGrid.innerHTML = students.map(student => `
        <div class="student-item">
            <img src="https://via.placeholder.com/50/667eea/ffffff?text=${student.name.charAt(0)}" alt="${student.name}">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 5px 0;">${student.name}</h4>
                <p style="margin: 0; color: #666; font-size: 0.85em;">${student.email}</p>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 0.8em;">
                    Kelas: ${getClassDisplayName(student.class)} | 
                    Hari Aktif: ${student.daysActive}
                </p>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 1.2em; font-weight: bold; color: #667eea;">${student.progress}%</div>
                <div style="font-size: 0.75em; color: #666;">Progress</div>
            </div>
        </div>
    `).join('');
}

function generateReport() {
    const students = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_') && !key.includes('teacher')) {
            try {
                const userData = JSON.parse(localStorage.getItem(key));
                if (userData.role !== 'teacher' && userData.class) {
                    const progress = getStudentProgress(userData.email);
                    students.push({
                        name: userData.name,
                        class: userData.class,
                        progress: progress.averageScore || 0,
                        daysActive: progress.daysActive || 0,
                        materialsCompleted: progress.materialsCompleted || 0
                    });
                }
            } catch (e) {
                continue;
            }
        }
    }
    
    const report = {
        title: 'Laporan Progress Siswa',
        generatedAt: new Date().toLocaleDateString('id-ID'),
        totalStudents: students.length,
        averageProgress: students.reduce((sum, student) => sum + student.progress, 0) / students.length,
        students: students
    };
    
    alert(`Laporan berhasil digenerate!\n\nTotal Siswa: ${report.totalStudents}\nRata-rata Progress: ${Math.round(report.averageProgress)}%\n\nLaporan lengkap akan dikirim ke email.`);
}

function manageContent() {
    alert('Membuka panel manajemen konten...\n\nFitur ini memungkinkan guru untuk:\n- Menambah/mengedit materi\n- Membuat soal quiz\n- Mengatur problem solving\n- Melihat statistik pembelajaran');
}

// Admin Approval System untuk Guru
function approveTeacher(email) {
    const teacherData = JSON.parse(localStorage.getItem(`teacher_${email}`));
    if (teacherData) {
        teacherData.status = 'approved';
        localStorage.setItem(`teacher_${email}`, JSON.stringify(teacherData));
        alert(`Akun guru ${teacherData.name} telah disetujui!`);
    }
}
function developerLogin() {
    const password = prompt('Enter developer password:');
    if (password === 'dev123') {
        userRole = 'developer';
        // Redirect to developer dashboard
    } else {
        alert('Invalid developer password');
    }
}

// Helper functions for problem solving evaluation
function calculateSolutionSimilarity(userSolution, modelSolution) {
    // Simple similarity calculation - in real app, use more sophisticated NLP
    const userWords = new Set(userSolution.toLowerCase().split(/\s+/));
    const modelWords = new Set(modelSolution.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...userWords].filter(x => modelWords.has(x)));
    const union = new Set([...userWords, ...modelWords]);
    
    return intersection.size / union.size;
}

function getFeedbackBasedOnSimilarity(similarity) {
    if (similarity >= 0.8) return "Solusi sangat baik dan komprehensif!";
    if (similarity >= 0.6) return "Solusi baik, beberapa poin bisa lebih detail";
    if (similarity >= 0.4) return "Solusi cukup, perlu pengembangan lebih lanjut";
    return "Perlu review kembali materi dan coba approach yang berbeda";
}

function resetDailyButtons() {
    const completeBtn = document.getElementById('completeBtn');
    const quizBtn = document.getElementById('quizBtn');
    const challengeBtn = document.getElementById('challengeBtn');
    
    completeBtn.textContent = '✅ Selesai Membaca';
    completeBtn.disabled = false;
    completeBtn.style.background = '';
    completeBtn.onclick = completeMaterial;
    
    quizBtn.textContent = 'Mulai Kuis (25 Soal)';
    quizBtn.disabled = false;
    quizBtn.style.background = '';
    quizBtn.onclick = startQuiz;
    
    challengeBtn.textContent = 'Ambil Tantangan (5 Problem)';
    challengeBtn.disabled = false;
    challengeBtn.style.background = '';
    challengeBtn.onclick = startChallenge;
}

function checkExistingProgress(day) {
    const progress = getDailyProgress(day);
    
    if (progress.materialCompleted) {
        document.getElementById('completeBtn').textContent = '✅ Sudah Selesai';
        document.getElementById('completeBtn').disabled = true;
        document.getElementById('completeBtn').style.background = '#4CAF50';
    }
    
    if (progress.quizCompleted) {
        document.getElementById('quizStatus').textContent = `Nilai: ${progress.quizScore}%`;
        document.getElementById('quizBtn').textContent = '✅ Sudah Dikerjakan';
        document.getElementById('quizBtn').disabled = true;
        document.getElementById('quizBtn').style.background = '#4CAF50';
    }
    
    if (progress.challengeCompleted) {
        document.getElementById('challengeStatus').textContent = 'Tantangan Diselesaikan';
        document.getElementById('challengeBtn').textContent = '✅ Sudah Dikerjakan';
        document.getElementById('challengeBtn').disabled = true;
        document.getElementById('challengeBtn').style.background = '#4CAF50';
    }
}

function completeMaterial() {
    const day = getCurrentDay();
    const btn = document.getElementById('completeBtn');
    
    btn.textContent = '✅ Sudah Selesai';
    btn.disabled = true;
    btn.style.background = '#4CAF50';
    
    // Save completion status
    const progress = getUserProgress(currentUser.email);
    if (!progress.dailyProgress[day]) {
        progress.dailyProgress[day] = {};
    }
    progress.dailyProgress[day].materialCompleted = true;
    localStorage.setItem(`user_progress_${currentUser.email}`, JSON.stringify(progress));
    
    updateProgressBar();
    updateTaskStatus();
    
    // Show confirmation in AI chat
    addChatMessage('Saya telah menyelesaikan materi hari ini!', 'user');
    setTimeout(() => {
        addChatMessage('Bagus! Sekarang lanjutkan dengan kuis untuk menguji pemahaman Anda.', 'ai');
    }, 1000);
}

function updateProgressBar() {
    const day = getCurrentDay();
    const progress = getDailyProgress(day);
    const progressBar = document.getElementById('dailyProgress');
    
    let totalProgress = 0;
    if (progress.materialCompleted) totalProgress += 33;
    if (progress.quizCompleted) totalProgress += 33;
    if (progress.challengeCompleted) totalProgress += 34;
    
    progressBar.style.width = totalProgress + '%';
}

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
            // Update current user picture
            currentUser.picture = e.target.result;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        reader.readAsDataURL(file);
    }
}

function loadAchievements(progress) {
    const achievements = [
        { icon: '📚', name: 'Pembelajar Aktif', desc: 'Menyelesaikan 5 materi', earned: progress.materialsCompleted >= 5 },
        { icon: '⭐', name: 'Quiz Master', desc: 'Nilai rata-rata quiz >80%', earned: progress.averageScore >= 80 },
        { icon: '💡', name: 'Problem Solver', desc: 'Selesaikan 10 problem', earned: progress.problemsSolved >= 10 },
        { icon: '🔥', name: 'Konsisten', desc: '7 hari beruntun aktif', earned: progress.currentStreak >= 7 }
    ];
    
    const achievementsHTML = achievements.map(achievement => `
        <div class="achievement-item ${achievement.earned ? 'earned' : 'locked'}">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.desc}</div>
        </div>
    `).join('');
    
    document.getElementById('achievementsGrid').innerHTML = achievementsHTML;
}

// Initialize the system when page loads
initializeSystem();
