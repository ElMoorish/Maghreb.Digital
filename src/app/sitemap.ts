import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.maghrib.digital'
  
  // Static pages
  const staticPages = [
    '',
    '/en',
    '/fr',
    '/ar',
    '/en/services/llc-formation',
    '/fr/services/llc-formation',
    '/ar/services/llc-formation',
    '/en/services/web-development',
    '/fr/services/web-development',
    '/ar/services/web-development',
    '/en/services/social-media',
    '/fr/services/social-media',
    '/ar/services/social-media',
    '/en/tools/faq',
    '/fr/tools/faq',
    '/ar/tools/faq',
    '/en/tools/name-checker',
    '/fr/tools/name-checker',
    '/ar/tools/name-checker',
    '/en/privacy',
    '/fr/privacy',
    '/ar/privacy',
    '/en/terms',
    '/fr/terms',
    '/ar/terms',
    '/blog',
  ]

  // Blog posts - French
  const blogPostsFR = [
    'compte-stripe-maroc-guide',
    'creer-llc-usa-depuis-maroc',
    'creer-llc-wyoming-maroc-guide-complet',
    'erreurs-entrepreneurs-marocains',
    'importance-reseaux-sociaux-entreprise',
    'pourquoi-votre-entreprise-a-besoin-site-web',
    'securite-web-proteger-site-clients',
    'stripe-maroc-paiements-internationaux',
  ]

  // Blog posts - English
  const blogPostsEN = [
    'stripe-account-morocco-guide',
    'wyoming-llc-morocco-complete-guide',
    'complete-guide-us-llc-formation-morocco',
    'business-mistakes-moroccan-entrepreneurs-avoid',
    'how-to-choose-web-development-agency',
    'how-to-scale-your-ecommerce',
    'website-security-2025-protecting-business',
    'why-social-media-management-matters',
  ]

  // Blog posts - Arabic
  const blogPostsAR = [
    'انشاء-شركة-llc-في-الولايات-المتحدة',
  ]

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/en' || route === '/fr' || route === '/ar' ? 1 : 0.8,
  }))

  const blogRoutesFR = blogPostsFR.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutesEN = blogPostsEN.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutesAR = blogPostsAR.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutesFR, ...blogRoutesEN, ...blogRoutesAR]
}
