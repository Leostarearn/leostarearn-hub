module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");         // ✅ already copying CSS
  eleventyConfig.addPassthroughCopy("src/images");        // ✅ NEW: copy images folder

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




