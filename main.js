const nameInput = document.getElementById("name");
const artistInput = document.getElementById("artist");
const btnAdd = document.getElementById("btnAdd");
var formSavedSection = document.getElementsByClassName("form-saved-section");

const songs = [];
const songsArray = [];

// Service Worker Registration Code Start //
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js", { scope: "/" })
    .then(function (registration) {
      console.log("Register Success", registration);
    })
    .catch(function (error) {
      console.error("Register Failed", error);
    });
} else {
  console.log("Service worker are not supported");
}
// Service Worker Registration Code End //

btnAdd.addEventListener("click", function (event) {
  if (nameInput.value.trim() == "" && artistInput.value.trim() == "") {
    nameInput.classList.add("shake");
    artistInput.classList.add("shake");

    nameInput.placeholder = "Title is required";
    artistInput.placeholder = "Artist is required";
  } else if (nameInput.value.trim() == "") {
    nameInput.classList.add("shake");
    nameInput.placeholder = "Title is required";
  } else if (artistInput.value.trim() == "") {
    artistInput.classList.add("shake");
    artistInput.placeholder = "Artist is required";
  } else {
    console.log("Test111");
    let title = nameInput.value.trim();
    let artist = artistInput.value.trim();

    const songDiv = document.createElement("div");
    songDiv.classList.add("songs-list-section");
    const titleLbl = document.createElement("h1");
    titleLbl.textContent = title;
    const artistLbl = document.createElement("h3");
    artistLbl.textContent = artist;

    songs.push({ title, artist });

    songs.forEach(function (item) {
      console.log(item.title);
      console.log(item.artist);

      songDiv.appendChild(titleLbl);
      songDiv.appendChild(artistLbl);

      formSavedSection[0].appendChild(songDiv);
    });
  }
});

nameInput.addEventListener("focus", function () {
  nameInput.value = "";
});

artistInput.addEventListener("focus", function () {
  artistInput.value = "";
});
