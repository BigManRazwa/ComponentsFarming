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
import { CrmDashboard } from './pages/examples/CrmDashboard'
import { MobileMeditationApp } from './pages/examples/MobileMeditationApp'
import { ConferenceLanding } from './pages/examples/ConferenceLanding'
import { JobBoard } from './pages/examples/JobBoard'
import { MobilePodcastApp } from './pages/examples/MobilePodcastApp'
import { AnalyticsDashboard } from './pages/examples/AnalyticsDashboard'
import { MobileFoodDelivery } from './pages/examples/MobileFoodDelivery'
import { ChatApp } from './pages/examples/ChatApp'
import { MobileCryptoWallet } from './pages/examples/MobileCryptoWallet'
import { VideoStreaming } from './pages/examples/VideoStreaming'
import { MobileSocialProfile } from './pages/examples/MobileSocialProfile'
import { AdminCms } from './pages/examples/AdminCms'
import { MobileRideSharing } from './pages/examples/MobileRideSharing'
import { SocialAnalytics } from './pages/examples/SocialAnalytics'
import { MobileWorkoutPlanner } from './pages/examples/MobileWorkoutPlanner'
import { StartupLanding } from './pages/examples/StartupLanding'
import { MobileNotesApp } from './pages/examples/MobileNotesApp'
import { EcommerceProduct } from './pages/examples/EcommerceProduct'
import { EmailClient } from './pages/examples/EmailClient'
import { MobileDatingApp } from './pages/examples/MobileDatingApp'
import { ProjectDashboard } from './pages/examples/ProjectDashboard'
import { MobileShoppingCart } from './pages/examples/MobileShoppingCart'
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
  {
    id: 'seed-crm-dashboard',
    name: 'CRM Sales Dashboard',
    slug: 'crm-dashboard',
    description:
      'A CRM sales dashboard with pipeline funnel, deals table, stats cards, upcoming tasks, and activity feed — designed for sales teams and customer relationship management.',
    thumbnail: '/thumbnails/crm-dashboard.jpg',
    tags: ['CRM & Sales', 'Desktop'],
    features: [
      'Pipeline Funnel Chart',
      'Recent Deals Table',
      'Revenue Stats Cards',
      'Upcoming Tasks List',
      'Activity Feed',
      'Sidebar Navigation',
      'Search & Notifications',
    ],
    demoUrl: '/?preview=crm-dashboard',
    styleVariations: [
      {
        name: 'Teal',
        fontFamily: 'Inter',
        bgColor: '#0F1419',
        textColor: '#F1F5F9',
        accentColor: '#14B8A6',
      },
      {
        name: 'Indigo',
        fontFamily: 'Inter',
        bgColor: '#0F0F1A',
        textColor: '#F1F0FF',
        accentColor: '#6366F1',
      },
      {
        name: 'Amber',
        fontFamily: 'Inter',
        bgColor: '#141008',
        textColor: '#FFF8E8',
        accentColor: '#F59E0B',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-meditation',
    name: 'Meditation & Wellness App',
    slug: 'mobile-meditation',
    description:
      'A mobile meditation and wellness app with guided sessions, daily progress ring, mood tracker, category explorer, and wellness stats — designed for mindfulness and mental health apps.',
    thumbnail: '/thumbnails/meditation-app.jpg',
    tags: ['Wellness', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Featured Session Card',
      'Daily Progress Ring',
      'Category Explorer Grid',
      'Recommended Sessions',
      'Mood Tracker',
      'Wellness Stats',
      'Glassmorphism Cards',
    ],
    demoUrl: '/?preview=mobile-meditation',
    styleVariations: [
      {
        name: 'Twilight',
        fontFamily: 'Inter',
        bgColor: '#1A0A3E',
        textColor: '#F5F0FF',
        accentColor: '#8B5CF6',
      },
      {
        name: 'Ocean',
        fontFamily: 'Inter',
        bgColor: '#0A2030',
        textColor: '#F0FAFF',
        accentColor: '#06B6D4',
      },
      {
        name: 'Forest',
        fontFamily: 'Inter',
        bgColor: '#0A2010',
        textColor: '#F0FFF5',
        accentColor: '#22C55E',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-conference-landing',
    name: 'Conference & Event Landing',
    slug: 'conference-landing',
    description:
      'A maximalist conference and event landing page with animated hero, speaker carousel, schedule timeline, ticket pricing tiers, sponsor logos wall, venue map, FAQ accordion, and newsletter — packed with gradients, glassmorphism, and glow effects.',
    thumbnail: '/thumbnails/conference-landing.jpg',
    tags: ['Events & Conference', 'Desktop'],
    features: [
      'Animated Hero with Countdown',
      'Speaker Cards Grid',
      'Schedule Timeline with Tracks',
      'Ticket Pricing Tiers',
      'Sponsor Logos Wall',
      'Venue & Hotels Section',
      'FAQ Accordion',
      'Gradient & Glow Effects',
      'Glassmorphism Cards',
    ],
    demoUrl: '/?preview=conference-landing',
    styleVariations: [
      {
        name: 'Electric Blue',
        fontFamily: 'Space Grotesk',
        bgColor: '#030712',
        textColor: '#F8FAFC',
        accentColor: '#3B82F6',
      },
      {
        name: 'Sunset',
        fontFamily: 'Space Grotesk',
        bgColor: '#0C0308',
        textColor: '#FFF5F0',
        accentColor: '#F97316',
      },
      {
        name: 'Matrix',
        fontFamily: 'Space Grotesk',
        bgColor: '#020F05',
        textColor: '#F0FFF5',
        accentColor: '#22C55E',
      },
    ],
    fontVariations: [
      {
        name: 'Mono Tech',
        fontFamily: 'JetBrains Mono, monospace',
        preview: 'DEVCON 2025 — Code the Future',
      },
      {
        name: 'Bold Sans',
        fontFamily: 'Outfit, sans-serif',
        preview: 'DEVCON 2025 — Code the Future',
      },
      {
        name: 'Classic Serif',
        fontFamily: 'Playfair Display, serif',
        preview: 'DEVCON 2025 — Code the Future',
      },
      {
        name: 'Geometric',
        fontFamily: 'Poppins, sans-serif',
        preview: 'DEVCON 2025 — Code the Future',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-job-board',
    name: 'Job Board Platform',
    slug: 'job-board',
    description:
      'A detailed job board and hiring platform with hero search, stats bar, featured companies, filterable job listings with sidebar, salary ranges, and job alerts — designed for recruitment and career platforms.',
    thumbnail: '/thumbnails/job-board.jpg',
    tags: ['Jobs & Careers', 'Desktop'],
    features: [
      'Hero Search with Trending Tags',
      'Stats Bar',
      'Featured Companies Grid',
      'Detailed Job Listing Cards',
      'Filter Sidebar',
      'Salary Range Display',
      'Job Alerts Signup',
      'Bookmark Toggle',
    ],
    demoUrl: '/?preview=job-board',
    styleVariations: [
      {
        name: 'Violet',
        fontFamily: 'Plus Jakarta Sans',
        bgColor: '#09090B',
        textColor: '#FAFAFA',
        accentColor: '#7C3AED',
      },
      {
        name: 'Emerald',
        fontFamily: 'Plus Jakarta Sans',
        bgColor: '#050F0A',
        textColor: '#F0FFF5',
        accentColor: '#059669',
      },
      {
        name: 'Rose',
        fontFamily: 'Plus Jakarta Sans',
        bgColor: '#0C0508',
        textColor: '#FFF5F8',
        accentColor: '#E11D48',
      },
    ],
    fontVariations: [
      {
        name: 'Modern Sans',
        fontFamily: 'Outfit, sans-serif',
        preview: 'Find Your Dream Job Today',
      },
      {
        name: 'Geometric',
        fontFamily: 'Poppins, sans-serif',
        preview: 'Find Your Dream Job Today',
      },
      {
        name: 'Classic',
        fontFamily: 'Source Sans 3, sans-serif',
        preview: 'Find Your Dream Job Today',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-podcast',
    name: 'Mobile Podcast Player',
    slug: 'mobile-podcast',
    description:
      'A rich mobile podcast player with now playing controls, continue listening queue, trending episodes, category browser, new releases grid, and queue management — designed for audio streaming and podcast platforms.',
    thumbnail: '/thumbnails/podcast-app.jpg',
    tags: ['Podcast & Audio', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Now Playing Card with Controls',
      'Continue Listening Queue',
      'Trending Episodes List',
      'Browse Categories',
      'New Releases Grid',
      'Queue Management',
      'Playback Speed Toggle',
    ],
    demoUrl: '/?preview=mobile-podcast',
    styleVariations: [
      {
        name: 'Flame',
        fontFamily: 'Inter',
        bgColor: '#0A0A0A',
        textColor: '#FAFAFA',
        accentColor: '#F97316',
      },
      {
        name: 'Royal Purple',
        fontFamily: 'Inter',
        bgColor: '#0A080F',
        textColor: '#F5F0FF',
        accentColor: '#8B5CF6',
      },
      {
        name: 'Mint',
        fontFamily: 'Inter',
        bgColor: '#080C0E',
        textColor: '#F0FAFF',
        accentColor: '#14B8A6',
      },
    ],
    fontVariations: [
      {
        name: 'Rounded',
        fontFamily: 'Nunito, sans-serif',
        preview: 'PodVibe — Listen to the world',
      },
      {
        name: 'Clean',
        fontFamily: 'DM Sans, sans-serif',
        preview: 'PodVibe — Listen to the world',
      },
      {
        name: 'Mono',
        fontFamily: 'IBM Plex Mono, monospace',
        preview: 'PodVibe — Listen to the world',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-analytics-dashboard',
    name: 'Data Analytics Dashboard',
    slug: 'analytics-dashboard',
    description:
      'A data-heavy analytics dashboard with KPI cards, SVG area chart, revenue bar chart, traffic donut chart, pages table, real-time activity feed, and quick stats — packed with visualizations for data teams.',
    thumbnail: '/thumbnails/analytics-dashboard.jpg',
    tags: ['Analytics', 'Desktop'],
    features: [
      'KPI Stats Cards',
      'SVG Area Chart',
      'Revenue Bar Chart',
      'Traffic Donut Chart',
      'Pages Data Table',
      'Real-time Activity Feed',
      'Date Range Picker',
      'Sidebar Navigation',
    ],
    demoUrl: '/?preview=analytics-dashboard',
    styleVariations: [
      {
        name: 'Cyan',
        fontFamily: 'Inter',
        bgColor: '#0A0F14',
        textColor: '#F1F5F9',
        accentColor: '#06B6D4',
      },
      {
        name: 'Violet',
        fontFamily: 'Inter',
        bgColor: '#0C0A14',
        textColor: '#F1F0FF',
        accentColor: '#8B5CF6',
      },
      {
        name: 'Lime',
        fontFamily: 'Inter',
        bgColor: '#0A0F08',
        textColor: '#F5FFF0',
        accentColor: '#84CC16',
      },
    ],
    fontVariations: [
      {
        name: 'Mono Data',
        fontFamily: 'JetBrains Mono, monospace',
        preview: 'DataPulse — 2.4M Users',
      },
      {
        name: 'Clean Sans',
        fontFamily: 'DM Sans, sans-serif',
        preview: 'DataPulse — 2.4M Users',
      },
      {
        name: 'Technical',
        fontFamily: 'IBM Plex Sans, sans-serif',
        preview: 'DataPulse — 2.4M Users',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-food-delivery',
    name: 'Mobile Food Delivery App',
    slug: 'mobile-food-delivery',
    description:
      'A mobile food delivery app with restaurant listings, category browser, promo banners, popular dishes, special offers, order tracking progress, and cart — designed for food ordering platforms.',
    thumbnail: '/thumbnails/food-delivery.jpg',
    tags: ['Food Delivery', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Restaurant Cards with Ratings',
      'Category Browser',
      'Promo Banner',
      'Popular Dishes List',
      'Special Offers Cards',
      'Order Tracking Progress',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-food-delivery',
    styleVariations: [
      {
        name: 'Red',
        fontFamily: 'Inter',
        bgColor: '#FFFFFF',
        textColor: '#1A1A1A',
        accentColor: '#EF4444',
      },
      {
        name: 'Orange',
        fontFamily: 'Inter',
        bgColor: '#FFFAF5',
        textColor: '#1A1A1A',
        accentColor: '#F97316',
      },
      {
        name: 'Green',
        fontFamily: 'Inter',
        bgColor: '#F5FFF8',
        textColor: '#1A1A1A',
        accentColor: '#22C55E',
      },
    ],
    fontVariations: [
      {
        name: 'Rounded',
        fontFamily: 'Nunito, sans-serif',
        preview: 'Order delicious food now',
      },
      {
        name: 'Friendly',
        fontFamily: 'Quicksand, sans-serif',
        preview: 'Order delicious food now',
      },
      {
        name: 'Modern',
        fontFamily: 'Outfit, sans-serif',
        preview: 'Order delicious food now',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-chat-app',
    name: 'Team Chat & Messaging',
    slug: 'chat-app',
    description:
      'A team chat and messaging app with conversation list, message bubbles with reactions, typing indicators, file sharing, shared links panel, and member list — designed for team collaboration platforms.',
    thumbnail: '/thumbnails/chat-app.jpg',
    tags: ['Chat & Messaging', 'Desktop'],
    features: [
      'Conversation List with Unread Badges',
      'Message Bubbles with Reactions',
      'Typing Indicator Animation',
      'File Attachment Cards',
      'Reply Threads',
      'Shared Files & Links Panel',
      'Member Online/Offline Status',
      'Message Input with Emoji & GIF',
    ],
    demoUrl: '/?preview=chat-app',
    styleVariations: [
      {
        name: 'Blue',
        fontFamily: 'Inter',
        bgColor: '#0B0E14',
        textColor: '#F1F5F9',
        accentColor: '#3B82F6',
      },
      {
        name: 'Violet',
        fontFamily: 'Inter',
        bgColor: '#0C0A14',
        textColor: '#F1F0FF',
        accentColor: '#8B5CF6',
      },
      {
        name: 'Emerald',
        fontFamily: 'Inter',
        bgColor: '#080E0C',
        textColor: '#F0FFF5',
        accentColor: '#10B981',
      },
    ],
    fontVariations: [
      {
        name: 'Slack Style',
        fontFamily: 'Lato, sans-serif',
        preview: 'TeamChat — Stay connected',
      },
      {
        name: 'Discord Style',
        fontFamily: 'Outfit, sans-serif',
        preview: 'TeamChat — Stay connected',
      },
      {
        name: 'Mono',
        fontFamily: 'JetBrains Mono, monospace',
        preview: 'TeamChat — Stay connected',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-crypto',
    name: 'Mobile Crypto Wallet',
    slug: 'mobile-crypto',
    description:
      'A mobile crypto wallet and trading app with portfolio chart, asset list with sparklines, quick actions, watchlist, recent transactions, and market overview — designed for cryptocurrency and fintech apps.',
    thumbnail: '/thumbnails/crypto-wallet.jpg',
    tags: ['Crypto & Trading', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Portfolio Value with SVG Chart',
      'Asset List with Sparklines',
      'Quick Action Buttons',
      'Watchlist Chips',
      'Transaction History',
      'Market Overview Stats',
      'Dark Theme Design',
    ],
    demoUrl: '/?preview=mobile-crypto',
    styleVariations: [
      {
        name: 'Green',
        fontFamily: 'Inter',
        bgColor: '#0A0A0A',
        textColor: '#FAFAFA',
        accentColor: '#22C55E',
      },
      {
        name: 'Blue',
        fontFamily: 'Inter',
        bgColor: '#080C14',
        textColor: '#F1F5F9',
        accentColor: '#3B82F6',
      },
      {
        name: 'Gold',
        fontFamily: 'Inter',
        bgColor: '#0C0A05',
        textColor: '#FFF8E8',
        accentColor: '#F59E0B',
      },
    ],
    fontVariations: [
      {
        name: 'Finance',
        fontFamily: 'DM Sans, sans-serif',
        preview: 'CoinVault — $24,582.40',
      },
      {
        name: 'Tech',
        fontFamily: 'Space Grotesk, sans-serif',
        preview: 'CoinVault — $24,582.40',
      },
      {
        name: 'Mono',
        fontFamily: 'IBM Plex Mono, monospace',
        preview: 'CoinVault — $24,582.40',
      },
    ],
    reviews: [],
  },
  {
    id: 'seed-video-streaming',
    name: 'Video Streaming Platform',
    slug: 'video-streaming',
    description:
      'A Netflix-style video streaming platform with cinematic hero, continue watching with progress bars, trending posters with hover overlays, top 10 ranking, and new releases grid — designed for entertainment platforms.',
    thumbnail: '/thumbnails/video-streaming.jpg',
    tags: ['Video & Streaming', 'Desktop'],
    features: [
      'Cinematic Hero Section',
      'Continue Watching with Progress',
      'Trending Posters with Hover',
      'Top 10 Ranked List',
      'New Releases Grid',
      'Genre Tag Pills',
      'Search & Notifications',
      'Dark Cinema Theme',
    ],
    demoUrl: '/?preview=video-streaming',
    styleVariations: [
      { name: 'Netflix Red', fontFamily: 'Inter', bgColor: '#0A0A0A', textColor: '#FFFFFF', accentColor: '#E50914' },
      { name: 'Sky Blue', fontFamily: 'Inter', bgColor: '#080C14', textColor: '#F1F5F9', accentColor: '#0EA5E9' },
      { name: 'Purple', fontFamily: 'Inter', bgColor: '#0C0812', textColor: '#F5F0FF', accentColor: '#A855F7' },
    ],
    fontVariations: [
      { name: 'Cinema', fontFamily: 'Bebas Neue, sans-serif', preview: 'THE LAST FRONTIER' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'THE LAST FRONTIER' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'THE LAST FRONTIER' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-social-profile',
    name: 'Mobile Social Profile',
    slug: 'mobile-social-profile',
    description:
      'An Instagram-style social media profile page with avatar, stats, bio, story highlights, content tabs, and photo grid with engagement overlays — designed for social media and creator platforms.',
    thumbnail: '/thumbnails/social-profile.jpg',
    tags: ['Social Profile', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Profile Stats & Bio',
      'Story Highlights Circles',
      'Content Tab Switcher',
      'Photo Grid with Hover Stats',
      'Video & Multi-post Indicators',
      'Edit & Share Profile',
      'Light/Dark Theme Support',
    ],
    demoUrl: '/?preview=mobile-social-profile',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#3B82F6' },
      { name: 'Pink', fontFamily: 'Inter', bgColor: '#FFF5F8', textColor: '#1A1A1A', accentColor: '#EC4899' },
      { name: 'Dark', fontFamily: 'Inter', bgColor: '#0A0A0F', textColor: '#F5F5FF', accentColor: '#6366F1' },
    ],
    fontVariations: [
      { name: 'Rounded', fontFamily: 'Nunito, sans-serif', preview: '@alexdesigns — 45.2K followers' },
      { name: 'Geometric', fontFamily: 'Poppins, sans-serif', preview: '@alexdesigns — 45.2K followers' },
      { name: 'Elegant', fontFamily: 'Playfair Display, serif', preview: '@alexdesigns — 45.2K followers' },
    ],
    reviews: [],
  },
  {
    id: 'seed-admin-cms',
    name: 'Admin CMS Dashboard',
    slug: 'admin-cms',
    description:
      'A content management admin dashboard with sidebar navigation, content stats, searchable data table with status badges, quick actions, recent activity feed, and content calendar — designed for CMS and admin panels.',
    thumbnail: '/thumbnails/admin-cms.jpg',
    tags: ['Admin & CMS', 'Desktop'],
    features: [
      'Sidebar Navigation',
      'Content Stats Cards',
      'Searchable Data Table',
      'Status Badge Filters',
      'Quick Action Buttons',
      'Recent Activity Feed',
      'Content Calendar Widget',
      'Breadcrumb Navigation',
    ],
    demoUrl: '/?preview=admin-cms',
    styleVariations: [
      { name: 'Indigo', fontFamily: 'Inter', bgColor: '#0A0A12', textColor: '#F1F1F8', accentColor: '#6366F1' },
      { name: 'Teal', fontFamily: 'Inter', bgColor: '#080E0E', textColor: '#F0FAFA', accentColor: '#14B8A6' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#0C0A05', textColor: '#FFF8E8', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'System', fontFamily: 'system-ui, sans-serif', preview: 'AdminHub — Content Management' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'AdminHub — Content Management' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'AdminHub — Content Management' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-ride-sharing',
    name: 'Mobile Ride Sharing App',
    slug: 'mobile-ride-sharing',
    description:
      'An Uber-style ride sharing app with location search, map with route, ride option cards, promo banners, payment selection, and ride request — designed for transportation and mobility platforms.',
    thumbnail: '/thumbnails/ride-sharing.jpg',
    tags: ['Ride & Transport', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Location Search with Pins',
      'Map with Route Visualization',
      'Ride Option Cards',
      'Price Comparison',
      'Promo Banner',
      'Payment Method Selection',
      'Request Ride Action',
    ],
    demoUrl: '/?preview=mobile-ride-sharing',
    styleVariations: [
      { name: 'Dark', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#000000' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#3B82F6' },
      { name: 'Green', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#22C55E' },
    ],
    fontVariations: [
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'RideGo — Where to?' },
      { name: 'Rounded', fontFamily: 'Nunito, sans-serif', preview: 'RideGo — Where to?' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'RideGo — Where to?' },
    ],
    reviews: [],
  },
  {
    id: 'seed-social-analytics',
    name: 'Social Media Analytics',
    slug: 'social-analytics',
    description:
      'A social media analytics dashboard with engagement charts, audience demographics, platform performance breakdown, top performing posts, and connected accounts — designed for marketing and social media teams.',
    thumbnail: '/thumbnails/social-analytics.jpg',
    tags: ['Dashboard', 'Desktop'],
    features: [
      'Engagement Line Charts',
      'Audience Demographics Donut',
      'Platform Performance Bars',
      'Top Performing Posts',
      'Connected Social Accounts',
      'Follower Growth Stats',
      'Date Range Filtering',
      'Export Reports',
    ],
    demoUrl: '/?preview=social-analytics',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0A0E18', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#140A0E', textColor: '#FFF0F2', accentColor: '#F43F5E' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
    ],
    fontVariations: [
      { name: 'Marketing', fontFamily: 'Poppins, sans-serif', preview: 'SocialPulse — 89.7K Followers' },
      { name: 'Data', fontFamily: 'IBM Plex Sans, sans-serif', preview: 'SocialPulse — 89.7K Followers' },
      { name: 'Bold', fontFamily: 'Montserrat, sans-serif', preview: 'SocialPulse — 89.7K Followers' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-workout',
    name: 'Mobile Workout Planner',
    slug: 'mobile-workout',
    description:
      'A mobile workout and fitness planner with progress rings, exercise tracker, weekly activity chart, recommended plans, and achievements — designed for fitness and health apps.',
    thumbnail: '/thumbnails/workout-planner.jpg',
    tags: ['Health & Fitness', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'SVG Progress Ring',
      'Exercise List with Status',
      'Weekly Activity Bar Chart',
      'Featured Workout Card',
      'Recommended Plans Carousel',
      'Achievement Badges',
      'Calorie & Step Tracking',
    ],
    demoUrl: '/?preview=mobile-workout',
    styleVariations: [
      { name: 'Orange', fontFamily: 'Inter', bgColor: '#0A0A0A', textColor: '#FAFAFA', accentColor: '#F97316' },
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#080C10', textColor: '#F0FAFA', accentColor: '#06B6D4' },
      { name: 'Lime', fontFamily: 'Inter', bgColor: '#080A06', textColor: '#F5FFF0', accentColor: '#84CC16' },
    ],
    fontVariations: [
      { name: 'Sport', fontFamily: 'Oswald, sans-serif', preview: 'Crush your workout today' },
      { name: 'Friendly', fontFamily: 'Quicksand, sans-serif', preview: 'Crush your workout today' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'Crush your workout today' },
    ],
    reviews: [],
  },
  {
    id: 'seed-startup-landing',
    name: 'Startup Landing Page',
    slug: 'startup-landing',
    description:
      'A modern SaaS startup landing page with gradient hero, feature cards, social proof testimonials, pricing tiers, FAQ accordion, and CTA banner — designed for product launches and marketing sites.',
    thumbnail: '/thumbnails/startup-landing.jpg',
    tags: ['Portfolio', 'Desktop'],
    features: [
      'Gradient Hero Section',
      'Feature Cards Grid',
      'Social Proof Testimonials',
      '3-Tier Pricing Table',
      'FAQ Accordion',
      'CTA Banner',
      'Trusted By Logos',
      'Sticky Navigation',
    ],
    demoUrl: '/?preview=startup-landing',
    styleVariations: [
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#09090B', textColor: '#FAFAFA', accentColor: '#8B5CF6' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#09090B', textColor: '#FAFAFA', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#09090B', textColor: '#FAFAFA', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Impact', fontFamily: 'Sora, sans-serif', preview: 'Ship faster with AI-powered tools' },
      { name: 'Elegant', fontFamily: 'DM Sans, sans-serif', preview: 'Ship faster with AI-powered tools' },
      { name: 'Geometric', fontFamily: 'Space Grotesk, sans-serif', preview: 'Ship faster with AI-powered tools' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-notes',
    name: 'Mobile Notes & To-Do',
    slug: 'mobile-notes',
    description:
      'A mobile notes and to-do app with pinned notes, category filters, grid layout, checkable to-do items, color-coded tags, and floating action button — designed for productivity and note-taking apps.',
    thumbnail: '/thumbnails/notes-app.jpg',
    tags: ['Productivity', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Pinned Notes Section',
      'Category Filter Pills',
      'Notes Grid Layout',
      'Checkable To-Do Items',
      'Color-Coded Tags',
      'Floating Action Button',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-notes',
    styleVariations: [
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#FFFBF0', textColor: '#1A1A1A', accentColor: '#F59E0B' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#F5F8FF', textColor: '#1A1A1A', accentColor: '#3B82F6' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#FFF5F7', textColor: '#1A1A1A', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Handwritten', fontFamily: 'Caveat, cursive', preview: 'My Notes — Stay organized' },
      { name: 'Rounded', fontFamily: 'Nunito, sans-serif', preview: 'My Notes — Stay organized' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'My Notes — Stay organized' },
    ],
    reviews: [],
  },
  {
    id: 'seed-ecommerce-product',
    name: 'E-Commerce Product Page',
    slug: 'ecommerce-product',
    description:
      'A detailed product page with image gallery, color/size selectors, pricing with discounts, reviews with ratings breakdown, specifications table, and related products — designed for online stores.',
    thumbnail: '/thumbnails/ecommerce-product.jpg',
    tags: ['E-Commerce', 'Desktop'],
    features: [
      'Product Image Gallery',
      'Color & Size Selectors',
      'Quantity Picker',
      'Discount Badge & Pricing',
      'Star Ratings & Reviews',
      'Specifications Table',
      'Shipping Info Card',
      'Related Products Grid',
    ],
    demoUrl: '/?preview=ecommerce-product',
    styleVariations: [
      { name: 'Orange', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#111827', accentColor: '#F97316' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#111827', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#111827', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Premium', fontFamily: 'Playfair Display, serif', preview: 'SoundPro Max — $299.99' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'SoundPro Max — $299.99' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'SoundPro Max — $299.99' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-music',
    name: 'Mobile Music Player',
    slug: 'mobile-music',
    description:
      'A Spotify-style music player with album art, playback controls, progress bar, volume slider, up next queue, and recently played — designed for music streaming and audio apps.',
    thumbnail: '/thumbnails/music-player.jpg',
    tags: ['Music & Entertainment', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Album Art with Gradient',
      'Playback Controls',
      'Progress & Volume Sliders',
      'Like & Share Actions',
      'Up Next Queue',
      'Recently Played Carousel',
      'Dark Theme Design',
    ],
    demoUrl: '/?preview=mobile-music',
    styleVariations: [
      { name: 'Green', fontFamily: 'Inter', bgColor: '#0A0A0A', textColor: '#FAFAFA', accentColor: '#22C55E' },
      { name: 'Purple', fontFamily: 'Inter', bgColor: '#0C0812', textColor: '#F5F0FF', accentColor: '#A855F7' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#120A0C', textColor: '#FFF0F2', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Groove', fontFamily: 'Righteous, cursive', preview: 'Midnight Dreams — Luna Eclipse' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'Midnight Dreams — Luna Eclipse' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'Midnight Dreams — Luna Eclipse' },
    ],
    reviews: [],
  },
  {
    id: 'seed-email-client',
    name: 'Desktop Email Client',
    slug: 'email-client',
    description:
      'A Gmail-style email client with 3-column layout, compose button, folder navigation with counts, email list with avatars, reading pane with reply, labels, and search filters — designed for productivity and communication apps.',
    thumbnail: '/thumbnails/email-client.jpg',
    tags: ['Productivity', 'Desktop'],
    features: [
      '3-Column Layout',
      'Compose Email Button',
      'Folder Nav with Counts',
      'Email List with Avatars',
      'Reading Pane with Reply',
      'Search & Filter Bar',
      'Color-Coded Labels',
      'Storage Indicator',
    ],
    demoUrl: '/?preview=email-client',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0C1220', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
      { name: 'Teal', fontFamily: 'Inter', bgColor: '#080E0E', textColor: '#F0FAFA', accentColor: '#14B8A6' },
    ],
    fontVariations: [
      { name: 'System', fontFamily: 'system-ui, sans-serif', preview: 'MailFlow — Q4 Marketing Report' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'MailFlow — Q4 Marketing Report' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'MailFlow — Q4 Marketing Report' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-dating',
    name: 'Mobile Dating App',
    slug: 'mobile-dating',
    description:
      'A Tinder-style dating app with swipeable profile cards, interest tags, match percentage, action buttons, nearby people, and recent activity — designed for dating and social connection platforms.',
    thumbnail: '/thumbnails/dating-app.jpg',
    tags: ['Social Media', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Profile Card with Photo',
      'Interest Tag Pills',
      'Match Percentage Badge',
      'Like/Reject/Super-Like Buttons',
      'People Near You Carousel',
      'Recent Activity Feed',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-dating',
    styleVariations: [
      { name: 'Coral', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#FF6B6B' },
      { name: 'Purple', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#A855F7' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#3B82F6' },
    ],
    fontVariations: [
      { name: 'Playful', fontFamily: 'Quicksand, sans-serif', preview: 'Spark — Find your match' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'Spark — Find your match' },
      { name: 'Elegant', fontFamily: 'Cormorant Garamond, serif', preview: 'Spark — Find your match' },
    ],
    reviews: [],
  },
  {
    id: 'seed-project-dashboard',
    name: 'Project Management Dashboard',
    slug: 'project-dashboard',
    description:
      'A Linear-style project dashboard with task list, status groups, detail panel, progress tracking, team members, subtasks, and comments — designed for project management and team collaboration.',
    thumbnail: '/thumbnails/project-dashboard.jpg',
    tags: ['Dashboard', 'Desktop'],
    features: [
      '3-Column Layout',
      'Task List with Status Groups',
      'Task Detail Panel',
      'Progress Tracking Bar',
      'Priority & Assignee Filters',
      'Subtask Management',
      'Team Comments',
      'Project Sidebar Nav',
    ],
    demoUrl: '/?preview=project-dashboard',
    styleVariations: [
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#0A0E14', textColor: '#F1F5F9', accentColor: '#06B6D4' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#0F0D08', textColor: '#FFF8F0', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'System', fontFamily: 'system-ui, sans-serif', preview: 'Planify — Mobile App v2.0' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'Planify — Mobile App v2.0' },
      { name: 'Technical', fontFamily: 'IBM Plex Sans, sans-serif', preview: 'Planify — Mobile App v2.0' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-cart',
    name: 'Mobile Shopping Cart',
    slug: 'mobile-cart',
    description:
      'A mobile shopping cart with quantity controls, promo code input, order summary with computed totals, checkout button, and suggested items — designed for e-commerce and retail apps.',
    thumbnail: '/thumbnails/shopping-cart.jpg',
    tags: ['E-Commerce', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Cart Items with Quantity',
      'Remove Item Controls',
      'Promo Code Input',
      'Auto-Computed Totals',
      'Checkout Button',
      'Suggested Items Carousel',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-cart',
    styleVariations: [
      { name: 'Indigo', fontFamily: 'Inter', bgColor: '#F5F5FF', textColor: '#1A1A2E', accentColor: '#6366F1' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#F0FFF8', textColor: '#1A2E1A', accentColor: '#10B981' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#FFF5F7', textColor: '#2E1A1A', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Rounded', fontFamily: 'Nunito, sans-serif', preview: 'My Cart — 3 items' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'My Cart — 3 items' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'My Cart — 3 items' },
    ],
    reviews: [],
  },
]

const DEFAULT_CATEGORIES = ['E-Commerce', 'Desktop', 'Mobile', 'Portfolio', 'Fashion & Beauty', 'Dashboard', 'Food & Restaurant', 'Health & Fitness', 'Travel & Booking', 'Social Media', 'Music & Entertainment', 'Education', 'Real Estate', 'Finance', 'Blog & News', 'Weather & Utility', 'Productivity', 'Food & Recipe', 'CRM & Sales', 'Wellness', 'Events & Conference', 'Jobs & Careers', 'Podcast & Audio', 'Analytics', 'Food Delivery', 'Chat & Messaging', 'Crypto & Trading', 'Video & Streaming', 'Social Profile', 'Admin & CMS', 'Ride & Transport']

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

  if (seedVersion === '35') {
    return { themes: savedThemes, categories: mergedCategories }
  }

  // Remove old versions of default themes so they get replaced with updated data
  const cleanedThemes = savedThemes.filter((t) => !activeDefaults.some((d) => d.id === t.id))
  const mergedThemes = [...activeDefaults, ...cleanedThemes]

  // Persist to localStorage immediately
  localStorage.setItem(THEMES_KEY, JSON.stringify(mergedThemes))
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(mergedCategories))
  localStorage.setItem(SEEDED_KEY, '35')
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
  'crm-dashboard': CrmDashboard,
  'mobile-meditation': MobileMeditationApp,
  'conference-landing': ConferenceLanding,
  'job-board': JobBoard,
  'mobile-podcast': MobilePodcastApp,
  'analytics-dashboard': AnalyticsDashboard,
  'mobile-food-delivery': MobileFoodDelivery,
  'chat-app': ChatApp,
  'mobile-crypto': MobileCryptoWallet,
  'video-streaming': VideoStreaming,
  'mobile-social-profile': MobileSocialProfile,
  'admin-cms': AdminCms,
  'mobile-ride-sharing': MobileRideSharing,
  'social-analytics': SocialAnalytics,
  'mobile-workout': MobileWorkoutPlanner,
  'startup-landing': StartupLanding,
  'mobile-notes': MobileNotesApp,
  'ecommerce-product': EcommerceProduct,
  'mobile-music': MobileMusicPlayer,
  'email-client': EmailClient,
  'mobile-dating': MobileDatingApp,
  'project-dashboard': ProjectDashboard,
  'mobile-cart': MobileShoppingCart,
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
