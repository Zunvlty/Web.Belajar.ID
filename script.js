// Database Developer Accounts
const developerAccounts = {
    'fatkul.dev': { password: 'dev123', name: 'Fatkul Developer' },
    'reza.dev': { password: 'dev456', name: 'Reza Developer' }
};

// Database Teacher Accounts
const teacherAccounts = {
    'guru@tjkt.sch.id': { password: 'guru123', name: 'Guru TJKT' }
};

// Enhanced initializeSystem function
function initializeSystem() {
    // Check for existing user session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        const userData = getUserData(currentUser.email);
        
        if (userData) {
            if (userData.role === 'teacher') {
                userRole = 'teacher';
                showTeacherDashboard();
            } else if (userData.role === 'developer') {
                userRole = 'developer';
                showDeveloperDashboard();
            } else if (userData.jurusan && userData.profileCompleted) {
                currentJurusan = userData.jurusan;
                userClass = userData.class;
                userRole = 'student';
                showStudentDashboard();
            } else if (userData.jurusan) {
                currentJurusan = userData.jurusan;
                showProfileSetup();
            } else {
                showJurusanSelection();
            }
        }
    }
}

// Enhanced setupEventListeners function
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

// Enhanced handleEmailRegistration function
function handleEmailRegistration(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    const userClass = form.querySelector('#classSelect').value;
    
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
        class: userClass,
        role: 'student'
    };
    
    // Save user data
    saveUserData(currentUser.email, {
        ...currentUser,
        jurusan: currentJurusan,
        class: userClass,
        profileCompleted: false,
        registeredAt: new Date().toISOString(),
        role: 'student'
    });
    
    // Save user session
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Pendaftaran berhasil! Silakan lengkapi profil Anda.');
    showProfileSetup();
    
    // Reset form
    form.reset();
}

// Enhanced handleProfileSetup function
function handleProfileSetup(e) {
    e.preventDefault();
    const form = e.target;
    const bio = document.getElementById('userBio').value;
    const profession = document.getElementById('professionSelect').value;
    const interestField = document.getElementById('interestField');
    const interests = Array.from(interestField.selectedOptions).map(option => option.value);
    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
    
    // Update user data
    const userData = getUserData(currentUser.email);
    userData.bio = bio;
    userData.profession = profession;
    userData.interests = interests;
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

// Teacher Login Handler
function handleTeacherLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('#teacherEmail').value;
    const password = form.querySelector('#teacherPassword').value;
    
    if (teacherAccounts[email] && teacherAccounts[email].password === password) {
        currentUser = {
            id: 'teacher_' + email,
            name: teacherAccounts[email].name,
            email: email,
            picture: 'https://via.placeholder.com/150/667eea/ffffff?text=G',
            role: 'teacher'
        };
        
        // Save user session
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Save user data
        saveUserData(currentUser.email, {
            ...currentUser,
            profileCompleted: true,
            registeredAt: new Date().toISOString()
        });
        
        userRole = 'teacher';
        showTeacherDashboard();
    } else {
        alert('Login gagal. Periksa email dan password Anda.');
    }
}

// Developer Login Handler
function handleDeveloperLogin(e) {
    e.preventDefault();
    const form = e.target;
    const username = form.querySelector('#devUsername').value;
    const password = form.querySelector('#devPassword').value;
    
    if (developerAccounts[username] && developerAccounts[username].password === password) {
        currentUser = {
            id: 'dev_' + username,
            name: developerAccounts[username].name,
            email: username + '@dev.com',
            picture: 'https://via.placeholder.com/150/667eea/ffffff?text=D',
            role: 'developer'
        };
        
        // Save user session
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Save user data
        saveUserData(currentUser.email, {
            ...currentUser,
            profileCompleted: true,
            registeredAt: new Date().toISOString()
        });
        
        userRole = 'developer';
        showDeveloperDashboard();
    } else {
        alert('Login gagal. Periksa username dan password Anda.');
    }
}

// Teacher Dashboard Functions
function showTeacherDashboard() {
    showPage('teacherDashboard');
    showTeacherSection('overview');
}

function showTeacherSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Deactivate all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show target section
    document.getElementById('teacher' + capitalizeFirst(sectionId) + 'Section').classList.add('active');
    
    // Activate corresponding nav button
    document.querySelector(`.nav-btn[onclick="showTeacherSection('${sectionId}')"]`).classList.add('active');
    
    // Load section-specific content
    switch(sectionId) {
        case 'overview':
            loadTeacherOverview();
            break;
        case 'students':
            loadTeacherStudents();
            break;
        case 'materials':
            loadTeacherMaterials();
            break;
        case 'reports':
            loadTeacherReports();
            break;
    }
}

function loadTeacherOverview() {
    document.getElementById('teacherName').textContent = currentUser.name;
    
    // Load teacher stats
    const stats = getTeacherStats();
    document.getElementById('totalStudents').textContent = stats.totalStudents;
    document.getElementById('activeStudents').textContent = stats.activeStudents;
    document.getElementById('avgScore').textContent = stats.avgScore + '%';
    document.getElementById('todayActivity').textContent = stats.todayActivity;
    
    // Load class progress
    loadClassProgress();
    
    // Load recent activities
    loadRecentActivities();
}

function getTeacherStats() {
    // In real app, this would fetch from database
    return {
        totalStudents: 125,
        activeStudents: 89,
        avgScore: 76,
        todayActivity: 34
    };
}

function loadClassProgress() {
    const classes = ['X TJKT 1', 'X TJKT 2', 'X TJKT 3', 'XI TJKT 1', 'XI TJKT 2', 'XII TJKT 1', 'XII TJKT 2'];
    const progressHTML = classes.map(className => `
        <div class="class-progress-item">
            <span class="class-name">${className}</span>
            <div class="class-stats">
                <span>24 Siswa</span>
                <span>72% Progress</span>
                <span>78% Nilai</span>
            </div>
        </div>
    `).join('');
    
    document.getElementById('classProgress').innerHTML = progressHTML;
}

