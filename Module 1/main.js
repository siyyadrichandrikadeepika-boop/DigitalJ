console.log("Welcome to the Community Portal");

const fallbackEvents = [
  { id: 1, name: "Riverside Music Night", date: "2026-07-12", category: "Music", location: "RK Beach, Visakhapatnam", latitude: 17.7145, longitude: 83.3237, seats: 24, fee: 100 },
  { id: 2, name: "Baking Basics Workshop", date: "2026-07-18", category: "Workshop", location: "Tummalapalli Kalakshetram, Vijayawada", latitude: 16.5062, longitude: 80.648, seats: 16, fee: 150 },
  { id: 3, name: "Free Health Screening", date: "2026-07-21", category: "Health", location: "Government General Hospital, Guntur", latitude: 16.3067, longitude: 80.4365, seats: 30, fee: 0 },
  { id: 4, name: "Tree Planting Morning", date: "2026-08-02", category: "Environment", location: "Kolleru Lake Area, Eluru", latitude: 16.7107, longitude: 81.0952, seats: 20, fee: 0 },
  { id: 5, name: "Local Arts Fair", date: "2026-08-10", category: "Culture", location: "Lepakshi Temple Grounds, Sri Sathya Sai District", latitude: 13.8032, longitude: 77.607, seats: 18, fee: 50 },
  { id: 6, name: "Past Book Club Meetup", date: "2025-02-08", category: "Culture", location: "Sri Venkateswara University Library, Tirupati", latitude: 13.6288, longitude: 79.4192, seats: 12, fee: 0 }
];

class CommunityEvent {
  constructor({ id, name, date, category, location, latitude, longitude, seats, fee }) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.category = category;
    this.location = location;
    this.latitude = latitude;
    this.longitude = longitude;
    this.seats = seats;
    this.fee = fee;
  }
}

CommunityEvent.prototype.checkAvailability = function checkAvailability() {
  return this.seats > 0 && new Date(this.date) >= new Date();
};

let events = [];
let activeCategory = "all";
let searchTerm = "";
let pageDirty = false;
const registrationsByEvent = {};

const eventCards = document.querySelector("#eventCards");
const categoryFilter = document.querySelector("#categoryFilter");
const searchInput = document.querySelector("#searchInput");
const findNearbyBtn = document.querySelector("#findNearbyBtn");
const geoOutput = document.querySelector("#geoOutput");
const eventTypeSelect = document.querySelector("#eventType");
const clearPreferencesBtn = document.querySelector("#clearPreferencesBtn");
const selectedEvent = document.querySelector("#selectedEvent");
const adminRows = document.querySelector("#adminRows");
const spinner = document.querySelector("#loadingSpinner");
const form = document.querySelector("#registrationForm");
const output = document.querySelector("#confirmationOutput");
const interactionStatus = document.querySelector("#interactionStatus");
const feedbackLimit = 200;

function addEvent(eventData) {
  const event = eventData instanceof CommunityEvent ? eventData : new CommunityEvent(eventData);
  const eventName = event.name;
  const eventDate = event.date;
  let availableSeats = event.seats;
  const eventInfo = `${eventName} is scheduled on ${eventDate} with ${availableSeats} seats.`;
  console.log(eventInfo);
  events.push(event);
  return event;
}

function createRegistrationCounter() {
  const categoryTotals = {};
  return function track(category) {
    categoryTotals[category] = (categoryTotals[category] || 0) + 1;
    return categoryTotals[category];
  };
}

const trackRegistration = createRegistrationCounter();

function filterEventsByCategory(category = "all", callback = (event) => event) {
  const clonedEvents = [...events];
  return clonedEvents
    .filter((event) => {
      if (event.checkAvailability()) {
        return true;
      }

      return false;
    })
    .filter((event) => category === "all" || event.category === category)
    .filter((event) => {
      const normalizedSearch = searchTerm.toLowerCase();
      return event.name.toLowerCase().includes(normalizedSearch)
        || event.location.toLowerCase().includes(normalizedSearch);
    })
    .map(callback);
}

