/**
 * Small Trader - Micro-Crowdfunding Platform
 * Plain JavaScript with WebStorage (localStorage) Persistence
 */

// LocalStorage Keys
const STORAGE_KEY_CAMPAIGNS = 'smalltrader_campaigns';
const STORAGE_KEY_CONTRIBUTIONS = 'smalltrader_contributions';

// Initial Seed Campaigns Data
const SEED_CAMPAIGNS = [
  {
    id: "cmp-1",
    title: "Aunt Rose's Bakery - Commercial Oven Upgrade",
    traderName: "Rosemary Vance",
    category: "Equipment & Tools",
    location: "Brooklyn, NY",
    targetGoal: 4500,
    raisedAmount: 3450,
    daysLeft: 12,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    story: "For over 15 years, Aunt Rose's Bakery has served fresh sourdough, cinnamon rolls, and artisan pastries to our local neighborhood. Our current 20-year-old deck oven is failing, limiting how many loaves we can bake each morning.\n\nUpgrading to an energy-efficient 4-deck commercial gas oven will allow us to double our daily production, supply local school breakfasts, and hire two local baking apprentices from our community!",
    budgetBreakdown: [
      { item: "Commercial 4-Deck Gas Oven", cost: 3200 },
      { item: "Electrical & Gas Line Installation", cost: 800 },
      { item: "Apprentice Baking Aprons & Tools", cost: 500 }
    ],
    verified: true,
    createdAt: "2026-08-15",
    updates: [
      { id: "upd-101", date: "2026-08-20", title: "Vendor deposit paid!", content: "Thanks to your amazing support, we placed the deposit for the new oven today! Delivery is scheduled for next Tuesday." }
    ],
    backers: [
      { id: "bkr-1", name: "David K.", amount: 150, date: "2026-08-16", message: "Your sourdough is the highlight of my weekend! Happy to support.", anonymous: false },
      { id: "bkr-2", name: "Anonymous Donor", amount: 500, date: "2026-08-18", message: "Keep feeding the community Rose!", anonymous: true },
      { id: "bkr-3", name: "Sarah & Mark", amount: 100, date: "2026-08-22", message: "Can't wait for the new apprentices to start!", anonymous: false }
    ]
  },
  {
    id: "cmp-2",
    title: "Marco's Artisan Leather Craft - Master Tooling Set",
    traderName: "Marco Rossi",
    category: "Equipment & Tools",
    location: "Chicago, IL",
    targetGoal: 2200,
    raisedAmount: 1850,
    daysLeft: 8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    story: "I craft custom leather boots, belts, and orthopedic soles for workers in our industrial district. My hand-tooling stamps and skiving machine have worn down after a decade of hard use.\n\nFunding will help me acquire heavy-duty japanese skiving chisels, a custom hot-foil embossing press, and ethically sourced full-grain leather hides to keep my workshop operating.",
    budgetBreakdown: [
      { item: "Japanese Skiving Machine & Chisels", cost: 1200 },
      { item: "Hot-Foil Embossing Press", cost: 600 },
      { item: "Ethical Full-Grain Leather Stock", cost: 400 }
    ],
    verified: true,
    createdAt: "2026-08-18",
    updates: [],
    backers: [
      { id: "bkr-4", name: "Elena R.", amount: 75, date: "2026-08-19", message: "Best work boots I ever bought. Fully behind you Marco!", anonymous: false }
    ]
  },
  {
    id: "cmp-3",
    title: "Kofi's Fresh Produce Cart - Solar Refrigerated Trike",
    traderName: "Kofi Mensah",
    category: "Transportation",
    location: "Atlanta, GA",
    targetGoal: 3600,
    raisedAmount: 2900,
    daysLeft: 18,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    story: "I bring fresh, affordable organic vegetables and fruits directly to food desert neighborhoods that lack full-scale grocery stores. Currently I push a manual wooden cart over 8 miles a day.\n\nThis campaign will fund a solar-assisted refrigerated e-trike, allowing me to expand my route to 3 additional neighborhoods and keep greens crisp even in summer heat!",
    budgetBreakdown: [
      { item: "Heavy Duty E-Cargo Trike", cost: 2400 },
      { item: "Solar-Powered Cooler Unit", cost: 800 },
      { item: "Produce Baskets & Scale", cost: 400 }
    ],
    verified: true,
    createdAt: "2026-08-10",
    updates: [
      { id: "upd-102", date: "2026-08-25", title: "Trike frame ordered!", content: "The custom electric trike chassis has been assembled. Solar rooftop panels arrive next week!" }
    ],
    backers: [
      { id: "bkr-5", name: "Dr. Alisha Vance", amount: 200, date: "2026-08-12", message: "Thank you for bringing healthy food to our seniors!", anonymous: false }
    ]
  },
  {
    id: "cmp-4",
    title: "Elena's Tailoring Shop - Industrial Embroidery Unit",
    traderName: "Elena Rostova",
    category: "Shop Upgrade",
    location: "Austin, TX",
    targetGoal: 2800,
    raisedAmount: 1100,
    daysLeft: 22,
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80",
    story: "For 8 years, my micro-tailoring studio has provided alterations, wedding dress adjustments, and school uniform repairs. Local sports teams and small businesses frequently ask for custom logo embroidery.\n\nWith an industrial multi-needle embroidery machine, I can fulfill large order contracts and hire an assistant seamstress.",
    budgetBreakdown: [
      { item: "Multi-Needle Computerized Embroidery Machine", cost: 2100 },
      { item: "Thread Assortment & Digital Software", cost: 700 }
    ],
    verified: true,
    createdAt: "2026-08-22",
    updates: [],
    backers: [
      { id: "bkr-6", name: "Marcus Bennett", amount: 50, date: "2026-08-24", message: "Excited for our team uniforms to get embroidered here!", anonymous: false }
    ]
  },
  {
    id: "cmp-5",
    title: "Carlos's Electronics Repair Bench - Micro-Soldering Rig",
    traderName: "Carlos Mendez",
    category: "Inventory & Stock",
    location: "Miami, FL",
    targetGoal: 1800,
    raisedAmount: 1450,
    daysLeft: 5,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    story: "I help neighborhood families keep their old laptops, phones, and essential gadgets working so they don't have to buy expensive replacements.\n\nUpgrading my bench with an optical stereo microscope and micro-soldering station will allow me to fix logic board chips and recover lost family photos.",
    budgetBreakdown: [
      { item: "Stereo Trinocular Microscope", cost: 850 },
      { item: "Hot Air Rework & Soldering Station", cost: 550 },
      { item: "Replacement Chipset Inventory", cost: 400 }
    ],
    verified: true,
    createdAt: "2026-08-05",
    updates: [],
    backers: [
      { id: "bkr-7", name: "Teresa G.", amount: 100, date: "2026-08-08", message: "You saved all my college papers when my laptop died!", anonymous: false }
    ]
  }
];

