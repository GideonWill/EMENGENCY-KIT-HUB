export const firstAidCategories = [
  { id: 'medical', label: 'Clinical First Aid', color: 'brand' },
  { id: 'natural', label: 'Natural & Herbal', color: 'amber' },
]

export const manualEntries = [
  {
    id: 'burns',
    category: 'medical',
    title: 'Treating Minor Burns',
    description: 'Immediate steps for heat-related burns.',
    steps: [
      'Cool the burn under cool running water for 10-20 minutes.',
      'Remove jewelry or tight clothing before the area swells.',
      'Cover the burn with a sterile bandage or clean cloth.',
      'Take over-the-counter pain relievers if needed.'
    ],
    naturalRemedy: 'Aloe Vera gel can be applied once the skin has cooled to soothe and hydrate.',
    warning: 'Do not use ice, butter, or ointments on a fresh burn.'
  },
  {
    id: 'choking',
    category: 'medical',
    title: 'Choking (Heimlich Maneuver)',
    description: 'How to assist a conscious adult or child who is choking.',
    steps: [
      'Give 5 back blows between the shoulder blades with the heel of your hand.',
      'Give 5 abdominal thrusts (Heimlich maneuver).',
      'Alternate between 5 blows and 5 thrusts until the object is forced out.'
    ],
    warning: 'Call emergency services immediately if the person becomes unconscious.'
  },
  {
    id: 'herbal-fever',
    category: 'natural',
    title: 'Natural Fever Management',
    description: 'Traditional and herbal ways to manage mild fevers.',
    steps: [
      'Stay hydrated with water and electrolyte-rich fluids.',
      'Use a lukewarm sponge bath to lower body temperature.',
      'Ginger or peppermint tea can help promote sweating and cooling.'
    ],
    herbs: ['Ginger', 'Peppermint', 'Elderberry'],
    warning: 'Consult a doctor for high fevers or if symptoms persist.'
  }
]
