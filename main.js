document.addEventListener('DOMContentLoaded', () => {
    // --- THEME SWITCHER --- //
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const html = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Check for saved theme in localStorage or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            applyTheme(isDark ? 'light' : 'dark');
        });
    });
    
    // --- MOBILE MENU --- //
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- PAGE-SPECIFIC INITIALIZATIONS --- //
    const page = window.location.pathname.split('/').pop();

    if (page === 'index.html' || page === '') {
        // --- ALERTS --- //
        // Example alerts. In a real app, this might come from an API.
        // window.uiModule.renderAlert('lockdown', 'Lockdown – The campus is on Lockdown. Initiate Lockdown procedures and WAIT for the All Clear.');
        // window.uiModule.renderAlert('maintenance', 'Website Down - Scheduled Website Maintenance');

        // --- QUOTE --- //
        const randomQuote = window.quotes[Math.floor(Math.random() * window.quotes.length)];
        window.uiModule.renderQuote(randomQuote);

        // --- INITIALIZE MODULES --- //
        if (window.countdownModule) {
            window.countdownModule.init();
        }
        if (window.weatherModule) {
            window.weatherModule.init();
        }
    }
});