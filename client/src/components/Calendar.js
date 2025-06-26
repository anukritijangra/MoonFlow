import React, { useState, useEffect } from 'react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const Calendar = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('periodHistory') || '[]');
    setHistory(data);
  }, []);

  // Calculate period dates for the current view
  function getPeriodDates() {
    let periodDates = [];
    if (history.length > 0) {
      const lastEntry = history[history.length - 1];
      const lastPeriod = new Date(lastEntry.lastPeriod);
      const cycleLength = lastEntry.cycleLength;
      if (!isNaN(lastPeriod) && cycleLength > 0) {
        let start = new Date(lastPeriod);
        while (start < new Date(year, month, 1)) {
          start.setDate(start.getDate() + cycleLength);
        }
        let period = new Date(start);
        const lastDay = new Date(year, month + 1, 0);
        while (period <= lastDay) {
          periodDates.push(new Date(period));
          period.setDate(period.getDate() + cycleLength);
        }
      }
    }
    return periodDates;
  }

  // Render calendar grid
  function renderCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const periodDates = getPeriodDates();
    const days = [];
    // Empty cells before first day
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    // Days of month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      // Predicted period days
      const isPeriodDay = periodDates.some(date =>
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
      // Actual period days (from history)
      const periodEntry = history.find(entry => {
        const entryDate = new Date(entry.lastPeriod);
        return (
          entryDate.getDate() === day &&
          entryDate.getMonth() === month &&
          entryDate.getFullYear() === year
        );
      });
      let className = 'calendar-day';
      let title = '';
      let content = day;
      if (isPeriodDay) {
        className += ' next-period-day';
        content = <>{day} <span style={{color:'#ff6b6b',fontSize:'1.2em'}}>❤️</span></>;
        title = 'Predicted Period Day';
      }
      if (periodEntry) {
        className += ' period-day';
        title = `Period Day - ${periodEntry.symptoms.join(', ')}`;
      }
      days.push(
        <div key={day} className={className} title={title}>
          {content}
        </div>
      );
    }
    return days;
  }

  // Navigation handlers
  const prevMonth = () => {
    let m = month - 1;
    let y = year;
    if (m < 0) { m = 11; y--; }
    setMonth(m);
    setYear(y);
  };
  const nextMonth = () => {
    let m = month + 1;
    let y = year;
    if (m > 11) { m = 0; y++; }
    setMonth(m);
    setYear(y);
  };

  return (
    <div className="calendar-view">
      {history.length === 0 ? (
        <p>No period data available.</p>
      ) : (
        <>
          <div className="calendar-nav">
            <button className="calendar-prev" onClick={prevMonth}>&lt; Prev</button>
            <h2 className="calendar-title">{monthNames[month]} {year}</h2>
            <button className="calendar-next" onClick={nextMonth}>Next &gt;</button>
          </div>
          <div className="calendar-grid">
            <div className="week-header">
              {daysOfWeek.map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="days-grid">
              {renderCalendar()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar; 