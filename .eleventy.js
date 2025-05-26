module.exports = function(eleventyConfig) {
    // Copy the `css` directory to the output
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/images");
    // Copy the `js` directory to the output
    eleventyConfig.addPassthroughCopy("src/js");

    // Add a filter to format dates
    eleventyConfig.addFilter("date", function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    // Add a filter for active items
    eleventyConfig.addFilter("activeItems", function(collection) {
        return collection.filter(item => item.data.status === 'Currently Reading');
    });

    // Add a debug filter
    eleventyConfig.addFilter("debug", function(value) {
        if (typeof value === 'object' && value !== null) {
            const safeValue = {};
            for (const key in value) {
                if (typeof value[key] !== 'object' || value[key] === null) {
                    safeValue[key] = value[key];
                }
            }
            return JSON.stringify(safeValue, null, 2);
        }
        return value;
    });

    // Add a filter to find the index of a post in a collection
    eleventyConfig.addFilter("findIndex", function(collection, url) {
        return collection.findIndex(post => post.url === url);
    });

    // Configure collections
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("src/posts/**/*.md");
    });

    eleventyConfig.addCollection("library", function(collection) {
        return collection.getFilteredByGlob("src/library/**/*.md");
    });

    // Add tag collections
    eleventyConfig.addCollection("tagList", function(collection) {
        let tagSet = new Set();
        collection.getAll().forEach(item => {
            if( "tags" in item.data ) {
                let tags = item.data.tags;
                if( typeof tags === "string" ) {
                    tags = [tags];
                }
                tags.forEach(tag => tagSet.add(tag));
            }
        });
        return Array.from(tagSet).sort();
    });

    // Add format collections
    eleventyConfig.addCollection("formatList", function(collection) {
        let formatSet = new Set();
        collection.getFilteredByGlob("src/library/**/*.md").forEach(item => {
            if( "format" in item.data ) {
                let format = item.data.format;
                 // Ensure format is a string before adding (though likely always is for this case)
                 if( typeof format === "string" ) {
                    formatSet.add(format);
                 }
            }
        });
        return Array.from(formatSet).sort();
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            layouts: "_includes"
        }
    };
};