// ============================================
//   CRPF TENDER SHIELD — APPLICATION LOGIC
// ============================================

// ── DATA ────────────────────────────────────
const VENDORS = [
  { id: 'BID-001', name: 'Alpha Defence Pvt Ltd', category: 'Tactical Equipment', bid: 4.82, trust: 88, status: 'Qualified', experience: 12, deliveryQuality: 92, complaints: 2, compliance: 95, financial: 85 },
  { id: 'BID-002', name: 'Bharat Arms Co.', category: 'Tactical Equipment', bid: 5.10, trust: 79, status: 'Qualified', experience: 9, deliveryQuality: 80, complaints: 6, compliance: 85, financial: 78 },
  { id: 'BID-003', name: 'Frontier Logistics', category: 'Logistics', bid: 3.95, trust: 61, status: 'Review', experience: 5, deliveryQuality: 63, complaints: 12, compliance: 70, financial: 60 },
  { id: 'BID-004', name: 'SwiftDeal Traders', category: 'Logistics', bid: 2.90, trust: 34, status: 'Flagged', experience: 2, deliveryQuality: 40, complaints: 28, compliance: 35, financial: 30 },
  { id: 'BID-005', name: 'National Security Supplies', category: 'Tactical Equipment', bid: 4.67, trust: 82, status: 'Qualified', experience: 10, deliveryQuality: 85, complaints: 4, compliance: 88, financial: 80 },
  { id: 'BID-006', name: 'Pinnacle IT Systems', category: 'IT Infrastructure', bid: 1.25, trust: 74, status: 'Qualified', experience: 7, deliveryQuality: 78, complaints: 5, compliance: 80, financial: 72 },
  { id: 'BID-007', name: 'TriShield Vehicles', category: 'Vehicles', bid: 3.40, trust: 56, status: 'Review', experience: 4, deliveryQuality: 58, complaints: 15, compliance: 60, financial: 55 },
];

const DOCS = {
  'BID-001': [
    { name: 'Company Registration Certificate', status: 'verified', expiry: '2027-03-15', issuer: 'MCA India' },
    { name: 'GST Registration', status: 'verified', expiry: '2026-12-01', issuer: 'GSTN' },
    { name: 'Defence License (DPIIT)', status: 'verified', expiry: '2025-06-30', issuer: 'DPIIT' },
    { name: 'ISO 9001:2015 Certificate', status: 'verified', expiry: '2025-11-20', issuer: 'BIS India', expiring: true },
    { name: 'Bank Solvency Certificate', status: 'pending', expiry: null, issuer: 'SBI' },
    { name: 'PAN Card', status: 'verified', expiry: null, issuer: 'Income Tax Dept' },
    { name: 'Tender EMD Proof', status: 'verified', expiry: null, issuer: 'Self' },
    { name: 'Previous Contract Copies (3)', status: 'pending', expiry: null, issuer: 'Self' },
  ],
  'BID-002': [
    { name: 'Company Registration Certificate', status: 'verified', expiry: '2026-08-10', issuer: 'MCA India' },
    { name: 'GST Registration', status: 'verified', expiry: '2026-12-01', issuer: 'GSTN' },
    { name: 'Defence License (DPIIT)', status: 'missing', expiry: null, issuer: 'DPIIT' },
    { name: 'ISO 9001:2015 Certificate', status: 'verified', expiry: '2026-05-10', issuer: 'BIS India' },
    { name: 'Bank Solvency Certificate', status: 'verified', expiry: null, issuer: 'PNB' },
    { name: 'PAN Card', status: 'verified', expiry: null, issuer: 'Income Tax Dept' },
    { name: 'Tender EMD Proof', status: 'verified', expiry: null, issuer: 'Self' },
    { name: 'Previous Contract Copies (3)', status: 'verified', expiry: null, issuer: 'Self' },
  ],
  'BID-003': [
    { name: 'Company Registration Certificate', status: 'verified', expiry: '2025-12-20', issuer: 'MCA India', expiring: true },
    { name: 'GST Registration', status: 'verified', expiry: '2026-12-01', issuer: 'GSTN' },
    { name: 'Defence License (DPIIT)', status: 'missing', expiry: null, issuer: 'DPIIT' },
    { name: 'ISO 9001:2015 Certificate', status: 'missing', expiry: null, issuer: 'BIS India' },
    { name: 'Bank Solvency Certificate', status: 'pending', expiry: null, issuer: 'Bank' },
    { name: 'PAN Card', status: 'verified', expiry: null, issuer: 'Income Tax Dept' },
    { name: 'Tender EMD Proof', status: 'pending', expiry: null, issuer: 'Self' },
    { name: 'Previous Contract Copies (3)', status: 'missing', expiry: null, issuer: 'Self' },
  ],
  'BID-004': [
    { name: 'Company Registration Certificate', status: 'missing', expiry: null, issuer: 'MCA India' },
    { name: 'GST Registration', status: 'missing', expiry: null, issuer: 'GSTN' },
    { name: 'Defence License (DPIIT)', status: 'missing', expiry: null, issuer: 'DPIIT' },
    { name: 'ISO 9001:2015 Certificate', status: 'missing', expiry: null, issuer: 'BIS India' },
    { name: 'Bank Solvency Certificate', status: 'missing', expiry: null, issuer: 'Bank' },
    { name: 'PAN Card', status: 'pending', expiry: null, issuer: 'Income Tax Dept' },
    { name: 'Tender EMD Proof', status: 'missing', expiry: null, issuer: 'Self' },
    { name: 'Previous Contract Copies (3)', status: 'missing', expiry: null, issuer: 'Self' },
  ],
  'BID-005': [
    { name: 'Company Registration Certificate', status: 'verified', expiry: '2028-01-10', issuer: 'MCA India' },
    { name: 'GST Registration', status: 'verified', expiry: '2026-12-01', issuer: 'GSTN' },
    { name: 'Defence License (DPIIT)', status: 'verified', expiry: '2026-04-15', issuer: 'DPIIT' },
    { name: 'ISO 9001:2015 Certificate', status: 'verified', expiry: '2026-03-20', issuer: 'BIS India' },
    { name: 'Bank Solvency Certificate', status: 'verified', expiry: null, issuer: 'HDFC' },
    { name: 'PAN Card', status: 'verified', expiry: null, issuer: 'Income Tax Dept' },
    { name: 'Tender EMD Proof', status: 'verified', expiry: null, issuer: 'Self' },
    { name: 'Previous Contract Copies (3)', status: 'verified', expiry: null, issuer: 'Self' },
  ],
};

