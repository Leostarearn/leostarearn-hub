const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

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

  // ✅ Markdown config (no auto-heading IDs)
  const markdownOptions = {
    html: true,
    linkify: true,
    typographer: true
  };

  eleventyConfig.setLibrary("md", markdownIt(markdownOptions));

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

