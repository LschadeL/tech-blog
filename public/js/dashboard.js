const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#post-name").value.trim();
    const post_text = document.querySelector("#post-text").value.trim();

    if (title && post_text) {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
          "Content-Type": "application/json",
        },
    });
  
    if (response.ok) {
        document.location.reload();
    } else {
            alert("Could not create post");
        }
    }
};
  
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    });
  
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
            alert("Could not delete project");
        }
    }
};
  
document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);
  
document.querySelector(".project-list").addEventListener("click", delButtonHandler);