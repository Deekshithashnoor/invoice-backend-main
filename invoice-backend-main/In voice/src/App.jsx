import React, { useState } from 'react';
import './App.css';
import {
  Menu, Bell, User, LayoutDashboard, Box, FileText,
  BarChart2, Users, CreditCard, Settings, Shield, Lock, LogOut,
  Mail, Search, Filter, Plus, Download, Upload,
  EyeOff, Mic, RefreshCw, X, Clock, CheckCircle, AlertTriangle,
  HelpCircle, Edit
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Label,
  AreaChart, Area, LineChart, Line, Legend
} from 'recharts';

function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <div className="modal-content logout-modal" style={{ maxWidth: '400px', textAlign: 'center', padding: '2rem' }}>
        <div className="logout-icon-container">
          <LogOut size={32} color="#ef4444" />
        </div>
        <h2 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Confirm Logout</h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '2rem', lineHeight: '1.5' }}>
          Are you sure you want to log out of your account? You will need to sign in again to access the dashboard.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn-logout-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-logout-confirm" onClick={() => {
            onConfirm();
          }}>
            Confirm Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activeModule, setActiveModule, onLogout }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const icons = [
    { id: 1, icon: <LayoutDashboard size={20} /> },
    { id: 2, icon: <Box size={20} /> },
    { id: 3, icon: <FileText size={20} /> },
    { id: 4, icon: <BarChart2 size={20} /> },
    { id: 5, icon: <Users size={20} /> },
    { id: 6, icon: <CreditCard size={20} /> },
    { id: 7, icon: <Settings size={20} /> },
    { id: 8, icon: <Shield size={20} /> },
    { id: 9, icon: <Lock size={20} /> },
    { id: 10, icon: <LogOut size={20} /> }
  ];

  const handleIconClick = (id) => {
    if (id === 10) {
      setIsLogoutModalOpen(true);
    } else {
      setActiveModule(id);
    }
  };

  return (
    <>
      <aside className="sidebar">
        {icons.map((item) => (
          <div
            key={item.id}
            className={`sidebar-icon ${activeModule === item.id ? 'active' : ''}`}
            onClick={() => handleIconClick(item.id)}
          >
            {item.icon}
          </div>
        ))}
      </aside>

      {isLogoutModalOpen && (
        <LogoutModal
          onCancel={() => setIsLogoutModalOpen(false)}
          onConfirm={() => {
            console.log("Logout confirmed");
            setIsLogoutModalOpen(false);
            onLogout();
          }}
        />
      )}
    </>
  );
}

