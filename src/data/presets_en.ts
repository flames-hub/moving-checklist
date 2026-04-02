import { PresetTask } from './presets_ja';

export const presetsEn: PresetTask[] = [
  // --- 2 Months Before (-60) ---
  { title: 'Compare moving companies & get quotes', description: 'Get at least 3 quotes. Check reviews and insurance coverage.', category: 'procedures', timingDays: -60 },
  { title: 'Start decluttering', description: 'Donate, sell, or discard items you no longer need. Less stuff = lower moving costs.', category: 'packing', timingDays: -60 },
  { title: 'Finalize new home', description: 'Sign lease or close on purchase. Confirm move-in date.', category: 'new_home', timingDays: -55 },
  { title: 'Create moving budget', description: 'Include: movers, deposits, first/last month rent, supplies, travel. Add 20% buffer.', category: 'procedures', timingDays: -55 },
  { title: 'Notify landlord / Give notice', description: 'Check lease for required notice period (usually 30-60 days).', category: 'procedures', timingDays: -55 },
  { title: 'Research schools (if applicable)', description: 'Contact new school district. Request records transfer from current school.', category: 'procedures', timingDays: -50 },

  // --- 1 Month Before (-30) ---
  { title: 'Set up mail forwarding', description: 'Submit change of address with postal service (USPS, Royal Mail, etc.). Takes 7-10 days.', category: 'procedures', timingDays: -30 },
  { title: 'Transfer electricity', description: 'Contact current and new utility providers to schedule disconnect/connect.', category: 'cancellation', timingDays: -28 },
  { title: 'Transfer gas service', description: 'Schedule disconnect at old address and connect at new address.', category: 'cancellation', timingDays: -28 },
  { title: 'Transfer water service', description: 'Contact water utility for both addresses.', category: 'cancellation', timingDays: -28 },
  { title: 'Transfer internet & cable', description: 'May take 2-4 weeks for installation at new address. Schedule early.', category: 'cancellation', timingDays: -28 },
  { title: 'Update bank address', description: 'Update via online banking or visit a branch.', category: 'procedures', timingDays: -22 },
  { title: 'Update credit card addresses', description: 'Update billing address on all credit cards online.', category: 'procedures', timingDays: -22 },
  { title: 'Notify insurance companies', description: 'Update auto, health, renters/homeowners insurance with new address.', category: 'procedures', timingDays: -22 },
  { title: 'Update subscriptions & deliveries', description: 'Amazon, streaming services, meal kits, magazines, etc.', category: 'procedures', timingDays: -20 },
  { title: 'Update phone carrier address', description: 'Update via app or website.', category: 'procedures', timingDays: -20 },

  // --- 2 Weeks Before (-14) ---
  { title: 'Start packing (non-essentials first)', description: 'Off-season clothes, books, decorations. Label boxes with contents and destination room.', category: 'packing', timingDays: -14 },
  { title: 'Get packing supplies', description: 'Boxes, tape, bubble wrap, markers. Ask movers if they provide supplies.', category: 'packing', timingDays: -14 },
  { title: 'Prepare farewell gifts for neighbors', description: 'Optional but thoughtful. A small gift or card to say goodbye.', category: 'other', timingDays: -12 },
  { title: 'Send change of address notices', description: 'Notify friends, family, doctors, dentists, employers.', category: 'other', timingDays: -12 },

  // --- 1 Week Before (-7) ---
  { title: 'Use up fridge & freezer food', description: 'Plan meals to empty refrigerator. Unplug fridge night before move.', category: 'packing', timingDays: -7 },
  { title: 'Drain washing machine', description: 'Run empty cycle, disconnect hoses, let drain. Check manual for specific steps.', category: 'packing', timingDays: -5 },
  { title: 'Gather valuables & important documents', description: 'Passports, birth certificates, financial documents. Transport these yourself.', category: 'packing', timingDays: -5 },
  { title: 'Pack moving day essentials bag', description: 'Phone charger, toiletries, change of clothes, snacks, cleaning supplies, tools.', category: 'packing', timingDays: -3 },
  { title: 'Say goodbye to neighbors', description: 'Visit neighbors to say farewell.', category: 'other', timingDays: -3 },

  // --- Moving Day (0) ---
  { title: 'Confirm moving company details', description: 'Verify arrival time, contact number, and any special instructions.', category: 'procedures', timingDays: 0 },
  { title: 'Final walkthrough of old home', description: 'Check all rooms, closets, garage, balcony. Make sure nothing is left behind.', category: 'packing', timingDays: 0 },
  { title: 'Read utility meters', description: 'Record or photograph final meter readings for all utilities.', category: 'cancellation', timingDays: 0 },
  { title: 'Return keys', description: 'Return all copies of keys to landlord or property manager.', category: 'procedures', timingDays: 0 },
  { title: 'Document new home condition', description: 'Photograph every room before moving in. Note any existing damage for records.', category: 'new_home', timingDays: 0 },

  // --- After Moving (+1~) ---
  { title: "Update driver's license", description: 'Visit DMV with proof of new address. Deadlines vary by state/country.', category: 'procedures', timingDays: 7 },
  { title: 'Update vehicle registration', description: 'Visit DMV or do it online. May need new plates depending on state/country.', category: 'procedures', timingDays: 14 },
  { title: 'Update voter registration', description: 'Register at new address via online portal or mail.', category: 'procedures', timingDays: 7 },
  { title: 'Register pets at new address', description: 'Update pet licenses/microchip info with new address.', category: 'procedures', timingDays: 14 },
  { title: 'Meet new neighbors', description: 'Introduce yourself. A small gift goes a long way.', category: 'other', timingDays: 1 },
  { title: 'Find new doctors & dentists', description: 'Research local providers. Request medical records transfer from previous doctors.', category: 'other', timingDays: 14 },
];
