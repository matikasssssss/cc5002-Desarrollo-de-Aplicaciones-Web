document.getElementById("commentForm").addEventListener("submit", function(event) {
    let nameError = document.getElementById("nameError");
    let textError = document.getElementById("textError");
    let errorContainer = document.querySelector(".error-container");

    nameError.textContent = "";
    textError.textContent = "";
    errorContainer.classList.add("hidden");

    let valid = true; 

    const nameInput = document.getElementById("commentName").value;
    const textInput = document.getElementById("commentText").value;

    if (nameInput.length < 3 || nameInput.length > 80) {
        nameError.textContent = "El nombre debe tener entre 3 y 80 caracteres.";
        valid = false;
    }

    if (textInput.length < 5) {
        textError.textContent = "El comentario debe tener al menos 5 caracteres.";
        valid = false;
    }

    if (!valid) {
        errorContainer.classList.remove("hidden");
        event.preventDefault(); 
    }
});

