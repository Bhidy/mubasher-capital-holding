import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo">Mubasher Capital</div>
          <div className="nav-links">
            <Link href="#about" className="nav-link">About Us</Link>
            <Link href="#services" className="nav-link">Services</Link>
            <Link href="#insights" className="nav-link">Insights</Link>
            <Link href="#contact" className="nav-link">Contact</Link>
          </div>
          <button className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}>Client Portal</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-gradient"></div>
        <div className="container hero-content animate-fade-up">
          <h1 className="hero-title">
            Empowering Your <br />
            <span className="highlight">Financial Future</span>
          </h1>
          <p className="hero-description delay-100 animate-fade-up">
            Mubasher Capital Holding provides world-class investment strategies, corporate advisory, and wealth management solutions tailored for institutional and private clients globally.
          </p>
          <div className="hero-actions delay-200 animate-fade-up">
            <button className="btn-primary">Discover Our Services</button>
            <button className="btn-secondary">Get in Touch</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Premium Advisory Solutions</h2>
            <p className="section-subtitle">Delivering unparalleled expertise across multiple asset classes and global markets to secure and grow your capital.</p>
          </div>
          
          <div className="grid">
            <div className="card">
              <div className="card-icon">📈</div>
              <h3 className="card-title">Wealth Management</h3>
              <p className="card-description">Bespoke portfolio management tailored to your specific risk profile and long-term financial objectives.</p>
            </div>
            <div className="card delay-100">
              <div className="card-icon">🏢</div>
              <h3 className="card-title">Corporate Advisory</h3>
              <p className="card-description">Strategic guidance on mergers, acquisitions, restructuring, and capital raising for enterprises.</p>
            </div>
            <div className="card delay-200">
              <div className="card-icon">🌍</div>
              <h3 className="card-title">Global Markets</h3>
              <p className="card-description">Direct access to international equity, fixed income, and alternative investment opportunities.</p>
            </div>
            <div className="card">
              <div className="card-icon">🔐</div>
              <h3 className="card-title">Private Equity</h3>
              <p className="card-description">Exclusive access to high-growth private companies and specialized alternative investment funds.</p>
            </div>
            <div className="card delay-100">
              <div className="card-icon">📊</div>
              <h3 className="card-title">Research & Insights</h3>
              <p className="card-description">Data-driven macroeconomic analysis and proprietary market research to inform your decisions.</p>
            </div>
            <div className="card delay-200">
              <div className="card-icon">💼</div>
              <h3 className="card-title">Institutional Services</h3>
              <p className="card-description">Comprehensive execution, clearing, and prime brokerage services for institutional clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer section">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col" style={{ flex: 2 }}>
              <div className="logo" style={{ marginBottom: '1rem' }}>Mubasher Capital</div>
              <p className="card-description" style={{ maxWidth: '300px' }}>
                Leading the future of finance with integrity, innovation, and unwavering commitment to client success.
              </p>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li><Link href="#" className="footer-link">About Us</Link></li>
                <li><Link href="#" className="footer-link">Leadership</Link></li>
                <li><Link href="#" className="footer-link">Careers</Link></li>
                <li><Link href="#" className="footer-link">News & Press</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                <li><Link href="#" className="footer-link">Wealth Management</Link></li>
                <li><Link href="#" className="footer-link">Corporate Finance</Link></li>
                <li><Link href="#" className="footer-link">Asset Management</Link></li>
                <li><Link href="#" className="footer-link">Brokerage</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Contact</h4>
              <ul className="footer-links">
                <li><Link href="#" className="footer-link">Contact Us</Link></li>
                <li><Link href="#" className="footer-link">Global Offices</Link></li>
                <li><Link href="#" className="footer-link">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Mubasher Capital Holding. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
