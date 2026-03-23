export type Choice = 'A' | 'B' | 'C';

export type Question = {
  id: string;
  text: string;
  a: string;
  b: string;
  c: string;
};

export type LevelPack = {
  level: number;
  questions: Question[];
};

export const MIND_DUEL_LEVELS: LevelPack[] = [
  {
    level: 1,
    questions: [
      { id: 'l1q1', text: 'You notice a mistake in your plan.', a: 'Review and fix it carefully', b: 'Ignore it and move forward', c: 'Make a quick adjustment and continue' },
      { id: 'l1q2', text: 'A new opportunity appears suddenly.', a: 'Evaluate it first', b: 'Jump in immediately', c: 'Take a brief look before deciding' },
      { id: 'l1q3', text: 'Your friend suggests a risky shortcut.', a: 'Check the risks first', b: 'Take the shortcut', c: 'Consider both options quickly' },
      { id: 'l1q4', text: 'You must make a fast choice.', a: 'Think it through', b: 'Trust your gut instantly', c: 'Do a quick mental check' },
      { id: 'l1q5', text: 'Something unexpected happens.', a: 'Analyze the situation', b: 'React immediately', c: 'Pause briefly, then act' },
      { id: 'l1q6', text: 'You enter an unfamiliar place.', a: 'Observe your surroundings', b: 'Move in confidently', c: 'Scan quickly and proceed' },
      { id: 'l1q7', text: 'A decision feels unclear.', a: 'Gather more information', b: 'Pick and move on', c: 'Weigh both sides briefly' },
      { id: 'l1q8', text: 'Time is running out.', a: 'Stay precise', b: 'Act fast', c: 'Balance speed and caution' },
    ],
  },
  {
    level: 2,
    questions: [
      { id: 'l2q1', text: 'You receive incomplete information.', a: 'Look for more details', b: 'Decide anyway', c: 'Estimate and proceed' },
      { id: 'l2q2', text: 'A bold idea crosses your mind.', a: 'Test it logically', b: 'Try it immediately', c: 'Think briefly, then decide' },
      { id: 'l2q3', text: 'Plans suddenly change.', a: 'Recalculate carefully', b: 'Adapt instantly', c: 'Adjust step by step' },
      { id: 'l2q4', text: 'You face two equal options.', a: 'Compare deeply', b: 'Pick quickly', c: 'Choose what feels reasonable' },
      { id: 'l2q5', text: 'Pressure starts building.', a: 'Stay methodical', b: 'Move faster', c: 'Keep steady pace' },
      { id: 'l2q6', text: 'You spot a possible shortcut.', a: 'Verify safety', b: 'Take it', c: 'Check quickly first' },
      { id: 'l2q7', text: 'A choice seems risky.', a: 'Reduce the risk', b: 'Accept the risk', c: 'Balance risk and reward' },
      { id: 'l2q8', text: 'You must act soon.', a: 'Plan first', b: 'Go now', c: 'Quick plan, then move' },
    ],
  },
  {
    level: 3,
    questions: [
      { id: 'l3q1', text: 'You notice a hidden detail.', a: 'Study it closely', b: 'Ignore and continue', c: 'Note it mentally' },
      { id: 'l3q2', text: 'An unexpected offer appears.', a: 'Evaluate carefully', b: 'Accept fast', c: 'Consider briefly' },
      { id: 'l3q3', text: 'The situation feels tense.', a: 'Stay calculated', b: 'Push forward boldly', c: 'Stay flexible' },
      { id: 'l3q4', text: 'You have limited time.', a: 'Prioritize accuracy', b: 'Prioritize speed', c: 'Balance both' },
      { id: 'l3q5', text: 'A decision affects others.', a: 'Think it through', b: 'Decide quickly', c: 'Consider key factors' },
      { id: 'l3q6', text: 'You see a pattern forming.', a: 'Analyze it', b: 'Act on instinct', c: 'Observe briefly' },
      { id: 'l3q7', text: 'The path splits ahead.', a: 'Evaluate both routes', b: 'Pick one fast', c: 'Quick comparison' },
      { id: 'l3q8', text: 'Something feels off.', a: 'Investigate deeper', b: 'Ignore and proceed', c: 'Stay alert and continue' },
    ],
  },
  {
    level: 4,
    questions: [
      { id: 'l4q1', text: 'You must choose under pressure.', a: 'Stay precise', b: 'Move boldly', c: 'Stay balanced' },
      { id: 'l4q2', text: 'A risky reward appears.', a: 'Calculate odds', b: 'Take the chance', c: 'Consider briefly' },
      { id: 'l4q3', text: 'The situation changes fast.', a: 'Reassess', b: 'Adapt instantly', c: 'Adjust smoothly' },
      { id: 'l4q4', text: 'You lack full clarity.', a: 'Seek more info', b: 'Decide anyway', c: 'Make a reasonable call' },
      { id: 'l4q5', text: 'A shortcut looks tempting.', a: 'Verify first', b: 'Take it now', c: 'Quick safety check' },
      { id: 'l4q6', text: 'You feel uncertain.', a: 'Slow down and think', b: 'Push forward', c: 'Proceed carefully' },
      { id: 'l4q7', text: 'Time pressure increases.', a: 'Stay controlled', b: 'Speed up', c: 'Maintain rhythm' },
      { id: 'l4q8', text: 'Final choice approaches.', a: 'Double-check', b: 'Lock it in', c: 'Quick review' },
    ],
  },
  {
    level: 5,
    questions: [
      { id: 'l5q1', text: 'Stakes feel higher now.', a: 'Increase precision', b: 'Increase speed', c: 'Stay composed' },
      { id: 'l5q2', text: 'A bold move is possible.', a: 'Analyze impact', b: 'Go for it', c: 'Briefly consider' },
      { id: 'l5q3', text: 'You notice small details.', a: 'Examine closely', b: 'Ignore them', c: 'Note the important ones' },
      { id: 'l5q4', text: 'The clock is ticking.', a: 'Stay methodical', b: 'Move fast', c: 'Balance pace' },
      { id: 'l5q5', text: 'A choice feels risky.', a: 'Reduce uncertainty', b: 'Embrace the risk', c: 'Manage the risk' },
      { id: 'l5q6', text: 'The path forward splits.', a: 'Compare carefully', b: 'Choose quickly', c: 'Quick evaluation' },
      { id: 'l5q7', text: 'Pressure peaks.', a: 'Stay calm and precise', b: 'Act immediately', c: 'Controlled action' },
      { id: 'l5q8', text: 'Final moment.', a: 'Think one last time', b: 'Trust your instinct', c: 'Quick balanced check' },
    ],
  },
  {
    level: 6,
    questions: [
      { id: 'l6q1', text: 'A plan starts falling apart mid-way.', a: 'Rework the plan carefully', b: 'Push through anyway', c: 'Adjust on the fly' },
      { id: 'l6q2', text: 'You spot a narrow time window.', a: 'Evaluate quickly', b: 'Act immediately', c: 'Take a brief moment' },
      { id: 'l6q3', text: 'A risky option has high potential.', a: 'Calculate the downside', b: 'Take the shot', c: 'Weigh risk vs reward' },
      { id: 'l6q4', text: 'The situation becomes unpredictable.', a: 'Slow down and assess', b: 'Move decisively', c: 'Stay flexible' },
      { id: 'l6q5', text: 'You must choose with partial data.', a: 'Seek missing info', b: 'Decide now', c: 'Make a best estimate' },
      { id: 'l6q6', text: 'Pressure from others increases.', a: 'Stay methodical', b: 'Move faster', c: 'Keep balanced pace' },
      { id: 'l6q7', text: 'You notice conflicting signals.', a: 'Analyze deeper', b: 'Pick a direction', c: 'Monitor briefly' },
      { id: 'l6q8', text: 'The margin for error is small.', a: 'Prioritize accuracy', b: 'Prioritize speed', c: 'Balance both' },
    ],
  },
  {
    level: 7,
    questions: [
      { id: 'l7q1', text: 'A shortcut appears late.', a: 'Verify it first', b: 'Take it instantly', c: 'Quick check then move' },
      { id: 'l7q2', text: 'Your first choice feels uncertain.', a: 'Reevaluate', b: 'Stick with it', c: 'Minor adjustment' },
      { id: 'l7q3', text: 'The environment keeps changing.', a: 'Recalculate often', b: 'Move aggressively', c: 'Adapt smoothly' },
      { id: 'l7q4', text: 'You sense hidden risk.', a: 'Investigate', b: 'Ignore and go', c: 'Stay alert' },
      { id: 'l7q5', text: 'Time pressure spikes suddenly.', a: 'Stay precise', b: 'Speed up hard', c: 'Controlled acceleration' },
      { id: 'l7q6', text: 'A bold move could pay off.', a: 'Study the odds', b: 'Take the leap', c: 'Quick judgment' },
      { id: 'l7q7', text: 'You must commit soon.', a: 'Double-check first', b: 'Commit now', c: 'Brief review' },
      { id: 'l7q8', text: 'The path ahead is unclear.', a: 'Gather clarity', b: 'Move anyway', c: 'Probe carefully' },
    ],
  },
  {
    level: 8,
    questions: [
      { id: 'l8q1', text: 'A decision has long-term impact.', a: 'Think strategically', b: 'Act immediately', c: 'Consider key factors' },
      { id: 'l8q2', text: 'You notice a subtle pattern.', a: 'Analyze fully', b: 'Act on instinct', c: 'Note and proceed' },
      { id: 'l8q3', text: 'Stakes suddenly rise.', a: 'Increase caution', b: 'Increase speed', c: 'Stay balanced' },
      { id: 'l8q4', text: 'A fast reward is tempting.', a: 'Evaluate first', b: 'Grab it', c: 'Quick check' },
      { id: 'l8q5', text: 'You feel the clock closing in.', a: 'Stay controlled', b: 'Rush forward', c: 'Maintain rhythm' },
      { id: 'l8q6', text: 'Multiple options appear.', a: 'Compare carefully', b: 'Pick one fast', c: 'Narrow quickly' },
      { id: 'l8q7', text: 'A move could backfire.', a: 'Reduce risk', b: 'Take the gamble', c: 'Manage exposure' },
      { id: 'l8q8', text: 'Final seconds approaching.', a: 'Precision first', b: 'Speed first', c: 'Balanced finish' },
    ],
  },
  {
    level: 9,
    questions: [
      { id: 'l9q1', text: 'The safest option is slower.', a: 'Choose safety', b: 'Choose speed', c: 'Mix approach' },
      { id: 'l9q2', text: 'You detect a possible trap.', a: 'Investigate deeply', b: 'Push through', c: 'Stay cautious' },
      { id: 'l9q3', text: 'The reward looks unusually high.', a: 'Question it', b: 'Take it fast', c: 'Quick sanity check' },
      { id: 'l9q4', text: 'Your instinct and logic disagree.', a: 'Trust logic', b: 'Trust instinct', c: 'Blend both' },
      { id: 'l9q5', text: 'Pressure peaks again.', a: 'Stay composed', b: 'Move aggressively', c: 'Controlled push' },
      { id: 'l9q6', text: 'You must act with limited time.', a: 'Careful decision', b: 'Instant move', c: 'Quick balance' },
      { id: 'l9q7', text: 'The situation stabilizes briefly.', a: 'Reassess fully', b: 'Push advantage', c: 'Small adjustment' },
      { id: 'l9q8', text: 'One final risky option appears.', a: 'Evaluate deeply', b: 'Take it', c: 'Quick judgment' },
    ],
  },
  {
    level: 10,
    questions: [
      { id: 'l10q1', text: 'Everything depends on this move.', a: 'Calculate precisely', b: 'Act boldly', c: 'Stay balanced' },
      { id: 'l10q2', text: 'The window is closing fast.', a: 'Stay accurate', b: 'Go all-in', c: 'Timed response' },
      { id: 'l10q3', text: 'You notice micro-details others miss.', a: 'Study them', b: 'Ignore and act', c: 'Note key ones' },
      { id: 'l10q4', text: 'Risk and reward are both high.', a: 'Minimize risk', b: 'Maximize reward', c: 'Balance outcome' },
      { id: 'l10q5', text: 'Your first instinct feels strong.', a: 'Verify it', b: 'Trust it', c: 'Quick validation' },
      { id: 'l10q6', text: 'The end is near.', a: 'Stay precise', b: 'Finish fast', c: 'Controlled finish' },
      { id: 'l10q7', text: 'One last decision remains.', a: 'Careful review', b: 'Immediate choice', c: 'Brief check' },
      { id: 'l10q8', text: 'Final call.', a: 'Think clearly', b: 'Move boldly', c: 'Stay balanced' },
    ],
  },
];