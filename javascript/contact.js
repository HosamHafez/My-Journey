document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-button");
    const successMessage = document.getElementById("success-message");
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const characterCounter = document.getElementById("character-counter");

    function updateCharacterCount() {
        const message = messageInput.value;
        let currentCount = message.length;
        
        if (currentCount > 1001) {
            messageInput.value = message.substr(0, 1001); // Truncate the message to the maximum allowed characters
            currentCount = 1001;
        }
        characterCounter.textContent = currentCount + " / 1000"; // Update character count display

    }

    messageInput.addEventListener("input", function() {
        updateCharacterCount();
        validateForm(); // Trigger form validation after character count update
    });

    // Validation functions
    function validateName() {
        const nameInput = contactForm.querySelector('input[name="name"]');
        const errorDiv = document.getElementById("name-error");

        
        if (nameInput.value.trim() === "") {
            errorDiv.textContent = "Name is required";
            nameInput.style.border = "1px solid red";
            return false;
        }
        else if (!/^\D+$/.test(nameInput.value)) {
            errorDiv.textContent = "Name cannot contain numbers";
            nameInput.style.border = "1px solid red";
            return false;
        } 
         else {
            errorDiv.textContent = "";
            nameInput.style.border = "1px solid #fff";
            return true;
        }
    }

    function validateEmail() {
        const emailInput = contactForm.querySelector('input[name="email"]');
        const errorDiv = document.getElementById("email-error");

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailInput.value)) {
            errorDiv.textContent = "Invalid email address";
            emailInput.style.border = "1px solid red";
            return false;
        } else {
            errorDiv.textContent = "";
            emailInput.style.border = "1px solid #fff";
            return true;
        }
    }

    function validateMessage() {
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        const errorDiv = document.getElementById("message-error");

        if (messageInput.value.trim() === "") {
            errorDiv.textContent = "Message is required";
            messageInput.style.border = "1px solid red";
            return false;
        }  else if (messageInput.value.length >= 1001) {
            errorDiv.textContent = "Maximum character limit is 1000";
            messageInput.style.border = "1px solid red";
            return false;
        } else {
            errorDiv.textContent = "";
            messageInput.style.border = "1px solid #fff";
            return true;
        }
    }

    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    contactForm.addEventListener("input", function(e) {
        validateForm();
    });

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        validateForm();

        if (contactForm.checkValidity()) {

            successMessage.style.display = "block";
            contactForm.reset();
            submitButton.disabled = true;

            setTimeout(function() {
                successMessage.style.display = "none";
            }, 5000);
        }
    });
});
