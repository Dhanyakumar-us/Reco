import { Laptop, MarketTrend, SeasonalEvent, NewsItem } from './types';

export const MOCK_LAPTOPS_DATA: Laptop[] = [
  {
    id: "asus-rog-zephyrus-g16",
    name: "ASUS ROG Zephyrus G16 (2024)",
    brand: "ASUS",
    category: "gaming",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    badge: "Top Gaming Pick",
    powerScore10: 9.6,
    certifications: [
      "NVIDIA Studio Certified",
      "VESA DisplayHDR True Black 500",
      "TÜV Rheinland Low Blue Light",
      "Hi-Res Audio Certified"
    ],
    studentBenefits: {
      cashbackAmount: "Flat ₹5,000 Off with Valid Student ID",
      verificationMethod: "ASUS Education Store / UNiDAYS",
      freeBundledPerks": [
        "Free 3 Months Xbox Game Pass Ultimate",
        "Free ROG Gaming Backpack & Mouse",
        "MS Office Home & Student 2021 Lifetime License"
      ],
      extendedWarrantyOffer: "2-Year Extended Warranty + Accidental Damage Protection for ₹999 (Save ₹5,999)",
      studentPrice: 149999,
      studentStoreUrl: "https://www.asus.com/in/deals/education-discount/"
    },
    benchmarks: {
      cinebenchR23: 19850,
      timeSpyGpu: 13450,
      geekbench6Multi: 14200
    },
    coolingSpecs: {
      architecture: "ROG Intelligent Cooling: Tri-Fan Vapor Chamber + Conductonaut Extreme Liquid Metal",
      fanCount: 3,
      heatpipes: 6,
      maxSurfaceTempC: 41.5,
      noiseLevelDb: 42
    },
    specs: {
      cpu: "Intel Core Ultra 9 185H",
      cpuTier: "i9/R9/M3Pro/M3Max",
      gpu: "NVIDIA GeForce RTX 4070 (8GB)",
      gpuTier: "Mid (RTX 4060/4070)",
      tgpWatts: 140,
      ramGB: 32,
      ramType: "LPDDR5X 7467MHz",
      storageGB: 1024,
      storageType: "PCIe 4.0 NVMe SSD",
      displaySize: 16.0,
      resolution: "2560x1600 OLED 240Hz",
      refreshRate: 240,
      weightKg: 1.85,
      batteryHours: 7.5,
      os: "Windows 11 Home"
    },
    currentBestPrice: 154999,
    msrp: 184999,
    maxDiscountPercent: 16,
    retailers: [
      { retailer: "Amazon India", price: 154999, originalPrice: 184999, inStock: true, stockCount: 12, url: "https://www.amazon.in/s?k=ASUS+ROG+Zephyrus+G16+2024", isBestDeal: true },
      { retailer: "ASUS Education Store (Student ID)", price: 149999, originalPrice: 184999, inStock: true, stockCount: 20, url: "https://www.asus.com/in/deals/education-discount/" },
      { retailer: "Flipkart", price: 159990, originalPrice: 184999, inStock: true, stockCount: 5, url: "https://www.flipkart.com/search?q=ASUS+ROG+Zephyrus+G16+2024" }
    ],
    reviews: {
      rating: 4.8,
      totalReviews: 342,
      pros: [
        "Gorgeous OLED 240Hz screen with 0.2ms response time",
        "Full-Power 140W TGP RTX 4070 GPU delivers high framerates",
        "Tri-Fan Liquid Metal cooling keeps keyboard cool",
        "Ultra-slim CNC aluminum unibody (1.85kg)"
      ],
      cons: [
        "Soldered RAM cannot be user-upgraded",
        "Slightly warm bottom chassis during 4K stress testing"
      ],
      sentimentBreakdown: { positive: 91, neutral: 6, negative: 3 }
    },
    priceHistory: [
      { date: "May", price: 184999 },
      { date: "Jun", price: 174999 },
      { date: "Jul", price: 164999 },
      { date: "Aug", price: 154999 },
      { date: "Sep (Fcst)", price: 144999, predicted: true }
    ],
    prediction: {
      trend: "dropping",
      expectedChangePercent: -6.4,
      forecastConfidence: 89,
      recommendation: "BUY_NOW",
      reasoning: [
        "Current price is near historical low (₹1,54,999 vs MSRP ₹1,84,999)",
        "140W TGP GPU offers maximum framerates without thermal throttling"
      ],
      projectedMinPrice30Days: 144999
    },
    matchScore: 98,
    matchReasons: ["Fits within target budget", "Full-Power 140W TGP RTX 4070 GPU", "Generous 32GB RAM", "Ultra-smooth OLED 240Hz display"]
  },
  {
    id: "macbook-air-13-m3",
    name: "Apple MacBook Air 13\" (M3)",
    brand: "Apple",
    category: "student",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    badge: "Best Student Laptop",
    powerScore10: 8.8,
    certifications: [
      "Energy Star 8.0 Certified",
      "EPEAT Gold Certified",
      "100% Recycled Aluminum Body",
      "Apple M3 Neural Engine Certified"
    ],
    studentBenefits: {
      cashbackAmount: "Save ₹10,000 Education Pricing + Free AirPods (Gen 3)",
      verificationMethod: "UNiDAYS / College ID (.ac.in email)",
      freeBundledPerks: [
        "Free Apple AirPods (Gen 3) with Lightning Charging Case",
        "Apple Music Student Plan at ₹59/mo + Free Apple TV+",
        "20% Off AppleCare+ Protection Plan",
        "Free Laser Engraving on Chassis"
      ],
      extendedWarrantyOffer: "3 Years AppleCare+ Protection for ₹11,900 (Saved ₹3,000)",
      studentPrice: 79900,
      studentStoreUrl: "https://www.apple.com/in-edu/shop/buy-mac/macbook-air"
    },
    benchmarks: {
      cinebenchR23: 10500,
      timeSpyGpu: 5600,
      geekbench6Multi: 12100
    },
    coolingSpecs: {
      architecture: "Passive Fanless Thermal Heat Spreader (Zero Noise 0dB)",
      fanCount: 0,
      heatpipes: 0,
      maxSurfaceTempC: 38.0,
      noiseLevelDb: 0
    },
    specs: {
      cpu: "Apple M3 (8-Core CPU, 10-Core GPU)",
      cpuTier: "i5/R5",
      gpu: "Apple M3 Integrated 10-Core",
      gpuTier: "Entry (RTX 3050/4050)",
      tgpWatts: 20,
      ramGB: 16,
      ramType: "Unified Memory",
      storageGB: 512,
      storageType: "Unified High-Speed SSD",
      displaySize: 13.6,
      resolution: "2560x1664 Liquid Retina",
      refreshRate: 60,
      weightKg: 1.24,
      batteryHours: 18.0,
      os: "macOS Sonoma"
    },
    currentBestPrice: 89990,
    msrp: 109900,
    maxDiscountPercent: 18,
    retailers: [
      { retailer: "Apple Education Store (Student ID)", price: 79900, originalPrice: 109900, inStock: true, stockCount: 45, url: "https://www.apple.com/in-edu/shop/buy-mac/macbook-air", isBestDeal: true },
      { retailer: "Amazon India", price: 89990, originalPrice: 109900, inStock: true, stockCount: 35, url: "https://www.amazon.in/s?k=Apple+MacBook+Air+13+M3" },
      { retailer: "Flipkart", price: 93990, originalPrice: 109900, inStock: true, stockCount: 14, url: "https://www.flipkart.com/search?q=Apple+MacBook+Air+13+M3" }
    ],
    reviews: {
      rating: 4.9,
      totalReviews: 890,
      pros: [
        "Ultra thin & lightweight design (only 1.24 kg)",
        "All-day 18-hour battery life on a single charge",
        "Completely fanless 0dB silent operation",
        "Upgraded 16GB RAM model for effortless multitasking"
      ],
      cons: [
        "Limited to two external monitors when laptop lid is closed",
        "No active cooling fan for prolonged 3D rendering"
      ],
      sentimentBreakdown: { positive: 96, neutral: 3, negative: 1 }
    },
    priceHistory: [
      { date: "May", price: 109900 },
      { date: "Jun", price: 99900 },
      { date: "Jul", price: 94990 },
      { date: "Aug", price: 89990 },
      { date: "Sep (Fcst)", price: 84990, predicted: true }
    ],
    prediction: {
      trend: "dropping",
      expectedChangePercent: -5.5,
      forecastConfidence: 94,
      recommendation: "HISTORICAL_LOW",
      reasoning: [
        "16GB RAM upgraded model currently discounted under ₹90,000",
        "Efficient 20W GPU architecture enables 18-hour real-world battery life"
      ],
      projectedMinPrice30Days: 84990
    },
    matchScore: 89,
    matchReasons: ["Ultra-portable 1.24kg build", "18-hour battery life", "Silent fanless M3 processor"]
  }
];

