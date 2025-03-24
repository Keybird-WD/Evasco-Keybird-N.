import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [activePeriod, setActivePeriod] = useState('Week');
  const [activeTab, setActiveTab] = useState('Objects');
  const navigate = useNavigate();

  // Enhanced chart data points with both income and expense values
  const chartPoints = [
    { month: 'Jun', income: 200, expense: 150 },
    { month: 'Jul', income: 300, expense: 220 },
    { month: 'Aug', income: 280, expense: 240 },
    { month: 'Sep', income: 450, expense: 300 },
    { month: 'Oct', income: 400, expense: 350 },
    { month: 'Nov', income: 350, expense: 280 },
    { month: 'Dec', income: 300, expense: 250 },
    { month: 'Jan', income: 320, expense: 260 }
  ];

  // Generate SVG path from data points
  const generatePath = (data, valueKey) => {
    const maxValue = Math.max(...data.map(point => point[valueKey]));
    const width = 800;
    const height = 200;
    
    // Scale points to fit the SVG viewBox
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * width;
      // Invert Y axis for SVG (0 is top in SVG)
      const y = height - (point[valueKey] / maxValue * height * 0.8) + 20;
      return { x, y };
    });
    
    // Generate SVG path string
    const pathData = points.reduce((path, point, index) => {
      if (index === 0) {
        return `M${point.x},${point.y}`;
      }
      // Using curves for a smoother line
      const prevPoint = points[index - 1];
      const cpx1 = prevPoint.x + (point.x - prevPoint.x) / 3;
      const cpx2 = point.x - (point.x - prevPoint.x) / 3;
      return `${path} C${cpx1},${prevPoint.y} ${cpx2},${point.y} ${point.x},${point.y}`;
    }, '');
    
    return pathData;
  };

  // Find the point with maximum income for dot placement
  const getMaxIncomePoint = () => {
    const maxIncomePoint = chartPoints.reduce((max, point) => 
      point.income > max.income ? point : max, chartPoints[0]);
    const index = chartPoints.indexOf(maxIncomePoint);
    const maxValue = Math.max(...chartPoints.map(point => point.income));
    
    const x = (index / (chartPoints.length - 1)) * 800;
    const y = 200 - (maxIncomePoint.income / maxValue * 200 * 0.8) + 20;
    
    return { x, y };
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    
    // Remove authentication from local storage
    localStorage.removeItem("isAuthenticated");
    
    // Navigate to the signin page
    navigate("/signin");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Left sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="sidebar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div className="sidebar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="sidebar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div 
            className="sidebar-icon settings-icon"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
        </div>

        {/* Main content */}
        <div className="dashboard-content">
          {/* Header section */}
          <div className="dashboard-header">
            <div className="header-title">
              <h1>Monitor health of your business</h1>
              <p>Control and analyze your data in the easiest way</p>
            </div>
            <div className="header-actions">
              <div className="search-container">
                <div className="search-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input type="text" placeholder="Search" className="search-input" />
              </div>
              <div className="add-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
            </div>
          </div>

          {/* Time period selector */}
          <div className="period-selector">
            {['Week', 'Month', 'Year'].map(period => (
              <button
                key={period}
                className={`period-button ${activePeriod === period ? 'period-active' : ''}`}
                onClick={() => setActivePeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Metrics cards and image */}
          <div className="metrics-grid">
            <div className="metric-card purple">
              <div className="metric-header">
                <span>Views</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <div className="metric-value">
                <h3>31</h3>
                <p>+3 last day</p>
              </div>
            </div>

            <div className="metric-card blue">
              <div className="metric-header">
                <span>Clients</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="metric-value">
                <h3>63</h3>
                <p>+1 last day</p>
              </div>
              <div className="client-chart">
                {[10, 14, 8, 12, 10, 6, 9, 11].map((height, index) => (
                  <div key={index} className="chart-bar" style={{ height: `${height}px` }}></div>
                ))}
              </div>
            </div>

            <div className="metric-card white">
              <div className="metric-header">
                <span>Purchases</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="metric-value">
                <h3>10</h3>
                <p>+1 last day</p>
              </div>
            </div>

            <div className="image-placeholder">
              <div className="building-block block1"></div>
              <div className="building-block block2"></div>
              <div className="building-block block3"></div>
            </div>
          </div>

          {/* Total profit section with enhanced chart */}
          <div className="profit-section">
            <div className="profit-header">
              <h2>Total profit</h2>
              
              <div className="profit-controls">
                <div className="legend-item">
                  <div className="legend-dot income"></div>
                  <span>Income</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot expenses"></div>
                  <span>Expenses</span>
                </div>
                <div className="divider"></div>
                <div className="tab-buttons">
                  <button 
                    className={`tab-button ${activeTab === 'Objects' ? 'tab-active' : ''}`} 
                    onClick={() => setActiveTab('Objects')}
                  >
                    Objects
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'Realtors' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('Realtors')}
                  >
                    Realtors
                  </button>
                </div>
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </div>
              </div>
            </div>

            <div className="profit-content">
              <div className="profit-chart">
                <h2 className="profit-amount">$628.00</h2>
                
                {/* Dynamic Responsive Chart Component */}
                <div className="chart-container">
                  <div className="y-axis">
                    <span>5m</span>
                    <span>0%</span>
                    <span>-5m</span>
                  </div>
                  
                  <div className="chart-area">
                    <svg 
                      className="chart-svg" 
                      viewBox="0 0 800 200" 
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* Dynamic paths based on actual data */}
                      <path
                        d={generatePath(chartPoints, 'income')}
                        className="income-line"
                        vectorEffect="non-scaling-stroke"
                      />
                      
                      <path
                        d={generatePath(chartPoints, 'expense')}
                        className="expenses-line"
                        vectorEffect="non-scaling-stroke"
                      />
                      
                      {/* Add a dot for the highest income value */}
                      {(() => {
                        const maxPoint = getMaxIncomePoint();
                        return <circle cx={maxPoint.x} cy={maxPoint.y} r="4" className="chart-dot" />;
                      })()}
                    </svg>
                    
                    <div className="x-axis">
                      {chartPoints.map((point, index) => (
                        <div key={index} className={`month-label ${point.month === 'Oct' ? 'active-month' : ''}`}>
                          {point.month}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="property-list">
                <div className="property-card dark">
                  <div className="property-icon blue"></div>
                  <div className="property-info">
                    <p>Windmills Loft</p>
                  </div>
                  <div className="property-stats">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                      25%
                    </span>
                  </div>
                </div>
                
                <div className="property-card light">
                  <div className="property-icon purple"></div>
                  <div className="property-info">
                    <p>Seaview Villa</p>
                  </div>
                  <div className="property-stats">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                      18%
                    </span>
                  </div>
                </div>
                
                <div className="property-card light">
                  <div className="property-icon teal"></div>
                  <div className="property-info">
                    <p>Family Villa</p>
                  </div>
                  <div className="property-stats">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                      12%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;