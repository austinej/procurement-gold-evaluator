/* ═══════════════════════════════════════════════════════════
   CONTRACTVAULT — MODULE 10
   Procurement Gold Standard Evaluator
   PMM Engine | SJT Questions | Dual-Axis Scoring
   Integrity Coefficient | CVR™ Rating Generator
   © 2026 Austine Jarome. All Rights Reserved.
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────
   1. STATE OBJECT
───────────────────────────────────────────────────────── */
const STATE = {
  currentQuestion: 0,
  answers: {},
  orgName: '',
  orgSector: '',
  spendBracket: '',
  responderRole: '',
};

/* ─────────────────────────────────────────────────────────
   2. DOMAIN DEFINITIONS (7 Domains)
───────────────────────────────────────────────────────── */
const DOMAINS = [
  { id: 'D1', name: 'Sourcing & Market Engagement',       weight: 0.16 },
  { id: 'D2', name: 'Contract Management & Governance',   weight: 0.16 },
  { id: 'D3', name: 'Supplier Relationship Management',   weight: 0.14 },
  { id: 'D4', name: 'Risk & Compliance',                  weight: 0.14 },
  { id: 'D5', name: 'Cost & Value Management',            weight: 0.14 },
  { id: 'D6', name: 'People, Process & Systems',          weight: 0.13 },
  { id: 'D7', name: 'Ethics & Integrity',                 weight: 0.13 },
];

