import { FacilityLocation, ClientPartner } from '../types';

export const COMPANY_INFO = {
  legalName: 'Navodaya Packing Industries India Pvt Ltd',
  shortName: 'Navodaya Pack',
  brandTagline: 'Industrial Packaging. Built for Business.',
  verifiedIntro:
    'We have established ourselves as a trustworthy organization, engaged in manufacturing and supplying of HDPE Drums, Fibre Drums & Composite Containers. All our products are developed under strict supervision by quality experts as per industry set quality standards. Moreover, our offered range is appreciated for their robust construction, compact designs and compatibility. Trusted by leading pharma companies, our fine-grade packaging solutions combine safety, durability, and consistent performance—making us one of the highest-selling manufacturers in the industry.',
  foundedContext: 'Trusted supplier to India’s leading pharmaceutical, chemical, and bulk material enterprises.',
  primaryPhone: '+91 93488 51166',
  altPhone: '+91 93484 51166',
  // Official corporate communication email for inquiries
  salesEmail: 'info@navodayapack.in',
};

export const FACILITIES: FacilityLocation[] = [
  {
    type: 'Corporate Address',
    title: 'Hyderabad Corporate Office',
    addressLines: [
      'Plot No: C/8/1, HMT Satavahana Nagar',
      'Opposite KPHB Colony, Kukatpally',
      'Hyderabad - 500072, Telangana, INDIA',
    ],
    phones: ['+91 93488 51166', '+91 97041 59586'],
    mapUrl: 'https://maps.app.goo.gl/sfvRVurv8Pp6hKg88',
    primaryPincode: '500072',
  },
  {
    type: 'Factory Address',
    title: 'Kazipally Manufacturing Unit',
    addressLines: [
      'Plot No: 19/A, Survey No: 180/1 to 15',
      'Kazipally IDA, Jinnaram (M)',
      'Sanga Reddy Dist., Telangana - 502319, INDIA',
    ],
    phones: ['+91 93484 51166', '+91 93932 51166'],
    mapUrl: 'https://maps.app.goo.gl/62PRsaj8gckfKqEv9',
    embedMapUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7606.844535667062!2d78.377307!3d17.582672!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8c2239ad9e99%3A0xad3aa9138d771bf4!2sNavodaya%20Packing%20Industries%20-%20HDPE%20Drums%20Manufacturer%2C%20Fiber%20Drums%20Manufacturer!5e0!3m2!1sen!2sin!4v1766902770731!5m2!1sen!2sin',
    primaryPincode: '502319',
  },
];

export const CLIENT_PARTNERS: ClientPartner[] = [
  { id: 'divis', name: "Divi's Laboratories", logo: '/images/clients/divis_logo.jpg', sector: 'Pharmaceuticals' },
  { id: 'msn', name: 'MSN Laboratories', logo: '/images/clients/msn_logo.png', sector: 'Pharmaceuticals' },
  { id: 'mylan', name: 'Mylan (Viatris)', logo: '/images/clients/mylan_logo.png', sector: 'Healthcare & Pharma' },
  { id: 'hetero', name: 'Hetero Drugs', logo: '/images/clients/hetero_logo.jpg', sector: 'Pharmaceuticals' },
  { id: 'granules', name: 'Granules India', logo: '/images/clients/granules_india_logo.jpg', sector: 'Active Pharma Ingredients' },
  { id: 'sai_life', name: 'Sai Life Sciences', logo: '/images/clients/sai_life_logo.jpg', sector: 'Discovery & Manufacturing' },
  { id: 'suven', name: 'Suven Life Sciences', logo: '/images/clients/suven_logo.gif', sector: 'Biopharma' },
  { id: 'lee_pharma', name: 'Lee Pharma', logo: '/images/clients/lee_pharma_logo.jpg', sector: 'Pharmaceuticals' },
  { id: 'rakshit', name: 'Rakshit Drugs', logo: '/images/clients/rakshit_drugs_logo.jpg', sector: 'Bulk Actives' },
  { id: 'tagoor', name: 'Tagoor Laboratories', logo: '/images/clients/tagoor_labs_logo.jpg', sector: 'Fine Chemicals' },
  { id: 'vasudha', name: 'Vasudha Pharma', logo: '/images/clients/vasudha_pharma_logo.png', sector: 'Pharma Intermediates' },
  { id: 'alivira', name: 'Alivira Animal Health', logo: '/images/clients/alivira_logo.jpg', sector: 'Veterinary Pharma' },
  { id: 'arene', name: 'Arene Life Sciences', logo: '/images/clients/arene_logo.png', sector: 'Bulk Drugs' },
  { id: 'covalent', name: 'Covalent Laboratories', logo: '/images/clients/covalent_logo.jpg', sector: 'Pharmaceuticals' },
  { id: 'andhra_medi', name: 'Andhra Organics', logo: '/images/clients/andhra_medi_logo.png', sector: 'Specialty Chemicals' },
  { id: 'honour', name: 'Honour Lab', logo: '/images/clients/honour_logo.jpg', sector: 'Pharmaceuticals' },
  { id: 'ravoos', name: "Ravoo's Laboratories", logo: '/images/clients/ravoos_logo.jpg', sector: 'Formulations & Actives' },
];
