import type { SpecialInterest } from "./store";

/* ------------------------------------------------------------------ */
/* Special interests                                                    */
/* ------------------------------------------------------------------ */

export const SPECIAL_INTERESTS: {
  id: SpecialInterest;
  label: string;
  emoji: string;
  emojis: string[];
  buddy: string;
}[] = [
  { id: "trains", label: "Trains", emoji: "🚂", emojis: ["🚂", "🚃", "🛤️", "🚉", "🎫"], buddy: "Toot the train" },
  { id: "animals", label: "Animals", emoji: "🐶", emojis: ["🐶", "🐱", "🐰", "🦊", "🐼"], buddy: "Pip the puppy" },
  { id: "space", label: "Space", emoji: "🚀", emojis: ["🚀", "🪐", "🌟", "🛰️", "👩‍🚀"], buddy: "Nova the rocket" },
  { id: "dinosaurs", label: "Dinosaurs", emoji: "🦕", emojis: ["🦕", "🦖", "🥚", "🌋", "🦴"], buddy: "Rex the dino" },
  { id: "ocean", label: "Ocean", emoji: "🐬", emojis: ["🐬", "🐠", "🐙", "🐚", "🌊"], buddy: "Splash the dolphin" },
  { id: "music", label: "Music", emoji: "🎵", emojis: ["🎵", "🥁", "🎸", "🎹", "🎤"], buddy: "Melody the drum" },
];

export function interestOf(id: SpecialInterest) {
  return SPECIAL_INTERESTS.find((i) => i.id === id) ?? SPECIAL_INTERESTS[0]!;
}

export const AFFIRMATIONS = [
  "You are brave for trying.",
  "Your brain learns in its own wonderful way.",
  "Going slowly is still going forward.",
  "You are a great friend to yourself.",
  "Asking for help is a superpower.",
  "Mistakes help your brain grow.",
  "You bring something no one else can.",
  "Calm bodies do big things.",
  "You did hard things today.",
  "Being you is more than enough.",
  "Small steps make big journeys.",
  "Your feelings all make sense.",
];

/** Daily sticker keyed to the date + the child's chosen interest. */
export function dailySticker(interest: SpecialInterest, day: string) {
  const seed = [...day].reduce((a, c) => a + c.charCodeAt(0), 0);
  const info = interestOf(interest);
  return {
    emoji: info.emojis[seed % info.emojis.length]!,
    text: AFFIRMATIONS[seed % AFFIRMATIONS.length]!,
    buddy: info.buddy,
  };
}

/* ------------------------------------------------------------------ */
/* English                                                              */
/* ------------------------------------------------------------------ */

export type LetterItem = { letter: string; word: string; emoji: string; sound: string };

const A_M: LetterItem[] = [
  { letter: "A", word: "Apple", emoji: "🍎", sound: "a as in apple" },
  { letter: "B", word: "Ball", emoji: "⚽", sound: "b as in ball" },
  { letter: "C", word: "Cat", emoji: "🐱", sound: "c as in cat" },
  { letter: "D", word: "Dog", emoji: "🐶", sound: "d as in dog" },
  { letter: "E", word: "Egg", emoji: "🥚", sound: "e as in egg" },
  { letter: "F", word: "Fish", emoji: "🐟", sound: "f as in fish" },
  { letter: "G", word: "Goat", emoji: "🐐", sound: "g as in goat" },
  { letter: "H", word: "Hat", emoji: "🎩", sound: "h as in hat" },
  { letter: "I", word: "Ice", emoji: "🧊", sound: "i as in ice" },
  { letter: "J", word: "Jam", emoji: "🍯", sound: "j as in jam" },
  { letter: "K", word: "Kite", emoji: "🪁", sound: "k as in kite" },
  { letter: "L", word: "Lion", emoji: "🦁", sound: "l as in lion" },
  { letter: "M", word: "Moon", emoji: "🌙", sound: "m as in moon" },
];