function createEventCard(event) {
  const { id, name, date, category, location, seats, fee } = event;
  const article = document.createElement("article");
  article.className = "eventCard";

  const title = document.createElement("h3");
  title.textContent = name;

  const details = document.createElement("p");
  details.textContent = `${new Date(date).toDateString()} at ${location}`;

  const meta = document.createElement("div");
  meta.className = "event-meta";

  [category, `${seats} seats`, fee === 0 ? "Free" : `Rs. ${fee}`].forEach((item) => {
    const badge = document.createElement("span");
    badge.textContent = item;
    meta.appendChild(badge);
  });

  const registerButton = document.createElement("button");
  registerButton.className = "cta-button";
  registerButton.type = "button";
  registerButton.textContent = "Register";
  registerButton.onclick = () => registerUser(id);

  const cancelButton = document.createElement("button");
  cancelButton.className = "secondary-button";
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.disabled = !registrationsByEvent[id];
  cancelButton.onclick = () => cancelRegistration(id);

  article.append(title, details, meta, registerButton, cancelButton);
  return article;
}

function renderEvents() {
  const cards = filterEventsByCategory(activeCategory, createEventCard);
  eventCards.innerHTML = "";

  if (cards.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No matching upcoming events are available.";
    eventCards.appendChild(emptyMessage);
  } else {
    cards.forEach((card) => eventCards.appendChild(card));
  }

  renderEventOptions();
  renderAdminTable();
}

function renderEventOptions() {
  const options = events
    .filter((event) => event.checkAvailability())
    .map((event) => `<option value="${event.id}">${event.name}</option>`)
    .join("");

  selectedEvent.innerHTML = `<option value="">Choose an event</option>${options}`;
}

function renderAdminTable() {
  adminRows.innerHTML = events
    .map((event) => `
      <tr>
        <td>${event.name}</td>
        <td>${event.category}</td>
        <td>${event.location}</td>
        <td>${event.seats}</td>
      </tr>
    `)
    .join("");
}

function registerUser(eventId) {
  try {
    const event = events.find((item) => item.id === eventId);
    if (!event) {
      throw new Error("Event not found.");
    }
    if (!event.checkAvailability()) {
      throw new Error("This event is full or no longer upcoming.");
    }

    event.seats--;
    registrationsByEvent[event.id] = (registrationsByEvent[event.id] || 0) + 1;
    const totalForCategory = trackRegistration(event.category);
    output.value = `Registered for ${event.name}. ${event.category} registrations today: ${totalForCategory}.`;
    pageDirty = true;
    renderEvents();
  } catch (error) {
    output.value = error.message;
  }
}

function cancelRegistration(eventId) {
  try {
    const event = events.find((item) => item.id === eventId);
    if (!event || !registrationsByEvent[eventId]) {
      throw new Error("No active registration found for this event.");
    }

    event.seats++;
    registrationsByEvent[eventId]--;
    output.value = `Registration cancelled for ${event.name}. Seat count restored.`;
    renderEvents();
  } catch (error) {
    output.value = error.message;
  }
}

function validatePhone() {
  const phoneInput = document.querySelector("#phoneInput");
  const phoneError = document.querySelector("#phoneError");
  const phoneValue = phoneInput.value.trim();
  const isValid = /^[6-9][0-9]{9}$/.test(phoneValue);

  phoneInput.classList.toggle("valid-field", isValid);
  phoneInput.classList.toggle("invalid-field", !isValid && phoneValue.length > 0);
  phoneError.textContent = isValid
    ? "Phone number looks good."
    : "Enter a valid 10 digit phone number starting with 6, 7, 8, or 9.";
  phoneError.style.color = isValid ? "#176c5f" : "#b42318";
  phoneInput.setAttribute("aria-invalid", String(!isValid));
  interactionStatus.textContent = isValid ? "Blur event: phone number validated successfully." : "Blur event: phone number needs correction.";
  return isValid;
}

window.validatePhone = validatePhone;

function showEventFee() {
  const eventType = eventTypeSelect.value;
  const feeOutput = document.querySelector("#feeOutput");
  const matchingEvents = events.filter((event) => event.category === eventType && event.checkAvailability());
  const lowestFee = Math.min(...matchingEvents.map((event) => event.fee));

  if (eventType) {
    localStorage.setItem("preferredEventType", eventType);
    sessionStorage.setItem("lastSelectedEventType", eventType);
  }

  if (!eventType) {
    feeOutput.textContent = "Choose an event type to see the fee.";
    interactionStatus.textContent = "Change event: no event type selected.";
    return;
  }

  feeOutput.textContent = matchingEvents.length
    ? `${eventType} fee starts at ${lowestFee === 0 ? "Free" : "Rs. " + lowestFee}. ${matchingEvents.length} upcoming option(s) available.`
    : "No upcoming event found for this type.";
  interactionStatus.textContent = `Change event: ${eventType} fee details updated.`;
}

