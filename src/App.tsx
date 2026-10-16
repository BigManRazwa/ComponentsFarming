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
import { FileManager } from './pages/examples/FileManager'
import { MobileEventTickets } from './pages/examples/MobileEventTickets'
import { InvoiceDashboard } from './pages/examples/InvoiceDashboard'
import { MobileLanguageLearning } from './pages/examples/MobileLanguageLearning'
import { BookingCalendar } from './pages/examples/BookingCalendar'
import { MobileHabitTracker } from './pages/examples/MobileHabitTracker'
import { BlogEditor } from './pages/examples/BlogEditor'
import { MobileParkingFinder } from './pages/examples/MobileParkingFinder'
import { StockTrading } from './pages/examples/StockTrading'
import { MobilePropertyFinder } from './pages/examples/MobilePropertyFinder'
import { SupportDashboard } from './pages/examples/SupportDashboard'
import { MobileRecipeDetail } from './pages/examples/MobileRecipeDetail'
import { PodcastStudio } from './pages/examples/PodcastStudio'
import { MobileFashionStore } from './pages/examples/MobileFashionStore'
import { JobBoardDash } from './pages/examples/JobBoardDash'
import { MobileWeatherPro } from './pages/examples/MobileWeatherPro'
import { CrmPipeline } from './pages/examples/CrmPipeline'
import { MobileFoodOrder } from './pages/examples/MobileFoodOrder'
import { RestaurantPos } from './pages/examples/RestaurantPos'
import { MobileVideoStream } from './pages/examples/MobileVideoStream'
import { InventoryMgmt } from './pages/examples/InventoryMgmt'
import { MobileCourseApp } from './pages/examples/MobileCourseApp'
import { SocialFeed } from './pages/examples/SocialFeed'
import { MobileHotelBooking } from './pages/examples/MobileHotelBooking'
import { AnalyticsDash } from './pages/examples/AnalyticsDash'
import { CalendarPlanner } from './pages/examples/CalendarPlanner'
import { MobileCryptoPortfolio } from './pages/examples/MobileCryptoPortfolio'
import { MusicStudio } from './pages/examples/MusicStudio'
import { MobileNewsFeed } from './pages/examples/MobileNewsFeed'
import { VideoEditor } from './pages/examples/VideoEditor'
import { MobileFitnessDash } from './pages/examples/MobileFitnessDash'
import { Spreadsheet } from './pages/examples/Spreadsheet'
import { MobileRestaurant } from './pages/examples/MobileRestaurant'
import { CodeEditor } from './pages/examples/CodeEditor'
import { MobileWallet } from './pages/examples/MobileWallet'