/* ─────────────────────────────────────────────────────────
   3. SJT QUESTIONS (14 Questions — 2 per Domain)
   Each option carries:
     m  = maturity score (0–4)
     i  = integrity score (0–4, 4 = clean, 0 = critical flag)
     flag = integrity pillar triggered (null = none)
───────────────────────────────────────────────────────── */
const QUESTIONS = [

  /* ── DOMAIN 1 — Sourcing & Market Engagement ── */
  {
    id: 'Q1',
    domain: 'D1',
    text: 'Your organisation urgently needs a specialist contractor for a critical infrastructure project. A trusted supplier you have worked with for years can mobilise immediately. How do you proceed?',
    options: [
      {
        letter: 'A',
        text: 'Award directly to the trusted supplier — speed is the priority and the relationship is proven.',
        m: 1, i: 0, flag: 'ETHICAL_BREACH'
      },
      {
        letter: 'B',
        text: 'Run a limited tender with at least three pre-qualified suppliers, documenting the urgency and evaluation rationale.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Use a framework agreement already in place, selecting the most suitable supplier through a mini-competition.',
        m: 3, i: 4, flag: null
      },
      {
        letter: 'D',
        text: 'Negotiate directly but document the justification thoroughly and seek internal approval for the exception.',
        m: 2, i: 2, flag: null
      },
    ]
  },

  {
    id: 'Q2',
    domain: 'D1',
    text: 'During a tender evaluation, one of the suppliers on your shortlist is owned by a close associate of a senior stakeholder in your organisation. The supplier submitted the lowest compliant bid. What do you do?',
    options: [
      {
        letter: 'A',
        text: 'Award to the lowest compliant bid — the numbers speak for themselves.',
        m: 1, i: 1, flag: 'ETHICAL_BREACH'
      },
      {
        letter: 'B',
        text: 'Declare the conflict of interest formally, recuse the stakeholder from the evaluation panel, and proceed with an independent assessment.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Quietly exclude the supplier from the shortlist to avoid the complication.',
        m: 2, i: 1, flag: 'CUTTING_CORNERS'
      },
      {
        letter: 'D',
        text: 'Raise it informally with the stakeholder and proceed based on their guidance.',
        m: 1, i: 0, flag: 'ETHICAL_BREACH'
      },
    ]
  },

  /* ── DOMAIN 2 — Contract Management & Governance ── */
  {
    id: 'Q3',
    domain: 'D2',
    text: 'A contractor submits a variation claim midway through a project. Your programme director says the variation is valid but wants to process it informally to keep the contractor happy and avoid paperwork delays. What is your position?',
    options: [
      {
        letter: 'A',
        text: 'Agree — keeping the contractor happy is essential and the paperwork can follow later.',
        m: 1, i: 0, flag: 'CUTTING_CORNERS'
      },
      {
        letter: 'B',
        text: 'Process the variation formally through the contract change control procedure before any work proceeds.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Allow the work to proceed but issue a formal variation instruction within 48 hours.',
        m: 3, i: 3, flag: null
      },
      {
        letter: 'D',
        text: 'Request the contractor to submit a formal claim in writing before any decision is made.',
        m: 3, i: 4, flag: null
      },
    ]
  },

  {
    id: 'Q4',
    domain: 'D2',
    text: 'You discover that several active contracts in your organisation have no nominated contract manager and have not been reviewed since execution. Milestones and KPIs have not been tracked. What is your immediate action?',
    options: [
      {
        letter: 'A',
        text: 'Flag it in the next quarterly review — it is not an immediate risk.',
        m: 1, i: 1, flag: 'CUTTING_CORNERS'
      },
      {
        letter: 'B',
        text: 'Immediately assign contract managers, conduct a contract health check, and establish a monitoring schedule for all active contracts.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Focus only on the highest-value contracts and address the rest when resources allow.',
        m: 2, i: 2, flag: null
      },
      {
        letter: 'D',
        text: 'Request a full contract register audit and present findings to the board within 30 days.',
        m: 3, i: 4, flag: null
      },
    ]
  },

  /* ── DOMAIN 3 — Supplier Relationship Management ── */
  {
    id: 'Q5',
    domain: 'D3',
    text: 'Your top supplier has delivered consistently for 5 years. Their recent performance has started to slip — missed deadlines, quality issues, and poor communication. What is your approach?',
    options: [
      {
        letter: 'A',
        text: 'Continue working with them — loyalty matters and one bad patch should not end a relationship.',
        m: 1, i: 1, flag: null
      },
      {
        letter: 'B',
        text: 'Initiate a formal performance review, issue a remediation plan with measurable targets, and set a review period before deciding next steps.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Begin quietly qualifying alternative suppliers while continuing the relationship.',
        m: 2, i: 2, flag: null
      },
      {
        letter: 'D',
        text: 'Escalate directly to their senior leadership and request a recovery plan within 14 days.',
        m: 3, i: 3, flag: null
      },
    ]
  },

  {
    id: 'Q6',
    domain: 'D3',
    text: 'A supplier offers your team an all-expenses-paid site visit to their overseas manufacturing facility, including hospitality, meals, and accommodation. The visit is genuine and commercially relevant. How do you handle it?',
    options: [
      {
        letter: 'A',
        text: 'Accept — it is a genuine business visit and refusing would damage the relationship.',
        m: 1, i: 0, flag: 'ETHICAL_BREACH'
      },
      {
        letter: 'B',
        text: 'Decline the hospitality component and fund the visit independently through your own organisation\'s budget.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Accept but declare it formally through your gifts and hospitality register.',
        m: 3, i: 3, flag: null
      },
      {
        letter: 'D',
        text: 'Decline entirely — the risk to perceived independence is not worth it.',
        m: 3, i: 4, flag: null
      },
    ]
  },

  /* ── DOMAIN 4 — Risk & Compliance ── */
  {
    id: 'Q7',
    domain: 'D4',
    text: 'A new high-value contract is being onboarded under time pressure. Your legal team has flagged three clauses as high-risk but the business unit wants to sign immediately to meet a project start date. What do you do?',
    options: [
      {
        letter: 'A',
        text: 'Sign now and negotiate the clauses post-execution — the project start date cannot move.',
        m: 1, i: 0, flag: 'CUTTING_CORNERS'
      },
      {
        letter: 'B',
        text: 'Pause execution, escalate the flagged clauses to senior leadership, and negotiate resolution before signing.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Sign with a formal side letter noting the disputed clauses and committing to renegotiation within 30 days.',
        m: 2, i: 2, flag: null
      },
      {
        letter: 'D',
        text: 'Request a 48-hour extension to resolve the critical clauses — accept minor delays to protect the organisation.',
        m: 3, i: 4, flag: null
      },
    ]
  },

  {
    id: 'Q8',
    domain: 'D4',
    text: 'Your compliance audit reveals that three suppliers on your active vendor list have not completed the mandatory due diligence refresh required every 24 months. Two of these suppliers have active contracts. What is your response?',
    options: [
      {
        letter: 'A',
        text: 'Note it in the risk register and schedule the refresh at the next contract renewal.',
        m: 1, i: 1, flag: 'CUTTING_CORNERS'
      },
      {
        letter: 'B',
        text: 'Immediately suspend issuance of new purchase orders to the non-compliant suppliers and require the refresh before resuming.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Send reminder notices and allow a 30-day grace period before escalating.',
        m: 2, i: 2, flag: null
      },
      {
        letter: 'D',
        text: 'Complete the refresh for active contract suppliers immediately and schedule the third within the next cycle.',
        m: 3, i: 3, flag: null
      },
    ]
  },

  /* ── DOMAIN 5 — Cost & Value Management ── */
  {
    id: 'Q9',
    domain: 'D5',
    text: 'A contractor\'s specification for a major works package appears significantly more detailed and technically demanding than comparable market benchmarks. You suspect the specification may have been written around one particular supplier. What do you do?',
    options: [
      {
        letter: 'A',
        text: 'Proceed — the technical team wrote the spec and they know best.',
        m: 1, i: 0, flag: 'SPEC_MANIPULATION'
      },
      {
        letter: 'B',
        text: 'Commission an independent technical review of the specification before going to market.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Ask the technical team to justify the specification requirements in writing.',
        m: 3, i: 3, flag: null
      },
      {
        letter: 'D',
        text: 'Issue the specification but allow alternative equivalent solutions from bidders.',
        m: 2, i: 2, flag: null
      },
    ]
  },

  {
    id: 'Q10',
    domain: 'D5',
    text: 'Post-contract award, your organisation is experiencing a pattern of variation orders from the same contractor — each individually small but collectively exceeding 25% of the original contract value. What action do you take?',
    options: [
      {
        letter: 'A',
        text: 'Approve each variation individually — they have all been technically justified.',
        m: 1, i: 0, flag: 'CHAOS_CREATION'
      },
      {
        letter: 'B',
        text: 'Trigger a formal contract review, investigate the root cause of the variation pattern, and assess whether re-tendering is required.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Place a moratorium on further variations until a full scope review is completed.',
        m: 3, i: 3, flag: null
      },
      {
        letter: 'D',
        text: 'Escalate to the board with a recommendation to renegotiate the contract scope.',
        m: 3, i: 4, flag: null
      },
    ]
  },

  /* ── DOMAIN 6 — People, Process & Systems ── */
  {
    id: 'Q11',
    domain: 'D6',
    text: 'Your procurement team has no formal documented process for managing contract approvals. Each team member follows their own method. A recent audit flagged this as a governance risk. What is your response?',
    options: [
      {
        letter: 'A',
        text: 'The team is experienced and the informal approach works — documentation is bureaucracy.',
        m: 0, i: 1, flag: null
      },
      {
        letter: 'B',
        text: 'Develop and implement a standardised contract approval framework with defined thresholds, roles, and audit trails.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Create a simple checklist to bring minimum consistency while a full framework is developed.',
        m: 2, i: 3, flag: null
      },
      {
        letter: 'D',
        text: 'Assign one senior team member to act as the approval gatekeeper until a formal process is in place.',
        m: 2, i: 3, flag: null
      },
    ]
  },

  {
    id: 'Q12',
    domain: 'D6',
    text: 'Your procurement management system holds incomplete contract data — missing expiry dates, unsigned documents, and no alerts for renewal deadlines. A contract recently auto-renewed on unfavourable legacy terms because no one noticed the deadline. What do you do?',
    options: [
      {
        letter: 'A',
        text: 'Accept it as a one-off error and implement a manual reminder for that specific contract.',
        m: 1, i: 1, flag: null
      },
      {
        letter: 'B',
        text: 'Conduct a full contract register cleanse, implement automated renewal alerts, and assign accountability for data quality to a named role.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Set up a shared calendar for the team with manual renewal reminders for all contracts.',
        m: 2, i: 2, flag: null
      },
      {
        letter: 'D',
        text: 'Commission a system upgrade to fix the data gaps and reporting capability.',
        m: 3, i: 3, flag: null
      },
    ]
  },

  /* ── DOMAIN 7 — Ethics & Integrity ── */
  {
    id: 'Q13',
    domain: 'D7',
    text: 'A junior member of your procurement team reports to you confidentially that a colleague appears to be sharing tender information with a preferred supplier ahead of the submission deadline. How do you respond?',
    options: [
      {
        letter: 'A',
        text: 'Speak to the colleague directly and give them the opportunity to explain before escalating.',
        m: 1, i: 0, flag: 'ETHICAL_BREACH'
      },
      {
        letter: 'B',
        text: 'Immediately suspend the tender process, report to your compliance or legal function, and preserve all relevant communications as evidence.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Monitor closely for further evidence before taking action.',
        m: 1, i: 1, flag: 'CUTTING_CORNERS'
      },
      {
        letter: 'D',
        text: 'Report it to your line manager and let them decide on next steps.',
        m: 2, i: 2, flag: null
      },
    ]
  },

  {
    id: 'Q14',
    domain: 'D7',
    text: 'Your CEO asks you to shortlist a specific supplier for a major contract, citing a personal recommendation. The supplier has not gone through your standard pre-qualification process. How do you handle this?',
    options: [
      {
        letter: 'A',
        text: 'Add the supplier to the shortlist — the CEO\'s endorsement is sufficient qualification.',
        m: 0, i: 0, flag: 'ETHICAL_BREACH'
      },
      {
        letter: 'B',
        text: 'Explain that all suppliers must complete the standard pre-qualification process and offer to fast-track them through it fairly.',
        m: 4, i: 4, flag: null
      },
      {
        letter: 'C',
        text: 'Run a light-touch qualification check and include them if they pass minimum criteria.',
        m: 2, i: 2, flag: null
      },
      {
        letter: 'D',
        text: 'Escalate to the board or audit committee, citing the conflict of interest risk.',
        m: 3, i: 4, flag: null
      },
    ]
  },

];

