module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("js");

    return {
        dir: {
            input: ".",
            output: "_site",
        },
    };
};
