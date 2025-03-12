export const categories = {
  textbooks: {
    name: 'Textbooks',
    subcategories: [
      'Computer Science',
      'Mathematics',
      'Engineering',
      'Biology',
      'Chemistry',
      'Physics',
      'Other'
    ]
  },
  electronics: {
    name: 'Electronics',
    subcategories: [
      'Laptops',
      'Tablets',
      'Calculators',
      'Lab Equipment',
      'Accessories',
      'Other'
    ]
  },
  furniture: {
    name: 'Furniture',
    subcategories: [
      'Desks',
      'Chairs',
      'Storage',
      'Lamps',
      'Dorm Essentials',
      'Other'
    ]
  },
  studyMaterials: {
    name: 'Study Materials',
    subcategories: [
      'Notes',
      'Practice Tests',
      'Study Guides',
      'Lab Materials',
      'Other'
    ]
  },
  courseSpecific: {
    name: 'Course Specific',
    subcategories: [
      'Lab Kits',
      'Project Materials',
      'Required Tools',
      'Software Licenses',
      'Other'
    ]
  }
} as const;

export type CategoryKey = keyof typeof categories; 