// App State
let currentCampaigns = [];
let userContributions = [];
let activeCategoryFilter = 'All';
let activeSortOption = 'featured';
let activeSearchQuery = '';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initEventListeners();
  renderApp();
});

/* ==========================================================================
   STORAGE MANAGEMENT
   ========================================================================== */
function initStorage() {
  const savedCampaigns = localStorage.getItem(STORAGE_KEY_CAMPAIGNS);
  const savedContribs = localStorage.getItem(STORAGE_KEY_CONTRIBUTIONS);

  if (!savedCampaigns) {
    currentCampaigns = JSON.parse(JSON.stringify(SEED_CAMPAIGNS));
    saveCampaigns();
  } else {
    try {
      currentCampaigns = JSON.parse(savedCampaigns);
    } catch (e) {
      currentCampaigns = JSON.parse(JSON.stringify(SEED_CAMPAIGNS));
      saveCampaigns();
    }
  }

  if (!savedContribs) {
    userContributions = [];
    saveContributions();
  } else {
    try {
      userContributions = JSON.parse(savedContribs);
    } catch (e) {
      userContributions = [];
      saveContributions();
    }
  }
}

function saveCampaigns() {
  localStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(currentCampaigns));
}

function saveContributions() {
  localStorage.setItem(STORAGE_KEY_CONTRIBUTIONS, JSON.stringify(userContributions));
}