/* ─────────────────────────────────────────────────────────
   4. INTEGRITY COEFFICIENT TABLE
───────────────────────────────────────────────────────── */
const INTEGRITY_COEFFICIENT = {
  0: 1.00,   // No flags
  1: 0.90,   // 1 pattern flag  — 10% reduction
  2: 0.75,   // 2 pattern flags — 25% reduction
  3: 0.55,   // 3 pattern flags — 45% reduction
  4: 0.30,   // Critical flag   — 70% reduction
};

/* ─────────────────────────────────────────────────────────
   5. CVR TIER DEFINITIONS
───────────────────────────────────────────────────────── */
const CVR_TIERS = [
  {
    tier: 'CVR 5',
    name: 'Vanguard',
    min: 85,
    tagline: 'World-class — ahead of the field, setting the standard.',
    colour: 'gold',
  },
  {
    tier: 'CVR 4',
    name: 'Assured',
    min: 70,
    tagline: 'Best in Class — independently verified, trustworthy.',
    colour: 'gold',
  },
  {
    tier: 'CVR 3',
    name: 'Established',
    min: 55,
    tagline: 'Enabling — systems exist, behaviour is developing.',
    colour: 'cobalt',
  },
  {
    tier: 'CVR 2',
    name: 'Developing',
    min: 40,
    tagline: 'Performing — foundation present, gaps are significant.',
    colour: 'warning',
  },
  {
    tier: 'CVR 1',
    name: 'Provisional',
    min: 20,
    tagline: 'Inhibiting — insufficient evidence or active flags.',
    colour: 'warning',
  },
  {
    tier: 'CVR 0',
    name: 'Suspended',
    min: 0,
    tagline: 'Critical integrity flag active — rating withdrawn. This is not a low score. It is a withdrawal of trust.',
    colour: 'danger',
  },
];

