module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css"); // copy CSS to output
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
