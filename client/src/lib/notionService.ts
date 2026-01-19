import { Client } from '@notionhq/client';

// Tipos para artículos del blog
export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  readTime: number;
  excerpt: string;
  published: boolean;
  featured?: boolean;
}

// Inicializar cliente de Notion
const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN || '',
});

const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID || '';

/**
 * Obtiene todos los artículos publicados de la base de datos de Notion
 */
export async function getNotionArticles(): Promise<BlogArticle[]> {
  try {
    if (!databaseId) {
      console.warn('VITE_NOTION_DATABASE_ID no está configurado');
      return [];
    }

    const response = await (notion.databases as any).query({
      database_id: databaseId.replace(/-/g, ''), // Remover guiones del ID
    });

    const articles: BlogArticle[] = response.results
      .map((page: any) => {
        const properties = page.properties;
        
        // Extraer valores de propiedades de forma segura
        const title = properties.Title?.title?.[0]?.plain_text || '';
        const category = properties.Category?.select?.name || 'General';
        const content = properties.Content?.rich_text?.map((rt: any) => rt.plain_text).join('') || '';
        const date = properties.Date?.date?.start || new Date().toISOString().split('T')[0];
        const readTime = properties.ReadTime?.number || 5;
        const excerpt = properties.Excerpt?.rich_text?.map((rt: any) => rt.plain_text).join('') || '';
        const published = properties.Published?.checkbox || false;
        const featured = properties.Featured?.checkbox || false;

        return {
          id: page.id,
          title,
          category,
          content,
          date,
          readTime,
          excerpt,
          published,
          featured,
        };
      })
      .filter((article: BlogArticle) => {
        // Solo mostrar artículos publicados con título
        return article.published && article.title.trim() !== '';
      });

    console.log(`✅ Cargados ${articles.length} artículos desde Notion`);
    return articles;
  } catch (error) {
    console.error('❌ Error fetching Notion articles:', error);
    return [];
  }
}

/**
 * Obtiene un artículo específico por ID
 */
export async function getNotionArticleById(articleId: string): Promise<BlogArticle | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: articleId });
    const properties = (page as any).properties;

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Sin título',
      category: properties.Category?.select?.name || 'General',
      content: properties.Content?.rich_text?.[0]?.plain_text || '',
      date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
      readTime: properties.ReadTime?.number || 5,
      excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || '',
      published: properties.Published?.checkbox || false,
      featured: properties.Featured?.checkbox || false,
    };
  } catch (error) {
    console.error('Error fetching Notion article:', error);
    return null;
  }
}

/**
 * Obtiene artículos por categoría
 */
export async function getNotionArticlesByCategory(category: string): Promise<BlogArticle[]> {
  try {
    const response = await (notion.databases as any).query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Category',
            select: {
              equals: category,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    return response.results
      .map((page: any) => {
        const properties = page.properties;

        return {
          id: page.id,
          title: properties.Title?.title?.[0]?.plain_text || 'Sin título',
          category: properties.Category?.select?.name || 'General',
          content: properties.Content?.rich_text?.[0]?.plain_text || '',
          date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
          readTime: properties.ReadTime?.number || 5,
          excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || '',
          published: properties.Published?.checkbox || false,
          featured: properties.Featured?.checkbox || false,
        };
      })
      .filter((article: BlogArticle) => article.title !== 'Sin título');
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}
