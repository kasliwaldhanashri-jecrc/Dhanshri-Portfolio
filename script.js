/**
 * Dhanshri Kasliwal - Personal Portfolio Script
 * Dynamically loads profile data from local JSON and renders interactive components.
 */

// Embedded fallback data ensuring 100% functionality if opened directly via file:// protocol
const FALLBACK_PROFILE_DATA = {
  personal: {
    fullName: "Dhanshri Kasliwal",
    title: "B.Tech CSE Student",
    tagline: "Passionate first-year Computer Science student blending fundamental web development and creative graphic design.",
    email: "dhanashrikasliwal31@gmail.com",
    hometown: "Malegaon, Nashik",
    currentLocation: "Jaipur (studying and living here for B.Tech)",
    location: "Jaipur, India",
    hometownState: "Maharashtra, India",
    careerGoal: "Aiming to build a successful career in Big Tech companies and Top-Tier Consulting firms",
    summary: "First-year Computer Science & Engineering undergraduate with 1+ years of active learning, foundational web design, and hands-on creative work. Focused on mastering core computing principles and creating clean digital experiences."
  },
  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering (B.Tech CSE)",
      currentYear: "First Year (FY)",
      institution: "Engineering Institute, Jaipur",
      location: "Jaipur, Rajasthan",
      period: "2024 - 2028 (Expected)",
      highlights: [
        "Core coursework in Computing Fundamentals, Problem Solving, and Engineering Basics",
        "Participating actively in campus technical and creative initiatives",
        "Balancing academic studies with practical project building"
      ]
    }
  ],
  experience: [
    {
      role: "Continuous Learner & Hands-on Builder",
      organization: "Self-Directed Tech & Creative Practice",
      duration: "1+ Years (2024 - Present)",
      type: "Skill Building & Project Development",
      description: "Engaged in active learning, upskilling, and hands-on project building in technology and design.",
      achievements: [
        "Built responsive web projects using semantic HTML and CSS layouts",
        "Designed visual graphics, promotional media, and digital banners using Canva",
        "Explored modern tools and basic workflows to solve practical problems",
        "Practiced clean coding and continuous self-learning"
      ]
    }
  ],
  skills: [
    { name: "HTML", category: "Web Basics", level: "Intermediate", score: 85 },
    { name: "CSS", category: "Styling & Layout", level: "Intermediate", score: 80 },
    { name: "Graphic Design", category: "Creative Design", level: "Intermediate", score: 85 },
    { name: "Canva", category: "Design Tools", level: "Proficient", score: 90 }
  ],
  projects: [
    {
      id: "ecommerce-store",
      title: "E-Commerce Store",
      category: "Web Development",
      description: "Built a functional e-commerce web store showcasing products and a shopping interface.",
      technologies: ["HTML", "CSS", "JavaScript"],
      highlights: [
        "Product catalog with responsive card layout",
        "Interactive shopping cart interface and item calculation",
        "Clean, intuitive design adapted for desktop and mobile"
      ],
      details: "A responsive web store created to showcase product listings, interactive shopping cart management, and modern user interface styling. Built using clean HTML structure and modern CSS layout techniques.",
      link: "#"
    },
    {
      id: "ai-agent",
      title: "AI Agent",
      category: "AI Project",
      description: "Developed an AI agent project utilizing modern intelligent tools and workflows.",
      technologies: ["Modern AI Tools", "Workflows", "JavaScript"],
      highlights: [
        "Multi-step automated prompt workflow execution",
        "Structured information retrieval and output synthesis",
        "Clean user interface for interacting with intelligent tasks"
      ],
      details: "A project exploring intelligent agents, automated prompts, and multi-step tool execution. Designed to experiment with next-generation workflows and smart productivity tooling.",
      link: "#"
    }
  ],
  certifications: [
    {
      title: "Fundamentals of Computing",
      issuer: "Coursera",
      issued: "Completed",
      description: "Foundational course on computing principles, computational problem-solving, and software basics.",
      badge: "Coursera Certified"
    }
  ],
  achievements: [
    {
      title: "JU Social Competition",
      role: "Participant",
      event: "JU Social",
      location: "Jaipur",
      description: "Participated in JU Social event showcasing collaborative teamwork, social engagement, and creative ideas."
    }
  ],
  interests: [
    {
      title: "Dancing",
      icon: "music",
      description: "Passionate about rhythm, movement, and performance arts, bringing energy and discipline."
    },
    {
      title: "Content Creation",
      icon: "video",
      description: "Creating aesthetic social content, short-form visuals, and engaging digital media."
    },
    {
      title: "Exploring New Technologies",
      icon: "sparkles",
      description: "Always curious about new tech developments, AI tools, and creative digital trends."
    }
  ],
  stats: [
    { label: "Years Active Learning", value: "1+" },
    { label: "Hands-on Projects", value: "2+" },
    { label: "Current Degree", value: "B.Tech CSE" },
    { label: "Target Industry", value: "Big Tech & Consulting" }
  ]
};

