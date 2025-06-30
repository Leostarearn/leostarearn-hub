module.exports = function(eleventyConfig) {
  // ✅ Static asset passthrough
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("robots.txt");          // ✅ Add robots.txt
  eleventyConfig.addPassthroughCopy("src/manifest.json");   // Optional: future PWA setup

  // ✅ Smart Living
  eleventyConfig.addCollection("smart-living", (collectionApi) =>
    collectionApi.getFilteredByTag("smart-living")
  );

  // ✅ Tech Tools
  eleventyConfig.addCollection("tech-tools", (collectionApi) =>
    collectionApi.getFilteredByTag("tech-tools")
  );

  // ✅ Trending Viral
  eleventyConfig.addCollection("trending-viral", (collectionApi) =>
    collectionApi.getFilteredByTag("trending-viral")
  );

  // ✅ Everything (for sitemap)
  eleventyConfig.addCollection("all", (collectionApi) =>
    collectionApi.getAll()
  );

  // ✅ Add a global filter to clean URLs (if needed for sitemap)
  eleventyConfig.addFilter("cleanUrl", function (url) {
    return url.replace("index.html", "");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
    dataTemplateEngine: "njk" // ✅ Allows using Nunjucks inside .md front matter too
  };
};

