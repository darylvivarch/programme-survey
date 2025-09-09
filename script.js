const form = document.getElementById("surveyForm");
const statusEl = document.getElementById("status");

// ✅ Your deployed Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpa1v8K-0NQ15KpcS0u4iwdrdkSl46qB7kgS6xDurMMSwNCv4FFUk_ZO5UZpz_ZPmL/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Submitting...";

  // Collect form data
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    // Combine multiple checkbox values into comma-separated string
    if (data[key]) {
      data[key] = `${data[key]}, ${value}`;
    } else {
      data[key] = value;
    }
  });

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // 👈 important for Google Apps Script
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Since no-cors gives opaque response, assume success if no error
    statusEl.textContent = "✅ Thank you! Your response has been submitted.";
    form.reset();

    // Hide conditional fields again
    if (roleOther) roleOther.style.display = "none";
    if (priorityOther) priorityOther.style.display = "none";

  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Submission failed. Check your connection.";
  }
});


// ----------------------
// Conditional "Others" fields
// ----------------------

// Role dropdown
const roleSelect = document.getElementById("roleSelect");
const roleOther = document.getElementById("roleOther");

if (roleSelect && roleOther) {
  roleSelect.addEventListener("change", () => {
    if (roleSelect.value === "Others") {
      roleOther.style.display = "block";
      roleOther.required = true;
    } else {
      roleOther.style.display = "none";
      roleOther.value = "";
      roleOther.required = false;
    }
  });
}

// Priority Areas checkbox
const priorityOtherChk = document.getElementById("priorityOtherChk");
const priorityOther = document.getElementById("priorityOther");

if (priorityOtherChk && priorityOther) {
  priorityOtherChk.addEventListener("change", () => {
    if (priorityOtherChk.checked) {
      priorityOther.style.display = "block";
      priorityOther.required = true;
    } else {
      priorityOther.style.display = "none";
      priorityOther.value = "";
      priorityOther.required = false;
    }
  });
}
