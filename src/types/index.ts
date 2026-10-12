export interface DrumSpecification {
  id?: string;
  capacity: string;
  code?: string;
  heightMm?: number | string;
  diameterMm?: number | string;
  weightKg?: string;
  openingType?: string;
  closure?: string;
  image?: string;
  notes?: string;
}

export interface IndividualProduct {
  id: string;
  name: string;
  category: 'HDPE Drums' | 'Fibre Drums' | 'Composite Containers';
  categorySlug: 'hdpe-drums' | 'fiber-drums' | 'composite-containers';
  capacity: string;
  heightMm?: string;
  diameterMm?: string;
  material: string;
  image: string;
  closure: string;
  summary: string;
  detailedDescription: string[];
  features: string[];
  applications: string[];
  chemicalResistance?: {
    compatible: string[];
    moderate: string[];
    caution: string[];
  };
  handlingNotes: string[];
  adjacentProductIds?: string[];
}

export interface ProductDetail {
  id: string;
  title: string;
  slug: string;
  categoryTag: string;
  leadParagraph: string;
  detailedOverview: string[];
  keyHighlights: string[];
  primaryImage: string;
  galleryImages: { url: string; caption: string }[];
  specifications: DrumSpecification[];
  applications: string[];
  features: string[];
  availableSizesText?: string;
}

export interface ClientPartner {
  id: string;
  name: string;
  logo: string;
  sector: string;
}

export interface FacilityLocation {
  type: 'Corporate Address' | 'Factory Address';
  title: string;
  addressLines: string[];
  phones: string[];
  mapUrl: string;
  embedMapUrl?: string;
  primaryPincode: string;
}

export interface EnquirySubmission {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productInterest: 'HDPE Drums' | 'Fibre Drums' | 'Composite Containers' | 'Multiple Products / Custom Inquiry';
  quantityVolume?: string;
  message: string;
}
