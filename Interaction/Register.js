const submitLoader = document.getElementById("submit-loader");
const submitButton = document.getElementById("submit");
const message = document.querySelector(".message");

const notification = document.getElementById("notification");
const regmessage = document.getElementById("registered");

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var detailValue = getParameterByName("detail");

function hideAndDisableEvents(currentId, disableList) {
  document.querySelectorAll(".event-names").forEach((eventName) => {
    if (eventName.id === currentId) {
      eventName.classList.add("hide");
    }
    if (disableList.includes(eventName.id)) {
      eventName.classList.add("red");
      eventName.setAttribute("href", "javascript: void(0)");
    }
  });
}

// Update the page content based on event selected
switch (detailValue) {
  case "bc": // ByteTheClue
    hideAndDisableEvents("op", []);
    document.querySelector("h1").innerHTML = "ByteTheClue";
    document.querySelector("p").innerHTML = "TREASURE HUNTING EVENT";
    document.getElementById("extraInputBox").style.display = "flex";
    document.querySelector('input[name="member1"]').required = true;
    document.getElementById("xtraInputBox").style.display = "flex";
    document.querySelector('input[name="member2"]').required = true;
    document.getElementById("traInputBox").style.display = "flex";
    document.querySelector('input[name="member3"]').required = true;
    document.getElementById("raInputBox").value = "ByteTheClue";
    break;

  case "tq": // THINK QUEST
    hideAndDisableEvents("tq", ["ll", "bb"]);
    document.querySelector("h1").innerHTML = "THINK QUEST";
    document.querySelector("p").innerHTML = "IDEA PITCHING EVENT";
    document.getElementById("raInputBox").value = "ThinkQuest";
    break;

  case "cc": // Combat Coliseum
    hideAndDisableEvents("cc", ["tq"]);
    document.querySelector("h1").innerHTML = "Combat Coliseum";
    document.querySelector("p").innerHTML = "E-SPORTS BGMI COMPETITION";
    document.getElementById("extraInputBox").style.display = "flex";
    document.querySelector('input[name="member1"]').required = true;
    document.getElementById("xtraInputBox").style.display = "flex";
    document.querySelector('input[name="member2"]').required = true;
    document.getElementById("traInputBox").style.display = "flex";
    document.querySelector('input[name="member3"]').required = true;
    document.getElementById("raInputBox").value = "CombatColiseum";
    break;

  case "hp": // Hack'n Patch
    hideAndDisableEvents("hp", ["tq"]);
    document.querySelector("h1").innerHTML = "Hack'n Patch";
    document.querySelector("p").innerHTML = "DEBUGGING CONTEST";
    document.getElementById("raInputBox").value = "HackNPatch";
    break;

  case "zd": // Zenthra
    hideAndDisableEvents("zd", []);
    document.querySelector("h1").innerHTML = "Zenthra";
    document.querySelector("p").innerHTML = "SPOT DANCE EVENT";
    document.getElementById("raInputBox").value = "Zenthra";
    break;

  case "bt": // Battle of Boots
    hideAndDisableEvents("bt", []);
    document.querySelector("h1").innerHTML = "Battle of Boots";
    document.querySelector("p").innerHTML = "E-SPORTS (EFOOTBALL)";
    document.getElementById("raInputBox").value = "BattleOfBoots";
    break;

  case "mm": // Mind to Model
    hideAndDisableEvents("mm", []);
    document.querySelector("h1").innerHTML = "Mind to Model";
    document.querySelector("p").innerHTML = "AI IMAGE PROMPTING EVENT";
    document.getElementById("raInputBox").value = "MindToModel";
    break;

  default:
    console.warn("Unknown event type in URL.");
    break;
}

// Form submission
document.getElementById("myForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Use booleans directly
  if (
    clg_name_status &&
    email_status &&
    name_status &&
    phone_status &&
    mem1_status &&
    mem2_status &&
    mem3_status
  ) {
    submitLoader.style.display = "flex";
    submitButton.style.display = "none";

    const formData = Object.fromEntries(new FormData(this).entries());

    try {
      const res = await fetch("/api/reg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      submitLoader.style.display = "none";
      submitButton.style.display = "flex";

      if (res.ok) {
        document.getElementById("myForm").reset();
        removeActive();
        window.location.href = "confirmation.html";
      } else {
        message.textContent = data.message || "Server error, try again later.";
        message.style.display = "flex";
        setTimeout(() => {
          message.style.display = "none";
        }, 2000);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Failed to submit. Please check your internet and try again.");
    }
  } else {
    alert("Please fill all fields correctly before submitting!");
  }
});

// Notification handler
document.querySelectorAll(".red").forEach((disabled) => {
  disabled.addEventListener("click", () => {
    notification.classList.add("notification-show");
    setTimeout(() => {
      notification.classList.remove("notification-show");
    }, 3000);
  });
});

function removeActive() {
  document.querySelectorAll(".input-bx span").forEach((label) => {
    label.classList.remove("span-active");
  });
}
