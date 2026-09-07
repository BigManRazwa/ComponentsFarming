import { useState, useRef, type KeyboardEvent } from 'react'
import type { ThemeData, StyleVariation } from '../components/ui/ThemeCard'

interface UploadDesignProps {
  onSave: (theme: ThemeData) => void
  onBack: () => void
  existingSlugs: string[]
  categories: string[]
  onAddCategory: (name: string) => void
  onDeleteCategory: (name: string) => void
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-zinc-800/60 bg-zinc-900/30 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all'
const chipContainerClass = 'rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-3 focus-within:border-blue-500/40 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all'

export function UploadDesign({ onSave, onBack, existingSlugs, categories, onAddCategory, onDeleteCategory }: UploadDesignProps) {
  const [name, setName] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [description, setDescription] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [newCategoryInput, setNewCategoryInput] = useState('')
  const [featureInput, setFeatureInput] = useState('')
  const [features, setFeatures] = useState<string[]>([])
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [styleVariations, setStyleVariations] = useState<StyleVariation[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [slugError, setSlugError] = useState('')

  // New variation form state
  const [newVarName, setNewVarName] = useState('')
  const [newVarFont, setNewVarFont] = useState('serif')
  const [newVarBg, setNewVarBg] = useState('#ffffff')
  const [newVarText, setNewVarText] = useState('#000000')
  const [newVarAccent, setNewVarAccent] = useState('#3b82f6')
  const [showVarForm, setShowVarForm] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const resolvedSlug = customSlug.trim() ? generateSlug(customSlug) : generateSlug(name)

  function handleFile(file: File, callback: (dataUrl: string) => void) {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => callback(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file, (url) => setThumbnail(url))
  }

  function addVariation() {
    if (!newVarName.trim()) return
    setStyleVariations((prev) => [...prev, {
      name: newVarName.trim(),
      fontFamily: newVarFont,
      bgColor: newVarBg,
      textColor: newVarText,
      accentColor: newVarAccent,
    }])
    setNewVarName('')
    setNewVarFont('serif')
    setNewVarBg('#ffffff')
    setNewVarText('#000000')
    setNewVarAccent('#3b82f6')
    setShowVarForm(false)
  }

  function removeVariation(index: number) {
    setStyleVariations((prev) => prev.filter((_, i) => i !== index))
  }

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat); else next.add(cat)
      return next
    })
  }

  function handleCreateCategory() {
    const trimmed = newCategoryInput.trim()
    if (!trimmed) return
    onAddCategory(trimmed)
    setSelectedCategories((prev) => new Set(prev).add(trimmed))
    setNewCategoryInput('')
  }

  function addFeature(value: string) {
    const trimmed = value.trim()
    if (trimmed && !features.includes(trimmed)) setFeatures((prev) => [...prev, trimmed])
    setFeatureInput('')
  }
  function removeFeature(feature: string) { setFeatures((prev) => prev.filter((f) => f !== feature)) }
  function handleFeatureKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addFeature(featureInput) }
    if (e.key === 'Backspace' && featureInput === '' && features.length > 0) setFeatures((prev) => prev.slice(0, -1))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !thumbnail) return
    const finalSlug = resolvedSlug || generateSlug(name)
    if (existingSlugs.includes(finalSlug)) {
      setSlugError('This URL is already taken. Choose a different one.')
      return
    }

    const theme: ThemeData = {
      id: crypto.randomUUID(),
      name: name.trim(),
      slug: finalSlug,
      description: description.trim(),
      thumbnail,
      demoUrl: demoUrl.trim() || undefined,
      tags: selectedCategories.size > 0 ? [...selectedCategories] : undefined,
      features: features.length > 0 ? features : undefined,
      styleVariations: styleVariations.length > 0 ? styleVariations : undefined,
      reviews: [],
    }
    onSave(theme)
  }

  const isValid = name.trim() && thumbnail
  const fontSuggestions = ['serif', 'sans-serif', 'monospace', 'Georgia', 'Inter', 'Playfair Display', 'Roboto', 'Poppins', 'Lora', 'Montserrat']

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to themes
      </button>

      <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Upload Design</h1>
      <p className="text-zinc-500 text-[15px] mb-10">Add a new theme to your art and design collection.</p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Thumbnail <span className="text-red-400">*</span></label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${thumbnail ? 'border-zinc-700' : dragOver ? 'border-blue-500/60 bg-blue-500/5' : 'border-zinc-800/60 hover:border-zinc-700 bg-zinc-900/30'}`}
          >
            {thumbnail ? (
              <div className="relative aspect-[16/10] group">
                <img src={thumbnail} alt="Preview" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium px-4 py-2 rounded-lg bg-zinc-900/80 backdrop-blur-sm">Change image</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-14">
                <svg className="w-10 h-10 text-zinc-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-zinc-500">Drag & drop an image or <span className="text-blue-400">browse</span></p>
                <p className="text-[11px] text-zinc-700 mt-1">PNG, JPG, WebP</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file, (url) => setThumbnail(url)) }} />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Theme Name <span className="text-red-400">*</span></label>
          <input type="text" value={name} onChange={(e) => { setName(e.target.value); setSlugError('') }} placeholder="e.g. Nightfall Gallery" className={inputClass} />
        </div>

        {/* Custom URL */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Custom URL</label>
          <div className="flex items-center rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden focus-within:border-blue-500/40 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
            <span className="pl-4 pr-1 text-sm text-zinc-600 whitespace-nowrap select-none">/theme/</span>
            <input type="text" value={customSlug} onChange={(e) => { setCustomSlug(e.target.value); setSlugError('') }}
              placeholder={generateSlug(name) || 'auto-generated-from-name'}
              className="flex-1 px-2 py-2.5 bg-transparent text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none" />
          </div>
          {resolvedSlug && <p className="text-[11px] text-zinc-600 mt-1.5">URL: <span className="text-zinc-500">/theme/{resolvedSlug}</span></p>}
          {slugError && <p className="text-[11px] text-red-400 mt-1.5">{slugError}</p>}
        </div>

        {/* Demo URL */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Demo URL</label>
          <input type="url" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="https://your-demo-site.com" className={inputClass} />
          <p className="text-[11px] text-zinc-700 mt-1.5">Link to a live demo — this will be shown as an embedded preview</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the theme..." rows={4}
            className={inputClass + ' resize-none'} />
        </div>

        {/* Style Variations */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Style Variations</label>
          <p className="text-[11px] text-zinc-600 mb-3">Add font & color presets visitors can preview. Leave empty if no customization is needed.</p>

          {/* Existing variations */}
          {styleVariations.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {styleVariations.map((v, i) => (
                <div key={i} className="relative group">
                  <div
                    className="w-20 h-20 rounded-xl border border-zinc-700 flex flex-col items-center justify-center gap-1 shrink-0"
                    style={{ backgroundColor: v.bgColor }}
                  >
                    <span className="text-xl font-semibold leading-none" style={{ color: v.textColor, fontFamily: v.fontFamily }}>Aa</span>
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: v.textColor }} />
                      <div className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: v.accentColor }} />
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-600 text-center mt-1 max-w-[80px] truncate">{v.name}</p>
                  <button
                    type="button"
                    onClick={() => removeVariation(i)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add variation form */}
          {showVarForm ? (
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Variation Name *</label>
                <input type="text" value={newVarName} onChange={(e) => setNewVarName(e.target.value)} placeholder="e.g. Dark Mode" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Font Family</label>
                <input
                  type="text"
                  value={newVarFont}
                  onChange={(e) => setNewVarFont(e.target.value)}
                  placeholder="Type any font name, e.g. Inter"
                  className={inputClass}
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {fontSuggestions.map((font) => (
                    <button
                      key={font}
                      type="button"
                      onClick={() => setNewVarFont(font)}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                        newVarFont === font
                          ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                          : 'bg-zinc-800/40 text-zinc-500 border-zinc-800/40 hover:border-zinc-700 hover:text-zinc-300'
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Background</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={newVarBg} onChange={(e) => setNewVarBg(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-zinc-700 cursor-pointer bg-transparent" />
                    <input type="text" value={newVarBg} onChange={(e) => setNewVarBg(e.target.value)}
                      className="flex-1 px-2 py-1.5 rounded-lg border border-zinc-800/60 bg-zinc-900/50 text-xs text-zinc-400 font-mono focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Text</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={newVarText} onChange={(e) => setNewVarText(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-zinc-700 cursor-pointer bg-transparent" />
                    <input type="text" value={newVarText} onChange={(e) => setNewVarText(e.target.value)}
                      className="flex-1 px-2 py-1.5 rounded-lg border border-zinc-800/60 bg-zinc-900/50 text-xs text-zinc-400 font-mono focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Accent</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={newVarAccent} onChange={(e) => setNewVarAccent(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-zinc-700 cursor-pointer bg-transparent" />
                    <input type="text" value={newVarAccent} onChange={(e) => setNewVarAccent(e.target.value)}
                      className="flex-1 px-2 py-1.5 rounded-lg border border-zinc-800/60 bg-zinc-900/50 text-xs text-zinc-400 font-mono focus:outline-none" />
                  </div>
                </div>
              </div>

              {/* Live preview of this variation */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Preview</label>
                <div className="w-20 h-20 rounded-xl border border-zinc-700 flex flex-col items-center justify-center gap-1" style={{ backgroundColor: newVarBg }}>
                  <span className="text-xl font-semibold leading-none" style={{ color: newVarText, fontFamily: newVarFont }}>Aa</span>
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: newVarText }} />
                    <div className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: newVarAccent }} />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={addVariation} disabled={!newVarName.trim()}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${newVarName.trim() ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}>
                  Add Variation
                </button>
                <button type="button" onClick={() => setShowVarForm(false)} className="px-4 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setShowVarForm(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-zinc-800/60 text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-all w-full justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Style Variation
            </button>
          )}
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Features</label>
          <div className={chipContainerClass}>
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2.5">
                {features.map((feature) => (
                  <span key={feature} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {feature}
                    <button type="button" onClick={() => removeFeature(feature)} className="hover:text-blue-200 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
            <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={handleFeatureKeyDown} onBlur={() => { if (featureInput.trim()) addFeature(featureInput) }}
              placeholder={features.length === 0 ? 'e.g. Blog, E-commerce, Responsive — press Enter to add' : 'Add another feature...'}
              className="w-full bg-transparent text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none" />
          </div>
          <p className="text-[11px] text-zinc-700 mt-1.5">Press Enter or comma to add</p>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Categories</label>
          <p className="text-[11px] text-zinc-600 mb-3">Select existing categories or create new ones. These become filter tabs on the main page.</p>

          {/* Existing categories as toggleable chips */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`
                    group inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all
                    ${selectedCategories.has(cat)
                      ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                      : 'bg-zinc-800/40 text-zinc-500 border-zinc-800/40 hover:border-zinc-700 hover:text-zinc-300'
                    }
                  `}
                >
                  {selectedCategories.has(cat) && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {cat}
                  <span
                    onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat); setSelectedCategories((prev) => { const n = new Set(prev); n.delete(cat); return n }) }}
                    className="ml-0.5 opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all cursor-pointer"
                    title="Delete category"
                  >
                    ×
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Create new category */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleCreateCategory() } }}
              placeholder="Create new category..."
              className={inputClass}
            />
            <button
              type="button"
              onClick={handleCreateCategory}
              disabled={!newCategoryInput.trim() || categories.includes(newCategoryInput.trim())}
              className={`
                px-4 py-2.5 rounded-xl text-sm font-medium shrink-0 transition-all
                ${newCategoryInput.trim() && !categories.includes(newCategoryInput.trim())
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }
              `}
            >
              Add
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button type="submit" disabled={!isValid}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${isValid ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 active:scale-[0.98]' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}>
            Add Theme
          </button>
        </div>
      </form>
    </div>
  )
}
