'use client'

import { useState, useTransition } from 'react'
import { useForm, useFieldArray, useWatch, Controller, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ArrowRight, Loader2, Upload, X, ImageIcon, Plus } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import {
  workshopSchema,
  type WorkshopInput,
  TRACKS,
  LENGTHS,
  SIZES,
  TARGET_AUDIENCES,
  AUDIENCE_REQUIREMENTS,
  AV_NEEDS,
} from '@/lib/iosp-2026-workshop-schema'
import { submitWorkshop } from '@/app/actions/iosp-2026-workshop'

const HEADSHOT_BUCKET = 'workshop-headshots'

function defaults(): WorkshopInput {
  return {
    presenterName: '',
    email: '',
    affiliation: '',
    bio: '',
    headshotUrl: '',
    coPresenters: [],
    title: '',
    track: '',
    publicDescription: '',
    outcome: '',
    targetAudience: [],
    audienceRequirement: '',
    audienceRequirementDetail: '',
    length: '1.5h',
    size: '',
    needsTechFacilitation: false,
    avNeeds: [],
    avNeedsOther: '',
    materialsNeeded: '',
    runOfShow: '',
  }
}

export function WorkshopForm() {
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const form = useForm<WorkshopInput>({
    resolver: zodResolver(workshopSchema),
    defaultValues: defaults(),
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = form

  // Conditional fields react to these selections.
  const audienceReq = useWatch({ control, name: 'audienceRequirement' })
  const avSelected = useWatch({ control, name: 'avNeeds' })

  const onSubmit = (data: WorkshopInput) => {
    setServerError(null)
    startTransition(async () => {
      const result = await submitWorkshop(data)
      if (result.ok) {
        toast.success('Workshop submitted — thank you.', {
          description: 'We’ll be in touch from contact@scios.tech as we shape the schedule.',
        })
        reset(defaults())
        setDone(true)
      } else {
        setServerError(result.error)
        if (result.fieldErrors) {
          for (const [field, msgs] of Object.entries(result.fieldErrors)) {
            if (msgs && msgs.length) {
              form.setError(field as keyof WorkshopInput, { message: msgs[0] })
            }
          }
        }
      }
    })
  }

  const e = errors as FieldErrors<WorkshopInput> & Record<string, { message?: string }>

  if (done) {
    return (
      <div className="border border-rule bg-paper-card px-6 py-10 text-center space-y-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-royal">
          [ Received ]
        </div>
        <h2 className="font-serif text-2xl text-ink">Your workshop is in.</h2>
        <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
          Thanks for proposing a session for IOSP 2026. We read every submission as we build the
          schedule and will reach out from <span className="text-ink">contact@scios.tech</span>.
        </p>
        <Button
          type="button"
          onClick={() => setDone(false)}
          className="bg-royal text-paper hover:bg-royal-deep font-mono text-[11px] uppercase tracking-[0.18em] gap-2 px-5 py-3 h-auto"
        >
          Submit another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* --- You --- */}
      <Section title="You" subtitle="Who’s running this session.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Your name" htmlFor="presenterName" error={e.presenterName?.message} required>
            <Input id="presenterName" autoComplete="name" {...register('presenterName')} />
          </Field>
          <Field label="Email" htmlFor="email" error={e.email?.message} required>
            <Input id="email" type="email" autoComplete="email" {...register('email')} />
          </Field>
        </div>
        <Field label="Affiliation" htmlFor="affiliation" error={e.affiliation?.message}>
          <Input id="affiliation" autoComplete="organization" {...register('affiliation')} />
        </Field>
        <Field
          label="Short bio"
          htmlFor="bio"
          error={e.bio?.message}
          hint="A sentence or two we can publish next to your session."
          publicField
        >
          <Textarea id="bio" rows={3} {...register('bio')} />
        </Field>
        <HeadshotField control={control} />
        <CoPresentersField control={control} register={register} />
      </Section>

      {/* --- Your session --- */}
      <Section title="Your session" subtitle="What you’ll run, and who it’s for.">
        <Field label="Session title" htmlFor="title" error={e.title?.message} required publicField>
          <Input id="title" {...register('title')} />
        </Field>
        <SelectField
          control={control}
          name="track"
          label="Track"
          options={TRACKS}
          error={e.track?.message}
          required
        />
        <Field
          label="Public description"
          htmlFor="publicDescription"
          error={e.publicDescription?.message}
          hint="What participants will read when choosing sessions."
          required
          publicField
        >
          <Textarea
            id="publicDescription"
            rows={4}
            placeholder="What is this session, and what will happen in the room?"
            {...register('publicDescription')}
          />
        </Field>
        <Field
          label="What participants leave with"
          htmlFor="outcome"
          error={e.outcome?.message}
          hint="The concrete output or takeaway."
          required
          publicField
        >
          <Textarea
            id="outcome"
            rows={3}
            placeholder="A working setup, a shared document, a decision, a skill…"
            {...register('outcome')}
          />
        </Field>
        <CheckboxGroupField
          control={control}
          name="targetAudience"
          label="Target audience"
          options={TARGET_AUDIENCES}
          error={e.targetAudience?.message}
          required
        />
        <SelectField
          control={control}
          name="audienceRequirement"
          label="Audience requirements"
          options={AUDIENCE_REQUIREMENTS}
          hint="How much prior knowledge someone needs to take part."
          columns={2}
        />
        {audienceReq === 'Technical' && (
          <Field
            label="Technical in what?"
            htmlFor="audienceRequirementDetail"
            error={e.audienceRequirementDetail?.message}
            hint="What should participants already be comfortable with?"
          >
            <Input
              id="audienceRequirementDetail"
              placeholder="e.g., Python, Git, and the command line"
              {...register('audienceRequirementDetail')}
            />
          </Field>
        )}
      </Section>

      {/* --- Logistics --- */}
      <Section title="Logistics" subtitle="What you need to make it run.">
        <SelectField
          control={control}
          name="length"
          label="Session length"
          options={LENGTHS}
          error={e.length?.message}
          required
          hint="If you select a 3-hour workshop, plan for 1.5 hours — if the schedule allows we’ll offer you the 3-hour slot, but be ready to run the 1.5-hour version either way."
        />
        <SelectField
          control={control}
          name="size"
          label="Target group size"
          options={SIZES}
          columns={3}
        />
        <Controller
          control={control}
          name="needsTechFacilitation"
          render={({ field }) => (
            <div className="space-y-2">
              <Label>Technical facilitation support</Label>
              <label className="flex items-start gap-3 px-4 py-3 border border-rule bg-paper cursor-pointer hover:border-rule-strong transition-colors">
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={(v) => field.onChange(!!v)}
                  className="mt-0.5"
                />
                <span className="text-sm text-ink leading-relaxed">
                  I’ll need technical facilitation support.
                  <span className="block mt-1 text-xs text-ink-soft leading-relaxed">
                    Someone who knows the thing you’re doing and can help participants as they follow
                    along.
                  </span>
                </span>
              </label>
            </div>
          )}
        />
        <CheckboxGroupField
          control={control}
          name="avNeeds"
          label="A/V needs"
          options={AV_NEEDS}
        />
        {Array.isArray(avSelected) && avSelected.includes('Other') && (
          <Field label="Other A/V needs" htmlFor="avNeedsOther" error={e.avNeedsOther?.message}>
            <Input
              id="avNeedsOther"
              placeholder="Tell us what else you need"
              {...register('avNeedsOther')}
            />
          </Field>
        )}
        <Field
          label="Materials needed"
          htmlFor="materialsNeeded"
          error={e.materialsNeeded?.message}
          hint="Anything participants or the room need — laptops, accounts, installs, printed handouts."
        >
          <Textarea id="materialsNeeded" rows={3} {...register('materialsNeeded')} />
        </Field>
        <Field
          label="Run of show"
          htmlFor="runOfShow"
          error={e.runOfShow?.message}
          hint="A rough minute-by-minute plan. Organizers only — never shown publicly."
          privateField
        >
          <Textarea
            id="runOfShow"
            rows={5}
            placeholder="0:00 intro · 0:10 hands-on · 0:40 share-back · …"
            {...register('runOfShow')}
          />
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
              Submitting…
            </>
          ) : (
            <>
              Submit workshop
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

/* --- headshot: upload to storage, or paste a URL --- */

function HeadshotField({ control }: { control: FieldsControl }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  return (
    <Controller
      control={control}
      name="headshotUrl"
      render={({ field }) => {
        const onFile = async (file: File | undefined) => {
          if (!file) return
          setUploadError(null)
          setUploading(true)
          try {
            const supabase = getSupabaseBrowserClient()
            const ext = file.name.includes('.') ? file.name.split('.').pop() : 'jpg'
            const path = `${crypto.randomUUID()}.${ext}`
            const { error } = await supabase.storage
              .from(HEADSHOT_BUCKET)
              .upload(path, file, { cacheControl: '3600', upsert: false })
            if (error) throw error
            const { data } = supabase.storage.from(HEADSHOT_BUCKET).getPublicUrl(path)
            field.onChange(data.publicUrl)
          } catch (err) {
            console.error('headshot upload failed:', err)
            setUploadError('Upload failed. You can paste an image link instead.')
          } finally {
            setUploading(false)
          }
        }

        const hasImage = !!field.value

        return (
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <Label>Headshot</Label>
              <PublicTag />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <label
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 border border-rule bg-paper cursor-pointer',
                  'font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft',
                  'hover:border-rule-strong transition-colors',
                  uploading && 'opacity-60 pointer-events-none',
                )}
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {uploading ? 'Uploading…' : 'Upload image'}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={(ev) => onFile(ev.target.files?.[0])}
                />
              </label>

              {hasImage && (
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={field.value}
                    alt="Headshot preview"
                    className="h-12 w-12 object-cover border border-rule"
                  />
                  <button
                    type="button"
                    onClick={() => field.onChange('')}
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute hover:text-destructive transition-colors"
                  >
                    <X className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-ink-mute">
              <ImageIcon className="h-3.5 w-3.5" />
              <span className="text-xs">or paste a link</span>
            </div>
            <Input
              placeholder="https://…"
              value={field.value ?? ''}
              onChange={(ev) => field.onChange(ev.target.value)}
            />

            {uploadError && <p className="text-xs text-destructive">{uploadError}</p>}
            <p className="text-xs text-ink-mute">Square image, 800px+ preferred. Max 5 MB.</p>
          </div>
        )
      }}
    />
  )
}

/* --- co-presenters: optional, repeatable rows for joint submissions --- */

function CoPresentersField({
  control,
  register,
}: {
  control: FieldsControl
  register: FieldsControl
}) {
  const { fields, append, remove } = useFieldArray({ control, name: 'coPresenters' })
  return (
    <div className="space-y-3">
      <Label>Co-presenters / co-leads</Label>
      <p className="text-xs text-ink-soft leading-relaxed -mt-1">
        Running this jointly? Add anyone leading it with you.
      </p>
      {fields.length > 0 && (
        <div className="space-y-2">
          {fields.map((f: { id: string }, i: number) => (
            <div key={f.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2">
              <Input placeholder="Name" {...register(`coPresenters.${i}.name`)} />
              <Input placeholder="Email" type="email" {...register(`coPresenters.${i}.email`)} />
              <Input placeholder="Affiliation" {...register(`coPresenters.${i}.affiliation`)} />
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="Remove co-presenter"
                className="inline-flex items-center justify-center h-10 px-3 border border-rule text-ink-mute hover:text-destructive hover:border-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => append({ name: '', email: '', affiliation: '' })}
        className="inline-flex items-center gap-2 px-4 py-2 border border-rule bg-paper font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:border-rule-strong transition-colors"
      >
        <Plus className="h-4 w-4" /> Add co-presenter
      </button>
    </div>
  )
}

/* --- shared building blocks (mirrors the signup modal) --- */

// react-hook-form's control object is structurally complex; the signup modal
// types it as `any` for these small helpers and we follow suit.
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

function PublicTag() {
  return (
    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-royal border border-royal/40 px-1.5 py-0.5">
      Public
    </span>
  )
}

function PrivateTag() {
  return (
    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-mute border border-rule px-1.5 py-0.5">
      Private
    </span>
  )
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  publicField,
  privateField,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  publicField?: boolean
  privateField?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-2">
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="text-royal"> *</span>}
        </Label>
        {publicField && <PublicTag />}
        {privateField && <PrivateTag />}
      </div>
      {hint && <p className="text-xs text-ink-soft leading-relaxed -mt-1">{hint}</p>}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

function SelectField({
  control,
  name,
  label,
  options,
  columns = 2,
  error,
  hint,
  required,
}: {
  control: FieldsControl
  name: string
  label: string
  // Either plain strings or { value, label } pairs.
  options: readonly string[] | ReadonlyArray<{ value: string; label: string }>
  columns?: 2 | 3
  error?: string
  hint?: string
  required?: boolean
}) {
  const opts = (options as ReadonlyArray<string | { value: string; label: string }>).map((o) =>
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
              columns === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2',
            )}
          >
            {opts.map((opt) => {
              const selected = field.value === opt.value
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => field.onChange(selected ? '' : opt.value)}
                  className={cn(
                    'text-left text-xs font-mono uppercase tracking-wider px-3 py-2 border transition-colors',
                    selected
                      ? 'border-royal bg-royal-soft text-royal'
                      : 'border-rule bg-paper text-ink-soft hover:border-rule-strong',
                  )}
                >
                  {opt.label}
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
  required,
}: {
  control: FieldsControl
  name: string
  label: string
  options: readonly string[]
  error?: string
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
                        : 'border-rule bg-paper hover:border-rule-strong',
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