const N_Z: LetterItem[] = [
  { letter: "N", word: "Nest", emoji: "🪹", sound: "n as in nest" },
  { letter: "O", word: "Owl", emoji: "🦉", sound: "o as in owl" },
  { letter: "P", word: "Pig", emoji: "🐷", sound: "p as in pig" },
  { letter: "Q", word: "Queen", emoji: "👑", sound: "q as in queen" },
  { letter: "R", word: "Rain", emoji: "🌧️", sound: "r as in rain" },
  { letter: "S", word: "Sun", emoji: "☀️", sound: "s as in sun" },
  { letter: "T", word: "Tree", emoji: "🌳", sound: "t as in tree" },
  { letter: "U", word: "Umbrella", emoji: "☂️", sound: "u as in umbrella" },
  { letter: "V", word: "Van", emoji: "🚐", sound: "v as in van" },
  { letter: "W", word: "Whale", emoji: "🐳", sound: "w as in whale" },
  { letter: "X", word: "Box", emoji: "📦", sound: "x as in box" },
  { letter: "Y", word: "Yarn", emoji: "🧶", sound: "y as in yarn" },
  { letter: "Z", word: "Zebra", emoji: "🦓", sound: "z as in zebra" },
];

export const SENTENCES = [
  { text: "The cat is on the mat.", emoji: "🐱" },
  { text: "I can see the big sun.", emoji: "☀️" },
  { text: "We run to the park.", emoji: "🏞️" },
  { text: "My dog likes to play.", emoji: "🐶" },
  { text: "She reads a fun book.", emoji: "📖" },
  { text: "The fish swims fast.", emoji: "🐟" },
  { text: "I am happy today.", emoji: "😊" },
  { text: "Let us share the ball.", emoji: "⚽" },
];

export const ENGLISH_LEVELS = [
  { id: "level-1", title: "Level 1: A to M", emoji: "🅰️", desc: "Learn, trace and quiz letters A–M", letters: A_M },
  { id: "level-2", title: "Level 2: N to Z", emoji: "🆎", desc: "Learn, trace and quiz letters N–Z", letters: N_Z },
];

/* ------------------------------------------------------------------ */
/* Maths                                                                */
/* ------------------------------------------------------------------ */

export const numberRange = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export const COUNTING_SETS = [
  { count: 3, emoji: "🍎" },
  { count: 5, emoji: "⭐" },
  { count: 4, emoji: "🐟" },
  { count: 6, emoji: "🚗" },
  { count: 2, emoji: "🐶" },
  { count: 7, emoji: "🌸" },
  { count: 8, emoji: "🎈" },
  { count: 9, emoji: "🍪" },
];

export const OPERATIONS = [
  { a: 1, b: 2, op: "+" },
  { a: 3, b: 2, op: "+" },
  { a: 4, b: 4, op: "+" },
  { a: 5, b: 3, op: "+" },
  { a: 9, b: 1, op: "+" },
  { a: 5, b: 2, op: "-" },
  { a: 8, b: 3, op: "-" },
  { a: 10, b: 4, op: "-" },
  { a: 7, b: 6, op: "-" },
  { a: 6, b: 2, op: "-" },
] as const;

export const MATHS_MODULES = [
  { id: "numbers-0-50", title: "Numbers 0–50", emoji: "🔢", desc: "Say and trace every number" },
  { id: "numbers-51-100", title: "Numbers 51–100", emoji: "💯", desc: "Bigger numbers, same fun" },
  { id: "counting", title: "Counting Fun", emoji: "🧮", desc: "Count the pictures" },
  { id: "operations", title: "Adding & Taking Away", emoji: "➕", desc: "Simple sums with pictures" },
];

/* ------------------------------------------------------------------ */
/* Special activities                                                   */
/* ------------------------------------------------------------------ */

export const COLORS = [
  { name: "Red", emoji: "🔴", hex: "#e5484d" },
  { name: "Blue", emoji: "🔵", hex: "#3b82f6" },
  { name: "Green", emoji: "🟢", hex: "#22a06b" },
  { name: "Yellow", emoji: "🟡", hex: "#f5c518" },
  { name: "Purple", emoji: "🟣", hex: "#8b5cf6" },
  { name: "Orange", emoji: "🟠", hex: "#f97316" },
];

export const SHAPES = [
  { name: "Circle", emoji: "⭕" },
  { name: "Square", emoji: "🟦" },
  { name: "Triangle", emoji: "🔺" },
  { name: "Star", emoji: "⭐" },
  { name: "Heart", emoji: "❤️" },
  { name: "Diamond", emoji: "🔷" },
];