/* ─────────────────────────────────────────────────────────
   6. INTEGRITY FLAG LABELS
───────────────────────────────────────────────────────── */
const FLAG_LABELS = {
  ETHICAL_BREACH:   'Ethical Breach to Favour Suppliers',
  CUTTING_CORNERS:  'Cutting Corners Under Pressure',
  CHAOS_CREATION:   'Creating and Controlling Chaos',
  SPEC_MANIPULATION:'Over / Understating Specifications',
};

/* ─────────────────────────────────────────────────────────
   7. DOM REFERENCES
───────────────────────────────────────────────────────── */
const DOM = {
  // Screens
  screenWelcome:    document.getElementById('screen-welcome'),
  screenQuestions:  document.getElementById('screen-questions'),
  screenProcessing: document.getElementById('screen-processing'),
  screenResults:    document.getElementById('screen-results'),

  // Progress
  progressBar:      document.getElementById('progressBar'),
  progressFill:     document.getElementById('progressFill'),
  progressLabel:    document.getElementById('progressLabel'),

  // Welcome
  orgName:          document.getElementById('orgName'),
  orgSector:        document.getElementById('orgSector'),
  spendBracket:     document.getElementById('spendBracket'),
  responderRole:    document.getElementById('responderRole'),
  startBtn:         document.getElementById('startAssessmentBtn'),

  // Question
  questionDomain:   document.getElementById('questionDomain'),
  questionNumber:   document.getElementById('questionNumber'),
  questionText:     document.getElementById('questionText'),
  optionsContainer: document.getElementById('optionsContainer'),
  prevBtn:          document.getElementById('prevBtn'),
  nextBtn:          document.getElementById('nextBtn'),

  // Processing steps
  processingSteps:  [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4'),
    document.getElementById('step5'),
  ],

  // Results
  cvrBanner:        document.getElementById('cvrBanner'),
  cvrTier:          document.getElementById('cvrTier'),
  cvrName:          document.getElementById('cvrName'),
  cvrTagline:       document.getElementById('cvrTagline'),
  pmmScore:         document.getElementById('pmmScore'),
  maturityIndex:    document.getElementById('maturityIndex'),
  integrityIndex:   document.getElementById('integrityIndex'),
  integrityStatus:  document.getElementById('integrityStatus'),
  integrityCard:    document.getElementById('integrityCard'),
  domainBreakdown:  document.getElementById('domainBreakdown'),
  integrityFlags:   document.getElementById('integrityFlags'),
  reportNarrative:  document.getElementById('reportNarrative'),
  recommendations:  document.getElementById('recommendations'),

  // Buttons
  downloadPdfBtn:   document.getElementById('downloadPdfBtn'),
  restartBtn:       document.getElementById('restartBtn'),
};

/* ─────────────────────────────────────────────────────────
   8. SCREEN MANAGER
───────────────────────────────────────────────────────── */
function showScreen(screenId) {
  const screens = [
    DOM.screenWelcome,
    DOM.screenQuestions,
    DOM.screenProcessing,
    DOM.screenResults,
  ];
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─────────────────────────────────────────────────────────
   9. PROGRESS BAR UPDATER
───────────────────────────────────────────────────────── */
function updateProgress(current, total) {
  const pct = ((current) / total) * 100;
  DOM.progressFill.style.width = `${pct}%`;
  DOM.progressLabel.textContent = `Question ${current} of ${total}`;
  DOM.progressBar.classList.add('visible');
}

/* ─────────────────────────────────────────────────────────
   10. RENDER QUESTION
───────────────────────────────────────────────────────── */
function renderQuestion(index) {
  const q = QUESTIONS[index];
  const domain = DOMAINS.find(d => d.id === q.domain);

  // Update domain tag and question meta
  DOM.questionDomain.textContent = domain.name;
  DOM.questionNumber.textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  DOM.questionText.textContent = q.text;

  // Update progress
  updateProgress(index + 1, QUESTIONS.length);

  // Render options
  DOM.optionsContainer.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('div');
    btn.className = 'cv-option';
    if (STATE.answers[q.id] === i) btn.classList.add('selected');

    btn.innerHTML = `
      <div class="cv-option__letter">${opt.letter}</div>
      <div class="cv-option__text">${opt.text}</div>
    `;

    btn.addEventListener('click', () => selectOption(q.id, i, btn));
    DOM.optionsContainer.appendChild(btn);
  });

  // Update nav buttons
  DOM.prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
  DOM.nextBtn.disabled = STATE.answers[q.id] === undefined;

  // Last question — change button text
  if (index === QUESTIONS.length - 1) {
    DOM.nextBtn.textContent = 'Submit Assessment →';
  } else {
    DOM.nextBtn.textContent = 'Next Question →';
  }
}

