import React, { useState, useEffect } from 'react'
import { ArtAndDesign } from './pages/ArtAndDesign'
import { UploadDesign } from './pages/UploadDesign'
import { ThemeDetail } from './pages/ThemeDetail'
import { DesktopPortfolio } from './pages/examples/DesktopPortfolio'
import { MobileFashionBeauty } from './pages/examples/MobileFashionBeauty'
import { SaasDashboard } from './pages/examples/SaasDashboard'
import { RestaurantLanding } from './pages/examples/RestaurantLanding'
import { MobileFitnessTracker } from './pages/examples/MobileFitnessTracker'
import { TravelBooking } from './pages/examples/TravelBooking'
import { MobileSocialFeed } from './pages/examples/MobileSocialFeed'
import { MobileMusicPlayer } from './pages/examples/MobileMusicPlayer'
import { LearningPlatform } from './pages/examples/LearningPlatform'
import { RealEstateListing } from './pages/examples/RealEstateListing'
import { MobileBanking } from './pages/examples/MobileBanking'
import { BlogMagazine } from './pages/examples/BlogMagazine'
import { MobileWeatherApp } from './pages/examples/MobileWeatherApp'
import { FashionBoutique } from './pages/examples/FashionBoutique'
import { MobileGroceryDelivery } from './pages/examples/MobileGroceryDelivery'
import { ElectronicsStore } from './pages/examples/ElectronicsStore'
import { MobileSneakerStore } from './pages/examples/MobileSneakerStore'
import { FurnitureStore } from './pages/examples/FurnitureStore'
import { MobileBeautyStore } from './pages/examples/MobileBeautyStore'
import { KanbanBoard } from './pages/examples/KanbanBoard'
import { MobileRecipeApp } from './pages/examples/MobileRecipeApp'
import type { ThemeData } from './components/ui/ThemeCard'

const THEMES_KEY = 'art-design-themes'
const CATEGORIES_KEY = 'art-design-categories'
const SEEDED_KEY = 'art-design-seeded'
const DELETED_KEY = 'art-design-deleted'

type Page =
  | { view: 'gallery' }
  | { view: 'upload' }
  | { view: 'edit'; themeId: string }
  | { view: 'detail'; slug: string }
  | { view: 'preview'; slug: string; variant?: string }

