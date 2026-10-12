import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Pause,
  Play,
} from 'lucide-react';

interface SlideItem {
  id: string;
  badge: string;
  badgeCategory: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  highlights: string[];
  primaryLink: string;
  primaryLinkText: string;
  image: string;
  cutoutImage?: string;
  statBadge?: {
    value: string;
    label: string;
  };
}

const SLIDES: SlideItem[] = [
  {
    id: 'hdpe',
    badge: 'Blow Moulding Technology • Kazipally IDA',
    badgeCategory: 'HDPE DRUMS',
    title: 'Precision Engineered',
    titleHighlight: 'HDPE Industrial Drums',
    subtitle:
      'Manufactured from 100% virgin high-molecular HDPE resin for active pharmaceutical ingredients (APIs), aggressive industrial chemicals, and commercial hazardous containment.',
    highlights: ['6L to 120L Capacity Spectrum', 'Leak-proof Bung & Full-Open Lids', 'Drop & Stack Tested'],
    primaryLink: '/hdpe-drums',
    primaryLinkText: 'Explore HDPE Drums',
    image: '/images/hero/hero_hdpe.jpg',
    cutoutImage: '/images/hdpe_all.png',
    statBadge: {
      value: '15 Models',
      label: 'Standard & Custom Sizing',
    },
  },
  {
    id: 'fiber',
    badge: 'Multi-Ply Kraft Board • Sustainable Containment',
    badgeCategory: 'FIBRE DRUMS',
    title: 'High-Tensile Structural',
    titleHighlight: 'Fibre Drums & Chimes',
    subtitle:
      'Rigid cylindrical kraft paperboard drums bound with galvanized steel chimes and lever locking rings, engineered for high-purity pharmaceutical powders, chemicals, and solid commodities.',
    highlights: ['10" to 20" Diameter Standards', 'Heavy-Duty Galvanized Chimes', 'Pilfer-Proof Lever Closures'],
    primaryLink: '/fiber-drums',
    primaryLinkText: 'Explore Fibre Drums',
    image: '/images/hero/hero_fiber.jpg',
    cutoutImage: '/images/fiber_all.png',
    statBadge: {
      value: '7 Diameters',
      label: 'Custom Height Options',
    },
  },
  {
    id: 'composite',
    badge: 'Hermetic Foil Lining • Cleanroom Packaging',
    badgeCategory: 'COMPOSITE CONTAINERS',
    title: 'Precision Cylindrical',
    titleHighlight: 'Composite Canisters',
    subtitle:
      'High-barrier composite canisters with airtight aluminium foil lining and secure tinplate closures designed for fine bulk chemicals, agrochemicals, spices, and nutraceuticals.',
    highlights: ['75mm Precision Diameter', 'Hermetic Moisture Barrier', 'Custom Printable Body'],
    primaryLink: '/composite-containers',
    primaryLinkText: 'Explore Canisters',
    image: '/images/hero/hero_composite.jpg',
    statBadge: {
      value: 'Zero-Moisture',
      label: 'Foil Barrier Sealed',
    },
  },
  {
    id: 'logistics',
    badge: 'Enterprise Supply • Certified Quality',
    badgeCategory: 'PRODUCTION & DISPATCH',
    title: 'Industrial Scale Supply &',
    titleHighlight: 'Pharma Client Trust',
    subtitle:
      'Trusted packaging partner to over 35+ premier pharmaceutical corporations across Telangana and India. Rapid turnaround, consistent wall thickness, and reliable logistics.',
    highlights: ['ISO Benchmark Quality', '35+ Pharma Enterprise Clients', 'Daily Plant Dispatches'],
    primaryLink: '/products',
    primaryLinkText: 'View All 25 Products',
    image: '/images/hero/hero_logistics.jpg',
    statBadge: {
      value: '35+ Clients',
      label: 'Pharma & Chemical Leaders',
    },
  },
];

const SLIDE_DURATION = 6500; // 6.5s per slide

interface HeroSliderProps {
  onRequestQuote: (preselectedProduct?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onRequestQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);

