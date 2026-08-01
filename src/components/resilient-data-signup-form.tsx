'use client'

import { useState, useTransition } from 'react'
import { useForm, useWatch, Controller, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ArrowRight, Loader2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  resilientDataSignupSchema,
  type ResilientDataSignupInput,
  type Option,
  LOCATIONS,
  MODES,
  PI_HOME,
  PI_PLUGS,
  HOME_INTERNET,
  PROVIDERS,
  ROUTER_ACCESS,
  ANCHOR,
  DATASET,
  DATASET_SIZES,
  LAPTOPS,
  TERMINAL,
  TOOLS,
} from '@/lib/resilient-data-signup-schema'
import { submitResilientDataSignup } from '@/app/actions/resilient-data-signup'

function defaults(): ResilientDataSignupInput {
  return {
    name: '',
    email: '',
    institution: '',
    field: '',
    location: '',
    mode: '' as ResilientDataSignupInput['mode'],
    piHome: '',
    piPlug: '',
    homeInternet: [],
    provider: '',
    providerOther: '',
    routerAccess: '',
    anchor: '',
    dataset: '' as ResilientDataSignupInput['dataset'],
    datasetWhat: '',
    datasetSize: '',
    laptop: '',
    terminal: '',
    tools: [],
    notes: '',
    website: '',
  }
}

