import { Laptop, MarketTrend, SeasonalEvent, NewsItem } from './types';

export const MOCK_LAPTOPS_DATA: Laptop[] = [
  {
    "id": "asus-rog-zephyrus-g16",
    "name": "ASUS ROG Zephyrus G16 (2024)",
    "brand": "ASUS",
    "category": "gaming",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    "badge": "Top Gaming Pick",
    "powerScore10": 9.6,
    "certifications": [
      "NVIDIA Studio Certified",
      "VESA DisplayHDR True Black 500",
      "T\u00dcV Rheinland Low Blue Light",
      "Hi-Res Audio Certified"
    ],
    "studentBenefits": {
      "cashbackAmount": "Flat \u20b95,000 Off with Valid Student ID",
      "verificationMethod": "ASUS Education Store / UNiDAYS",
      "freeBundledPerks": [
        "Free 3 Months Xbox Game Pass Ultimate",
        "Free ROG Gaming Backpack & Mouse",
        "MS Office Home & Student 2021 Lifetime License"
      ],
      "extendedWarrantyOffer": "2-Year Extended Warranty + Accidental Damage Protection for \u20b9999 (Save \u20b95,999)",
      "studentPrice": 149999,
      "studentStoreUrl": "https://www.asus.com/in/deals/education-discount/"
    },
    "benchmarks": {
      "cinebenchR23": 19850,
      "timeSpyGpu": 13450,
      "geekbench6Multi": 14200
    },
    "coolingSpecs": {
      "architecture": "ROG Intelligent Cooling: Tri-Fan Vapor Chamber + Conductonaut Extreme Liquid Metal",
      "fanCount": 3,
      "heatpipes": 6,
      "maxSurfaceTempC": 41.5,
      "noiseLevelDb": 42
    },
    "specs": {
      "cpu": "Intel Core Ultra 9 185H",
      "cpuTier": "i9/R9/M3Pro/M3Max",
      "gpu": "NVIDIA GeForce RTX 4070 (8GB)",
      "gpuTier": "Mid (RTX 4060/4070)",
      "tgpWatts": 140,
      "ramGB": 32,
      "ramType": "LPDDR5X 7467MHz",
      "storageGB": 1024,
      "storageType": "PCIe 4.0 NVMe SSD",
      "displaySize": 16.0,
      "resolution": "2560x1600 OLED 240Hz",
      "refreshRate": 240,
      "weightKg": 1.85,
      "batteryHours": 7.5,
      "os": "Windows 11 Home"
    },
    "currentBestPrice": 154999,
    "msrp": 184999,
    "maxDiscountPercent": 16,
    "retailers": [
      {
        "retailer": "Amazon India",
        "price": 154999,
        "originalPrice": 184999,
        "inStock": true,
        "stockCount": 12,
        "url": "https://www.amazon.in/s?k=ASUS+ROG+Zephyrus+G16+2024",
        "isBestDeal": true
      },
      {
        "retailer": "ASUS Education Store (Student ID)",
        "price": 149999,
        "originalPrice": 184999,
        "inStock": true,
        "stockCount": 20,
        "url": "https://www.asus.com/in/deals/education-discount/"
      },
      {
        "retailer": "Flipkart",
        "price": 159990,
        "originalPrice": 184999,
        "inStock": true,
        "stockCount": 5,
        "url": "https://www.flipkart.com/search?q=ASUS+ROG+Zephyrus+G16+2024"
      }
    ],
    "reviews": {
      "rating": 4.8,
      "totalReviews": 342,
      "pros": [
        "Gorgeous OLED 240Hz screen with 0.2ms response time",
        "Full-Power 140W TGP RTX 4070 GPU delivers high framerates",
        "Tri-Fan Liquid Metal cooling keeps keyboard cool",
        "Ultra-slim CNC aluminum unibody (1.85kg)"
      ],
      "cons": [
        "Soldered RAM cannot be user-upgraded",
        "Slightly warm bottom chassis during 4K stress testing"
      ],
      "sentimentBreakdown": {
        "positive": 91,
        "neutral": 6,
        "negative": 3
      }
    },
    "priceHistory": [
      {
        "date": "2026-05-01",
        "price": 184999
      },
      {
        "date": "2026-06-01",
        "price": 174999
      },
      {
        "date": "2026-07-01",
        "price": 164999
      },
      {
        "date": "2026-08-01",
        "price": 154999
      },
      {
        "date": "2026-09-01",
        "price": 144999,
        "predicted": true
      }
    ],
    "prediction": {
      "trend": "dropping",
      "expectedChangePercent": -6.4,
      "forecastConfidence": 89,
      "recommendation": "BUY_NOW",
      "reasoning": [
        "Current price is near historical low (\u20b91,54,999 vs MSRP \u20b91,84,999)",
        "Upcoming Festive / Diwali sale expected to yield extra \u20b910,000 discount",
        "140W TGP GPU offers maximum framerates without thermal throttling"
      ],
      "projectedMinPrice30Days": 144999
    }
  },
  {
    "id": "apple-macbook-pro-14-m3-pro",
    "name": "Apple MacBook Pro 14\" (M3 Pro)",
    "brand": "Apple",
    "category": "creator",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "badge": "Best for Creative Pros",
    "powerScore10": 9.7,
    "certifications": [
      "Apple Silicon Energy Star Certified",
      "Recycled Aluminum Enclosure Certified",
      "100% P3 Wide Color Gamut Certified",
      "Dolby Atmos & Vision Certified"
    ],
    "studentBenefits": {
      "cashbackAmount": "Save \u20b910,000 Education Discount + Free AirPods Pro (Gen 2)",
      "verificationMethod": "UNiDAYS / Apple Education Store (.ac.in email)",
      "freeBundledPerks": [
        "Free AirPods Pro (Gen 2) with MagSafe Case",
        "Apple Music Student Plan at \u20b959/mo + Free Apple TV+",
        "20% Off AppleCare+ Protection for 3 Years",
        "Final Cut Pro & Logic Pro Student Bundle (60% Off)"
      ],
      "extendedWarrantyOffer": "AppleCare+ for 3 Years at \u20b915,900 (Saved \u20b94,000)",
      "studentPrice": 139900,
      "studentStoreUrl": "https://www.apple.com/in-edu/shop/buy-mac/macbook-pro"
    },
    "benchmarks": {
      "cinebenchR23": 15800,
      "timeSpyGpu": 10500,
      "geekbench6Multi": 15100
    },
    "coolingSpecs": {
      "architecture": "Single High-Efficiency Centrifugal Fan with Anodized Heatpipe Architecture",
      "fanCount": 1,
      "heatpipes": 2,
      "maxSurfaceTempC": 36.0,
      "noiseLevelDb": 24
    },
    "specs": {
      "cpu": "Apple M3 Pro (11-Core CPU, 14-Core GPU)",
      "cpuTier": "i9/R9/M3Pro/M3Max",
      "gpu": "Apple M3 Pro Integrated 14-Core",
      "gpuTier": "Mid (RTX 4060/4070)",
      "tgpWatts": 30,
      "ramGB": 18,
      "ramType": "Unified Memory",
      "storageGB": 512,
      "storageType": "Unified High-Speed SSD",
      "displaySize": 14.2,
      "resolution": "3024x1964 Liquid Retina XDR 120Hz",
      "refreshRate": 120,
      "weightKg": 1.61,
      "batteryHours": 18.0,
      "os": "macOS Sonoma"
    },
    "currentBestPrice": 149990,
    "msrp": 169900,
    "maxDiscountPercent": 11,
    "retailers": [
      {
        "retailer": "Apple Education Store (Student ID)",
        "price": 139900,
        "originalPrice": 169900,
        "inStock": true,
        "stockCount": 50,
        "url": "https://www.apple.com/in-edu/shop/buy-mac/macbook-pro",
        "isBestDeal": true
      },
      {
        "retailer": "Amazon India",
        "price": 149990,
        "originalPrice": 169900,
        "inStock": true,
        "stockCount": 20,
        "url": "https://www.amazon.in/s?k=Apple+MacBook+Pro+14+M3+Pro"
      },
      {
        "retailer": "Flipkart",
        "price": 154900,
        "originalPrice": 169900,
        "inStock": true,
        "stockCount": 15,
        "url": "https://www.flipkart.com/search?q=Apple+MacBook+Pro+14+M3+Pro"
      }
    ],
    "reviews": {
      "rating": 4.9,
      "totalReviews": 512,
      "pros": [
        "Incredible 18-hour real world battery life",
        "Liquid Retina XDR screen with 1600 nits peak brightness",
        "Whisper-silent thermal management (fan rarely spins up)",
        "ProRes hardware video decode acceleration"
      ],
      "cons": [
        "Base model storage is limited to 512GB",
        "Expensive unified memory configuration upgrades"
      ],
      "sentimentBreakdown": {
        "positive": 95,
        "neutral": 4,
        "negative": 1
      }
    },
    "priceHistory": [
      {
        "date": "2026-05-01",
        "price": 169900
      },
      {
        "date": "2026-06-01",
        "price": 159900
      },
      {
        "date": "2026-07-01",
        "price": 154900
      },
      {
        "date": "2026-08-01",
        "price": 149990
      },
      {
        "date": "2026-09-01",
        "price": 144900,
        "predicted": true
      }
    ],
    "prediction": {
      "trend": "dropping",
      "expectedChangePercent": -3.3,
      "forecastConfidence": 92,
      "recommendation": "HISTORICAL_LOW",
      "reasoning": [
        "Currently at lowest recorded price on Amazon India (\u20b91,49,990)",
        "Bank instant discount offers active (HDFC / ICICI extra \u20b95,000 off)",
        "Ultra-efficient GPU draws minimal power while rendering"
      ],
      "projectedMinPrice30Days": 144900
    }
  },
  {
    "id": "lenovo-legion-pro-5i",
    "name": "Lenovo Legion Pro 5i Gen 9",
    "brand": "Lenovo",
    "category": "gaming",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    "badge": "Best Value Gaming",
    "powerScore10": 9.3,
    "certifications": [
      "NVIDIA G-SYNC Certified Display",
      "T\u00dcV Rheinland High Refresh Rate",
      "Nahimic Audio Gaming Certified",
      "MIL-STD-810H Military Standard Tested"
    ],
    "studentBenefits": {
      "cashbackAmount": "Extra 7% Off via Lenovo Edu Store + Instant Bank Discount",
      "verificationMethod": "SheerID / Student ID / College Email",
      "freeBundledPerks": [
        "Free Lenovo Legion Active Gaming Backpack",
        "MS Office Home & Student 2021 Pre-Installed",
        "3 Months Xbox Game Pass Ultimate Subscription"
      ],
      "extendedWarrantyOffer": "3-Year Premium Care + ADP Warranty for \u20b9999 (Saved \u20b97,500)",
      "studentPrice": 102290,
      "studentStoreUrl": "https://www.lenovo.com/in/en/lenovo-edu/"
    },
    "benchmarks": {
      "cinebenchR23": 21500,
      "timeSpyGpu": 12800,
      "geekbench6Multi": 14800
    },
    "coolingSpecs": {
      "architecture": "Lenovo Legion Coldfront 5.0: Dual 3D Blade Fans + 3D Copper Heatpipe Chamber",
      "fanCount": 2,
      "heatpipes": 5,
      "maxSurfaceTempC": 43.0,
      "noiseLevelDb": 46
    },
    "specs": {
      "cpu": "Intel Core i7-14700HX",
      "cpuTier": "i7/R7/M2/M3",
      "gpu": "NVIDIA GeForce RTX 4060 (8GB)",
      "gpuTier": "Mid (RTX 4060/4070)",
      "tgpWatts": 140,
      "ramGB": 16,
      "ramType": "DDR5 5600MHz",
      "storageGB": 1024,
      "storageType": "M.2 NVMe SSD",
      "displaySize": 16.0,
      "resolution": "2560x1600 IPS 240Hz 500 nits",
      "refreshRate": 240,
      "weightKg": 2.5,
      "batteryHours": 5.0,
      "os": "Windows 11 Home"
    },
    "currentBestPrice": 109990,
    "msrp": 134990,
    "maxDiscountPercent": 18,
    "retailers": [
      {
        "retailer": "Lenovo Edu Store (Student Discount)",
        "price": 102290,
        "originalPrice": 134990,
        "inStock": true,
        "stockCount": 15,
        "url": "https://www.lenovo.com/in/en/lenovo-edu/",
        "isBestDeal": true
      },
      {
        "retailer": "Flipkart",
        "price": 109990,
        "originalPrice": 134990,
        "inStock": true,
        "stockCount": 18,
        "url": "https://www.flipkart.com/search?q=Lenovo+Legion+Pro+5i+Gen+9"
      },
      {
        "retailer": "Amazon India",
        "price": 114990,
        "originalPrice": 134990,
        "inStock": true,
        "stockCount": 10,
        "url": "https://www.amazon.in/s?k=Lenovo+Legion+Pro+5i+Gen+9"
      }
    ],
    "reviews": {
      "rating": 4.7,
      "totalReviews": 420,
      "pros": [
        "Full 140W Max TGP RTX 4060 delivers uninterrupted 1440p gaming",
        "Coldfront 5.0 cooling prevents CPU thermal throttling under load",
        "Bright 500-nit 240Hz display with 100% sRGB color accuracy",
        "Upgradable dual SO-DIMM RAM slots and M.2 SSD slots"
      ],
      "cons": [
        "Heavy 2.5kg chassis plus chunky 300W power adapter",
        "Average 5-hour battery life during non-gaming office tasks"
      ],
      "sentimentBreakdown": {
        "positive": 88,
        "neutral": 8,
        "negative": 4
      }
    },
    "priceHistory": [
      {
        "date": "2026-05-01",
        "price": 134990
      },
      {
        "date": "2026-06-01",
        "price": 124990
      },
      {
        "date": "2026-07-01",
        "price": 114990
      },
      {
        "date": "2026-08-01",
        "price": 109990
      },
      {
        "date": "2026-09-01",
        "price": 99990,
        "predicted": true
      }
    ],
    "prediction": {
      "trend": "dropping",
      "expectedChangePercent": -9.0,
      "forecastConfidence": 85,
      "recommendation": "WAIT_FOR_DROP",
      "reasoning": [
        "Price expected to drop below \u20b91,00,000 during upcoming Big Billion Days sale",
        "Full-power 140W GPU delivers maximum 1440p framerates"
      ],
      "projectedMinPrice30Days": 99990
    }
  },
  {
    "id": "macbook-air-13-m3",
    "name": "Apple MacBook Air 13\" (M3)",
    "brand": "Apple",
    "category": "student",
    "image": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    "badge": "Best Student Laptop",
    "powerScore10": 8.8,
    "certifications": [
      "Energy Star 8.0 Certified",
      "EPEAT Gold Certified",
      "100% Recycled Aluminum Body",
      "Apple M3 Neural Engine Certified"
    ],
    "studentBenefits": {
      "cashbackAmount": "Save \u20b910,000 Education Pricing + Free AirPods (Gen 3)",
      "verificationMethod": "UNiDAYS / College ID (.ac.in email)",
      "freeBundledPerks": [
        "Free Apple AirPods (Gen 3) with Lightning Charging Case",
        "Apple Music Student Plan at \u20b959/mo + Free Apple TV+",
        "20% Off AppleCare+ Protection Plan",
        "Free Laser Engraving on Chassis"
      ],
      "extendedWarrantyOffer": "3 Years AppleCare+ Protection for \u20b911,900 (Saved \u20b93,000)",
      "studentPrice": 79900,
      "studentStoreUrl": "https://www.apple.com/in-edu/shop/buy-mac/macbook-air"
    },
    "benchmarks": {
      "cinebenchR23": 10500,
      "timeSpyGpu": 5600,
      "geekbench6Multi": 12100
    },
    "coolingSpecs": {
      "architecture": "Passive Fanless Thermal Heat Spreader (Zero Noise 0dB)",
      "fanCount": 0,
      "heatpipes": 0,
      "maxSurfaceTempC": 38.0,
      "noiseLevelDb": 0
    },
    "specs": {
      "cpu": "Apple M3 (8-Core CPU, 10-Core GPU)",
      "cpuTier": "i5/R5",
      "gpu": "Apple M3 Integrated 10-Core",
      "gpuTier": "Entry (RTX 3050/4050)",
      "tgpWatts": 20,
      "ramGB": 16,
      "ramType": "Unified Memory",
      "storageGB": 512,
      "storageType": "Unified High-Speed SSD",
      "displaySize": 13.6,
      "resolution": "2560x1664 Liquid Retina",
      "refreshRate": 60,
      "weightKg": 1.24,
      "batteryHours": 18.0,
      "os": "macOS Sonoma"
    },
    "currentBestPrice": 89990,
    "msrp": 109900,
    "maxDiscountPercent": 18,
    "retailers": [
      {
        "retailer": "Apple Education Store (Student ID)",
        "price": 79900,
        "originalPrice": 109900,
        "inStock": true,
        "stockCount": 45,
        "url": "https://www.apple.com/in-edu/shop/buy-mac/macbook-air",
        "isBestDeal": true
      },
      {
        "retailer": "Amazon India",
        "price": 89990,
        "originalPrice": 109900,
        "inStock": true,
        "stockCount": 35,
        "url": "https://www.amazon.in/s?k=Apple+MacBook+Air+13+M3"
      },
      {
        "retailer": "Flipkart",
        "price": 93990,
        "originalPrice": 109900,
        "inStock": true,
        "stockCount": 14,
        "url": "https://www.flipkart.com/search?q=Apple+MacBook+Air+13+M3"
      }
    ],
    "reviews": {
      "rating": 4.9,
      "totalReviews": 890,
      "pros": [
        "Ultra thin & lightweight design (only 1.24 kg)",
        "All-day 18-hour battery life on a single charge",
        "Completely fanless 0dB silent operation",
        "Upgraded 16GB RAM model for effortless multitasking"
      ],
      "cons": [
        "Limited to two external monitors when laptop lid is closed",
        "No active cooling fan for prolonged 3D rendering"
      ],
      "sentimentBreakdown": {
        "positive": 96,
        "neutral": 3,
        "negative": 1
      }
    },
    "priceHistory": [
      {
        "date": "2026-05-01",
        "price": 109900
      },
      {
        "date": "2026-06-01",
        "price": 99900
      },
      {
        "date": "2026-07-01",
        "price": 94990
      },
      {
        "date": "2026-08-01",
        "price": 89990
      },
      {
        "date": "2026-09-01",
        "price": 84990,
        "predicted": true
      }
    ],
    "prediction": {
      "trend": "dropping",
      "expectedChangePercent": -5.5,
      "forecastConfidence": 94,
      "recommendation": "HISTORICAL_LOW",
      "reasoning": [
        "16GB RAM upgraded model currently discounted under \u20b990,000",
        "Efficient 20W GPU architecture enables 18-hour real-world battery life"
      ],
      "projectedMinPrice30Days": 84990
    }
  },
  {
    "id": "acer-swift-go-14",
    "name": "Acer Swift Go 14 OLED",
    "brand": "Acer",
    "category": "budget",
    "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    "badge": "Best Budget OLED",
    "powerScore10": 8.5,
    "certifications": [
      "Intel Evo Platform Certified",
      "VESA DisplayHDR True Black 500",
      "T\u00dcV Rheinland EyeSafe Certified",
      "DCI-P3 100% Color Gamut Certified"
    ],
    "studentBenefits": {
      "cashbackAmount": "Flat \u20b94,000 Instant Student Cashback + Free Backpack",
      "verificationMethod": "Student ID Card / College Email",
      "freeBundledPerks": [
        "Free Acer Urban Carry Backpack & Wireless Mouse",
        "MS Office Home & Student 2021 Pre-Activated",
        "1 Year Free McAfee LiveSafe Antivirus"
      ],
      "extendedWarrantyOffer": "2-Year Warranty Extension for \u20b9499 (Saved \u20b93,500)",
      "studentPrice": 54990,
      "studentStoreUrl": "https://store.acer.com/en-in/student-discount"
    },
    "benchmarks": {
      "cinebenchR23": 11800,
      "timeSpyGpu": 3800,
      "geekbench6Multi": 10900
    },
    "coolingSpecs": {
      "architecture": "TwinAir Dual Ring Fan Technology with Copper Heatpipes",
      "fanCount": 2,
      "heatpipes": 2,
      "maxSurfaceTempC": 38.5,
      "noiseLevelDb": 34
    },
    "specs": {
      "cpu": "Intel Core Ultra 5 125H",
      "cpuTier": "i5/R5",
      "gpu": "Intel Arc Graphics",
      "gpuTier": "Integrated",
      "tgpWatts": 28,
      "ramGB": 16,
      "ramType": "LPDDR5X",
      "storageGB": 512,
      "storageType": "PCIe Gen 4 NVMe SSD",
      "displaySize": 14.0,
      "resolution": "2880x1800 OLED 90Hz",
      "refreshRate": 90,
      "weightKg": 1.32,
      "batteryHours": 9.5,
      "os": "Windows 11 Home"
    },
    "currentBestPrice": 58990,
    "msrp": 74990,
    "maxDiscountPercent": 21,
    "retailers": [
      {
        "retailer": "Acer Student Store (College ID)",
        "price": 54990,
        "originalPrice": 74990,
        "inStock": true,
        "stockCount": 30,
        "url": "https://store.acer.com/en-in/student-discount",
        "isBestDeal": true
      },
      {
        "retailer": "Amazon India",
        "price": 58990,
        "originalPrice": 74990,
        "inStock": true,
        "stockCount": 22,
        "url": "https://www.amazon.in/s?k=Acer+Swift+Go+14+OLED"
      },
      {
        "retailer": "Flipkart",
        "price": 61990,
        "originalPrice": 74990,
        "inStock": true,
        "stockCount": 11,
        "url": "https://www.flipkart.com/search?q=Acer+Swift+Go+14+OLED"
      }
    ],
    "reviews": {
      "rating": 4.6,
      "totalReviews": 210,
      "pros": [
        "Unmatched 2.8K 90Hz OLED display under \u20b960,000",
        "Lightweight metal body (1.32 kg) with Intel Evo certification",
        "Intel Arc integrated GPU handles light 1080p gaming",
        "Great I/O port selection including HDMI 2.1 & Thunderbolt 4"
      ],
      "cons": [
        "Built-in speakers lack deep bass",
        "OLED screen consumes higher battery at 100% brightness"
      ],
      "sentimentBreakdown": {
        "positive": 86,
        "neutral": 10,
        "negative": 4
      }
    },
    "priceHistory": [
      {
        "date": "2026-05-01",
        "price": 74990
      },
      {
        "date": "2026-06-01",
        "price": 68990
      },
      {
        "date": "2026-07-01",
        "price": 62990
      },
      {
        "date": "2026-08-01",
        "price": 58990
      },
      {
        "date": "2026-09-01",
        "price": 55990,
        "predicted": true
      }
    ],
    "prediction": {
      "trend": "dropping",
      "expectedChangePercent": -5.0,
      "forecastConfidence": 86,
      "recommendation": "BUY_NOW",
      "reasoning": [
        "Exceptional value score (\u20b958,990 for OLED & Core Ultra processor)",
        "Price unlikely to drop significantly below \u20b955,000 limit"
      ],
      "projectedMinPrice30Days": 55990
    }
  },
  {
    "id": "dell-xps-14-9440",
    "name": "Dell XPS 14 (2024)",
    "brand": "Dell",
    "category": "coding",
    "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    "badge": "Ultrabook Winner",
    "powerScore10": 9.1,
    "certifications": [
      "Intel Evo Edition Certified",
      "Eyesafe Certified Low Blue Light",
      "EPEAT Gold Registered",
      "Dolby Vision & Atmos Certified"
    ],
    "studentBenefits": {
      "cashbackAmount": "Flat \u20b95,000 Off via Dell Student Coupon",
      "verificationMethod": "Dell Student Store / UNiDAYS",
      "freeBundledPerks": [
        "Free Dell Premier Briefcase",
        "MS Office Home & Student 2021 Included",
        "6 Months Adobe CC Photography Plan Vouchers"
      ],
      "extendedWarrantyOffer": "3 Years On-Site Hardware Service + ADP for \u20b91,499 (Saved \u20b98,000)",
      "studentPrice": 137990,
      "studentStoreUrl": "https://www.dell.com/en-in/shop/dell-coupons-codes/cp/dell-coupons-codes"
    },
    "benchmarks": {
      "cinebenchR23": 14900,
      "timeSpyGpu": 8200,
      "geekbench6Multi": 13100
    },
    "coolingSpecs": {
      "architecture": "Dual Opposing Outlet (DOO) Fans with Graphene Thermal Insulation",
      "fanCount": 2,
      "heatpipes": 3,
      "maxSurfaceTempC": 39.5,
      "noiseLevelDb": 36
    },
    "specs": {
      "cpu": "Intel Core Ultra 7 155H",
      "cpuTier": "i7/R7/M2/M3",
      "gpu": "NVIDIA GeForce RTX 4050 (6GB)",
      "gpuTier": "Entry (RTX 3050/4050)",
      "tgpWatts": 50,
      "ramGB": 32,
      "ramType": "LPDDR5X 7467MHz",
      "storageGB": 1024,
      "storageType": "PCIe 4.0 NVMe SSD",
      "displaySize": 14.5,
      "resolution": "3200x2000 OLED Touch 120Hz",
      "refreshRate": 120,
      "weightKg": 1.68,
      "batteryHours": 9.0,
      "os": "Windows 11 Pro"
    },
    "currentBestPrice": 142990,
    "msrp": 169990,
    "maxDiscountPercent": 15,
    "retailers": [
      {
        "retailer": "Dell Student Store (Coupon ID)",
        "price": 137990,
        "originalPrice": 169990,
        "inStock": true,
        "stockCount": 20,
        "url": "https://www.dell.com/en-in/shop/dell-coupons-codes/cp/dell-coupons-codes",
        "isBestDeal": true
      },
      {
        "retailer": "Dell Official Store India",
        "price": 142990,
        "originalPrice": 169990,
        "inStock": true,
        "stockCount": 25,
        "url": "https://www.dell.com/en-in/shop/laptops/xps-14/spd/xps-14-9440-laptop"
      },
      {
        "retailer": "Amazon India",
        "price": 147990,
        "originalPrice": 169990,
        "inStock": true,
        "stockCount": 9,
        "url": "https://www.amazon.in/s?k=Dell+XPS+14+9440"
      }
    ],
    "reviews": {
      "rating": 4.5,
      "totalReviews": 185,
      "pros": [
        "Stunning edge-to-edge 3.2K OLED touch display",
        "Seamless glass haptic touchpad and machined aluminum chassis",
        "32GB ultra-fast RAM handles heavy IDE compilation & VMs",
        "Intel Evo certification guarantees quick wake & long battery"
      ],
      "cons": [
        "Limited port selection (Thunderbolt 4 USB-C only)",
        "Capacitive touch function row lacks physical key travel"
      ],
      "sentimentBreakdown": {
        "positive": 82,
        "neutral": 12,
        "negative": 6
      }
    },
    "priceHistory": [
      {
        "date": "2026-05-01",
        "price": 169990
      },
      {
        "date": "2026-06-01",
        "price": 159990
      },
      {
        "date": "2026-07-01",
        "price": 149990
      },
      {
        "date": "2026-08-01",
        "price": 142990
      },
      {
        "date": "2026-09-01",
        "price": 142990,
        "predicted": true
      }
    ],
    "prediction": {
      "trend": "stable",
      "expectedChangePercent": 0.0,
      "forecastConfidence": 80,
      "recommendation": "BUY_NOW",
      "reasoning": [
        "Dell official store current price (\u20b91,42,990) is stable with member coupon code",
        "50W TGP provides discrete CUDA acceleration while remaining thin and battery-friendly"
      ],
      "projectedMinPrice30Days": 139990
    }
  },
  {
    "id": "razer-blade-16-2024",
    "name": "Razer Blade 16 (2024)",
    "brand": "Razer",
    "category": "gaming",
    "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    "badge": "Ultimate Gaming Beast",
    "powerScore10": 9.9,
    "certifications": [
      "NVIDIA Studio & G-SYNC Certified",
      "Calman Verified Color Accuracy",
      "THX Spatial Audio Certified",
      "VESA ClearMR 11000 Motion Blur Certified"
    ],
    "studentBenefits": {
      "cashbackAmount": "5% Student Discount + Free Chroma Mousepad",
      "verificationMethod": "Razer Education Store / Student Beans",
      "freeBundledPerks": [
        "Free Razer Gigantus V2 Chroma Mouse Mat",
        "3 Months Xbox Game Pass Ultimate",
        "Razer Care Protection 15% Student Discount"
      ],
      "extendedWarrantyOffer": "2-Year RazerCare Elite Warranty for \u20b93,999 (Saved \u20b96,000)",
      "studentPrice": 246990,
      "studentStoreUrl": "https://www.razer.com/education"
    },
    "benchmarks": {
      "cinebenchR23": 28400,
      "timeSpyGpu": 18200,
      "geekbench6Multi": 17800
    },
    "coolingSpecs": {
      "architecture": "Patented Vacuum-Sealed Vapor Chamber + Conductonaut Liquid Metal + Dual 0.5mm Blades",
      "fanCount": 2,
      "heatpipes": 0,
      "maxSurfaceTempC": 42.0,
      "noiseLevelDb": 45
    },
    "specs": {
      "cpu": "Intel Core i9-14900HX",
      "cpuTier": "i9/R9/M3Pro/M3Max",
      "gpu": "NVIDIA GeForce RTX 4080 (12GB)",
      "gpuTier": "High (RTX 4080/4090)",
      "tgpWatts": 175,
      "ramGB": 32,
      "ramType": "DDR5 5600MHz",
      "storageGB": 2048,
      "storageType": "Dual PCIe 4.0 NVMe SSD",
      "displaySize": 16.0,
      "resolution": "2560x1600 OLED 240Hz 0.2ms",
      "refreshRate": 240,
      "weightKg": 2.45,
      "batteryHours": 5.5,
      "os": "Windows 11 Home"
    },
    "currentBestPrice": 259990,
    "msrp": 309990,
    "maxDiscountPercent": 16,
    "retailers": [
      {
        "retailer": "Amazon India",
        "price": 259990,
        "originalPrice": 309990,
        "inStock": true,
        "stockCount": 6,
        "url": "https://www.amazon.in/s?k=Razer+Blade+16+2024",
        "isBestDeal": true
      },
      {
        "retailer": "Razer Student Store (ID)",
        "price": 246990,
        "originalPrice": 309990,
        "inStock": true,
        "stockCount": 10,
        "url": "https://www.razer.com/education"
      },
      {
        "retailer": "Flipkart",
        "price": 269990,
        "originalPrice": 309990,
        "inStock": true,
        "stockCount": 4,
        "url": "https://www.flipkart.com/search?q=Razer+Blade+16+2024"
      }
    ],
    "reviews": {
      "rating": 4.7,
      "totalReviews": 140,
      "pros": [
        "Desktop-rivaling 175W Maximum TGP RTX 4080 GPU performance",
        "World's first 240Hz OLED 16-inch 0.2ms display",
        "Vacuum-sealed Vapor Chamber liquid metal cooling system",
        "Anodized T6 CNC aluminum unibody build"
      ],
      "cons": [
        "Premium high price tag",
        "Heavy 330W GaN power adapter"
      ],
      "sentimentBreakdown": {
        "positive": 89,
        "neutral": 7,
        "negative": 4
      }
    },
    "priceHistory": [
      {
        "date": "2026-05-01",
        "price": 309990
      },
      {
        "date": "2026-06-01",
        "price": 289990
      },
      {
        "date": "2026-07-01",
        "price": 274990
      },
      {
        "date": "2026-08-01",
        "price": 259990
      },
      {
        "date": "2026-09-01",
        "price": 249990,
        "predicted": true
      }
    ],
    "prediction": {
      "trend": "dropping",
      "expectedChangePercent": -3.8,
      "forecastConfidence": 87,
      "recommendation": "HISTORICAL_LOW",
      "reasoning": [
        "Rare \u20b950,000 price drop on Amazon India (\u20b92,59,990)",
        "175W Max TGP delivers full desktop-replacement 4K gaming framerates"
      ],
      "projectedMinPrice30Days": 249990
    }
  }
];