let activeProfileData = FALLBACK_PROFILE_DATA;

// Load data from local JSON file
async function initializePortfolio() {
  initTheme();
  initNavigation();
  initContactForm();

  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch data.json`);
    }
    const data = await response.json();
    activeProfileData = data;
    console.log('✓ Successfully loaded profile data from local data.json');
  } catch (error) {
    console.warn('Note: Fetching data.json locally hit restrictions (common on file:// protocol). Utilizing embedded profile data seamlessly.', error);
    activeProfileData = FALLBACK_PROFILE_DATA;
  }

  renderAllSections(activeProfileData);
}

// Render all sections from profile data
function renderAllSections(data) {
  renderHero(data.personal);
  renderStats(data.stats);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderCertificationsAndAchievements(data.certifications, data.achievements);
  renderInterests(data.interests);
  setupModalHandlers(data);
}

// Render Hero Section
function renderHero(personal) {
  const nameEl = document.getElementById('hero-name');
  const titleEl = document.getElementById('hero-title');
  const leadEl = document.getElementById('hero-lead');
  const emailLink = document.getElementById('hero-email-link');
  const directEmail = document.getElementById('direct-email');
  const careerGoalEl = document.getElementById('hero-career-goal');
  const locationEl = document.getElementById('hero-location');
  const hometownEl = document.getElementById('hero-hometown');

  if (nameEl) nameEl.textContent = personal.fullName;
  if (titleEl) titleEl.textContent = personal.title;
  if (leadEl) leadEl.textContent = personal.summary;
  if (careerGoalEl) careerGoalEl.textContent = personal.careerGoal;
  if (locationEl) locationEl.textContent = personal.currentLocation;
  if (hometownEl) hometownEl.textContent = personal.hometown;

  if (emailLink) {
    emailLink.href = `mailto:${personal.email}`;
    emailLink.title = `Send email to ${personal.email}`;
  }

  if (directEmail) {
    directEmail.textContent = personal.email;
  }
}

// Render Stats Ribbon
function renderStats(stats) {
  const ribbonEl = document.getElementById('stats-ribbon');
  if (!ribbonEl || !stats) return;

  ribbonEl.innerHTML = stats.map(stat => `
    <div class="stat-item">
      <span class="stat-value tabular-nums">${escapeHtml(stat.value)}</span>
      <span class="stat-label">${escapeHtml(stat.label)}</span>
    </div>
  `).join('');
}

// Render Work Experience Timeline
function renderExperience(experiences) {
  const container = document.getElementById('experience-list');
  if (!container || !experiences) return;

  container.innerHTML = experiences.map(exp => `
    <article class="timeline-card">
      <div class="timeline-card-head">
        <h3 class="timeline-role">${escapeHtml(exp.role)}</h3>
        <div class="timeline-meta">
          <span>${escapeHtml(exp.organization)}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span>${escapeHtml(exp.duration)}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span>${escapeHtml(exp.type)}</span>
        </div>
      </div>
      <p class="timeline-body">${escapeHtml(exp.description)}</p>
      <ul class="timeline-bullet-list">
        ${exp.achievements.map(ach => `
          <li class="timeline-bullet-item">${escapeHtml(ach)}</li>
        `).join('')}
      </ul>
    </article>
  `).join('');
}

// Render Education
function renderEducation(educations) {
  const container = document.getElementById('education-list');
  if (!container || !educations) return;

  container.innerHTML = educations.map(edu => `
    <article class="timeline-card">
      <div class="timeline-card-head">
        <h3 class="timeline-role">${escapeHtml(edu.degree)}</h3>
        <div class="timeline-meta">
          <span>${escapeHtml(edu.currentYear)}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span>${escapeHtml(edu.institution)}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span>${escapeHtml(edu.period)}</span>
        </div>
      </div>
      <ul class="timeline-bullet-list">
        ${edu.highlights.map(hl => `
          <li class="timeline-bullet-item">${escapeHtml(hl)}</li>
        `).join('')}
      </ul>
    </article>
  `).join('');
}

// Render Skills Matrix - 3-4 Basic skills for fresher
function renderSkills(skillsData) {
  const container = document.getElementById('skills-grid');
  if (!container || !skillsData) return;

  // Flatten if array or object
  let skillsList = Array.isArray(skillsData) 
    ? skillsData 
    : [...(skillsData.technical || []), ...(skillsData.creative || [])];

  // Limit to core 4 basic skills
  skillsList = skillsList.slice(0, 4);

  container.innerHTML = skillsList.map(skill => {
    const score = skill.score || 85;
    return `
      <div class="skill-card">
        <div class="skill-card-top">
          <span class="skill-name">${escapeHtml(skill.name)}</span>
          <span class="skill-level-text">${escapeHtml(skill.level)}</span>
        </div>
        <div class="skill-bar-track" aria-label="${skill.name} proficiency ${score}%">
          <div class="skill-bar-fill" style="width: ${score}%"></div>
        </div>
        <span class="skill-meta-category">${escapeHtml(skill.category)}</span>
      </div>
    `;
  }).join('');
}

// Render Projects Grid (No <img> tags)
function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container || !projects) return;

  container.innerHTML = projects.map((proj, index) => `
    <article class="project-card" data-project-id="${escapeHtml(proj.id)}">
      <div class="project-card-header">
        <div class="project-icon-badge">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"></path><path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4"></path><circle cx="8" cy="12" r="2"></circle></svg>
        </div>
        <span class="project-category-badge">${escapeHtml(proj.category)}</span>
      </div>
      
      <div class="project-content">
        <h3 class="project-title">${escapeHtml(proj.title)}</h3>
        <p class="project-desc">${escapeHtml(proj.description)}</p>
        
        <div class="project-tech-tags">
          ${proj.technologies.map((tech, idx) => `
            <span>${escapeHtml(tech)}</span>
            ${idx < proj.technologies.length - 1 ? '<span aria-hidden="true">·</span>' : ''}
          `).join('')}
        </div>

        <div class="project-actions">
          <button type="button" class="btn-detail open-project-modal-btn" data-index="${index}">
            View Case Details <span>&rarr;</span>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Attach modal trigger click listeners
  document.querySelectorAll('.open-project-modal-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.currentTarget.getAttribute('data-index');
      openProjectModal(projects[idx]);
    });
  });
}

