'use client'

import { useEffect, useState, useTransition } from 'react'
import { useForm, Controller, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ArrowRight, Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { signupSchema, type SignupInput } from '@/lib/iosp-2026-signup-schema'
import { submitIospSignup } from '@/app/actions/iosp-2026-signup'

export type SignupKind = 'showcase' | 'committee' | 'sponsor' | 'participant' | null

const THEMES = [
  'Modular Research Components',
  'Funding Open Science & Open Source',
  'Resilient Data & PID Infrastructure',
  'Assessment, Evaluation & Insights',
]

const INTEREST_AREAS = ['Programming', 'Logistics', 'Outreach', 'Sponsorship', 'Other']

const SPONSORSHIP_RANGES = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Let’s talk',
]

const COPY = {
  showcase: {
    eyebrow: 'Showcase',
    title: 'Submit a tool to the showcase',
    description:
      'Tell us about the tooling or infrastructure you’d like to bring to Leiden. We’ll follow up to scope what stress-testing and building together looks like.',
    submit: 'Submit to the showcase',
  },
  committee: {
    eyebrow: 'Committee',
    title: 'Help organize IOSP 2026',
    description:
      'Tell us where you’d like to plug in. The first open organizing call is May 4 — we’ll add you to the invite.',
    submit: 'Get in touch',
  },
  sponsor: {
    eyebrow: 'Sponsor',
    title: 'Sponsor IOSP 2026',
    description:
      'Sponsorship goes solely to travel grants so researchers and technologists can join us in Leiden. Tell us a bit about your organization and we’ll reply with options.',
    submit: 'Send sponsorship inquiry',
  },
  participant: {
    eyebrow: 'Participate',
    title: 'Register your interest',
    description:
      'Capacity is limited — last year 425 people registered for 80 seats, so registering doesn’t guarantee a spot. IOSP is free to join, and every sponsorship dollar goes to travel grants so as many participants as possible can join us. Tell us a bit about yourself and we’ll be in touch.',
    submit: 'Register interest',
  },
} as const

type Props = {
  kind: SignupKind
  onClose: () => void
}

export function IospSignupModal({ kind, onClose }: Props) {
  const open = kind !== null
  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? onClose() : undefined)}>
      <DialogContent>
        {kind && <SignupForm kind={kind} onSuccess={onClose} />}
      </DialogContent>
    </Dialog>
  )
}

