import React, { useRef } from 'react';

const Learn = () => {
  const questionsRef = useRef(null);
  const selfCareRef = useRef(null);
  const doctorRef = useRef(null);

  const handleTabClick = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="learn" className="education-section">
      <div className="education-card card">
        {/* Tab Navigation */}
        <div className="tab-nav">
          <button onClick={() => handleTabClick(questionsRef)} className="tab-btn">Common Questions</button>
          <button onClick={() => handleTabClick(selfCareRef)} className="tab-btn">Self-Care Guide</button>
          <button onClick={() => handleTabClick(doctorRef)} className="tab-btn">When to See a Doctor</button>
        </div>
        <div className="cycle-overview">
          <h2 className="section-title">Understanding Your Menstrual Cycle</h2>
          <p className="overview-text text-body">Your menstrual cycle is a natural process that prepares your body for pregnancy each month. Understanding your cycle can help you track your health and plan your life better.</p>
        </div>
        <div className="cycle-diagram">
          <img src="/cycle-diagram.png" alt="Menstrual Cycle Diagram" className="cycle-image" />
        </div>
        <div className="phase-info">
          <div className="phase-card">
            <h3><i className="fas fa-moon"></i> Menstrual Phase (Days 1-5)</h3>
            <div className="phase-content">
              <h4>What's Happening:</h4>
              <p>Your body sheds the uterine lining, and hormone levels (estrogen and progesterone) are at their lowest.</p>
              <h4>How You Might Feel:</h4>
              <ul>
                <li>Fatigue and low energy</li>
                <li>Mild to severe cramps</li>
                <li>Mood changes</li>
                <li>Bloating</li>
              </ul>
              <h4>Self-Care Tips:</h4>
              <ul>
                <li>Rest and prioritize sleep</li>
                <li>Stay hydrated</li>
                <li>Gentle exercise like walking or yoga</li>
                <li>Use heat therapy for cramps</li>
              </ul>
            </div>
          </div>
          <div className="phase-card">
            <h3><i className="fas fa-sun"></i> Follicular Phase (Days 6-14)</h3>
            <div className="phase-content">
              <h4>What's Happening:</h4>
              <p>Estrogen levels rise as your body prepares for ovulation. The uterine lining begins to thicken.</p>
              <h4>How You Might Feel:</h4>
              <ul>
                <li>Increased energy</li>
                <li>Better mood</li>
                <li>Improved focus</li>
                <li>Higher creativity</li>
              </ul>
              <h4>Self-Care Tips:</h4>
              <ul>
                <li>Plan important activities</li>
                <li>Try new things</li>
                <li>Socialize and connect</li>
                <li>Exercise more intensely</li>
              </ul>
            </div>
          </div>
          <div className="phase-card">
            <h3><i className="fas fa-star"></i> Ovulation (Day 14)</h3>
            <div className="phase-content">
              <h4>What's Happening:</h4>
              <p>An egg is released from the ovary. Estrogen peaks and testosterone rises slightly.</p>
              <h4>How You Might Feel:</h4>
              <ul>
                <li>Peak energy levels</li>
                <li>Increased libido</li>
                <li>Confidence boost</li>
                <li>Social and outgoing</li>
              </ul>
              <h4>Self-Care Tips:</h4>
              <ul>
                <li>Plan social activities</li>
                <li>Focus on important tasks</li>
                <li>Practice self-expression</li>
                <li>Engage in creative activities</li>
              </ul>
            </div>
          </div>
          <div className="phase-card">
            <h3><i className="fas fa-cloud"></i> Luteal Phase (Days 15-28)</h3>
            <div className="phase-content">
              <h4>What's Happening:</h4>
              <p>Progesterone rises and then falls if pregnancy doesn't occur. Estrogen levels fluctuate.</p>
              <h4>How You Might Feel:</h4>
              <ul>
                <li>Energy gradually decreases</li>
                <li>Possible mood changes</li>
                <li>Increased appetite</li>
                <li>Breast tenderness</li>
              </ul>
              <h4>Self-Care Tips:</h4>
              <ul>
                <li>Practice stress management</li>
                <li>Maintain regular sleep schedule</li>
                <li>Eat balanced meals</li>
                <li>Gentle exercise</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="additional-resources">
          <h3>Additional Resources</h3>
          <div className="resource-cards">
            <div className="resource-card">
              <i className="fas fa-book"></i>
              <h4>Common Questions</h4>
              <p>Get answers to frequently asked questions about menstrual health</p>
            </div>
            <div className="resource-card">
              <i className="fas fa-heart"></i>
              <h4>Self-Care Guide</h4>
              <p>Tips and tricks for taking care of yourself during your cycle</p>
            </div>
            <div className="resource-card">
              <i className="fas fa-stethoscope"></i>
              <h4>When to See a Doctor</h4>
              <p>Learn about symptoms that might need medical attention</p>
            </div>
          </div>
        </div>
        {/* Tabbed Sections */}
        <div ref={questionsRef} className="section-spacing">
          <h2 className="section-title"><i className="fas fa-book icon-standard"></i>Common Questions</h2>
          <ul className="text-body">
            <li><strong>How long is a normal menstrual cycle?</strong> Most cycles last 21–35 days, with 28 days being average.</li>
            <li><strong>How many days does a period usually last?</strong> Typically 3–7 days.</li>
            <li><strong>Is it normal to have irregular periods?</strong> Occasional irregularity is common, but frequent changes should be discussed with a doctor.</li>
            <li><strong>Can stress affect my cycle?</strong> Yes, stress, illness, and lifestyle changes can all impact your cycle.</li>
            <li><strong>What is considered a heavy period?</strong> Needing to change pads/tampons every 1–2 hours or periods lasting more than 7 days may be considered heavy.</li>
            <li><strong>Can I swim or exercise during my period?</strong> Yes! Physical activity can help reduce cramps and improve mood.</li>
            <li><strong>Is it normal to have cramps?</strong> Mild to moderate cramps are common, but severe pain should be evaluated.</li>
          </ul>
        </div>
        <div ref={selfCareRef} className="section-spacing">
          <h2 className="section-title"><i className="fas fa-heart icon-standard"></i>Self-Care Guide</h2>
          <ul className="text-body">
            <li>Track your cycle to understand your body's patterns.</li>
            <li>Stay hydrated and eat a balanced diet rich in iron and vitamins.</li>
            <li>Use heat packs or gentle exercise to relieve cramps.</li>
            <li>Prioritize sleep and rest when you feel fatigued.</li>
            <li>Practice stress management: meditation, yoga, or deep breathing.</li>
            <li>Wear comfortable clothing and use period products that suit your flow.</li>
            <li>Don't hesitate to talk to friends, family, or a professional if you feel low.</li>
          </ul>
        </div>
        <div ref={doctorRef} className="section-spacing" style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title"><i className="fas fa-stethoscope icon-standard"></i>When to See a Doctor</h2>
          <ul className="text-body">
            <li>Periods that suddenly become very irregular or stop for more than 3 months (not due to pregnancy).</li>
            <li>Very heavy bleeding (soaking through pads/tampons every 1–2 hours).</li>
            <li>Severe pain that doesn't improve with over-the-counter medication.</li>
            <li>Bleeding between periods or after sex.</li>
            <li>Symptoms of anemia: extreme fatigue, pale skin, shortness of breath.</li>
            <li>Any new or unusual symptoms that concern you.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Learn; 