export function ResilientDataSignupForm() {
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const form = useForm<ResilientDataSignupInput>({
    resolver: zodResolver(resilientDataSignupSchema),
    defaultValues: defaults(),
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form

  // Branching: Pi questions show unless the answer is laptop-only; dataset
  // questions show on a yes or a maybe.
  const mode = useWatch({ control, name: 'mode' })
  const dataset = useWatch({ control, name: 'dataset' })
  const provider = useWatch({ control, name: 'provider' })
  const showPi = mode === 'pi' || mode === 'either'
  const showDataset = dataset === 'yes' || dataset === 'maybe'

  const onSubmit = (data: ResilientDataSignupInput) => {
    setServerError(null)
    startTransition(async () => {
      const result = await submitResilientDataSignup(data)
      if (result.ok) {
        toast.success('Sign-up received — thank you.', {
          description: 'We’ll confirm your spot by email soon after September 10.',
        })
        setDone(true)
      } else {
        setServerError(result.error)
        if (result.fieldErrors) {
          for (const [field, msgs] of Object.entries(result.fieldErrors)) {
            if (msgs && msgs.length) {
              form.setError(field as keyof ResilientDataSignupInput, {
                message: msgs[0],
              })
            }
          }
        }
      }
    })
  }

  const e = errors as FieldErrors<ResilientDataSignupInput> &
    Record<string, { message?: string }>

  if (done) {
    return (
      <div className="border border-rule bg-paper-card px-6 py-10 text-center space-y-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-royal">
          [ Received ]
        </div>
        <h2 className="font-serif text-2xl text-ink">You’re signed up.</h2>
        <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
          Thank you! We’ll confirm your spot by email. If you asked for a
          Raspberry Pi and your plans change before October 1st, please tell us
          so we can get your Pi to someone else.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* Honeypot — hidden from humans, filled only by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      {/* --- You --- */}
      <Section title="You" subtitle="Who’s standing up a node.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Your name" htmlFor="name" error={e.name?.message} required>
            <Input id="name" autoComplete="name" {...register('name')} />
          </Field>
          <Field label="Email" htmlFor="email" error={e.email?.message} required>
            <Input id="email" type="email" autoComplete="email" {...register('email')} />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Institution"
            htmlFor="institution"
            error={e.institution?.message}
            hint="For example “Leiden University”."
          >
            <Input id="institution" autoComplete="organization" {...register('institution')} />
          </Field>
          <Field
            label="Field"
            htmlFor="field"
            error={e.field?.message}
            hint="For example “marine ecology”."
          >
            <Input id="field" {...register('field')} />
          </Field>
        </div>
        <RadioField
          control={control}
          name="location"
          label="Where do you live?"
          hint="Geographic distribution greatly increases resilience of a data network."
          options={LOCATIONS}
          columns={2}
          error={e.location?.message}
          required
        />
      </Section>

      {/* --- Your node --- */}
      <Section title="Your node" subtitle="Pi or laptop, and where it would live.">
        <RadioField
          control={control}
          name="mode"
          label="How do you want to take part?"
          options={MODES}
          columns={1}
          error={e.mode?.message}
          required
        />
        {showPi && (
          <>
            <RadioField
              control={control}
              name="piHome"
              label="Can your node live at your home?"
              hint="A take-home node needs a power socket, access to your home Wi-Fi or an ethernet cable, and a safe space to be left alone. It is silent, it draws about as much power as a phone charger, and after setup day you rarely touch it. It does have to be your home network; campus and office networks can often be bureaucratic epics we don’t recommend starting… at least not this year."
              options={PI_HOME}
              columns={1}
              error={e.piHome?.message}
              required
            />
            <RadioField
              control={control}
              name="piPlug"
              label="Which wall plug does your home use?"
              hint="The Pi kits come with power supplies; we will match the kit to the home it’s going to."
              options={PI_PLUGS}
              columns={2}
              error={e.piPlug?.message}
              required
            />
          </>
        )}
        <CheckboxGroupField
          control={control}
          name="homeInternet"
          label="Which of these describe your home internet?"
          hint="Choose all that apply. “Honestly, no idea” is a fine answer."
          options={HOME_INTERNET}
          error={e.homeInternet?.message}
          required
        />
      </Section>

      {/* --- Anchors --- */}
      <Section title="Anchors">
        <p className="text-sm text-ink-soft leading-relaxed -mt-2">
          Both networks need a set of volunteers whose nodes become anchors for
          the rest of the network. Volunteering means changing one setting (a
          port forward) on your home router, about 15 minutes, done with the
          facilitators, provider permitting; it costs nothing, needs no
          maintenance, and the role can rotate to someone else later.
        </p>
        <Field
          label="Who is your home internet provider?"
          htmlFor="provider"
          error={e.provider?.message}
          hint="Providers differ in how easy they make the anchor role, so the name alone tells us a lot."
          required
        >
          <Controller
            control={control}
            name="provider"
            render={({ field }) => (
              <select
                id="provider"
                value={field.value}
                onChange={(ev) => field.onChange(ev.target.value)}
                className="h-10 w-full border border-rule-strong bg-white px-3 text-sm text-ink shadow-[inset_0_1px_2px_rgba(20,22,29,0.05)] transition-colors focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/15"
              >
                <option value="" disabled>
                  Choose…
                </option>
                {PROVIDERS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            )}
          />
        </Field>
        {provider === 'Another provider' && (
          <Field
            label="Which provider?"
            htmlFor="providerOther"
            error={e.providerOther?.message}
          >
            <Input id="providerOther" {...register('providerOther')} />
          </Field>
        )}
        <RadioField
          control={control}
          name="routerAccess"
          label="Do you have access to your home router’s settings?"
          hint="“No idea” is a normal answer."
          options={ROUTER_ACCESS}
          columns={1}
          error={e.routerAccess?.message}
          required
        />
        <RadioField
          control={control}
          name="anchor"
          label="Would you volunteer as an anchor?"
          options={ANCHOR}
          columns={1}
          error={e.anchor?.message}
          required
        />
      </Section>

      {/* --- Data rescue --- */}
      <Section title="Data rescue">
        <RadioField
          control={control}
          name="dataset"
          label="Do you have an at-risk dataset from your field you’d like the consortium to archive?"
          hint="Anything public that could vanish qualifies, whether a shuttered project’s archive, a dataset on a retiring server, or data whose funding ended. This commits you to nothing; the data-rescue workshop preps datasets too, so there will be plenty to hold either way."
          options={DATASET}
          columns={1}
          error={e.dataset?.message}
          required
        />
        {showDataset && (
          <>
            <Field
              label="What is it?"
              htmlFor="datasetWhat"
              error={e.datasetWhat?.message}
              hint="A sentence is plenty."
              required={dataset === 'yes'}
            >
              <Input id="datasetWhat" {...register('datasetWhat')} />
            </Field>
            <RadioField
              control={control}
              name="datasetSize"
              label="Roughly how big?"
              hint="A guess is fine."
              options={DATASET_SIZES}
              columns={2}
              error={e.datasetSize?.message}
              required={dataset === 'yes'}
            />
          </>
        )}
      </Section>

      {/* --- The room --- */}
      <Section title="The room">
        <RadioField
          control={control}
          name="laptop"
          label="Which laptop will you bring?"
          hint="Everyone needs one, even the Pi network (used for setup and interfacing with the Pi). If you can’t bring one, tell us below and we’ll figure something out."
          options={LAPTOPS}
          columns={2}
          error={e.laptop?.message}
          required
        />
        <RadioField
          control={control}
          name="terminal"
          label="How comfortable are you in a terminal / command line / IDE?"
          hint="Every level is welcome; at this workshop an AI agent on your laptop does the typing. Your answer helps us pace the room."
          options={TERMINAL}
          columns={1}
          error={e.terminal?.message}
          required
        />
        <CheckboxGroupField
          control={control}
          name="tools"
          label="Which of these have you used?"
          hint="Choose all that apply. “None of these” is a fine answer — you’ll be fine."
          options={TOOLS}
        />
      </Section>

      {/* --- Anything else --- */}
      <Section title="Anything else?" subtitle="Questions, accessibility needs, anything we should know.">
        <Field label="Notes" htmlFor="notes" error={e.notes?.message}>
          <Textarea id="notes" rows={4} {...register('notes')} />
        </Field>
      </Section>

      {serverError && (
        <div className="text-sm text-destructive border border-destructive/40 bg-destructive/10 px-3 py-2">
          {serverError}
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center gap-3 pt-6 border-t border-rule">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-royal text-paper hover:bg-royal-deep font-mono text-[11px] uppercase tracking-[0.18em] gap-2 px-6 py-3 h-auto"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing up…
            </>
          ) : (
            <>
              Sign up
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

/* --- shared building blocks (mirrors the workshop form) --- */

// react-hook-form's control object is structurally complex; the other forms
// type it as `any` for these small helpers and we follow suit.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldsControl = any

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-1 pb-3 border-b border-rule">
        <h2 className="font-serif text-xl text-ink">{title}</h2>
        {subtitle && <p className="text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-royal"> *</span>}
      </Label>
      {hint && <p className="text-xs text-ink-soft leading-relaxed -mt-1">{hint}</p>}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

// Radio-style single choice rendered as selectable cards. Options are either
// plain strings or { value, label, description } for the richer choices.
function RadioField({
  control,
  name,
  label,
  options,
  columns = 1,
  error,
  hint,
  required,
}: {
  control: FieldsControl
  name: string
  label: string
  options: readonly string[] | readonly Option[]
  columns?: 1 | 2
  error?: string
  hint?: string
  required?: boolean
}) {
  const opts: Option[] = (options as ReadonlyArray<string | Option>).map((o) =>
    typeof o === 'string' ? { value: o, label: o } : o,
  )
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-2">
          <Label>
            {label}
            {required && <span className="text-royal"> *</span>}
          </Label>
          {hint && <p className="text-xs text-ink-soft leading-relaxed -mt-1">{hint}</p>}
          <div
            className={cn(
              'grid gap-2',
              columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1',
            )}
          >
            {opts.map((opt) => {
              const selected = field.value === opt.value
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => field.onChange(selected ? '' : opt.value)}
                  aria-pressed={selected}
                  className={cn(
                    'flex items-start gap-3 text-left px-4 py-3 border cursor-pointer transition-colors',
                    selected
                      ? 'border-royal bg-royal-soft'
                      : 'border-rule-strong bg-white hover:border-royal/50',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border-[1.5px] bg-white',
                      selected ? 'border-royal' : 'border-[rgba(20,22,29,0.5)]',
                    )}
                  >
                    {selected && <span className="h-2 w-2 rounded-full bg-royal" />}
                  </span>
                  <span className="min-w-0">
                    <span className={cn('block text-sm leading-snug', selected ? 'text-royal' : 'text-ink')}>
                      {opt.label}
                    </span>
                    {opt.description && (
                      <span className="mt-1 block text-xs text-ink-soft leading-relaxed">
                        {opt.description}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      )}
    />
  )
}

function CheckboxGroupField({
  control,
  name,
  label,
  options,
  error,
  hint,
  required,
}: {
  control: FieldsControl
  name: string
  label: string
  options: readonly string[]
  error?: string
  hint?: string
  required?: boolean
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value: string[] = Array.isArray(field.value) ? field.value : []
        const toggle = (opt: string) => {
          if (value.includes(opt)) {
            field.onChange(value.filter((v) => v !== opt))
          } else {
            field.onChange([...value, opt])
          }
        }
        return (
          <div className="space-y-2">
            <Label>
              {label}
              {required && <span className="text-royal"> *</span>}
            </Label>
            {hint && <p className="text-xs text-ink-soft leading-relaxed -mt-1">{hint}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {options.map((opt) => {
                const checked = value.includes(opt)
                return (
                  <label
                    key={opt}
                    className={cn(
                      'flex items-start gap-3 px-3 py-2 border cursor-pointer transition-colors',
                      checked
                        ? 'border-royal bg-royal-soft'
                        : 'border-rule-strong bg-white hover:border-royal/50',
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggle(opt)}
                      className="mt-0.5"
                    />
                    <span className="text-sm text-ink leading-snug">{opt}</span>
                  </label>
                )
              })}
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
        )
      }}
    />
  )
}