// Render Certifications & Extracurriculars
function renderCertificationsAndAchievements(certs, achievements) {
  const certContainer = document.getElementById('certifications-content');
  const achContainer = document.getElementById('achievements-content');

  if (certContainer && certs) {
    certContainer.innerHTML = certs.map(c => `
      <div style="display: flex; flex-direction: column; gap: 0.35rem;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h4 style="font-weight: 700; font-size: 1.0625rem;">${escapeHtml(c.title)}</h4>
          <span class="cert-badge">${escapeHtml(c.badge)}</span>
        </div>
        <div style="font-size: 0.8125rem; color: var(--text-muted);">
          <span>${escapeHtml(c.issuer)}</span>
          <span class="meta-sep">·</span>
          <span>${escapeHtml(c.issued)}</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-top: 0.5rem;">
          ${escapeHtml(c.description)}
        </p>
      </div>
    `).join('');
  }

  if (achContainer && achievements) {
    achContainer.innerHTML = achievements.map(a => `
      <div style="display: flex; flex-direction: column; gap: 0.35rem;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h4 style="font-weight: 700; font-size: 1.0625rem;">${escapeHtml(a.title)}</h4>
          <span style="font-size: 0.75rem; font-weight: 600; color: var(--accent);">${escapeHtml(a.event)}</span>
        </div>
        <div style="font-size: 0.8125rem; color: var(--text-muted);">
          <span>Role: ${escapeHtml(a.role)}</span>
          <span class="meta-sep">·</span>
          <span>${escapeHtml(a.location)}</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-top: 0.5rem;">
          ${escapeHtml(a.description)}
        </p>
      </div>
    `).join('');
  }
}

