/* Theme controller - handles light/dark mode */
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeBtn.querySelector('.theme-icon');
    
    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    let currentTheme = 'light';
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        currentTheme = 'dark';
    }
    
    setTheme(currentTheme);
    
    // Toggle theme on button click
    themeBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon based on theme
        if (theme === 'dark') {
            themeIcon.textContent = '☀️'; // Sun icon for switching to light mode
            themeBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.textContent = '🌙'; // Moon icon for switching to dark mode
            themeBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
});