function SignupForm({
  kind,
  onSuccess,
}: {
  kind: Exclude<SignupKind, null>
  onSuccess: () => void
}) {
  const copy = COPY[kind]
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultsFor(kind),
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = form

  // Reset when the modal opens with a new kind.
  useEffect(() => {
    reset(defaultsFor(kind))
    setServerError(null)
  }, [kind, reset])

  const onSubmit = (data: SignupInput) => {
    setServerError(null)
    startTransition(async () => {
      const result = await submitIospSignup(data)
      if (result.ok) {
        toast.success('Submission received — we’ll be in touch.', {
          description: 'Watch your inbox for a reply from contact@scios.tech.',
        })
        onSuccess()
      } else {
        setServerError(result.error)
        if (result.fieldErrors) {
          for (const [field, msgs] of Object.entries(result.fieldErrors)) {
            if (msgs && msgs.length) {
              form.setError(field as keyof SignupInput, { message: msgs[0] })
            }
          }
        }
      }
    })
  }

  const fieldErrors = errors as FieldErrors<SignupInput> & Record<string, { message?: string }>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <DialogHeader>
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber">
          [ {copy.eyebrow} ]
        </div>
        <DialogTitle>{copy.title}</DialogTitle>
        <DialogDescription>{copy.description}</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your name" htmlFor="name" error={fieldErrors.name?.message}>
          <Input id="name" autoComplete="name" {...register('name')} />
        </Field>
        <Field label="Email" htmlFor="email" error={fieldErrors.email?.message}>
          <Input id="email" type="email" autoComplete="email" {...register('email')} />
        </Field>
      </div>

      {kind === 'showcase' && <ShowcaseFields control={control} register={register} errors={fieldErrors} />}
      {kind === 'committee' && <CommitteeFields control={control} register={register} errors={fieldErrors} />}
      {kind === 'sponsor' && <SponsorFields control={control} register={register} errors={fieldErrors} />}
      {kind === 'participant' && <ParticipantFields control={control} register={register} errors={fieldErrors} />}

      {serverError && (
        <div className="text-sm text-iosp-coral border border-iosp-coral/40 bg-iosp-coral/10 rounded-md px-3 py-2">
          {serverError}
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center gap-3 pt-2 border-t border-white/10">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-iosp-amber text-iosp-blue hover:bg-iosp-amber/90 font-semibold gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              {copy.submit}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

function defaultsFor(kind: Exclude<SignupKind, null>): SignupInput {
  if (kind === 'showcase') {
    return {
      kind: 'showcase',
      name: '',
      email: '',
      organization: '',
      projectName: '',
      projectUrl: '',
      themes: [],
      pitch: '',
    }
  }
  if (kind === 'committee') {
    return {
      kind: 'committee',
      name: '',
      email: '',
      affiliation: '',
      interestAreas: [],
      themes: [],
      bandwidth: '',
    }
  }
  if (kind === 'sponsor') {
    return {
      kind: 'sponsor',
      name: '',
      email: '',
      organization: '',
      role: '',
      range: '',
      themes: [],
      message: '',
    }
  }
  return {
    kind: 'participant',
    name: '',
    email: '',
    affiliation: '',
    themes: [],
    needsTravelSupport: false,
    notes: '',
  }
}

/* --- per-kind field groups --- */

type FieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any
}

function ShowcaseFields({ control, register, errors }: FieldsProps) {
  return (
    <>
      <Field label="Organization (optional)" htmlFor="organization" error={errors.organization?.message}>
        <Input id="organization" autoComplete="organization" {...register('organization')} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Project name" htmlFor="projectName" error={errors.projectName?.message}>
          <Input id="projectName" {...register('projectName')} />
        </Field>
        <Field label="Project URL or repo" htmlFor="projectUrl" error={errors.projectUrl?.message}>
          <Input id="projectUrl" placeholder="https://" {...register('projectUrl')} />
        </Field>
      </div>
      <CheckboxGroupField
        control={control}
        name="themes"
        label="Which themes does it touch?"
        options={THEMES}
        error={errors.themes?.message}
      />
      <Field label="Short pitch" htmlFor="pitch" error={errors.pitch?.message}>
        <Textarea
          id="pitch"
          rows={4}
          placeholder="What is it, what stage is it at, and what would be useful to do together in Leiden?"
          {...register('pitch')}
        />
      </Field>
    </>
  )
}

function CommitteeFields({ control, register, errors }: FieldsProps) {
  return (
    <>
      <Field label="Affiliation (optional)" htmlFor="affiliation" error={errors.affiliation?.message}>
        <Input id="affiliation" autoComplete="organization" {...register('affiliation')} />
      </Field>
      <CheckboxGroupField
        control={control}
        name="interestAreas"
        label="Where would you like to plug in?"
        options={INTEREST_AREAS}
        error={errors.interestAreas?.message}
      />
      <CheckboxGroupField
        control={control}
        name="themes"
        label="Which themes interest you most? (optional)"
        options={THEMES}
      />
      <Field label="Bandwidth & notes (optional)" htmlFor="bandwidth" error={errors.bandwidth?.message}>
        <Textarea
          id="bandwidth"
          rows={3}
          placeholder="Roughly how much time you have, things you’d love to work on, anything else we should know."
          {...register('bandwidth')}
        />
      </Field>
    </>
  )
}

function ParticipantFields({ control, register, errors }: FieldsProps) {
  return (
    <>
      <Field label="Affiliation (optional)" htmlFor="affiliation" error={errors.affiliation?.message}>
        <Input id="affiliation" autoComplete="organization" {...register('affiliation')} />
      </Field>
      <CheckboxGroupField
        control={control}
        name="themes"
        label="Which themes are you most interested in? (optional)"
        options={THEMES}
      />

      {/* Travel-support priority — top-level boolean column, used to prioritize grants. */}
      <div className="space-y-2">
        <Label>Travel &amp; financial support</Label>
        <Controller
          control={control}
          name="needsTravelSupport"
          render={({ field }) => (
            <label className="flex items-start gap-3 px-4 py-3 rounded-md border border-white/15 bg-white/5 cursor-pointer hover:border-white/30 transition-colors">
              <Checkbox
                checked={!!field.value}
                onCheckedChange={(v) => field.onChange(!!v)}
                className="mt-0.5"
              />
              <span className="text-sm text-white/90 leading-relaxed">
                My participation depends on financial support.
                <span className="block mt-1 text-xs text-white/60 leading-relaxed">
                  In an ideal world, sponsorship will cover travel and accommodation for all 100 participants. If we can&apos;t reach that, this helps us prioritize who needs it most.
                </span>
              </span>
            </label>
          )}
        />
      </div>

      <Field label="Anything else? (optional)" htmlFor="notes" error={errors.notes?.message}>
        <Textarea
          id="notes"
          rows={3}
          placeholder="Accessibility needs, what you’re hoping to get out of IOSP, etc."
          {...register('notes')}
        />
      </Field>
    </>
  )
}

function SponsorFields({ control, register, errors }: FieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Organization" htmlFor="organization" error={errors.organization?.message}>
          <Input id="organization" autoComplete="organization" {...register('organization')} />
        </Field>
        <Field label="Your role" htmlFor="role" error={errors.role?.message}>
          <Input id="role" {...register('role')} />
        </Field>
      </div>
      <Controller
        control={control}
        name="range"
        render={({ field }) => (
          <Field label="Sponsorship range" htmlFor="range" error={errors.range?.message}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SPONSORSHIP_RANGES.map((r) => {
                const selected = field.value === r
                return (
                  <button
                    type="button"
                    key={r}
                    onClick={() => field.onChange(r)}
                    className={cn(
                      'text-left text-xs font-mono uppercase tracking-wider px-3 py-2 rounded-md border transition-colors',
                      selected
                        ? 'border-iosp-amber bg-iosp-amber/15 text-iosp-amber'
                        : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30',
                    )}
                  >
                    {r}
                  </button>
                )
              })}
            </div>
          </Field>
        )}
      />
      <CheckboxGroupField
        control={control}
        name="themes"
        label="Which themes interest you most?"
        options={THEMES}
        error={errors.themes?.message}
      />
      <Field label="Message" htmlFor="message" error={errors.message?.message}>
        <Textarea
          id="message"
          rows={3}
          placeholder="Anything you want us to know — interests, constraints, timeline."
          {...register('message')}
        />
      </Field>
    </>
  )
}

/* --- shared building blocks --- */

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-xs text-iosp-coral">{error}</p>}
    </div>
  )
}

function CheckboxGroupField({
  control,
  name,
  label,
  options,
  error,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  name: string
  label: string
  options: readonly string[]
  error?: string
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
            <Label>{label}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {options.map((opt) => {
                const checked = value.includes(opt)
                return (
                  <label
                    key={opt}
                    className={cn(
                      'flex items-start gap-3 px-3 py-2 rounded-md border cursor-pointer transition-colors',
                      checked
                        ? 'border-iosp-amber/60 bg-iosp-amber/10'
                        : 'border-white/15 bg-white/5 hover:border-white/30',
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggle(opt)}
                      className="mt-0.5"
                    />
                    <span className="text-sm text-white/90 leading-snug">{opt}</span>
                  </label>
                )
              })}
            </div>
            {error && <p className="text-xs text-iosp-coral">{error}</p>}
          </div>
        )
      }}
    />
  )
}