function loadRecentActivities() {
    const activities = [
        'Ahmad menyelesaikan materi hari 1 dengan nilai 85%',
        'Siti mengumpulkan problem solving challenge',
        'Budi aktif selama 5 hari berturut-turut',
        'Kelas X TJKT 1 mencapai progress 80%',
        'Rata-rata nilai quiz meningkat 5%'
    ];
    
    const activitiesHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">📚</div>
            <div class="activity-text">${activity}</div>
            <div class="activity-time">2 jam lalu</div>
        </div>
    `).join('');
    
    document.getElementById('teacherActivityFeed').innerHTML = activitiesHTML;
}

function loadTeacherStudents() {
    // Sample students data
    const students = [
        { name: 'Ahmad Wijaya', class: 'X TJKT 1', progress: 85, lastActive: '2 jam lalu' },
        { name: 'Siti Nurhaliza', class: 'X TJKT 1', progress: 92, lastActive: '1 jam lalu' },
        { name: 'Budi Santoso', class: 'X TJKT 2', progress: 78, lastActive: '5 jam lalu' },
        { name: 'Citra Dewi', class: 'X TJKT 2', progress: 88, lastActive: '3 jam lalu' },
        { name: 'Dodi Pratama', class: 'X TJKT 3', progress: 81, lastActive: '6 jam lalu' }
    ];
    
    const studentsHTML = students.map(student => `
        <div class="student-management-item">
            <div class="student-management-info">
                <img src="https://via.placeholder.com/40/667eea/ffffff?text=${student.name.charAt(0)}" alt="${student.name}">
                <div>
                    <div class="student-name">${student.name}</div>
                    <div class="student-details">${student.class} • ${student.progress}% Progress • Aktif: ${student.lastActive}</div>
                </div>
            </div>
            <div class="student-management-actions">
                <button class="management-btn edit">Edit</button>
                <button class="management-btn delete">Hapus</button>
            </div>
        </div>
    `).join('');
    
    document.getElementById('studentsManagement').innerHTML = studentsHTML;
}

function loadTeacherMaterials() {
    const materialsHTML = `
        <div class="materials-management">
            <div class="content-card">
                <h3>📚 Materi yang Tersedia</h3>
                <div class="materials-list">
                    ${Object.entries(tjktMaterials).map(([day, material]) => `
                        <div class="material-item">
                            <h4>Hari ${day.replace('day', '')}: ${material.title}</h4>
                            <p>${material.quiz.length} Soal • ${material.challenges.length} Challenge</p>
                            <div class="material-actions">
                                <button class="elegant-btn secondary" onclick="editMaterial('${day}')">Edit</button>
                                <button class="elegant-btn secondary" onclick="previewMaterial('${day}')">Preview</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="content-card">
                <h3>➕ Tambah Materi Baru</h3>
                <button class="elegant-btn">Buat Materi Baru</button>
            </div>
        </div>
    `;
    
    document.getElementById('materialsManagement').innerHTML = materialsHTML;
}

function loadTeacherReports() {
    const reportsHTML = `
        <div class="reports-management">
            <div class="content-card">
                <h3>📊 Laporan Progress</h3>
                <div class="reports-grid">
                    <div class="report-item">
                        <h4>Progress per Kelas</h4>
                        <button class="elegant-btn secondary">Generate Report</button>
                    </div>
                    <div class="report-item">
                        <h4>Nilai Quiz</h4>
                        <button class="elegant-btn secondary">Generate Report</button>
                    </div>
                    <div class="report-item">
                        <h4>Aktivitas Siswa</h4>
                        <button class="elegant-btn secondary">Generate Report</button>
                    </div>
                    <div class="report-item">
                        <h4>Problem Solving</h4>
                        <button class="elegant-btn secondary">Generate Report</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('reportsManagement').innerHTML = reportsHTML;
}

// Developer Dashboard Functions
function showDeveloperDashboard() {
    showPage('developerDashboard');
    showDeveloperSection('dashboard');
}

function showDeveloperSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Deactivate all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show target section
    document.getElementById('developer' + capitalizeFirst(sectionId) + 'Section').classList.add('active');
    
    // Activate corresponding nav button
    document.querySelector(`.nav-btn[onclick="showDeveloperSection('${sectionId}')"]`).classList.add('active');
    
    // Load section-specific content
    switch(sectionId) {
        case 'dashboard':
            loadDeveloperDashboard();
            break;
        case 'users':
            loadDeveloperUsers();
            break;
        case 'system':
            loadDeveloperSystem();
            break;
        case 'analytics':
            loadDeveloperAnalytics();
            break;
    }
}

function loadDeveloperDashboard() {
    document.getElementById('developerName').textContent = currentUser.name;
    
    // Load system stats
    const stats = getSystemStats();
    document.getElementById('totalUsers').textContent = stats.totalUsers;
    document.getElementById('activeSessions').textContent = stats.activeSessions;
    document.getElementById('storageUsed').textContent = stats.storageUsed;
    document.getElementById('systemLoad').textContent = stats.systemLoad + '%';
    
    // Load real-time metrics
    loadRealTimeMetrics();
}

function getSystemStats() {
    // In real app, this would fetch from server
    return {
        totalUsers: 156,
        activeSessions: 23,
        storageUsed: '245MB',
        systemLoad: 32
    };
}

function loadRealTimeMetrics() {
    const metrics = [
        { name: 'CPU Usage', value: 45, max: 100 },
        { name: 'Memory Usage', value: 68, max: 100 },
        { name: 'Disk I/O', value: 23, max: 100 },
        { name: 'Network Traffic', value: 56, max: 100 },
        { name: 'Database Connections', value: 12, max: 50 }
    ];
    
    const metricsHTML = metrics.map(metric => `
        <div class="metric-item">
            <div class="metric-header">
                <span class="metric-name">${metric.name}</span>
                <span class="metric-value">${metric.value}%</span>
            </div>
            <div class="metric-bar">
                <div class="metric-fill" style="width: ${metric.value}%"></div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('realTimeMetrics').innerHTML = metricsHTML;
}

function loadDeveloperUsers() {
    const users = [
        { name: 'Ahmad Wijaya', email: 'ahmad@student.com', role: 'Student', status: 'Active', lastLogin: '2 jam lalu' },
        { name: 'Guru TJKT', email: 'guru@tjkt.sch.id', role: 'Teacher', status: 'Active', lastLogin: '1 jam lalu' },
        { name: 'Fatkul Developer', email: 'fatkul.dev@dev.com', role: 'Developer', status: 'Active', lastLogin: '30 menit lalu' },
        { name: 'Siti Nurhaliza', email: 'siti@student.com', role: 'Student', status: 'Inactive', lastLogin: '2 hari lalu' }
    ];
    
    const usersHTML = users.map(user => `
        <div class="student-management-item">
            <div class="student-management-info">
                <img src="https://via.placeholder.com/40/667eea/ffffff?text=${user.name.charAt(0)}" alt="${user.name}">
                <div>
                    <div class="student-name">${user.name}</div>
                    <div class="student-details">${user.email} • ${user.role} • ${user.status} • Login: ${user.lastLogin}</div>
                </div>
            </div>
            <div class="student-management-actions">
                <button class="management-btn edit">Edit</button>
                <button class="management-btn delete">Reset</button>
            </div>
        </div>
    `).join('');
    
    document.getElementById('usersManagement').innerHTML = usersHTML;
}

function loadDeveloperSystem() {
    const systemConfigHTML = `
        <div class="system-config">
            <div class="config-item">
                <label class="config-label">System Name</label>
                <input type="text" class="config-input" value="E-Learning TJKT Platform" readonly>
                <div class="config-description">Nama sistem yang ditampilkan ke pengguna</div>
            </div>
            
            <div class="config-item">
                <label class="config-label">Maintenance Mode</label>
                <select class="config-input">
                    <option value="false">Disabled</option>
                    <option value="true">Enabled</option>
                </select>
                <div class="config-description">Aktifkan mode maintenance untuk update sistem</div>
            </div>
            
            <div class="config-item">
                <label class="config-label">Auto Backup</label>
                <select class="config-input">
                    <option value="daily">Daily</option>
                    <option value="weekly" selected>Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <div class="config-description">Frekuensi backup otomatis database</div>
            </div>
            
            <div class="config-item">
                <label class="config-label">Session Timeout</label>
                <input type="number" class="config-input" value="60" min="15" max="240">
                <div class="config-description">Waktu timeout session dalam menit</div>
            </div>
            
            <button class="elegant-btn" onclick="saveSystemConfig()">Save Configuration</button>
        </div>
    `;
    
    document.getElementById('systemConfig').innerHTML = systemConfigHTML;
}

function loadDeveloperAnalytics() {
    const analyticsHTML = `
        <div class="analytics-dashboard">
            <div class="analytics-chart">
                <h3>📈 User Activity Trends</h3>
                <div class="chart-placeholder" style="height: 250px; background: rgba(255,255,255,0.5); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #666;">
                    Chart: User Activity Over Time
                </div>
            </div>
            
            <div class="analytics-sidebar">
                <div class="content-card">
                    <h3>Top Performers</h3>
                    <div class="top-performers">
                        <div class="performer-item">
                            <span>Ahmad Wijaya</span>
                            <span>950 pts</span>
                        </div>
                        <div class="performer-item">
                            <span>Siti Nurhaliza</span>
                            <span>920 pts</span>
                        </div>
                        <div class="performer-item">
                            <span>Citra Dewi</span>
                            <span>890 pts</span>
                        </div>
                    </div>
                </div>
                
                <div class="content-card">
                    <h3>System Health</h3>
                    <div class="health-metrics">
                        <div class="health-item good">
                            <span>API Response</span>
                            <span>98%</span>
                        </div>
                        <div class="health-item good">
                            <span>Database</span>
                            <span>99.9%</span>
                        </div>
                        <div class="health-item warning">
                            <span>Cache</span>
                            <span>85%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('analyticsDashboard').innerHTML = analyticsHTML;
}

// Enhanced loadProfileSection function
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
        
        // Load interests
        const interestsHTML = (userData.interests || []).map(interest => 
            `<span class="interest-tag">${getInterestDisplayName(interest)}</span>`
        ).join('');
        document.getElementById('profileInterestsTags').innerHTML = interestsHTML;
        
        // Load skills
        const skillsHTML = (userData.skills || []).map(skill => 
            `<span class="skill-tag">${getSkillDisplayName(skill)}</span>`
        ).join('');
        document.getElementById('profileSkillsTags').innerHTML = skillsHTML;
        
        // Load achievements
        loadAchievements(progress);
    }
}

// Enhanced showProfileEditor function
function showProfileEditor() {
    const userData = getUserData(currentUser.email);
    const modal = document.getElementById('profileEditor');
    
    document.getElementById('profileEditPreview').src = currentUser.picture;
    document.getElementById('profileEditBio').value = userData.bio || '';
    document.getElementById('profileEditProfession').value = userData.profession || '';
    
    // Set interests
    const interestsSelect = document.getElementById('profileEditInterests');
    Array.from(interestsSelect.options).forEach(option => {
        option.selected = (userData.interests || []).includes(option.value);
    });
    
    // Check skills checkboxes
    document.querySelectorAll('input[name="edit_skills"]').forEach(checkbox => {
        checkbox.checked = (userData.skills || []).includes(checkbox.value);
    });
    
    modal.style.display = 'block';
}

// Enhanced handleProfileEdit function
function handleProfileEdit(e) {
    e.preventDefault();
    const bio = document.getElementById('profileEditBio').value;
    const profession = document.getElementById('profileEditProfession').value;
    const interestsSelect = document.getElementById('profileEditInterests');
    const interests = Array.from(interestsSelect.selectedOptions).map(option => option.value);
    const skills = Array.from(document.querySelectorAll('input[name="edit_skills"]:checked')).map(cb => cb.value);
    
    // Update user data
    const userData = getUserData(currentUser.email);
    userData.bio = bio;
    userData.profession = profession;
    userData.interests = interests;
    userData.skills = skills;
    
    saveUserData(currentUser.email, userData);
    
    // Update current user
    currentUser = { ...currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeProfileEditor();
    loadProfileSection();
    alert('Profil berhasil diperbarui!');
}

// Enhanced loadMaterialsSection function
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
    } else {
        document.getElementById('materialContent').innerHTML = `
            <div class="no-material">
                <h3>Materi Tidak Tersedia</h3>
                <p>Materi untuk hari ini sedang dalam pengembangan. Silakan check kembali besok.</p>
            </div>
        `;
    }
}

// Logout Function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        // Clear current session
        currentUser = null;
        currentJurusan = null;
        userRole = null;
        userClass = null;
        
        // Clear localStorage session (keep user data)
        localStorage.removeItem('currentUser');
        
        // Redirect to login page
        showPage('loginPage');
        
        alert('Anda telah berhasil logout.');
    }
}

// Utility Functions
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getInterestDisplayName(interest) {
    const interests = {
        'network_design': 'Desain Jaringan',
        'network_security': 'Keamanan Jaringan',
        'cloud_computing': 'Cloud Computing',
        'iot': 'Internet of Things',
        'cyber_security': 'Cyber Security',
        'data_analysis': 'Analisis Data',
        'web_development': 'Web Development',
        'mobile_development': 'Mobile Development'
    };
    return interests[interest] || interest;
}

// Developer Quick Actions
function backupSystem() {
    alert('System backup started...');
    // In real app, this would trigger backup process
}

function clearCache() {
    if (confirm('Clear all system cache?')) {
        alert('Cache cleared successfully');
    }
}

function generateReport() {
    alert('Generating system report...');
}

function systemDiagnostics() {
    alert('Running system diagnostics...');
}

function saveSystemConfig() {
    alert('System configuration saved!');
}

// Enhanced loadStudentData function
function loadStudentData() {
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userAvatar').src = currentUser.picture;
        document.getElementById('userJurusan').textContent = currentJurusan ? 'TJKT' : '';
        document.getElementById('userClass').textContent = getClassDisplayName(currentUser.class);
        document.getElementById('sidebarClassBadge').textContent = getClassDisplayName(currentUser.class);
        
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

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    setupEventListeners();
});
