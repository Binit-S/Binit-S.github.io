export const projects = [
  {
    title: 'Supply Chain<br>Nexus',
    blurb:
      'AI-powered logistics dashboard that turns hours of manual risk-scanning into a 2-minute automated read.',
    stack: ['React', 'Next.js', 'Gemini API', 'Firebase', 'Google Cloud Run'],
    repo: 'https://github.com/Binit-S/supply-chain-nexus',
    problem:
      "Supply chains get blindsided — disruptions surface in news cycles long after they've already cost a shipment.",
    build:
      'A dashboard that scores geopolitical news 0–100 with Gemini AI, routing operators to alternative transport options with one-click approval.',
    impact: 'Detection time cut from hours to under 2 minutes.',
  },
  {
    title: 'NutriSync',
    blurb:
      'Smart health coach delivering real-time dietary adaptation and symptom tracking for people with variable routines.',
    stack: ['Next.js', 'Python', 'Firebase', 'Gemini API', 'Docker'],
    repo: 'https://github.com/Binit-S/nutrisync',
    problem:
      "People struggle with rigid diets that don't adapt to daily schedule shifts, sudden symptom spikes, or real-time pantry inventory changes.",
    build:
      'A custom fullstack app using Gemini API as a real-time streaming dietitian agent to draft personalized meal structures and coordinate automatically with schedules.',
    impact: '100% real-time streaming diet adjustments with calendar syncing.',
  },
  {
    title: 'Mock.io',
    blurb:
      'P2P interview preparation platform leveraging AI to parse resumes and tailor question pipelines in seconds.',
    stack: ['Node.js', 'Express.js', 'MongoDB'],
    repo: 'https://github.com/Binit-S?tab=repositories',
    problem:
      'Traditional interview practice is generic and fails to test applicants against their specific candidate resume details and target job descriptions.',
    build:
      'A Node.js & MongoDB peer platform with dynamic resume parsing that auto-generates custom candidate-specific question sets for interview swaps.',
    impact: 'Spins up custom-tailored candidate workspaces in under 30 seconds.',
  },
];
