# A3 Billiards Academy — Booking Website (Minimal)

This is a minimal Next.js project scaffold for A3 Billiards Academy booking site.
It implements:
- 8 tables
- ₹320 / hour base rate
- Discount options: 5% and 8%
- QR payment page that shows your provided QR and a WhatsApp button with prefilled message
- Client-side booking storage (localStorage) and a simple Admin page to confirm bookings

**Important:** This scaffold uses client-side storage so you can test immediately. To make it production-ready:
1. Create a Firebase project (or Supabase).
2. Replace `/lib/firebaseConfig.js` with your Firebase config and wire server-side or client-side writes.
3. Update Vercel environment variables if needed and deploy from GitHub.

### Files
- pages/index.js — landing page
- pages/book.js — booking form
- pages/payment.js — QR + WhatsApp flow
- pages/admin.js — admin view (reads from localStorage)
- public/qr.jpg — your uploaded QR image (already included)
- lib/firebaseConfig.js — template for firebase config
- README.md — this file

### WhatsApp button
Opens chat with: +91 78678 60716 and prefilled booking details.

### How to run locally
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Visit http://localhost:3000

### Notes
- Replace the client-side storage with a real DB before accepting production bookings.
- The admin page currently allows marking bookings as confirmed (stored in localStorage).
