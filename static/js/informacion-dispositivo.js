// INFO DEVICES
function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(pair => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

const params = getQueryParams();
document.getElementById("name").textContent = "Name: " + params.name;
document.getElementById("email").textContent = "Email: " + params.email;
document.getElementById("number").textContent = "Number: " + params.number;
document.getElementById("region").textContent = "Region: " + params.region;
document.getElementById("district").textContent = "District: " + params.district;

document.getElementById("type").textContent = "Type: " + params.type;
document.getElementById("device_name").textContent = "Device name: " + params.device_name;
document.getElementById("status").textContent = "Status: " + params.status;
document.getElementById("photo").src = params.photo;
document.getElementById("photo").alt = "Photo:" + params.name;

document.getElementById("photo").addEventListener("click", function() {
    this.classList.toggle("enlarged");
});

// COMMENTS AND USERNAME
const validateUsername = (username) => {
  if (!username) return false;
  const trimmedNameLength = username.trim().length;
  return trimmedNameLength >= 3 && trimmedNameLength <= 80;
}
const validateComment = (comment) => {
  const trimmedCommentLength = comment.trim().length;
  return trimmedCommentLength >= 5;
}
const validateForm = () => {
  let myForm = document.forms["myForm"];
  let username = myForm["username"].value;
  let comment = myForm["comments"].value;

  let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
      invalidInputs.push(inputName);
      isValid &&= false;
    };
  if (!validateUsername(username)) 
    setInvalidInput("Username, it must be at least 3 characters long and no more than 80 characters long.");
  if (!validateComment(comment)) 
    setInvalidInput("Comment, it must be at least 5 characters long");

  let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");
    let formContainer = document.querySelector(".main-container");

    if (!isValid) {
        validationListElem.textContent = "";

        for (input of invalidInputs) {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }

        validationMessageElem.innerText = "The following fields are invalid:";

        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";

        validationBox.hidden = false;
        } else {

        myForm.style.display = "none";

        validationMessageElem.innerText = "Are you sure?";
        validationListElem.textContent = "";

        validationBox.style.backgroundColor = "#ddffdd";
        validationBox.style.borderLeftColor = "#4CAF50";

        let homeButton = document.createElement("button");
        homeButton.innerText = "Return home";
        homeButton.style.marginLeft = "10px";
        homeButton.addEventListener("click", () => {
          window.location.href = "index.html";
        });
        homeButton.hidden = true;

        let submitButton = document.createElement("button");
        submitButton.innerText = "Yes, I'm sure.";
        submitButton.style.marginRight = "10px";
        submitButton.addEventListener("click", () => {
          submitButton.hidden = true;
          backButton.hidden = true;
          homeButton.hidden = false;
          validationMessageElem.innerText = "The comment was added, thank you.";
        });

        let backButton = document.createElement("button");
        backButton.innerText = "No, I want to go back.";
        backButton.addEventListener("click", () => {
            myForm.style.display = "block";
            validationBox.hidden = true;
        });

        validationListElem.appendChild(submitButton);
        validationListElem.appendChild(backButton);
        validationListElem.appendChild(homeButton);

        validationBox.hidden = false;
    }
}

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);