function resetDemoData() {
  currentCampaigns = JSON.parse(JSON.stringify(SEED_CAMPAIGNS));
  userContributions = [];
  saveCampaigns();
  saveContributions();
  renderApp();
  showToast("Demo campaign data has been reset to default!", "info");
}

/* ==========================================================================
   EVENT LISTENERS & NAVIGATION
   ========================================================================== */
function initEventListeners() {
  // Navigation
  document.getElementById('brandLogo').addEventListener('click', () => switchView('viewExplore'));
  document.getElementById('navExplore').addEventListener('click', () => switchView('viewExplore'));
  document.getElementById('navCreate').addEventListener('click', () => switchView('viewCreate'));
  document.getElementById('navDashboard').addEventListener('click', () => switchView('viewDashboard'));
  document.getElementById('btnResetDemo').addEventListener('click', resetDemoData);

  // Search & Filters
  document.getElementById('searchInput').addEventListener('input', (e) => {
    activeSearchQuery = e.target.value.toLowerCase().trim();
    renderExploreGrid();
  });

  document.getElementById('sortSelect').addEventListener('change', (e) => {
    activeSortOption = e.target.value;
    renderExploreGrid();
  });

  document.getElementById('categoryChips').addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
      document.querySelectorAll('#categoryChips .chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      activeCategoryFilter = e.target.dataset.category;
      renderExploreGrid();
    }
  });

  document.getElementById('btnResetFilters').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    activeSearchQuery = '';
    activeCategoryFilter = 'All';
    document.querySelectorAll('#categoryChips .chip').forEach(c => {
      c.classList.toggle('active', c.dataset.category === 'All');
    });
    renderExploreGrid();
  });

  // Campaign Details Modal Tabs & Close
  document.getElementById('btnCloseDetailsModal').addEventListener('click', closeDetailsModal);

  // Preset image picker in Create Form
  document.getElementById('presetPicker').addEventListener('click', (e) => {
    if (e.target.classList.contains('preset-img-btn')) {
      document.getElementById('inputCoverImage').value = e.target.dataset.url;
    }
  });

  // Budget row dynamic add/remove
  document.getElementById('btnAddBudgetItem').addEventListener('click', addBudgetRow);
  document.getElementById('budgetItemsContainer').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove-budget')) {
      removeBudgetRow(e.target);
    }
  });

  // Create Campaign Form Submit
  document.getElementById('createCampaignForm').addEventListener('submit', handleCreateCampaignSubmit);
  document.getElementById('btnCancelCreate').addEventListener('click', () => switchView('viewExplore'));

  // Donation Modal Controls
  document.getElementById('btnCloseDonationModal').addEventListener('click', closeDonationModal);
  document.getElementById('btnCancelDonation').addEventListener('click', closeDonationModal);
  
  document.getElementById('amountPresets').addEventListener('click', (e) => {
    if (e.target.classList.contains('preset-btn')) {
      document.querySelectorAll('#amountPresets .preset-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const val = e.target.dataset.amount;
      document.getElementById('customAmount').value = val;
      updateDonationSubmitBtn(val);
    }
  });

  document.getElementById('customAmount').addEventListener('input', (e) => {
    const val = e.target.value || 0;
    document.querySelectorAll('#amountPresets .preset-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.amount === String(val));
    });
    updateDonationSubmitBtn(val);
  });

  document.getElementById('donationForm').addEventListener('submit', handleDonationSubmit);

  // Update Modal Controls
  document.getElementById('btnCloseUpdateModal').addEventListener('click', closeUpdateModal);
  document.getElementById('btnCancelUpdate').addEventListener('click', closeUpdateModal);
  document.getElementById('addUpdateForm').addEventListener('submit', handleAddUpdateSubmit);

  // Dashboard Sub-tabs
  document.getElementById('tabMyContributions').addEventListener('click', () => switchDashTab('contributions'));
  document.getElementById('tabMyCampaigns').addEventListener('click', () => switchDashTab('campaigns'));
  document.getElementById('btnDashNewCampaign').addEventListener('click', () => switchView('viewCreate'));
}

