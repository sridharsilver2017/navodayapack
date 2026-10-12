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

  const activeSlideData = SLIDES[currentSlide];

  return (
    <div
      className="relative w-full bg-[#0A1624] text-white overflow-hidden select-none border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Industrial Packaging Hero Showcase"
    >
      {/* Background Slides with Ken Burns motion & Crossfade */}
      <div className="relative h-[620px] sm:h-[660px] lg:h-[720px] w-full overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D2F] via-[#0B1D2F]/90 to-[#0B1D2F]/65" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1624] via-transparent to-black/40" />
              <div className="absolute inset-0 industrial-grid opacity-20" />
            </div>
          );
        })}

        {/* Foreground Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 pb-16">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 animate-in fade-in slide-in-from-left duration-500">
              {/* Top Category Badge */}
              <div className="inline-flex items-center space-x-2.5 bg-blue-950/90 border border-blue-500/40 text-blue-300 text-xs px-3.5 py-1.5 rounded-full font-mono uppercase tracking-wider backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="font-bold text-white">{activeSlideData.badgeCategory}</span>
                <span className="text-blue-400">•</span>
                <span className="text-slate-300 hidden sm:inline">{activeSlideData.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="fluid-hero-title font-extrabold font-display text-white tracking-tight leading-none">
                {activeSlideData.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white block mt-1">
                  {activeSlideData.titleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed text-shadow-sm">
                {activeSlideData.subtitle}
              </p>

              {/* Key Bullet Highlights */}
              <div className="flex flex-wrap gap-2.5 pt-1 text-xs font-mono">
                {activeSlideData.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 bg-slate-900/80 border border-slate-700/80 text-slate-200 px-3 py-1.5 rounded-md backdrop-blur-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to={activeSlideData.primaryLink}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 rounded-md font-semibold text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-98 inline-flex items-center space-x-2 cursor-pointer group"
                >
                  <span>{activeSlideData.primaryLinkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => onRequestQuote(activeSlideData.badgeCategory)}
                  className="bg-slate-800/90 hover:bg-slate-700/90 text-white px-6 py-3.5 rounded-md font-semibold text-sm tracking-wide border border-slate-600 transition-all hover:scale-[1.02] active:scale-98 inline-flex items-center space-x-2 cursor-pointer backdrop-blur-md shadow-lg"
                >
                  <span>Request Instant Quotation</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
                  {/* Subtle top glare */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-transparent" />

                  {/* Header info */}
                  <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-slate-800">
                    <span className="text-blue-400 uppercase font-semibold">
                      {activeSlideData.badgeCategory}
                    </span>
                    <span className="text-slate-400">Kazipally IDA Plant</span>
                  </div>

                  {/* Center Visual */}
                  <div className="relative h-60 w-full flex items-center justify-center p-3 my-2">
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
                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xl font-extrabold font-display text-white">
                          {activeSlideData.statBadge.value}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
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

        {/* Navigation Arrows (Prev / Next) */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/70 hover:bg-blue-600 text-white border border-slate-700/80 hover:border-blue-500 flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/70 hover:bg-blue-600 text-white border border-slate-700/80 hover:border-blue-500 flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Slide Controller Bar */}
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Slide Quick Select Tabs */}
            <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-full border border-slate-700/80 backdrop-blur-md shadow-2xl">
              {SLIDES.map((slide, idx) => {
                const isSelected = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
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

            {/* Play/Pause & Autoplay Status */}
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 bg-slate-900/70 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
                aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
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
