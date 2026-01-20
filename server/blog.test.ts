import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("blog router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    // Create a context for public procedures
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    caller = appRouter.createCaller(ctx);
  });

  it("should return articles from the blog router", async () => {
    // This test verifies that the blog.articles procedure exists and returns an array
    const articles = await caller.blog.articles();
    
    // Should return an array (could be empty if Notion is not configured)
    expect(Array.isArray(articles)).toBe(true);
  });

  it("should filter articles by category", async () => {
    // This test verifies that the blog.articlesByCategory procedure works
    const articles = await caller.blog.articlesByCategory({ category: "Tecnología" });
    
    // Should return an array
    expect(Array.isArray(articles)).toBe(true);
    
    // If there are articles, they should all be in the requested category
    if (articles.length > 0) {
      articles.forEach(article => {
        expect(article.category).toBe("Tecnología");
      });
    }
  });

  it("should have correct article structure", async () => {
    const articles = await caller.blog.articles();
    
    // If there are articles, verify their structure
    if (articles.length > 0) {
      const article = articles[0];
      
      expect(article).toHaveProperty("id");
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("category");
      expect(article).toHaveProperty("content");
      expect(article).toHaveProperty("date");
      expect(article).toHaveProperty("readTime");
      expect(article).toHaveProperty("excerpt");
      expect(article).toHaveProperty("published");
      
      // Verify types
      expect(typeof article.id).toBe("string");
      expect(typeof article.title).toBe("string");
      expect(typeof article.readTime).toBe("number");
      expect(typeof article.published).toBe("boolean");
    }
  });
});
