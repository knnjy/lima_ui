const firstSix = [
  { id: 'P201', name: 'Rosie', breed: 'Large White', sex: 'Female', group: 'Sows · G-001', status: 'Active' },
  { id: 'P202', name: 'Bella', breed: 'Landrace', sex: 'Female', group: 'Sows · G-001', status: 'Active' },
  { id: 'P203', name: 'Pearl', breed: 'Large White', sex: 'Female', group: 'Growers · G-002', status: 'Active' },
  { id: 'P204', name: 'Poppy', breed: 'Duroc', sex: 'Female', group: 'Growers · G-002', status: 'Active' },
  { id: 'P205', name: 'Milo', breed: 'Duroc', sex: 'Male', group: 'Boars · G-003', status: 'Active' },
  { id: 'P206', name: 'Toby', breed: 'Landrace', sex: 'Male', group: 'Piglets · G-004', status: 'Active' },
];

// filler so pagination shows "20 pigs, 4 pages" like the design
const filler = Array.from({ length: 14 }, (_, i) => ({
  id: `P${207 + i}`,
  name: `Pig ${207 + i}`,
  breed: 'Duroc',
  sex: 'Male',
  group: 'Piglets · G-004',
  status: 'Active',
}));

export const pigs = [...firstSix, ...filler];

export const speciesRegister = [
  { species: 'Pigs', head: 20, groups: 4, method: 'Individual + group-linked' },
  { species: 'Cattle', head: 50, groups: 1, method: 'Group-managed' },
  { species: 'Chickens', head: 80, groups: 1, method: 'Group-managed' },
];