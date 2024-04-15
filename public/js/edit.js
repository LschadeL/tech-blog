const editPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#post-name").value.trim();
    const post_text = document.querySelector("#post-text").value.trim();
    const href = this.location.href;
    const urlArray = new URL(href).pathname.split("/");
    const id = urlArray.pop() || urlArray.pop();
    
    const response = await fetch("/api/posts/update", {
      method: "PUT",
      body: JSON.stringify({
        title,
        post_text,
        id
    }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
};

document.querySelector(".update-post-form").addEventListener("submit", editPost);