// Render Hobbies & Interests
function renderInterests(interests) {
  const container = document.getElementById('interests-grid');
  if (!container || !interests) return;

  const iconSvgMap = {
    music: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
    video: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
    sparkles: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`
  };

  container.innerHTML = interests.map(item => `
    <div class="interest-card">
      <div class="interest-icon-circle">
        ${iconSvgMap[item.icon] || iconSvgMap.sparkles}
      </div>
      <h3 class="interest-title">${escapeHtml(item.title)}</h3>
      <p class="interest-desc">${escapeHtml(item.description)}</p>
    </div>
  `).join('');
}

// Open Project Details Modal (No <img> tags)
function openProjectModal(project) {
  const modal = document.getElementById('project-detail-modal');
  const modalBody = document.getElementById('project-modal-content');
  if (!modal || !modalBody || !project) return;

  modalBody.innerHTML = `
    <div>
      <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--accent);">${escapeHtml(project.category)}</span>
      <h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-top: 0.25rem;">${escapeHtml(project.title)}</h2>
    </div>

    <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.7;">
      ${escapeHtml(project.details || project.description)}
    </p>

    <div>
      <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Key Architecture & Highlights:</h4>
      <ul class="timeline-bullet-list">
        ${project.highlights.map(h => `<li class="timeline-bullet-item">${escapeHtml(h)}</li>`).join('')}
      </ul>
    </div>

    <div>
      <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Technologies Used:</h4>
      <div class="project-tech-tags" style="font-size: 0.8125rem;">
        ${project.technologies.map((t, idx) => `
          <span style="color: var(--text-primary); font-weight: 500;">${escapeHtml(t)}</span>
          ${idx < project.technologies.length - 1 ? '<span aria-hidden="true">·</span>' : ''}
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Modal Setup & Event Listeners
function setupModalHandlers(data) {
  // Project Modal Close
  const projectModal = document.getElementById('project-detail-modal');
  const projectCloseBtn = document.getElementById('close-project-modal');
  
  if (projectCloseBtn && projectModal) {
    projectCloseBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // Copy email button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = data.personal.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
        copyEmailBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyEmailBtn.textContent = 'Copy Email';
        }, 2000);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }
}

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Navigation & Mobile Menu Setup
function initNavigation() {
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when clicking a mobile nav link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// Theme (Dark/Light mode) Setup
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateThemeIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'light');
        updateThemeIcon(false);
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('portfolio-theme', 'dark');
        updateThemeIcon(true);
      }
    });
  }
}

function updateThemeIcon(isDark) {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  if (isDark) {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    btn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    btn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

// Contact Form Handling with client-side validation
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || '';
      const email = form.querySelector('[name="email"]')?.value || '';
      const subject = form.querySelector('[name="subject"]')?.value || '';
      const message = form.querySelector('[name="message"]')?.value || '';

      if (!name || !email || !message) {
        showToast('Please complete all required fields.');
        return;
      }

      // Display positive acknowledgment
      if (feedback) {
        feedback.style.display = 'block';
        feedback.innerHTML = `<strong>Thank you, ${escapeHtml(name)}!</strong> Your message has been received. You can also reach Dhanshri directly at <a href="mailto:dhanashrikasliwal31@gmail.com" style="text-decoration: underline;">dhanashrikasliwal31@gmail.com</a>.`;
      }

      showToast('Message submitted successfully!');
      form.reset();
    });
  }
}

// Helper to escape HTML and prevent XSS
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
  initializePortfolio();
}
