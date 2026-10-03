# Approvly — Client Project Feedback & Approval Portal

**Approvly** is a multi-company SaaS portal where software agencies and development teams share deliverables with clients, collect structured pin-point feedback, run AI-assisted revision rounds, carry unresolved issues forward across version releases, and record formal, immutable client sign-offs.

---

## 🚀 Quick Setup & Run Instructions

```bash
# 1. Clone or navigate to the project directory
cd approvly

# 2. Install dependencies
npm install

# 3. Start the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local`:

```bash
# Data storage mode: local | supabase (default: local)
NEXT_PUBLIC_DATA_MODE=local

# Anthropic Claude API key for AI Provider (Optional: if omitted, MockAIProvider is automatically used)
ANTHROPIC_API_KEY=
```

---

## 👥 Demo Accounts (Pre-filled)

- **Admin (Company Owner)**: Maya Chen (`maya@pixelandpine.com`) — Sees all projects, manages org, team, and settings.
- **Team Member (Developer/Designer)**: Rohan Mehta (`rohan@pixelandpine.com`) — Works on assigned feedback, uploads versions, adds internal notes.
- **Client (Acme Retail)**: Jordan Blake (`jordan@acmeretail.com`) — Simplified jargon-free portal, leaves feedback, resolves items, requests changes, and grants final approval.

> 💡 **Demo Controls Pill**: A floating control pill in the bottom-left corner enables 1-click role switching, instant data resets, and an interactive **Guided Hackathon Demo Checklist**.

---

## 🎬 Step-by-Step Hackathon Demo Script

Follow these 8 steps to demonstrate the core workflow:

1. **Step 1 — Switch to Client & Launch Review**: Click **Client** on the Demo Controls pill (bottom-left) and open the **Website Prototype V2** in the Review Screen.
2. **Step 2 — Submit Compound Feedback**: Type: *"The website loads slowly on mobile and the checkout button is difficult to find."* and submit.
3. **Step 3 — Observe AI Feedback Splitting**: The AI engine automatically splits the feedback into:
   - Item 1: `Performance` — `HIGH` — Action: *"Optimize mobile page loading speed"*
   - Item 2: `UI/UX` — `MEDIUM` — Action: *"Improve checkout button visibility"*
4. **Step 4 — Request Changes**: Click **Request Changes**. The deliverable status updates to *Changes Requested*.
5. **Step 5 — Switch to Team & Inspect AI**: Click **Team** in Demo Controls. Notice the feedback cards display AI action items with **NO** confidence score. Expand **AI analysis details** to view confidence metrics (94%). Assign items and mark them as *Addressed*.
6. **Step 6 — Upload New Version (V3)**: Rohan clicks **Upload new version**, selects the V3 demo preset, enters release notes (*"Lazy-loaded images and sticky high-contrast checkout button"*), and submits. Status returns to *In Review*, and unresolved feedback items are automatically carried forward with `↗ Carried from V2` badges.
7. **Step 7 — Client Resolution & Approval**: Switch back to **Client**. Inspect V3 (fast-loading storefront). Mark both carried items as *Resolved*, then click **Approve ✅**, confirming in the sign-off dialog.
8. **Step 8 — Immutable Approval Record**: Inspect the green **Approved ✅** state, timestamp, SHA checksum, audit timeline, and click **Download / Print Approval Record** to view the printable sign-off document.

---

## 🛠 Architecture & AI Provider Swapping

- **Data Layer Repository Pattern**: Interface `DataRepository` (`lib/data/repository.ts`) implemented by `LocalRepository` (persisted in localStorage with 300–600ms latency simulation). To connect Supabase, update `NEXT_PUBLIC_DATA_MODE=supabase` and run `supabase/schema.sql`.
- **AI Provider Pattern**: `AIProvider` (`lib/ai/provider.ts`) implemented by `MockAIProvider` (deterministic heuristic analyzer) and `ClaudeAIProvider` (calls `/api/ai/analyze` with Anthropic API key). Automatically falls back to mock mode if the API key is missing or fails.

---

## 📝 Assumptions & Future Work

- **Local Storage Scope**: Built to run out-of-the-box with zero configuration for hackathon evaluation.
- **No Auth Library Dependency**: Lightweight persona switcher enables frictionless role testing.
- **Future Enhancements**: Real-time WebSocket pin synchronization, Figma direct plugin integration, automated PDF diff overlay.
