export type OptionKey = 'A' | 'B' | 'C' | 'D';

export type BanditQuestion = {
  id: string;
  text: string;
  options: Record<OptionKey, string>;
  correct: OptionKey;
};

export type BanditLevel = {
  level: number;
  questions: BanditQuestion[]; 
};

export const BANDIT_HUNT_LEVELS: BanditLevel[] = [
  {
    level: 1,
    questions: [
      {
        id: 'l1q1',
        text: 'The bandit suddenly turns into a narrow alley. What do you do?',
        options: {
          A: 'Rush straight after him',
          B: 'Slow down and scan the alley',
          C: 'Call for backup',
          D: 'Take a quick look around the corner',
        },
        correct: 'D',
      },
      {
        id: 'l1q2',
        text: 'You hear footsteps echo ahead. Your move?',
        options: {
          A: 'Stop and listen carefully',
          B: 'Sprint forward immediately',
          C: 'Change direction randomly',
          D: 'Shout to scare the bandit',
        },
        correct: 'A',
      },
      {
        id: 'l1q3',
        text: 'The path splits into two streets. What now?',
        options: {
          A: 'Pick a direction at random',
          B: 'Look for fresh clues on the ground',
          C: 'Run down the brighter street',
          D: 'Wait and do nothing',
        },
        correct: 'B',
      },
      {
        id: 'l1q4',
        text: 'You spot movement behind some crates.',
        options: {
          A: 'Ignore it and keep running',
          B: 'Charge straight in',
          C: 'Approach carefully and check',
          D: 'Turn back immediately',
        },
        correct: 'C',
      },
      {
        id: 'l1q5',
        text: 'The bandit is almost out of sight.',
        options: {
          A: 'Sprint blindly forward',
          B: 'Stay still and wait',
          C: 'Throw something ahead',
          D: 'Keep steady pace and track movement',
        },
        correct: 'D',
      },
    ],
  },

  {
    level: 2,
    questions: [
      {
        id: 'l2q1',
        text: 'The bandit knocks over a trash bin while running. What’s your move?',
        options: {
          A: 'Jump over it and keep speed',
          B: 'Slow briefly and check the direction',
          C: 'Ignore it and change route',
          D: 'Stop to clear the path',
        },
        correct: 'B',
      },
      {
        id: 'l2q2',
        text: 'You lose visual contact for a second at the corner.',
        options: {
          A: 'Rush around the corner immediately',
          B: 'Pause and listen for movement',
          C: 'Turn back to the previous street',
          D: 'Call out loudly',
        },
        correct: 'B',
      },
      {
        id: 'l2q3',
        text: 'Fresh footprints appear on the ground.',
        options: {
          A: 'Follow them at a steady pace',
          B: 'Sprint ahead past the tracks',
          C: 'Ignore and scan rooftops',
          D: 'Wait to confirm more clues',
        },
        correct: 'A',
      },
      {
        id: 'l2q4',
        text: 'You hear a door slam somewhere nearby.',
        options: {
          A: 'Run to the nearest door fast',
          B: 'Stop and analyze the sound direction',
          C: 'Ignore and keep forward',
          D: 'Knock on random doors',
        },
        correct: 'B',
      },
      {
        id: 'l2q5',
        text: 'The bandit might be trying to trick you.',
        options: {
          A: 'Charge forward aggressively',
          B: 'Slow down too much',
          C: 'Stay alert and proceed carefully',
          D: 'Stop the chase',
        },
        correct: 'C',
      },
    ],
  },

  {
    level: 3,
    questions: [
      {
        id: 'l3q1',
        text: 'The bandit suddenly disappears behind a market stall.',
        options: {
          A: 'Rush straight past the stall',
          B: 'Quickly check both sides of the stall',
          C: 'Stop the chase',
          D: 'Call out loudly',
        },
        correct: 'B',
      },
      {
        id: 'l3q2',
        text: 'You hear fast footsteps above you.',
        options: {
          A: 'Ignore and keep forward',
          B: 'Look up and adjust direction',
          C: 'Sprint blindly ahead',
          D: 'Slow down completely',
        },
        correct: 'B',
      },
      {
        id: 'l3q3',
        text: 'A crowd briefly blocks your view.',
        options: {
          A: 'Push through aggressively',
          B: 'Go around while keeping visual scan',
          C: 'Stop and wait',
          D: 'Turn back',
        },
        correct: 'B',
      },
      {
        id: 'l3q4',
        text: 'You spot two possible escape routes.',
        options: {
          A: 'Pick the left one instantly',
          B: 'Pick the right one instantly',
          C: 'Quickly check for fresh movement',
          D: 'Pause for a long analysis',
        },
        correct: 'C',
      },
      {
        id: 'l3q5',
        text: 'The bandit drops something while running.',
        options: {
          A: 'Stop to inspect it fully',
          B: 'Ignore it completely',
          C: 'Take a quick glance and keep moving',
          D: 'Kick it aside and run randomly',
        },
        correct: 'C',
      },
    ],
  },

  {
    level: 4,
    questions: [
      { id: 'l4q1', text: 'The bandit brushes past a street sign.', options: { A: 'Ignore and sprint', B: 'Check the sign direction quickly', C: 'Stop completely', D: 'Turn back' }, correct: 'B' },
      { id: 'l4q2', text: 'You hear a metal clang nearby.', options: { A: 'Rush toward the noise blindly', B: 'Pause briefly to locate the source', C: 'Ignore and run faster', D: 'Call out loudly' }, correct: 'B' },
      { id: 'l4q3', text: 'A narrow passage appears.', options: { A: 'Charge through immediately', B: 'Check for movement first', C: 'Avoid it completely', D: 'Wait too long' }, correct: 'B' },
      { id: 'l4q4', text: 'The trail becomes unclear.', options: { A: 'Pick a random path', B: 'Slow to a stop', C: 'Scan for fresh clues', D: 'Run in circles' }, correct: 'C' },
      { id: 'l4q5', text: 'You catch a glimpse of motion ahead.', options: { A: 'Sprint blindly', B: 'Approach with controlled speed', C: 'Stop fully', D: 'Turn away' }, correct: 'B' },
    ],
  },
  {
    level: 5,
    questions: [
      { id: 'l5q1', text: 'The bandit knocks over boxes.', options: { A: 'Jump through recklessly', B: 'Carefully move while tracking', C: 'Stop and stack them', D: 'Change direction randomly' }, correct: 'B' },
      { id: 'l5q2', text: 'Footsteps echo in two directions.', options: { A: 'Guess randomly', B: 'Listen briefly to isolate', C: 'Sprint forward', D: 'Stop chasing' }, correct: 'B' },
      { id: 'l5q3', text: 'You see a shadow move.', options: { A: 'Ignore it', B: 'Charge immediately', C: 'Track the shadow carefully', D: 'Look away' }, correct: 'C' },
      { id: 'l5q4', text: 'The path slopes downward.', options: { A: 'Rush full speed', B: 'Control pace and observe', C: 'Stop halfway', D: 'Turn back' }, correct: 'B' },
      { id: 'l5q5', text: 'The bandit may double back.', options: { A: 'Ignore the possibility', B: 'Stay alert and scan behind', C: 'Sprint forward only', D: 'Pause too long' }, correct: 'B' },
    ],
  },
  {
    level: 6,
    questions: [
      { id: 'l6q1', text: 'A door swings nearby.', options: { A: 'Ignore', B: 'Check direction quickly', C: 'Run opposite randomly', D: 'Stop fully' }, correct: 'B' },
      { id: 'l6q2', text: 'Visual contact flickers.', options: { A: 'Panic sprint', B: 'Maintain steady tracking', C: 'Freeze', D: 'Turn away' }, correct: 'B' },
      { id: 'l6q3', text: 'Street noise increases.', options: { A: 'Rush blindly', B: 'Filter the sound source', C: 'Stop chase', D: 'Shout' }, correct: 'B' },
      { id: 'l6q4', text: 'Movement appears at the edge of view.', options: { A: 'Ignore', B: 'Adjust course smoothly', C: 'Sprint randomly', D: 'Stop' }, correct: 'B' },
      { id: 'l6q5', text: 'The gap is closing fast.', options: { A: 'Lose control speed', B: 'Keep measured pressure', C: 'Stop to think', D: 'Turn back' }, correct: 'B' },
    ],
  },
  {
    level: 7,
    questions: [
      { id: 'l7q1', text: 'Two alleys look similar.', options: { A: 'Guess', B: 'Check ground clues', C: 'Run left blindly', D: 'Wait too long' }, correct: 'B' },
      { id: 'l7q2', text: 'A loud distraction occurs.', options: { A: 'Fall for it', B: 'Stay focused on trail', C: 'Stop chase', D: 'Run opposite' }, correct: 'B' },
      { id: 'l7q3', text: 'The bandit speeds up.', options: { A: 'Panic sprint', B: 'Increase pace with control', C: 'Freeze', D: 'Quit' }, correct: 'B' },
      { id: 'l7q4', text: 'You see partial movement.', options: { A: 'Ignore', B: 'Confirm visually', C: 'Rush randomly', D: 'Stop' }, correct: 'B' },
      { id: 'l7q5', text: 'The route becomes crowded.', options: { A: 'Push blindly', B: 'Navigate while tracking', C: 'Stop', D: 'Turn away' }, correct: 'B' },
    ],
  },
  {
    level: 8,
    questions: [
      { id: 'l8q1', text: 'Brief visual loss occurs.', options: { A: 'Rush ahead', B: 'Reacquire carefully', C: 'Stop', D: 'Guess route' }, correct: 'B' },
      { id: 'l8q2', text: 'Echoes bounce off walls.', options: { A: 'Follow first sound', B: 'Isolate true direction', C: 'Ignore', D: 'Stop' }, correct: 'B' },
      { id: 'l8q3', text: 'The trail looks staged.', options: { A: 'Trust it blindly', B: 'Verify quickly', C: 'Stop fully', D: 'Turn back' }, correct: 'B' },
      { id: 'l8q4', text: 'A fast turn appears.', options: { A: 'Overshoot', B: 'Corner with control', C: 'Stop', D: 'Guess' }, correct: 'B' },
      { id: 'l8q5', text: 'Final gap is small.', options: { A: 'Rush wildly', B: 'Close in steadily', C: 'Freeze', D: 'Quit' }, correct: 'B' },
    ],
  },
  {
    level: 9,
    questions: [
      { id: 'l9q1', text: 'Bandit almost within reach.', options: { A: 'Lunge blindly', B: 'Time approach', C: 'Stop', D: 'Shout' }, correct: 'B' },
      { id: 'l9q2', text: 'Sudden obstacle appears.', options: { A: 'Crash through', B: 'Navigate smoothly', C: 'Stop', D: 'Turn back' }, correct: 'B' },
      { id: 'l9q3', text: 'Movement splits briefly.', options: { A: 'Guess', B: 'Track real motion', C: 'Stop', D: 'Panic' }, correct: 'B' },
      { id: 'l9q4', text: 'Noise spike nearby.', options: { A: 'React randomly', B: 'Stay focused', C: 'Stop', D: 'Retreat' }, correct: 'B' },
      { id: 'l9q5', text: 'Final turn ahead.', options: { A: 'Rush uncontrolled', B: 'Approach precisely', C: 'Freeze', D: 'Quit' }, correct: 'B' },
    ],
  },
  {
    level: 10,
    questions: [
      { id: 'l10q1', text: 'The bandit attempts one last trick.', options: { A: 'Fall for it', B: 'Stay sharp', C: 'Stop', D: 'Guess' }, correct: 'B' },
      { id: 'l10q2', text: 'Visual nearly lost.', options: { A: 'Panic', B: 'Reacquire calmly', C: 'Stop', D: 'Turn away' }, correct: 'B' },
      { id: 'l10q3', text: 'The distance is minimal.', options: { A: 'Rush wildly', B: 'Control the capture', C: 'Freeze', D: 'Quit' }, correct: 'B' },
      { id: 'l10q4', text: 'Final distraction appears.', options: { A: 'Follow it', B: 'Ignore and track', C: 'Stop', D: 'Retreat' }, correct: 'B' },
      { id: 'l10q5', text: 'Last move.', options: { A: 'Overcommit', B: 'Secure the catch', C: 'Stop', D: 'Guess' }, correct: 'B' },
    ],
  },
];