export type UseCase = 'gaming' | 'coding' | 'creator' | 'business' | 'student' | 'budget';

export interface RetailerPrice {
  retailer: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  stockCount?: number;
  url: string;
  isBestDeal?: boolean;
}

export interface ReviewSummary {
  rating: number;
  totalReviews: number;
  pros: string[];
  cons: string[];
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface PricePoint {
  date: string;
  price: number;
  predicted?: boolean;
}

export interface PricePrediction {
  trend: 'dropping' | 'rising' | 'stable';
  expectedChangePercent: number;
  forecastConfidence: number;
  recommendation: 'BUY_NOW' | 'WAIT_FOR_DROP' | 'HISTORICAL_LOW';
  reasoning: string[];
  projectedMinPrice30Days: number;
}

export interface StudentBenefits {
  cashbackAmount: string;
  verificationMethod: string;
  freeBundledPerks: string[];
  extendedWarrantyOffer: string;
  studentPrice?: number;
  studentStoreUrl?: string;
}

export interface CoolingSpecs {
  architecture: string;
  fanCount: number;
  heatpipes: number;
  maxSurfaceTempC: number;
  noiseLevelDb: number;
}

export interface Benchmarks {
  cinebenchR23?: number;
  timeSpyGpu?: number;
  geekbench6Multi?: number;
}

export interface LaptopSpecs {
  cpu: string;
  cpuTier: 'i3/R3' | 'i5/R5' | 'i7/R7/M2/M3' | 'i9/R9/M3Pro/M3Max';
  gpu: string;
  gpuTier: 'Integrated' | 'Entry (RTX 3050/4050)' | 'Mid (RTX 4060/4070)' | 'High (RTX 4080/4090)';
  tgpWatts?: number;
  ramGB: number;
  ramType: string;
  storageGB: number;
  storageType: string;
  displaySize: number;
  resolution: string;
  refreshRate: number;
  weightKg: number;
  batteryHours: number;
  os: string;
}

export interface Laptop {
  id: string;
  name: string;
  brand: string;
  category: UseCase;
  image: string;
  badge?: string;
  powerScore10?: number;
  certifications?: string[];
  studentBenefits?: StudentBenefits; // Student Discounts & Perks
  benchmarks?: Benchmarks;
  coolingSpecs?: CoolingSpecs;
  specs: LaptopSpecs;
  currentBestPrice: number;
  msrp: number;
  maxDiscountPercent: number;
  retailers: RetailerPrice[];
  reviews: ReviewSummary;
  priceHistory: PricePoint[];
  prediction: PricePrediction;
  matchScore?: number;
  matchReasons?: string[];
}

export interface UserPreferences {
  useCase: UseCase;
  budget: number;
  minRam: number;
  minStorage: number;
  preferredBrand?: string;
  minBatteryHours?: number;
  maxWeightKg?: number;
  needsDedicatedGpu?: boolean;
  preferredGpuTier?: string;
  minGpuTgpWatts?: number;
}

export interface MarketTrend {
  component: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  impactDescription: string;
}

export interface SeasonalEvent {
  name: string;
  dateRange: string;
  impactLevel: 'High' | 'Medium' | 'Low';
  expectedDiscount: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impactOnPricing: string;
}