function SetupEmailModal({ onClose, config, onSave }) {
  const [email, setEmail] = useState(config?.email || '');
  const [smtpHost, setSmtpHost] = useState(config?.smtpHost || '');
  const [appPassword, setAppPassword] = useState(config?.appPassword || '');
  const [smtpPort, setSmtpPort] = useState(config?.smtpPort || '587');
  const [fromEmail, setFromEmail] = useState(config?.fromEmail || '');

  const handleSave = () => {
    onSave({ email, smtpHost, appPassword, smtpPort, fromEmail });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content setup-email-modal">
        <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: '0.5rem', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Setup Email Configuration</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>Configure SMTP settings to send invoices and notifications</p>
          </div>
          <button className="btn-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="email-tabs">
          <div className="email-tab">
            <FileText size={14} style={{ marginRight: '0.35rem' }} /> 2FA Instructions
          </div>
          <div className="email-tab active">
            <Edit size={14} style={{ marginRight: '0.35rem' }} /> Configuration
          </div>
        </div>

        <div className="modal-body setup-email-body">
          <div className="email-hint-banner">
            <div className="hint-icon-box" style={{ alignSelf: 'flex-start', marginTop: '2px' }}><AlertTriangle size={14} style={{ transform: 'rotate(180deg)', color: '#3b82f6' }} /></div>
            <div className="hint-text">
              <span style={{ fontWeight: 600 }}>Tip:</span> Most fields auto-fill based on your email. Need help? Switch to the Instructions tab.
            </div>
          </div>

          <div className="grid-2-col" style={{ marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                placeholder="your-email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="field-hint">This will auto-fill other fields</div>
            </div>
            <div className="form-group">
              <label className="form-label">SMTP Host</label>
              <input
                type="text"
                className="form-input"
                placeholder="smtp.gmail.com"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
              />
              <div className="field-hint">Auto-filled based on email</div>
            </div>
          </div>

          <div className="grid-2-col" style={{ marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>App Password *</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="password"
                  className="form-input"
                  placeholder="16-character app password"
                  value={appPassword}
                  onChange={(e) => setAppPassword(e.target.value)}
                />
                <div className="icon-right"><HelpCircle size={14} /></div>
              </div>
              <div className="field-hint">From 2FA settings, not regular password</div>
            </div>
            <div className="form-group">
              <label className="form-label">SMTP Port</label>
              <input
                type="text"
                className="form-input"
                placeholder="587"
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
              />
              <div className="field-hint">Usually 587 (TLS) or 465 (SSL)</div>
            </div>
          </div>

          <div className="grid-2-col" style={{ marginBottom: '0.5rem', alignItems: 'flex-start' }}>
            <div className="form-group">
              <label className="form-label">From Email *</label>
              <input
                type="text"
                className="form-input"
                placeholder="sender@yourcompany.com"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
              />
              <div className="field-hint">Shows as sender in emails</div>
            </div>
            <div className="form-group">
              <div className="config-status-box">
                <div className="status-header">
                  <span className="status-label">Configuration Status</span>
                </div>
                <div className="status-content">
                  <div className="status-indicator">
                    <span className="status-dot orange"></span> Not Configured
                  </div>
                  <a href="#" className="help-link">Need help?</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="modal-footer email-footer">
          <div className="footer-note">* Required fields. Host/Port are optional.</div>
          <div className="footer-actions">
            <button className="btn-cancel-dark" onClick={onClose}>Cancel</button>
            <button className="btn-save-email" onClick={handleSave}><Mail size={14} style={{ marginRight: '0.35rem' }} /> Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateVendorModal({ onClose, onAddVendor }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [limit, setLimit] = useState('');
  const [status, setStatus] = useState('Active');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      onAddVendor({
        id: Math.floor(Math.random() * 1000).toString(),
        name,
        contact,
        email,
        phone,
        status,
        limit: limit || 'Not Set'
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content invoice-modal" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2>Create New Vendor</h2>
          <button className="btn-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Vendor Name *</label>
                  <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person</label>
                  <input type="text" className="form-input" value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
              </div>
              <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="grid-2-col">
                <div className="form-group">
                  <label className="form-label">PO Limit</label>
                  <input type="text" className="form-input" placeholder="e.g. ₹50,000" value={limit} onChange={(e) => setLimit(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: '#f8fafc' }}>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.375rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Create Vendor</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CreatePurchaseOrderModal({ onClose, onAddPO, vendors }) {
  const [poNumber, setPoNumber] = useState(`PO-${Math.floor(1000 + Math.random() * 9000)}`);
  const [vendorId, setVendorId] = useState('');
  const [poDate, setPoDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedVendor = vendors.find(v => v.id === vendorId);
    if (vendorId && total) {
      onAddPO({
        id: poNumber,
        vendor: selectedVendor?.name || 'Unknown',
        date: poDate,
        delivery: deliveryDate || 'TBD',
        status,
        total: `₹${parseFloat(total).toLocaleString()}`
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content invoice-modal" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2>New Purchase Order</h2>
          <button className="btn-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">PO Number *</label>
                  <input type="text" className="form-input" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Select Vendor *</label>
                  <select className="form-input" value={vendorId} onChange={(e) => setVendorId(e.target.value)} required>
                    <option value="">Choose a vendor</option>
                    {vendors.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">PO Date *</label>
                  <input type="date" className="form-input" value={poDate} onChange={(e) => setPoDate(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Expected Delivery</label>
                  <input type="date" className="form-input" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                </div>
              </div>
              <div className="grid-2-col">
                <div className="form-group">
                  <label className="form-label">Total Amount (₹) *</label>
                  <input type="number" className="form-input" placeholder="0.00" value={total} onChange={(e) => setTotal(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: '#f8fafc' }}>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.375rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Generate PO</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Topbar({ user, emailConfig, onSaveEmailConfig }) {
  const [isSetupEmailOpen, setIsSetupEmailOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          Shnoor
          <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500, alignSelf: 'flex-end', marginBottom: '2px' }}>Invoicing Platform</span>
        </div>
        <Menu size={20} style={{ color: '#64748b', marginLeft: '1rem', cursor: 'pointer' }} />
      </div>

      <div className="topbar-right">
        <button
          className="btn-primary"
          style={{ backgroundColor: emailConfig?.email ? '#10b981' : '#2563eb' }}
          onClick={() => setIsSetupEmailOpen(true)}
        >
          <Mail size={16} /> {emailConfig?.email ? 'Email Configured' : 'Setup Email'}
        </button>
        <div className="user-profile">
          <div className="avatar">{user.email ? user.email.charAt(0).toUpperCase() : 'U'}</div>
          {user.email}
        </div>
      </div>
      {isSetupEmailOpen && (
        <SetupEmailModal
          onClose={() => setIsSetupEmailOpen(false)}
          config={emailConfig}
          onSave={onSaveEmailConfig}
        />
      )}
    </header>
  );
}

// ------ Dashboard Sub-Tabs ------

function ProductsOverviewTab() {
  const priceData = [
    { name: '₹15,000', value: 1 }
  ];

  const gstData = [
    { name: '18% GST', value: 100 }
  ];
  const COLORS = ['#3b82f6'];

  return (
    <>
      <div className="metrics-grid">
        <div className="metric-card blue">
          <div className="metric-label">Total Products</div>
          <div className="metric-value">1</div>
          <div className="metric-sub">1 GST categories</div>
        </div>

        <div className="metric-card purple">
          <div className="metric-label">Avg. Product Price</div>
          <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#8b5cf6' }}>₹15,000</div>
          <div style={{ fontSize: '0.75rem', color: '#8b5cf6' }}>Range: ₹15,000 - ₹15,000</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">Price Distribution</div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} domain={[0, 1]} tickCount={5} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={300} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">GST Distribution</div>
          <div className="chart-container" style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gstData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 30;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text x={x} y={y} fill="#3b82f6" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight={500}>
                        {gstData[index].name}: {value.toFixed(1)}%
                      </text>
                    );
                  }}
                  labelLine={false}
                >
                  {gstData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

function InvoicesAndPaymentsTab() {
  const invoiceStatusData = [
    { name: 'Paid', value: 42.3 },
    { name: 'Unpaid', value: 57.7 }
  ];
  const COLORS = ['#0d9488', '#a855f7'];

  return (
    <>
      <div className="metrics-grid-4">
        <div className="metric-card green">
          <div className="metric-label">Total Invoices</div>
          <div className="metric-value">26</div>
          <div className="metric-sub">42.3% Paid | 26 clients</div>
        </div>

        <div className="metric-card yellow">
          <div className="metric-label">Total Revenue</div>
          <div className="metric-value">₹2,57,639</div>
          <div className="metric-sub">All clients | 0 payment methods</div>
        </div>

        <div className="metric-card teal">
          <div className="metric-label">Paid Amount</div>
          <div className="metric-value">₹1,03,352</div>
          <div className="metric-sub">11 paid invoices</div>
        </div>

        <div className="metric-card red">
          <div className="metric-label">Pending Amount</div>
          <div className="metric-value">₹1,54,287</div>
          <div className="metric-sub">0 unpaid invoices</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">Invoice Status Distribution</div>
          <div className="chart-container" style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={invoiceStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  dataKey="value"
                  labelLine={false}
                  label={false}
                >
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">Payment Methods (Paid Invoices)</div>
          <div className="chart-container">
            <div className="empty-state">No payment method data available</div>
          </div>
        </div>
      </div>
    </>
  );
}

function InvoiceTimeSeriesTab() {
  const countsData = [
    { name: 'Dec 2025', count: 13 },
    { name: 'Jan 2026', count: 10 },
    { name: 'Feb 2026', count: 4 }
  ];

  const analysisData = [
    { name: 'Dec 2025', paid: 75000, pending: 60000 },
    { name: 'Jan 2026', paid: 30000, pending: 75000 },
    { name: 'Feb 2026', paid: 0, pending: 20000 }
  ];

  return (
    <>
      <div className="filter-bar">
        <div className="filter-group">
          <label className="filter-label">Granularity</label>
          <select className="filter-input" defaultValue="Monthly">
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Start Date</label>
          <input type="date" className="filter-input" defaultValue="2025-04-01" />
        </div>
        <div className="filter-group">
          <label className="filter-label">End Date</label>
          <input type="date" className="filter-input" defaultValue="2026-04-01" />
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">Invoice Counts Over Time</div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={countsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} domain={[0, 16]} tickCount={5} />
                <Area type="monotone" dataKey="count" stroke="#818cf8" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">Revenue Analysis Over Time</div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analysisData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 80000]}
                  tickCount={5}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="paid" name="Paid Revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: 'white', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="pending" name="Pending Amount" stroke="#f97316" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 4, fill: 'white', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductsPerformanceTab() {
  const revenueData = [
    { name: 'Premium Service', revenue: 15000 }
  ];

  const quantityData = [
    { name: 'Premium Service', quantity: 1 }
  ];

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <div className="chart-header">Top Products by Revenue</div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} layout="vertical" margin={{ top: 10, right: 30, left: 30, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tickFormatter={(val) => `₹${val.toLocaleString()}`}
                domain={[0, 16000]}
                tickCount={5}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
              />
              <Bar dataKey="revenue" fill="#14b8a6" radius={[0, 4, 4, 0]} maxBarSize={150} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">Top Products by Quantity Sold</div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quantityData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b', angle: -45, textAnchor: 'end' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                domain={[0, 1]}
                tickCount={5}
              />
              <Bar dataKey="quantity" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={300} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ------ Dashboard Page ------

function DashboardContent() {
  const [activeTab, setActiveTab] = useState(3);

  const tabs = [
    "Products Overview",
    "Invoices & Payments",
    "Invoice Time Series",
    "Products Performance",
    "Expenses Overview",
    "Expense Analysis",
    "Financial Summary"
  ];

  return (
    <main className="dashboard-content">
      <div className="dashboard-header">
        <div className="header-text">
          <h1>Accountant Overview Dashboard</h1>
          <p className="subtitle">Track performance, finances, and activity at a glance. Your financial snapshot in one unified view</p>
        </div>
        <button className="btn-outline">Refresh All Data</button>
      </div>

      <div className="tabs-container">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            className={`tab ${idx === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </div>
        ))}
      </div>

      {activeTab === 0 && <ProductsOverviewTab />}
      {activeTab === 1 && <InvoicesAndPaymentsTab />}
      {activeTab === 2 && <InvoiceTimeSeriesTab />}
      {activeTab === 3 && <ProductsPerformanceTab />}
      {activeTab > 3 && (
        <div className="empty-state" style={{ marginTop: '2rem' }}>
          Content for {tabs[activeTab]} is not available yet.
        </div>
      )}
    </main>
  );
}

// ------ Products Management Page ------

function AddProductModal({ onClose, onAddProduct }) {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [gstRate, setGstRate] = useState(18);
  const [unitPrice, setUnitPrice] = useState('');

  return (
    <div className="modal-overlay">
      <div className="modal-content invoice-modal" style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h2>Add New Product</h2>
          <button className="btn-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body">
          <div className="form-section" style={{ marginBottom: 0 }}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Premium Consulting Service"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                placeholder="Brief description of the product or service"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">GST Rate (%) *</label>
                <select
                  className="form-input"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                >
                  <option value={0}>0% GST</option>
                  <option value={5}>5% GST</option>
                  <option value={12}>12% GST</option>
                  <option value={18}>18% GST</option>
                  <option value={28}>28% GST</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Unit Price (₹) *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0.00"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: '#f8fafc' }}>
          <button className="btn-cancel" onClick={onClose} style={{ padding: '0.4rem 1rem', border: '1px solid #cbd5e1', backgroundColor: 'white', borderRadius: '0.375rem', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>Cancel</button>
          <button className="btn-submit" onClick={() => {
            if (productName && unitPrice) {
              onAddProduct({
                id: Math.floor(Math.random() * 1000).toString(),
                name: productName,
                desc: description,
                gst: gstRate + '%',
                price: `₹${parseFloat(unitPrice).toFixed(2)}`
              });
            }
            onClose();
          }} style={{ padding: '0.4rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer' }}>Add Product</button>
        </div>
      </div>
    </div>
  );
}

function ProductsPage({ products, onAddProduct, onDeleteProduct }) {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  return (
    <main className="dashboard-content products-page">
      <div className="products-header">
        <div className="header-text">
          <h1>Products Management</h1>
          <p className="subtitle">Manage products, pricing, GST, and Excel operations</p>
        </div>
        <div className="total-products-badge">
          <div className="label">Total Products</div>
          <div className="value">{products.length}</div>
        </div>
      </div>

      <div className="products-toolbar">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input type="text" className="search-input" placeholder="Search name or description..." />
        </div>
        <div className="toolbar-buttons">
          <button className="btn-filter"><Filter size={16} /> Filters</button>
          <button className="btn-action" onClick={() => setIsAddProductModalOpen(true)}><Plus size={16} /> Add Product</button>
          <button className="btn-export"><Download size={16} /> Export Excel</button>
          <button className="btn-import"><Upload size={16} /> Import Excel</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" /></th>
              <th style={{ width: '80px' }}>SR. NO</th>
              <th>PRODUCT NAME</th>
              <th>DESCRIPTION</th>
              <th>GST (%)</th>
              <th>UNIT PRICE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod.id}>
                <td><input type="checkbox" /></td>
                <td>{index + 1}</td>
                <td style={{ fontWeight: 600, color: '#1e293b' }}>{prod.name}</td>
                <td style={{ color: '#64748b' }}>{prod.desc}</td>
                <td>{prod.gst}</td>
                <td style={{ fontWeight: 600 }}>{prod.price}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete" onClick={() => onDeleteProduct(prod.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-controls">
          <button className="btn-page" disabled>&larr; Previous</button>
          <div className="page-number">1</div>
          <button className="btn-page" disabled>Next &rarr;</button>
        </div>
        <div className="pagination-text">{products.length} products</div>
      </div>

      {isAddProductModalOpen && <AddProductModal onClose={() => setIsAddProductModalOpen(false)} onAddProduct={onAddProduct} />}
    </main>
  );
}

// ------ Invoices Management Page ------

function CreateInvoiceModal({ onClose, onAddInvoice }) {
  // Step 1: Identity & Currency
  const [companyLogo, setCompanyLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [currency, setCurrency] = useState('INR');

  // Step 2: Information & Bank Details
  const [address, setAddress] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [dueDate, setDueDate] = useState('01-05-2026');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [status, setStatus] = useState('Unpaid');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [branchAddress, setBranchAddress] = useState('');

  // Step 3: Products & Summary
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [gstRate, setGstRate] = useState(0);
  const [description, setDescription] = useState('');

  const subTotal = quantity * unitPrice;
  const gstAmount = subTotal * (gstRate / 100);
  const totalAmount = subTotal + gstAmount;

  const currencySign = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : 'ر.ع ');

  const handleSubmit = () => {
    onAddInvoice({
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      clientName: clientName || 'Walk-in Client',
      email: clientEmail || '-',
      date: new Date().toLocaleDateString('en-GB'),
      dueDate: dueDate,
      status: status,
      subTotal: `${currencySign}${subTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      gstTotal: `${currencySign}${gstAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      total: `${currencySign}${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
    });
    onClose();
  };

  const [isRecording, setIsRecording] = useState(false);
  const handleVoiceFill = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setClientName('John Doe');
      setClientEmail('john@example.com');
      setProductName('Premium Consulting');
      setUnitPrice(15000);
      setGstRate(18);
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content invoice-modal">
        <div className="modal-header">
          <h2>Create Invoice</h2>
          <div className="modal-header-actions">
            <button
              className={`btn-voice-fill ${isRecording ? 'recording' : ''}`}
              onClick={handleVoiceFill}
            >
              <Mic size={14} /> {isRecording ? 'Listening...' : 'Voice Fill'}
            </button>
            <button className="btn-refresh"><RefreshCw size={14} /> Refreshing...</button>
            <button className="btn-close" onClick={onClose}><X size={18} /></button>
          </div>
        </div>

        <div className="modal-body">
          <div className="voice-fill-hint">
            <div className="hint-title"><Mic size={14} /> Voice Fill — Speak to auto-fill required (*) fields:</div>
            <div className="hint-example">"John john@gmail.com 5 laptops 50000 gst 18 Mumbai"</div>
            <div className="hint-fields">
              <span className="fill-dot"></span> Clients: Client Name*, Email*
              <span className="fill-dot"></span> Product*: Product*, Qty*, Price*, GST*
              <span className="fill-dot"></span> Manual: Bank Details*, Due Date*
            </div>
            <div className="hint-instruction" style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
              Click the <span style={{ fontWeight: 600, color: '#3b82f6' }}>Voice Fill</span> button to start recording. Our AI will automatically parse your voice input and populate the invoice fields for high-speed creation.
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">Client & Information</div>
            <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input type="text" className="form-input" placeholder="Enter client name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Client Email *</label>
                <input type="email" className="form-input" placeholder="client@example.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
              </div>
            </div>
            {/* Identity & Currency */}
            <div className="section-header">Identity & Currency</div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Company Logo (Optional)</label>
              <div className="file-upload">
                <button className="btn-choose">Choose File</button>
                <span className="file-name">No file chosen</span>
              </div>
              <div className="field-hint">Only PNG files allowed (max 5MB). Logo will appear on generated invoices.</div>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Authorized Signature (Optional)</label>
              <div className="file-upload">
                <button className="btn-choose">Choose File</button>
                <span className="file-name">No file chosen</span>
              </div>
              <div className="field-hint">Only PNG files allowed (max 5MB). Signature will appear on "Paid" invoices.</div>
            </div>

            <div className="form-group">
              <label className="form-label">Invoice Currency</label>
              <div className="currency-toggles">
                <button className={`btn-curr ${currency === 'INR' ? 'active' : ''}`} onClick={() => setCurrency('INR')}>₹ INR</button>
                <button className={`btn-curr ${currency === 'USD' ? 'active' : ''}`} onClick={() => setCurrency('USD')}>$ USD</button>
                <button className={`btn-curr ${currency === 'OMR' ? 'active' : ''}`} onClick={() => setCurrency('OMR')}>ر.ع OMR</button>
                <span className="base-currency-badge">Base currency</span>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="form-section">
            <div className="section-header">Information & Billing</div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Address</label>
              <textarea
                className="form-textarea"
                placeholder="Type address or select from suggestions"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="field-hint">Start typing for suggestions. Full address of client.</div>
            </div>

            <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Due Date *</label>
                <input type="date" className="form-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select className="form-input" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="">Select Payment Method</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="card">Credit Card</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Status *</label>
              <select className="form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="bank-details-box">
              <div className="box-title">Bank Details * <span className="req-hint">(Required for all invoices)</span></div>
              <div className="grid-2-col">
                <div className="form-group">
                  <label className="form-label">Bank Name *</label>
                  <input type="text" className="form-input" placeholder="Type bank name or select from suggestions" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Account Number *</label>
                  <input type="text" className="form-input" placeholder="Type account number..." value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                </div>
              </div>
              <div className="grid-2-col" style={{ marginTop: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">IFSC Code *</label>
                  <input type="text" className="form-input" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Branch Address *</label>
                  <input type="text" className="form-input" value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="form-section">
            <div className="section-header">Products & Line Items</div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Select Product (Optional)</label>
              <select className="form-input">
                <option>Select existing or enter new</option>
                <option>Premium Service</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Quantity *</label>
                <input
                  type="number"
                  className="form-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Unit Price *</label>
                <input
                  type="number"
                  className="form-input"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">GST Rate *</label>
                <select
                  className="form-input"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                >
                  <option value="0">0% GST</option>
                  <option value="5">5% GST</option>
                  <option value="12">12% GST</option>
                  <option value="18">18% GST</option>
                  <option value="28">28% GST</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Line Total</label>
                <input
                  type="text"
                  className="form-input"
                  readOnly
                  value={`${currencySign}${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description (Optional)</label>
              <textarea
                className="form-textarea"
                placeholder="Enter product description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="invoice-summary-section">
            <div className="summary-title">Final Invoice Summary</div>
            <div className="summary-list">
              <div className="summary-item">
                <span>Subtotal</span>
                <span>{currencySign}{subTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="summary-item">
                <span>GST ({gstRate}%)</span>
                <span>{currencySign}{gstAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="summary-item grand-total">
                <span>Total Amount</span>
                <span>{currencySign}{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit}>
            Create Invoice ({currency})
          </button>
        </div>
      </div>
    </div>
  );
}

function InvoicesPage({ invoices, onAddInvoice, onDeleteInvoice }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="dashboard-content products-page">
      <div className="products-header">
        <div className="header-text">
          <h1>Invoices Management</h1>
          <p className="subtitle">Track, manage and generate professional invoices for your clients</p>
        </div>
        <div className="total-products-badge">
          <div className="label">Total Invoices</div>
          <div className="value">{invoices.length}</div>
        </div>
      </div>
      <div className="products-toolbar" style={{ justifyContent: 'space-between', marginTop: '1rem' }}>
        <div className="search-container" style={{ maxWidth: '400px', flex: 'none' }}>
          <Search size={18} className="search-icon" />
          <input type="text" className="search-input" placeholder="Search by email or company..." />
        </div>
        <div className="toolbar-buttons">
          <button className="btn-hidden"><EyeOff size={16} /> Hidden</button>
          <button className="btn-filter"><Filter size={16} /> Filters</button>
          <button className="btn-create-invoice" onClick={() => setIsModalOpen(true)}><Plus size={16} /> Create Invoice</button>
          <button className="btn-export"><Download size={16} /> Export Excel</button>
          <button className="btn-filter"><Upload size={16} /> Import Excel</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table invoice-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>INVOICE ID</th>
              <th>CLIENT NAME</th>
              <th>CLIENT EMAIL</th>
              <th>ISSUE DATE</th>
              <th>DUE DATE</th>
              <th>SUB TOTAL</th>
              <th>GST TOTAL</th>
              <th style={{ textAlign: 'right' }}>TOTAL AMOUNT</th>
              <th>STATUS</th>
              <th style={{ textAlign: 'center', width: '220px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? invoices.map((inv) => (
              <tr key={inv.id}>
                <td><input type="checkbox" /></td>
                <td>#INV-{inv.id}</td>
                <td style={{ fontWeight: 600, color: '#1e293b' }}>{inv.clientName}</td>
                <td style={{ color: '#3b82f6' }}>{inv.email}</td>
                <td style={{ color: '#64748b' }}>{inv.date}</td>
                <td style={{ color: '#64748b' }}>{inv.dueDate}</td>
                <td style={{ fontWeight: 600 }}>{inv.subTotal || inv.total}</td>
                <td style={{ fontWeight: 600 }}>{inv.gstTotal || '₹0.00'}</td>
                <td style={{ fontWeight: 600, textAlign: 'right' }}>{inv.total}</td>
                <td>
                  <span className={`status-badge ${inv.status.toLowerCase()}`}>{inv.status}</span>
                </td>
                <td>
                  <div className="invoice-actions">
                    <button className="action-btn view">View</button>
                    <button className="action-btn delete" onClick={() => onDeleteInvoice(inv.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="11" style={{ padding: '5rem 0', textAlign: 'center', backgroundColor: '#fff' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No invoices yet</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.75rem', marginTop: '0.5rem' }}>Create your first invoice to see it here</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container" style={{ paddingTop: '1rem' }}>
        <div className="pagination-text" style={{ marginRight: 'auto', marginLeft: '1rem' }}>Showing 1 to {invoices.length} of {invoices.length} results</div>
      </div>

      {isModalOpen && <CreateInvoiceModal onClose={() => setIsModalOpen(false)} onAddInvoice={onAddInvoice} />}
    </main>
  );
}

// ------ Container App ------

function CreateExpenseModal({ onClose, onAddExpense }) {
  const [category, setCategory] = useState('Travel');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className="modal-overlay">
      <div className="modal-content invoice-modal" style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h2>Create New Expense</h2>
          <button className="btn-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body">
          <div className="form-section" style={{ marginBottom: 0 }}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Category *</label>
              <select
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Travel">Travel</option>
                <option value="Marketing">Marketing</option>
                <option value="Internet">Internet</option>
                <option value="Software License">Software License</option>
                <option value="Office Rent">Office Rent</option>
                <option value="Cloud Services">Cloud Services</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                placeholder="Details about the expense"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid-2-col" style={{ marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Amount (₹) *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: '#f8fafc' }}>
          <button className="btn-cancel" onClick={onClose} style={{ padding: '0.4rem 1rem', border: '1px solid #cbd5e1', backgroundColor: 'white', borderRadius: '0.375rem', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>Cancel</button>
          <button className="btn-submit" onClick={() => {
            if (amount && date) {
              onAddExpense({
                id: Math.floor(Math.random() * 1000).toString(),
                category: category,
                desc: description,
                amount: `₹${parseFloat(amount).toFixed(2)}`,
                date: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              });
            }
            onClose();
          }} style={{ padding: '0.4rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer' }}>Create Expense</button>
        </div>
      </div>
    </div>
  );
}

function ExpensesPage({ expenses, onAddExpense, onDeleteExpense }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryClass = (cat) => {
    const map = {
      'Travel': 'badge-travel',
      'Marketing': 'badge-marketing',
      'Internet': 'badge-internet',
      'Software License': 'badge-software',
      'Office Rent': 'badge-office',
      'Cloud Services': 'badge-cloud'
    };
    return map[cat] || 'badge-default';
  };

  return (
    <main className="dashboard-content products-page">
      <div className="products-header">
        <div className="header-text">
          <h1>Expense Management</h1>
          <p className="metric-sub">Track, manage and export your business expenses</p>
        </div>
        <div className="total-products-badge">
          <div className="label">TOTAL EXPENSES</div>
          <div className="value">{expenses.length}</div>
        </div>
      </div>

      <div className="products-toolbar">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input type="text" className="search-input" placeholder="Search by category, ID or description..." />
        </div>
        <div className="toolbar-buttons">
          <button className="btn-filter"><Filter size={16} /> Filters</button>
          <button className="btn-action" onClick={() => setIsModalOpen(true)}><Plus size={16} /> Create Expense</button>
          <button className="btn-export"><Download size={16} /> Export Excel</button>
          <button className="btn-filter"><Upload size={16} /> Import Excel</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>EXPENSE ID</th>
              <th>CATEGORY</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
              <th>DATE</th>
              <th style={{ textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? expenses.map((exp) => (
              <tr key={exp.id}>
                <td><input type="checkbox" /></td>
                <td style={{ fontWeight: 700 }}>{exp.id}</td>
                <td><span className={`status-badge ${getCategoryClass(exp.category)}`}>{exp.category}</span></td>
                <td style={{ color: '#64748b' }}>{exp.desc}</td>
                <td style={{ fontWeight: 700 }}>{exp.amount}</td>
                <td style={{ color: '#64748b' }}>{exp.date}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                    <button className="action-btn view">View</button>
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn download">Download</button>
                    <button className="action-btn delete" onClick={() => onDeleteExpense(exp.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" style={{ padding: '5rem 0', textAlign: 'center', backgroundColor: '#fff' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No expenses recorded</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && <CreateExpenseModal onClose={() => setIsModalOpen(false)} onAddExpense={onAddExpense} />}
    </main>
  );
}

function PurchaseOrdersPage({ purchaseOrders, vendors, onAddPO, onDeletePO }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const summaryCards = [
    { title: 'Total Orders', count: purchaseOrders.length, icon: <FileText size={20} />, color: 'blue' },
    { title: 'Pending Approval', count: purchaseOrders.filter(p => p.status === 'Pending').length, icon: <Clock size={20} />, color: 'yellow' },
    { title: 'Approved', count: purchaseOrders.filter(p => p.status === 'Approved').length, icon: <CheckCircle size={20} />, color: 'green' },
    { title: 'Overdue', count: '0', icon: <AlertTriangle size={20} />, color: 'red' },
  ];

  return (
    <main className="dashboard-content products-page">
      <div className="products-header">
        <div className="header-text">
          <h1>Purchase Orders Management</h1>
          <p className="metric-sub">Manage and track all vendor purchase orders</p>
        </div>
        <div className="total-products-badge">
          <div className="label">TOTAL PURCHASE ORDERS</div>
          <div className="value">{purchaseOrders.length}</div>
        </div>
      </div>

      <div className="po-summary-grid">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={`po-card po-card-${card.color}`}>
            <div className="po-card-icon">{card.icon}</div>
            <div className="po-card-content">
              <div className="po-card-label">{card.title}</div>
              <div className="po-card-value">{card.count}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="products-toolbar po-toolbar">
        <div className="search-container po-search">
          <Search size={18} className="search-icon" />
          <input type="text" className="search-input" placeholder="Search by PO number..." />
        </div>
        <div className="toolbar-buttons po-buttons">
          <button className="btn-action btn-po" onClick={() => setIsModalOpen(true)}><Plus size={16} /> New Purchase Order</button>
          <select className="po-select">
            <option>All Statuses</option>
          </select>
          <select className="po-select">
            <option>All Vendors</option>
          </select>
          <button className="btn-export po-alt-btn"><Download size={16} /> Export Excel</button>
          <button className="btn-filter po-alt-btn"><Upload size={16} /> Import Excel</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>PO NUMBER</th>
              <th>VENDOR</th>
              <th>PO DATE</th>
              <th>DELIVERY</th>
              <th>STATUS</th>
              <th>TOTAL</th>
              <th style={{ textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.length > 0 ? purchaseOrders.map((po) => (
              <tr key={po.id}>
                <td style={{ fontWeight: 600, color: '#3b82f6' }}>{po.id}</td>
                <td>{po.vendor}</td>
                <td>{po.date}</td>
                <td>{po.delivery}</td>
                <td><span className={`status-badge ${po.status.toLowerCase()}`}>{po.status}</span></td>
                <td style={{ fontWeight: 600 }}>{po.total}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                    <button className="action-btn view">View</button>
                    <button className="action-btn delete" onClick={() => onDeletePO(po.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" style={{ padding: '5rem 0', textAlign: 'center', backgroundColor: '#fff' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No purchase orders yet</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.75rem', marginTop: '0.5rem' }}>Create your first PO to get started</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && <CreatePurchaseOrderModal onClose={() => setIsModalOpen(false)} vendors={vendors} onAddPO={onAddPO} />}
    </main>
  );
}

function VendorManagementPage({ vendors, onAddVendor, onDeleteVendor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="dashboard-content products-page">
      <div className="products-header">
        <div className="header-text">
          <h1>Vendor Management</h1>
          <p className="metric-sub">Manage vendor details and transactions efficiently</p>
        </div>
        <div className="total-products-badge">
          <div className="label">TOTAL VENDORS</div>
          <div className="value">{vendors.length}</div>
        </div>
      </div>

      <div className="products-toolbar">
        <div className="search-container" style={{ maxWidth: '420px' }}>
          <Search size={18} className="search-icon" />
          <input type="text" className="search-input" placeholder="Search by vendor, email, phone..." />
        </div>
        <div className="toolbar-buttons">
          <button className="btn-filter"><Filter size={16} /> Filters</button>
          <button className="btn-action" onClick={() => setIsModalOpen(true)}><Plus size={16} /> Create Vendor</button>
          <button className="btn-export"><Download size={16} /> Export Excel</button>
          <button className="btn-filter"><Upload size={16} /> Import Excel</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>VENDOR</th>
              <th>CONTACT PERSON</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>STATUS</th>
              <th>PO LIMIT</th>
              <th style={{ textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="vendor-cell">
                    <div className="vendor-avatar"><User size={16} /></div>
                    <div className="vendor-info">
                      <div className="vendor-name">{v.name}</div>
                      <div className="vendor-id">ID: {v.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: '#64748b' }}>{v.contact}</td>
                <td><a href={`mailto:${v.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>{v.email}</a></td>
                <td style={{ color: '#64748b' }}>{v.phone}</td>
                <td><span className={`status-badge ${v.status.toLowerCase()}`}>{v.status}</span></td>
                <td style={{ color: '#64748b' }}>{v.limit}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                    <button className="action-btn view" style={{ padding: '0.2rem 0.6rem' }}>View</button>
                    <button className="action-btn edit" style={{ padding: '0.2rem 0.6rem' }}>Edit</button>
                    <button className="action-btn delete" style={{ padding: '0.2rem 0.6rem' }} onClick={() => onDeleteVendor(v.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="pagination">
          <button className="btn-page">&larr; Previous</button>
          <button className="btn-page-num active">1</button>
          <button className="btn-page">Next &rarr;</button>
        </div>
        <div className="pagination-text">{vendors.length} vendors</div>
      </div>
      {isModalOpen && <CreateVendorModal onClose={() => setIsModalOpen(false)} onAddVendor={onAddVendor} />}
    </main>
  );
}

function App() {
  const [activeModule, setActiveModule] = useState(1);
  const [user, setUser] = useState({ email: 'accountant@shnoor.com' });
  const [emailConfig, setEmailConfig] = useState(null);
  const [vendors, setVendors] = useState([
    { id: '18', name: 'lms.shnoor.com', contact: 'Janjanam Lakshman babu', email: 'lakshman@shnoor.com', phone: '08688456559', status: 'Pending', limit: 'Not Set' }
  ]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([
    { id: '1', name: 'Premium Service', desc: 'Standard professional consulting', gst: '18%', price: '₹15,000.00' }
  ]);
  const [expenses, setExpenses] = useState([
    { id: '309', category: 'Travel', desc: 'Monthly business expense 15', amount: '₹546.00', date: '10 Dec 2025' },
    { id: '308', category: 'Marketing', desc: 'Monthly business expense 14', amount: '₹2,185.00', date: '7 Jan 2026' },
    { id: '307', category: 'Internet', desc: 'Monthly business expense 13', amount: '₹1,137.00', date: '1 Feb 2026' },
    { id: '306', category: 'Software License', desc: 'Monthly business expense 12', amount: '₹4,125.00', date: '19 Jan 2026' },
    { id: '305', category: 'Marketing', desc: 'Monthly business expense 11', amount: '₹3,725.00', date: '26 Jan 2026' },
    { id: '304', category: 'Office Rent', desc: 'Monthly business expense 10', amount: '₹11,262.00', date: '21 Dec 2025' },
    { id: '303', category: 'Cloud Services', desc: 'Monthly business expense 9', amount: '₹5,139.00', date: '20 Dec 2025' },
  ]);

  const handleLogout = () => {
    // Simply reset user or handle session
    console.log("Logging out...");
  };

  return (
    <div className="app-container">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        onLogout={handleLogout}
      />
      <div className="main-content">
        <Topbar
          user={user}
          emailConfig={emailConfig}
          onSaveEmailConfig={setEmailConfig}
        />
        {activeModule === 1 && <DashboardContent />}
        {activeModule === 2 && (
          <ProductsPage
            products={products}
            onAddProduct={(p) => setProducts([p, ...products])}
            onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
          />
        )}
        {activeModule === 3 && (
          <InvoicesPage
            invoices={invoices}
            onAddInvoice={(inv) => setInvoices([inv, ...invoices])}
            onDeleteInvoice={(id) => setInvoices(invoices.filter(inv => inv.id !== id))}
          />
        )}
        {activeModule === 4 && (
          <ExpensesPage
            expenses={expenses}
            onAddExpense={(exp) => setExpenses([exp, ...expenses])}
            onDeleteExpense={(id) => setExpenses(expenses.filter(exp => exp.id !== id))}
          />
        )}
        {activeModule === 5 && (
          <VendorManagementPage
            vendors={vendors}
            onAddVendor={(v) => setVendors([v, ...vendors])}
            onDeleteVendor={(id) => setVendors(vendors.filter(v => v.id !== id))}
          />
        )}
        {activeModule === 9 && (
          <PurchaseOrdersPage
            purchaseOrders={purchaseOrders}
            vendors={vendors}
            onAddPO={(po) => setPurchaseOrders([po, ...purchaseOrders])}
            onDeletePO={(id) => setPurchaseOrders(purchaseOrders.filter(po => po.id !== id))}
          />
        )}
        {activeModule !== 1 && activeModule !== 2 && activeModule !== 3 && activeModule !== 4 && activeModule !== 5 && activeModule !== 9 && (
          <main className="dashboard-content">
            <div className="empty-state">Module not built yet.</div>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
