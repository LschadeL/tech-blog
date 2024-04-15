const createComment = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector("#comment-text").value.trim();
    const href = this.location.href;
    const urlArray = new URL(href).pathname.split("/");
    const post_id = urlArray.pop() || urlArray.pop();

    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
            comment_text,
            post_id
        }),
      headers: { "Content-Type": "application/json" }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
};
  
document.querySelector("#comment-form").addEventListener("submit", createComment);