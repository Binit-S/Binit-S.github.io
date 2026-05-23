In this post, we discuss building high performance static portfolios with dynamic markdown rendering.

Here is a snippet of Javascript showing how the client-side parsing is handled:

```javascript
// Dynamic fetching of markdown content
async function loadBlogPost(postId) {
  const response = await fetch(`/posts/${postId}.md`);
  if (!response.ok) {
    throw new Error("Failed to fetch markdown file");
  }
  const text = await response.text();
  const contentEl = document.getElementById("blog-content");
  contentEl.innerHTML = marked.parse(text);
  Prism.highlightAll();
}
```

We also want to ensure that any images included in the blog scale properly:

![Topographic Mountain Wireframe](/mountain.png)

This mountain wireframe is a perfect example of design details scaling down for smaller screens.
