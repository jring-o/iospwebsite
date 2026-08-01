import { z } from 'zod'

// Sign-up for the "Build a sovereign data node" workshop (IOSP 2026, Store
// stage). Question set and copy come from the workshop's signup-copy doc;
// responses land in the resilient_data_signups table and never in git.

export type Option = { value: string; label: string; description?: string }

export const LOCATIONS: readonly string[] = [
  'Netherlands',
  'Elsewhere in Europe',
  'US',
  'Elsewhere in North America',
  'South America',
  'Africa',
  'Asia',
  'Somewhere else',
]

export const MODES: readonly Option[] = [
  {
    value: 'pi',
    label: 'Raspberry Pi',
    description:
      'I want a Raspberry Pi to set up at the workshop, take home, and keep running. Free to keep; 10 available.',
  },
  {
    value: 'laptop',
    label: 'My own laptop',
    description:
      'I’ll run a full node on my laptop, on the laptop network. Nothing to take home, same hands-on learning.',
  },
  {
    value: 'either',
    label: 'Either',
    description: 'Happy with whichever the room needs.',
  },
]

export const PI_HOME: readonly Option[] = [
  { value: 'home', label: 'Yes, I can plug it in at home and leave it running' },
  {
    value: 'office',
    label: 'I was hoping to host it at my office or campus',
    description: 'Let’s talk; this isn’t a deal-breaker, but… let’s talk.',
  },
  { value: 'unsure', label: 'Not sure yet' },
]

export const PI_PLUGS: readonly string[] = [
  'EU',
  'US, Canada, or Japan',
  'UK, Ireland, Singapore, Hong Kong, Kenya, Nigeria (the chunky three-pin plug)',
  'Australia, New Zealand, or China',
  'India',
  'South Africa',
  'Somewhere else / not sure',
]

export const HOME_INTERNET: readonly string[] = [
  'Ordinary home internet, as far as I know',
  'Shared building or dorm Wi-Fi',
  'Satellite internet',
  'A landlord- or building-controlled router',
  'Mobile hotspot or tethering',
  'Honestly, no idea',
  'Something else',
]

export const PROVIDERS: readonly string[] = [
  'Ziggo',
  'KPN',
  'Odido',
  'Delta or Caiway',
  'Vodafone',
  'Deutsche Telekom',
  'Orange',
  'Movistar or O2 (Telefónica)',
  'BT, Sky, or Virgin Media',
  'Xfinity (Comcast)',
  'Spectrum',
  'AT&T',
  'Verizon (Fios or 5G Home)',
  'T-Mobile Home Internet',
  'Cox',
  'Starlink',
  'A local or municipal fiber provider',
  'Another provider',
  'No idea',
]

export const ROUTER_ACCESS: readonly string[] = [
  'Yes, I’ve changed router settings before',
  'Yes, but I’ve never tried to edit anything, and don’t know how',
  'No; my landlord, building, or provider controls it',
  'No idea what any of this means',
]

export const ANCHOR: readonly string[] = [
  'Yes, happy to',
  'Maybe; tell me more at the workshop',
  'Rather not',
]

export const DATASET: readonly Option[] = [
  { value: 'yes', label: 'Yes, I have a specific dataset in mind' },
  { value: 'maybe', label: 'I can think of candidates, nothing certain yet' },
  { value: 'no', label: 'Not yet; I’ll help rescue what the room brings' },
]

export const DATASET_SIZES: readonly string[] = [
  'Megabytes (documents, tables, code)',
  'Gigabytes (images, audio, a project archive)',
  'Tens to hundreds of gigabytes',
  'Terabytes or more',
  'No idea',
]

export const LAPTOPS: readonly string[] = [
  'macOS',
  'Windows',
  'Linux',
  'I can’t bring a laptop',
]

export const TERMINAL: readonly string[] = [
  'I use one regularly',
  'I’ve used one occasionally',
  'Never touched one',
]

export const TOOLS: readonly string[] = [
  'VS Code',
  'Claude Code',
  'Claude Desktop',
  'Codex Desktop',
  'A local LLM',
  'Another AI coding tool (Cursor, Copilot, Gemini CLI, and so on)',
  'None of these',
]

export const resilientDataSignupSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required.').max(200),
    email: z.string().trim().toLowerCase().email('Please enter a valid email.'),
    institution: z.string().trim().max(200).optional().default(''),
    field: z.string().trim().max(200).optional().default(''),
    location: z.string().min(1, 'Pick where you live.'),
    mode: z.enum(['pi', 'laptop', 'either'], {
      message: 'Pick how you want to take part.',
    }),
    piHome: z.string().optional().default(''),
    piPlug: z.string().optional().default(''),
    homeInternet: z
      .array(z.string())
      .min(1, 'Choose at least one; “Honestly, no idea” is a fine answer.')
      .default([]),
    provider: z.string().min(1, 'Pick your provider; “No idea” is fine.'),
    providerOther: z.string().trim().max(200).optional().default(''),
    routerAccess: z.string().min(1, 'Pick one; “No idea” is a normal answer.'),
    anchor: z.string().min(1, 'Pick one; this commits you to nothing.'),
    dataset: z.enum(['yes', 'maybe', 'no'], { message: 'Pick one.' }),
    datasetWhat: z.string().trim().max(500).optional().default(''),
    datasetSize: z.string().optional().default(''),
    laptop: z.string().min(1, 'Pick the laptop you’ll bring.'),
    terminal: z.string().min(1, 'Pick one; every level is welcome.'),
    tools: z.array(z.string()).optional().default([]),
    notes: z.string().trim().max(2000).optional().default(''),
    // Honeypot. Humans never see it; anything here means a bot filled the form.
    website: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.mode !== 'laptop') {
      if (!data.piHome) {
        ctx.addIssue({
          code: 'custom',
          path: ['piHome'],
          message: 'Tell us whether the node can live at your home.',
        })
      }
      if (!data.piPlug) {
        ctx.addIssue({
          code: 'custom',
          path: ['piPlug'],
          message: 'Pick your wall plug so we can match the kit.',
        })
      }
    }
    if (data.dataset === 'yes') {
      if (data.datasetWhat.trim().length < 3) {
        ctx.addIssue({
          code: 'custom',
          path: ['datasetWhat'],
          message: 'A sentence is plenty.',
        })
      }
      if (!data.datasetSize) {
        ctx.addIssue({
          code: 'custom',
          path: ['datasetSize'],
          message: 'A guess is fine.',
        })
      }
    }
  })

export type ResilientDataSignupInput = z.input<typeof resilientDataSignupSchema>

export type ResilientDataSignupResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
