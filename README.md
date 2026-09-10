# EchoAbility Learns

Build a complete Expo (React Native) mobile learning app called "EchoAbility" using the bolt-expo template. It is a child-friendly learning platform specifically designed for children with Dyslexia and Autism (ages 4–12).

### Core Requirements (keep existing structure & feel exactly as is)

- Expo Router with file-based routing

- Tabs: Home, Activities, Videos, Profile

- Auth with FireBase (email + password, username, avatar emoji, age, learning_mode)

- learning_mode can be 'dyslexia' or 'autism'

- Progress tracking, coins, streaks, achievements

- Text-to-speech (useSpeech hook)

- Soft, colorful, accessible UI with light/dark theme support

- Components: Card, Button, ThemedText, ProgressRing, Quiz, TracingCanvas, Transitions (FadeIn, SlideIn, PopIn)

- Existing modules must remain:

  - English: Level 1 (A–M), Level 2 (N–Z), Level 3 (Sentences) with learn + trace + quiz

  - Maths: Numbers 0–50, 51–100, counting, simple operations

  - Special Activities: Color Match, Shape Match, Emotions, Animals, Fruits, Memory Game, Days, Months

  - Videos list with categories

  - Achievements screen

  - Profile with stats (streak, coins, achievements)

Keep the exact same visual style, colors, spacing, radius, and component patterns from a polished dyslexia-friendly kids app (large text, high contrast options, clean cards, emoji-heavy, encouraging language).

### New / Expanded Features for Autism Mode (add these without breaking Dyslexia mode)

When the user’s learning_mode is 'autism', the app should adapt and show additional dedicated content:

1. *Home Screen*

   - Show a clear “Autism Mode” badge

   - Extra module cards:

     - Social Skills

     - Emotions & Regulation

     - Visual Schedules & Routines

     - Life Skills

2. *New Screens / Modules to create*

   a) Social Skills Module

   - Video modeling style lessons (text + emoji + TTS)

   - Topics: Greeting, Asking for help, Taking turns, Joining a conversation, Handling “no”, Saying thank you

   - Simple step-by-step visual sequences

   - Practice quizzes with scenario choices

   b) Emotions & Regulation Module

   - Zones of Regulation style (Blue / Green / Yellow / Red)

   - Emotion recognition with faces + context

   - Coping tools choice board (deep breaths, fidget, quiet time, ask for break, special interest)

   - Breathing exercise screen with animated guidance + TTS

   - “How do I feel right now?” check-in that saves to progress

   c) Visual Schedules & Routines

   - Now – Next – Then board (customizable)

   - Pre-made visual routines: Morning routine, Washing hands, Getting ready for school, Ending the day

   - Drag-and-drop or tap-to-complete sequence activities

   d) Life Skills

   - Visual step-by-step: Hand washing, Brushing teeth, Toilet routine, Packing bag

   - Safety basics and simple community skills

3. *Shared Enhancements (available in both modes but especially useful for Autism)*

   - Stronger visual supports everywhere (more icons, sequences, less text density)

   - “Calm Corner” floating button that opens regulation tools

   - Option to reduce animations / motion

   - Special Interest integration: allow parent/child to pick a favorite theme (trains, animals, space, dinosaurs etc.) and inject related emojis/examples into lessons

   - Clear “Finished” celebrations and predictable structure

   - Parent/Teacher tips section in Profile

4. *Data & Learning Content*

   - Extend learningData.ts with autism-specific data: social scripts, emotion scenarios, routine sequences, regulation strategies

   - Keep all existing alphabet, numbers, sentences, colors, shapes, animals, fruits, days, months data exactly as is

5. *Profile & Settings*

   - Already shows “Autism” or “Dyslexia” mode — keep this

   - Add toggle or clear indicator of current mode

   - Sensory preferences (reduce motion, higher contrast, quieter sounds)

### Technical Notes

- Use TypeScript

- Keep existing lib structure (auth, progress, settings, theme, useSpeech, firebase)

- Use lucide-react-native icons

- Make everything work offline-friendly where possible (local data + optional FireBase sync)

- Ensure excellent accessibility: large touch targets, high contrast, TTS on almost every interactive element, clear visual hierarchy

- Child-safe, encouraging, never pathologizing language

Create the full working app with all screens, navigation, data, and both Dyslexia + Autism pathways fully functional. Start with the existing dyslexia-focused features and cleanly layer the autism modules on top.                                                                                                         What theme customization options would you like enabled?

Adaptive sensory themes (Dyslexia High-Contrast Yellow/Cream, Autism Calm Pastel Blue/Green, Dark Mode) + Special Interest customization

Sound and visual animation style:

Rewarding pop animations, interactive confetti celebrations, gentle audio feedback, and Calm Corner breathing guides

Any additional info?

make the tracing accurate.           Sensory Soundscapes: Add calming white noise, gentle ocean wave loops, and campfire crackles inside the Calm Corner

Daily Affirmation Stickers: Show a daily positive reward sticker aligned with the child's chosen special interest every morning

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3312bbea-4851-498c-90ca-71626db836fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