function restorePreferredEventType() {
  const preferredEventType = localStorage.getItem("preferredEventType");
  if (!preferredEventType) {
    return;
  }

  eventTypeSelect.value = preferredEventType;
  sessionStorage.setItem("lastSelectedEventType", preferredEventType);
  showEventFee();
  interactionStatus.textContent = `Preference restored: ${preferredEventType} was pre-selected.`;
}

function clearPreferences() {
  localStorage.removeItem("preferredEventType");
  sessionStorage.clear();
  eventTypeSelect.value = "";
  showEventFee();
  interactionStatus.textContent = "Preferences cleared from localStorage and sessionStorage.";
}

function showClickConfirmation() {
  console.log("Register button clicked.");
  interactionStatus.textContent = "Click event: register button clicked.";
  output.value = "Register button clicked. Checking your details...";
}

function enlargeImage(image) {
  document.querySelectorAll(".event-image.enlarged").forEach((activeImage) => {
    if (activeImage !== image) {
      activeImage.classList.remove("enlarged");
    }
  });
  image.classList.toggle("enlarged");
  interactionStatus.textContent = image.classList.contains("enlarged")
    ? `Double-click event: ${image.title} image enlarged.`
    : `Double-click event: ${image.title} image restored.`;
}

function countCharacters() {
  setTimeout(() => {
    const feedbackText = document.querySelector("#feedbackText");
    const remaining = feedbackLimit - feedbackText.value.length;
    const charCount = document.querySelector("#charCount");
    charCount.textContent = `${feedbackText.value.length} / ${feedbackLimit} characters typed. ${remaining} remaining.`;
    charCount.classList.toggle("limit-warning", remaining <= 30);
    interactionStatus.textContent = "Keyboard event: feedback character count updated.";
    pageDirty = feedbackText.value.length > 0;
  }, 0);
}

function videoReady() {
  document.querySelector("#videoStatus").textContent = "Video ready to play";
}

