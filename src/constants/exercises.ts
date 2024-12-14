export const MEDITATION_EXERCISES = [
  {
    title: "Body Scan Meditation",
    duration: 300,
    description: "A gentle meditation focusing on different parts of your body"
  },
  {
    title: "Loving-Kindness Practice",
    duration: 180,
    description: "Cultivate compassion for yourself and others"
  },
  {
    title: "Quick Stress Relief",
    duration: 120,
    description: "Brief meditation for immediate stress reduction"
  }
] as const;

export const BODY_PARTS = [
  { name: 'Feet', instructions: 'Curl your toes tightly, then release' },
  { name: 'Calves', instructions: 'Point your toes up, tense calves, then relax' },
  { name: 'Thighs', instructions: 'Squeeze thigh muscles, then release' },
  { name: 'Abdomen', instructions: 'Tighten stomach muscles, then let go' },
  { name: 'Hands', instructions: 'Make fists, then release' },
  { name: 'Arms', instructions: 'Flex biceps, then relax' },
  { name: 'Shoulders', instructions: 'Raise shoulders to ears, then drop' },
  { name: 'Face', instructions: 'Scrunch facial muscles, then release' }
] as const;