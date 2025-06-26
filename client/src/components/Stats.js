import React, { useEffect, useState } from 'react';

const calculateAverageCycleLength = (history) => {
  if (history.length < 2) return history[0]?.cycleLength || 0;
  const cycleLengths = history.map(entry => entry.cycleLength);
  const sum = cycleLengths.reduce((a, b) => a + b, 0);
  return Math.round(sum / cycleLengths.length);
};

const getMostCommonSymptoms = (history) => {
  const symptoms = history.flatMap(entry => entry.symptoms);
  const symptomCount = {};
  symptoms.forEach(symptom => {
    symptomCount[symptom] = (symptomCount[symptom] || 0) + 1;
  });
  const mostCommon = Object.entries(symptomCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([symptom]) => symptom);
  return mostCommon.join(', ') || 'No symptoms recorded';
};

const analyzeMoods = (history) => {
  const moods = history.map(entry => entry.mood).filter(Boolean);
  if (moods.length === 0) return 'No mood data available';
  const moodCount = {};
  moods.forEach(mood => {
    moodCount[mood] = (moodCount[mood] || 0) + 1;
  });
  const mostCommonMood = Object.entries(moodCount)
    .sort((a, b) => b[1] - a[1])[0][0];
  return `Most common mood: ${mostCommonMood}`;
};

const getLast3MonthsTabs = (history) => {
  const now = new Date();
  // Get the last 3 months as {label, year, month}
  const months = [];
  for (let i = 0; i < 3; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleString('default', { month: 'long', year: 'numeric' }),
      year: d.getFullYear(),
      month: d.getMonth(),
    });
  }
  // For each month, get entries
  return months.map(m => ({
    ...m,
    entries: history.filter(entry => {
      const entryDate = new Date(entry.lastPeriod);
      return entryDate.getFullYear() === m.year && entryDate.getMonth() === m.month;
    })
  }));
};

function getMonthSummary(entries) {
  if (!entries.length) return null;
  // Most common flow
  const flowCount = {};
  entries.forEach(e => { if (e.flow) flowCount[e.flow] = (flowCount[e.flow] || 0) + 1; });
  const mostCommonFlow = Object.entries(flowCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
  // Average cycle length
  const numPeriods = entries.length;
  const avgCycle = Math.round(entries.reduce((sum, e) => sum + (e.cycleLength || 0), 0) / numPeriods);
  // Most common mood
  const moodCount = {};
  entries.forEach(e => { if (e.mood) moodCount[e.mood] = (moodCount[e.mood] || 0) + 1; });
  const mostCommonMood = Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
  // Most common symptoms
  const allSymptoms = entries.flatMap(e => e.symptoms || []);
  const symptomCount = {};
  allSymptoms.forEach(s => { symptomCount[s] = (symptomCount[s] || 0) + 1; });
  const mostCommonSymptoms = Object.entries(symptomCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s]) => s).join(', ') || 'None';
  // Most recent note (thought entry)
  const notes = entries.map(e => e.notes).filter(Boolean);
  const mostRecentNote = notes.length > 0 ? notes[notes.length - 1] : 'No entry for this month.';
  return {
    mostCommonFlow,
    avgCycle,
    mostCommonMood,
    mostCommonSymptoms,
    mostRecentNote,
  };
}

// Add icon mapping for flow levels
const flowIcons = {
  light: <i className="fas fa-tint" style={{ opacity: 0.5, filter: 'grayscale(0.7)', color: '#e94a6f', fontSize: '1.5rem', marginRight: '0.3rem' }} title="Light"></i>,
  medium: <i className="fas fa-tint" style={{ opacity: 0.8, filter: 'grayscale(0.3)', color: '#e94a6f', fontSize: '1.5rem', marginRight: '0.3rem' }} title="Medium"></i>,
  heavy: <i className="fas fa-tint" style={{ opacity: 1, filter: 'none', color: '#e94a6f', fontSize: '1.5rem', marginRight: '0.3rem' }} title="Heavy"></i>,
};