export const EMOTION_FACES = [
  { name: "Happy", emoji: "😊", zone: "green", body: "Your face feels soft and light." },
  { name: "Calm", emoji: "😌", zone: "green", body: "Your breathing is slow and easy." },
  { name: "Sad", emoji: "😢", zone: "blue", body: "Your body feels heavy and slow." },
  { name: "Tired", emoji: "🥱", zone: "blue", body: "Your eyes want to close." },
  { name: "Worried", emoji: "😟", zone: "yellow", body: "Your tummy feels wobbly." },
  { name: "Excited", emoji: "🤩", zone: "yellow", body: "Your body wants to bounce." },
  { name: "Angry", emoji: "😠", zone: "red", body: "Your hands feel tight and hot." },
  { name: "Overwhelmed", emoji: "🫨", zone: "red", body: "Everything feels too loud and too much." },
];

export const ANIMALS = [
  { name: "Cat", emoji: "🐱", sound: "Meow" },
  { name: "Dog", emoji: "🐶", sound: "Woof" },
  { name: "Cow", emoji: "🐮", sound: "Moo" },
  { name: "Duck", emoji: "🦆", sound: "Quack" },
  { name: "Lion", emoji: "🦁", sound: "Roar" },
  { name: "Frog", emoji: "🐸", sound: "Ribbit" },
  { name: "Sheep", emoji: "🐑", sound: "Baa" },
  { name: "Horse", emoji: "🐴", sound: "Neigh" },
];

export const FRUITS = [
  { name: "Apple", emoji: "🍎" },
  { name: "Banana", emoji: "🍌" },
  { name: "Grapes", emoji: "🍇" },
  { name: "Orange", emoji: "🍊" },
  { name: "Strawberry", emoji: "🍓" },
  { name: "Watermelon", emoji: "🍉" },
  { name: "Pear", emoji: "🍐" },
  { name: "Mango", emoji: "🥭" },
];

export const DAYS = [
  { name: "Monday", emoji: "1️⃣" },
  { name: "Tuesday", emoji: "2️⃣" },
  { name: "Wednesday", emoji: "3️⃣" },
  { name: "Thursday", emoji: "4️⃣" },
  { name: "Friday", emoji: "5️⃣" },
  { name: "Saturday", emoji: "6️⃣" },
  { name: "Sunday", emoji: "7️⃣" },
];

export const MONTHS = [
  { name: "January", emoji: "❄️" },
  { name: "February", emoji: "💗" },
  { name: "March", emoji: "🌱" },
  { name: "April", emoji: "🌧️" },
  { name: "May", emoji: "🌷" },
  { name: "June", emoji: "🌞" },
  { name: "July", emoji: "🏖️" },
  { name: "August", emoji: "🌻" },
  { name: "September", emoji: "🍂" },
  { name: "October", emoji: "🎃" },
  { name: "November", emoji: "🌰" },
  { name: "December", emoji: "🎄" },
];

export const SPECIAL_ACTIVITIES = [
  { id: "colors", title: "Color Match", emoji: "🎨", desc: "Match the color to its name" },
  { id: "shapes", title: "Shape Match", emoji: "🔷", desc: "Find the right shape" },
  { id: "emotions", title: "Emotions", emoji: "😊", desc: "Name how the face feels" },
  { id: "animals", title: "Animals", emoji: "🐾", desc: "Animals and their sounds" },
  { id: "fruits", title: "Fruits", emoji: "🍓", desc: "Learn tasty fruit names" },
  { id: "memory", title: "Memory Game", emoji: "🧠", desc: "Find the matching pairs" },
  { id: "days", title: "Days of the Week", emoji: "📅", desc: "Put the days in order" },
  { id: "months", title: "Months", emoji: "🗓️", desc: "Learn the twelve months" },
];

/* ------------------------------------------------------------------ */
/* Videos                                                               */
/* ------------------------------------------------------------------ */

export const VIDEO_CATEGORIES = ["Letters", "Numbers", "Social", "Calm", "Life Skills"] as const;