/* ─────────────────────────────────────────────────────────
   11. SELECT OPTION
───────────────────────────────────────────────────────── */
function selectOption(questionId, optionIndex, clickedEl) {
  // Remove selected from all siblings
  document.querySelectorAll('.cv-option').forEach(o => o.classList.remove('selected'));
  clickedEl.classList.add('selected');

  // Store answer
  STATE.answers[questionId] = optionIndex;

  // Enable next button
  DOM.nextBtn.disabled = false;
}

/* ─────────────────────────────────────────────────────────
   12. SCORING ENGINE
───────────────────────────────────────────────────────── */
function calculateScores() {

  // ── 12a. Collect per-domain maturity and integrity scores ──
  const domainScores = {};
  DOMAINS.forEach(d => {
    domainScores[d.id] = { maturityTotal: 0, integrityTotal: 0, count: 0 };
  });

  const flagsTriggered = {};   // Track unique flags triggered
  let criticalFlag = false;

  QUESTIONS.forEach(q => {
    const answerIndex = STATE.answers[q.id];
    if (answerIndex === undefined) return;

    const opt = q.options[answerIndex];
    const ds  = domainScores[q.domain];

    // Normalise to 0–100
    ds.maturityTotal  += (opt.m / 4) * 100;
    ds.integrityTotal += (opt.i / 4) * 100;
    ds.count          += 1;

    // Flag detection
    if (opt.flag) {
      if (!flagsTriggered[opt.flag]) flagsTriggered[opt.flag] = 0;
      flagsTriggered[opt.flag]++;

      // Critical flag = ETHICAL_BREACH triggered 2+ times OR i === 0
      if (opt.i === 0) criticalFlag = true;
    }
  });

  // ── 12b. Calculate raw domain averages ──
  const rawDomainAverages = {};
  DOMAINS.forEach(d => {
    const ds = domainScores[d.id];
    rawDomainAverages[d.id] = ds.count > 0
      ? { maturity: ds.maturityTotal / ds.count, integrity: ds.integrityTotal / ds.count }
      : { maturity: 0, integrity: 0 };
  });

  // ── 12c. Determine Integrity Coefficient ──
  const uniqueFlagCount = Object.keys(flagsTriggered).length;
  let coefficientKey = criticalFlag ? 4 : Math.min(uniqueFlagCount, 3);
  const integrityCoefficient = INTEGRITY_COEFFICIENT[coefficientKey];

  // ── 12d. Apply Integrity Coefficient to each domain ──
  const adjustedDomainScores = {};
  DOMAINS.forEach(d => {
    adjustedDomainScores[d.id] = rawDomainAverages[d.id].maturity * integrityCoefficient;
  });

  // ── 12e. Calculate weighted Final PMM Score ──
  let finalPMMScore = 0;
  DOMAINS.forEach(d => {
    finalPMMScore += adjustedDomainScores[d.id] * d.weight;
  });

  // ── 12f. Calculate overall Maturity Index (pre-coefficient) ──
  let rawMaturityIndex = 0;
  DOMAINS.forEach(d => {
    rawMaturityIndex += rawDomainAverages[d.id].maturity * d.weight;
  });

  // ── 12g. Calculate overall Integrity Index ──
  let rawIntegrityIndex = 0;
  DOMAINS.forEach(d => {
    rawIntegrityIndex += rawDomainAverages[d.id].integrity * d.weight;
  });

  // ── 12h. Determine CVR Tier ──
  let cvrTier = CVR_TIERS[CVR_TIERS.length - 1]; // Default to Suspended
  if (!criticalFlag) {
    for (const tier of CVR_TIERS) {
      if (finalPMMScore >= tier.min) {
        cvrTier = tier;
        break;
      }
    }
  }

  return {
    finalPMMScore:         Math.round(finalPMMScore),
    rawMaturityIndex:      Math.round(rawMaturityIndex),
    rawIntegrityIndex:     Math.round(rawIntegrityIndex),
    adjustedDomainScores,
    rawDomainAverages,
    integrityCoefficient,
    flagsTriggered,
    criticalFlag,
    cvrTier,
  };
}

/* ─────────────────────────────────────────────────────────
   13. PROCESSING ANIMATION
───────────────────────────────────────────────────────── */
function runProcessingAnimation(callback) {
  showScreen('screen-processing');
  DOM.progressBar.classList.remove('visible');

  const steps = DOM.processingSteps;
  steps.forEach(s => {
    s.classList.remove('done');
    s.textContent = s.textContent.replace('✅', '⏳');
  });

  const stepLabels = [
    '✅ Domain maturity scored across 7 domains',
    '✅ Integrity pattern detection complete',
    '✅ Integrity Coefficient applied',
    '✅ Final PMM Score calculated',
    '✅ CVR™ Rating generated',
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i < steps.length) {
      steps[i].textContent = stepLabels[i];
      steps[i].classList.add('done');
      i++;
    } else {
      clearInterval(interval);
      setTimeout(callback, 600);
    }
  }, 700);
}

