import { jsPDF } from 'jspdf';
import { IndividualProduct } from '../types';

// Helper to load image as base64 data URL
const loadImageAsBase64 = (url: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 443;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

export const downloadProductTdsPdf = async (product: IndividualProduct): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // 1. Corporate Header Top Banner
  doc.setFillColor(16, 42, 67); // #102A43 (Navy)
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Accent stripe
  doc.setFillColor(37, 99, 235); // #2563EB (Electric Blue)
  doc.rect(0, 28, pageWidth, 2.5, 'F');

  // Header Typography
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('NAVODAYA PACKING INDUSTRIES INDIA PVT. LTD.', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(191, 219, 254); // Light blue
  doc.text('TECHNICAL DATA SHEET (TDS) • INDUSTRIAL PACKAGING SPECIFICATION', margin, 18);

  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.text(`DOC REF: NPI/TDS/${product.id.toUpperCase()}  •  ISSUED: ${today}  •  PLANT: KAZIPALLY IDA`, margin, 24);

  // 2. Product Title & Hero Block
  let currentY = 37;

  doc.setTextColor(16, 42, 67);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(product.name, margin, currentY);

  currentY += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text(`${product.category.toUpperCase()}  |  STANDARD CAPACITY: ${product.capacity.toUpperCase()}`, margin, currentY);

  currentY += 6;

  // 3. Product Visual & Core Specs Row
  const photoBoxWidth = 55;
  const photoBoxHeight = 65;
  const photoBoxX = margin;
  const photoBoxY = currentY;

  // Background box for product photo
  doc.setFillColor(248, 250, 252); // #F8FAFC
  doc.setDrawColor(226, 232, 240); // #E2E8F0
  doc.roundedRect(photoBoxX, photoBoxY, photoBoxWidth, photoBoxHeight, 2, 2, 'FD');

  // Load and embed image if available
  const imgData = await loadImageAsBase64(product.image);
  if (imgData) {
    try {
      doc.addImage(imgData, 'PNG', photoBoxX + 5, photoBoxY + 5, photoBoxWidth - 10, photoBoxHeight - 10, undefined, 'FAST');
    } catch {
      // Fallback text if embedding fails
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(product.name, photoBoxX + 10, photoBoxY + 30);
    }
  }

  // Right Side: Quick Specifications Table
  const tableX = photoBoxX + photoBoxWidth + 6;
  const tableWidth = contentWidth - photoBoxWidth - 6;
  let tableY = photoBoxY;

  doc.setFillColor(16, 42, 67);
  doc.rect(tableX, tableY, tableWidth, 6.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('KEY TECHNICAL PARAMETERS', tableX + 3, tableY + 4.5);

  tableY += 6.5;

  const specRows: [string, string][] = [
    ['Standard Nominal Capacity', product.capacity],
    ['Raw Material Polymer / Core', product.material],
    ['Closure / Sealing Mechanism', product.closure],
    ['Standard Overall Height (*h)', product.heightMm || 'Standard Profile'],
    ['Outer Diameter / Core Size', product.diameterMm || 'Standard Profile'],
    ['Primary Manufacturing Plant', 'Kazipally IDA, Hyderabad, Telangana'],
    ['Compliance Standard', 'Developed as per industry-set quality standards'],
  ];

  doc.setFontSize(7.5);
  specRows.forEach(([label, value], idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(tableX, tableY, tableWidth, 6.5, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(tableX, tableY + 6.5, tableX + tableWidth, tableY + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text(label, tableX + 3, tableY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    const splitVal = doc.splitTextToSize(value, tableWidth - 52);
    doc.text(splitVal[0] || value, tableX + 50, tableY + 4.5);

    tableY += 6.5;
  });

  currentY = Math.max(photoBoxY + photoBoxHeight, tableY) + 6;

  // 4. Engineering Summary & Description
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, currentY, contentWidth, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(16, 42, 67);
  doc.text('1.0 SPECIFICATION & PRODUCT SUMMARY', margin + 3, currentY + 4);

  currentY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(product.summary, contentWidth - 4);
  doc.text(summaryLines, margin + 2, currentY);
  currentY += summaryLines.length * 3.5 + 2;

  // Detailed description paragraph
  if (product.detailedDescription && product.detailedDescription[0]) {
    const descLines = doc.splitTextToSize(product.detailedDescription[0], contentWidth - 4);
    doc.text(descLines, margin + 2, currentY);
    currentY += descLines.length * 3.5 + 4;
  }

  // 5. Chemical Compatibility Matrix (if available)
  if (product.chemicalResistance) {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, currentY, contentWidth, 5.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(16, 42, 67);
    doc.text('2.0 CHEMICAL RESISTANCE & COMPATIBILITY MATRIX', margin + 3, currentY + 4);

    currentY += 7;

    const colW = (contentWidth - 6) / 3;

    // Compatible box (Green)
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(margin, currentY, colW, 20, 1.5, 1.5, 'FD');
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('HIGHLY COMPATIBLE', margin + 2.5, currentY + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    const compText = doc.splitTextToSize(product.chemicalResistance.compatible.join(', '), colW - 5);
    doc.text(compText, margin + 2.5, currentY + 8);

    // Moderate box (Amber)
    const modX = margin + colW + 3;
    doc.setFillColor(254, 252, 232);
    doc.setDrawColor(254, 240, 138);
    doc.roundedRect(modX, currentY, colW, 20, 1.5, 1.5, 'FD');
    doc.setTextColor(133, 77, 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('MODERATE EXPOSURE', modX + 2.5, currentY + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    const modText = doc.splitTextToSize(product.chemicalResistance.moderate.join(', '), colW - 5);
    doc.text(modText, modX + 2.5, currentY + 8);

    // Caution box (Red)
    const cautX = modX + colW + 3;
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(254, 202, 202);
    doc.roundedRect(cautX, currentY, colW, 20, 1.5, 1.5, 'FD');
    doc.setTextColor(153, 27, 27);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('RESTRICTED / CAUTION', cautX + 2.5, currentY + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    const cautText = doc.splitTextToSize(product.chemicalResistance.caution.join(', '), colW - 5);
    doc.text(cautText, cautX + 2.5, currentY + 8);

    currentY += 23;
  }

  // 6. Features & Verified Applications (2-column section)
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, currentY, contentWidth, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(16, 42, 67);
  doc.text('3.0 ENGINEERING ATTRIBUTES & INDUSTRY APPLICATIONS', margin + 3, currentY + 4);

  currentY += 7.5;
  const halfCol = (contentWidth - 6) / 2;

  // Features
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(16, 42, 67);
  doc.text('Key Engineering Features:', margin + 2, currentY);
  currentY += 3.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);

  product.features.slice(0, 4).forEach((feat) => {
    const lines = doc.splitTextToSize(`• ${feat}`, halfCol - 4);
    doc.text(lines, margin + 2, currentY);
    currentY += lines.length * 3 + 0.5;
  });

  // Applications (right side)
  let appY = currentY - (product.features.slice(0, 4).length * 3.5);
  const appX = margin + halfCol + 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(16, 42, 67);
  doc.text('Verified Industry Applications:', appX, appY);
  appY += 3.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);

  product.applications.slice(0, 4).forEach((app) => {
    const lines = doc.splitTextToSize(`• ${app}`, halfCol - 4);
    doc.text(lines, appX, appY);
    appY += lines.length * 3 + 0.5;
  });

  currentY = Math.max(currentY, appY) + 4;

  // 7. Official Quality Certification & Dispatch Seal
  doc.setFillColor(239, 246, 255); // #EFF6FF
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(margin, currentY, contentWidth, 14, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 64, 175);
  doc.text('QUALITY ASSURANCE & REGULATORY COMPLIANCE', margin + 3, currentY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'All Navodaya Pack containers undergo rigorous hydrostatic pressure, drop impact, and leak tightness audits. Suitable for pharmaceutical intermediates, specialty chemicals, and hazardous materials containment.',
    margin + 3,
    currentY + 8.5
  );

  // 8. Official Document Footer (Fixed at bottom)
  const footerY = pageHeight - 20;

  doc.setDrawColor(203, 213, 225);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(16, 42, 67);
  doc.text('NAVODAYA PACKING INDUSTRIES INDIA PVT. LTD.', margin, footerY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Corporate Office: Flat No. 102, 1st Floor, Sri Nilayam, Plot No. 8-3-1110/3, Keshav Nagar, Srinagar Colony, Hyderabad - 500073',
    margin,
    footerY + 7.5
  );
  doc.text(
    'Plant Facility: Kazipally IDA, Sangareddy Dist, Hyderabad, Telangana  •  Phone: +91 93488 51166, +91 93484 51166  •  Email: sales@navodayapack.in',
    margin,
    footerY + 11
  );

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text('www.navodayapack.in', pageWidth - margin - 25, footerY + 4);

  // Save PDF file
  const filename = `Navodaya-Pack-${product.id}-TDS.pdf`;
  doc.save(filename);
};
