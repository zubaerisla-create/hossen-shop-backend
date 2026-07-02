import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';

// Fallback default CMS contents from the client specifications
const DEFAULT_CMS: Record<string, any> = {
  hero: {
    badgeText: 'Farm-Fresh & Organic',
    headingLine1: 'Nourish your home',
    headingHighlight: "Earth's finest",
    headingLine2: 'with',
    paragraph: 'Fresh, organic groceries delivered from local farms to your doorstep. Quality you can taste, convenience you deserve.',
    btn1Label: 'Shop Now',
    btn1Href: '/products',
    btn2Label: 'Browse Categories',
    btn2Href: '/#categories',
    bgImageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80',
  },
  appBanner: {
    heading: 'Get fresh groceries in minutes',
    paragraph: 'Download the Hossen Shop app for exclusive deals, real-time tracking, and the freshest selection delivered right to your door.',
    appStoreBtnLabel: 'App Store',
    appStoreLink: '#',
    googlePlayBtnLabel: 'Google Play',
    googlePlayLink: '#',
    illustrationImageUrl: '',
  },
  newsletter: {
    heading: 'Subscribe to our Newsletter',
    description: 'Get weekly updates on fresh produce, seasonal offers, and exclusive discounts right to your inbox.',
    buttonText: 'Subscribe',
    inputPlaceholder: 'Enter your email address',
  },
  footer: {
    brandName: 'Hossen Shop',
    brandTagline: "Bringing fresh, organic groceries straight from local farms to your doorstep. Nourish your home with Earth's finest.",
    facebookUrl: '#',
    twitterUrl: '#',
    instagramUrl: '#',
    quickLinks: [
      { id: 'q1', label: 'All Products', href: '/products' },
      { id: 'q2', label: 'Flash Deals', href: '/deals' },
      { id: 'q3', label: 'Track Order', href: '#' },
      { id: 'q4', label: 'Delivery Partner', href: '#' },
    ],
    customerServiceLinks: [
      { id: 'cs1', label: 'My Account', href: '#' },
      { id: 'cs2', label: 'Order History', href: '#' },
      { id: 'cs3', label: 'Addresses', href: '#' },
      { id: 'cs4', label: 'Help Center', href: '#' },
    ],
    address: '123 Green Valley Rd, Portland',
    phone: '+1 (111) 123-4567',
    email: 'hello@example.com',
    copyrightText: '© 2026 Hossen Shop. All rights reserved.',
    privacyPolicyLink: '#',
    termsLink: '#',
  },
  siteSettings: {
    siteName: 'Hossen Shop',
    logoText: 'Hossen Shop',
    navLinks: [
      { id: 'n1', label: 'Home', href: '/' },
      { id: 'n2', label: 'Products', href: '/products' },
      { id: 'n3', label: 'Deals', href: '/deals' },
    ],
  },
  flashPromo: {
    title: 'Fresh Harvest Flash Deals!',
    badge: '⚡ Limited Time Only',
    description: 'Unlock exclusive discounts up to 40% OFF on fresh organic produce. Hand-picked and delivered direct to your door!',
    image: '/images/flash_deal_promo.png',
    buttonText: 'Shop Deals Now',
  },
  flashLine: {
    promoText: 'Flash Deals: Up to 40% OFF Select Fresh Organic Produce!',
    freeDeliveryText: 'Free delivery on orders over $20!',
    discountCodeText: 'Special Discount Code: HOSSEN10',
    linkText: 'Shop Now',
    linkUrl: '/deals',
  },
};

export class CmsService {
  /**
   * Retrieve a CMS setting by its key
   */
  static async getSetting(key: string) {
    const setting = await prisma.siteSetting.findUnique({
      where: { key },
    });

    if (setting) {
      return setting.value;
    }

    // Fallback to default if not configured in database yet
    if (key in DEFAULT_CMS) {
      return DEFAULT_CMS[key];
    }

    throw new ApiError(404, `CMS key '${key}' not found.`);
  }

  /**
   * Update/Upsert a CMS setting by key
   */
  static async updateSetting(key: string, value: any) {
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return setting.value;
  }
}
export default CmsService;