export const VIDEOS: {
  id: string;
  title: string;
  category: (typeof VIDEO_CATEGORIES)[number];
  emoji: string;
  minutes: number;
  script: string[];
}[] = [
  {
    id: "letter-sounds",
    title: "Letter Sounds Sing-Along",
    category: "Letters",
    emoji: "🎤",
    minutes: 4,
    script: [
      "A says a, like apple. 🍎",
      "B says b, like ball. ⚽",
      "C says c, like cat. 🐱",
      "Now say them with me, nice and slow.",
    ],
  },
  {
    id: "blend-words",
    title: "Blending Little Words",
    category: "Letters",
    emoji: "🧩",
    minutes: 5,
    script: ["c - a - t makes cat. 🐱", "s - u - n makes sun. ☀️", "Stretch the sounds, then squeeze them together."],
  },
  {
    id: "count-ten",
    title: "Counting to Ten",
    category: "Numbers",
    emoji: "🔢",
    minutes: 3,
    script: ["One duck. 🦆", "Two ducks. 🦆🦆", "Keep going all the way to ten.", "Great counting!"],
  },
  {
    id: "add-small",
    title: "Adding With Apples",
    category: "Numbers",
    emoji: "🍎",
    minutes: 4,
    script: ["Two apples and one apple make three apples.", "Count them all together.", "You did it!"],
  },
  {
    id: "say-hello",
    title: "How To Say Hello",
    category: "Social",
    emoji: "👋",
    minutes: 3,
    script: ["Look near their face, or at their shoulder.", "Wave or say hi.", "Wait for them to answer.", "That is a great greeting."],
  },
  {
    id: "taking-turns",
    title: "Taking Turns With A Friend",
    category: "Social",
    emoji: "🔁",
    minutes: 4,
    script: ["First my turn, then your turn.", "Waiting can feel long. Count in your head.", "Friends feel happy when turns are fair."],
  },
  {
    id: "breathe-video",
    title: "Balloon Breathing",
    category: "Calm",
    emoji: "🎈",
    minutes: 3,
    script: ["Breathe in and grow the balloon.", "Hold it gently.", "Breathe out and let the balloon shrink.", "Your body is calmer now."],
  },
  {
    id: "quiet-body",
    title: "Making A Quiet Body",
    category: "Calm",
    emoji: "🤫",
    minutes: 3,
    script: ["Feet still on the floor.", "Hands soft in your lap.", "Slow breath in and out.", "You are safe here."],
  },
  {
    id: "wash-hands-video",
    title: "Washing Hands Step By Step",
    category: "Life Skills",
    emoji: "🧼",
    minutes: 3,
    script: ["Turn on the water.", "Soap and rub for a slow song.", "Rinse and dry.", "Your hands are clean!"],
  },
  {
    id: "pack-bag-video",
    title: "Packing My School Bag",
    category: "Life Skills",
    emoji: "🎒",
    minutes: 4,
    script: ["Check the list.", "One thing at a time into the bag.", "Zip it up.", "You are ready."],
  },
];

/* ------------------------------------------------------------------ */
/* Autism pathway: social skills                                        */
/* ------------------------------------------------------------------ */

export type SocialTopic = {
  id: string;
  title: string;
  emoji: string;
  why: string;
  steps: { emoji: string; text: string }[];
  quiz: { question: string; options: { emoji: string; text: string }[]; answer: number; feedback: string }[];
};

