const pwd = document.getElementById("pwd");
const meter = document.getElementById("meter");
const msg = document.getElementById("msg");
const checklist = document.getElementById("checklist");
const copy = document.getElementById("copy");

const checks = {
  length: document.getElementById("length"),
  upper: document.getElementById("upper"),
  lower: document.getElementById("lower"),
  number: document.getElementById("number"),
  special: document.getElementById("special"),
};

pwd.addEventListener("input", () => {
  const value = pwd.value;
  let score = 0;

  if (value.trim() === "") {
    meter.style.width = "0%";
    msg.textContent = "";
    msg.style.color = "";
    checklist.style.display = "none";
    copy.style.display = "none";
    for (let rule in checks) {
      checks[rule].classList.remove("valid");
      checks[rule].classList.add("invalid");
      checks[rule].textContent = "❌ " + checks[rule].textContent.slice(2);
    }
    return;
  }

  const rules = {
    length: value.length >= 8,
    upper: /[A-Z]/.test(value),
    lower: /[a-z]/.test(value),
    number: /\d/.test(value),
    special: /[^A-Za-z0-9]/.test(value),
  };

  for (let rule in rules) {
    if (rules[rule]) {
      checks[rule].classList.remove("invalid");
      checks[rule].classList.add("valid");
      checks[rule].textContent = "✅ " + checks[rule].textContent.slice(2);
      score++;
    } else {
      checks[rule].classList.remove("valid");
      checks[rule].classList.add("invalid");
      checks[rule].textContent = "❌ " + checks[rule].textContent.slice(2);
    }
  }

  if (score <= 2) {
    checklist.style.display = "block";
    meter.style.width = "33%";
    meter.style.background = "#ff4d4d";
    msg.textContent = "Weak Password";
    msg.style.color = "#ff4d4d";
  } else if (score === 3 || score === 4) {
    meter.style.width = "66%";
    meter.style.background = "#ffc107";
    msg.textContent = "Moderate Password";
    msg.style.color = "#ffc107";
    copy.style.display = "none";
    checklist.style.display = "block";
  } else if (score === 5) {
    meter.style.width = "100%";
    meter.style.background = "#28a745";
    msg.textContent = "Strong Password ✅";
    msg.style.color = "#28a745";
    copy.style.display = "block";
    checklist.style.display = "none";
  }
});

function copyToClipboard(button) {
  const codeBlock = pwd;

  if (!codeBlock) {
    console.error("Type password first...");
    return;
  }

  const textToCopy = codeBlock.value;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      button.innerHTML = "✅ Copied!";
      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = 'Copy Password <i class="bx bx-copy-alt"></i>';
        button.disabled = false;
      }, 1500);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      button.innerHTML = "❌ Failed";
      setTimeout(() => {
        button.innerHTML = 'Copy Password <i class="bx bx-copy-alt"></i>';
      }, 1500);
    });
}