/* ─── Default / seed themes ─── */
const DEFAULT_THEMES: ThemeData[] = [
  {
    id: 'seed-desktop-portfolio',
    name: 'Desktop Portfolio',
    slug: 'desktop-portfolio',
    description:
      'A dark-themed portfolio website template featuring case study cards, about section, process workflow, contact form, and elegant typography — designed for creative professionals showcasing their work.',
    thumbnail: '/thumbnails/desktop-portfolio.jpg',
    tags: ['Portfolio', 'Desktop'],
    features: [
      'Case Studies Grid',
      'Hero Section with Typography',
      'About / Bio Section',
      'How I Work Process Steps',
      'Contact Form',
      'Theme Variant Switcher',
      'Responsive Navigation',
      'Testimonial Card',
    ],
    demoUrl: '/?preview=desktop-portfolio',
    styleVariations: [
      {
        name: 'Pulse Red',
        fontFamily: 'Inter',
        bgColor: '#0A0A0A',
        textColor: '#FFFFFF',
        accentColor: '#EE4D2D',
      },
      {
        name: 'Ocean Commerce',
        fontFamily: 'Inter',
        bgColor: '#0A0A0A',
        textColor: '#FFFFFF',
        accentColor: '#0D6EFD',
      },
      {
        name: 'Emerald Market',
        fontFamily: 'Inter',
        bgColor: '#0A0A0A',
        textColor: '#FFFFFF',
        accentColor: '#059669',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-fashion-beauty',
    name: 'Mobile Fashion & Beauty',
    slug: 'mobile-fashion-beauty',
    description:
      'A luxury editorial mobile app template for fashion & beauty brands. Features curated product feeds, guided skincare rituals with step-by-step sequences, audio soundscapes, mindfulness sections, and a warm cream aesthetic — designed for conscious, slow-fashion experiences.',
    thumbnail: '/thumbnails/mobile-fashion-beauty.jpg',
    tags: ['Fashion & Beauty', 'Mobile'],
    features: [
      'Editorial Product Cards',
      'Guided Skincare Rituals',
      'Audio Soundscape Player',
      '2x2 Product Grid with Wishlist',
      'Mindfulness / Daily Pause Section',
      'Curate to Cart Kit Builder',
      'Category Filter Pills',
      'Fixed Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-fashion-beauty',
    styleVariations: [
      {
        name: 'Warm Rose',
        fontFamily: 'Georgia',
        bgColor: '#F5F0EB',
        textColor: '#2C2C2C',
        accentColor: '#EE4D2D',
      },
      {
        name: 'Ocean Mist',
        fontFamily: 'Georgia',
        bgColor: '#F5F0EB',
        textColor: '#2C2C2C',
        accentColor: '#0D6EFD',
      },
      {
        name: 'Botanical Green',
        fontFamily: 'Georgia',
        bgColor: '#F5F0EB',
        textColor: '#2C2C2C',
        accentColor: '#059669',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-saas-dashboard',
    name: 'SaaS Analytics Dashboard',
    slug: 'saas-dashboard',
    description:
      'A full-featured SaaS analytics dashboard with sidebar navigation, metric cards, revenue charts, transaction tables, activity feed, and customer rankings — designed for data-driven web applications.',
    thumbnail: '/thumbnails/saas-dashboard.jpg',
    tags: ['Dashboard', 'Desktop'],
    features: [
      'Sidebar Navigation',
      'KPI Metric Cards with Sparklines',
      'Revenue Trend Chart',
      'Recent Transactions Table',
      'Activity Feed',
      'Top Customers Ranking',
      'Search & Export',
      'Dark Theme Dashboard',
    ],
    demoUrl: '/?preview=saas-dashboard',
    styleVariations: [
      {
        name: 'Atlas Blue',
        fontFamily: 'Inter',
        bgColor: '#0F172A',
        textColor: '#F1F5F9',
        accentColor: '#3B82F6',
      },
      {
        name: 'Nebula Purple',
        fontFamily: 'Inter',
        bgColor: '#0F0A1F',
        textColor: '#F1F5F9',
        accentColor: '#8B5CF6',
      },
      {
        name: 'Aurora Green',
        fontFamily: 'Inter',
        bgColor: '#0A1A14',
        textColor: '#F1F5F9',
        accentColor: '#10B981',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-restaurant-landing',
    name: 'Restaurant Landing Page',
    slug: 'restaurant-landing',
    description:
      'An elegant fine dining restaurant landing page with hero section, signature dishes showcase, reservation booking form, chef profile, photo gallery, and newsletter signup — designed with a luxury dark aesthetic.',
    thumbnail: '/thumbnails/restaurant-landing.jpg',
    tags: ['Food & Restaurant', 'Desktop'],
    features: [
      'Hero Section with CTA',
      'Signature Dishes Cards',
      'Reservation Booking Form',
      'Chef Quote & Stats',
      'Photo Gallery Grid',
      'Newsletter Signup',
      'Scroll-Based Navigation',
    ],
    demoUrl: '/?preview=restaurant-landing',
    styleVariations: [
      {
        name: 'Golden',
        fontFamily: 'Playfair Display',
        bgColor: '#1A1A1A',
        textColor: '#F5F0E8',
        accentColor: '#D4A853',
      },
      {
        name: 'Burgundy',
        fontFamily: 'Playfair Display',
        bgColor: '#1A1216',
        textColor: '#F5EEF0',
        accentColor: '#8B2252',
      },
      {
        name: 'Sage',
        fontFamily: 'Playfair Display',
        bgColor: '#161A16',
        textColor: '#F0F5F0',
        accentColor: '#6B8E6B',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-fitness-tracker',
    name: 'Mobile Fitness Tracker',
    slug: 'mobile-fitness-tracker',
    description:
      'A mobile fitness tracking app with workout progress rings, weekly activity charts, daily stats cards, quick actions, and upcoming workout schedule — designed for health and wellness apps.',
    thumbnail: '/thumbnails/fitness-tracker.jpg',
    tags: ['Health & Fitness', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Circular Progress Ring',
      'Weekly Activity Bar Chart',
      'Daily Stats Cards',
      'Quick Action Buttons',
      'Upcoming Workouts List',
      'Bottom Navigation Bar',
      'Animated Mount Transitions',
    ],
    demoUrl: '/?preview=mobile-fitness-tracker',
    styleVariations: [
      {
        name: 'Blaze Orange',
        fontFamily: 'Inter',
        bgColor: '#111111',
        textColor: '#F5F5F5',
        accentColor: '#F97316',
      },
      {
        name: 'Ocean Cyan',
        fontFamily: 'Inter',
        bgColor: '#0A1114',
        textColor: '#F5F5F5',
        accentColor: '#06B6D4',
      },
      {
        name: 'Lime Green',
        fontFamily: 'Inter',
        bgColor: '#101208',
        textColor: '#F5F5F5',
        accentColor: '#84CC16',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-travel-booking',
    name: 'Travel Booking Homepage',
    slug: 'travel-booking',
    description:
      'A travel booking platform homepage with destination search, popular destinations grid, trending deals, trust badges, and newsletter signup — designed for travel agencies and booking platforms.',
    thumbnail: '/thumbnails/travel-booking.jpg',
    tags: ['Travel & Booking', 'Desktop'],
    features: [
      'Hero Search Form',
      'Popular Destinations Grid',
      'Trending Deals Section',
      'Trust Badges',
      'Newsletter Signup',
      'Tab Navigation (Flights/Hotels/Cars)',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=travel-booking',
    styleVariations: [
      {
        name: 'Explorer Blue',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#0F172A',
        accentColor: '#2563EB',
      },
      {
        name: 'Sunset Amber',
        fontFamily: 'Inter',
        bgColor: '#FFFBF0',
        textColor: '#1C1917',
        accentColor: '#F59E0B',
      },
      {
        name: 'Arctic Sky',
        fontFamily: 'Inter',
        bgColor: '#F0F9FF',
        textColor: '#0C4A6E',
        accentColor: '#0EA5E9',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-social-media-feed',
    name: 'Mobile Social Feed',
    slug: 'mobile-social-feed',
    description:
      'A mobile social media feed with stories row, photo posts with like/comment/share interactions, floating compose button, and bottom navigation — designed for social networking apps.',
    thumbnail: '/thumbnails/social-media-feed.jpg',
    tags: ['Social Media', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Stories Row with Avatars',
      'Interactive Post Feed',
      'Like/Bookmark Toggle',
      'Floating Compose Button',
      'Bottom Navigation Bar',
      'Heart Animation on Like',
    ],
    demoUrl: '/?preview=mobile-social-feed',
    styleVariations: [
      {
        name: 'Teal',
        fontFamily: 'Inter',
        bgColor: '#111111',
        textColor: '#F5F5F5',
        accentColor: '#14B8A6',
      },
      {
        name: 'Violet',
        fontFamily: 'Inter',
        bgColor: '#0F0B18',
        textColor: '#F5F5F5',
        accentColor: '#8B5CF6',
      },
      {
        name: 'Rose',
        fontFamily: 'Inter',
        bgColor: '#140A0C',
        textColor: '#F5F5F5',
        accentColor: '#F43F5E',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-music-player',
    name: 'Mobile Music Player',
    slug: 'mobile-music-player',
    description:
      'A mobile music streaming app with featured playlists, recently played tracks, personalized mixes, top charts, and a mini player bar — designed for music and audio streaming platforms.',
    thumbnail: '/thumbnails/music-streaming.jpg',
    tags: ['Music & Entertainment', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Featured Playlist Hero Card',
      'Recently Played Horizontal Scroll',
      'Made For You Playlists',
      'Top Charts Song List',
      'Mini Player Bar with Controls',
      'Play/Pause Toggle',
      'Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-music-player',
    styleVariations: [
      {
        name: 'Purple',
        fontFamily: 'Inter',
        bgColor: '#0A0A0F',
        textColor: '#F5F5F5',
        accentColor: '#A855F7',
      },
      {
        name: 'Crimson',
        fontFamily: 'Inter',
        bgColor: '#0F0A0A',
        textColor: '#F5F5F5',
        accentColor: '#DC2626',
      },
      {
        name: 'Emerald',
        fontFamily: 'Inter',
        bgColor: '#0A0F0C',
        textColor: '#F5F5F5',
        accentColor: '#059669',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-learning-platform',
    name: 'Online Learning Platform',
    slug: 'learning-platform',
    description:
      'A modern online learning platform with course search, category filters, course cards with ratings, continue learning progress, and instructor spotlights — designed for EdTech and e-learning sites.',
    thumbnail: '/thumbnails/learning-platform.jpg',
    tags: ['Education', 'Desktop'],
    features: [
      'Hero Search Section',
      'Category Filter Pills',
      'Course Cards with Ratings & Pricing',
      'Continue Learning Progress Bars',
      'Instructor Spotlight Grid',
      'Stats Counter Row',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=learning-platform',
    styleVariations: [
      {
        name: 'Indigo',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#0F172A',
        accentColor: '#6366F1',
      },
      {
        name: 'Teal',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#0F172A',
        accentColor: '#14B8A6',
      },
      {
        name: 'Amber',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#0F172A',
        accentColor: '#F59E0B',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-real-estate-listing',
    name: 'Real Estate Listings',
    slug: 'real-estate-listing',
    description:
      'A real estate property listing homepage with hero search, featured properties grid, neighborhood explorer, trust features, and agent stats — designed for real estate agencies and property platforms.',
    thumbnail: '/thumbnails/real-estate.jpg',
    tags: ['Real Estate', 'Desktop'],
    features: [
      'Property Search Form',
      'Featured Properties Grid',
      'Property Cards with Bed/Bath/Sqft',
      'Neighborhood Explorer',
      'Stats Counter Bar',
      'Why Choose Us Section',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=real-estate-listing',
    styleVariations: [
      {
        name: 'Navy',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#0F172A',
        accentColor: '#1E3A5F',
      },
      {
        name: 'Forest',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#14532D',
        accentColor: '#2D5016',
      },
      {
        name: 'Slate',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#0F172A',
        accentColor: '#475569',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-banking',
    name: 'Mobile Banking App',
    slug: 'mobile-banking',
    description:
      'A mobile banking app with balance card, quick actions, recent transactions with category tags, spending overview donut chart, and bottom navigation — designed for fintech and banking apps.',
    thumbnail: '/thumbnails/mobile-banking.jpg',
    tags: ['Finance', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Balance Card with Eye Toggle',
      'Quick Action Buttons',
      'Recent Transactions List',
      'Category Tags on Transactions',
      'Spending Donut Chart',
      'Bottom Navigation with Scan',
    ],
    demoUrl: '/?preview=mobile-banking',
    styleVariations: [
      {
        name: 'Jade Green',
        fontFamily: 'Inter',
        bgColor: '#0A0F0E',
        textColor: '#F5F5F5',
        accentColor: '#10B981',
      },
      {
        name: 'Royal Indigo',
        fontFamily: 'Inter',
        bgColor: '#0A0A14',
        textColor: '#F5F5F5',
        accentColor: '#6366F1',
      },
      {
        name: 'Copper Gold',
        fontFamily: 'Inter',
        bgColor: '#0F0D08',
        textColor: '#F5F5F5',
        accentColor: '#F59E0B',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-blog-magazine',
    name: 'Blog & Magazine',
    slug: 'blog-magazine',
    description:
      'A modern editorial blog and magazine homepage with featured hero article, article feed cards, trending sidebar, newsletter signup, and popular tags — designed for content publishers and media sites.',
    thumbnail: '/thumbnails/blog-magazine.jpg',
    tags: ['Blog & News', 'Desktop'],
    features: [
      'Featured Article Hero',
      'Article Cards with Thumbnails',
      'Trending Now Sidebar',
      'Newsletter Signup',
      'Popular Tags Cloud',
      'Category Navigation',
      'Editorial Typography',
    ],
    demoUrl: '/?preview=blog-magazine',
    styleVariations: [
      {
        name: 'Midnight Rose',
        fontFamily: 'Merriweather',
        bgColor: '#0F0F0F',
        textColor: '#F5F5F5',
        accentColor: '#E11D48',
      },
      {
        name: 'Sepia',
        fontFamily: 'Merriweather',
        bgColor: '#1A1610',
        textColor: '#F5F0E8',
        accentColor: '#B45309',
      },
      {
        name: 'Frost Blue',
        fontFamily: 'Merriweather',
        bgColor: '#0A1118',
        textColor: '#F0F8FF',
        accentColor: '#0284C7',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-weather',
    name: 'Mobile Weather App',
    slug: 'mobile-weather',
    description:
      'A mobile weather app with current conditions, hourly forecast scroll, 5-day outlook, and weather details grid with glassmorphism cards — designed for weather and utility apps.',
    thumbnail: '/thumbnails/weather-app.jpg',
    tags: ['Weather & Utility', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Current Weather Display',
      'Hourly Forecast Scroll',
      '5-Day Forecast List',
      'Weather Details Grid',
      'Glassmorphism Cards',
      'Gradient Background',
      'Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-weather',
    styleVariations: [
      {
        name: 'Azure',
        fontFamily: 'Inter',
        bgColor: '#0C1445',
        textColor: '#FFFFFF',
        accentColor: '#06B6D4',
      },
      {
        name: 'Sunset',
        fontFamily: 'Inter',
        bgColor: '#1A0A00',
        textColor: '#FFFFFF',
        accentColor: '#F97316',
      },
      {
        name: 'Aurora',
        fontFamily: 'Inter',
        bgColor: '#0A0520',
        textColor: '#FFFFFF',
        accentColor: '#A855F7',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-fashion-boutique',
    name: 'Fashion Boutique',
    slug: 'fashion-boutique',
    description:
      'A luxury fashion e-commerce boutique with hero lookbook, category cards, new arrivals grid, featured collection banner, and newsletter — designed for high-end fashion and apparel brands.',
    thumbnail: '/thumbnails/fashion-boutique.jpg',
    tags: ['E-Commerce', 'Desktop'],
    features: [
      'Luxury Hero Banner',
      'Shop by Category Cards',
      'New Arrivals Product Grid',
      'Wishlist Toggle',
      'Featured Collection Lookbook',
      'Bestsellers Section',
      'Newsletter Signup',
    ],
    demoUrl: '/?preview=fashion-boutique',
    styleVariations: [
      {
        name: 'Noir Gold',
        fontFamily: 'Cormorant Garamond',
        bgColor: '#0A0A0A',
        textColor: '#F5F5F5',
        accentColor: '#C9A96E',
      },
      {
        name: 'Blush',
        fontFamily: 'Cormorant Garamond',
        bgColor: '#0F0A0C',
        textColor: '#F5F0F2',
        accentColor: '#D4748A',
      },
      {
        name: 'Ivory',
        fontFamily: 'Cormorant Garamond',
        bgColor: '#FAF8F5',
        textColor: '#2A2420',
        accentColor: '#8B7355',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-grocery-delivery',
    name: 'Grocery Delivery App',
    slug: 'mobile-grocery-delivery',
    description:
      'A mobile grocery delivery app with delivery address, category circles, flash deals, popular items grid, and floating cart bar — designed for food delivery and grocery ordering platforms.',
    thumbnail: '/thumbnails/grocery-delivery.jpg',
    tags: ['E-Commerce', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Delivery Address Bar',
      'Category Circle Icons',
      'Flash Deals with Countdown',
      'Product Grid with Add-to-Cart',
      'Floating Cart Summary Bar',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-grocery-delivery',
    styleVariations: [
      {
        name: 'Fresh Green',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#1A1A1A',
        accentColor: '#22C55E',
      },
      {
        name: 'Organic',
        fontFamily: 'Inter',
        bgColor: '#FFFAF5',
        textColor: '#1A1A1A',
        accentColor: '#EA580C',
      },
      {
        name: 'Berry',
        fontFamily: 'Inter',
        bgColor: '#FAF5FF',
        textColor: '#1A1A1A',
        accentColor: '#7C3AED',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-electronics-store',
    name: 'Electronics Tech Store',
    slug: 'electronics-store',
    description:
      'A desktop electronics store with product hero, category grid, best sellers, deal of the day countdown, and tech-focused design — built for gadget and tech retail platforms.',
    thumbnail: '/thumbnails/electronics-store.jpg',
    tags: ['E-Commerce', 'Desktop'],
    features: [
      'Product Launch Hero',
      'Category Grid with Icons',
      'Best Sellers Product Cards',
      'Deal of the Day Countdown',
      'Cart & Wishlist Toggle',
      'Free Shipping Bar',
      'Newsletter Signup',
    ],
    demoUrl: '/?preview=electronics-store',
    styleVariations: [
      {
        name: 'Cobalt Blue',
        fontFamily: 'Inter',
        bgColor: '#0A0A12',
        textColor: '#F5F5FF',
        accentColor: '#2563EB',
      },
      {
        name: 'Neon Green',
        fontFamily: 'Inter',
        bgColor: '#0A0F0C',
        textColor: '#F5FFF8',
        accentColor: '#10B981',
      },
      {
        name: 'Carbon Gold',
        fontFamily: 'Inter',
        bgColor: '#0F0D08',
        textColor: '#FFF8F0',
        accentColor: '#F59E0B',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-sneaker-store',
    name: 'Sneaker & Streetwear Store',
    slug: 'mobile-sneaker-store',
    description:
      'A mobile sneaker and streetwear store with featured drops, brand logos, trending products, just dropped grid, and wishlist — designed for sneaker culture and streetwear enthusiasts.',
    thumbnail: '/thumbnails/sneaker-store.jpg',
    tags: ['E-Commerce', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Featured Drop Banner',
      'Brand Logo Scroll',
      'Trending Now Horizontal Cards',
      'Just Dropped Product Grid',
      'Wishlist Heart Toggle',
      'Size Guide Access',
      'Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-sneaker-store',
    styleVariations: [
      {
        name: 'Hype Red',
        fontFamily: 'Inter',
        bgColor: '#0A0A0A',
        textColor: '#FFFFFF',
        accentColor: '#EF4444',
      },
      {
        name: 'Retro Purple',
        fontFamily: 'Inter',
        bgColor: '#0A080F',
        textColor: '#F5F0FF',
        accentColor: '#8B5CF6',
      },
      {
        name: 'Stealth Cyan',
        fontFamily: 'Inter',
        bgColor: '#080C0E',
        textColor: '#F0FAFF',
        accentColor: '#06B6D4',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-furniture-store',
    name: 'Furniture & Home Store',
    slug: 'furniture-store',
    description:
      'A premium furniture and home decor store with shop-by-room navigation, featured products, testimonials, and white-glove delivery — designed for luxury home furnishing brands.',
    thumbnail: '/thumbnails/furniture-store.jpg',
    tags: ['E-Commerce', 'Desktop'],
    features: [
      'Shop by Room Navigation',
      'Featured Products Grid',
      'Wishlist Toggle',
      'Customer Testimonials',
      'New Arrivals Section',
      'Free Shipping Bar',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=furniture-store',
    styleVariations: [
      {
        name: 'Walnut',
        fontFamily: 'Playfair Display',
        bgColor: '#FAF7F2',
        textColor: '#2A2118',
        accentColor: '#8B6914',
      },
      {
        name: 'Sage',
        fontFamily: 'Playfair Display',
        bgColor: '#F7FAF5',
        textColor: '#1A2A15',
        accentColor: '#5F8D4E',
      },
      {
        name: 'Charcoal',
        fontFamily: 'Playfair Display',
        bgColor: '#FAFAFA',
        textColor: '#111827',
        accentColor: '#374151',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-beauty-store',
    name: 'Beauty & Cosmetics Store',
    slug: 'mobile-beauty-store',
    description:
      'A mobile beauty and cosmetics store with best sellers carousel, new arrivals grid, special offers, and customer reviews — designed for beauty brands and skincare shops.',
    thumbnail: '/thumbnails/beauty-store.jpg',
    tags: ['E-Commerce', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Best Sellers Horizontal Scroll',
      'New Arrivals Product Grid',
      'Special Offers Banner',
      'Customer Reviews Section',
      'Wishlist Heart Toggle',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-beauty-store',
    styleVariations: [
      {
        name: 'Rose',
        fontFamily: 'Inter',
        bgColor: '#FFFBFB',
        textColor: '#1A1A1A',
        accentColor: '#E11D48',
      },
      {
        name: 'Lavender',
        fontFamily: 'Inter',
        bgColor: '#FEFBFF',
        textColor: '#1A1A1A',
        accentColor: '#7C3AED',
      },
      {
        name: 'Peach',
        fontFamily: 'Inter',
        bgColor: '#FFFCFA',
        textColor: '#1A1A1A',
        accentColor: '#EA580C',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-kanban-board',
    name: 'Project Kanban Board',
    slug: 'kanban-board',
    description:
      'A project management kanban board with draggable columns, task cards with priority tags, sprint progress tracker, and sidebar navigation — designed for dev teams and project managers.',
    thumbnail: '/thumbnails/kanban-board.jpg',
    tags: ['Productivity', 'Desktop'],
    features: [
      'Kanban Column Layout',
      'Task Cards with Tags',
      'Priority Indicators',
      'Sprint Progress Bar',
      'Sidebar Navigation',
      'Search & Filters',
      'Comment & Attachment Counts',
    ],
    demoUrl: '/?preview=kanban-board',
    styleVariations: [
      {
        name: 'Ocean Blue',
        fontFamily: 'Inter',
        bgColor: '#0B1120',
        textColor: '#F1F5F9',
        accentColor: '#3B82F6',
      },
      {
        name: 'Violet',
        fontFamily: 'Inter',
        bgColor: '#0D0B1A',
        textColor: '#F1F0FF',
        accentColor: '#8B5CF6',
      },
      {
        name: 'Pine',
        fontFamily: 'Inter',
        bgColor: '#0A110E',
        textColor: '#F0FFF5',
        accentColor: '#059669',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-recipe-app',
    name: 'Mobile Recipe App',
    slug: 'mobile-recipe-app',
    description:
      'A mobile cooking and recipe app with featured recipes, category filters, popular dishes, quick & easy section, and weekly meal planner — designed for food lovers and cooking enthusiasts.',
    thumbnail: '/thumbnails/recipe-app.jpg',
    tags: ['Food & Recipe', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Category Filter Pills',
      'Featured Recipe Card',
      'Popular Recipes List',
      'Quick & Easy Scroll',
      'Weekly Meal Planner',
      'Bookmark Toggle',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-recipe-app',
    styleVariations: [
      {
        name: 'Tomato',
        fontFamily: 'Inter',
        bgColor: '#FFFAFA',
        textColor: '#1A1A1A',
        accentColor: '#DC2626',
      },
      {
        name: 'Herb',
        fontFamily: 'Inter',
        bgColor: '#F9FFF5',
        textColor: '#1A1A1A',
        accentColor: '#16A34A',
      },
      {
        name: 'Honey',
        fontFamily: 'Inter',
        bgColor: '#FFFDF5',
        textColor: '#1A1A1A',
        accentColor: '#D97706',
      },
    ],
    reviews: [],
  },
]

const DEFAULT_CATEGORIES = ['E-Commerce', 'Desktop', 'Mobile', 'Portfolio', 'Fashion & Beauty', 'Dashboard', 'Food & Restaurant', 'Health & Fitness', 'Travel & Booking', 'Social Media', 'Music & Entertainment', 'Education', 'Real Estate', 'Finance', 'Blog & News', 'Weather & Utility', 'Productivity', 'Food & Recipe']

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
  const deletedIds = load<string[]>(DELETED_KEY, [])

  // Always ensure default categories exist (even for already-seeded users)
  const catSet = new Set([...DEFAULT_CATEGORIES, ...savedCategories])
  const mergedCategories = [...catSet]

  // Filter out any seeds the user has permanently deleted
  const activeDefaults = DEFAULT_THEMES.filter((d) => !deletedIds.includes(d.id))

  if (seedVersion === '23') {
    return { themes: savedThemes, categories: mergedCategories }
  }

  // Remove old versions of default themes so they get replaced with updated data
  const cleanedThemes = savedThemes.filter((t) => !activeDefaults.some((d) => d.id === t.id))
  const mergedThemes = [...activeDefaults, ...cleanedThemes]

  // Persist to localStorage immediately
  localStorage.setItem(THEMES_KEY, JSON.stringify(mergedThemes))
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(mergedCategories))
  localStorage.setItem(SEEDED_KEY, '23')
  return { themes: mergedThemes, categories: mergedCategories }
}

const _seedResult = loadWithSeeds()

/* ─── Preview registry: maps slug → React component ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PREVIEW_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'desktop-portfolio': DesktopPortfolio,
  'mobile-fashion-beauty': MobileFashionBeauty,
  'saas-dashboard': SaasDashboard,
  'restaurant-landing': RestaurantLanding,
  'mobile-fitness-tracker': MobileFitnessTracker,
  'travel-booking': TravelBooking,
  'mobile-social-feed': MobileSocialFeed,
  'mobile-music-player': MobileMusicPlayer,
  'learning-platform': LearningPlatform,
  'real-estate-listing': RealEstateListing,
  'mobile-banking': MobileBanking,
  'blog-magazine': BlogMagazine,
  'mobile-weather': MobileWeatherApp,
  'fashion-boutique': FashionBoutique,
  'mobile-grocery-delivery': MobileGroceryDelivery,
  'electronics-store': ElectronicsStore,
  'mobile-sneaker-store': MobileSneakerStore,
  'furniture-store': FurnitureStore,
  'mobile-beauty-store': MobileBeautyStore,
  'kanban-board': KanbanBoard,
  'mobile-recipe-app': MobileRecipeApp,
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
    // If it's a seed theme, remember it so re-seeding won't bring it back
    if (deleteConfirm.id.startsWith('seed-')) {
      const deletedIds = load<string[]>(DELETED_KEY, [])
      if (!deletedIds.includes(deleteConfirm.id)) {
        localStorage.setItem(DELETED_KEY, JSON.stringify([...deletedIds, deleteConfirm.id]))
      }
    }
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
          onEdit={handleEditRequest}
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
