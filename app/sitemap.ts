import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || "https://securitytools.app";

  const staticRoutes = [
    "",
    "/tools",
    "/tools/password-strength-checker",
    "/tools/password-generator",
    "/tools/passphrase-generator",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/tools/") ? 0.9 : 0.8
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...blogRoutes];
}