/* ─────────────────────────────────────────────────────────
   14. RENDER RESULTS
───────────────────────────────────────────────────────── */
function renderResults(scores) {

  const {
    finalPMMScore,
    rawMaturityIndex,
    rawIntegrityIndex,
    adjustedDomainScores,
    flagsTriggered,
    criticalFlag,
    cvrTier,
    integrityCoefficient,
  } = scores;

  // ── CVR Banner ──
  DOM.cvrTier.textContent  = cvrTier.tier;
  DOM.cvrName.textContent  = cvrTier.name;
  DOM.cvrTagline.textContent = cvrTier.tagline;

  // Banner colour variant
  DOM.cvrBanner.className = 'cv-cvr-banner';
  if (cvrTier.tier === 'CVR 0') DOM.cvrBanner.classList.add('cv-cvr-banner--suspended');
  if (cvrTier.tier === 'CVR 1') DOM.cvrBanner.classList.add('cv-cvr-banner--provisional');

  // ── Scores ──
  DOM.pmmScore.textContent      = finalPMMScore;
  DOM.maturityIndex.textContent = rawMaturityIndex;
  DOM.integrityIndex.textContent = rawIntegrityIndex;

  // Integrity card status
  DOM.integrityCard.className = 'cv-score-card cv-score-card--integrity';
  if (criticalFlag) {
    DOM.integrityCard.classList.add('critical');
    DOM.integrityStatus.textContent = 'Critical Flag Active';
  } else if (Object.keys(flagsTriggered).length > 0) {
    DOM.integrityCard.classList.add('flagged');
    DOM.integrityStatus.textContent = `${Object.keys(flagsTriggered).length} Pattern Flag(s)`;
  } else {
    DOM.integrityStatus.textContent = 'Clean — No Flags';
  }

  // ── Domain Breakdown ──
  DOM.domainBreakdown.innerHTML = '';
  DOMAINS.forEach(d => {
    const score = Math.round(adjustedDomainScores[d.id]);
    const row   = document.createElement('div');
    row.className = 'cv-domain-row';
    row.innerHTML = `
      <div class="cv-domain-row__name">${d.name}</div>
      <div class="cv-domain-row__bar-wrap">
        <div class="cv-domain-row__bar" style="width: ${score}%"></div>
      </div>
      <div class="cv-domain-row__score">${score}</div>
    `;
    DOM.domainBreakdown.appendChild(row);
  });

  // ── Integrity Flags ──
  DOM.integrityFlags.innerHTML = '';

  if (Object.keys(flagsTriggered).length === 0 && !criticalFlag) {
    DOM.integrityFlags.innerHTML = `
      <div class="cv-flag cv-flag--clean">
        <div class="cv-flag__icon">✅</div>
        <div class="cv-flag__body">
          <div class="cv-flag__title">No Integrity Flags Detected</div>
          <div class="cv-flag__desc">
            No behavioural integrity patterns were observed across this assessment.
            Your responses are consistent with transparent, process-led procurement practice.
          </div>
        </div>
      </div>
    `;
  } else {
    if (criticalFlag) {
      DOM.integrityFlags.innerHTML += `
        <div class="cv-flag cv-flag--critical">
          <div class="cv-flag__icon">🚨</div>
          <div class="cv-flag__body">
            <div class="cv-flag__title">Critical Integrity Flag Active</div>
            <div class="cv-flag__desc">
              One or more responses indicate a critical breakdown in procurement integrity.
              The CVR™ Rating has been suspended. This is not a low score —
              it is a withdrawal of trust. Immediate review is required.
            </div>
          </div>
        </div>
      `;
    }

    Object.entries(flagsTriggered).forEach(([flag, count]) => {
      DOM.integrityFlags.innerHTML += `
        <div class="cv-flag">
          <div class="cv-flag__icon">⚠️</div>
          <div class="cv-flag__body">
            <div class="cv-flag__title">${FLAG_LABELS[flag]}</div>
            <div class="cv-flag__desc">
              Pattern detected ${count} time(s) across your responses.
              This behaviour is a recognised integrity risk signal in procurement environments.
            </div>
          </div>
        </div>
      `;
    });
  }

  // ── Narrative Summary ──
  DOM.reportNarrative.textContent = buildNarrative(
    STATE.orgName, cvrTier, finalPMMScore,
    rawIntegrityIndex, criticalFlag, Object.keys(flagsTriggered).length,
    integrityCoefficient
  );

  // ── Recommendations ──
  DOM.recommendations.innerHTML = '';
  buildRecommendations(scores).forEach((rec, idx) => {
    const el = document.createElement('div');
    el.className = 'cv-recommendation';
    el.innerHTML = `
      <div class="cv-recommendation__number">${idx + 1}</div>
      <div class="cv-recommendation__text">
        <strong>${rec.title}</strong>
        ${rec.body}
      </div>
    `;
    DOM.recommendations.appendChild(el);
  });

  showScreen('screen-results');
}

