export const SEVERITY_LEVELS = {
  ERROR: 'error',
  WARNING: 'warning',
  NOTICE: 'notice'
};

export const ISSUE_CATEGORIES = {
  HTTP_STATUS: 'HTTP Status Codes',
  TITLES: 'Titles',
  META_DESCRIPTIONS: 'Meta Descriptions',
  HEADINGS: 'Headings (H1-H6)',
  CONTENT: 'Content',
  CANONICALS: 'Canonical Tags',
  INDEXABILITY: 'Indexability',
  LINKS: 'Links',
  REDIRECTS: 'Redirects',
  IMAGES: 'Images',
  PERFORMANCE: 'Performance',
  CORE_WEB_VITALS: 'Core Web Vitals',
  MOBILE: 'Mobile Usability',
  STRUCTURED_DATA: 'Structured Data',
  SOCIAL_TAGS: 'Social Tags',
  LOCALIZATION: 'Localization (Hreflang)',
  SITEMAPS: 'Sitemaps',
  ROBOTS_TXT: 'Robots.txt',
  SECURITY: 'Security & HTTPS'
};

export const ISSUE_TYPES = [
  {
    id: '4xx_page',
    name: '4XX page',
    category: ISSUE_CATEGORIES.HTTP_STATUS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page returns a 4XX client error status code (404, 403, 410, etc.). These pages are inaccessible to users and search engines.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: '5xx_page',
    name: '5XX page',
    category: ISSUE_CATEGORIES.HTTP_STATUS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page returns a 5XX server error status code (500, 502, 503, 504). Server-side errors prevent access.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: '3xx_redirect',
    name: '3XX redirect',
    category: ISSUE_CATEGORIES.HTTP_STATUS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page redirects to another URL via 301, 302, 307, or 308 status code.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'timeout',
    name: 'Timeout',
    category: ISSUE_CATEGORIES.HTTP_STATUS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page request timed out during the crawl. Server may be slow or unresponsive.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'blocked_by_robots_txt',
    name: 'Blocked by robots.txt',
    category: ISSUE_CATEGORIES.HTTP_STATUS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page is blocked from crawling by robots.txt directives.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'low'
  },
  {
    id: 'broken_internal_link',
    name: 'Has broken internal link',
    category: ISSUE_CATEGORIES.HTTP_STATUS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page contains at least one internal link pointing to a broken page (4XX, 5XX).',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'broken_external_link',
    name: 'Has broken external link',
    category: ISSUE_CATEGORIES.HTTP_STATUS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page contains at least one external link pointing to a broken page (4XX, 5XX).',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'missing_title',
    name: 'Title tag missing or empty',
    category: ISSUE_CATEGORIES.TITLES,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page has no title tag or the title tag is empty. Title tags are critical for SEO.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'low'
  },
  {
    id: 'duplicate_title',
    name: 'Duplicate title tag',
    category: ISSUE_CATEGORIES.TITLES,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Multiple pages share the same title tag. Each page should have a unique title.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'title_too_long',
    name: 'Title tag too long',
    category: ISSUE_CATEGORIES.TITLES,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Title tag exceeds 60 characters. Google typically displays the first 50-60 characters in search results.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'title_too_short',
    name: 'Title tag too short',
    category: ISSUE_CATEGORIES.TITLES,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Title tag is shorter than 30 characters. May not provide enough information to users.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'multiple_title_tags',
    name: 'Multiple title tags',
    category: ISSUE_CATEGORIES.TITLES,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page has more than one title tag. Only one title tag should exist per page.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'missing_meta_description',
    name: 'Meta description missing or empty',
    category: ISSUE_CATEGORIES.META_DESCRIPTIONS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page has no meta description or it is empty. Meta descriptions influence click-through rates in search results.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'duplicate_meta_description',
    name: 'Duplicate meta description',
    category: ISSUE_CATEGORIES.META_DESCRIPTIONS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Multiple pages share the same meta description. Each page should have a unique description.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'meta_description_too_long',
    name: 'Meta description too long',
    category: ISSUE_CATEGORIES.META_DESCRIPTIONS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Meta description exceeds 160 characters. Google typically displays 150-160 characters in search results.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'meta_description_too_short',
    name: 'Meta description too short',
    category: ISSUE_CATEGORIES.META_DESCRIPTIONS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Meta description is shorter than 70 characters. May not provide enough information to users.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'multiple_meta_descriptions',
    name: 'Multiple meta descriptions',
    category: ISSUE_CATEGORIES.META_DESCRIPTIONS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page has more than one meta description tag.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'missing_h1',
    name: 'H1 tag missing or empty',
    category: ISSUE_CATEGORIES.HEADINGS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page has no H1 heading or it is empty. H1 tags help structure content and signal page topic.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'multiple_h1',
    name: 'Multiple H1 tags',
    category: ISSUE_CATEGORIES.HEADINGS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has more than one H1 tag. Best practice is one H1 per page (though not strictly enforced by search engines).',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'h1_duplicate',
    name: 'Duplicate H1 tag',
    category: ISSUE_CATEGORIES.HEADINGS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Multiple pages share the same H1 tag text.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'medium'
  },
  {
    id: 'h1_too_long',
    name: 'H1 tag too long',
    category: ISSUE_CATEGORIES.HEADINGS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'H1 tag exceeds 70 characters. Overly long H1s may dilute the main topic.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'improper_heading_order',
    name: 'Improper heading order',
    category: ISSUE_CATEGORIES.HEADINGS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Heading tags are not in sequential order (e.g., H1 followed by H3 without H2). Proper hierarchy improves accessibility.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'low_word_count',
    name: 'Low word count',
    category: ISSUE_CATEGORIES.CONTENT,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has less than 200 words of content. Thin content may not provide sufficient value.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'high'
  },
  {
    id: 'duplicate_content',
    name: 'Duplicate content',
    category: ISSUE_CATEGORIES.CONTENT,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page content is identical or very similar to another page on the site.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'low_text_html_ratio',
    name: 'Low text-HTML ratio',
    category: ISSUE_CATEGORIES.CONTENT,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has a low ratio of visible text to HTML code. May indicate thin content or excessive code.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'medium'
  },
  {
    id: 'no_content',
    name: 'No content',
    category: ISSUE_CATEGORIES.CONTENT,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page has no visible text content for users or search engines.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'missing_canonical',
    name: 'Canonical tag missing',
    category: ISSUE_CATEGORIES.CANONICALS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has no canonical tag. Canonical tags help prevent duplicate content issues.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'canonical_points_to_4xx',
    name: 'Canonical points to 4XX',
    category: ISSUE_CATEGORIES.CANONICALS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Canonical tag points to a page returning a 4XX error.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'canonical_points_to_5xx',
    name: 'Canonical points to 5XX',
    category: ISSUE_CATEGORIES.CANONICALS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Canonical tag points to a page returning a 5XX error.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'canonical_points_to_redirect',
    name: 'Canonical points to redirect',
    category: ISSUE_CATEGORIES.CANONICALS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Canonical tag points to a URL that redirects to another page.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'canonical_chain',
    name: 'Canonical chain',
    category: ISSUE_CATEGORIES.CANONICALS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page canonical tag points to a URL that has its own canonical tag (chain).',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'multiple_canonical_tags',
    name: 'Multiple canonical tags',
    category: ISSUE_CATEGORIES.CANONICALS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page has more than one canonical tag. Only one should exist per page.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'low'
  },
  {
    id: 'canonical_url_has_parameters',
    name: 'Canonical URL has parameters',
    category: ISSUE_CATEGORIES.CANONICALS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Canonical URL contains query parameters. Canonical URLs should typically be clean.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'noindex',
    name: 'Noindex page',
    category: ISSUE_CATEGORIES.INDEXABILITY,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has a noindex directive (meta robots or X-Robots-Tag). Won\'t be indexed by search engines.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'nofollow_page',
    name: 'Nofollow page',
    category: ISSUE_CATEGORIES.INDEXABILITY,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has a nofollow directive. Search engines won\'t follow links on this page.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'noindex_nofollow',
    name: 'Noindex and nofollow page',
    category: ISSUE_CATEGORIES.INDEXABILITY,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has both noindex and nofollow directives.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'noindex_in_sitemap',
    name: 'Noindex page in sitemap',
    category: ISSUE_CATEGORIES.INDEXABILITY,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page with noindex directive is listed in XML sitemap. This sends conflicting signals.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'blocked_page_has_internal_links',
    name: 'Blocked page has internal links',
    category: ISSUE_CATEGORIES.INDEXABILITY,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page blocked by robots.txt has internal links pointing to it.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'orphan_page',
    name: 'Orphan page (no incoming internal links)',
    category: ISSUE_CATEGORIES.INDEXABILITY,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page has no internal links pointing to it. Difficult for users and search engines to discover.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'nofollow_internal_link',
    name: 'Has nofollow internal link',
    category: ISSUE_CATEGORIES.LINKS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page contains internal link(s) with rel="nofollow". Generally unnecessary for internal links.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'broken_internal_links',
    name: 'Has broken internal links',
    category: ISSUE_CATEGORIES.LINKS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page contains one or more internal links pointing to broken pages.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'broken_external_links',
    name: 'Has broken external links',
    category: ISSUE_CATEGORIES.LINKS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page contains one or more external links pointing to broken pages.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'links_to_redirect',
    name: 'Links to redirect',
    category: ISSUE_CATEGORIES.LINKS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page contains links to URLs that redirect. Links should point directly to final destination.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'too_many_on_page_links',
    name: 'Too many on-page links',
    category: ISSUE_CATEGORIES.LINKS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has more than 100 internal or external links. May dilute link equity.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'medium'
  },
  {
    id: 'http_link_on_https_page',
    name: 'HTTP links on HTTPS page',
    category: ISSUE_CATEGORIES.LINKS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'HTTPS page contains links to HTTP resources. Can cause mixed content issues.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'no_outgoing_links',
    name: 'No outgoing links',
    category: ISSUE_CATEGORIES.LINKS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has no outgoing internal or external links (dead-end page).',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'redirect_chain',
    name: 'Redirect chain',
    category: ISSUE_CATEGORIES.REDIRECTS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'URL redirects multiple times before reaching final destination (e.g., A→B→C). Slows down crawling.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'redirect_loop',
    name: 'Redirect loop',
    category: ISSUE_CATEGORIES.REDIRECTS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'URL is stuck in a circular redirect loop. Page is inaccessible.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'temporary_redirect',
    name: 'Temporary redirect (302)',
    category: ISSUE_CATEGORIES.REDIRECTS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'URL uses 302 (temporary) redirect. For permanent moves, use 301 redirects.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'redirect_to_4xx',
    name: 'Redirect to 4XX',
    category: ISSUE_CATEGORIES.REDIRECTS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Redirect points to a page returning a 4XX error.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'redirect_to_5xx',
    name: 'Redirect to 5XX',
    category: ISSUE_CATEGORIES.REDIRECTS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Redirect points to a page returning a 5XX error.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'http_to_https_redirect',
    name: 'HTTP to HTTPS redirect',
    category: ISSUE_CATEGORIES.REDIRECTS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'HTTP version of URL redirects to HTTPS. Good practice, but update internal links to use HTTPS directly.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'redirect_in_sitemap',
    name: 'Redirect in sitemap',
    category: ISSUE_CATEGORIES.REDIRECTS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'XML sitemap contains URLs that redirect. Sitemaps should only contain final destination URLs.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'image_missing_alt',
    name: 'Image missing alt attribute',
    category: ISSUE_CATEGORIES.IMAGES,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page contains images without alt attributes. Alt text improves accessibility and SEO.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'image_alt_too_long',
    name: 'Image alt text too long',
    category: ISSUE_CATEGORIES.IMAGES,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Image alt text exceeds 125 characters. Alt text should be concise.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'broken_image',
    name: 'Broken image',
    category: ISSUE_CATEGORIES.IMAGES,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page contains images that return 4XX or 5XX errors.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'internal_image_missing_alt',
    name: 'Internal image missing alt text',
    category: ISSUE_CATEGORIES.IMAGES,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Internal images (hosted on the same domain) missing alt attributes.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'image_over_100kb',
    name: 'Image over 100KB',
    category: ISSUE_CATEGORIES.IMAGES,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page contains images larger than 100KB. Large images slow page load.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'medium'
  },
  {
    id: 'slow_page',
    name: 'Slow page (>3s)',
    category: ISSUE_CATEGORIES.PERFORMANCE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page took more than 3 seconds to load. Slow pages hurt user experience and SEO.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'very_slow_page',
    name: 'Very slow page (>7s)',
    category: ISSUE_CATEGORIES.PERFORMANCE,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page took more than 7 seconds to load. Severely impacts user experience.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'large_page_size',
    name: 'Large page size (>2MB)',
    category: ISSUE_CATEGORIES.PERFORMANCE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page size exceeds 2MB. Large pages take longer to download and render.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'large_html_size',
    name: 'Large HTML size (>200KB)',
    category: ISSUE_CATEGORIES.PERFORMANCE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'HTML document size exceeds 200KB. May indicate bloated code or excessive content.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'medium'
  },
  {
    id: 'no_gzip_compression',
    name: 'No text compression',
    category: ISSUE_CATEGORIES.PERFORMANCE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page HTML is not compressed with gzip or brotli. Compression significantly reduces transfer size.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'render_blocking_resources',
    name: 'Render-blocking resources',
    category: ISSUE_CATEGORIES.PERFORMANCE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page has render-blocking CSS or JavaScript that delays page rendering.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'large_css_file',
    name: 'Large CSS file (>100KB)',
    category: ISSUE_CATEGORIES.PERFORMANCE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page loads CSS file(s) larger than 100KB. Consider splitting or removing unused CSS.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'high'
  },
  {
    id: 'large_js_file',
    name: 'Large JavaScript file (>100KB)',
    category: ISSUE_CATEGORIES.PERFORMANCE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page loads JavaScript file(s) larger than 100KB. Consider code splitting or lazy loading.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'high'
  },
  {
    id: 'poor_lcp',
    name: 'Poor LCP (Largest Contentful Paint)',
    category: ISSUE_CATEGORIES.CORE_WEB_VITALS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Largest Contentful Paint (LCP) exceeds 2.5 seconds. LCP measures loading performance.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'poor_fid',
    name: 'Poor FID (First Input Delay)',
    category: ISSUE_CATEGORIES.CORE_WEB_VITALS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'First Input Delay (FID) exceeds 100ms. FID measures interactivity.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'poor_cls',
    name: 'Poor CLS (Cumulative Layout Shift)',
    category: ISSUE_CATEGORIES.CORE_WEB_VITALS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Cumulative Layout Shift (CLS) exceeds 0.1. CLS measures visual stability.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'poor_ttfb',
    name: 'Poor TTFB (Time to First Byte)',
    category: ISSUE_CATEGORIES.CORE_WEB_VITALS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Time to First Byte (TTFB) exceeds 600ms. TTFB measures server response time.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'high'
  },
  {
    id: 'poor_inp',
    name: 'Poor INP (Interaction to Next Paint)',
    category: ISSUE_CATEGORIES.CORE_WEB_VITALS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Interaction to Next Paint (INP) exceeds 200ms. INP measures runtime responsiveness.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'viewport_not_set',
    name: 'Viewport not set',
    category: ISSUE_CATEGORIES.MOBILE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page is missing viewport meta tag. Essential for mobile responsiveness.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'low'
  },
  {
    id: 'text_too_small',
    name: 'Text too small',
    category: ISSUE_CATEGORIES.MOBILE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page has text smaller than 12px. Small text is hard to read on mobile devices.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'clickable_elements_too_close',
    name: 'Clickable elements too close',
    category: ISSUE_CATEGORIES.MOBILE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Touch targets (links, buttons) are too close together. Minimum 48×48px recommended.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'content_wider_than_screen',
    name: 'Content wider than screen',
    category: ISSUE_CATEGORIES.MOBILE,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page content extends beyond viewport width, requiring horizontal scrolling.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'invalid_structured_data',
    name: 'Invalid structured data',
    category: ISSUE_CATEGORIES.STRUCTURED_DATA,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Page has structured data (JSON-LD, Microdata, RDFa) with validation errors.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'missing_structured_data',
    name: 'Missing structured data',
    category: ISSUE_CATEGORIES.STRUCTURED_DATA,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page has no structured data markup. Schema markup can enhance search appearance.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'medium'
  },
  {
    id: 'incomplete_structured_data',
    name: 'Incomplete structured data',
    category: ISSUE_CATEGORIES.STRUCTURED_DATA,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Structured data is missing recommended properties.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'missing_og_title',
    name: 'Missing og:title',
    category: ISSUE_CATEGORIES.SOCIAL_TAGS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page is missing Open Graph title tag (og:title). Used when sharing on social media.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'missing_og_description',
    name: 'Missing og:description',
    category: ISSUE_CATEGORIES.SOCIAL_TAGS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page is missing Open Graph description tag (og:description).',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'missing_og_image',
    name: 'Missing og:image',
    category: ISSUE_CATEGORIES.SOCIAL_TAGS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page is missing Open Graph image tag (og:image). Important for social sharing.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'missing_twitter_card',
    name: 'Missing Twitter Card tags',
    category: ISSUE_CATEGORIES.SOCIAL_TAGS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Page is missing Twitter Card meta tags.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'missing_hreflang',
    name: 'Missing hreflang tags',
    category: ISSUE_CATEGORIES.LOCALIZATION,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Multi-language or multi-regional site is missing hreflang tags.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'hreflang_to_4xx',
    name: 'Hreflang to 4XX',
    category: ISSUE_CATEGORIES.LOCALIZATION,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Hreflang tag points to a URL returning a 4XX error.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'hreflang_to_redirect',
    name: 'Hreflang to redirect',
    category: ISSUE_CATEGORIES.LOCALIZATION,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Hreflang tag points to a URL that redirects.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'hreflang_missing_return_link',
    name: 'Hreflang missing return links',
    category: ISSUE_CATEGORIES.LOCALIZATION,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'Hreflang implementation is missing reciprocal links from alternate pages.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'incorrect_hreflang_code',
    name: 'Incorrect hreflang language code',
    category: ISSUE_CATEGORIES.LOCALIZATION,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Hreflang uses invalid ISO language or country code.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'low'
  },
  {
    id: 'missing_lang_attribute',
    name: 'Missing lang attribute',
    category: ISSUE_CATEGORIES.LOCALIZATION,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'HTML tag is missing lang attribute. Important for accessibility and language detection.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'sitemap_not_found',
    name: 'Sitemap not found',
    category: ISSUE_CATEGORIES.SITEMAPS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'XML sitemap specified in robots.txt returns 404 error.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'sitemap_has_4xx_urls',
    name: 'Sitemap contains 4XX URLs',
    category: ISSUE_CATEGORIES.SITEMAPS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'XML sitemap contains URLs that return 4XX errors.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'medium'
  },
  {
    id: 'sitemap_has_redirect_urls',
    name: 'Sitemap contains redirects',
    category: ISSUE_CATEGORIES.SITEMAPS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'XML sitemap contains URLs that redirect. Only final URLs should be included.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'sitemap_has_noindex_urls',
    name: 'Sitemap contains noindex URLs',
    category: ISSUE_CATEGORIES.SITEMAPS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'XML sitemap contains URLs with noindex directives. Conflicting signals.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'sitemap_has_blocked_urls',
    name: 'Sitemap contains blocked URLs',
    category: ISSUE_CATEGORIES.SITEMAPS,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'XML sitemap contains URLs blocked by robots.txt.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'sitemap_invalid_xml',
    name: 'Invalid sitemap XML',
    category: ISSUE_CATEGORIES.SITEMAPS,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'XML sitemap has syntax errors and cannot be parsed.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'page_not_in_sitemap',
    name: 'Page not in sitemap',
    category: ISSUE_CATEGORIES.SITEMAPS,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'Indexable page is not included in XML sitemap.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'medium'
  },
  {
    id: 'robots_txt_not_found',
    name: 'robots.txt not found',
    category: ISSUE_CATEGORIES.ROBOTS_TXT,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'No robots.txt file found. While optional, robots.txt helps manage crawler behavior.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  },
  {
    id: 'robots_txt_blocks_important_pages',
    name: 'robots.txt blocks important pages',
    category: ISSUE_CATEGORIES.ROBOTS_TXT,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'robots.txt disallows crawling of important pages or resources.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'low'
  },
  {
    id: 'robots_txt_invalid_syntax',
    name: 'robots.txt has invalid syntax',
    category: ISSUE_CATEGORIES.ROBOTS_TXT,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'robots.txt file contains syntax errors.',
    enabled: true,
    impact: 'medium',
    fixingComplexity: 'low'
  },
  {
    id: 'robots_txt_blocks_css_js',
    name: 'robots.txt blocks CSS/JS',
    category: ISSUE_CATEGORIES.ROBOTS_TXT,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'robots.txt blocks CSS or JavaScript files. Google needs these to render pages properly.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'low'
  },
  {
    id: 'not_https',
    name: 'Page not using HTTPS',
    category: ISSUE_CATEGORIES.SECURITY,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'Page is served over HTTP instead of HTTPS. HTTPS is a ranking signal and provides security.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'mixed_content',
    name: 'Mixed content issues',
    category: ISSUE_CATEGORIES.SECURITY,
    severity: SEVERITY_LEVELS.WARNING,
    description: 'HTTPS page loads resources (images, scripts, etc.) over HTTP. Browsers may block mixed content.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'medium'
  },
  {
    id: 'ssl_certificate_invalid',
    name: 'Invalid SSL certificate',
    category: ISSUE_CATEGORIES.SECURITY,
    severity: SEVERITY_LEVELS.ERROR,
    description: 'SSL/TLS certificate is expired, self-signed, or has other validation errors.',
    enabled: true,
    impact: 'high',
    fixingComplexity: 'high'
  },
  {
    id: 'hsts_not_enabled',
    name: 'HSTS not enabled',
    category: ISSUE_CATEGORIES.SECURITY,
    severity: SEVERITY_LEVELS.NOTICE,
    description: 'HTTP Strict Transport Security (HSTS) header is not set. HSTS forces HTTPS connections.',
    enabled: true,
    impact: 'low',
    fixingComplexity: 'low'
  }
];

export default {
  SEVERITY_LEVELS,
  ISSUE_CATEGORIES,
  ISSUE_TYPES
};
