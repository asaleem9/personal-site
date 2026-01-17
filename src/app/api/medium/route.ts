import { NextResponse } from 'next/server';

export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  imageUrl: string | null;
  categories: string[];
}

const MEDIUM_USERNAME = 'alithetpm';
const MEDIUM_FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

function extractImageFromContent(content: string): string | null {
  // Extract the first image src from the content
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
  if (imgMatch && imgMatch[1]) {
    // Filter out tracking pixels (1x1 images)
    if (imgMatch[1].includes('stat?event=')) {
      return null;
    }
    return imgMatch[1];
  }
  return null;
}

function extractCDATA(text: string): string {
  // Remove CDATA wrapper if present
  return text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

export async function GET() {
  try {
    const response = await fetch(MEDIUM_FEED_URL, {
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Medium RSS feed responded with ${response.status}`);
    }

    const xml = await response.text();

    // Parse XML manually (simple approach without external dependencies)
    const articles: MediumArticle[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];

      // Extract title
      const titleMatch = itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/);
      const title = titleMatch ? titleMatch[1] : '';

      // Extract link
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
      const link = linkMatch ? linkMatch[1] : '';

      // Extract pubDate
      const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
      const pubDate = pubDateMatch ? pubDateMatch[1] : '';

      // Extract content:encoded for image
      const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
      const content = contentMatch ? contentMatch[1] : '';
      const imageUrl = extractImageFromContent(content);

      // Extract categories
      const categories: string[] = [];
      const categoryRegex = /<category><!\[CDATA\[(.*?)\]\]><\/category>/g;
      let catMatch;
      while ((catMatch = categoryRegex.exec(itemContent)) !== null) {
        categories.push(catMatch[1]);
      }

      if (title && link) {
        articles.push({
          title,
          link,
          pubDate,
          imageUrl,
          categories,
        });
      }
    }

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Medium RSS feed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