  const totalSlides = SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Timer for progress bar and auto-sliding
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalStep = 50; // ms
    const increment = (intervalStep / SLIDE_DURATION) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          nextSlide();
          return 0;
        }
        return oldProgress + increment;
      });
    }, intervalStep);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentSlide, isPaused]);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const activeSlideData = SLIDES[currentSlide];

  return (
    <div
      className="relative w-full bg-[#0A1624] text-white overflow-hidden select-none border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Industrial Packaging Hero Showcase"
    >
      {/* Slider Container with responsive min-height and clear bottom buffer */}
      <div className="relative min-h-[660px] sm:min-h-[680px] lg:min-h-[720px] w-full overflow-hidden flex flex-col justify-between">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Slow Zoom Effect */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Deep Multi-Layer Vignette & Corporate Navy Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D2F] via-[#0B1D2F]/92 to-[#0B1D2F]/65" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1624] via-transparent to-black/40" />
              <div className="absolute inset-0 industrial-grid opacity-20" />
            </div>
          );
        })}

        {/* Foreground Content Container - safe padding on all breakpoints prevents any overlap */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 lg:px-8 pt-8 sm:pt-12 lg:pt-14 pb-28 sm:pb-32 lg:pb-36 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4 animate-in fade-in slide-in-from-left duration-500">
              {/* Top Category Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-950/90 border border-blue-500/40 text-blue-300 text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="font-bold text-white">{activeSlideData.badgeCategory}</span>
                <span className="text-blue-400">•</span>
                <span className="text-slate-300 hidden sm:inline">{activeSlideData.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold font-display text-white tracking-tight leading-[1.15]">
                {activeSlideData.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white block sm:inline lg:block">
                  {activeSlideData.titleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm lg:text-base text-slate-200 max-w-xl font-normal leading-relaxed text-shadow-sm">
                {activeSlideData.subtitle}
              </p>

              {/* Key Bullet Highlights */}
              <div className="flex flex-wrap gap-2 pt-0.5 text-xs font-mono">
                {activeSlideData.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-1.5 bg-slate-900/85 border border-slate-700/80 text-slate-200 px-2.5 py-1 rounded text-[11px] backdrop-blur-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={activeSlideData.primaryLink}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-98 inline-flex items-center space-x-2 cursor-pointer group"
                >
                  <span>{activeSlideData.primaryLinkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => onRequestQuote(activeSlideData.badgeCategory)}
                  className="bg-slate-800/90 hover:bg-slate-700/90 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-semibold text-xs sm:text-sm tracking-wide border border-slate-600 transition-all hover:scale-[1.02] active:scale-98 inline-flex items-center space-x-2 cursor-pointer backdrop-blur-md shadow-lg"
                >
                  <span>Request Instant Quotation</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <div className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
                  {/* Subtle top glare */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent" />

                  {/* Header info */}
                  <div className="flex items-center justify-between text-xs font-mono pb-2.5 border-b border-slate-800">
                    <span className="text-blue-400 uppercase font-semibold">
                      {activeSlideData.badgeCategory}
                    </span>
                    <span className="text-slate-400 text-[11px]">Kazipally IDA Plant</span>
                  </div>

                  {/* Center Visual */}
                  <div className="relative h-48 sm:h-52 w-full flex items-center justify-center p-2 my-2">
                    {activeSlideData.cutoutImage ? (
                      <img
                        src={activeSlideData.cutoutImage}
                        alt={activeSlideData.title}
                        className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl overflow-hidden relative border border-slate-800">
                        <img
                          src={activeSlideData.image}
                          alt={activeSlideData.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      </div>
                    )}
                  </div>

                  {/* Stat badge footer */}
                  {activeSlideData.statBadge && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-lg font-extrabold font-display text-white">
                          {activeSlideData.statBadge.value}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {activeSlideData.statBadge.label}
                        </div>
                      </div>
                      <Link
                        to={activeSlideData.primaryLink}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                      >
                        <span>Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows (Prev / Next) - Desktop & Tablet only */}
        <button
          type="button"
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700/80 hover:border-blue-500 items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700/80 hover:border-blue-500 items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Slide Controller Bar - strictly anchored with high z-index and clean backdrop */}
        <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-30 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            {/* Slide Quick Select Tabs with Mobile Arrow Controls */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={prevSlide}
                className="md:hidden w-8 h-8 rounded-full bg-slate-900/90 border border-slate-700/80 text-white flex items-center justify-center hover:bg-blue-600 active:scale-90 transition-all shadow-lg cursor-pointer shrink-0"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-full border border-slate-700/80 backdrop-blur-md shadow-2xl overflow-x-auto max-w-full">
                {SLIDES.map((slide, idx) => {
                  const isSelected = idx === currentSlide;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center space-x-1.5 shrink-0 ${
                        isSelected
                          ? 'bg-[#2563EB] text-white font-bold shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>0{idx + 1}</span>
                      <span className="hidden md:inline">{slide.badgeCategory}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                className="md:hidden w-8 h-8 rounded-full bg-slate-900/90 border border-slate-700/80 text-white flex items-center justify-center hover:bg-blue-600 active:scale-90 transition-all shadow-lg cursor-pointer shrink-0"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Play/Pause & Autoplay Status */}
            <div className="flex items-center space-x-2.5 text-xs font-mono text-slate-400 bg-slate-900/85 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md shrink-0">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
                aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              >
                {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
                <span className="text-[10px] uppercase">{isPaused ? 'Paused' : 'Auto'}</span>
              </button>
              <span className="text-slate-600">|</span>
              <span className="text-[10px] text-slate-300">
                0{currentSlide + 1} / 0{totalSlides}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Linear Progress Bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80 z-30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
