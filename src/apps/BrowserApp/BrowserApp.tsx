import { useState } from 'react';
import './BrowserApp.css';

interface BrowserAppProps {
  windowId: string;
}

export function BrowserApp({ windowId: _windowId }: BrowserAppProps) {
  const [url] = useState('yusuf.dev');

  return (
    <div className="browser-app">
      <div className="browser-toolbar">
        <div className="browser-nav-buttons">
          <button className="browser-nav-btn" disabled>←</button>
          <button className="browser-nav-btn" disabled>→</button>
          <button className="browser-nav-btn">↻</button>
        </div>
        <div className="browser-url-bar">
          <span className="browser-url-icon">🔒</span>
          <span className="browser-url">{url}</span>
        </div>
      </div>
      <div className="browser-content">
        <div className="portfolio-page">
          <header className="portfolio-header">
            <h1>Hi, I'm <span className="highlight">Yusuf</span> 👋</h1>
            <p className="subtitle">Frontend Developer</p>
            <p className="location">📍 Antalya, Turkey</p>
          </header>

          <section className="portfolio-section">
            <h2>🧑‍💻 About Me</h2>
            <p>
              I'm a Frontend Developer based in Antalya, Turkey. Skilled in building interactive 
              web applications with TypeScript and React. Always learning and passionate about 
              delivering high-quality user experiences.
            </p>
            <p className="mt">
              Recently, I've also been exploring AI tools and integrating them into my development 
              process to stay ahead of the curve and enhance application functionality.
            </p>
          </section>

          <section className="portfolio-section">
            <h2>💼 Experience</h2>
            
            <div className="experience-item">
              <div className="exp-header">
                <div>
                  <h3>Frontend Developer</h3>
                  <span className="company">Teknodev</span>
                </div>
                <div className="exp-meta">
                  <span className="date">2024/08 – Present</span>
                  <span className="location-tag">Antalya, Turkey</span>
                </div>
              </div>
              <p>
                Worked on several web applications using React and TypeScript to build dynamic and 
                responsive user interfaces. Contributed to an ERP project for an elevator company 
                and a website builder application, focusing on enhancing user experience, performance, 
                and scalability. Developed reusable components, integrated APIs, and implemented 
                optimizations to improve application performance.
              </p>
            </div>

            <div className="experience-item">
              <div className="exp-header">
                <div>
                  <h3>Fullstack Developer Intern</h3>
                  <span className="company">Softalya Software Inc.</span>
                </div>
                <div className="exp-meta">
                  <span className="date">2024/02 – 2024/06</span>
                  <span className="location-tag">Antalya, Turkey</span>
                </div>
              </div>
              <p>
                Long-term compulsory internship during the last year of university. 
                Developed a Fullstack Food Ordering Application with React and Django.
              </p>
            </div>

            <div className="experience-item">
              <div className="exp-header">
                <div>
                  <h3>Frontend Developer Intern</h3>
                  <span className="company">Klonbits Information Solutions Inc.</span>
                </div>
                <div className="exp-meta">
                  <span className="date">2023/07 – 2023/08</span>
                  <span className="location-tag">Antalya, Turkey</span>
                </div>
              </div>
              <p>
                Completed compulsory internship during the 3rd year of university, 
                gaining hands-on experience in frontend development.
              </p>
            </div>
          </section>

          <section className="portfolio-section">
            <h2>🎓 Education</h2>
            <div className="education-item">
              <div className="exp-header">
                <div>
                  <h3>Management Information Systems</h3>
                  <span className="company">Antalya Belek University</span>
                </div>
                <div className="exp-meta">
                  <span className="date">Sep 2020 – Jun 2024</span>
                  <span className="location-tag">Antalya, Turkey</span>
                </div>
              </div>
              <p>
                Studied a blended curriculum including Information Technologies, Algorithm, 
                Web Programming, Accounting, and Database Management Systems. 
                Decided to specialize in Web Programming due to strong interest in the field.
              </p>
            </div>
          </section>

          <section className="portfolio-section">
            <h2>🚀 Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-header">
                  <h3>Tracklistd</h3>
                  <a href="https://tracklistd.com" target="_blank" rel="noopener noreferrer" className="project-link" title="Visit Tracklistd">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
                <p>
                  A Letterboxd-style web application for music. Users can log in, rate, 
                  review, and keep track of albums in a personalized collection.
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Tailwind CSS</span>
                  <span>Firebase</span>
                </div>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <h3>Blog App</h3>
                  <a href="https://github.com/yusufktlk/blogapp-fullstack" target="_blank" rel="noopener noreferrer" className="project-link" title="View on GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
                <p>
                  A fullstack blog application with user authentication, 
                  post creation, and commenting features.
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Django</span>
                </div>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <h3>Restaurant API</h3>
                  <a href="https://github.com/yusufktlk/restaurantapi" target="_blank" rel="noopener noreferrer" className="project-link" title="View on GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
                <p>
                  A comprehensive REST API for restaurant management 
                  with menu items, orders, and user management.
                </p>
                <div className="project-tech">
                  <span>Django</span>
                  <span>REST Framework</span>
                </div>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <h3>AnimeDB</h3>
                  <a href="https://github.com/yusufktlk/animedb-app" target="_blank" rel="noopener noreferrer" className="project-link" title="View on GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
                <p>
                  An anime database site using Jikan API. Browse current anime news, 
                  top anime and characters. Search for anime with dedicated pages for each.
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>API</span>
                </div>
              </div>
            </div>
          </section>

          <section className="portfolio-section">
            <h2>⚡ Skills</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h4>Frontend</h4>
                <div className="skills">
                  <span className="skill-tag">HTML</span>
                  <span className="skill-tag">CSS</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">React.js</span>
                  <span className="skill-tag">Next.js</span>
                  <span className="skill-tag">Tailwind CSS</span>
                  <span className="skill-tag">Vite.js</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Backend</h4>
                <div className="skills">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Django</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Tools</h4>
                <div className="skills">
                  <span className="skill-tag">Git</span>
                </div>
              </div>
            </div>
          </section>

          <section className="portfolio-section contact-section">
            <h2>📬 Contact</h2>
            <div className="contact-links">
              <a href="mailto:yusufkitlik@hotmail.com" className="contact-link">
                <span className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <span>Email</span>
              </a>
              <a href="https://www.linkedin.com/in/yusuf-kitlik/" target="_blank" rel="noopener noreferrer" className="contact-link linkedin">
                <span className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </span>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/yusufktlk" target="_blank" rel="noopener noreferrer" className="contact-link github">
                <span className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </span>
                <span>GitHub</span>
              </a>
            </div>
          </section>

          <footer className="portfolio-footer">
            <p>© 2024 Yusuf Kıtlık. Built with React & TypeScript</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
