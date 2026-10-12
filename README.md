# Navodaya Pack — Website Redesign

Modern, high-performance, responsive industrial web application for **Navodaya Packing Industries India Pvt Ltd** (`Navodaya Pack`). Built from ground up to replace the legacy Flutter web application with a modern React, Vite, TypeScript, and Tailwind CSS v4 architecture.

---

## 1. Architectural Highlights

- **Framework**: React 19 + TypeScript (Strict typing)
- **Bundler & Tooling**: Vite 6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with curated industrial editorial tokens:
  - Deep Navy: `#102A43`
  - Electric Blue: `#2563EB`
  - Charcoal: `#171C24`
  - Cool Light Grey: `#F1F5F9`
  - Fluid typography with `clamp()`
- **Routing**: React Router 7 supporting all original public canonical URLs:
  - `/` — Homepage
  - `/hdpe-drums` — HDPE Drums Catalog (6L to 120L)
  - `/fiber-drums` — Fibre Drums Catalog (10" to 20" Dia)
  - `/composite-containers` — Composite Containers Catalog (75mm Dia)
  - `/product/:productId` — Dedicated Individual Product Specification & TDS Pages (25 individual variants)
  - `/contact-us` — Let's Talk Packaging (Contact & Facilities)
- **Icons**: Lucide React
- **Asset Integrity**: 100% authentic original Navodaya Pack product photos, drum size profile images, plant location map embed, and genuine client logos (Divi's, MSN, Mylan, Hetero, Granules, Sai Life, Suven, etc.).

---

## 2. Implemented Pages

| Route | Page | Key Features |
|---|---|---|
| `/` | **Homepage** | Editorial hero, verified corporate overview, 3-product portfolio cards, client trust grid, dual Telangana facility profiles, conversion enquiry CTA. |
| `/hdpe-drums` | **HDPE Drums** | Verified polymer science & chemical resistance data, interactive searchable specification table (6L to 120L with *h height variants), image gallery, quote triggers. |
| `/fiber-drums` | **Fibre Drums** | Kraft paperboard durability details, international shipping standards, searchable diameter table (10"–20"), custom height options, liner selection. |
| `/composite-containers` | **Composite Containers** | Rigid cylindrical container showcase, 75mm standard diameter specs, retail shelf impact features, diverse food/pharma/technical applications. |
| `/contact-us` | **Contact Us** | Dual facility breakdown (Corporate Office & Kazipally IDA Plant), click-to-call links, live interactive Google Maps embed, quotation inquiry form. |

---

## 3. Local Development & Build

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173/`.

### Run TypeScript & Production Build
```bash
npm run build
```
The compiled, optimized production bundle will be generated in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 4. Verified Content & Sourced Assets

All product data and company credentials in this project reflect authentic information verified from Navodaya Packing Industries:

1. **Company Name**: Navodaya Packing Industries India Pvt Ltd
2. **Corporate Headquarters**: Plot No: C/8/1, HMT Satavahana Nagar, Opp: KPHB Colony, Kukatpally, Hyderabad - 500072, Telangana, INDIA. (Phone: +91 93488 51166, +91 97041 59586)
3. **Manufacturing Plant**: Plot No: 19/A, Survey No: 180/1 to 15, Kazipally IDA, Jinnaram (M), Sanga Reddy Dist., Telangana - 502319, INDIA. (Phone: +91 93484 51166, +91 93932 51166)
4. **Authentic Assets Included**:
   - `public/images/NPI_New_Trans.png` — Official Navodaya Pack transparent insignia
   - `public/images/hdpe_all.png` & `public/images/fiber_all.png` — Multi-drum lineup photography
   - `public/images/sizes/*.png` — 14 authentic drum capacity profile photographs
   - `public/images/clients/*.jpg/*.png` — Genuine customer logos including Divi's, MSN, Mylan, Hetero, etc.

---

## 5. Items Pending Final Client Confirmation / Backend Integration

1. **Enquiry Form Backend**:
   - The enquiry form interface currently validates all fields and provides immediate user feedback.
   - To deliver inquiries to sales email or CRM, connect the `handleSubmit` in `src/components/EnquiryForm.tsx` to an API endpoint (e.g., AWS SES, Resend, Formspree, or an internal enterprise webhook).
2. **Dedicated Sales Email**:
   - The default corporate email is set to `info@navodayapack.in`. Confirm if a dedicated sales inbox (such as `sales@navodayapack.in`) should receive inquiries.