const RISKS = [
  { level: 'critical', icon: '🚨', title: 'Abnormally Low Bid — SwiftDeal Traders', desc: 'BID-004 quoted ₹2.90 Cr vs market benchmark of ₹4.9 Cr (41% below). Possible bid rigging, loss leader, or intent to compromise quality.', tag: 'PRICE ANOMALY · BID-004', type: 'critical' },
  { level: 'critical', icon: '🚨', title: 'Multiple Missing Documents — SwiftDeal Traders', desc: '7 out of 8 mandatory documents are missing. Vendor may be ineligible. Immediate disqualification review recommended.', tag: 'DOC FRAUD RISK · BID-004', type: 'critical' },
  { level: 'warning', icon: '⚠️', title: 'Defence License Missing — Bharat Arms Co.', desc: 'DPIIT Defence License not submitted by BID-002. This is a mandatory requirement for tactical equipment supply. Cannot qualify without this.', tag: 'COMPLIANCE BLOCK · BID-002', type: 'warning' },
  { level: 'warning', icon: '⚠️', title: 'ISO Certificate Expiring Soon — Alpha Defence', desc: 'ISO 9001:2015 certificate for BID-001 expires in 12 days. Must renew before contract award.', tag: 'DOC EXPIRY · BID-001', type: 'warning' },
  { level: 'warning', icon: '⚠️', title: 'Night Vision Goggles Price Discrepancy', desc: 'BID-003 quoted ₹38,000 vs market rate of ₹44,000 (13.6% below). Possible quality substitution or counterfeit risk.', tag: 'PRICE DISCREPANCY · ITEM', type: 'warning' },
];

const COMPLIANCE_DATA = [
  { id: 'BID-001', name: 'Alpha Defence Pvt Ltd', score: 92, conditions: [
    { name: 'EMD Submitted', status: 'met', val: '✓ Yes' },
    { name: 'Turnover ≥ ₹10 Cr', status: 'met', val: '✓ ₹24 Cr' },
    { name: 'Min Experience 5 yrs', status: 'met', val: '✓ 12 yrs' },
    { name: 'DPIIT Licence', status: 'met', val: '✓ Valid' },
    { name: 'ISO Certified', status: 'partial', val: '⚠ Expiring' },
    { name: 'GST Registered', status: 'met', val: '✓ Active' },
    { name: 'Bid Validity 120 days', status: 'met', val: '✓ 180 days' },
    { name: 'Prev. Govt Contracts', status: 'met', val: '✓ 4 contracts' },
  ]},
  { id: 'BID-002', name: 'Bharat Arms Co.', score: 75, conditions: [
    { name: 'EMD Submitted', status: 'met', val: '✓ Yes' },
    { name: 'Turnover ≥ ₹10 Cr', status: 'met', val: '✓ ₹18 Cr' },
    { name: 'Min Experience 5 yrs', status: 'met', val: '✓ 9 yrs' },
    { name: 'DPIIT Licence', status: 'fail', val: '✗ Missing' },
    { name: 'ISO Certified', status: 'met', val: '✓ Valid' },
    { name: 'GST Registered', status: 'met', val: '✓ Active' },
    { name: 'Bid Validity 120 days', status: 'met', val: '✓ 150 days' },
    { name: 'Prev. Govt Contracts', status: 'met', val: '✓ 3 contracts' },
  ]},
  { id: 'BID-004', name: 'SwiftDeal Traders', score: 18, conditions: [
    { name: 'EMD Submitted', status: 'fail', val: '✗ Not found' },
    { name: 'Turnover ≥ ₹10 Cr', status: 'fail', val: '✗ Unverified' },
    { name: 'Min Experience 5 yrs', status: 'fail', val: '✗ 2 yrs only' },
    { name: 'DPIIT Licence', status: 'fail', val: '✗ Missing' },
    { name: 'ISO Certified', status: 'fail', val: '✗ No certificate' },
    { name: 'GST Registered', status: 'partial', val: '⚠ Pending' },
    { name: 'Bid Validity 120 days', status: 'fail', val: '✗ Not stated' },
    { name: 'Prev. Govt Contracts', status: 'fail', val: '✗ None found' },
  ]},
];

