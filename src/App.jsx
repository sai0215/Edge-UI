import { useState } from 'react'
import './App.css'

function App() {
  const [activeNav, setActiveNav] = useState('document-drafting')
  const [searchTerm, setSearchTerm] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [showGuidedJourney, setShowGuidedJourney] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [formData, setFormData] = useState({
    task: '',
    audience: ''
  })

  const navItems = [
    { id: 'document-drafting', label: 'Document Drafting', icon: '📄' },
    { id: 'thought-leadership', label: 'Thought Leadership', icon: '💡' },
    { id: 'internal-comms', label: 'Internal Communications', icon: '💬' }
  ]

  const historyItems = [
    'Project Hercules Exec Update',
    'Project Hercules Strategy & Plan',
    'CTO 1:1 on CPG Trends',
    'Project Hercules Team Kickoff',
    'Digital Transformation Proposal'
  ]

  const actionButtons = [
    'Fix formatting',
    'Add Professional touchups',
    'Sanitize Documents',
    'Adapt existing proposals'
  ]

  const guidedJourneyOptions = [
    { label: 'Document Type', options: ['Proposal', 'Report', 'Presentation', 'Memo'] },
    { label: 'Tone', options: ['Professional', 'Casual', 'Formal', 'Persuasive'] },
    { label: 'Length', options: ['Brief (1-2 pages)', 'Medium (3-5 pages)', 'Long (5+ pages)'] },
    { label: 'Industry', options: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'] }
  ]

  const filteredHistory = historyItems.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files)
    setUploadedFiles(fileArray)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFileUpload(e.dataTransfer.files)
  }

  const handleActionClick = (action) => {
    console.log('Action clicked:', action)
  }

  const handleHistoryClick = (item) => {
    console.log('History item clicked:', item)
  }

  return (
    <div className="app-container">
      {/* LEFT SIDEBAR */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? '☰' : '✕'}
        </button>

        {!sidebarCollapsed && (
          <>
            <div className="sidebar-header">
              <h2 className="sidebar-title">Interface Wireframe</h2>
              <div className="search-container">
                <div className="search-icon">🔍</div>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search offerings"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <nav className="sidebar-nav">
              <div className="nav-section">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                    onClick={() => setActiveNav(item.id)}
                  >
                    <span className="nav-item-icon">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="section-header">Other</div>

              <div className="saved-history">
                <h3 className="history-title">Saved History</h3>
                {filteredHistory.map((item, index) => (
                  <div
                    key={index}
                    className="history-item"
                    onClick={() => handleHistoryClick(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </nav>

            <div className="sidebar-footer">
              <div className="user-profile">
                <div className="user-logo">PwC</div>
                <div className="user-info">
                  <div className="user-name">User XZ</div>
                  <div className="user-company">PwC US</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="main-header">
          <h1 className="app-title">Envisioned UX</h1>
          <p className="app-subtitle">
            Users think Open AI just released document development and thought leadership generation modules
          </p>
          <div className="header-buttons">
            <button
              className="quick-start-btn"
              onClick={() => document.querySelector('.form-textarea')?.focus()}
            >
              Quick Start
            </button>
            <button
              className="guided-journey-btn"
              onClick={() => setShowGuidedJourney(!showGuidedJourney)}
            >
              Guided Journey {showGuidedJourney ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {showGuidedJourney && (
          <div className="guided-journey-dropdown">
            <h3>Select Your Document Preferences</h3>
            <div className="dropdown-grid">
              {guidedJourneyOptions.map((option, index) => (
                <div key={index} className="dropdown-group">
                  <label className="dropdown-label">{option.label}</label>
                  <select className="dropdown-select">
                    <option value="">Select {option.label}</option>
                    {option.options.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <button className="apply-preferences-btn">Apply Preferences</button>
          </div>
        )}

        <div className="content-container">
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">What do you want to do to this document?</label>
              <textarea
                className="form-textarea"
                placeholder="e.g. I would like you to fix the formatting of this document..."
                value={formData.task}
                onChange={(e) => setFormData({ ...formData, task: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Who is the intended audience for this document?</label>
              <textarea
                className="form-textarea"
                placeholder="e.g. this document will be delivered to a CEO of a Client X..."
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Please upload the template that the document should be using:</label>
              <div
                className="upload-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                <div className="upload-icon">☁️</div>
                <div className="upload-text">
                  {uploadedFiles.length > 0
                    ? `Selected: ${uploadedFiles.map(f => f.name).join(', ')}`
                    : 'Drag and drop files here or click to browse'}
                </div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </div>
            </div>

            <div className="action-buttons">
              {actionButtons.map((action, index) => (
                <button
                  key={index}
                  className="action-btn"
                  onClick={() => handleActionClick(action)}
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="help-input-container">
              <input
                type="text"
                className="help-input"
                placeholder="+ How can I help you?"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    console.log('Help message:', e.target.value)
                    e.target.value = ''
                  }
                }}
              />
              <button
                className="help-send-btn"
                onClick={(e) => {
                  const input = e.target.previousSibling
                  if (input.value.trim()) {
                    console.log('Help message:', input.value)
                    input.value = ''
                  }
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