import { IotDashboard } from './pages/examples/IotDashboard'
import { MobileAstrologyApp } from './pages/examples/MobileAstrologyApp'
import { FlightBooking } from './pages/examples/FlightBooking'
import { MobileCoffeeShop } from './pages/examples/MobileCoffeeShop'
import { VirtualConference } from './pages/examples/VirtualConference'
import { MobilePlantCare } from './pages/examples/MobilePlantCare'
import { DroneMissionControl } from './pages/examples/DroneMissionControl'
import { MobileBeatStudio } from './pages/examples/MobileBeatStudio'
import { SocIncidentCommand } from './pages/examples/SocIncidentCommand'
import { MobileRocketLaunch } from './pages/examples/MobileRocketLaunch'
import { NeuralStudio } from './pages/examples/NeuralStudio'
import { MobileEvCommand } from './pages/examples/MobileEvCommand'
import { QuantumLab } from './pages/examples/QuantumLab'
import { MobileExoplanetTracker } from './pages/examples/MobileExoplanetTracker'
import { FusionReactor } from './pages/examples/FusionReactor'
import { MobileMechHangar } from './pages/examples/MobileMechHangar'
import { SubmersibleCommand } from './pages/examples/SubmersibleCommand'
import { MobileCyberdeck } from './pages/examples/MobileCyberdeck'
import { ParticleCollider } from './pages/examples/ParticleCollider'
import { MobileBionicArm } from './pages/examples/MobileBionicArm'
import { SmartCityCommand } from './pages/examples/SmartCityCommand'
import { MobileCyberPet } from './pages/examples/MobileCyberPet'
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
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'AdminHub — Content Management' },
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
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'MailFlow — Q4 Marketing Report' },
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
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'Planify — Mobile App v2.0' },
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
  {
    id: 'seed-file-manager',
    name: 'Desktop File Manager',
    slug: 'file-manager',
    description:
      'A Google Drive-style cloud file manager with folder/file grid, detail panel, breadcrumb navigation, storage indicator, file type badges, and sharing settings — designed for cloud storage and document management.',
    thumbnail: '/thumbnails/file-manager.jpg',
    tags: ['Productivity', 'Desktop'],
    features: [
      '3-Column Layout',
      'File & Folder Grid',
      'File Detail Panel',
      'Breadcrumb Navigation',
      'Storage Progress Bar',
      'File Type Badges',
      'Star & Share Actions',
      'Search & Sort Toolbar',
    ],
    demoUrl: '/?preview=file-manager',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0C1220', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Teal', fontFamily: 'Inter', bgColor: '#080E0E', textColor: '#F0FAFA', accentColor: '#14B8A6' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'CloudVault — 4.2 GB of 10 GB' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'CloudVault — 4.2 GB of 10 GB' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'CloudVault — 4.2 GB of 10 GB' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-events',
    name: 'Mobile Event Tickets',
    slug: 'mobile-events',
    description:
      'A mobile event discovery and ticket booking app with featured events, category filters, event listings with booking, popular venues, and ticket cards with QR codes — designed for event platforms.',
    thumbnail: '/thumbnails/event-tickets.jpg',
    tags: ['Events & Conference', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Featured Event Banner',
      'Category Filter Pills',
      'Event Cards with Booking',
      'Popular Venues Carousel',
      'Ticket Cards with QR',
      'Price Badges',
      'Dark Theme Design',
    ],
    demoUrl: '/?preview=mobile-events',
    styleVariations: [
      { name: 'Purple', fontFamily: 'Inter', bgColor: '#0A0A0F', textColor: '#FAFAFA', accentColor: '#A855F7' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#0F0A0A', textColor: '#FFF0F2', accentColor: '#F43F5E' },
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#080C10', textColor: '#F0FAFA', accentColor: '#06B6D4' },
    ],
    fontVariations: [
      { name: 'Display', fontFamily: 'Sora, sans-serif', preview: 'Summer Music Festival — $49' },
      { name: 'Rounded', fontFamily: 'Nunito, sans-serif', preview: 'Summer Music Festival — $49' },
      { name: 'Bold', fontFamily: 'Montserrat, sans-serif', preview: 'Summer Music Festival — $49' },
    ],
    reviews: [],
  },
  {
    id: 'seed-invoice-dashboard',
    name: 'Invoice & Billing Dashboard',
    slug: 'invoice-dashboard',
    description:
      'An invoice management dashboard with revenue stats, invoice table with status badges, detail panel with line items, payment history timeline, and client info — designed for billing and finance apps.',
    thumbnail: '/thumbnails/invoice-dashboard.jpg',
    tags: ['Finance', 'Desktop'],
    features: [
      '3-Column Layout',
      'Revenue Stats Cards',
      'Invoice Table with Filters',
      'Status Badges (Paid/Pending/Overdue)',
      'Invoice Detail Panel',
      'Line Items Breakdown',
      'Payment History Timeline',
      'Create Invoice Action',
    ],
    demoUrl: '/?preview=invoice-dashboard',
    styleVariations: [
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0C1220', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#0F0D08', textColor: '#FFF8F0', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Finance', fontFamily: 'IBM Plex Sans, sans-serif', preview: 'BillFlow — $124,580 Revenue' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'BillFlow — $124,580 Revenue' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'BillFlow — $124,580 Revenue' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-language',
    name: 'Mobile Language Learning',
    slug: 'mobile-language',
    description:
      'A Duolingo-style language learning app with lesson path, progress rings, daily practice, word matching, leaderboard, achievements, and gamified stats — designed for educational and language platforms.',
    thumbnail: '/thumbnails/language-learning.jpg',
    tags: ['Education', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Lesson Path with Nodes',
      'Progress Ring & Bar',
      'Word Matching Exercise',
      'Weekly Leaderboard',
      'Achievement Badges',
      'Streak & XP Stats',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-language',
    styleVariations: [
      { name: 'Green', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#22C55E' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#3B82F6' },
      { name: 'Orange', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#F97316' },
    ],
    fontVariations: [
      { name: 'Friendly', fontFamily: 'Nunito, sans-serif', preview: 'Spanish — Unit 3 · 65%' },
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'Spanish — Unit 3 · 65%' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'Spanish — Unit 3 · 65%' },
    ],
    reviews: [],
  },
  {
    id: 'seed-booking-calendar',
    name: 'Booking Calendar Dashboard',
    slug: 'booking-calendar',
    description:
      'A hotel booking calendar with week view, color-coded booking blocks, guest detail panel, room availability stats, and upcoming check-ins — designed for hospitality and reservation management.',
    thumbnail: '/thumbnails/booking-calendar.jpg',
    tags: ['Travel & Booking', 'Desktop'],
    features: [
      '3-Column Layout',
      'Week View Calendar Grid',
      'Color-Coded Booking Blocks',
      'Guest Detail Panel',
      'Room Availability Stats',
      'Upcoming Check-Ins',
      'Month/Week View Toggle',
      'New Booking Action',
    ],
    demoUrl: '/?preview=booking-calendar',
    styleVariations: [
      { name: 'Orange', fontFamily: 'Inter', bgColor: '#0F0D08', textColor: '#FFF8F0', accentColor: '#F97316' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0C1220', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'StayBook — September 2023' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'StayBook — September 2023' },
      { name: 'Serif', fontFamily: 'Lora, serif', preview: 'StayBook — September 2023' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-habits',
    name: 'Mobile Habit Tracker',
    slug: 'mobile-habits',
    description:
      'A habit tracking app with circular progress ring, interactive habit checklist, week strip calendar, streak counter, weekly bar chart, and motivational quotes — designed for wellness and self-improvement.',
    thumbnail: '/thumbnails/habit-tracker.jpg',
    tags: ['Wellness', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Circular Progress Ring',
      'Interactive Habit Checklist',
      'Week Calendar Strip',
      'Streak Counter',
      'Weekly Bar Chart',
      'Motivational Quotes',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-habits',
    styleVariations: [
      { name: 'Teal', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#14B8A6' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#8B5CF6' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Friendly', fontFamily: 'Nunito, sans-serif', preview: 'My Habits — 21 day streak' },
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'My Habits — 21 day streak' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'My Habits — 21 day streak' },
    ],
    reviews: [],
  },
  {
    id: 'seed-blog-editor',
    name: 'Desktop Blog Editor',
    slug: 'blog-editor',
    description:
      'A Medium-style blog editor with rich text toolbar, pull quotes, inline code, image placeholders, post settings panel with SEO, tags, and publish controls — designed for content platforms and CMS.',
    thumbnail: '/thumbnails/blog-editor.jpg',
    tags: ['Blog & News', 'Desktop'],
    features: [
      '3-Column Editor Layout',
      'Rich Text Formatting Toolbar',
      'Pull Quote & Code Blocks',
      'Image Upload Placeholder',
      'Tag Management',
      'SEO Settings Panel',
      'Publish Schedule',
      'Word Count & Read Time',
    ],
    demoUrl: '/?preview=blog-editor',
    styleVariations: [
      { name: 'Indigo', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#6366F1' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A2E1A', accentColor: '#10B981' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#2E1A1A', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Editorial', fontFamily: 'Merriweather, serif', preview: 'The Future of AI in Design' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'The Future of AI in Design' },
      { name: 'Classic', fontFamily: 'Lora, serif', preview: 'The Future of AI in Design' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-parking',
    name: 'Mobile Parking Finder',
    slug: 'mobile-parking',
    description:
      'A parking spot finder app with dark map view, availability markers, parking cards with pricing, filter pills, reserve buttons, and recent searches — designed for parking and transport apps.',
    thumbnail: '/thumbnails/parking-finder.jpg',
    tags: ['Ride & Transport', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Dark Map View',
      'Availability Markers',
      'Parking Cards with Pricing',
      'Filter by Type',
      'Reserve Button',
      'Recent Searches',
      'Dark Theme Design',
    ],
    demoUrl: '/?preview=mobile-parking',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0A1020', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#080E0C', textColor: '#F0FFF8', accentColor: '#10B981' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
    ],
    fontVariations: [
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'ParkEasy — Downtown SF' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'ParkEasy — Downtown SF' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'ParkEasy — Downtown SF' },
    ],
    reviews: [],
  },
  {
    id: 'seed-stock-trading',
    name: 'Stock Trading Platform',
    slug: 'stock-trading',
    description:
      'A Robinhood-style trading platform with candlestick chart, buy/sell order form, watchlist panel, portfolio summary, holdings table, and volume bars — designed for stock and crypto trading apps.',
    thumbnail: '/thumbnails/stock-trading.jpg',
    tags: ['Crypto & Trading', 'Desktop'],
    features: [
      '3-Panel Trading Layout',
      'Stock Price Chart',
      'Buy/Sell Order Form',
      'Watchlist Panel',
      'Portfolio Summary Cards',
      'Holdings Table',
      'Volume Bars',
      'Time Range Selector',
    ],
    demoUrl: '/?preview=stock-trading',
    styleVariations: [
      { name: 'Green', fontFamily: 'Inter', bgColor: '#0A0E14', textColor: '#F1F5F9', accentColor: '#22C55E' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0C1220', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#0F0D08', textColor: '#FFF8F0', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Finance', fontFamily: 'IBM Plex Sans, sans-serif', preview: 'TradeX — AAPL $178.42' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'TradeX — AAPL $178.42' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'TradeX — AAPL $178.42' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-property',
    name: 'Mobile Property Finder',
    slug: 'mobile-property',
    description:
      'A Zillow-style property finder with featured listings, filter pills, property cards with specs, price range slider, map toggle, and recently viewed — designed for real estate and property apps.',
    thumbnail: '/thumbnails/property-finder.jpg',
    tags: ['Real Estate', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Featured Property Card',
      'Filter by Type Pills',
      'Property Cards with Specs',
      'Price Range Display',
      'Map View Toggle',
      'Recently Viewed Carousel',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-property',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A2E1A', accentColor: '#10B981' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#2E2A1A', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'HomeFind — $850,000' },
      { name: 'Elegant', fontFamily: 'Playfair Display, serif', preview: 'HomeFind — $850,000' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'HomeFind — $850,000' },
    ],
    reviews: [],
  },
  {
    id: 'seed-support-dashboard',
    name: 'Customer Support Dashboard',
    slug: 'support-dashboard',
    description:
      'A Zendesk-style support dashboard with ticket list, live chat conversation, customer details panel, priority tags, internal notes, and agent assignment — designed for help desk and customer service.',
    thumbnail: '/thumbnails/support-dashboard.jpg',
    tags: ['Chat & Messaging', 'Desktop'],
    features: [
      '4-Column Support Layout',
      'Ticket List with Priority',
      'Live Chat Conversation',
      'Customer Details Panel',
      'Internal Notes',
      'Agent Assignment',
      'Priority & Tag System',
      'Message Input with Actions',
    ],
    demoUrl: '/?preview=support-dashboard',
    styleVariations: [
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#0A0E14', textColor: '#F1F5F9', accentColor: '#06B6D4' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'HelpDesk — 12 open tickets' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'HelpDesk — 12 open tickets' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'HelpDesk — 12 open tickets' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-recipe',
    name: 'Mobile Recipe Detail',
    slug: 'mobile-recipe',
    description:
      'A recipe detail view with hero image, chef info, cooking stats, ingredient checklist, nutrition rings, and start cooking button — designed for food and cooking apps.',
    thumbnail: '/thumbnails/recipe-detail.jpg',
    tags: ['Food & Recipe', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Hero Image with Overlay',
      'Chef Info & Follow',
      'Cooking Stats Row',
      'Ingredient Checklist',
      'Nutrition Progress Rings',
      'Add to Cart Button',
      'Light Warm Theme',
    ],
    demoUrl: '/?preview=mobile-recipe',
    styleVariations: [
      { name: 'Orange', fontFamily: 'Inter', bgColor: '#FFFAF5', textColor: '#2E1A08', accentColor: '#F97316' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#F5FFFA', textColor: '#0A2E1A', accentColor: '#10B981' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#FFF5F7', textColor: '#2E0A12', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Friendly', fontFamily: 'Nunito, sans-serif', preview: 'Pasta Carbonara — 4.9 stars' },
      { name: 'Elegant', fontFamily: 'Playfair Display, serif', preview: 'Pasta Carbonara — 4.9 stars' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'Pasta Carbonara — 4.9 stars' },
    ],
    reviews: [],
  },
  {
    id: 'seed-podcast-studio',
    name: 'Podcast Studio Dashboard',
    slug: 'podcast-studio',
    description:
      'A podcast management dashboard with audio waveform, episode list with status badges, episode detail editor, show notes, tags, analytics cards, and publish controls — designed for podcast hosting platforms.',
    thumbnail: '/thumbnails/podcast-studio.jpg',
    tags: ['Podcast & Audio', 'Desktop'],
    features: [
      '3-Column Studio Layout',
      'Audio Waveform Visualization',
      'Episode List with Status',
      'Episode Detail Editor',
      'Show Notes Rich Text',
      'Tag Management',
      'Analytics Mini Cards',
      'Publish & Schedule',
    ],
    demoUrl: '/?preview=podcast-studio',
    styleVariations: [
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#0F0A0C', textColor: '#FFF0F3', accentColor: '#F43F5E' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#0A0E14', textColor: '#F1F5F9', accentColor: '#06B6D4' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'PodStudio — Tech Talk Daily' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'PodStudio — Tech Talk Daily' },
      { name: 'Bold', fontFamily: 'Montserrat, sans-serif', preview: 'PodStudio — Tech Talk Daily' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-fashion',
    name: 'Mobile Fashion Store',
    slug: 'mobile-fashion',
    description:
      'A luxury fashion e-commerce app with hero banner, category circles, trending product grid with favorites, new arrivals carousel, and premium branding — designed for high-end fashion retail.',
    thumbnail: '/thumbnails/fashion-store.jpg',
    tags: ['Fashion & Beauty', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Hero Collection Banner',
      'Category Circle Nav',
      'Product Grid with Hearts',
      'New Arrivals Carousel',
      'Brand & Price Display',
      'Sale Pricing',
      'Light Elegant Theme',
    ],
    demoUrl: '/?preview=mobile-fashion',
    styleVariations: [
      { name: 'Gold', fontFamily: 'Inter', bgColor: '#FFFCF5', textColor: '#1A1408', accentColor: '#B8860B' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#FFFAFC', textColor: '#2E0A14', accentColor: '#E11D48' },
      { name: 'Black', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#1A1A1A' },
    ],
    fontVariations: [
      { name: 'Elegant', fontFamily: 'Playfair Display, serif', preview: 'LUXE — Autumn Collection' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'LUXE — Autumn Collection' },
      { name: 'Classic', fontFamily: 'Cormorant Garamond, serif', preview: 'LUXE — Autumn Collection' },
    ],
    reviews: [],
  },
  {
    id: 'seed-job-board-dash',
    name: 'Job Board Dashboard',
    slug: 'job-board-dash',
    description:
      'A LinkedIn-style job board with search bar, filter pills, job listing cards with company logos, salary ranges, skill tags, application tracker, skills match bars, and saved jobs — designed for career platforms.',
    thumbnail: '/thumbnails/job-board-dash.jpg',
    tags: ['Jobs & Careers', 'Desktop'],
    features: [
      '3-Column Job Board Layout',
      'Search with Location',
      'Filter by Type Pills',
      'Job Cards with Tags',
      'Application Tracker Rings',
      'Skills Match Bars',
      'Saved Jobs List',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=job-board-dash',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A2E1A', accentColor: '#10B981' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#8B5CF6' },
    ],
    fontVariations: [
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'JobFlow — Senior React Developer' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'JobFlow — Senior React Developer' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'JobFlow — Senior React Developer' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-weather-pro',
    name: 'Mobile Weather Pro',
    slug: 'mobile-weather-pro',
    description:
      'A detailed weather app with current conditions, hourly scroll, 7-day forecast with range bars, weather detail grid, air quality gauge, and dark gradient theme — designed for weather and utility apps.',
    thumbnail: '/thumbnails/weather-pro.jpg',
    tags: ['Weather & Utility', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Current Weather Display',
      'Hourly Forecast Scroll',
      '7-Day Forecast Bars',
      'Weather Detail Grid',
      'Air Quality Gauge',
      'Dark Gradient Theme',
      'Weather SVG Icons',
    ],
    demoUrl: '/?preview=mobile-weather-pro',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0A1628', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A1E', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#081410', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'San Francisco — 23°' },
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'San Francisco — 23°' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'San Francisco — 23°' },
    ],
    reviews: [],
  },
  {
    id: 'seed-crm-pipeline',
    name: 'CRM Sales Pipeline',
    slug: 'crm-pipeline',
    description:
      'A Salesforce-style sales pipeline with kanban board, deal cards with probability bars, pipeline metrics, activity timeline, deal detail panel, and close deal actions — designed for CRM and sales platforms.',
    thumbnail: '/thumbnails/crm-pipeline.jpg',
    tags: ['CRM & Sales', 'Desktop'],
    features: [
      '3-Column Pipeline Layout',
      'Kanban Board Columns',
      'Deal Cards with Probability',
      'Pipeline Revenue Metrics',
      'Activity Timeline',
      'Deal Detail Panel',
      'Contact Info',
      'Close Deal Action',
    ],
    demoUrl: '/?preview=crm-pipeline',
    styleVariations: [
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#0F0D08', textColor: '#FFF8F0', accentColor: '#F59E0B' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0C1220', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Finance', fontFamily: 'IBM Plex Sans, sans-serif', preview: 'SalesForce — $2.4M Pipeline' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'SalesForce — $2.4M Pipeline' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'SalesForce — $2.4M Pipeline' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-food-order',
    name: 'Mobile Food Order Tracker',
    slug: 'mobile-food-order',
    description:
      'A food delivery order tracker with status stepper, estimated time, map with route, driver card, order summary with itemized pricing, and rate & review — designed for food delivery apps.',
    thumbnail: '/thumbnails/food-order-tracker.jpg',
    tags: ['Food Delivery', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Order Status Stepper',
      'Estimated Delivery Time',
      'Map with Route',
      'Driver Info Card',
      'Itemized Order Summary',
      'Total with Delivery Fee',
      'Rate & Review Action',
    ],
    demoUrl: '/?preview=mobile-food-order',
    styleVariations: [
      { name: 'Green', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A2E1A', accentColor: '#22C55E' },
      { name: 'Orange', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#2E1A08', accentColor: '#F97316' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#3B82F6' },
    ],
    fontVariations: [
      { name: 'Friendly', fontFamily: 'Nunito, sans-serif', preview: 'Order #4521 — 15 min' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'Order #4521 — 15 min' },
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'Order #4521 — 15 min' },
    ],
    reviews: [],
  },
  {
    id: 'seed-restaurant-pos',
    name: 'Restaurant POS Dashboard',
    slug: 'restaurant-pos',
    description:
      'A restaurant point-of-sale system with menu grid, category tabs, cart panel with quantity controls, order queue with status badges, pricing summary with tax, and print receipt — designed for restaurant and food service.',
    thumbnail: '/thumbnails/restaurant-pos.jpg',
    tags: ['Food & Restaurant', 'Desktop'],
    features: [
      '3-Column POS Layout',
      'Menu Item Grid',
      'Category Tab Filters',
      'Cart with Qty Controls',
      'Order Queue with Status',
      'Tax & Total Calculation',
      'Place Order Action',
      'Print Receipt Button',
    ],
    demoUrl: '/?preview=restaurant-pos',
    styleVariations: [
      { name: 'Red', fontFamily: 'Inter', bgColor: '#0F0A0A', textColor: '#FFF0F0', accentColor: '#EF4444' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#0F0D08', textColor: '#FFF8F0', accentColor: '#F59E0B' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'BistroOS — Table 5 Order' },
      { name: 'Rounded', fontFamily: 'Nunito, sans-serif', preview: 'BistroOS — Table 5 Order' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'BistroOS — Table 5 Order' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-video',
    name: 'Mobile Video Streaming',
    slug: 'mobile-video',
    description:
      'A Netflix-style streaming app with featured hero, continue watching with progress bars, trending posters, top 10 numbered list, genre categories, and bottom nav — designed for video streaming platforms.',
    thumbnail: '/thumbnails/video-player.jpg',
    tags: ['Video & Streaming', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Featured Hero Banner',
      'Continue Watching Progress',
      'Trending Poster Cards',
      'Top 10 Numbered List',
      'Genre Category Pills',
      'Dark Cinematic Theme',
      'Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-video',
    styleVariations: [
      { name: 'Red', fontFamily: 'Inter', bgColor: '#0A0A0A', textColor: '#F5F5F5', accentColor: '#EF4444' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#0A0E14', textColor: '#F1F5F9', accentColor: '#06B6D4' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'StreamX — Stranger Things' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'StreamX — Stranger Things' },
      { name: 'Bold', fontFamily: 'Montserrat, sans-serif', preview: 'StreamX — Stranger Things' },
    ],
    reviews: [],
  },
  {
    id: 'seed-inventory-mgmt',
    name: 'Inventory Management',
    slug: 'inventory-mgmt',
    description:
      'A warehouse inventory system with product table, stock level bars, stats overview, product detail panel with stock history chart, SKU & barcode info, and reorder controls — designed for inventory and warehouse management.',
    thumbnail: '/thumbnails/inventory-mgmt.jpg',
    tags: ['Admin & CMS', 'Desktop'],
    features: [
      '3-Column Inventory Layout',
      'Product Table with Status',
      'Stock Level Bars',
      'Stats Overview Cards',
      'Product Detail Panel',
      'Stock History Chart',
      'Search & Add Product',
      'Reorder Controls',
    ],
    demoUrl: '/?preview=inventory-mgmt',
    styleVariations: [
      { name: 'Teal', fontFamily: 'Inter', bgColor: '#080E0E', textColor: '#F0FAFA', accentColor: '#14B8A6' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0C1220', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#0F0D08', textColor: '#FFF8F0', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'StockHub — 2,456 Products' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'StockHub — 2,456 Products' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'StockHub — 2,456 Products' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-course',
    name: 'Mobile Course App',
    slug: 'mobile-course',
    description:
      'A Udemy-style course learning app with continue learning progress, popular courses grid with ratings, category circles, top instructors, and bottom navigation — designed for online education platforms.',
    thumbnail: '/thumbnails/course-app.jpg',
    tags: ['Education', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Continue Learning Card',
      'Course Grid with Ratings',
      'Category Circle Nav',
      'Top Instructors Row',
      'Search Courses',
      'Light Theme Design',
      'Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-course',
    styleVariations: [
      { name: 'Indigo', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#6366F1' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A2E1A', accentColor: '#10B981' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#2E0A12', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Friendly', fontFamily: 'Nunito, sans-serif', preview: 'LearnX — React Masterclass' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'LearnX — React Masterclass' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'LearnX — React Masterclass' },
    ],
    reviews: [],
  },
  {
    id: 'seed-social-feed',
    name: 'Social Network Feed',
    slug: 'social-feed',
    description:
      'A Twitter/X-style social feed with create post, post cards with engagement actions, trending topics, who to follow suggestions, and search — designed for social networking platforms.',
    thumbnail: '/thumbnails/social-feed.jpg',
    tags: ['Social Media', 'Desktop'],
    features: [
      '3-Column Social Layout',
      'Create Post with Media',
      'Post Cards with Engagement',
      'Like/Retweet/Comment Actions',
      'Trending Topics',
      'Who to Follow',
      'Search Bar',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=social-feed',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#0F172A', accentColor: '#3B82F6' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#8B5CF6' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#2E0A12', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'ConnectX — Social Feed' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'ConnectX — Social Feed' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'ConnectX — Social Feed' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-hotel',
    name: 'Mobile Hotel Booking',
    slug: 'mobile-hotel',
    description:
      'A Booking.com-style hotel booking app with search dates, featured hotel card, filter pills, popular hotel list, special offer promo, and bottom navigation — designed for travel and booking platforms.',
    thumbnail: '/thumbnails/hotel-booking.jpg',
    tags: ['Travel & Booking', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Date & Guest Search',
      'Featured Hotel Card',
      'Filter by Amenity Pills',
      'Popular Hotel List',
      'Special Offer Promo',
      'Heart Favorites',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-hotel',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A2E1A', accentColor: '#10B981' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#2E2A1A', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Elegant', fontFamily: 'Playfair Display, serif', preview: 'The Ritz-Carlton — $350' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'The Ritz-Carlton — $350' },
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'The Ritz-Carlton — $350' },
    ],
    reviews: [],
  },
  {
    id: 'seed-analytics-dash',
    name: 'Analytics Dashboard',
    slug: 'analytics-dash',
    description:
      'A Google Analytics-style dashboard with KPI cards, traffic chart, traffic sources donut, top pages, device breakdown, and country locations — designed for analytics and reporting platforms.',
    thumbnail: '/thumbnails/analytics-dash.jpg',
    tags: ['Analytics', 'Desktop'],
    features: [
      '2-Column Analytics Layout',
      'KPI Cards with Trends',
      'Traffic Bar Chart',
      'Traffic Sources Donut',
      'Top Pages Table',
      'Device Breakdown Bars',
      'Country Locations',
      'Export & Date Range',
    ],
    demoUrl: '/?preview=analytics-dash',
    styleVariations: [
      { name: 'Indigo', fontFamily: 'Inter', bgColor: '#0C0A1E', textColor: '#F1F0FF', accentColor: '#6366F1' },
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#0A0E14', textColor: '#F1F5F9', accentColor: '#06B6D4' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'DataPulse — 2.4M Views' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'DataPulse — 2.4M Views' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'DataPulse — 2.4M Views' },
    ],
    reviews: [],
  },
  {
    id: 'seed-calendar-planner',
    name: 'Calendar Planner',
    slug: 'calendar-planner',
    description:
      'A Google Calendar-style planner with mini month picker, color-coded calendars, week view time grid with event blocks, today\'s schedule with attendees, and task checklist — designed for productivity and scheduling apps.',
    thumbnail: '/thumbnails/calendar-planner.jpg',
    tags: ['Productivity', 'Desktop'],
    features: [
      '3-Column Calendar Layout',
      'Mini Month Date Picker',
      'Week View Time Grid',
      'Color-Coded Event Blocks',
      'Day/Week/Month Toggle',
      'Today\'s Schedule Panel',
      'Attendee Avatars',
      'Task Checklist',
    ],
    demoUrl: '/?preview=calendar-planner',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#0F172A', accentColor: '#3B82F6' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#8B5CF6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A2E1A', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'PlanIt — October 2024' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'PlanIt — October 2024' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'PlanIt — October 2024' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-crypto-portfolio',
    name: 'Mobile Crypto Portfolio',
    slug: 'mobile-crypto-portfolio',
    description:
      'A Coinbase-style crypto portfolio with total balance, quick actions, timeframe chart, asset list with sparklines, recent transactions, and bottom navigation — designed for crypto and trading apps.',
    thumbnail: '/thumbnails/crypto-portfolio.jpg',
    tags: ['Crypto & Trading', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Total Balance with P&L',
      'Send/Receive/Swap/Buy',
      'Timeframe Line Chart',
      'Asset List with Sparklines',
      'Recent Transactions',
      'Dark Theme Design',
      'Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-crypto-portfolio',
    styleVariations: [
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#0F0D08', textColor: '#FFF8F0', accentColor: '#F59E0B' },
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#0A0E14', textColor: '#F1F5F9', accentColor: '#06B6D4' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'Portfolio — $48,352.80' },
      { name: 'Finance', fontFamily: 'IBM Plex Sans, sans-serif', preview: 'Portfolio — $48,352.80' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'Portfolio — $48,352.80' },
    ],
    reviews: [],
  },
  {
    id: 'seed-music-studio',
    name: 'Music Studio',
    slug: 'music-studio',
    description:
      'An Ableton-style DAW dashboard with track lanes, waveform blocks, mute/solo controls, mixer channels with faders and level meters, transport bar, and master section — designed for music production apps.',
    thumbnail: '/thumbnails/music-studio.jpg',
    tags: ['Music & Entertainment', 'Desktop'],
    features: [
      'DAW Track Lanes',
      'Waveform Blocks',
      'Mute & Solo Controls',
      'Mixer Channel Strips',
      'Transport Controls',
      'BPM & Time Display',
      'Master Level Meters',
      'Waveform Overview',
    ],
    demoUrl: '/?preview=music-studio',
    styleVariations: [
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#0A0E14', textColor: '#F1F5F9', accentColor: '#06B6D4' },
      { name: 'Rose', fontFamily: 'Inter', bgColor: '#140A0C', textColor: '#FFF0F2', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'BeatForge — 128 BPM' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'BeatForge — 128 BPM' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'BeatForge — 128 BPM' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-news',
    name: 'Mobile News Feed',
    slug: 'mobile-news',
    description:
      'A CNN-style news reader with breaking news banner, category tabs, featured article card, trending horizontal scroll, latest articles list, and bottom navigation — designed for news and media apps.',
    thumbnail: '/thumbnails/news-feed.jpg',
    tags: ['Blog & News', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Breaking News Banner',
      'Category Tab Filters',
      'Featured Article Card',
      'Trending Horizontal Scroll',
      'Latest Articles List',
      'Bookmark Toggle',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=mobile-news',
    styleVariations: [
      { name: 'Red', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#EF4444' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A2E1A', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Serif', fontFamily: 'Merriweather, serif', preview: 'NewsWire — Breaking Stories' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'NewsWire — Breaking Stories' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'NewsWire — Breaking Stories' },
    ],
    reviews: [],
  },
  {
    id: 'seed-video-editor',
    name: 'Video Editor',
    slug: 'video-editor',
    description:
      'A Premiere Pro-style video editor with preview monitor, multi-track timeline with clips, properties panel with transform & color controls, transport bar, and project file browser — designed for video production apps.',
    thumbnail: '/thumbnails/video-editor.jpg',
    tags: ['Video & Streaming', 'Desktop'],
    features: [
      'Preview Monitor',
      'Multi-Track Timeline',
      'Clip Arrangement',
      'Properties Panel',
      'Transform Controls',
      'Color Correction Sliders',
      'Transport Controls',
      'Project File Browser',
    ],
    demoUrl: '/?preview=video-editor',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0C1220', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'ClipCraft — 02:34:12' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'ClipCraft — 02:34:12' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'ClipCraft — 02:34:12' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-fitness-dash',
    name: 'Mobile Fitness Dashboard',
    slug: 'mobile-fitness-dash',
    description:
      'A Fitbit-style fitness dashboard with daily goal ring, quick stats grid, weekly activity bar chart, workout list with calories, and bottom navigation — designed for health and fitness apps.',
    thumbnail: '/thumbnails/fitness-dash.jpg',
    tags: ['Health & Fitness', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Daily Goal Progress Ring',
      'Quick Stats Grid',
      'Weekly Activity Chart',
      'Workout List Cards',
      'Calories & Steps Tracking',
      'Light Theme Design',
      'Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-fitness-dash',
    styleVariations: [
      { name: 'Orange', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#F97316' },
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#06B6D4' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#8B5CF6' },
    ],
    fontVariations: [
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'FitPulse — 8,432 Steps' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'FitPulse — 8,432 Steps' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'FitPulse — 8,432 Steps' },
    ],
    reviews: [],
  },
  {
    id: 'seed-spreadsheet',
    name: 'Spreadsheet',
    slug: 'spreadsheet',
    description:
      'A Google Sheets-style spreadsheet with cell selection, formula bar, formatting toolbar, data grid with growth indicators, sheet tabs, and status bar with sum/avg — designed for productivity and data apps.',
    thumbnail: '/thumbnails/spreadsheet.jpg',
    tags: ['Productivity', 'Desktop'],
    features: [
      'Cell Selection & Highlight',
      'Formula Bar',
      'Formatting Toolbar',
      'Data Grid with 10 Rows',
      'Growth Color Indicators',
      'Sheet Tab Navigation',
      'Status Bar (Sum/Avg)',
      'Light Theme Design',
    ],
    demoUrl: '/?preview=spreadsheet',
    styleVariations: [
      { name: 'Green', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#0F172A', accentColor: '#22C55E' },
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#0F172A', accentColor: '#3B82F6' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#8B5CF6' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'GridFlow — $398,950' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'GridFlow — $398,950' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'GridFlow — $398,950' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-restaurant',
    name: 'Mobile Restaurant',
    slug: 'mobile-restaurant',
    description:
      'An UberEats-style restaurant ordering app with delivery address, search, promo banner, category filters, featured restaurants with ratings, popular items, and cart bottom nav — designed for food ordering apps.',
    thumbnail: '/thumbnails/restaurant-app.jpg',
    tags: ['Food & Restaurant', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Delivery Address Header',
      'Search Bar',
      'Promo Banner',
      'Category Pill Filters',
      'Featured Restaurant Cards',
      'Popular Items List',
      'Cart Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-restaurant',
    styleVariations: [
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#10B981' },
      { name: 'Orange', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A1A', accentColor: '#F97316' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#FFFFFF', textColor: '#1A1A2E', accentColor: '#8B5CF6' },
    ],
    fontVariations: [
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'FoodDash — Free Delivery' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'FoodDash — Free Delivery' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'FoodDash — Free Delivery' },
    ],
    reviews: [],
  },
  {
    id: 'seed-code-editor',
    name: 'Code Editor',
    slug: 'code-editor',
    description:
      'A VS Code-style code editor with file explorer tree, syntax-highlighted TypeScript code, tab bar, problems panel with errors/warnings, activity bar, and status bar — designed for developer tool apps.',
    thumbnail: '/thumbnails/code-editor.jpg',
    tags: ['Productivity', 'Desktop'],
    features: [
      'File Explorer Tree',
      'Syntax-Highlighted Code',
      'Tab Bar with Indicators',
      'Problems Panel',
      'Activity Sidebar',
      'Status Bar',
      'Line Numbers',
      'Dark Theme Design',
    ],
    demoUrl: '/?preview=code-editor',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#1E1E2E', textColor: '#CDD6F4', accentColor: '#3B82F6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#1A1814', textColor: '#FFF8F0', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'CodeForge — Ln 10, Col 42' },
      { name: 'Fira', fontFamily: 'Fira Code, monospace', preview: 'CodeForge — Ln 10, Col 42' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'CodeForge — Ln 10, Col 42' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-wallet',
    name: 'Mobile Wallet',
    slug: 'mobile-wallet',
    description:
      'An Apple Wallet-style payment app with card carousel, quick action buttons, transaction list with income/expense indicators, and bottom navigation — designed for fintech and banking apps.',
    thumbnail: '/thumbnails/wallet-app.jpg',
    tags: ['Finance', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Card Carousel',
      'Quick Action Buttons',
      'Transaction List',
      'Income/Expense Indicators',
      'Notification Bell',
      'Dark Theme Design',
      'Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-wallet',
    styleVariations: [
      { name: 'Blue', fontFamily: 'Inter', bgColor: '#0C1220', textColor: '#F1F5F9', accentColor: '#3B82F6' },
      { name: 'Violet', fontFamily: 'Inter', bgColor: '#0C0A14', textColor: '#F1F0FF', accentColor: '#8B5CF6' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'MyWallet — $12,458.50' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'MyWallet — $12,458.50' },
      { name: 'Modern', fontFamily: 'Outfit, sans-serif', preview: 'MyWallet — $12,458.50' },
    ],
    reviews: [],
  },
  {
    id: 'seed-iot-dashboard',
    name: 'IoT Dashboard',
    slug: 'iot-dashboard',
    description: 'A smart home dashboard to monitor and control IoT devices, tracking energy usage and room-specific appliances with a futuristic dark theme.',
    thumbnail: '/thumbnails/iot-dashboard.jpg',
    tags: ['Dashboard', 'Weather & Utility', 'Desktop'],
    features: ['Device Toggle Cards', 'Room Filtering', 'Energy Stats', 'Side Navigation'],
    demoUrl: '/?preview=iot-dashboard',
    styleVariations: [
      { name: 'Cyan', fontFamily: 'Inter', bgColor: '#0F172A', textColor: '#F8FAFC', accentColor: '#06B6D4' },
      { name: 'Amber', fontFamily: 'Inter', bgColor: '#1A1814', textColor: '#FFF8F0', accentColor: '#F59E0B' },
      { name: 'Emerald', fontFamily: 'Inter', bgColor: '#0A0F0C', textColor: '#F0FFF8', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Clean', fontFamily: 'Inter, sans-serif', preview: 'SmartHome — 4.2 kWh' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'SmartHome — 4.2 kWh' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'SmartHome — 4.2 kWh' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-astrology-app',
    name: 'Mobile Astrology',
    slug: 'mobile-astrology',
    description: 'A mobile horoscope and astrology app with starry animated background, daily insights, cosmic alignments, and a cosmic dark aesthetic.',
    thumbnail: '/thumbnails/astrology-app.jpg',
    tags: ['Mobile', 'Weather & Utility', 'Social Profile'],
    features: ['Mobile-First Layout (390px)', 'Starry Gradient Background', 'Zodiac Sign Header', 'Daily Insight Card', 'Compatibility Stats'],
    demoUrl: '/?preview=mobile-astrology',
    styleVariations: [
      { name: 'Indigo', fontFamily: 'Inter', bgColor: '#09090B', textColor: '#FAFAFA', accentColor: '#6366F1' },
      { name: 'Fuchsia', fontFamily: 'Inter', bgColor: '#0A0014', textColor: '#FAFAFA', accentColor: '#D946EF' },
      { name: 'Sky', fontFamily: 'Inter', bgColor: '#081426', textColor: '#F0F9FF', accentColor: '#0EA5E9' },
    ],
    fontVariations: [
      { name: 'Elegant', fontFamily: 'Cinzel, serif', preview: 'Scorpio — Cosmic Alignments' },
      { name: 'Clean', fontFamily: 'Inter, sans-serif', preview: 'Scorpio — Cosmic Alignments' },
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'Scorpio — Cosmic Alignments' },
    ],
    reviews: [],
  },
  {
    id: 'seed-flight-booking',
    name: 'Flight Booking',
    slug: 'flight-booking',
    description:
      'A modern airline search and booking platform with flight search filters, layover breakdown, price trend alerts, amenity pills, and flight details drawers.',
    thumbnail: '/thumbnails/flight-booking.jpg',
    tags: ['Travel & Booking', 'Desktop'],
    features: [
      'Trip Type Selector (Round/One-way)',
      'Origin & Destination Flight Search',
      'Filters for Stops, Airlines & Price',
      'Price Alert Tracking Banner',
      'Layover & Amenities Breakdown Drawer',
    ],
    demoUrl: '/?preview=flight-booking',
    styleVariations: [
      { name: 'Sky', fontFamily: 'Plus Jakarta Sans', bgColor: '#0B132B', textColor: '#F8FAFC', accentColor: '#0284C7' },
      { name: 'Indigo', fontFamily: 'Plus Jakarta Sans', bgColor: '#0F172A', textColor: '#F8FAFC', accentColor: '#6366F1' },
      { name: 'Emerald', fontFamily: 'Plus Jakarta Sans', bgColor: '#081411', textColor: '#F0FDF4', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'SkyFlow — JFK → HND $890' },
      { name: 'Clean', fontFamily: 'Inter, sans-serif', preview: 'SkyFlow — JFK → HND $890' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'SkyFlow — JFK → HND $890' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-coffee-shop',
    name: 'Mobile Coffee Shop',
    slug: 'mobile-coffee-shop',
    description:
      'A specialty coffee ordering app with store locator, Gold rewards points tracker, seasonal drinks menu, drink customization modal, and sticky order checkout bar.',
    thumbnail: '/thumbnails/coffee-shop.jpg',
    tags: ['Food & Restaurant', 'Food Delivery', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Store Locator & Pickup Estimation',
      'Rewards Points Progress Bar',
      'Drink Customizer (Milk, Shots, Syrups)',
      'Fixed Bottom Order Checkout Bar',
    ],
    demoUrl: '/?preview=mobile-coffee-shop',
    styleVariations: [
      { name: 'Amber', fontFamily: 'Plus Jakarta Sans', bgColor: '#16110D', textColor: '#FFF8F2', accentColor: '#D97706' },
      { name: 'Emerald', fontFamily: 'Plus Jakarta Sans', bgColor: '#0C1713', textColor: '#F0FDF4', accentColor: '#059669' },
      { name: 'Rose', fontFamily: 'Plus Jakarta Sans', bgColor: '#190E13', textColor: '#FFF1F2', accentColor: '#E11D48' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'Blue Roastery — $5.95' },
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'Blue Roastery — $5.95' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'Blue Roastery — $5.95' },
    ],
    reviews: [],
  },
  {
    id: 'seed-virtual-conference',
    name: 'Virtual Conference',
    slug: 'virtual-conference',
    description:
      'A full-featured virtual summit stage with live stream player, agenda schedule, live speaker Q&A with upvoting, interactive audience polls, and networking lounge.',
    thumbnail: '/thumbnails/virtual-conference.jpg',
    tags: ['Events & Conference', 'Desktop'],
    features: [
      'Live Stream Player Mockup',
      'Multi-Track Schedule Timeline',
      'Real-Time Emoji Reactions',
      'Live Q&A with Upvoting',
      'Interactive Audience Polls',
      'Networking Lounge Card',
    ],
    demoUrl: '/?preview=virtual-conference',
    styleVariations: [
      { name: 'Violet', fontFamily: 'Plus Jakarta Sans', bgColor: '#0D0C14', textColor: '#F8FAFC', accentColor: '#8B5CF6' },
      { name: 'Cyan', fontFamily: 'Plus Jakarta Sans', bgColor: '#0A1118', textColor: '#F8FAFC', accentColor: '#06B6D4' },
      { name: 'Rose', fontFamily: 'Plus Jakarta Sans', bgColor: '#140A0F', textColor: '#FFF1F2', accentColor: '#F43F5E' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'Nexus Summit — Live Keynote' },
      { name: 'Clean', fontFamily: 'Inter, sans-serif', preview: 'Nexus Summit — Live Keynote' },
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'Nexus Summit — Live Keynote' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-plant-care',
    name: 'Mobile Plant Care',
    slug: 'mobile-plant-care',
    description:
      'A botanical care companion with daily hydration checklists, plant sanctuary health cards, sunlight exposure lux gauge, and care schedule bottom navigation.',
    thumbnail: '/thumbnails/plant-care.jpg',
    tags: ['Wellness', 'Weather & Utility', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Daily Hydration Checklist',
      'Plant Sanctuary Health Cards',
      'Simulated Lux Light Meter Drawer',
      'Fixed Care Bottom Navigation',
    ],
    demoUrl: '/?preview=mobile-plant-care',
    styleVariations: [
      { name: 'Emerald', fontFamily: 'Plus Jakarta Sans', bgColor: '#09140F', textColor: '#F0FDF4', accentColor: '#10B981' },
      { name: 'Amber', fontFamily: 'Plus Jakarta Sans', bgColor: '#18120A', textColor: '#FFFBEB', accentColor: '#F59E0B' },
      { name: 'Teal', fontFamily: 'Plus Jakarta Sans', bgColor: '#081414', textColor: '#F0FDFA', accentColor: '#14B8A6' },
    ],
    fontVariations: [
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'Flora Botanica — 8 Healthy Plants' },
      { name: 'Rounded', fontFamily: 'Quicksand, sans-serif', preview: 'Flora Botanica — 8 Healthy Plants' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'Flora Botanica — 8 Healthy Plants' },
    ],
    reviews: [],
  },
  {
    id: 'seed-drone-mission-control',
    name: 'Drone Mission Control',
    slug: 'drone-telemetry',
    description:
      'A tactical UAV ground control station with artificial horizon telemetry, live optical & thermal vision HUD with AI target tracking, rotating radar sweep, and waypoint mission planner.',
    thumbnail: '/thumbnails/drone-telemetry.jpg',
    tags: ['Dashboard', 'Weather & Utility', 'Desktop'],
    features: [
      'Tactical Flight HUD Overlay',
      'Artificial Horizon Telemetry',
      'Live Optical / Thermal / NVG Modes',
      'Automated Rotating Radar Sweep',
      'Interactive Waypoints Mission Log',
      'Motor & LiPo Power Telemetry',
    ],
    demoUrl: '/?preview=drone-telemetry',
    styleVariations: [
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04080D', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Amber', fontFamily: 'JetBrains Mono', bgColor: '#0A0804', textColor: '#FFFBEB', accentColor: '#F59E0B' },
      { name: 'Emerald', fontFamily: 'JetBrains Mono', bgColor: '#040B07', textColor: '#F0FDF4', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'APEX-07 // 1,240m AGL · 84 km/h' },
      { name: 'Terminal', fontFamily: 'Fira Code, monospace', preview: 'APEX-07 // 1,240m AGL · 84 km/h' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'APEX-07 // 1,240m AGL · 84 km/h' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-beat-studio',
    name: 'Mobile Beat Studio',
    slug: 'mobile-beat-maker',
    description:
      'A pocket cyberpunk groovebox & beatmaker with 16 illuminated velocity drum pads, active 8-step sequencer with running LED playhead, realtime audio waveform visualizer, and low-pass filter rack.',
    thumbnail: '/thumbnails/beat-maker.jpg',
    tags: ['Music & Entertainment', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      '16-Pad Illuminated Drum Grid',
      'Active 8-Step LED Sequencer',
      'Realtime Audio Visualizer Spectrum',
      'Filter Cutoff & Resonance Sliders',
      'Pattern & BPM Tempo Controls',
    ],
    demoUrl: '/?preview=mobile-beat-maker',
    styleVariations: [
      { name: 'Fuchsia', fontFamily: 'JetBrains Mono', bgColor: '#0D0612', textColor: '#FDF4FF', accentColor: '#D946EF' },
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#040D14', textColor: '#F0FDF4', accentColor: '#06B6D4' },
      { name: 'Lime', fontFamily: 'JetBrains Mono', bgColor: '#080D03', textColor: '#F7FEE7', accentColor: '#84CC16' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'GROOVEBOX X-16 — 128 BPM' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'GROOVEBOX X-16 — 128 BPM' },
      { name: 'Clean', fontFamily: 'Inter, sans-serif', preview: 'GROOVEBOX X-16 — 128 BPM' },
    ],
    reviews: [],
  },
  {
    id: 'seed-soc-incident-command',
    name: 'SOC Cyber Threat Command',
    slug: 'soc-command',
    description:
      'A DEFCON 2 security operations center incident command station with real-time global attack vector arcs, raw PCAP packet hex dump inspector, CVE watchlist, and host containment isolation controls.',
    thumbnail: '/thumbnails/soc-command.jpg',
    tags: ['Analytics', 'Dashboard', 'Desktop'],
    features: [
      'DEFCON Alert Status HUD',
      'Global Threat Vector Trajectories',
      'Raw PCAP Packet Hex Inspector',
      'Zero-Day CVE Watchlist & CVSS Scores',
      'Endpoint Isolation Containment Switch',
      'SIEM Real-Time Event Audit Terminal',
    ],
    demoUrl: '/?preview=soc-command',
    styleVariations: [
      { name: 'Crimson', fontFamily: 'JetBrains Mono', bgColor: '#0A0507', textColor: '#FFF1F2', accentColor: '#F43F5E' },
      { name: 'Emerald', fontFamily: 'JetBrains Mono', bgColor: '#040B07', textColor: '#F0FDF4', accentColor: '#10B981' },
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090D', textColor: '#F0FDFA', accentColor: '#06B6D4' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'DEFCON 2 // INC-9041 CRITICAL' },
      { name: 'Terminal', fontFamily: 'Fira Code, monospace', preview: 'DEFCON 2 // INC-9041 CRITICAL' },
      { name: 'Clean', fontFamily: 'Inter, sans-serif', preview: 'DEFCON 2 // INC-9041 CRITICAL' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-rocket-launch',
    name: 'Mobile Rocket Launch Tracker',
    slug: 'mobile-rocket-launch',
    description:
      'An aerospace spaceflight companion with live ticking T-minus launch countdown, pre-flight weather GO/NO-GO checklist, mission staging timeline, and cryogenic propellant telemetry.',
    thumbnail: '/thumbnails/rocket-launch.jpg',
    tags: ['Weather & Utility', 'Mobile', 'Education'],
    features: [
      'Mobile-First Layout (390px)',
      'Live Ticking T-Minus Digital Clock',
      'Weather GO / NO-GO Flight Rules',
      'Launch Staging Sequence Timeline',
      'Orbital Apogee & Telemetry Gauges',
      'Webcast Live Stream Notification',
    ],
    demoUrl: '/?preview=mobile-rocket-launch',
    styleVariations: [
      { name: 'Orange', fontFamily: 'JetBrains Mono', bgColor: '#0D0805', textColor: '#FFF7ED', accentColor: '#F97316' },
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090D', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Violet', fontFamily: 'JetBrains Mono', bgColor: '#0A0612', textColor: '#F5F3FF', accentColor: '#8B5CF6' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'NOVA-IX // T-00:04:12:38' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'NOVA-IX // T-00:04:12:38' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'NOVA-IX // T-00:04:12:38' },
    ],
    reviews: [],
  },
  {
    id: 'seed-neural-studio',
    name: 'Neural Network AI Lab',
    slug: 'neural-studio',
    description:
      'A deep learning architecture lab and model training telemetry suite with real-time loss divergence curves, 8-head attention layer activation heatmaps, hyperparameter tuning, and zero-shot inference probing.',
    thumbnail: '/thumbnails/neural-studio.jpg',
    tags: ['Analytics', 'Productivity', 'Desktop'],
    features: [
      'Model Layer Architecture Stack',
      'Loss vs Step Divergence Graphic',
      '8-Head Attention Activation Heatmap',
      'Hyperparameters LR & Precision Controls',
      'Live Zero-Shot Inference Probe',
      'H100 SXM5 GPU VRAM Telemetry',
    ],
    demoUrl: '/?preview=neural-studio',
    styleVariations: [
      { name: 'Violet', fontFamily: 'JetBrains Mono', bgColor: '#0A0713', textColor: '#F8FAFC', accentColor: '#8B5CF6' },
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090E', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Emerald', fontFamily: 'JetBrains Mono', bgColor: '#040B07', textColor: '#F0FDF4', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'SYNAPSE-X // 184,200 tok/s' },
      { name: 'Terminal', fontFamily: 'Fira Code, monospace', preview: 'SYNAPSE-X // 184,200 tok/s' },
      { name: 'Clean', fontFamily: 'Inter, sans-serif', preview: 'SYNAPSE-X // 184,200 tok/s' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-ev-command',
    name: 'Mobile EV Vehicle Command',
    slug: 'mobile-ev-command',
    description:
      'A connected supercar vehicle telemetry and remote command app with 100 kWh battery pack charging monitor, remote frunk/trunk locks, tri-motor Plaid drive dynamics, and HEPA climate preconditioning.',
    thumbnail: '/thumbnails/ev-command.jpg',
    tags: ['Ride & Transport', 'Weather & Utility', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Structural Battery Pack 418mi Gauge',
      'Remote Frunk & Trunk Lock Controls',
      'Plaid & Track Dynamics Modes',
      'Cabin Climate & Bioweapon Defense',
      '360 Sentry Security AI Monitor',
    ],
    demoUrl: '/?preview=mobile-ev-command',
    styleVariations: [
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090E', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Red', fontFamily: 'JetBrains Mono', bgColor: '#0A0506', textColor: '#FFF1F2', accentColor: '#EF4444' },
      { name: 'Amber', fontFamily: 'JetBrains Mono', bgColor: '#0A0804', textColor: '#FFFBEB', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'APEX GT-R // 418 mi at 91%' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'APEX GT-R // 418 mi at 91%' },
      { name: 'Clean', fontFamily: 'DM Sans, sans-serif', preview: 'APEX GT-R // 418 mi at 91%' },
    ],
    reviews: [],
  },
  {
    id: 'seed-quantum-lab',
    name: 'Quantum Computer Lab',
    slug: 'quantum-lab',
    description:
      'A 128-qubit superconducting transmon quantum circuit simulator and laboratory telemetry suite with 4-qubit wire canvas, Bloch sphere 3D projection, collapse histogram, and 14.2 mK cryo dilution refrigerator monitoring.',
    thumbnail: '/thumbnails/quantum-lab.jpg',
    tags: ['Analytics', 'Productivity', 'Desktop'],
    features: [
      '128 Transmon Qubit QPU Telemetry',
      'Quantum Gate Unitary Matrix Toolbox',
      '4-Wire Interactive Quantum Circuit Canvas',
      'Bloch Sphere State Vector 3D Simulation',
      'Measurement Collapse 10k Shot Histogram',
      '14.2 mK Dilution Cryo Stages Monitor',
    ],
    demoUrl: '/?preview=quantum-lab',
    styleVariations: [
      { name: 'Indigo', fontFamily: 'JetBrains Mono', bgColor: '#080612', textColor: '#F8FAFC', accentColor: '#6366F1' },
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090E', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Emerald', fontFamily: 'JetBrains Mono', bgColor: '#040B07', textColor: '#F0FDF4', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'Q-SYS 128 // 14.2 mK LOCKED' },
      { name: 'Terminal', fontFamily: 'Fira Code, monospace', preview: 'Q-SYS 128 // 14.2 mK LOCKED' },
      { name: 'Clean', fontFamily: 'Space Grotesk, sans-serif', preview: 'Q-SYS 128 // 14.2 mK LOCKED' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-exoplanet-tracker',
    name: 'Mobile Exoplanet Observatory',
    slug: 'mobile-exoplanet-tracker',
    description:
      'A deep space exoplanet radar and atmospheric spectrograph companion with Earth Similarity Index (ESI) scoring, H2O/CO2/CH4 chemical signature breakdown, and AR telescope sky compass alignment.',
    thumbnail: '/thumbnails/exoplanet-tracker.jpg',
    tags: ['Weather & Utility', 'Education', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Goldilocks Habitable Zone Radar',
      'Earth Similarity Index (ESI) Dial',
      'Atmospheric NIRSpec Chemical Spectrograph',
      'TRAPPIST & Kepler Planet Catalog',
      'AR Night Sky Pointing Compass',
    ],
    demoUrl: '/?preview=mobile-exoplanet-tracker',
    styleVariations: [
      { name: 'Purple', fontFamily: 'JetBrains Mono', bgColor: '#0A0612', textColor: '#FAF5FF', accentColor: '#A855F7' },
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090E', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Amber', fontFamily: 'JetBrains Mono', bgColor: '#0D0904', textColor: '#FFFBEB', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'TRAPPIST-1e // ESI 0.95' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'TRAPPIST-1e // ESI 0.95' },
      { name: 'Clean', fontFamily: 'Outfit, sans-serif', preview: 'TRAPPIST-1e // ESI 0.95' },
    ],
    reviews: [],
  },
  {
    id: 'seed-fusion-reactor',
    name: 'Tokamak Fusion Reactor Core',
    slug: 'fusion-reactor',
    description:
      'A magnetic confinement tokamak fusion reactor telemetry console with toroidal plasma cross-section flux modeling, cryogenic D-T ice pellet injection, auxiliary RF/NBI heating meters, Q=10.4 energy gain, and magnet quench protection.',
    thumbnail: '/thumbnails/fusion-reactor.jpg',
    tags: ['Analytics', 'Dashboard', 'Desktop'],
    features: [
      '154M Kelvin Plasma Core Telemetry',
      'Toroidal Nested Magnetic Flux Graphic',
      'Net Positive Energy Gain Q=10.42',
      'Cryogenic D-T Pellet Fuel Injector',
      '71.5 MW Neutral Beam & RF Heating',
      'Emergency Fast Quench Coil Scram',
    ],
    demoUrl: '/?preview=fusion-reactor',
    styleVariations: [
      { name: 'Amber', fontFamily: 'JetBrains Mono', bgColor: '#0D0904', textColor: '#FFFBEB', accentColor: '#F59E0B' },
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090E', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Violet', fontFamily: 'JetBrains Mono', bgColor: '#0A0713', textColor: '#F8FAFC', accentColor: '#8B5CF6' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'HELIOS // 154.2M K · Q=10.4' },
      { name: 'Terminal', fontFamily: 'Fira Code, monospace', preview: 'HELIOS // 154.2M K · Q=10.4' },
      { name: 'Clean', fontFamily: 'Space Grotesk, sans-serif', preview: 'HELIOS // 154.2M K · Q=10.4' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-mech-hangar',
    name: 'Mobile Mech Armory & Hangar',
    slug: 'mobile-mech-hangar',
    description:
      'A combat mech hangar and loadout customizer with 75-ton assault frame armor gauges, modular railgun and plasma armaments, micro-missile hardpoints, neural synapse avionics tuning, and orbital drop pod deployment.',
    thumbnail: '/thumbnails/mech-hangar.jpg',
    tags: ['Music & Entertainment', 'Productivity', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      '75-Ton Titan Assault Frame HUD',
      'Modular Railgun & Plasma Armaments',
      'x32 Micro-Missile Swarm Hardpoint',
      'Neural Synapse AI Link Latency Meter',
      'Orbital Drop Pod Re-entry Trigger',
    ],
    demoUrl: '/?preview=mobile-mech-hangar',
    styleVariations: [
      { name: 'Amber', fontFamily: 'JetBrains Mono', bgColor: '#0D0904', textColor: '#FFFBEB', accentColor: '#F59E0B' },
      { name: 'Crimson', fontFamily: 'JetBrains Mono', bgColor: '#0A0507', textColor: '#FFF1F2', accentColor: '#F43F5E' },
      { name: 'Emerald', fontFamily: 'JetBrains Mono', bgColor: '#040B07', textColor: '#F0FDF4', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'TITAN MK-VII // 72.4 TONS' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'TITAN MK-VII // 72.4 TONS' },
      { name: 'Clean', fontFamily: 'Outfit, sans-serif', preview: 'TITAN MK-VII // 72.4 TONS' },
    ],
    reviews: [],
  },
  {
    id: 'seed-submersible-command',
    name: 'Deep Sea Submersible Command',
    slug: 'submersible-command',
    description:
      'A deep-sea submersible and Mariana Trench exploration console with multibeam bathymetry sonar radar, 4K deep ocean low-light camera, titanium-sphere hull strain gauges, life support scrubbers, and acoustic surface uplink.',
    thumbnail: '/thumbnails/submersible-command.jpg',
    tags: ['Weather & Utility', 'Dashboard', 'Desktop'],
    features: [
      '10,928m Challenger Deep Telemetry',
      '360° Multibeam Bathymetry Sonar',
      '4K Nocturnal Hadal Abyss Camera',
      'Titanium Pressure Sphere Strain Gauges',
      'Oxygen & LiOH Life Support Scrubbers',
      '8.4 kHz Surface Acoustic Transponder',
    ],
    demoUrl: '/?preview=submersible-command',
    styleVariations: [
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#020810', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Emerald', fontFamily: 'JetBrains Mono', bgColor: '#020B07', textColor: '#F0FDF4', accentColor: '#10B981' },
      { name: 'Amber', fontFamily: 'JetBrains Mono', bgColor: '#0A0703', textColor: '#FFFBEB', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'NAUTILUS // 10,928m · 1,086 BAR' },
      { name: 'Terminal', fontFamily: 'Fira Code, monospace', preview: 'NAUTILUS // 10,928m · 1,086 BAR' },
      { name: 'Clean', fontFamily: 'Space Grotesk, sans-serif', preview: 'NAUTILUS // 10,928m · 1,086 BAR' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-cyberdeck',
    name: 'Mobile Cyberdeck Terminal',
    slug: 'mobile-cyberdeck',
    description:
      'A netrunner cyberdeck infiltration terminal with RAM buffer telemetry, executable quick daemons (Short Circuit, Reboot Optics, Synapse Burn), 4x4 Breach Matrix code sequence mini-game, and emergency Jack-Out killswitch.',
    thumbnail: '/thumbnails/cyberdeck.jpg',
    tags: ['Productivity', 'Crypto & Trading', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Subnet Infiltration & RAM Buffer Gauge',
      'Executable Quick Daemons Suite',
      '4x4 Hex Breach Matrix Mini-Game',
      'Real-Time Signal Trace Percentage',
      'Emergency Jack-Out Neural Sever Killswitch',
    ],
    demoUrl: '/?preview=mobile-cyberdeck',
    styleVariations: [
      { name: 'Neon', fontFamily: 'JetBrains Mono', bgColor: '#0A040B', textColor: '#FDF2F8', accentColor: '#EC4899' },
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090E', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Amber', fontFamily: 'JetBrains Mono', bgColor: '#0D0904', textColor: '#FFFBEB', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'ONYX DECK // 64 RAM UNITS' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'ONYX DECK // 64 RAM UNITS' },
      { name: 'Clean', fontFamily: 'Outfit, sans-serif', preview: 'ONYX DECK // 64 RAM UNITS' },
    ],
    reviews: [],
  },
  {
    id: 'seed-particle-collider',
    name: 'Particle Collider Detector Lab',
    slug: 'particle-collider',
    description:
      'A 13.6 TeV high-energy particle physics collider detector console with transverse subatomic track visualizer, invariant mass diphoton Higgs resonance peak histogram, and 40 MHz collision trigger pipeline.',
    thumbnail: '/thumbnails/particle-collider.jpg',
    tags: ['Analytics', 'Dashboard', 'Desktop'],
    features: [
      '13.6 TeV Proton-Proton Beam Telemetry',
      'ATLAS Transverse Detector Event Display',
      'Higgs Boson 125 GeV Invariant Mass Peak',
      'Superfluid 1.9 K Helium-II Cryogenics',
      '40 MHz Level-1 to HLT Trigger System',
      'Emergency Collimator Beam Dump Control',
    ],
    demoUrl: '/?preview=particle-collider',
    styleVariations: [
      { name: 'Indigo', fontFamily: 'JetBrains Mono', bgColor: '#070612', textColor: '#F8FAFC', accentColor: '#6366F1' },
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090E', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Amber', fontFamily: 'JetBrains Mono', bgColor: '#0A0703', textColor: '#FFFBEB', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'ATLAS // 13.6 TeV · 125 GeV' },
      { name: 'Terminal', fontFamily: 'Fira Code, monospace', preview: 'ATLAS // 13.6 TeV · 125 GeV' },
      { name: 'Clean', fontFamily: 'Space Grotesk, sans-serif', preview: 'ATLAS // 13.6 TeV · 125 GeV' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-bionic-arm',
    name: 'Mobile Bionic Limb Controller',
    slug: 'mobile-bionic-arm',
    description:
      'A cybernetic bionic arm companion with 16-channel EMG myoelectric sensor telemetry, interactive grip preset selection (Precision Pinch, Power Fist, Tripod), grip lock toggle, and vibrotactile haptic calibration.',
    thumbnail: '/thumbnails/bionic-arm.jpg',
    tags: ['Health & Fitness', 'Productivity', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'Titanium Cyber-Arm MK-V Telemetry',
      'Multi-Grip Mode Preset Switcher',
      '16-Channel Forearm EMG Sensor Monitor',
      'Grip Lock & Force Readout (120 N)',
      'Vibrotactile Sensory Haptic Feedback',
    ],
    demoUrl: '/?preview=mobile-bionic-arm',
    styleVariations: [
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#04090E', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Purple', fontFamily: 'JetBrains Mono', bgColor: '#0A0612', textColor: '#FAF5FF', accentColor: '#A855F7' },
      { name: 'Amber', fontFamily: 'JetBrains Mono', bgColor: '#0D0904', textColor: '#FFFBEB', accentColor: '#F59E0B' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'NEXUS-V // 16-CH EMG 4.2ms' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'NEXUS-V // 16-CH EMG 4.2ms' },
      { name: 'Clean', fontFamily: 'Outfit, sans-serif', preview: 'NEXUS-V // 16-CH EMG 4.2ms' },
    ],
    reviews: [],
  },
  {
    id: 'seed-smart-city-command',
    name: 'Smart City Autonomous Grid Console',
    slug: 'smart-city-command',
    description:
      'A hyper-dense municipal command center for Tokyo Neo-Arcology monitoring energy grids, autonomous drone transit networks, water purification aquifers, emergency response dispatches, and ionized atmospheric deflectors.',
    thumbnail: '/thumbnails/smart-city.jpg',
    tags: ['Dashboard', 'Weather & Utility', 'Desktop'],
    features: [
      'Tokyo Neo-Arcology 24.5M Population Telemetry',
      'Quantum Fusion Grid & Maglev Transit Radar',
      'Interactive Sector Telemetry Inspector',
      'Autonomous Drone Fleet Dispatch Monitor',
      'Aquifer & Water Purification Subsystem Gauges',
      'Atmospheric Deflector & Weather Dome Status',
    ],
    demoUrl: '/?preview=smart-city-command',
    styleVariations: [
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#030712', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Fuchsia', fontFamily: 'JetBrains Mono', bgColor: '#0A030D', textColor: '#FDF4FF', accentColor: '#D946EF' },
      { name: 'Emerald', fontFamily: 'JetBrains Mono', bgColor: '#020B07', textColor: '#F0FDF4', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'TOKYO NEO-ARCOLOGY // 24.5M POPULATION' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'TOKYO NEO-ARCOLOGY // 24.5M POPULATION' },
      { name: 'Clean', fontFamily: 'Outfit, sans-serif', preview: 'TOKYO NEO-ARCOLOGY // 24.5M POPULATION' },
    ],
    reviews: [],
  },
  {
    id: 'seed-mobile-cyber-pet',
    name: 'Cybernetic AI Companion App',
    slug: 'mobile-cyber-pet',
    description:
      'A mobile companion controller for an autonomous cybernetic robotic pet (A-9 Bolt). Features interactive status commands (Feed Battery, Neural Sync, Ultrasonic Whistle), behavioral stance selector, hardware upgrade slots, and real-time biometric telemetry.',
    thumbnail: '/thumbnails/cyber-pet.jpg',
    tags: ['Wellness', 'Music & Entertainment', 'Mobile'],
    features: [
      'Mobile-First Layout (390px)',
      'A-9 Bolt Cyber-Hound Biometric Vitals',
      'Autonomous Behavioral Mode Presets',
      'Interactive Feeding, Sync & Whistle Controls',
      'Infrared & Ultrasonic Cyber-Augment Modules',
      'Chassis Integrity & LIDAR Perception Gauges',
    ],
    demoUrl: '/?preview=mobile-cyber-pet',
    styleVariations: [
      { name: 'Cyan', fontFamily: 'JetBrains Mono', bgColor: '#030712', textColor: '#F0FDFA', accentColor: '#06B6D4' },
      { name: 'Fuchsia', fontFamily: 'JetBrains Mono', bgColor: '#0A030D', textColor: '#FDF4FF', accentColor: '#D946EF' },
      { name: 'Emerald', fontFamily: 'JetBrains Mono', bgColor: '#020B07', textColor: '#F0FDF4', accentColor: '#10B981' },
    ],
    fontVariations: [
      { name: 'Mono', fontFamily: 'JetBrains Mono, monospace', preview: 'A-9 BOLT // AUTONOMOUS AI CANINE' },
      { name: 'Modern', fontFamily: 'Plus Jakarta Sans, sans-serif', preview: 'A-9 BOLT // AUTONOMOUS AI CANINE' },
      { name: 'Clean', fontFamily: 'Outfit, sans-serif', preview: 'A-9 BOLT // AUTONOMOUS AI CANINE' },
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

  if (seedVersion === '66') {
    return { themes: savedThemes, categories: mergedCategories }
  }

  // Remove old versions of default themes so they get replaced with updated data
  const cleanedThemes = savedThemes.filter((t) => !activeDefaults.some((d) => d.id === t.id))
  const mergedThemes = [...activeDefaults, ...cleanedThemes]

  // Persist to localStorage immediately
  localStorage.setItem(THEMES_KEY, JSON.stringify(mergedThemes))
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(mergedCategories))
  localStorage.setItem(SEEDED_KEY, '66')
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
  'file-manager': FileManager,
  'mobile-events': MobileEventTickets,
  'invoice-dashboard': InvoiceDashboard,
  'mobile-language': MobileLanguageLearning,
  'booking-calendar': BookingCalendar,
  'mobile-habits': MobileHabitTracker,
  'blog-editor': BlogEditor,
  'mobile-parking': MobileParkingFinder,
  'stock-trading': StockTrading,
  'mobile-property': MobilePropertyFinder,
  'support-dashboard': SupportDashboard,
  'mobile-recipe': MobileRecipeDetail,
  'podcast-studio': PodcastStudio,
  'mobile-fashion': MobileFashionStore,
  'job-board-dash': JobBoardDash,
  'mobile-weather-pro': MobileWeatherPro,
  'crm-pipeline': CrmPipeline,
  'mobile-food-order': MobileFoodOrder,
  'restaurant-pos': RestaurantPos,
  'mobile-video': MobileVideoStream,
  'inventory-mgmt': InventoryMgmt,
  'mobile-course': MobileCourseApp,
  'social-feed': SocialFeed,
  'mobile-hotel': MobileHotelBooking,
  'analytics-dash': AnalyticsDash,
  'calendar-planner': CalendarPlanner,
  'mobile-crypto-portfolio': MobileCryptoPortfolio,
  'music-studio': MusicStudio,
  'mobile-news': MobileNewsFeed,
  'video-editor': VideoEditor,
  'mobile-fitness-dash': MobileFitnessDash,
  'spreadsheet': Spreadsheet,
  'mobile-restaurant': MobileRestaurant,
  'code-editor': CodeEditor,
  'mobile-wallet': MobileWallet,

  'iot-dashboard': IotDashboard,
  'mobile-astrology': MobileAstrologyApp,
  'flight-booking': FlightBooking,
  'mobile-coffee-shop': MobileCoffeeShop,
  'virtual-conference': VirtualConference,
  'mobile-plant-care': MobilePlantCare,
  'drone-telemetry': DroneMissionControl,
  'mobile-beat-maker': MobileBeatStudio,
  'soc-command': SocIncidentCommand,
  'mobile-rocket-launch': MobileRocketLaunch,
  'neural-studio': NeuralStudio,
  'mobile-ev-command': MobileEvCommand,
  'quantum-lab': QuantumLab,
  'mobile-exoplanet-tracker': MobileExoplanetTracker,
  'fusion-reactor': FusionReactor,
  'mobile-mech-hangar': MobileMechHangar,
  'submersible-command': SubmersibleCommand,
  'mobile-cyberdeck': MobileCyberdeck,
  'particle-collider': ParticleCollider,
  'mobile-bionic-arm': MobileBionicArm,
  'smart-city-command': SmartCityCommand,
  'mobile-cyber-pet': MobileCyberPet,
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
                <h3 className="text-white font-semibold text-sm">Hapus tema?</h3>
                <p className="text-zinc-500 text-xs mt-0.5">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-6">
              Apakah Anda yakin ingin menghapus <span className="text-white font-medium">"{deleteConfirm.name}"</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-700/60 text-sm text-zinc-300 font-medium hover:bg-zinc-800/60 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-sm text-white font-medium hover:bg-red-600 transition-all cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
