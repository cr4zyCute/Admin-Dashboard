# Plan: Add Scroll Animations to Analytics Page

## 1. Install Dependencies
- [ ] Install `framer-motion` package
  - Command: `npm install framer-motion`

## 2. Refactor `Analytics.tsx`
- [ ] Import `motion` from `framer-motion`
- [ ] Define animation variants (optional, or use inline props) for cleaner code
  - `fadeInUp`: `{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }`
- [ ] Apply `motion.div` to the following sections:
  - Top Metrics Grid (Page Views, Visitors, etc.)
  - Middle Section Grid (Total Profit, Most Day Active)
  - Bottom Section Grid (Best Selling Products, Recent Orders, Revenue By Locations)
- [ ] Ensure `viewport={{ once: true }}` is set so animations don't replay when scrolling back up.