const Stats = () => {
  const [history, setHistory] = useState([]);
  const [activeMonthTab, setActiveMonthTab] = useState(0); // 0 = most recent month

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('periodHistory') || '[]');
    setHistory(data);
  }, []);

  if (history.length === 0) {
    return (
      <div className="main-content">
        <div className="stats-view">
          <h2>Period Statistics</h2>
          <p>No period data available.</p>
        </div>
      </div>
    );
  }

  const last3MonthsTabs = getLast3MonthsTabs(history);

  // Get summary for the selected month
  const monthSummary = getMonthSummary(last3MonthsTabs[activeMonthTab].entries);

  return (
    <div className="main-content">
      <div className="stats-view">
        <h2>Period Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>Average Cycle Length</h3>
            <p>{calculateAverageCycleLength(history)} days</p>
          </div>
          <div className="stat-item">
            <h3>Most Common Symptoms</h3>
            <p>{getMostCommonSymptoms(history)}</p>
          </div>
          <div className="stat-item">
            <h3>Mood Analysis</h3>
            <p>{analyzeMoods(history)}</p>
          </div>
        </div>
      </div>
      {/* Last 3 Months Section with Tabs */}
      <div className="stats-view" style={{ marginTop: '2.5rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Last 3 Months</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          {last3MonthsTabs.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveMonthTab(idx)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '20px',
                border: idx === activeMonthTab ? '2px solid #e94a6f' : '1px solid #eee',
                background: idx === activeMonthTab ? 'var(--gradient)' : '#fff',
                color: idx === activeMonthTab ? '#fff' : '#e94a6f',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                boxShadow: idx === activeMonthTab ? '0 2px 8px rgba(233,74,111,0.08)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {!monthSummary ? (
          <p>No data for {last3MonthsTabs[activeMonthTab].label}.</p>
        ) : (
          <div style={{
            display: 'flex',
            gap: '1.2rem',
            justifyContent: 'center',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            <div style={{ flex: '1 1 150px', background: 'rgba(255, 182, 193, 0.10)', borderRadius: '14px', padding: '1.1rem 0.7rem', textAlign: 'center', boxShadow: '0 1px 6px rgba(233,74,111,0.05)' }}>
              <div style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#2d3436', fontWeight: 500 }}># Period Flow</div>
              <div style={{ fontSize: '1.3rem', color: '#e94a6f', fontWeight: 700, marginBottom: '0.1rem', textTransform: 'capitalize', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                {flowIcons[monthSummary.mostCommonFlow] || null}
                {monthSummary.mostCommonFlow}
              </div>
            </div>
            <div style={{ flex: '1 1 150px', background: 'rgba(255, 182, 193, 0.10)', borderRadius: '14px', padding: '1.1rem 0.7rem', textAlign: 'center', boxShadow: '0 1px 6px rgba(233,74,111,0.05)' }}>
              <div style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#2d3436', fontWeight: 500 }}>Average Cycle Length</div>
              <div style={{ fontSize: '1.3rem', color: '#e94a6f', fontWeight: 700, marginBottom: '0.1rem' }}>{monthSummary.avgCycle} days</div>
            </div>
            <div style={{ flex: '1 1 150px', background: 'rgba(255, 182, 193, 0.10)', borderRadius: '14px', padding: '1.1rem 0.7rem', textAlign: 'center', boxShadow: '0 1px 6px rgba(233,74,111,0.05)' }}>
              <div style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#2d3436', fontWeight: 500 }}>Most Common Symptoms</div>
              <div style={{ fontSize: '1.3rem', color: '#e94a6f', fontWeight: 700, marginBottom: '0.1rem', textTransform: 'lowercase' }}>{monthSummary.mostCommonSymptoms}</div>
            </div>
            <div style={{ flex: '1 1 150px', background: 'rgba(255, 182, 193, 0.10)', borderRadius: '14px', padding: '1.1rem 0.7rem', textAlign: 'center', boxShadow: '0 1px 6px rgba(233,74,111,0.05)' }}>
              <div style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#2d3436', fontWeight: 500 }}>Mood Analysis</div>
              <div style={{ fontSize: '1.3rem', color: '#e94a6f', fontWeight: 700, marginBottom: '0.1rem' }}>Most common mood: {monthSummary.mostCommonMood}</div>
            </div>
            <div style={{ flex: '2 1 300px', background: 'rgba(255, 182, 193, 0.10)', borderRadius: '14px', padding: '1.1rem 1rem', textAlign: 'center', boxShadow: '0 1px 6px rgba(233,74,111,0.05)', minWidth: '200px', maxWidth: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#2d3436', fontWeight: 500 }}>Thought Entry</div>
              <div style={{ fontSize: '1.3rem', color: '#e94a6f', fontWeight: 700, marginBottom: '0.1rem', wordBreak: 'break-word' }}>{monthSummary.mostRecentNote}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats; 