function switchView(viewId) {
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  if (viewId === 'viewExplore') document.getElementById('navExplore').classList.add('active');
  if (viewId === 'viewCreate') document.getElementById('navCreate').classList.add('active');
  if (viewId === 'viewDashboard') {
    document.getElementById('navDashboard').classList.add('active');
    renderDashboard();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchDashTab(tabName) {
  document.getElementById('tabMyContributions').classList.toggle('active', tabName === 'contributions');
  document.getElementById('tabMyCampaigns').classList.toggle('active', tabName === 'campaigns');

  document.getElementById('dashContentContributions').classList.toggle('active', tabName === 'contributions');
  document.getElementById('dashContentCampaigns').classList.toggle('active', tabName === 'campaigns');
}

/* ==========================================================================
   RENDER FUNCTIONS
   ========================================================================== */
function renderApp() {
  updateHeroStats();
  renderExploreGrid();
}

function updateHeroStats() {
  let totalRaised = 0;
  let totalBackers = 0;

  currentCampaigns.forEach(c => {
    totalRaised += (c.raisedAmount || 0);
    totalBackers += (c.backers ? c.backers.length : 0);
  });

  document.getElementById('statTotalRaised').textContent = '$' + totalRaised.toLocaleString();
  document.getElementById('statTotalCampaigns').textContent = currentCampaigns.length;
  document.getElementById('statTotalBackers').textContent = totalBackers;
}

function getFilteredAndSortedCampaigns() {
  let list = [...currentCampaigns];

  // Category Filter
  if (activeCategoryFilter !== 'All') {
    list = list.filter(c => c.category === activeCategoryFilter);
  }

  // Search Query Filter
  if (activeSearchQuery) {
    list = list.filter(c => 
      c.title.toLowerCase().includes(activeSearchQuery) ||
      c.traderName.toLowerCase().includes(activeSearchQuery) ||
      c.location.toLowerCase().includes(activeSearchQuery) ||
      c.story.toLowerCase().includes(activeSearchQuery)
    );
  }

  // Sort
  if (activeSortOption === 'mostRaised') {
    list.sort((a, b) => b.raisedAmount - a.raisedAmount);
  } else if (activeSortOption === 'endingSoon') {
    list.sort((a, b) => a.daysLeft - b.daysLeft);
  } else if (activeSortOption === 'goalLow') {
    list.sort((a, b) => a.targetGoal - b.targetGoal);
  } else if (activeSortOption === 'goalHigh') {
    list.sort((a, b) => b.targetGoal - a.targetGoal);
  } else if (activeSortOption === 'newest') {
    list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  return list;
}

function renderExploreGrid() {
  const container = document.getElementById('campaignsGrid');
  const emptyState = document.getElementById('emptyState');
  const campaigns = getFilteredAndSortedCampaigns();

  if (campaigns.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  container.innerHTML = campaigns.map(c => {
    const percent = Math.min(100, Math.round((c.raisedAmount / c.targetGoal) * 100));
    const backerCount = c.backers ? c.backers.length : 0;

    return `
      <div class="campaign-card">
        <div class="card-image-wrap">
          <img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.title)}" class="card-image" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'">
          <span class="category-tag">${escapeHtml(c.category)}</span>
          ${c.verified ? `<span class="verified-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>` : ''}
        </div>
        
        <div class="card-body">
          <div class="trader-info">
            <span class="trader-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </span>
            <span>${escapeHtml(c.traderName)} &bull; ${escapeHtml(c.location)}</span>
          </div>

          <h3 class="card-title">${escapeHtml(c.title)}</h3>
          <p class="card-story-snippet">${escapeHtml(c.story)}</p>

          <div class="progress-block">
            <div class="progress-track">
              <div class="progress-fill" style="width: ${percent}%;"></div>
            </div>
            
            <div class="progress-metrics">
              <div>
                <span class="metric-raised">$${(c.raisedAmount || 0).toLocaleString()}</span>
                <span class="metric-target">raised of $${c.targetGoal.toLocaleString()}</span>
              </div>
              <span class="metric-raised" style="font-size: 1rem; color: #2d6a4f;">${percent}%</span>
            </div>
          </div>

          <div class="card-footer-stats">
            <span>${backerCount} supporter${backerCount !== 1 ? 's' : ''}</span>
            <span>${c.daysLeft} days left</span>
          </div>

          <div class="card-actions">
            <button class="btn btn-secondary btn-sm" onclick="openDetailsModal('${c.id}')">View Story</button>
            <button class="btn btn-primary btn-sm" onclick="openDonationModal('${c.id}')">Back This Trader</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   CAMPAIGN DETAILS MODAL
   ========================================================================== */
function openDetailsModal(campaignId) {
  const c = currentCampaigns.find(item => item.id === campaignId);
  if (!c) return;

  const percent = Math.min(100, Math.round((c.raisedAmount / c.targetGoal) * 100));
  const backerCount = c.backers ? c.backers.length : 0;
  const updatesCount = c.updates ? c.updates.length : 0;

  const modalBody = document.getElementById('detailsModalBody');
  modalBody.innerHTML = `
    <img src="${escapeHtml(c.image)}" class="modal-hero-cover" alt="${escapeHtml(c.title)}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'">

    <div class="details-header">
      <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span class="category-tag" style="position: static;">${escapeHtml(c.category)}</span>
        ${c.verified ? `<span class="verified-badge" style="position: static;">Verified Trader</span>` : ''}
      </div>
      <h2 class="details-title">${escapeHtml(c.title)}</h2>
      <div class="details-meta-row">
        <span>Trader: <strong>${escapeHtml(c.traderName)}</strong></span>
        <span>Location: <strong>${escapeHtml(c.location)}</strong></span>
        <span>Days Remaining: <strong>${c.daysLeft}</strong></span>
      </div>
    </div>

    <div class="details-grid">
      <div>
        <div class="details-tab-nav">
          <button class="tab-nav-btn active" onclick="switchDetailTab('story')">Story &amp; Budget</button>
          <button class="tab-nav-btn" onclick="switchDetailTab('updates')">Updates (${updatesCount})</button>
          <button class="tab-nav-btn" onclick="switchDetailTab('backers')">Supporter Messages (${backerCount})</button>
        </div>

        <!-- TAB 1: Story & Budget -->
        <div class="tab-panel active" id="detailTabStory">
          <div class="story-text">${escapeHtml(c.story)}</div>

          ${c.budgetBreakdown && c.budgetBreakdown.length ? `
            <div class="budget-visual-title">Budget Allocation Breakdown</div>
            <div class="budget-list-display">
              ${c.budgetBreakdown.map(item => `
                <div class="budget-row-display">
                  <span class="budget-row-item">${escapeHtml(item.item)}</span>
                  <span class="budget-row-cost">$${Number(item.cost).toLocaleString()}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- TAB 2: Updates -->
        <div class="tab-panel" id="detailTabUpdates">
          ${updatesCount === 0 ? `
            <p style="color: #64748b; font-style: italic;">No progress updates posted yet by this trader.</p>
          ` : `
            <div class="timeline-list">
              ${c.updates.map(u => `
                <div class="timeline-item">
                  <span class="timeline-date">${escapeHtml(u.date)}</span>
                  <h4 class="timeline-title">${escapeHtml(u.title)}</h4>
                  <p class="timeline-content">${escapeHtml(u.content)}</p>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- TAB 3: Supporter Messages -->
        <div class="tab-panel" id="detailTabBackers">
          ${backerCount === 0 ? `
            <p style="color: #64748b; font-style: italic;">Be the first backer to leave a message of encouragement!</p>
          ` : `
            <div class="donor-messages-list">
              ${c.backers.slice().reverse().map(b => `
                <div class="donor-msg-card">
                  <div class="donor-msg-header">
                    <span class="donor-msg-name">${b.anonymous ? 'Anonymous Backer' : escapeHtml(b.name || 'Kind Donor')}</span>
                    <span class="donor-msg-amount">$${b.amount}</span>
                  </div>
                  ${b.message ? `<p class="donor-msg-text">"${escapeHtml(b.message)}"</p>` : ''}
                </div>
              `).join('')}
            </div>
          `}
        </div>

      </div>

      <!-- Right Funding Summary -->
      <div>
        <div class="side-funding-box">
          <div class="funding-box-amount">$${(c.raisedAmount || 0).toLocaleString()}</div>
          <div class="funding-box-target">raised of $${c.targetGoal.toLocaleString()} goal</div>

          <div class="progress-track" style="height: 10px; margin-bottom: 1rem;">
            <div class="progress-fill" style="width: ${percent}%;"></div>
          </div>

          <div style="font-size: 0.85rem; color: #475569; margin-bottom: 1.25rem;">
            <strong>${percent}%</strong> funded by <strong>${backerCount}</strong> local supporters.
          </div>

          <button class="btn btn-primary btn-block" onclick="closeDetailsModal(); openDonationModal('${c.id}');">Back This Trader Now</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modalCampaignDetails').classList.remove('hidden');
}

function switchDetailTab(tabName) {
  document.querySelectorAll('.details-tab-nav .tab-nav-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', (tabName === 'story' && idx === 0) || (tabName === 'updates' && idx === 1) || (tabName === 'backers' && idx === 2));
  });

  document.getElementById('detailTabStory').classList.toggle('active', tabName === 'story');
  document.getElementById('detailTabUpdates').classList.toggle('active', tabName === 'updates');
  document.getElementById('detailTabBackers').classList.toggle('active', tabName === 'backers');
}

function closeDetailsModal() {
  document.getElementById('modalCampaignDetails').classList.add('hidden');
}

/* ==========================================================================
   DONATION / CONTRIBUTION MODAL
   ========================================================================== */
function openDonationModal(campaignId) {
  const c = currentCampaigns.find(item => item.id === campaignId);
  if (!c) return;

  document.getElementById('donationCampaignId').value = c.id;
  document.getElementById('donationCampaignTitle').textContent = `Back ${c.traderName}'s Campaign`;
  document.getElementById('donationTraderSubtitle').textContent = c.title;

  document.getElementById('customAmount').value = 25;
  document.querySelectorAll('#amountPresets .preset-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.amount === '25');
  });

  updateDonationSubmitBtn(25);
  document.getElementById('modalDonation').classList.remove('hidden');
}

function updateDonationSubmitBtn(amount) {
  document.getElementById('btnSubmitDonation').textContent = `Confirm & Donate $${Number(amount || 0).toLocaleString()}`;
}

function closeDonationModal() {
  document.getElementById('modalDonation').classList.add('hidden');
}

function handleDonationSubmit(e) {
  e.preventDefault();

  const campaignId = document.getElementById('donationCampaignId').value;
  const campaign = currentCampaigns.find(c => c.id === campaignId);
  if (!campaign) return;

  const amount = parseFloat(document.getElementById('customAmount').value);
  if (!amount || amount <= 0) {
    alert('Please enter a valid donation amount.');
    return;
  }

  const donorName = document.getElementById('donorName').value.trim();
  const donorMessage = document.getElementById('donorMessage').value.trim();
  const anonymous = document.getElementById('donorAnonymous').checked;

  const todayStr = new Date().toISOString().split('T')[0];

  const backerRecord = {
    id: "bkr-" + Date.now(),
    name: donorName || "Kind Donor",
    amount: amount,
    date: todayStr,
    message: donorMessage,
    anonymous: anonymous
  };

  // Update Campaign
  if (!campaign.backers) campaign.backers = [];
  campaign.backers.push(backerRecord);
  campaign.raisedAmount = (campaign.raisedAmount || 0) + amount;
  saveCampaigns();

  // Save to User Contributions history
  userContributions.push({
    id: "cnt-" + Date.now(),
    campaignId: campaign.id,
    campaignTitle: campaign.title,
    traderName: campaign.traderName,
    amount: amount,
    date: todayStr,
    message: donorMessage
  });
  saveContributions();

  closeDonationModal();
  renderApp();
  showToast(`Thank you! You contributed $${amount} to ${campaign.traderName}!`, "success");

  // Re-open details modal with refreshed donor tab if it was open
  openDetailsModal(campaign.id);
  switchDetailTab('backers');
}

/* ==========================================================================
   CREATE CAMPAIGN WIZARD
   ========================================================================== */
function addBudgetRow() {
  const container = document.getElementById('budgetItemsContainer');
  const div = document.createElement('div');
  div.className = 'budget-item-row';
  div.innerHTML = `
    <input type="text" class="budget-item-name" placeholder="Item description (e.g. New Display Case)" required>
    <input type="number" class="budget-item-cost" placeholder="Cost ($)" min="1" required>
    <button type="button" class="btn-remove-budget" title="Remove row">&times;</button>
  `;
  container.appendChild(div);
  updateRemoveButtonsState();
}

function removeBudgetRow(btnElement) {
  const container = document.getElementById('budgetItemsContainer');
  if (container.children.length > 1) {
    btnElement.closest('.budget-item-row').remove();
    updateRemoveButtonsState();
  }
}

function updateRemoveButtonsState() {
  const rows = document.querySelectorAll('#budgetItemsContainer .budget-item-row');
  rows.forEach((row) => {
    const btn = row.querySelector('.btn-remove-budget');
    btn.disabled = rows.length <= 1;
  });
}

function handleCreateCampaignSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('inputTitle').value.trim();
  const traderName = document.getElementById('inputTraderName').value.trim();
  const location = document.getElementById('inputLocation').value.trim();
  const category = document.getElementById('inputCategory').value;
  const targetGoal = parseFloat(document.getElementById('inputTargetGoal').value);
  const duration = parseInt(document.getElementById('inputDuration').value);
  const coverImage = document.getElementById('inputCoverImage').value.trim();
  const story = document.getElementById('inputStory').value.trim();

  // Collect budget items
  const budgetBreakdown = [];
  const rows = document.querySelectorAll('#budgetItemsContainer .budget-item-row');
  rows.forEach(row => {
    const itemName = row.querySelector('.budget-item-name').value.trim();
    const itemCost = parseFloat(row.querySelector('.budget-item-cost').value);
    if (itemName && itemCost) {
      budgetBreakdown.push({ item: itemName, cost: itemCost });
    }
  });

  const newCampaign = {
    id: "cmp-" + Date.now(),
    title: title,
    traderName: traderName,
    category: category,
    location: location,
    targetGoal: targetGoal,
    raisedAmount: 0,
    daysLeft: duration,
    image: coverImage || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    story: story,
    budgetBreakdown: budgetBreakdown,
    verified: false,
    createdAt: new Date().toISOString().split('T')[0],
    updates: [],
    backers: []
  };

  currentCampaigns.unshift(newCampaign);
  saveCampaigns();

  // Reset form
  document.getElementById('createCampaignForm').reset();
  document.getElementById('budgetItemsContainer').innerHTML = `
    <div class="budget-item-row">
      <input type="text" class="budget-item-name" placeholder="Item description (e.g. New Commercial Oven)" required>
      <input type="number" class="budget-item-cost" placeholder="Cost ($)" min="1" required>
      <button type="button" class="btn-remove-budget" title="Remove row" disabled>&times;</button>
    </div>
  `;

  renderApp();
  switchView('viewExplore');
  showToast(`Campaign "${title}" created successfully!`, "success");
}

/* ==========================================================================
   TRADER UPDATE MODAL
   ========================================================================== */
function openUpdateModal(campaignId) {
  document.getElementById('updateCampaignId').value = campaignId;
  document.getElementById('addUpdateForm').reset();
  document.getElementById('modalAddUpdate').classList.remove('hidden');
}

function closeUpdateModal() {
  document.getElementById('modalAddUpdate').classList.add('hidden');
}

function handleAddUpdateSubmit(e) {
  e.preventDefault();
  const campaignId = document.getElementById('updateCampaignId').value;
  const campaign = currentCampaigns.find(c => c.id === campaignId);
  if (!campaign) return;

  const title = document.getElementById('updateTitle').value.trim();
  const content = document.getElementById('updateContent').value.trim();

  if (!campaign.updates) campaign.updates = [];

  campaign.updates.unshift({
    id: "upd-" + Date.now(),
    date: new Date().toISOString().split('T')[0],
    title: title,
    content: content
  });

  saveCampaigns();
  closeUpdateModal();
  renderApp();
  if (document.getElementById('viewDashboard').classList.contains('active')) {
    renderDashboard();
  }
  showToast("Progress update posted successfully!", "success");
}

/* ==========================================================================
   DASHBOARD
   ========================================================================== */
function renderDashboard() {
  // Stats
  let totalDonated = 0;
  userContributions.forEach(c => totalDonated += (c.amount || 0));

  document.getElementById('dashTotalDonated').textContent = '$' + totalDonated.toLocaleString();
  document.getElementById('dashTradersBacked').textContent = userContributions.length;

  // Contributions List
  const contribContainer = document.getElementById('contributionsListContainer');
  if (userContributions.length === 0) {
    contribContainer.innerHTML = `
      <p style="color: #64748b; font-style: italic; padding: 1rem 0;">You haven't backed any campaigns yet. Explore active campaigns to make your first contribution!</p>
    `;
  } else {
    contribContainer.innerHTML = `
      <table class="contribution-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Campaign &amp; Trader</th>
            <th>Amount</th>
            <th>Encouragement Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${userContributions.slice().reverse().map(item => `
            <tr>
              <td>${item.date}</td>
              <td>
                <strong>${escapeHtml(item.campaignTitle)}</strong><br>
                <span style="font-size: 0.8rem; color: #64748b;">Trader: ${escapeHtml(item.traderName)}</span>
              </td>
              <td><strong style="color: #2d6a4f;">$${item.amount}</strong></td>
              <td>${item.message ? `<em>"${escapeHtml(item.message)}"` : '<span style="color: #94a3b8;">None</span>'}</td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="openDetailsModal('${item.campaignId}')">View Campaign</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Created Campaigns List
  const myCampaignsContainer = document.getElementById('myCampaignsListContainer');
  // For demo, list all user created or available campaigns
  myCampaignsContainer.innerHTML = `
    <h3 class="section-subtitle">Manage Campaigns</h3>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${currentCampaigns.map(c => `
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <span class="category-tag" style="position: static;">${escapeHtml(c.category)}</span>
            <h4 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0.3rem 0;">${escapeHtml(c.title)}</h4>
            <div style="font-size: 0.85rem; color: #64748b;">
              Raised <strong>$${(c.raisedAmount || 0).toLocaleString()}</strong> of $${c.targetGoal.toLocaleString()} &bull; ${c.backers ? c.backers.length : 0} Backers &bull; ${c.updates ? c.updates.length : 0} Updates
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="openUpdateModal('${c.id}')">+ Post Update</button>
            <button class="btn btn-secondary btn-sm" onclick="openDetailsModal('${c.id}')">View Page</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* Helper to prevent XSS injection */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
