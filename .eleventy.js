const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  // ✅ Static file passthroughs
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("src/manifest.json");

  // ✅ Date filter for sitemap
  eleventyConfig.addFilter("date", (dateObj, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // ✅ Clean URL filter (optional)
  eleventyConfig.addFilter("cleanUrl", function (url) {
    return url.replace("index.html", "");
  });

  // ✅ Lazy loading transform for images
  eleventyConfig.addTransform("lazyImages", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(/<img(.*?)>/g, function (match, group) {
        if (/loading=/.test(group)) return match;
        return `<img loading="lazy"${group}>`;
      });
    }
    return content;
  });

  // ✅ Collections
  eleventyConfig.addCollection("smart-living", (collectionApi) =>
    collectionApi.getFilteredByTag("smart-living")
  );
  eleventyConfig.addCollection("tech-tools", (collectionApi) =>
    collectionApi.getFilteredByTag("tech-tools")
  );
  eleventyConfig.addCollection("trending-viral", (collectionApi) =>
    collectionApi.getFilteredByTag("trending-viral")
  );
  eleventyConfig.addCollection("all", (collectionApi) =>
    collectionApi.getAll()
  );

  // ✅ Markdown config with emoji-safe slugify
const markdownOptions = {
  html: true,
  linkify: true,
  typographer: true
};

eleventyConfig.setLibrary("md", markdownIt(markdownOptions).use(markdownItAnchor, {
  level: [2],
  slugify: s =>
    s
      .normalize("NFKD") // Normalize accented characters
      .replace(/[\u{1F600}-\u{1F6FF}]/gu, '') // Remove emojis
      .replace(/[^a-zA-Z0-9 -]/g, '') // Remove special symbols
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-')  // Collapse multiple dashes
}));

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
    dataTemplateEngine: "njk"
  };
};

