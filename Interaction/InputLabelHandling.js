// Declare all status variables globally
let clg_name_status = false;
let email_status = false;
let name_status = false;
let phone_status = false;
let mem1_status = true; // hidden by default
let mem2_status = true;
let mem3_status = true;

const inputs = document.querySelectorAll(".input-bx input");
const error_messages = document.querySelectorAll(".error");

// Validation functions
function validate_name(e, index) {
  const value = e.value.trim();
  if (value.length === 0) {
    error_messages[index].classList.add("hide");
    return false;
  }
  if (/^[a-zA-Z][a-zA-Z .]*$/.test(value)) {
    error_messages[index].classList.add("hide");
    return true;
  } else {
    error_messages[index].classList.remove("hide");
    return false;
  }
}

function validate_clg_name(e, index) {
  const value = e.value.trim();
  if (value.length === 0) {
    error_messages[index].classList.add("hide");
    return false;
  }
  if (/^[a-zA-Z0-9\s.'",()&-]*$/.test(value)) {
    error_messages[index].classList.add("hide");
    return true;
  } else {
    error_messages[index].classList.remove("hide");
    return false;
  }
}

function validate_mem_name(e, index) {
  const value = e.value.trim();
  if (value.length === 0) {
    error_messages[index].classList.add("hide");
    return true; // optional member
  }
  if (/^[a-zA-Z][a-zA-Z .]*$/.test(value)) {
    error_messages[index].classList.add("hide");
    return true;
  } else {
    error_messages[index].classList.remove("hide");
    return false;
  }
}

function validate_phone(e, index) {
  const value = e.value.trim();
  if (value.length === 0) {
    error_messages[index].classList.add("hide");
    return false;
  }
  if (/^(?:\+?([0-9]{1,3}) ?)?([0-9]{10})$/.test(value)) {
    error_messages[index].classList.add("hide");
    return true;
  } else {
    error_messages[index].classList.remove("hide");
    return false;
  }
}

function validate_email(e, index) {
  const value = e.value.trim();
  if (value.length === 0) {
    error_messages[index].classList.add("hide");
    return false;
  }
  const emailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*@([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\[[^\]]+\])(\.([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\[[^\]]+\]))*$/;
  if (emailRegex.test(value)) {
    error_messages[index].classList.add("hide");
    return true;
  } else {
    error_messages[index].classList.remove("hide");
    return false;
  }
}

// Input focus/blur styling
document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".input-bx");
  boxes.forEach((box) => {
    const input = box.querySelector("input");
    const label = box.querySelector("span");
    if (input && label) {
      input.addEventListener("focus", () => label.classList.add("span-active"));
      input.addEventListener("blur", () => {
        if (input.value === "") label.classList.remove("span-active");
      });
    }
  });
});

// Attach validation events
document.addEventListener("DOMContentLoaded", function () {
  inputs.forEach((input) => {
    switch (input.id) {
      case "clg-name":
        input.addEventListener("input", () => {
          clg_name_status = validate_clg_name(input, 0);
        });
        break;
      case "std-name":
        input.addEventListener("input", () => {
          name_status = validate_name(input, 1);
        });
        break;
      case "std-email":
        input.addEventListener("blur", () => {
          email_status = validate_email(input, 2);
        });
        break;
      case "std-num":
        input.addEventListener("blur", () => {
          phone_status = validate_phone(input, 3);
        });
        break;
      case "std-mem1":
        input.addEventListener("input", () => {
          mem1_status = validate_mem_name(input, 4);
        });
        break;
      case "std-mem2":
        input.addEventListener("input", () => {
          mem2_status = validate_mem_name(input, 5);
        });
        break;
      case "std-mem3":
        input.addEventListener("input", () => {
          mem3_status = validate_mem_name(input, 6);
        });
        break;
    }
  });
});
