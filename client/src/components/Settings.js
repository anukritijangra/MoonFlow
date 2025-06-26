import React, { useEffect, useState } from 'react';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    setNotificationsEnabled(localStorage.getItem('notifications-enabled') === 'true');
  }, []);

  const handleToggle = (e) => {
    setNotificationsEnabled(e.target.checked);
    localStorage.setItem('notifications-enabled', e.target.checked);
    showNotification('Notification settings updated', 'success');
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear();
      showNotification('All data cleared', 'success');
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  return (
    <div className="settings-view">
      <h2>Settings</h2>
      <div className="settings-grid">
        <div className="setting-item">
          <h3>Notifications</h3>
          <label className="switch">
            <input type="checkbox" checked={notificationsEnabled} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <h3>Data Management</h3>
          <button className="danger-button" onClick={handleClearData}>Clear All Data</button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 