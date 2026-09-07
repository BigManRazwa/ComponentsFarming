import { useState, useEffect } from 'react'
import { ArtAndDesign } from './pages/ArtAndDesign'
import { UploadDesign } from './pages/UploadDesign'
import { ThemeDetail } from './pages/ThemeDetail'
import type { ThemeData } from './components/ui/ThemeCard'

const THEMES_KEY = 'art-design-themes'
const CATEGORIES_KEY = 'art-design-categories'

type Page =
  | { view: 'gallery' }
  | { view: 'upload' }
  | { view: 'detail'; slug: string }

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [page, setPage] = useState<Page>({ view: 'gallery' })
  const [themes, setThemes] = useState<ThemeData[]>(() => load(THEMES_KEY, []))
  const [categories, setCategories] = useState<string[]>(() => load(CATEGORIES_KEY, []))

  useEffect(() => { localStorage.setItem(THEMES_KEY, JSON.stringify(themes)) }, [themes])
  useEffect(() => { localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories)) }, [categories])

  function handleAdd(theme: ThemeData) {
    // Auto-register any new categories from the theme's tags
    if (theme.tags) {
      setCategories((prev) => {
        const newCats = theme.tags!.filter((t) => !prev.includes(t))
        return newCats.length > 0 ? [...prev, ...newCats] : prev
      })
    }
    setThemes((prev) => [theme, ...prev])
    setPage({ view: 'gallery' })
  }

  function handleDelete(id: string) {
    setThemes((prev) => prev.filter((t) => t.id !== id))
    if (page.view === 'detail') setPage({ view: 'gallery' })
  }

  function handleUpdate(updated: ThemeData) {
    setThemes((prev) => prev.map((t) => t.id === updated.id ? updated : t))
  }

  function handleAddCategory(name: string) {
    if (!categories.includes(name)) {
      setCategories((prev) => [...prev, name])
    }
  }

  function handleDeleteCategory(name: string) {
    setCategories((prev) => prev.filter((c) => c !== name))
  }

  const currentTheme = page.view === 'detail'
    ? themes.find((t) => t.slug === page.slug)
    : null

  return (
    <main className="min-h-screen overflow-y-auto px-6 py-8 lg:px-12 lg:py-10">
      {page.view === 'gallery' && (
        <ArtAndDesign
          themes={themes}
          categories={categories}
          onDelete={handleDelete}
          onGoUpload={() => setPage({ view: 'upload' })}
          onViewTheme={(slug) => setPage({ view: 'detail', slug })}
        />
      )}
      {page.view === 'upload' && (
        <UploadDesign
          onSave={handleAdd}
          onBack={() => setPage({ view: 'gallery' })}
          existingSlugs={themes.map((t) => t.slug)}
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
      {page.view === 'detail' && currentTheme && (
        <ThemeDetail
          theme={currentTheme}
          onBack={() => setPage({ view: 'gallery' })}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
      {page.view === 'detail' && !currentTheme && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-zinc-500 text-sm mb-3">Theme not found.</p>
          <button
            onClick={() => setPage({ view: 'gallery' })}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to themes
          </button>
        </div>
      )}
    </main>
  )
}