// ── UTILITIES ────────────────────────────────
function getTrustColor(score) {
  if (score >= 75) return '#00e676';
  if (score >= 55) return '#ffd600';
  return '#ff3c3c';
}

function getStatusTag(status) {
  const map = { Qualified: 'green', Review: 'yellow', Flagged: 'red', Disqualified: 'red' };
  return `<span class="status-tag ${map[status] || 'yellow'}">${status}</span>`;
}

// ── CLOCK ────────────────────────────────────
function updateClock() {
  const now = new Date();
  document.getElementById('liveClock').textContent =
    now.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) + ' ' +
    now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// ── SIDEBAR / TABS ───────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  document.getElementById('breadcrumb').textContent = tab.replace(/\b\w/g, l => l.toUpperCase());
  if (tab === 'trust') renderTrustLeaderboard();
  if (tab === 'compliance') renderCompliance();
  if (tab === 'risk') renderRisk();
  if (tab === 'price') renderPriceDeviation();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function toggleAlerts() {
  const p = document.getElementById('alertPanel');
  p.style.display = p.style.display === 'none' ? 'flex' : 'none';
}

// ── KPI COUNTER ANIMATION ────────────────────
function animateKPIs() {
  document.querySelectorAll('.kpi-value[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current) + suffix;
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

// ── VENDOR GRID ──────────────────────────────
function renderVendors(list = VENDORS) {
  const grid = document.getElementById('vendorGrid');
  grid.innerHTML = list.map(v => {
    const color = getTrustColor(v.trust);
    return `
      <div class="vendor-card ${v.status === 'Flagged' ? 'flagged' : ''}" onclick="viewVendorDetail('${v.id}')">
        <div class="vc-header">
          <div>
            <div class="vc-id">${v.id}</div>
            <div class="vc-name">${v.name}</div>
          </div>
          ${getStatusTag(v.status)}
        </div>
        <div class="vc-cat">${v.category}</div>
        <div class="vc-metrics">
          <div class="vc-metric">
            <div class="vc-metric-label">Bid (₹ Cr)</div>
            <div class="vc-metric-val" style="color:var(--cyan)">₹${v.bid}</div>
          </div>
          <div class="vc-metric">
            <div class="vc-metric-label">Trust Score</div>
            <div class="vc-metric-val" style="color:${color}">${v.trust}</div>
          </div>
          <div class="vc-metric">
            <div class="vc-metric-label">Experience</div>
            <div class="vc-metric-val" style="color:var(--text-primary)">${v.experience}y</div>
          </div>
        </div>
        <div class="vc-trust-bar">
          <div class="vc-trust-fill" style="width:${v.trust}%;background:${color}"></div>
        </div>
      </div>`;
  }).join('');
}

function filterVendors(q) {
  const filtered = VENDORS.filter(v =>
    v.name.toLowerCase().includes(q.toLowerCase()) || v.id.toLowerCase().includes(q.toLowerCase())
  );
  renderVendors(filtered);
}

function filterByStatus(s) {
  renderVendors(s ? VENDORS.filter(v => v.status === s) : VENDORS);
}

function viewVendorDetail(id) {
  const v = VENDORS.find(x => x.id === id);
  if (!v) return;
  alert(`Vendor: ${v.name}\nID: ${v.id}\nBid: ₹${v.bid} Cr\nTrust Score: ${v.trust}/100\nStatus: ${v.status}\nExperience: ${v.experience} years`);
}

function openAddVendor() {
  document.getElementById('addVendorModal').style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function addVendor() {
  const name = document.getElementById('newVendorName').value.trim();
  const cat = document.getElementById('newVendorCat').value;
  const bid = parseFloat(document.getElementById('newVendorBid').value) || 0;
  if (!name) { alert('Please enter company name.'); return; }
  const newId = 'BID-' + String(VENDORS.length + 1).padStart(3, '0');
  const trust = Math.floor(Math.random() * 30 + 40);
  VENDORS.push({ id: newId, name, category: cat, bid, trust, status: 'Review', experience: 0, deliveryQuality: 50, complaints: 10, compliance: 50, financial: 50 });
  closeModal('addVendorModal');
  renderVendors();
}

// ── DOCUMENT VERIFICATION ───────────────────
function loadVendorDocs(vendorId) {
  const container = document.getElementById('docChecklistContainer');
  if (!vendorId || !DOCS[vendorId]) {
    container.innerHTML = '<div class="empty-state">Select a vendor to view document checklist</div>';
    return;
  }
  const docs = DOCS[vendorId];
  const counts = docs.reduce((acc, d) => { acc[d.status] = (acc[d.status] || 0) + 1; return acc; }, {});
  container.innerHTML = `
    <div style="display:flex;gap:14px;margin-bottom:16px">
      <span style="color:var(--green);font-size:13px">✓ Verified: ${counts.verified || 0}</span>
      <span style="color:var(--yellow);font-size:13px">⏳ Pending: ${counts.pending || 0}</span>
      <span style="color:var(--red);font-size:13px">✗ Missing: ${counts.missing || 0}</span>
    </div>
    <div class="doc-checklist">
      ${docs.map((d, i) => docItem(d, i)).join('')}
    </div>`;
}

function docItem(d, i) {
  const statusMap = {
    verified: { icon: '✅', cls: 'doc-verified', label: 'VERIFIED' },
    pending: { icon: '⏳', cls: 'doc-pending', label: 'PENDING' },
    missing: { icon: '❌', cls: 'doc-missing', label: 'MISSING' },
  };
  const s = d.expiring ? { icon: '⚠️', cls: 'doc-expiring', label: 'EXPIRING SOON' } : (statusMap[d.status] || statusMap.pending);
  const actions = d.status === 'missing'
    ? `<button class="doc-btn upload" onclick="simulateUpload(${i})">Upload</button>`
    : d.status === 'pending'
    ? `<button class="doc-btn verify" onclick="simulateVerify(${i})">Verify</button><button class="doc-btn view">View</button>`
    : `<button class="doc-btn view">View</button>`;
  const expiry = d.expiry ? `<span style="color:${d.expiring ? 'var(--yellow)' : 'var(--text-muted)'}">Expires: ${d.expiry}</span>` : '';
  return `
    <div class="doc-item" id="doc-item-${i}">
      <div class="doc-left">
        <div class="doc-status-icon">${s.icon}</div>
        <div>
          <div class="doc-name">${d.name}</div>
          <div class="doc-meta">Issuer: ${d.issuer} &nbsp;|&nbsp; <span class="${s.cls}">${s.label}</span> &nbsp;${expiry}</div>
        </div>
      </div>
      <div class="doc-action">${actions}</div>
    </div>`;
}

function simulateVerify(i) {
  const el = document.querySelector(`#doc-item-${i} .doc-status-icon`);
  if (el) el.textContent = '✅';
  const label = document.querySelector(`#doc-item-${i} .doc-pending`);
  if (label) { label.textContent = 'VERIFIED'; label.className = 'doc-verified'; }
  const btn = document.querySelector(`#doc-item-${i} .doc-btn.verify`);
  if (btn) btn.remove();
}

function simulateUpload(i) {
  alert(`Simulating document upload for item ${i+1}. In production, this opens a file upload dialog and sends to the verification queue.`);
}

function runBulkVerify() {
  alert('Bulk verification initiated. All pending documents queued for automated cross-verification against government databases (MCA21, GSTN, DPIIT, BIS).');
}

// ── PRICE ANALYSIS ───────────────────────────
function checkPrice() {
  const item = document.getElementById('pcItem').value.trim();
  const bid = parseFloat(document.getElementById('pcBid').value);
  const market = parseFloat(document.getElementById('pcMarket').value);
  const result = document.getElementById('priceResult');
  if (!item || isNaN(bid) || isNaN(market)) { result.innerHTML = '<span style="color:var(--red)">Please fill all fields.</span>'; return; }
  const dev = ((bid - market) / market * 100).toFixed(1);
  const absDev = Math.abs(dev);
  let riskLevel, riskColor, riskMsg;
  if (absDev > 25) { riskLevel = '🚨 CRITICAL RISK'; riskColor = 'var(--red)'; riskMsg = 'Bid deviates >25% from market. Flag for investigation.'; }
  else if (absDev > 10) { riskLevel = '⚠️ MODERATE RISK'; riskColor = 'var(--yellow)'; riskMsg = 'Significant deviation. Request clarification from vendor.'; }
  else { riskLevel = '✅ ACCEPTABLE'; riskColor = 'var(--green)'; riskMsg = 'Within acceptable range.'; }
  result.innerHTML = `
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:7px;padding:14px 18px">
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:6px">Item: <b style="color:var(--text-primary)">${item}</b></div>
      <div style="display:flex;gap:24px;margin-bottom:10px">
        <span>Bid: <b style="color:var(--cyan)">₹${bid.toLocaleString()}</b></span>
        <span>Market: <b style="color:var(--text-primary)">₹${market.toLocaleString()}</b></span>
        <span>Deviation: <b style="color:${dev < 0 ? 'var(--green)':'var(--red)'}">${dev > 0 ? '+' : ''}${dev}%</b></span>
      </div>
      <div style="font-size:14px;font-weight:700;color:${riskColor}">${riskLevel}</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${riskMsg}</div>
    </div>`;
}

function renderPriceDeviation() {
  const items = [
    { name: 'Tactical Vest', bid: 12500, market: 12000 },
    { name: 'Night Vision', bid: 38000, market: 44000 },
    { name: 'Radios', bid: 71000, market: 84000 },
    { name: 'Combat Boots', bid: 3100, market: 3300 },
    { name: 'First Aid', bid: 1750, market: 1850 },
  ];
  const list = document.getElementById('deviationList');
  list.innerHTML = items.map(item => {
    const dev = ((item.bid - item.market) / item.market * 100).toFixed(1);
    const cls = dev < 0 ? 'negative' : 'positive';
    return `<div class="dev-item"><span class="dev-name">${item.name}</span><span class="dev-val ${cls}">${dev > 0 ? '+' : ''}${dev}%</span></div>`;
  }).join('');
}

// ── COMPLIANCE ───────────────────────────────
function renderCompliance() {
  const grid = document.getElementById('complianceGrid');
  grid.innerHTML = COMPLIANCE_DATA.map(v => {
    const color = getTrustColor(v.score);
    return `
      <div class="compliance-vendor">
        <div class="cv-header" onclick="toggleCV('cv-body-${v.id}')">
          <div class="cv-name">${v.name} <small style="color:var(--text-muted);font-size:12px">${v.id}</small></div>
          <div style="display:flex;align-items:center;gap:12px">
            <div class="cv-score" style="color:${color}">${v.score}/100</div>
            <span class="status-tag ${v.score >= 80 ? 'green' : v.score >= 50 ? 'yellow' : 'red'}">${v.score >= 80 ? 'Compliant' : v.score >= 50 ? 'Partial' : 'Non-Compliant'}</span>
          </div>
        </div>
        <div class="cv-body" id="cv-body-${v.id}">
          ${v.conditions.map(c => `
            <div class="cv-condition ${c.status}">
              <div class="cv-condition-name">${c.name}</div>
              <div class="cv-condition-val">${c.val}</div>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');
}

function toggleCV(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'none' ? 'grid' : 'none';
}

// ── RISK & ANOMALY ───────────────────────────
function renderRisk() {
  const list = document.getElementById('riskFlagsList');
  list.innerHTML = RISKS.map(r => `
    <div class="risk-flag ${r.level === 'warning' ? 'warning' : ''}">
      <div class="risk-icon">${r.icon}</div>
      <div>
        <div class="risk-title">${r.title}</div>
        <div class="risk-desc">${r.desc}</div>
        <span class="risk-tag ${r.level === 'warning' ? 'w' : ''}">${r.tag}</span>
      </div>
    </div>`).join('');

  const hm = document.getElementById('riskHeatmap');
  hm.innerHTML = `
    <div style="padding:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
      ${VENDORS.map(v => {
        const risk = v.trust < 40 ? 'var(--red)' : v.trust < 65 ? 'var(--yellow)' : 'var(--green)';
        const opacity = (100 - v.trust) / 100;
        return `<div style="background:${risk};opacity:${0.3+opacity*0.7};border-radius:5px;padding:8px;text-align:center">
          <div style="font-size:10px;color:#000;font-weight:700">${v.id}</div>
          <div style="font-size:16px;font-weight:800;color:#000">${v.trust}</div>
        </div>`;
      }).join('')}
    </div>`;
}

// ── SCENARIO SIMULATOR ───────────────────────
function updateScenario() {
  const bv = document.getElementById('budgetSlider').value;
  const tv = document.getElementById('timelineSlider').value;
  const ttv = document.getElementById('trustThreshSlider').value;
  document.getElementById('budgetVal').textContent = (bv > 0 ? '+' : '') + bv + '%';
  document.getElementById('timelineVal').textContent = tv + '/10';
  document.getElementById('trustThreshVal').textContent = ttv;
}

function runScenario() {
  const budget = +document.getElementById('budgetSlider').value;
  const timeline = +document.getElementById('timelineSlider').value;
  const quality = document.getElementById('qualitySelect').value;
  const riskTol = document.getElementById('riskSelect').value;
  const trustThresh = +document.getElementById('trustThreshSlider').value;

  const budgetFactor = 1 + budget / 100;
  const baseBudget = 5.2;
  const newBudget = (baseBudget * budgetFactor).toFixed(2);
  const qMult = quality === 'premium' ? 0.85 : quality === 'enhanced' ? 0.92 : 1;
  const qualifiedVendors = VENDORS.filter(v => v.trust >= trustThresh);

  const results = document.getElementById('scenarioResults');
  results.innerHTML = `
    <div class="scenario-result-item"><span>Adjusted Budget</span><b style="color:var(--cyan)">₹${newBudget} Cr</b></div>
    <div class="scenario-result-item"><span>Timeline Pressure</span><b style="color:${timeline > 7 ? 'var(--red)' : 'var(--yellow)'}">${timeline}/10 — ${timeline > 7 ? 'HIGH' : timeline > 4 ? 'MODERATE' : 'LOW'}</b></div>
    <div class="scenario-result-item"><span>Quality Tier</span><b style="color:var(--text-primary)">${quality.toUpperCase()}</b></div>
    <div class="scenario-result-item"><span>Risk Tolerance</span><b style="color:${riskTol === 'low' ? 'var(--green)' : riskTol === 'medium' ? 'var(--yellow)' : 'var(--red)'}">${riskTol.toUpperCase()}</b></div>
    <div class="scenario-result-item"><span>Vendors Meeting Trust Threshold (≥${trustThresh})</span><b style="color:var(--gold)">${qualifiedVendors.length} of ${VENDORS.length}</b></div>
    <div class="scenario-result-item"><span>Eligible Vendors</span><b style="color:var(--text-primary)">${qualifiedVendors.map(v => v.id).join(', ') || 'None'}</b></div>
    <div class="scenario-result-item"><span>Estimated Best Bid in Range</span><b style="color:var(--green)">₹${qualifiedVendors.length ? Math.min(...qualifiedVendors.map(v => v.bid)).toFixed(2) : 'N/A'} Cr</b></div>
    <div class="scenario-rec">
      <b>Recommendation:</b> ${scenarioRec(qualifiedVendors, budget, timeline, quality)}
    </div>`;
}

function scenarioRec(eligible, budget, timeline, quality) {
  if (eligible.length === 0) return 'No vendors meet the current trust threshold. Consider lowering the threshold or re-issuing the tender.';
  if (timeline > 7 && eligible.length < 2) return `Extreme time pressure with limited eligible vendors. Award to ${eligible[0].id} (${eligible[0].name}) immediately after final compliance check.`;
  if (budget < -15) return `Budget significantly reduced. Prioritize lowest bidder among qualified: ${eligible.sort((a,b) => a.bid-b.bid)[0].name}. Negotiate scope reduction.`;
  if (quality === 'premium') return `Premium quality required. Shortlist only top-trust vendors: ${eligible.filter(v => v.trust >= 80).map(v => v.name).join(', ') || 'None meet premium threshold'}.`;
  return `Standard scenario. Proceed with L1 evaluation among ${eligible.length} eligible vendors. Recommend technical evaluation then price comparison.`;
}

// ── TRUST SCORE ENGINE ───────────────────────
function calcTrust() {
  const exp = +document.getElementById('ts_exp').value;
  const qual = +document.getElementById('ts_qual').value;
  const comp = +document.getElementById('ts_comp').value;
  const tend = +document.getElementById('ts_tend').value;
  const fin = +document.getElementById('ts_fin').value;

  document.getElementById('ts_exp_v').textContent = exp + ' yrs';
  document.getElementById('ts_qual_v').textContent = qual + '/100';
  document.getElementById('ts_comp_v').textContent = comp;
  document.getElementById('ts_tend_v').textContent = tend + '%';
  document.getElementById('ts_fin_v').textContent = fin + '/100';

  const expScore = Math.min(exp / 20 * 100, 100);
  const compScore = Math.max(0, 100 - comp * 2);

  const score = Math.round(
    expScore * 0.20 +
    qual * 0.25 +
    compScore * 0.20 +
    tend * 0.25 +
    fin * 0.10
  );

  const display = document.getElementById('trustScoreDisplay');
  const label = document.getElementById('trustLabel');
  const breakdown = document.getElementById('trustBreakdown');

  display.textContent = score;
  display.style.color = getTrustColor(score);
  label.textContent = score >= 75 ? '✅ HIGH TRUST — QUALIFIED' : score >= 55 ? '⚠️ MODERATE TRUST — REVIEW' : '🚨 LOW TRUST — FLAG';
  label.style.color = getTrustColor(score);

  breakdown.innerHTML = [
    { label: 'Experience', val: Math.round(expScore * 0.20) },
    { label: 'Quality', val: Math.round(qual * 0.25) },
    { label: 'Complaints', val: Math.round(compScore * 0.20) },
    { label: 'Compliance', val: Math.round(tend * 0.25) },
    { label: 'Financial', val: Math.round(fin * 0.10) },
  ].map(x => `<div class="tb-item">${x.label}: <b>${x.val}</b></div>`).join('');
}

function renderTrustLeaderboard() {
  const sorted = [...VENDORS].sort((a, b) => b.trust - a.trust);
  const rankLabels = ['gold', 'silver', 'bronze'];
  document.getElementById('trustLeaderboard').innerHTML = `
    <div class="trust-leaderboard">
      ${sorted.map((v, i) => {
        const color = getTrustColor(v.trust);
        return `<div class="tl-row">
          <div class="tl-rank ${rankLabels[i] || ''}">${i + 1}</div>
          <div>
            <div class="tl-vendor-name">${v.name}</div>
            <div style="font-size:11px;color:var(--text-muted)">${v.id} · ${v.category}</div>
          </div>
          <div class="tl-bar-wrap"><div class="tl-bar-fill" style="width:${v.trust}%;background:${color}"></div></div>
          <div class="tl-score" style="color:${color}">${v.trust}</div>
        </div>`;
      }).join('')}
    </div>`;
}

// ── REPORTS ──────────────────────────────────
function generateReport(type) {
  const box = document.getElementById('reportOutput');
  const title = document.getElementById('reportTitle');
  const content = document.getElementById('reportContent');
  box.style.display = 'block';
  const reports = {
    full: {
      title: '📋 Full Evaluation Report — TND-2024-089',
      html: `<div style="padding:18px;font-size:13px;line-height:1.8">
        <p><b>Tender:</b> TND-2024-089 — Tactical Equipment Procurement | <b>Date:</b> ${new Date().toLocaleDateString('en-IN')}</p>
        <p><b>Total Bidders:</b> ${VENDORS.length} | <b>Qualified:</b> ${VENDORS.filter(v => v.status === 'Qualified').length} | <b>Flagged:</b> ${VENDORS.filter(v => v.status === 'Flagged').length}</p>
        <hr style="border-color:var(--border);margin:14px 0">
        <b>Vendor Summary:</b>
        <table class="data-table" style="margin-top:10px">
          <thead><tr><th>ID</th><th>Vendor</th><th>Bid (₹ Cr)</th><th>Trust Score</th><th>Status</th></tr></thead>
          <tbody>${VENDORS.map(v => `<tr><td>${v.id}</td><td>${v.name}</td><td>${v.bid}</td><td style="color:${getTrustColor(v.trust)}">${v.trust}</td><td>${getStatusTag(v.status)}</td></tr>`).join('')}</tbody>
        </table>
        <div style="margin-top:16px;padding:12px;background:var(--gold-glow);border-radius:6px;color:var(--gold)">
          <b>Recommendation:</b> Award to BID-001 (Alpha Defence Pvt Ltd) — highest trust score (88), compliant, and competitive bid (₹4.82 Cr). Disqualify BID-004 immediately.
        </div>
      </div>`
    },
    risk: {
      title: '🚨 Risk Assessment Report',
      html: `<div style="padding:18px">${RISKS.map(r => `<div class="risk-flag ${r.level === 'warning' ? 'warning' : ''}" style="margin-bottom:10px"><div class="risk-icon">${r.icon}</div><div><div class="risk-title">${r.title}</div><div class="risk-desc">${r.desc}</div></div></div>`).join('')}</div>`
    },
    trust: {
      title: '⭐ Trust Score Report',
      html: `<div style="padding:18px">${[...VENDORS].sort((a,b) => b.trust-a.trust).map((v,i) => `<div style="display:flex;align-items:center;gap:14px;padding:10px 0;border-bottom:1px solid var(--border)"><b style="color:var(--gold);font-size:20px;width:28px">#${i+1}</b><div style="flex:1"><b>${v.name}</b> <span style="color:var(--text-muted);font-size:11px">${v.id}</span></div><span style="color:${getTrustColor(v.trust)};font-size:20px;font-weight:700;font-family:var(--font-display)">${v.trust}/100</span></div>`).join('')}</div>`
    },
    price: {
      title: '💰 Price Comparison Report',
      html: `<div style="padding:18px;font-size:13px"><p style="color:var(--text-muted);margin-bottom:14px">Market benchmark analysis for Tender TND-2024-089</p><table class="data-table"><thead><tr><th>Vendor</th><th>Bid (₹ Cr)</th><th>vs Budget</th><th>Risk</th></tr></thead><tbody>${VENDORS.map(v => { const dev = ((v.bid - 4.9)/4.9*100).toFixed(1); return `<tr><td>${v.name}</td><td>₹${v.bid}</td><td style="color:${dev < -15 ? 'var(--red)' : dev > 10 ? 'var(--yellow)' : 'var(--green)'}">${dev > 0 ? '+' : ''}${dev}%</td><td>${dev < -20 ? '🚨 CRITICAL' : dev < -10 ? '⚠️ HIGH' : '✅ OK'}</td></tr>`}).join('')}</tbody></table></div>`
    }
  };
  const r = reports[type];
  title.textContent = r.title;
  content.innerHTML = r.html;
  box.scrollIntoView({ behavior: 'smooth' });
}

// ── CHARTS ───────────────────────────────────
function drawBidChart() {
  const canvas = document.getElementById('bidChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const vendors = VENDORS.slice(0, 6);
  const W = canvas.width, H = canvas.height;
  const pad = { top: 30, right: 20, bottom: 60, left: 50 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxVal = 6;
  const barW = chartW / vendors.length * 0.55;
  const gap = chartW / vendors.length;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  for (let i = 0; i <= 5; i++) {
    const y = pad.top + chartH - (i / 5 * chartH);
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y);
    ctx.strokeStyle = 'rgba(30,45,61,0.8)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#3a5470'; ctx.font = '11px Share Tech Mono';
    ctx.textAlign = 'right'; ctx.fillText((i / 5 * maxVal).toFixed(1), pad.left - 8, y + 4);
  }

  vendors.forEach((v, i) => {
    const x = pad.left + i * gap + gap * 0.22;
    const barH = (v.bid / maxVal) * chartH;
    const y = pad.top + chartH - barH;
    const grad = ctx.createLinearGradient(0, y, 0, y + barH);
    grad.addColorStop(0, v.status === 'Flagged' ? '#ff3c3c' : '#00c8ff');
    grad.addColorStop(1, v.status === 'Flagged' ? '#8b0000' : '#005570');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]); ctx.fill();
    // Value label
    ctx.fillStyle = '#d4e4f0'; ctx.font = 'bold 11px Share Tech Mono';
    ctx.textAlign = 'center'; ctx.fillText('₹' + v.bid, x + barW / 2, y - 6);
    // Name label
    ctx.fillStyle = '#6b8da8'; ctx.font = '10px Barlow';
    ctx.fillText(v.id, x + barW / 2, pad.top + chartH + 20);
    // Market line reference
  });

  // Market benchmark line at 4.9
  const lineY = pad.top + chartH - (4.9 / maxVal) * chartH;
  ctx.beginPath(); ctx.moveTo(pad.left, lineY); ctx.lineTo(W - pad.right, lineY);
  ctx.strokeStyle = '#e8a317'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 3]); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#e8a317'; ctx.font = '10px Share Tech Mono'; ctx.textAlign = 'left';
  ctx.fillText('Market ₹4.9 Cr', W - pad.right - 90, lineY - 6);
}

function drawCompliancePie() {
  const canvas = document.getElementById('compliancePie');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2 - 10, r = Math.min(W, H) / 2 - 30;
  const data = [
    { label: 'Compliant', val: 4, color: '#00e676' },
    { label: 'Partial', val: 2, color: '#ffd600' },
    { label: 'Non-Compliant', val: 1, color: '#ff3c3c' },
  ];
  const total = data.reduce((s, d) => s + d.val, 0);
  let startAngle = -Math.PI / 2;
  data.forEach(d => {
    const slice = (d.val / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + slice);
    ctx.closePath(); ctx.fillStyle = d.color + '99'; ctx.fill();
    ctx.strokeStyle = d.color; ctx.lineWidth = 2; ctx.stroke();
    // Label
    const midAngle = startAngle + slice / 2;
    const lx = cx + (r * 0.65) * Math.cos(midAngle), ly = cy + (r * 0.65) * Math.sin(midAngle);
    ctx.fillStyle = '#000'; ctx.font = 'bold 14px Rajdhani'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(d.val, lx, ly);
    startAngle += slice;
  });
  // Legend
  let ly = H - 30;
  const lw = W / data.length;
  data.forEach((d, i) => {
    ctx.fillStyle = d.color; ctx.fillRect(i * lw + 10, ly, 10, 10);
    ctx.fillStyle = '#6b8da8'; ctx.font = '10px Barlow'; ctx.textAlign = 'left';
    ctx.fillText(d.label, i * lw + 24, ly + 8);
  });
}

function drawPriceChart() {
  const canvas = document.getElementById('priceChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const items = ['Tact Vest', 'Night Vision', 'Comm Radio', 'Combat Boots', 'First Aid'];
  const bids001 = [12500, 45000, 85000, 3200, 1800];
  const bids003 = [9800, 38000, 71000, 3400, 1900];
  const market = [12000, 44000, 84000, 3300, 1850];
  const pad = { top: 30, right: 30, bottom: 70, left: 65 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxVal = 95000;
  const n = items.length;
  const barGroupW = chartW / n;
  const barW = barGroupW * 0.22;

  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i <= 5; i++) {
    const y = pad.top + chartH - (i / 5 * chartH);
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y);
    ctx.strokeStyle = 'rgba(30,45,61,0.8)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#3a5470'; ctx.font = '10px Share Tech Mono'; ctx.textAlign = 'right';
    ctx.fillText('₹' + (i / 5 * maxVal / 1000).toFixed(0) + 'k', pad.left - 6, y + 4);
  }

  items.forEach((item, i) => {
    const gx = pad.left + i * barGroupW;
    [[bids001[i], '#00c8ff'], [bids003[i], '#e8a317'], [market[i], '#00e676']].forEach(([val, color], j) => {
      const bh = (val / maxVal) * chartH;
      const x = gx + j * (barW + 2) + barGroupW * 0.1;
      const y = pad.top + chartH - bh;
      ctx.fillStyle = color + '88'; ctx.fillRect(x, y, barW, bh);
      ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.strokeRect(x, y, barW, bh);
    });
    ctx.fillStyle = '#6b8da8'; ctx.font = '10px Barlow'; ctx.textAlign = 'center';
    ctx.fillText(item, gx + barGroupW / 2, H - 10);
  });

  // Legend
  [['BID-001', '#00c8ff'], ['BID-003', '#e8a317'], ['Market', '#00e676']].forEach(([label, color], i) => {
    ctx.fillStyle = color; ctx.fillRect(pad.left + i * 100, 8, 12, 12);
    ctx.fillStyle = '#6b8da8'; ctx.font = '11px Barlow'; ctx.textAlign = 'left';
    ctx.fillText(label, pad.left + i * 100 + 16, 20);
  });
}

function drawAnomalyChart() {
  const canvas = document.getElementById('anomalyChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const months = ['Aug', 'Sep', 'Oct', 'Nov'];
  const abnormalities = [1, 2, 1, 5];
  const pad = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxVal = 6;

  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i <= 6; i++) {
    const y = pad.top + chartH - (i / 6 * chartH);
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y);
    ctx.strokeStyle = 'rgba(30,45,61,0.6)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#3a5470'; ctx.font = '10px Share Tech Mono'; ctx.textAlign = 'right';
    ctx.fillText(i, pad.left - 6, y + 4);
  }

  const points = abnormalities.map((v, i) => ({
    x: pad.left + (i / (months.length - 1)) * chartW,
    y: pad.top + chartH - (v / maxVal) * chartH
  }));

  // Fill area
  ctx.beginPath(); ctx.moveTo(points[0].x, pad.top + chartH);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length-1].x, pad.top + chartH); ctx.closePath();
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
  grad.addColorStop(0, 'rgba(255,60,60,0.4)'); grad.addColorStop(1, 'rgba(255,60,60,0.02)');
  ctx.fillStyle = grad; ctx.fill();

  // Line
  ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = '#ff3c3c'; ctx.lineWidth = 2.5; ctx.stroke();

  // Points
  points.forEach((p, i) => {
    ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ff3c3c'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#d4e4f0'; ctx.font = '11px Share Tech Mono'; ctx.textAlign = 'center';
    ctx.fillText(abnormalities[i], p.x, p.y - 12);
    ctx.fillStyle = '#6b8da8'; ctx.font = '11px Barlow';
    ctx.fillText(months[i], p.x, pad.top + chartH + 24);
  });
}

// ── INIT ─────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  animateKPIs();
  renderVendors();
  calcTrust();
  setTimeout(() => {
    drawBidChart();
    drawCompliancePie();
    drawPriceChart();
    drawAnomalyChart();
  }, 200);
});