import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  startDate: '',
  cycleLength: '',
  symptoms: [],
  notes: '',
};

const moods = [
  { icon: 'fas fa-smile', value: 'happy' },
  { icon: 'fas fa-meh', value: 'neutral' },
  { icon: 'fas fa-frown', value: 'sad' },
];

const flowLevels = [
  { icon: 'fas fa-tint', value: 'light', label: 'Light' },
  { icon: 'fas fa-tint', value: 'medium', label: 'Medium' },
  { icon: 'fas fa-tint', value: 'heavy', label: 'Heavy' },
];

const Main = () => {
  // Navigation state
  const [view, setView] = useState('home');
  // Form state
  const [form, setForm] = useState(initialForm);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [result, setResult] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load previous data on mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('periodHistory') || '[]');
    if (history.length > 0) {
      const lastEntry = history[history.length - 1];
      setForm(f => ({
        ...f,
        startDate: lastEntry.lastPeriod.split('T')[0],
        cycleLength: lastEntry.cycleLength,
      }));
    }
  }, []);

  // Navigation handler
  const handleNav = (target) => {
    setView(target);
  };

  // Mood selection
  const handleMood = (mood) => {
    setSelectedMood(mood);
  };

  // Form input handler
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({
        ...f,
        symptoms: checked
          ? [...f.symptoms, value]
          : f.symptoms.filter(s => s !== value),
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  // Form submit/calculate
  const handleCalculate = () => {
    const { startDate, cycleLength, symptoms, notes } = form;
    if (!startDate || !cycleLength || !selectedFlow) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    const start = new Date(startDate);
    const cycle = parseInt(cycleLength);
    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + cycle);
    const ovulationDate = new Date(nextPeriod);
    ovulationDate.setDate(nextPeriod.getDate() - 14);
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);
    const periodData = {
      lastPeriod: start.toISOString(),
      cycleLength: cycle,
      nextPeriod: nextPeriod.toISOString(),
      ovulationDate: ovulationDate.toISOString(),
      fertileWindow: {
        start: fertileStart.toISOString(),
        end: fertileEnd.toISOString(),
      },
      mood: selectedMood,
      flow: selectedFlow,
      symptoms,
      notes,
      timestamp: new Date().toISOString(),
    };
    let history = JSON.parse(localStorage.getItem('periodHistory') || '[]');
    history.push(periodData);
    localStorage.setItem('periodHistory', JSON.stringify(history));
    setResult({ nextPeriod, ovulationDate, fertileStart, fertileEnd });
    showNotification('Data saved successfully!', 'success');
  };

  // Notification
  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2000);
  };

  // Format date
  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  // Render
  return (
    <main className="main-content">
      <div className="main-glass-card">
        <div className="container">
          {/* Navigation (simulate nav links) */}
          <div style={{ display: 'none' }} />
          {/* Welcome Section */}
          {view === 'home' && (
            <>
              <div className="welcome-section">
                <h1 className="main-gradient-title">Period Tracker</h1>
                <p className="subtitle">Track your cycle, understand your body</p>
              </div>
              <div className="tracker-card">
                <div className="card-header">
                  <div className="mood-selector">
                    <span>How's your mood today?</span>
                    <div className="mood-icons">
                      {moods.map(m => (
                        <span
                          key={m.value}
                          className={`mood-icon${selectedMood === m.value ? ' selected' : ''}`}
                          title={m.value.charAt(0).toUpperCase() + m.value.slice(1)}
                          onClick={() => handleMood(m.value)}
                        >
                          <i className={m.icon}></i>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <form id="tracker-form" onSubmit={e => e.preventDefault()}>
                  <div className="form-group">
                    <label htmlFor="start-date" className="form-label">
                      <i className="fas fa-calendar form-icon"></i>
                      Last Period Start Date
                    </label>
                    <input type="date" id="start-date" name="startDate" value={form.startDate} onChange={handleInput} required className="form-input" />
                  </div>
                  <div className="form-group" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="cycle-length" className="form-label">
                        <i className="fas fa-clock form-icon"></i>
                        Cycle Length (in days)
                      </label>
                      <input type="number" id="cycle-length" name="cycleLength" min="1" value={form.cycleLength} onChange={handleInput} required className="form-input" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="form-label">
                        <i className="fas fa-tint form-icon"></i>
                        Period Flow
                      </label>
                      <div className="mood-icons" style={{ justifyContent: 'flex-start' }}>
                        {flowLevels.map(f => (
                          <span
                            key={f.value}
                            className={`mood-icon${selectedFlow === f.value ? ' selected' : ''}`}
                            title={f.label}
                            onClick={() => setSelectedFlow(f.value)}
                            style={{ color: selectedFlow === f.value ? '#e94a6f' : '#666', fontSize: '1.5rem', marginRight: '0.7rem', cursor: 'pointer' }}
                          >
                            <i className={f.icon} style={{ opacity: f.value === 'light' ? 0.5 : f.value === 'medium' ? 0.8 : 1, filter: f.value === 'light' ? 'grayscale(0.7)' : f.value === 'medium' ? 'grayscale(0.3)' : 'none' }}></i>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="symptoms" className="form-label">
                      <i className="fas fa-heartbeat form-icon"></i>
                      Symptoms
                    </label>
                    <div className="symptoms-grid">
                      {['cramps', 'headache', 'fatigue', 'mood'].map(sym => (
                        <label className="symptom-checkbox" key={sym}>
                          <input
                            type="checkbox"
                            name="symptoms"
                            value={sym}
                            checked={form.symptoms.includes(sym)}
                            onChange={handleInput}
                          />
                          <span>{sym.charAt(0).toUpperCase() + sym.slice(1).replace('mood', 'Mood Changes')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="notes" className="form-label">
                      <i className="fas fa-sticky-note form-icon"></i>
                      Notes
                    </label>
                    <textarea id="notes" name="notes" value={form.notes} onChange={handleInput} placeholder="How are you feeling today?" className="form-textarea" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <button type="button" id="calculate-btn" onClick={handleCalculate} className="modern-btn" disabled={loading}>
                      <i className="fas fa-calculator"></i>
                      {loading ? 'Saving...' : 'Calculate & Save'}
                    </button>
                  </div>
                </form>
              </div>
              <div id="result" className="result-card" style={{ display: result ? 'block' : 'none' }}>
                <div className="result-header">
                  <h3>Your Next Period</h3>
                  <div className="result-date"></div>
                </div>
                <div className="cycle-info">
                  <div className="info-item">
                    <i className="fas fa-calendar-check"></i>
                    <span>Next Period</span>
                    <strong className="next-period">{result && formatDate(result.nextPeriod)}</strong>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-calendar-week"></i>
                    <span>Fertile Window</span>
                    <strong className="fertile-window">{result && `${formatDate(result.fertileStart)} - ${formatDate(result.fertileEnd)}`}</strong>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-calendar-day"></i>
                    <span>Ovulation Day</span>
                    <strong className="ovulation-day">{result && formatDate(result.ovulationDate)}</strong>
                  </div>
                </div>
              </div>
              <div className="quick-stats">
                <div className="stat-card" onClick={() => navigate('/stats')} style={{ cursor: 'pointer' }}>
                  <i className="fas fa-chart-line"></i>
                  <h4>Cycle History</h4>
                  <p>View your past cycles</p>
                </div>
                <div className="stat-card" onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}>
                  <i className="fas fa-bell"></i>
                  <h4>Reminders</h4>
                  <p>Set up notifications</p>
                </div>
                <div className="stat-card" onClick={() => navigate('/learn')} style={{ cursor: 'pointer' }}>
                  <i className="fas fa-book-medical"></i>
                  <h4>Health Tips</h4>
                  <p>Get personalized advice</p>
                </div>
              </div>
            </>
          )}
          {/* Educational Content Section (placeholder) */}
          {view === 'learn' && (
            <div id="learn" className="education-section">
              <div className="education-card">
                <div className="cycle-overview">
                  <h2>Understanding Your Menstrual Cycle</h2>
                  <p className="overview-text">Your menstrual cycle is a natural process that prepares your body for pregnancy each month. Understanding your cycle can help you track your health and plan your life better.</p>
                </div>
                <div className="cycle-diagram">
                  <img src="/cyclediagram.png" alt="Menstrual Cycle Diagram" className="cycle-image" />
                </div>
                {/* ...phase info and more content can be added here as needed... */}
              </div>
            </div>
          )}
          {/* Notification */}
          {notification && (
            <div className={`notification ${notification.type}`}>{notification.msg}</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main; 