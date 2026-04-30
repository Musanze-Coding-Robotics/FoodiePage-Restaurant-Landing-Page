// Simple login simulation (for demo)
document.getElementById('login-btn').addEventListener('click', function() {
    const username = prompt('Enter username:');
    if (username) {
        localStorage.setItem('student', username);
        alert('Logged in as ' + username);
        window.location.href = 'dashboard.html';
    }
});

// Quiz functionality
function checkQuiz(quizId, correctAnswer) {
    const selected = document.querySelector(`input[name="${quizId}"]:checked`);
    const result = document.getElementById(`result-${quizId}`);
    if (selected) {
        if (selected.value === correctAnswer) {
            result.textContent = 'Correct!';
            result.style.color = 'green';
            updateProgress(quizId);
        } else {
            result.textContent = 'Incorrect. Try again.';
            result.style.color = 'red';
        }
    } else {
        result.textContent = 'Please select an answer.';
        result.style.color = 'orange';
    }
}

// Progress tracking
function updateProgress(quizId) {
    let progress = JSON.parse(localStorage.getItem('progress')) || {};
    progress[quizId] = true;
    localStorage.setItem('progress', JSON.stringify(progress));
    displayProgress();
}

function displayProgress() {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    const totalQuizzes = 3; // Assuming 3 quizzes for demo
    const completed = Object.keys(progress).length;
    const percentage = (completed / totalQuizzes) * 100;

    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }

    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.textContent = `Completed: ${completed}/${totalQuizzes} (${percentage.toFixed(0)}%)`;
    }
}

// Load progress on dashboard
if (window.location.pathname.includes('dashboard.html')) {
    displayProgress();
}