export const MOCK_TRENDS_DATA: MarketTrend[] = [
  {
    component: "DRAM / RAM Memory",
    trend: "down",
    changePercent: -8.5,
    impactDescription: "DDR5 and LPDDR5 production yield increases are driving laptop RAM upgrade prices down."
  },
  {
    component: "NAND Flash Storage",
    trend: "stable",
    changePercent: 1.2,
    impactDescription: "Gen 4 NVMe SSD prices have stabilized, keeping 1TB and 2TB storage options affordable."
  },
  {
    component: "NVIDIA RTX 40-Series GPUs (TGP 140W - 175W)",
    trend: "down",
    changePercent: -12.0,
    impactDescription: "Retailers offering aggressive price cuts on full-power 140W+ TGP RTX 4060/4070/4080 laptop inventory in India."
  },
  {
    component: "OLED Display Panels",
    trend: "down",
    changePercent: -15.4,
    impactDescription: "Increased OLED panel manufacturing yields bring high-refresh OLED laptops into sub-₹60,000 price brackets."
  }
];

export const MOCK_EVENTS_DATA: SeasonalEvent[] = [
  {
    name: "Diwali & Great Indian Festival Sale",
    dateRange: "Oct 10 - Nov 05",
    impactLevel: "High",
    expectedDiscount: "15% - 30% Off Laptops + Bank Instant Discounts"
  },
  {
    name: "Back-to-College Sale",
    dateRange: "Aug 15 - Sep 15",
    impactLevel: "High",
    expectedDiscount: "₹5,000 - ₹15,000 Off Student & Coding Laptops"
  },
  {
    name: "Republic Day Tech Sale",
    dateRange: "Jan 20 - Jan 26",
    impactLevel: "Medium",
    expectedDiscount: "Up to ₹25,000 Off Gaming Laptops"
  }
];

export const MOCK_NEWS_DATA: NewsItem[] = [
  {
    id: "news-1",
    title: "Full-Power 140W TGP Laptop GPU Prices Drop 12% in India",
    source: "Tech4Gamers India & Digit",
    date: "August 15, 2026",
    summary: "Major Indian e-commerce inventory reports show high-power 140W TGP RTX 4060 and 4070 gaming laptops receiving major price cuts.",
    sentiment: "positive",
    impactOnPricing: "Favorable for buyers — expected savings of ₹10,000 – ₹30,000."
  },
  {
    id: "news-2",
    title: "OLED Display Surplus Brings Premium Panels to Sub-₹60,000 Laptops",
    source: "TechRadar India",
    date: "August 12, 2026",
    summary: "Increased competition among display manufacturers has driven 2.8K 90Hz/120Hz OLED laptop panel costs down by over 15%.",
    sentiment: "positive",
    impactOnPricing: "Enables high color accuracy OLED displays on budget models."
  }
];
