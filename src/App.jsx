import React, { useState } from 'react';
import { Send, Upload, FileText, Lightbulb, Users, MessageSquare, Sparkles, ChevronRight } from 'lucide-react';
import './App.css';

export default function App() {
  const [selectedOffering, setSelectedOffering] = useState('Document Drafting');
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showGuidedFlow, setShowGuidedFlow] = useState(true);
  const [showGuidedPopup, setShowGuidedPopup] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(1);
  const [documentPurpose, setDocumentPurpose] = useState('');
  const [audience, setAudience] = useState('');

  const offerings = [
    { name: 'Document Drafting', icon: FileText },
    { name: 'Thought Leadership', icon: Lightbulb },
    { name: 'Internal Communications', icon: Users },
    { name: 'Other', icon: MessageSquare }
  ];

  const savedHistory = [
    'Project Hercules Exec Update',
    'Project Hercules Strategy & Plan',
    'CTO 1:1 on CPG Trends',
    'Project Hercules Team Kickoff',
    'Digital Transformation Proposal'
  ];

  const quickActions = [
    { label: 'Fix formatting', icon: Sparkles },
    { label: 'Add Professional touchups', icon: Sparkles },
    { label: 'Sanitize Documents', icon: Sparkles },
    { label: 'Adapt existing proposals', icon: Sparkles }
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { type: 'user', text: inputMessage }]);
      setInputMessage('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          type: 'assistant', 
          text: 'I understand you need help with that. Let me assist you with creating a professional document that meets PwC standards.' 
        }]);
      }, 1000);
    }
  };

  const startGuidedWorkflow = () => {
    setShowGuidedPopup(true);
    setWorkflowStep(1);
    setDocumentPurpose('');
    setAudience('');
  };

  const handleWorkflowNext = () => {
    if (workflowStep === 1 && documentPurpose) {
      setWorkflowStep(2);
    } else if (workflowStep === 2 && audience) {
      setWorkflowStep(3);
    }
  };

  const closeGuidedPopup = () => {
    setShowGuidedPopup(false);
    setShowGuidedFlow(false);
  };

  return (
    <div className="flex h-screen bg-white relative">
      {/* Guided Journey Popup */}
      {showGuidedPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Guided Journey</h2>
                  <p className="text-orange-50 text-sm">Step {workflowStep} of 3</p>
                </div>
                <button
                  onClick={() => setShowGuidedPopup(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Popup Content */}
            <div className="p-8">
              {workflowStep === 1 && (
                <div>
                  <label className="block text-lg font-semibold text-slate-900 mb-4">
                    What do you want to do with this document?
                  </label>
                  <textarea
                    value={documentPurpose}
                    onChange={(e) => setDocumentPurpose(e.target.value)}
                    placeholder="e.g. I would like you to fix the formatting of this document..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    rows="4"
                  />
                  <button
                    onClick={handleWorkflowNext}
                    disabled={!documentPurpose}
                    className="mt-6 w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next Step
                  </button>
                </div>
              )}

              {workflowStep === 2 && (
                <div>
                  <label className="block text-lg font-semibold text-slate-900 mb-4">
                    Who is the intended audience for this document?
                  </label>
                  <textarea
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. this document will be delivered to a CEO of Client X..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    rows="4"
                  />
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setWorkflowStep(1)}
                      className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleWorkflowNext}
                      disabled={!audience}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {workflowStep === 3 && (
                <div>
                  <label className="block text-lg font-semibold text-slate-900 mb-4">
                    Please upload the template that the document should be using:
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-orange-500 transition-colors cursor-pointer">
                    <Upload size={48} className="mx-auto text-slate-400 mb-3" />
                    <p className="text-sm text-slate-600 font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      DOCX, PPTX, or PDF (Max 10MB)
                    </p>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setWorkflowStep(2)}
                      className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={closeGuidedPopup}
                      className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                    >
                      Use Standard Template
                    </button>
                  </div>
                  <button
                    onClick={closeGuidedPopup}
                    className="mt-3 w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Create Document
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 flex flex-col">
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search offerings"
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="absolute left-3 top-2.5 text-slate-400">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Offerings */}
        <div className="px-4 mb-6">
          {offerings.map((offering) => {
            const Icon = offering.icon;
            return (
              <button
                key={offering.name}
                onClick={() => setSelectedOffering(offering.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-left transition-all ${
                  selectedOffering === offering.name
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium text-sm">{offering.name}</span>
              </button>
            );
          })}
        </div>

        {/* Saved History */}
        <div className="flex-1 overflow-y-auto px-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Saved History</h3>
          {savedHistory.map((item, idx) => (
            <button
              key={idx}
              className="w-full text-left px-3 py-2 mb-1 text-sm text-slate-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              {item}
            </button>
          ))}
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">PwC</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">User XZ</div>
              <div className="text-xs text-slate-500">PwC US</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white px-8 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
            {selectedOffering}
          </h1>
          <p className="text-slate-600">AI-powered PPT and Document creation assistant</p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 pb-32">
          {showGuidedFlow && chatMessages.length === 0 ? (
            <div className="max-w-4xl mx-auto">
              {/* Welcome Section */}
              <div className="text-center mb-12">
                <div className="inline-block p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl mb-6">
                  <FileText className="text-orange-600" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Let's create your {selectedOffering} document
                </h2>
                <p className="text-slate-600 text-lg">
                  Choose how you'd like to begin
                </p>
              </div>

              {/* Mode Selection */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                <button
                  onClick={startGuidedWorkflow}
                  className="group flex items-center gap-3 p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white hover:shadow-lg transition-all"
                >
                  <Sparkles size={20} />
                  <span className="text-sm font-medium flex-1 text-left">Guided Journey</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setShowGuidedFlow(false)}
                  className="group flex items-center gap-3 p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all"
                >
                  <MessageSquare size={20} className="text-orange-600" />
                  <span className="text-sm font-medium flex-1 text-left text-slate-900">Quick Start</span>
                  <ChevronRight size={20} className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Popular Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:border-orange-500 hover:shadow-md transition-all text-left"
                      >
                        <Icon size={20} className="text-orange-600" />
                        <span className="text-sm font-medium text-slate-900">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6 pb-8">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl px-6 py-4 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fixed Bottom Input Area */}
        <div className="fixed bottom-0 left-72 right-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-6">
          <div className="max-w-3xl mx-auto px-8">
            <div className="bg-white border border-slate-300 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-end gap-3 p-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  placeholder="Message PwC Assistant..."
                  className="flex-1 px-4 py-3 focus:outline-none resize-none text-sm bg-transparent max-h-48"
                  rows="1"
                  style={{
                    minHeight: '44px',
                    height: 'auto'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-3">
              PwC Assistant can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
