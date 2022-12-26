import {
  ArchiveBoxIcon,
  BanknotesIcon,
  BellIcon,
  BookmarkSquareIcon,
  CogIcon,
  FireIcon,
  HomeIcon,
  InboxIcon, KeyIcon, MagnifyingGlassCircleIcon, PhotoIcon, ReceiptPercentIcon, SquaresPlusIcon,
  UserIcon
} from "@heroicons/react/24/outline";
export const companyName="Go2Shop";
/*const {data:companyName2}=trpc.company.getOne.useQuery(1);
export const companyName=companyName2?.name;*/
export const companyLogo="/img/logo.png";
export const navigationDashboard = [
  { name: 'Home', href: '/', icon: HomeIcon },
  // { name: 'Trending', href: '#', icon: FireIcon },
  // { name: 'Bookmarks', href: '#', icon: BookmarkSquareIcon },
  { name: 'Messages', href: '/message', icon: InboxIcon },
  { name: 'Profile', href: '/user', icon: UserIcon },
]
export const subNavigationDashboard = [
  {
    name: 'Products',
    description: 'Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.',
    href: '/dashboard/products',
    icon: ArchiveBoxIcon,
    current: false,
  },
  {
    name: 'Account',
    description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
    href: '/dashboard/account',
    icon: CogIcon,
    current: true,
  },
  {
    name: 'Notifications',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    href: '/dashboard/notifications',
    icon: BellIcon,
    current: false,
  },
  /*{
    name: 'Security',
    description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
    href: '/dashboard/security',
    icon: KeyIcon,
    current: false,
  },*/
  {
    name: 'Appearance',
    description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
    href: '/dashboard/appearance',
    icon: PhotoIcon,
    current: false,
  },
  {
    name: 'Billing',
    description: 'Orci aliquam arcu egestas turpis cursus. Lectus faucibus netus dui auctor mauris.',
    href: '/dashboard/billing',
    icon: BanknotesIcon,
    current: false,
  },
/*  {
    name: 'Integrations',
    description: 'Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing pellentesque.',
    href: '/dashboard/integrations',
    icon: SquaresPlusIcon,
    current: false,
  },*/
/*  {
    name: 'Additional Resources',
    description: 'Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.',
    href: '/dashboard/additional-resources',
    icon: MagnifyingGlassCircleIcon,
    current: false,
  },*/
  {
    name: 'Report',
    description: 'Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.',
    href: '/dashboard/report',
    icon: ReceiptPercentIcon,
    current: false,
  },
]
export const footerNavigation = {
  products: [
    { name: 'Bags', href: '/products/Bags' },
    { name: 'Tees', href: '/products/Tees' },
    // { name: 'Objects', href: '#' },
    // { name: 'Home Goods', href: '#' },
    // { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '/support' },
    { name: 'Find a store', href: '/map' },
    // { name: 'Sustainability', href: '#' },
    // { name: 'Press', href: '#' },
    // { name: 'Careers', href: '#' },
    // { name: 'Terms & Conditions', href: '#' },
    // { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '/contact' },
    // { name: 'Shipping', href: '#' },
    // { name: 'Returns', href: '#' },
    // { name: 'Warranty', href: '#' },
    // { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '/FAQ' },
    // { name: 'Find a store', href: '#' },
  ],
}

export const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/products/T-Shirts',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/products/Wallets',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/products/tops' },
            { name: 'Dresses', href: '/products/dresses' },
            { name: 'Pants', href: '/products/Pants' },
            { name: 'Denim', href: '/products/Denim' },
            { name: 'Sweaters', href: '/products/Sweaters' },
            { name: 'T-Shirts', href: '/products/T-Shirts' },
            { name: 'Jackets', href: '/products/Jackets' },
            { name: 'Activewear', href: '/products/Activewear' },
            // { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/products/Watches' },
            { name: 'Wallets', href: '/products/Wallets' },
            { name: 'Bags', href: '/products/Bags' },
            { name: 'Sunglasses', href: '/products/Sunglasses' },
            { name: 'Hats', href: '/products/Hats' },
            { name: 'Belts', href: '/products/Belts' },
          ],
        },
        // {
        //   id: 'brands',
        //   name: 'Brands',
        //   items: [
        //     { name: 'Full Nelson', href: '#' },
        //     { name: 'My Way', href: '#' },
        //     { name: 'Re-Arranged', href: '#' },
        //     { name: 'Counterfeit', href: '#' },
        //     { name: 'Significant Other', href: '#' },
        //   ],
        // },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '/products/T-Shirts',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '/products/Wallets',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/products/tops' },
            { name: 'Pants', href: '/products/Pants' },
            { name: 'Sweaters', href: '/products/Sweaters' },
            { name: 'T-Shirts', href: '/products/T-Shirts' },
            { name: 'Jackets', href: '/products/Jackets' },
            { name: 'Activewear', href: '/products/Activewear' },
            // { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/products/Watches' },
            { name: 'Wallets', href: '/products/Wallets' },
            { name: 'Bags', href: '/products/Bags' },
            { name: 'Sunglasses', href: '/products/Sunglasses' },
            { name: 'Hats', href: '/products/Hats' },
            { name: 'Belts', href: '/products/Belts' },
          ],
        },
        // {
        //   id: 'brands',
        //   name: 'Brands',
        //   items: [
        //     { name: 'Re-Arranged', href: '#' },
        //     { name: 'Counterfeit', href: '#' },
        //     { name: 'Full Nelson', href: '#' },
        //     { name: 'My Way', href: '#' },
        //   ],
        // },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '/support' },
    { name: 'Stores', href: '/map' },
  ],
}