function getDistanceInKm(startLatitude, startLongitude, endLatitude, endLongitude) {
  const earthRadiusKm = 6371;
  const toRadians = (degrees) => degrees * Math.PI / 180;
  const latitudeDistance = toRadians(endLatitude - startLatitude);
  const longitudeDistance = toRadians(endLongitude - startLongitude);
  const startLatRadians = toRadians(startLatitude);
  const endLatRadians = toRadians(endLatitude);
  const a = Math.sin(latitudeDistance / 2) ** 2
    + Math.cos(startLatRadians) * Math.cos(endLatRadians) * Math.sin(longitudeDistance / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function findNearestEvent(latitude, longitude) {
  return events
    .filter((event) => event.checkAvailability() && Number.isFinite(event.latitude) && Number.isFinite(event.longitude))
    .map((event) => ({
      ...event,
      distance: getDistanceInKm(latitude, longitude, event.latitude, event.longitude)
    }))
    .sort((first, second) => first.distance - second.distance)[0];
}

function handleGeolocationSuccess(position) {
  const { latitude, longitude, accuracy } = position.coords;
  const nearestEvent = findNearestEvent(latitude, longitude);

  if (!nearestEvent) {
    geoOutput.textContent = `Your coordinates: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}. No upcoming mapped events are available.`;
    return;
  }

  geoOutput.textContent = `Your coordinates: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} with about ${Math.round(accuracy)}m accuracy. Nearest event: ${nearestEvent.name} at ${nearestEvent.location}, ${nearestEvent.distance.toFixed(2)} km away.`;
}

function handleGeolocationError(error) {
  if (error.code === error.PERMISSION_DENIED) {
    geoOutput.textContent = "Location permission was denied. Please allow location access to find nearby events.";
  } else if (error.code === error.TIMEOUT) {
    geoOutput.textContent = "Location request timed out. Please try again from a place with a stronger signal.";
  } else {
    geoOutput.textContent = "Unable to get your location right now. Please try again later.";
  }
}

function findNearbyEvents() {
  if (!navigator.geolocation) {
    geoOutput.textContent = "Geolocation is not supported in this browser.";
    return;
  }

  geoOutput.textContent = "Finding your location...";
  navigator.geolocation.getCurrentPosition(
    handleGeolocationSuccess,
    handleGeolocationError,
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function validateForm(formElements) {
  let valid = true;
  const nameError = document.querySelector('[data-error-for="name"]');
  const emailError = document.querySelector('[data-error-for="email"]');

  nameError.textContent = "";
  emailError.textContent = "";

  if (formElements.name.value.trim().length < 2) {
    nameError.textContent = "Name must be at least 2 characters.";
    valid = false;
  }

  if (!formElements.email.validity.valid) {
    emailError.textContent = "Enter a valid email address.";
    valid = false;
  }

  return valid && validatePhone();
}

function submitRegistration(payload) {
  console.log("Submitting registration payload", payload);

  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), 800);
  })
    .then((delayedPayload) => fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delayedPayload)
    }))
    .then((response) => {
      if (!response.ok) {
        throw new Error("Server did not accept the registration.");
      }
      return { ok: true, message: "Registration saved successfully." };
    })
    .catch((error) => ({
      ok: false,
      message: `Registration could not be sent to the mock API. ${error.message}`
    }));
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const formElements = event.target.elements;

  if (!validateForm(formElements)) {
    output.value = "Please fix the highlighted fields.";
    return;
  }

  const selected = events.find((item) => item.id === Number(formElements.selectedEvent.value));
  const payload = {
    name: formElements.name.value.trim(),
    email: formElements.email.value.trim(),
    phone: formElements.phone.value.trim(),
    date: formElements.date.value,
    eventType: formElements.eventType.value,
    selectedEvent: selected ? selected.name : "",
    message: formElements.message.value.trim()
  };

  if (selected) {
    registerUser(selected.id);
  }

  output.value = "Sending registration...";
  try {
    const response = await submitRegistration(payload);
    output.value = response.message;
    pageDirty = !response.ok;

    if (response.ok) {
      form.reset();
      showEventFee();
    }
  } catch (error) {
    output.value = `Unexpected registration error: ${error.message}`;
  }
}

function loadEventsWithThen() {
  return fetch("data/events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load local JSON.");
      }
      return response.json();
    })
    .catch(() => fallbackEvents);
}

async function loadEvents() {
  spinner.textContent = "Loading events...";
  const loadedEvents = await loadEventsWithThen();
  events = [];
  loadedEvents.forEach((event) => addEvent(event));
  spinner.textContent = "";
  renderEvents();

  const musicEvents = events.filter((event) => event.category === "Music");
  const formattedNames = events.map((event) => `${event.category} on ${event.name}`);
  console.log("Music events:", musicEvents);
  console.log("Formatted event names:", formattedNames);
  console.log("First event entries:", Object.entries(events[0] || {}));
}

categoryFilter.onchange = (event) => {
  activeCategory = event.target.value;
  renderEvents();
};

searchInput.onkeydown = () => {
  setTimeout(() => {
    searchTerm = searchInput.value;
    renderEvents();
  }, 0);
};

form.addEventListener("submit", handleFormSubmit);
form.addEventListener("input", () => {
  pageDirty = true;
});

document.querySelector("#phoneInput").addEventListener("blur", validatePhone);
findNearbyBtn.onclick = findNearbyEvents;
clearPreferencesBtn.onclick = clearPreferences;

window.addEventListener("load", () => {
  alert("Page fully loaded. Welcome to the Community Portal!");
  loadEvents();
  restorePreferredEventType();
});

window.addEventListener("beforeunload", (event) => {
  if (pageDirty) {
    event.preventDefault();
    event.returnValue = "";
  }
});

if (window.jQuery) {
  $("#registerBtn").on("click", function handleJqueryClick() {
    $("#eventCards .eventCard").fadeOut(80).fadeIn(180);
  });

  console.info("Framework note: React or Vue can make large portals easier to maintain by keeping UI state and reusable components organized.");
}

window.registerUser = registerUser;
window.cancelRegistration = cancelRegistration;
window.showEventFee = showEventFee;
window.showClickConfirmation = showClickConfirmation;
window.enlargeImage = enlargeImage;
window.countCharacters = countCharacters;
window.videoReady = videoReady;