export const SOCIAL_TOPICS: SocialTopic[] = [
  {
    id: "greeting",
    title: "Saying Hello",
    emoji: "👋",
    why: "A greeting tells someone you noticed them.",
    steps: [
      { emoji: "👀", text: "Look toward the person's face or shoulder." },
      { emoji: "🙋", text: "Wave your hand or nod." },
      { emoji: "💬", text: "Say “Hi” or “Good morning”." },
      { emoji: "⏳", text: "Wait a few seconds for them to answer." },
    ],
    quiz: [
      {
        question: "Your friend walks into the room. What can you do first?",
        options: [
          { emoji: "👋", text: "Wave and say hi" },
          { emoji: "🙈", text: "Turn away and say nothing" },
          { emoji: "📣", text: "Shout across the room" },
        ],
        answer: 0,
        feedback: "A wave and a hi is a friendly start.",
      },
      {
        question: "You said hi and they did not answer yet. What next?",
        options: [
          { emoji: "⏳", text: "Wait a little, they may be busy" },
          { emoji: "😠", text: "Say it again very loudly" },
        ],
        answer: 0,
        feedback: "Waiting is kind. People need time sometimes.",
      },
    ],
  },
  {
    id: "asking-help",
    title: "Asking For Help",
    emoji: "🙋",
    why: "Asking for help is smart, not a mistake.",
    steps: [
      { emoji: "🛑", text: "Notice the stuck feeling in your body." },
      { emoji: "🧍", text: "Go near a safe adult or friend." },
      { emoji: "💬", text: "Say “Can you help me, please?”" },
      { emoji: "👂", text: "Listen to what they say." },
    ],
    quiz: [
      {
        question: "The work is too hard and your tummy feels tight. What helps?",
        options: [
          { emoji: "🙋", text: "Ask an adult for help" },
          { emoji: "🗑️", text: "Rip up the paper" },
        ],
        answer: 0,
        feedback: "Asking is a superpower. Well done.",
      },
    ],
  },
  {
    id: "taking-turns",
    title: "Taking Turns",
    emoji: "🔁",
    why: "Turns make games feel fair for everyone.",
    steps: [
      { emoji: "1️⃣", text: "One person goes first." },
      { emoji: "⏳", text: "Wait and watch while they play." },
      { emoji: "2️⃣", text: "Then it is your turn." },
      { emoji: "🎉", text: "Say “good turn” to your friend." },
    ],
    quiz: [
      {
        question: "It is your friend's turn and you want the toy. What can you do?",
        options: [
          { emoji: "⏳", text: "Wait and count slowly to ten" },
          { emoji: "🤲", text: "Grab it out of their hands" },
        ],
        answer: 0,
        feedback: "Waiting keeps the game fun for both of you.",
      },
    ],
  },
  {
    id: "joining",
    title: "Joining A Conversation",
    emoji: "🗣️",
    why: "There is a good moment to step into a chat.",
    steps: [
      { emoji: "👂", text: "Listen first, find out the topic." },
      { emoji: "🚶", text: "Stand near the group." },
      { emoji: "⏸️", text: "Wait for a pause." },
      { emoji: "💬", text: "Say something about the same topic." },
    ],
    quiz: [
      {
        question: "They are talking about dinosaurs. What is a good thing to say?",
        options: [
          { emoji: "🦕", text: "“I like dinosaurs too!”" },
          { emoji: "🚗", text: "“My shoes are new.”" },
        ],
        answer: 0,
        feedback: "Staying on the same topic helps people connect.",
      },
    ],
  },
  {
    id: "handling-no",
    title: "When Someone Says No",
    emoji: "🚫",
    why: "No is hard to hear. Your body can still stay safe.",
    steps: [
      { emoji: "🫁", text: "Take one slow breath." },
      { emoji: "🧠", text: "Tell yourself “no now, maybe later”." },
      { emoji: "💬", text: "Say “okay” or ask “when can I?”" },
      { emoji: "🎯", text: "Choose something else to do." },
    ],
    quiz: [
      {
        question: "You asked for a snack and grown-up said not yet. What helps your body?",
        options: [
          { emoji: "🫁", text: "One slow breath, then ask when" },
          { emoji: "😤", text: "Yell until they change their mind" },
        ],
        answer: 0,
        feedback: "A breath first gives your brain time to think.",
      },
    ],
  },
  {
    id: "thank-you",
    title: "Saying Thank You",
    emoji: "💛",
    why: "Thank you tells someone you noticed their kindness.",
    steps: [
      { emoji: "🎁", text: "Notice someone helped or gave you something." },
      { emoji: "👀", text: "Turn toward them." },
      { emoji: "💬", text: "Say “thank you”." },
      { emoji: "🙂", text: "A smile or nod also works." },
    ],
    quiz: [
      {
        question: "A friend picked up your pencil for you. What can you say?",
        options: [
          { emoji: "💛", text: "“Thank you!”" },
          { emoji: "🤐", text: "Nothing at all" },
        ],
        answer: 0,
        feedback: "Thank you feels good for both of you.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Autism pathway: zones + coping                                       */
/* ------------------------------------------------------------------ */

export const ZONES = [
  {
    id: "blue",
    name: "Blue Zone",
    emoji: "💙",
    feelings: "sad, tired, slow, bored",
    body: "Low and heavy energy.",
    help: "Gentle wake-ups: water, stretch, talk to someone.",
  },
  {
    id: "green",
    name: "Green Zone",
    emoji: "💚",
    feelings: "calm, happy, ready, focused",
    body: "Just-right energy.",
    help: "Great time to learn and play.",
  },
  {
    id: "yellow",
    name: "Yellow Zone",
    emoji: "💛",
    feelings: "wiggly, worried, excited, silly",
    body: "Energy is climbing up.",
    help: "Slow it down: breathe, squeeze, take a break.",
  },
  {
    id: "red",
    name: "Red Zone",
    emoji: "❤️",
    feelings: "angry, scared, overwhelmed",
    body: "Very big energy, hard to think.",
    help: "Safety first: quiet space, deep breaths, a safe adult.",
  },
] as const;

export const COPING_TOOLS = [
  { id: "breath", title: "Deep Breaths", emoji: "🫁", desc: "Breathe in for 4, hold 4, out 4." },
  { id: "fidget", title: "Fidget", emoji: "🌀", desc: "Squeeze, spin or press something small." },
  { id: "quiet", title: "Quiet Time", emoji: "🤫", desc: "Find a low-noise, low-light spot." },
  { id: "break", title: "Ask For A Break", emoji: "⏸️", desc: "Say or show “I need a break”." },
  { id: "interest", title: "Special Interest", emoji: "⭐", desc: "Two minutes with a favourite thing." },
  { id: "push", title: "Heavy Work", emoji: "🧱", desc: "Push the wall or squeeze a pillow." },
  { id: "water", title: "Sip Water", emoji: "💧", desc: "Slow sips help your body settle." },
  { id: "walk", title: "Movement", emoji: "🚶", desc: "Ten slow steps, then check again." },
];

export const EMOTION_SCENARIOS = [
  { text: "The fire alarm is very loud.", emoji: "🔔", zone: "red", tool: "quiet" },
  { text: "Your tower fell down again.", emoji: "🧱", zone: "yellow", tool: "breath" },
  { text: "A friend shared their snack with you.", emoji: "🍪", zone: "green", tool: "interest" },
  { text: "Playtime finished too soon.", emoji: "⏰", zone: "blue", tool: "break" },
  { text: "The room is noisy and busy.", emoji: "🎉", zone: "yellow", tool: "fidget" },
  { text: "You woke up very early and feel sleepy.", emoji: "🥱", zone: "blue", tool: "water" },
];

/* ------------------------------------------------------------------ */
/* Autism pathway: routines + life skills                               */
/* ------------------------------------------------------------------ */

export type Sequence = {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  steps: { emoji: string; text: string }[];
};

export const ROUTINES: Sequence[] = [
  {
    id: "morning",
    title: "Morning Routine",
    emoji: "🌅",
    desc: "How my day starts",
    steps: [
      { emoji: "🛏️", text: "Get out of bed" },
      { emoji: "🚽", text: "Use the toilet" },
      { emoji: "👕", text: "Get dressed" },
      { emoji: "🥣", text: "Eat breakfast" },
      { emoji: "🪥", text: "Brush teeth" },
      { emoji: "🎒", text: "Take my bag" },
    ],
  },
  {
    id: "wash-hands",
    title: "Washing Hands",
    emoji: "🧼",
    desc: "Six clean steps",
    steps: [
      { emoji: "🚰", text: "Turn on the water" },
      { emoji: "💧", text: "Wet both hands" },
      { emoji: "🧼", text: "Add soap" },
      { emoji: "🫧", text: "Rub for a slow song" },
      { emoji: "🚿", text: "Rinse it all off" },
      { emoji: "🧻", text: "Dry my hands" },
    ],
  },
  {
    id: "school-ready",
    title: "Getting Ready For School",
    emoji: "🏫",
    desc: "Everything before we leave",
    steps: [
      { emoji: "👟", text: "Put on shoes" },
      { emoji: "🧥", text: "Put on coat" },
      { emoji: "🎒", text: "Check the bag" },
      { emoji: "🍎", text: "Take my snack" },
      { emoji: "👋", text: "Say goodbye" },
    ],
  },
  {
    id: "end-of-day",
    title: "Ending The Day",
    emoji: "🌙",
    desc: "Slow and calm at bedtime",
    steps: [
      { emoji: "🛁", text: "Bath or wash" },
      { emoji: "👚", text: "Put on pyjamas" },
      { emoji: "🪥", text: "Brush teeth" },
      { emoji: "📖", text: "One story" },
      { emoji: "💡", text: "Lights low" },
      { emoji: "😴", text: "Sleep time" },
    ],
  },
];

export const LIFE_SKILLS: Sequence[] = [
  {
    id: "hand-washing",
    title: "Hand Washing",
    emoji: "🧼",
    desc: "Clean hands, step by step",
    steps: [
      { emoji: "🚰", text: "Water on" },
      { emoji: "🧼", text: "Soap on hands" },
      { emoji: "🫧", text: "Rub palms, backs and between fingers" },
      { emoji: "🚿", text: "Rinse" },
      { emoji: "🧻", text: "Dry" },
    ],
  },
  {
    id: "brushing-teeth",
    title: "Brushing Teeth",
    emoji: "🪥",
    desc: "Two minutes, front to back",
    steps: [
      { emoji: "🪥", text: "Wet the brush" },
      { emoji: "🧴", text: "A pea of toothpaste" },
      { emoji: "🔄", text: "Small circles on the top teeth" },
      { emoji: "🔁", text: "Small circles on the bottom teeth" },
      { emoji: "💦", text: "Spit and rinse" },
    ],
  },
  {
    id: "toilet-routine",
    title: "Toilet Routine",
    emoji: "🚽",
    desc: "Private, calm and clean",
    steps: [
      { emoji: "🚪", text: "Close the door" },
      { emoji: "🩳", text: "Clothes down" },
      { emoji: "🚽", text: "Sit and wait" },
      { emoji: "🧻", text: "Wipe" },
      { emoji: "🚿", text: "Flush" },
      { emoji: "🧼", text: "Wash hands" },
    ],
  },
  {
    id: "packing-bag",
    title: "Packing My Bag",
    emoji: "🎒",
    desc: "Nothing forgotten",
    steps: [
      { emoji: "📋", text: "Look at the list" },
      { emoji: "📚", text: "Books in" },
      { emoji: "✏️", text: "Pencil case in" },
      { emoji: "🍱", text: "Lunch in" },
      { emoji: "🤐", text: "Zip it up" },
    ],
  },
  {
    id: "safety-basics",
    title: "Safety Basics",
    emoji: "🛟",
    desc: "Staying safe out and about",
    steps: [
      { emoji: "🖐️", text: "Stop at the kerb" },
      { emoji: "👀", text: "Look both ways" },
      { emoji: "🤝", text: "Hold a hand or walk beside my adult" },
      { emoji: "🚸", text: "Cross when it is clear" },
      { emoji: "🆘", text: "If I am lost, find a shop worker or a person with a badge" },
    ],
  },
  {
    id: "community",
    title: "Out In The Community",
    emoji: "🏪",
    desc: "Shops, buses and waiting",
    steps: [
      { emoji: "🧾", text: "Know the plan before we go" },
      { emoji: "🧍", text: "Wait in the line" },
      { emoji: "💬", text: "Say please and thank you" },
      { emoji: "🎧", text: "Use ear defenders if it is loud" },
      { emoji: "🏁", text: "Finished! Head home" },
    ],
  },
];

export const PARENT_TIPS = [
  {
    title: "Predictable beats fast",
    body: "Show what is coming next with the Now–Next–Then board before you start a new activity.",
    emoji: "🗓️",
  },
  {
    title: "Wait ten seconds",
    body: "Processing time is real. Ask once, then count silently to ten before repeating.",
    emoji: "⏳",
  },
  {
    title: "Name the feeling, not the behaviour",
    body: "Try “your body looks like it is in the yellow zone” instead of “stop being silly”.",
    emoji: "💛",
  },
  {
    title: "Use the special interest",
    body: "Turn counting, letters and stories into their favourite topic. Motivation follows interest.",
    emoji: "⭐",
  },
  {
    title: "Break before burst",
    body: "Offer the Calm Corner early, when energy is climbing — not after it peaks.",
    emoji: "🫧",
  },
  {
    title: "Celebrate the try",
    body: "Praise the effort and the step, not only the correct answer.",
    emoji: "🎉",
  },
];
