// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openMobileMenu() {
    if (mobileDrawer) {
        mobileDrawer.classList.add('active');
    }
}

function closeMobileMenu() {
    if (mobileDrawer) {
        mobileDrawer.classList.remove('active');
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}
if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMobileMenu);
}
if (drawerClose) {
    drawerClose.addEventListener('click', closeMobileMenu);
}

// Desktop Dropdown Toggle
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
});

// Mobile Drawer Dropdown Toggle
const drawerDropdowns = document.querySelectorAll('.drawer-dropdown');

drawerDropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.drawer-dropdown-btn');
    
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
    }
});

// Smooth scrolling for anchor links - Using event delegation
document.addEventListener('click', (e) => {
    const link = e.target.closest('a.scroll-link');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Check if it's an anchor link
    if (!href || !href.startsWith('#')) {
        return;
    }
    
    e.preventDefault();
    
    const targetId = href.substring(1); // Remove the # symbol
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        // Small delay to ensure smooth scroll
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        
        // Update active state on links
        document.querySelectorAll('a.scroll-link').forEach(l => {
            l.classList.remove('active');
        });
        
        document.querySelectorAll('.sidebar-link').forEach(l => {
            l.classList.remove('active');
        });
        
        // Mark current link as active
        link.classList.add('active');
        
        // Also mark corresponding sidebar link
        document.querySelectorAll('.sidebar-link').forEach(sidebarLink => {
            if (sidebarLink.getAttribute('href') === href) {
                sidebarLink.classList.add('active');
            }
        });
        
        // Close mobile drawer
        closeMobileMenu();
    } else {
        console.warn(`Section with id "${targetId}" not found`);
    }
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Update all links
    document.querySelectorAll('a.scroll-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Close drawer when clicking on a regular drawer link (Home, Registration, etc.)
const regularDrawerLinks = document.querySelectorAll('.drawer-nav a.drawer-link:not(.drawer-dropdown-btn)');
if (regularDrawerLinks.length > 0) {
    regularDrawerLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}
