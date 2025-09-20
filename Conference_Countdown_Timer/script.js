let eventDate = null;
let totalTime = null;
let interval = null;

const timer = document.getElementById("timer");
const progress = document.getElementById("progress");
const eventDateDisplay = document.getElementById("eventDate");
const startBtn = document.getElementById("startBtn");
const eventInput = document.getElementById("eventInput");

startBtn.addEventListener("click", () => {
  const userInput = eventInput.value;

  if (!userInput) {
    alert("Please select a valid date and time!");
    return;
  }

  // Convert user input to Date object (local time)
  eventDate = new Date(userInput);
  const startDate = new Date();
  totalTime = eventDate - startDate;

  if (totalTime <= 0) {
    alert("The selected date/time must be in the future.");
    return;
  }

  // Display chosen date/time in local format
  eventDateDisplay.textContent =
    "Event Starts On: " +
    eventDate.toLocaleString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    });

  // Clear any existing countdown
  clearInterval(interval);
  interval = setInterval(updateCountdown, 1000);
  updateCountdown();
});

function updateCountdown() {
  if (!eventDate) return;

  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    timer.textContent = "Conference Started!";
    progress.style.width = "100%";
    clearInterval(interval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  const elapsed = totalTime - diff;
  const progressPercent = (elapsed / totalTime) * 100;
  progress.style.width = `${progressPercent}%`;
}
