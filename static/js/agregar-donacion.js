const validateName = (name) => {
    if (!name) return false;
    const trimmedNameLength = name.trim().length;
    return trimmedNameLength >= 3 && trimmedNameLength <= 80;
  }

const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length >= 15;

    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);
  
    return lengthValid && formatValid;
  };

const validateYears = (years) => {
    if (!years) return false;
    const parsedYears = parseInt(years, 10);
    return parsedYears >= 1 && parsedYears <= 99;
  };
  
const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return true;

    let lengthValid = phoneNumber.length >= 8;

    let re = /^[0-9]+$/;
    let formatValid = re.test(phoneNumber);
  
    return lengthValid && formatValid;
  };

const validateFiles = (files) => {
    if (!files) return false;
  
    let lengthValid = 1 <= files.length && files.length <= 3;

    let typeValid = true;
  
    for (const file of files) {

      let fileFamily = file.type.split("/")[0];
      typeValid &&= fileFamily == "image" || file.type == "application/pdf";
    }
  
    return lengthValid && typeValid;
  };
const validateSelect = (select) => {  
    if(!select) return false;
    return true
  }

const validateForm = () => {
    // CONTACT INFORMATION
    let myForm = document.forms["myForm"];
    let email = myForm["email"].value;
    let phoneNumber = myForm["phone"].value;
    let name = myForm["nombre"].value;
    let region = myForm["select-region"].value;
    let district = myForm["select-district"].value;

    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
      invalidInputs.push(inputName);
      isValid &&= false;
    };

    if (!validateName(name)) 
      setInvalidInput("Name, it must be at least 3 characters long and no more than 80 characters long.");
    if (!validateEmail(email)) 
      setInvalidInput("Email, incorrect format");
    if (!validatePhoneNumber(phoneNumber)) 
      setInvalidInput("Number, incorrect format");
    if (!validateSelect(region)) 
      setInvalidInput("Select a region");
    if (!validateSelect(district)) 
      setInvalidInput("Select a district");
  
     // DEVICE INFORMATION
    let deviceInfos = document.querySelectorAll(".device-information");
    deviceInfos.forEach((deviceInfo, index) => {
        let device = deviceInfo.querySelector(".nombre_dis").value;
        let type = deviceInfo.querySelector(".select-type").value;
        let years = deviceInfo.querySelector(".years").value;
        let status = deviceInfo.querySelector(".select-status").value;
        let files = deviceInfo.querySelector(".files").files;

        if (!validateName(device)) 
           setInvalidInput(`Device "${index + 1}", it must be at least 3 characters long and no more than 80 characters long.`);
        if (!validateName(type))  
           setInvalidInput(`Type "${index + 1}"`);
        if (!validateYears(years))
           setInvalidInput(`Years "${index + 1}", it must be an integer, with a minimum value of 1 and a maximum value of 99.`);
        if (!validateSelect(status))
           setInvalidInput(`Status "${index + 1}"`);
        if (!validateFiles(files))
           setInvalidInput(`Files "${index + 1}", minimum 1, maximum 3.`);
    });

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
        validationMessageElem.innerText = "Do you want to confirm publishing this donation?";
        validationListElem.textContent = "";

        validationBox.style.backgroundColor = "#ddffdd";
        validationBox.style.borderLeftColor = "#4CAF50";

        let submitButton = document.createElement("button");
        submitButton.innerText = "Yes, I confirm.";
        submitButton.style.marginRight = "10px";
        submitButton.addEventListener("click", () => {
            submitButton.hidden = true;

            validationMessageElem.innerText = "We have received your donation information. Thank you very much. (You will be redirected to our home page.)";           

            validationListElem.textContent = "";

            setTimeout(() => {
              myForm.submit();
            }, 4500);
        });

        let backButton = document.createElement("button");
        backButton.innerText = "No, I want to go back to the form.";
        backButton.addEventListener("click", () => {
            myForm.style.display = "block";
            validationBox.hidden = true;
        });

        validationListElem.appendChild(submitButton);
        validationListElem.appendChild(backButton);
        validationBox.hidden = false;
    }
}


document.getElementById("add-donation-btn").addEventListener("click", function() {
  let container = document.getElementById("device-information-container");
  let newDeviceInfo = container.querySelector(".device-information").cloneNode(true);

  let deviceCount = container.querySelectorAll(".device-information").length;

  newDeviceInfo.querySelectorAll("input, textarea, select").forEach(input => {

      let newName = input.getAttribute("name").replace(/\[\d+\]/, `[${deviceCount}]`); 
      input.setAttribute("name", newName);

      if (input.type === "file") {
          input.value = "";
      } else {
          input.value = "";
      }
  });

  container.appendChild(newDeviceInfo);
});

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);