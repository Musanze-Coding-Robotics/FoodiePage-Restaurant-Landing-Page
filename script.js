const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'login.html';
    });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        if (username) {
            localStorage.setItem('student', username);
            window.location.href = 'dashboard.html';
        }
    });
}

const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        if (!name || !email || !password || !confirm) {
            alert('Please fill in all fields.');
            return;
        }
        if (password !== confirm) {
            alert('Passwords do not match.');
            return;
        }
        localStorage.setItem('student', name);
        localStorage.setItem('studentEmail', email);
        window.location.href = 'dashboard.html';
    });
}

// Quiz functionality
function checkQuiz(quizId, correctAnswer, courseId) {
    const selected = document.querySelector(`input[name="${quizId}"]:checked`);
    const result = document.getElementById(`result-${quizId}`) || document.getElementById(`result-${courseId}`);
    if (selected) {
        if (selected.value === correctAnswer) {
            if (result) {
                result.textContent = 'Correct!';
                result.style.color = 'green';
            }
            updateProgress(courseId || quizId);
        } else {
            if (result) {
                result.textContent = 'Incorrect. Try again.';
                result.style.color = 'red';
            }
        }
    } else {
        if (result) {
            result.textContent = 'Please select an answer.';
            result.style.color = 'orange';
        }
    }
}

// Progress tracking
function updateProgress(quizId) {
    const quizToCourse = {
        quiz1: 'html',
        quiz2: 'css',
        quiz3: 'js',
        quiz4: 'python',
        quiz5: 'math',
        quiz6: 'physics',
        quiz7: 'chemistry',
        quiz8: 'biology',
        quiz9: 'economics',
        'quiz-html': 'html',
        'quiz-css': 'css',
        'quiz-js': 'js',
        'quiz-python': 'python',
        'quiz-sql': 'sql'
    };
    let progress = JSON.parse(localStorage.getItem('progress')) || {};
    const course = quizToCourse[quizId] || quizId;
    progress[course] = true;
    localStorage.setItem('progress', JSON.stringify(progress));
    displayProgress();
}

function displayProgress() {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    const courses = ['html', 'css', 'js', 'python', 'math', 'physics', 'chemistry', 'biology', 'economics'];
    const totalQuizzes = courses.length;
    const completed = courses.reduce((count, course) => count + (progress[course] ? 1 : 0), 0);
    const percentage = totalQuizzes ? (completed / totalQuizzes) * 100 : 0;

    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }

    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.textContent = `Progress: ${completed}/${totalQuizzes} (${percentage.toFixed(0)}%)`;
    }

    courses.forEach(course => {
        const courseProgress = document.getElementById(`${course}-progress`);
        if (courseProgress) {
            courseProgress.textContent = progress[course] ? '100%' : '0%';
        }
    });
}
// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDark);
    });

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
}

// Search functionality
const searchBar = document.getElementById('search-bar');
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.course-section, .course');
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            section.style.display = text.includes(query) ? '' : 'none';
        });
    });
}
// Load progress on dashboard
if (window.location.pathname.includes('dashboard.html')) {
    displayProgress();
    const student = localStorage.getItem('student');
    if (student) {
        const nameDisplay = document.getElementById('name-display');
        if (nameDisplay) nameDisplay.textContent = student;
        const roleDisplay = document.getElementById('role-display');
        if (roleDisplay) roleDisplay.textContent = 'Student';
    }
}