export const MOCK_TRENDS_DATA: MarketTrend[] = [
  {
    "component": "DRAM / RAM Memory",
    "trend": "down",
    "changePercent": -8.5,
    "impactDescription": "DDR5 and LPDDR5 production yield increases are driving laptop RAM upgrade prices down."
  },
  {
    "component": "NAND Flash Storage",
    "trend": "stable",
    "changePercent": 1.2,
    "impactDescription": "Gen 4 NVMe SSD prices have stabilized, keeping 1TB and 2TB storage options affordable."
  },
  {
    "component": "NVIDIA RTX 40-Series GPUs (TGP 140W - 175W)",
    "trend": "down",
    "changePercent": -12.0,
    "impactDescription": "Retailers offering aggressive price cuts on full-power 140W+ TGP RTX 4060/4070/4080 laptop inventory in India."
  },
  {
    "component": "OLED Display Panels",
    "trend": "down",
    "changePercent": -15.4,
    "impactDescription": "Increased OLED panel manufacturing yields bring high-refresh OLED laptops into sub-\u20b960,000 price brackets."
  }
];

export const MOCK_EVENTS_DATA: SeasonalEvent[] = [
  {
    "name": "Diwali & Great Indian Festival Sale",
    "dateRange": "Oct 10 - Nov 05",
    "impactLevel": "High",
    "expectedDiscount": "15% - 30% Off Laptops + Bank Instant Discounts"
  },
  {
    "name": "Back-to-College Sale",
    "dateRange": "Aug 15 - Sep 15",
    "impactLevel": "High",
    "expectedDiscount": "\u20b95,000 - \u20b915,000 Off Student & Coding Laptops"
  },
  {
    "name": "Republic Day Tech Sale",
    "dateRange": "Jan 20 - Jan 26",
    "impactLevel": "Medium",
    "expectedDiscount": "Up to \u20b925,000 Off Gaming Laptops"
  }
];

export const MOCK_NEWS_DATA: NewsItem[] = [
  {
    "id": "news-1",
    "title": "Full-Power 140W TGP Laptop GPU Prices Drop 12% in India",
    "source": "Tech4Gamers India & Digit",
    "date": "August 15, 2026",
    "summary": "Major Indian e-commerce inventory reports show high-power 140W TGP RTX 4060 and 4070 gaming laptops receiving major price cuts.",
    "sentiment": "positive",
    "impactOnPricing": "Favorable for buyers \u2014 expected savings of \u20b910,000 \u2013 \u20b930,000."
  },
  {
    "id": "news-2",
    "title": "OLED Display Surplus Brings Premium Panels to Sub-\u20b960,000 Laptops",
    "source": "TechRadar India",
    "date": "August 12, 2026",
    "summary": "Increased competition among display manufacturers has driven 2.8K 90Hz/120Hz OLED laptop panel costs down by over 15%.",
    "sentiment": "positive",
    "impactOnPricing": "Enables high color accuracy OLED displays on budget models."
  }
];
