module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets like CSS, images
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("images");

  return {
    dir: {
      input: "src",         // Your source files folder
      includes: "_includes", // Your includes folder inside src
      output: "_site"        // Output folder Eleventy builds to
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
