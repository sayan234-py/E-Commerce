import React, { useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="dashboard-root">

      {/* Main */}
      <main className="content">
        <section className="top-grid">
          <div className="card reveal glow">
            <h4>AI Insights</h4><br/>
            <p>Your transaction volume increased by <b>8%</b> since last month</p>
          </div>

          <div className="card reveal glow">
            <h4>Balance Overview</h4>
            <h2>₹860,017</h2>
            <span className="positive">▲ 12% from last month</span>
            <div className="chart-placeholder neon-line" />
          </div>

          <div className="card reveal glow">
            <h4>Earnings</h4>
            <h2>₹10,66,017</h2>
            <div className="progress">
              <div className="progress-fill neon-fill" />
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="card large reveal glow">
            <h3>Transactions</h3>
            <ul>
              <li>WOMEN <span>₹ +19670.00 <b>▲</b></span></li>
              <li>MEN <span>₹ +14300.00 <b>▲</b></span></li>
              <li>KIDS <span>₹ +10530.00 <b>▲</b></span></li>
            </ul>
          </div>

          <div className="card large reveal">
  <h4>Cash Inflows</h4>
  <h2>₹700,448</h2>

  <div className="spending-graph">
  <svg viewBox="0 0 300 120" preserveAspectRatio="none">
    <defs>
      <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
    
    <polyline
      points="0,120 0,90 40,70 80,75 120,50 160,65 200,35 240,45 280,30 300,120"
      className="spending-area"
    />
    <polyline
      points="0,90 40,70 80,75 120,50 160,65 200,35 240,45 280,30"
      className="spending-line"
    />
  </svg>
</div>
</div>

        </section>
      </main>
    </div>
  );
};

export default Dashboard;
