import { siteConfig } from "@/config/site";

/**
 * JSON-LD structured data for rich search results.
 * Rendered once in the root layout.
 */
export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: "660 Mission Street",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          addressCountry: "US",
        },
        sameAs: [
          siteConfig.links.twitter,
          siteConfig.links.linkedin,
          siteConfig.links.instagram,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        image: `${siteConfig.url}/opengraph-image`,
        url: siteConfig.url,
        telephone: siteConfig.phone,
        priceRange: "$$$",
        areaServed: "Worldwide",
      },
    ],
  };
}
