module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");         // ✅ already copying CSS
  eleventyConfig.addPassthroughCopy("src/images");        // ✅ NEW: copy images folder

  // ✅ Collection: smart-living
eleventyConfig.addCollection("smart-living", function (collectionApi) {
  return collectionApi.getFilteredByTag("smart-living");
});

// ✅ Collection: tech-tools
eleventyConfig.addCollection("tech-tools", function (collectionApi) {
  return collectionApi.getFilteredByTag("tech-tools");
});

// ✅ Collection: trending-viral
eleventyConfig.addCollection("trending-viral", function (collectionApi) {
  return collectionApi.getFilteredByTag("trending-viral");
});


  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
};