/* ─────────────────────────────────────────────────────────
   15. NARRATIVE BUILDER
───────────────────────────────────────────────────────── */
function buildNarrative(orgName, cvrTier, pmmScore, integrityIndex, criticalFlag, flagCount, coefficient) {
  const org = orgName || 'Your organisation';

  if (criticalFlag) {
    return `${org} has received a CVR™ Suspended rating following the detection of a critical integrity flag in this assessment. The CVR™ Suspended designation is not a reflection of low capability — it is a withdrawal of trust. Procurement capability without integrity is not maturity; it is sophisticated risk. Immediate intervention is required before any CVR™ rating can be issued.`;
  }

  if (pmmScore >= 85) {
    return `${org} demonstrates world-class procurement maturity with a PMM Score of ${pmmScore} and a CVR™ ${cvrTier.tier} — ${cvrTier.name} rating. Procurement systems, governance structures, and ethical behaviours are operating at the highest observable standard. ${org} is positioned to set the benchmark across its sector and serve as a reference point for procurement excellence.`;
  }

  if (pmmScore >= 70) {
    return `${org} demonstrates best-in-class procurement practices with a PMM Score of ${pmmScore} and a CVR™ ${cvrTier.tier} — ${cvrTier.name} rating. Governance structures are strong, integrity behaviours are consistent, and the procurement function is independently verifiable. Targeted improvements in the lower-scoring domains will consolidate this position and drive towards Vanguard status.`;
  }

  if (pmmScore >= 55) {
    return `${org} has reached an established level of procurement maturity with a PMM Score of ${pmmScore} and a CVR™ ${cvrTier.tier} — ${cvrTier.name} rating. Core systems and processes are in place and functioning. The primary opportunity for improvement lies in strengthening consistency of application, deepening governance structures, and addressing any integrity pattern signals identified in this assessment.`;
  }

  if (pmmScore >= 40) {
    return `${org} is in a developing stage of procurement maturity with a PMM Score of ${pmmScore} and a CVR™ ${cvrTier.tier} — ${cvrTier.name} rating. A procurement foundation exists but significant gaps remain in governance, process consistency, and integrity behaviours. ${flagCount > 0 ? `${flagCount} integrity pattern flag(s) were detected, applying a coefficient of ${coefficient} to the final score. ` : ''}Structured investment in people, process, and systems is required to progress.`;
  }

  return `${org} is at a provisional stage of procurement maturity with a PMM Score of ${pmmScore} and a CVR™ ${cvrTier.tier} — ${cvrTier.name} rating. The assessment indicates insufficient evidence of mature procurement practice and ${flagCount > 0 ? `${flagCount} integrity concern(s) were flagged` : 'foundational gaps in governance and process'}. Immediate focus on building core procurement capability and integrity foundations is strongly recommended.`;
}

/* ─────────────────────────────────────────────────────────
   16. RECOMMENDATION BUILDER
───────────────────────────────────────────────────────── */
function buildRecommendations(scores) {
  const { finalPMMScore, flagsTriggered, criticalFlag, adjustedDomainScores } = scores;
  const recs = [];

  // Critical flag recommendation
  if (criticalFlag) {
    recs.push({
      title: 'Immediate Integrity Review Required',
      body: 'Engage an independent procurement integrity review. The CVR™ Suspended status cannot be lifted until a formal investigation and remediation plan has been completed and validated.',
    });
  }

  // Flag-specific recommendations
  if (flagsTriggered.ETHICAL_BREACH) {
    recs.push({
      title: 'Strengthen Conflict of Interest Controls',
      body: 'Implement mandatory conflict of interest declarations at all stages of the sourcing process. All single-source decisions must be independently reviewed and board-approved.',
    });
  }

  if (flagsTriggered.CUTTING_CORNERS) {
    recs.push({
      title: 'Enforce Process Compliance Under Pressure',
      body: 'Build a culture where procurement process adherence is non-negotiable regardless of programme pressure. Implement a formal exception management framework with board-level sign-off for any process deviations.',
    });
  }

  if (flagsTriggered.CHAOS_CREATION) {
    recs.push({
      title: 'Variation & Amendment Pattern Review',
      body: 'Commission an audit of all contracts with variation orders exceeding 10% of original contract value. Establish variation thresholds that trigger mandatory re-evaluation of scope and contract structure.',
    });
  }

  if (flagsTriggered.SPEC_MANIPULATION) {
    recs.push({
      title: 'Independent Specification Review Process',
      body: 'All technical specifications for contracts over your RFx threshold must be reviewed by an independent technical authority before going to market. Implement performance-based specifications as the default approach.',
    });
  }

  // Domain-based recommendations — find lowest two scoring domains
  const sortedDomains = DOMAINS
    .map(d => ({ ...d, score: Math.round(adjustedDomainScores[d.id]) }))
    .sort((a, b) => a.score - b.score);

  const lowestTwo = sortedDomains.slice(0, 2);
  lowestTwo.forEach(d => {
    if (d.score < 70) {
      recs.push({
        title: `Prioritise Improvement: ${d.name}`,
        body: `This domain scored ${d.score}/100 — below the ContractVault benchmark threshold. A targeted improvement plan with measurable milestones is recommended to lift performance in this area.`,
      });
    }
  });

  // General recommendation if score is good
  if (finalPMMScore >= 70 && recs.length === 0) {
    recs.push({
      title: 'Evidence Vault — Validate Your Rating',
      body: 'Upload supporting documentation to the ContractVault Evidence Vault to validate and confirm your CVR™ Rating. Validated ratings carry greater weight with funders, regulators, and boards.',
    });
    recs.push({
      title: 'Continuous Monitoring — Activate Behavioural Engine',
      body: 'Your rating will now be monitored continuously through the ContractVault Behavioural Engine. Each contract uploaded and each procurement decision tracked will update your PMM Score in real time.',
    });
  }

  return recs;
}

