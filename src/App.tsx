import React, { useState, useEffect } from 'react'
import { ArtAndDesign } from './pages/ArtAndDesign'
import { UploadDesign } from './pages/UploadDesign'
import { ThemeDetail } from './pages/ThemeDetail'
import { MarketplaceFeed } from './pages/examples/MarketplaceFeed'
import { ProductDetailPage } from './pages/examples/ProductDetailPage'
import { ShoppingCartCheckout } from './pages/examples/ShoppingCartCheckout'
import { MobileMarketplace } from './pages/examples/MobileMarketplace'
import type { ThemeData } from './components/ui/ThemeCard'

const THEMES_KEY = 'art-design-themes'
const CATEGORIES_KEY = 'art-design-categories'
const SEEDED_KEY = 'art-design-seeded'

type Page =
  | { view: 'gallery' }
  | { view: 'upload' }
  | { view: 'edit'; themeId: string }
  | { view: 'detail'; slug: string }
  | { view: 'preview'; slug: string; variant?: string }

/* ─── Default / seed themes ─── */
const DEFAULT_THEMES: ThemeData[] = [
  {
    id: 'seed-marketplace-feed',
    name: 'Marketplace Feed',
    slug: 'marketplace-feed',
    description:
      'A comprehensive marketplace homepage template inspired by leading Southeast Asian e-commerce platforms. Features a multi-section layout with promotional banners, flash sale countdown, category navigation, product discovery feeds, and a full-featured footer — all designed for high-conversion desktop shopping experiences.',
    thumbnail: '/thumbnails/marketplace-feed.png',
    tags: ['E-Commerce', 'Desktop'],
    features: [
      'Flash Sale Countdown Timer',
      'Product Grid with Badges',
      'Category Icon Navigation',
      'Hero Banner Carousel',
      'Daily Discover Tabs',
      'Search with Category Filter',
      'Voucher & Coins Widgets',
      'Full E-Commerce Footer',
    ],
    demoUrl: '/?preview=marketplace-feed',
    styleVariations: [
      {
        name: 'Pulse Red',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#EE4D2D',
      },
      {
        name: 'Ocean Commerce',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#0D6EFD',
      },
      {
        name: 'Emerald Market',
        fontFamily: 'Poppins',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#059669',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-product-detail-page',
    name: 'Product Detail Page',
    slug: 'product-detail-page',
    description:
      'A full-featured product detail page template with image gallery, flash sale countdown, variant selectors, seller info card, specifications table, and feature highlights — designed for high-conversion e-commerce product pages.',
    thumbnail: '/thumbnails/product-detail-page.png',
    tags: ['E-Commerce', 'Desktop'],
    features: [
      'Image Gallery with Thumbnails',
      'Flash Sale Countdown Timer',
      'Color & Size Variant Selectors',
      'Quantity Stepper',
      'Seller Info Card with Stats',
      'Specifications Table',
      'Feature Highlight Cards',
      'Trust Badges & Vouchers',
    ],
    demoUrl: '/?preview=product-detail-page',
    styleVariations: [
      {
        name: 'Pulse Red',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#EE4D2D',
      },
      {
        name: 'Ocean Commerce',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#0D6EFD',
      },
      {
        name: 'Emerald Market',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#059669',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-shopping-cart-checkout',
    name: 'Shopping Cart & Checkout',
    slug: 'shopping-cart-checkout',
    description:
      'A full-featured shopping cart and checkout page with dynamic order summary, quantity steppers, voucher system, coin redemption, shipping progress tracker, and trust badges — optimized for a seamless desktop checkout experience.',
    thumbnail: '/thumbnails/shopping-cart-checkout.png',
    tags: ['E-Commerce', 'Desktop'],
    features: [
      'Dynamic Order Summary',
      'Quantity Steppers with Live Totals',
      'Free Shipping Progress Bar',
      'Platform Voucher & Coupon System',
      'Coin Redemption Toggle',
      'Multi-Store Cart Groups',
      'Select All / Individual Checkboxes',
      'Trust Badges & SSL Security',
    ],
    demoUrl: '/?preview=shopping-cart-checkout',
    styleVariations: [
      {
        name: 'Pulse Red',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#EE4D2D',
      },
      {
        name: 'Ocean Commerce',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#0D6EFD',
      },
      {
        name: 'Emerald Market',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#059669',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-marketplace',
    name: 'Mobile Marketplace',
    slug: 'mobile-marketplace',
    description:
      'A mobile-first marketplace homepage template featuring a payday sale banner, daily check-in, category grid, flash sale carousel, and a daily discover product feed with bottom navigation — optimized for mobile shopping experiences.',
    thumbnail: '/thumbnails/mobile-marketplace.png',
    tags: ['E-Commerce', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Payday Sale Banner with Countdown',
      'Daily Check-in Card',
      'Category Icons Grid',
      'Flash Sale Carousel',
      'Daily Discover Product Feed',
      'Bottom Navigation Bar',
      'Find Similar Products',
    ],
    demoUrl: '/?preview=mobile-marketplace',
    styleVariations: [
      {
        name: 'Pulse Red',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#EE4D2D',
      },
      {
        name: 'Ocean Commerce',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#0D6EFD',
      },
      {
        name: 'Emerald Market',
        fontFamily: 'Roboto',
        bgColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#059669',
      },
    ],
    reviews: [],
  },
]

const DEFAULT_CATEGORIES = ['E-Commerce', 'Desktop', 'Mobile']

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function loadWithSeeds(): { themes: ThemeData[]; categories: string[] } {
  const seedVersion = localStorage.getItem(SEEDED_KEY) || '0'
  const savedThemes = load<ThemeData[]>(THEMES_KEY, [])
  const savedCategories = load<string[]>(CATEGORIES_KEY, [])

  // Always ensure default categories exist (even for already-seeded users)
  const catSet = new Set([...DEFAULT_CATEGORIES, ...savedCategories])
  const mergedCategories = [...catSet]

  if (seedVersion === '6') {
    return { themes: savedThemes, categories: mergedCategories }
  }

  // Remove old versions of default themes so they get replaced with updated data
  const cleanedThemes = savedThemes.filter((t) => !DEFAULT_THEMES.some((d) => d.id === t.id))
  const mergedThemes = [...DEFAULT_THEMES, ...cleanedThemes]

  localStorage.setItem(SEEDED_KEY, '6')
  return { themes: mergedThemes, categories: mergedCategories }
}

const _seedResult = loadWithSeeds()

/* ─── Preview registry: maps slug → React component ─── */
const PREVIEW_COMPONENTS: Record<string, React.ComponentType<{ variant?: 'pulse' | 'ocean' | 'emerald' }>> = {
  'marketplace-feed': MarketplaceFeed,
  'product-detail-page': ProductDetailPage,
  'shopping-cart-checkout': ShoppingCartCheckout,
  'mobile-marketplace': MobileMarketplace,
}

function getInitialPage(): Page {
  const params = new URLSearchParams(window.location.search)
  const preview = params.get('preview')
  if (preview && PREVIEW_COMPONENTS[preview]) {
    return { view: 'preview', slug: preview }
  }
  return { view: 'gallery' }
}

export default function App() {
  const [page, setPage] = useState<Page>(getInitialPage)
  const [themes, setThemes] = useState<ThemeData[]>(() => _seedResult.themes)
  const [categories, setCategories] = useState<string[]>(() => _seedResult.categories)
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null)

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

  function handleDeleteRequest(id: string) {
    const theme = themes.find((t) => t.id === id)
    setDeleteConfirm({ id, name: theme?.name || 'this theme' })
  }

  function handleDeleteConfirm() {
    if (!deleteConfirm) return
    setThemes((prev) => prev.filter((t) => t.id !== deleteConfirm.id))
    if (page.view === 'detail') setPage({ view: 'gallery' })
    setDeleteConfirm(null)
  }

  function handleUpdate(updated: ThemeData) {
    setThemes((prev) => prev.map((t) => t.id === updated.id ? updated : t))
  }

  function handleEditRequest(id: string) {
    setPage({ view: 'edit', themeId: id })
  }

  function handleEditSave(theme: ThemeData) {
    // Auto-register any new categories from the theme's tags
    if (theme.tags) {
      setCategories((prev) => {
        const newCats = theme.tags!.filter((t) => !prev.includes(t))
        return newCats.length > 0 ? [...prev, ...newCats] : prev
      })
    }
    setThemes((prev) => prev.map((t) => t.id === theme.id ? theme : t))
    setPage({ view: 'gallery' })
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

  // ─── Preview mode: render template full-screen with no gallery chrome ───
  if (page.view === 'preview') {
    const PreviewComponent = PREVIEW_COMPONENTS[page.slug]
    if (PreviewComponent) {
      return <PreviewComponent variant={page.variant as any} />
    }
  }

  return (
    <main className="min-h-screen overflow-y-auto px-6 py-8 lg:px-12 lg:py-10">
      {page.view === 'gallery' && (
        <ArtAndDesign
          themes={themes}
          categories={categories}
          onDelete={handleDeleteRequest}
          onEdit={handleEditRequest}
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
      {page.view === 'edit' && (() => {
        const editTheme = themes.find((t) => t.id === page.themeId)
        return editTheme ? (
          <UploadDesign
            key={editTheme.id}
            editTheme={editTheme}
            onSave={handleEditSave}
            onBack={() => setPage({ view: 'gallery' })}
            existingSlugs={themes.map((t) => t.slug)}
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        ) : null
      })()}
      {page.view === 'detail' && currentTheme && (
        <ThemeDetail
          theme={currentTheme}
          onBack={() => setPage({ view: 'gallery' })}
          onDelete={handleDeleteRequest}
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

      {/* ─── Delete Confirmation Modal ─── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Delete theme?</h3>
                <p className="text-zinc-500 text-xs mt-0.5">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">"{deleteConfirm.name}"</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-700/60 text-sm text-zinc-300 font-medium hover:bg-zinc-800/60 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-sm text-white font-medium hover:bg-red-600 transition-all cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
