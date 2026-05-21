document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. LOADING SCREEN
    ========================================= */
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500); // 1.5s loading simulation
    }

    /* =========================================
       2. NAVIGATION LAYERS
    ========================================= */
    const topNav = document.querySelector('.top-nav');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const overlayNav = document.querySelector('.overlay-nav');
    const closeOverlayBtn = document.querySelector('.close-overlay-btn');
    const overlayLinks = document.querySelectorAll('.overlay-link');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const desktopLinks = document.querySelectorAll('.nav-link');

    // Sticky Top Nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            topNav.classList.add('scrolled');
        } else {
            topNav.classList.remove('scrolled');
        }
    });

    // Toggle Overlay Nav
    const toggleOverlay = () => {
        overlayNav.classList.toggle('active');
        document.body.style.overflow = overlayNav.classList.contains('active') ? 'hidden' : '';
    };

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleOverlay);
    if (closeOverlayBtn) closeOverlayBtn.addEventListener('click', toggleOverlay);

    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlayNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* =========================================
       3. ACTIVE SECTION HIGHLIGHTING
    ========================================= */
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update Bottom Nav
        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (current && href.includes(current)) {
                item.classList.add('active');
            }
        });

        // Update Desktop Nav
        desktopLinks.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (current && href.includes(current)) {
                item.classList.add('active');
            }
        });

        // Update Overlay Nav
        overlayLinks.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (current && href.includes(current)) {
                item.classList.add('active');
            }
        });
    });

    /* =========================================
       4. SCROLL REVEAL ANIMATIONS
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       5. SERVICES MODAL POPUPS
    ========================================= */
    const servicesData = {
        'web': {
            title: 'Web Development',
            icon: 'bx-code-alt',
            description: 'Custom, high-performance web architectures tailored to your business needs. We focus on speed, security, and scalability.',
            benefits: [
                'SEO Optimized structure for better ranking',
                'Mobile-first responsive design',
                'Lightning-fast load times',
                'Secure and maintainable codebase'
            ],
            price: 'Starting from D4,500',
            time: '1 week',
            cta: 'https://wa.me/2203137203?text=Hi,%20I\'m%20interested%20in%20Web%20Development%20services.'
        },
        'app': {
            title: 'App Development',
            icon: 'bx-mobile-alt',
            description: 'Native-grade mobile experiences for iOS and Android. From simple utility apps to complex business ecosystems.',
            benefits: [
                'Smooth, intuitive user interfaces',
                'Cross-platform compatibility (iOS & Android)',
                'Offline functionality support',
                'Real-time data synchronization'
            ],
            price: 'Starting from D30,000',
            time: '4 weeks',
            cta: 'https://wa.me/2203137203?text=Hi,%20I\'m%20interested%20in%20App%20Development%20services.'
        },
        'ai': {
            title: 'AI Chatbots & Automation',
            icon: 'bx-bot',
            description: 'Harness the power of AI to automate your business processes and provide instant customer support.',
            benefits: [
                '24/7 Automated customer engagement',
                'Natural language understanding',
                'Lead generation and qualification',
                'Seamless CRM integration'
            ],
            price: 'Starting from D1,500',
            time: '1 week',
            cta: 'https://wa.me/2203137203?text=Hi,%20I\'m%20interested%20in%20AI%20Chatbot%20services.'
        }
    };

    const serviceModal = document.getElementById('serviceModal');
    const serviceModalBody = document.getElementById('serviceModalBody');
    const closeServiceModal = document.getElementById('closeServiceModal');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');

    const openServiceModal = (serviceId) => {
        const data = servicesData[serviceId];
        if (!data) return;

        serviceModalBody.innerHTML = `
            <div class="service-modal-header">
                <div class="service-icon"><i class='bx ${data.icon}'></i></div>
                <h2>${data.title}</h2>
            </div>
            <div class="service-modal-content">
                <p class="service-full-desc">${data.description}</p>
                
                <div class="service-details-grid">
                    <div class="detail-group">
                        <h3><i class='bx bx-check-double'></i> Key Benefits</h3>
                        <ul>
                            ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-meta">
                        <div class="meta-item">
                            <span class="meta-label">Investment</span>
                            <span class="meta-value">${data.price}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Timeline</span>
                            <span class="meta-value">${data.time}</span>
                        </div>
                    </div>
                </div>

                <div class="service-cta-wrapper">
                    <a href="${data.cta}" target="_blank" class="btn btn-primary lg-btn">
                        Get Started <i class='bx bxl-whatsapp'></i>
                    </a>
                </div>
            </div>
        `;

        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeService = () => {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceId = btn.getAttribute('data-service');
            openServiceModal(serviceId);
        });
    });

    if (closeServiceModal) {
        closeServiceModal.addEventListener('click', closeService);
    }

    if (serviceModal) {
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) closeService();
        });
    }

    /* =========================================
       6. TESTIMONIAL SLIDER WITH SWIPE
    ========================================= */
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.querySelector('.slider-dots');

    if (track && dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        let currentSlide = 0;
        const totalSlides = dots.length;

        const updateSlide = (index) => {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateSlide(index));
        });

        // Auto Scroll
        let autoSlide = setInterval(() => {
            updateSlide((currentSlide + 1) % totalSlides);
        }, 5000);

        // Swipe Functionality
        let startX = 0;
        let diffX = 0;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            clearInterval(autoSlide); // Pause auto
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            diffX = e.touches[0].clientX - startX;
        }, { passive: true });

        track.addEventListener('touchend', () => {
            if (Math.abs(diffX) > 50) {
                if (diffX > 0 && currentSlide > 0) {
                    updateSlide(currentSlide - 1); // Swipe Right
                } else if (diffX < 0 && currentSlide < totalSlides - 1) {
                    updateSlide(currentSlide + 1); // Swipe Left
                }
            }
            diffX = 0;
            autoSlide = setInterval(() => {
                updateSlide((currentSlide + 1) % totalSlides);
            }, 5000);
        }, { passive: true });
    }

    /* =========================================
       7. INITIALIZATION (DARK MODE DEFAULT)
    ========================================= */
    document.documentElement.setAttribute('data-theme', 'dark');

    /* =========================================
       8. DESIGN DETAIL MODAL & SLUGS
    ========================================= */
    const designsData = [
        {
            id: 'restaurant-1',
            title: 'Restaurant',
            category: 'Restaurant Design 1',
            description: 'A comprehensive and professional restaurant website designed for optimal user experience, featuring menu displays and service integration.',
            advantages: ['Dynamic Menu Display', 'Reservation Integration', 'Mobile Optimized UI'],
            image: './designs/business designs/image.png',
            link: 'https://franciscomanneh.github.io/restaurant_website1/'
        },
        {
            id: 'restaurant-2',
            title: 'Restaurant',
            category: 'Restaurant Design 2',
            description: 'A second professional restaurant concept focusing on a different visual aesthetic and user flow.',
            advantages: ['Elegant Dark Theme', 'Quick-Order Flow', 'High-Res Food Gallery'],
            image: './designs/business designs/image copy.png',
            link: 'https://franciscomanneh.github.io/resto-2/'
        },
        {
            id: 'restaurant-3',
            title: 'Restaurant',
            category: 'Restaurant Design 3',
            description: 'Advanced restaurant operations, including full-menu management, reservation systems, and real-time order tracking components.',
            advantages: ['Real-time Tracking', 'Admin Dashboard Mockup', 'Multi-payment Support'],
            image: './designs/business designs/image copy 2.png',
            link: 'https://franciscomanneh.github.io/resto-3/'
        },
        {
            id: 'shop-1',
            title: 'Shop',
            category: 'Shop Design 1',
            description: 'Modern shop interface with intuitive filtering and map integration.',
            advantages: ['Smart Product Filters', 'Wishlist Functionality', 'Streamlined Checkout'],
            image: './designs/business designs/image copy 3.png',
            link: 'https://franciscomanneh.github.io/shop-1/'
        },
        {
            id: 'shop-2',
            title: 'Shop',
            category: 'Shop Design 2',
            description: 'Modern shop interface with inventory management and customer profile integration.',
            advantages: ['Inventory Management', 'Customer Profiles', 'Discount Engine'],
            image: './designs/business designs/image copy 4.png',
            link: 'https://franciscomanneh.github.io/shop-2/'
        },
        {
            id: 'shop-3',
            title: 'Shop',
            category: 'Shop Design 3',
            description: 'Specialized electronics-focused shop grid with technical specification displays.',
            advantages: ['Electronics-focused Grid', 'Tech Specs Display', 'Vendor Portal UI'],
            image: './designs/business designs/image copy 5.png',
            link: 'https://franciscomanneh.github.io/stitch_techhub_electronics_shop--1-/'
        },
        {
            id: 'school-1',
            title: 'School',
            category: 'School Design 1',
            description: 'Modern school interface with student portal mockups and course management.',
            advantages: ['Student Portal Mockup', 'Course Management', 'Events Calendar'],
            image: './designs/business designs/image copy 6.png',
            link: 'https://franciscomanneh.github.io/school1/'
        },
        {
            id: 'school-2',
            title: 'School',
            category: 'School Design 2',
            description: 'Teacher-focused dashboards with grade tracking and interactive mapping.',
            advantages: ['Teacher Dashboards', 'Grade Tracking System', 'Interactive Map'],
            image: './designs/business designs/image copy 7.png',
            link: 'https://franciscomanneh.github.io/school2/'
        },
        {
            id: 'school-3',
            title: 'School',
            category: 'School Design 3',
            description: 'Comprehensive assignment workflow and parent notification center.',
            advantages: ['Assignment Workflow', 'Parent Notification Center', 'Video Lesson Portal'],
            image: './designs/business designs/image copy 8.png',
            link: 'https://franciscomanneh.github.io/school3/'
        },
        {
            id: 'agency-1',
            title: 'Agency',
            category: 'Agency Design 1',
            description: 'Minimalist portfolio design for creative agencies highlighting visual content and artistic projects.',
            advantages: ['Parallax Case Studies', 'Service Detail Modals', 'Dark Luxury Aesthetic'],
            image: './designs/business designs/image copy 9.png',
            link: 'https://franciscomanneh.github.io/agency1/'
        },
        {
            id: 'agency-2',
            title: 'Agency',
            category: 'Agency Design 2',
            description: 'Creative agency concept with video header integration and client testimonial sections.',
            advantages: ['Video Header Integration', 'Client Testimonial Grid', 'Micro-interactions'],
            image: './designs/business designs/image copy 10.png',
            link: 'https://franciscomanneh.github.io/agency2/'
        },
        {
            id: 'agency-3',
            title: 'Agency',
            category: 'Agency Design 3',
            description: 'Full studio presence featuring team showcase and career management interfaces.',
            advantages: ['Team Showcase Section', 'Career Page UI', 'Creative Blog Grid'],
            image: './designs/business designs/image copy 11.png',
            link: 'https://franciscomanneh.github.io/agency3/'
        }
    ];

    const designModal = document.getElementById('designModal');
    const designModalBody = document.getElementById('designModalBody');
    const designCards = document.querySelectorAll('.design-card');

    function openDesignDetail(id) {
        const data = designsData.find(d => d.id.trim() === id.trim());
        if (data && designModal && designModalBody) {
            const advantagesHtml = data.advantages ? data.advantages.map(adv => `
                <span><i class='bx bx-check'></i> ${adv}</span>
            `).join('') : `
                <span><i class='bx bx-check'></i> Responsive Design</span>
                <span><i class='bx bx-check'></i> Dark/Light Support</span>
                <span><i class='bx bx-check'></i> Optimized Assets</span>
            `;

            designModalBody.innerHTML = `
                <div class="design-detail-view">
                    <nav class="breadcrumb">
                        <a href="designs.html">Designs</a>
                        <i class='bx bx-chevron-right'></i>
                        <span>${data.category}</span>
                    </nav>
                    <div class="detail-header">
                        <span class="design-category">${data.category}</span>
                        <h2 class="design-title">${data.title}</h2>
                    </div>
                    <div class="detail-image">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <div class="detail-content">
                        <div class="detail-info">
                            <h3>Key Features & Value</h3>
                            <p>${data.description}</p>
                            <div class="detail-meta">
                                ${advantagesHtml}
                            </div>
                        </div>
                        <div class="detail-actions">
                            <a href="${data.link}" target="_blank" class="btn btn-primary">View Live Design</a>
                            <a href="mailto:franciscomanneh@gmail.com?subject=Inquiry about ${data.title} - ${data.category}" class="btn btn-outline">Email Inquiry</a>
                        </div>
                    </div>
                </div>
            `;
            designModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            window.location.hash = `design/${id}`;
        }
    }

    function closeDesignModal() {
        if (designModal) {
            designModal.classList.remove('active');
            document.body.style.overflow = '';
            history.pushState(null, null, window.location.pathname + window.location.search);
        }
    }

    if (designCards) {
        designCards.forEach((card) => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                if (id) {
                    openDesignDetail(id);
                }
            });
        });
    }

    // Handle Hash on Load
    if (window.location.hash.startsWith('#design/')) {
        const id = window.location.hash.replace('#design/', '');
        setTimeout(() => openDesignDetail(id), 500);
    }

    // Global Modal Close Fix
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            closeDesignModal();
            const serviceModal = document.getElementById('serviceModal');
            if (serviceModal) {
                serviceModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === designModal) closeDesignModal();
    });

    /* =========================================
       FEATURED PROJECT INTERACTIONS
    ========================================= */
    const likeBtn = document.getElementById('likeProjectBtn');
    const likeIcon = document.getElementById('likeIcon');
    const likeCountDisplay = document.getElementById('likeCountDisplay');
    const reviewInput = document.getElementById('reviewInput');
    const submitReviewBtn = document.getElementById('submitReviewBtn');
    const reviewsList = document.getElementById('reviewsList');
    const subscribeBtn = document.getElementById('subscribeBtn');

    // Initial States
    let currentLikes = parseInt(localStorage.getItem('ndugama_likes')) || 300;
    let hasLiked = localStorage.getItem('ndugama_has_liked') === 'true';
    let reviews = JSON.parse(localStorage.getItem('ndugama_reviews')) || [];

    // Update UI on load
    likeCountDisplay.textContent = currentLikes;
    if (hasLiked) {
        likeBtn.classList.add('liked');
        likeIcon.classList.replace('bx-heart', 'bxs-heart');
    }
    renderReviews();

    // Like Logic
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            if (!hasLiked) {
                currentLikes++;
                hasLiked = true;
                likeBtn.classList.add('liked');
                likeIcon.classList.replace('bx-heart', 'bxs-heart');
                localStorage.setItem('ndugama_likes', currentLikes);
                localStorage.setItem('ndugama_has_liked', 'true');
                likeCountDisplay.textContent = currentLikes;
            } else {
                currentLikes--;
                hasLiked = false;
                likeBtn.classList.remove('liked');
                likeIcon.classList.replace('bxs-heart', 'bx-heart');
                localStorage.setItem('ndugama_likes', currentLikes);
                localStorage.setItem('ndugama_has_liked', 'false');
                likeCountDisplay.textContent = currentLikes;
            }
        });
    }

    // Review Logic
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', () => {
            const text = reviewInput.value.trim();
            if (text) {
                const newReview = {
                    id: Date.now(),
                    text: text
                };

                // Add to start (latest first)
                reviews.unshift(newReview);

                // Keep only top 10
                if (reviews.length > 10) {
                    reviews.pop();
                }

                localStorage.setItem('ndugama_reviews', JSON.stringify(reviews));
                renderReviews();
                reviewInput.value = '';
            }
        });

        reviewInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') submitReviewBtn.click();
        });
    }

    function renderReviews() {
        if (!reviewsList) return;
        
        if (reviews.length === 0) {
            reviewsList.innerHTML = '<div class="empty-reviews">Be the first to leave a review!</div>';
            return;
        }

        reviewsList.innerHTML = reviews.map(rev => `
            <div class="review-item">
                <p class="review-text">${rev.text}</p>
            </div>
        `).join('');
    }

    // Subscribe Logic
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            alert('Thank you for subscribing! We will notify you at your contact email as soon as NdugaMa launches.');
            subscribeBtn.textContent = 'Subscribed!';
            subscribeBtn.disabled = true;
            subscribeBtn.style.opacity = '0.7';
        });
    }
});