/* ─────────────────────────────────────────────────────────
   17. PDF DOWNLOAD
───────────────────────────────────────────────────────── */
function downloadPDF() {
  const scores = calculateScores();
  const {
    finalPMMScore, rawMaturityIndex, rawIntegrityIndex,
    adjustedDomainScores, flagsTriggered, criticalFlag, cvrTier
  } = scores;

  const org    = STATE.orgName    || 'Organisation Not Specified';
  const sector = STATE.orgSector  || 'Not Specified';
  const role   = STATE.responderRole || 'Not Specified';
  const date   = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  // Build flag list
  let flagText = 'None detected.';
  if (criticalFlag) flagText = 'CRITICAL FLAG ACTIVE — CVR™ Suspended';
  else if (Object.keys(flagsTriggered).length > 0) {
    flagText = Object.keys(flagsTriggered)
      .map(f => FLAG_LABELS[f])
      .join(' | ');
  }

  // Build domain rows
  const domainRows = DOMAINS.map(d => {
    const score = Math.round(adjustedDomainScores[d.id]);
    return `${d.name}: ${score}/100`;
  }).join('\n');

  const narrative = buildNarrative(
    STATE.orgName, cvrTier, finalPMMScore,
    rawIntegrityIndex, criticalFlag,
    Object.keys(flagsTriggered).length,
    scores.integrityCoefficient
  );

  const recs = buildRecommendations(scores)
    .map((r, i) => `${i + 1}. ${r.title}: ${r.body}`)
    .join('\n\n');

  const content = `
CONTRACTVAULT — MODULE 10
PROCUREMENT GOLD STANDARD EVALUATOR
PMM Assessment Report

════════════════════════════════════════════════════════
ASSESSMENT DETAILS
════════════════════════════════════════════════════════
Organisation : ${org}
Sector       : ${sector}
Role         : ${role}
Date         : ${date}
Platform     : ContractVault — contractvault.netlify.app

════════════════════════════════════════════════════════
CVR™ RATING
════════════════════════════════════════════════════════
${cvrTier.tier} — ${cvrTier.name}
"${cvrTier.tagline}"

════════════════════════════════════════════════════════
SCORES
════════════════════════════════════════════════════════
Final PMM Score   : ${finalPMMScore} / 100
Maturity Index    : ${rawMaturityIndex} / 100
Integrity Index   : ${rawIntegrityIndex} / 100
Integrity Flags   : ${flagText}

════════════════════════════════════════════════════════
DOMAIN BREAKDOWN
════════════════════════════════════════════════════════
${domainRows}

════════════════════════════════════════════════════════
ASSESSMENT SUMMARY
════════════════════════════════════════════════════════
${narrative}

════════════════════════════════════════════════════════
PRIORITY RECOMMENDATIONS
════════════════════════════════════════════════════════
${recs}

════════════════════════════════════════════════════════
DISCLAIMER
════════════════════════════════════════════════════════
This assessment is based on self-reported responses and
produces an Estimated Maturity rating pending validation.
Upload supporting documentation to the ContractVault
Evidence Vault to validate and confirm your CVR™ Rating.

© 2026 Austine Jarome. All Rights Reserved.
ContractVault is the intellectual property of Austine Jarome.
Capability without integrity is not maturity — it is sophisticated risk.
  `.trim();

  // Create and trigger download
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `ContractVault_PMM_Report_${org.replace(/\s+/g, '_')}_${date.replace(/\s/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ─────────────────────────────────────────────────────────
   18. RESET / RESTART
───────────────────────────────────────────────────────── */
function resetAssessment() {
  STATE.currentQuestion = 0;
  STATE.answers         = {};
  STATE.orgName         = '';
  STATE.orgSector       = '';
  STATE.spendBracket    = '';
  STATE.responderRole   = '';

  DOM.orgName.value       = '';
  DOM.orgSector.value     = '';
  DOM.spendBracket.value  = '';
  DOM.responderRole.value = '';

  DOM.progressBar.classList.remove('visible');
  showScreen('screen-welcome');
}

/* ─────────────────────────────────────────────────────────
   19. EVENT LISTENERS
───────────────────────────────────────────────────────── */

// START ASSESSMENT
DOM.startBtn.addEventListener('click', () => {
  const org     = DOM.orgName.value.trim();
  const sector  = DOM.orgSector.value;
  const spend   = DOM.spendBracket.value;
  const role    = DOM.responderRole.value;

  if (!org || !sector || !spend || !role) {
    alert('Please complete all fields before starting the assessment.');
    return;
  }

  STATE.orgName       = org;
  STATE.orgSector     = sector;
  STATE.spendBracket  = spend;
  STATE.responderRole = role;

  STATE.currentQuestion = 0;
  showScreen('screen-questions');
  renderQuestion(STATE.currentQuestion);
});

// NEXT QUESTION
DOM.nextBtn.addEventListener('click', () => {
  if (STATE.currentQuestion < QUESTIONS.length - 1) {
    STATE.currentQuestion++;
    renderQuestion(STATE.currentQuestion);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Last question — run scoring
    runProcessingAnimation(() => {
      const scores = calculateScores();
      renderResults(scores);
    });
  }
});

// PREVIOUS QUESTION
DOM.prevBtn.addEventListener('click', () => {
  if (STATE.currentQuestion > 0) {
    STATE.currentQuestion--;
    renderQuestion(STATE.currentQuestion);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// DOWNLOAD PDF
DOM.downloadPdfBtn.addEventListener('click', downloadPDF);

// RESTART
DOM.restartBtn.addEventListener('click', resetAssessment);
