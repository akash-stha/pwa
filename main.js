const nameInput = document.getElementById("name");
const artistInput = document.getElementById("artist");
const btnAdd = document.getElementById("btnAdd");
var formSavedSection = document.getElementsByClassName("form-saved-section");

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
    saveSongs(nameInput.value.trim(), artistInput.value.trim());
  }
});

function addToDOM(titleValue, artistValue, likesValue, KeyValue) {
  let title = titleValue;
  let artist = artistValue;

  console.log("loop ran");

  const songDiv = document.createElement("div");
  songDiv.classList.add("songs-list-section");

  const titleLbl = document.createElement("h1");
  titleLbl.textContent = title;
  const artistLbl = document.createElement("h3");
  artistLbl.textContent = artist;

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("song-title-section");
  const btnRemove = document.createElement("button");
  btnRemove.classList.add("btn-remove");
  btnRemove.innerText = "Remove";

  const likeDiv = document.createElement("div");
  likeDiv.classList.add("song-like-section");
  const likeCount = document.createElement("h1");
  likeCount.textContent = "Likes: " + likesValue;
  const btnLike = document.createElement("button");
  btnLike.classList.add("btn-like");
  btnLike.innerText = "👍 Like";

  titleDiv.appendChild(titleLbl);
  titleDiv.appendChild(artistLbl);
  titleDiv.appendChild(btnRemove);

  likeDiv.appendChild(likeCount);
  likeDiv.appendChild(btnLike);

  songDiv.appendChild(titleDiv);
  songDiv.appendChild(likeDiv);

  btnRemove.addEventListener("click", () => removeSong(KeyValue));
  btnLike.addEventListener("click", () => increaseLike(likesValue, KeyValue));

  formSavedSection[0].appendChild(songDiv);
}

function getSongs() {
  firebase
    .database()
    .ref("akash/songs")
    .on("value", (snapshot) => {
      if (snapshot.exists()) {
        formSavedSection[0].innerHTML =
          '<div class="title-section"> <h2>LIST OF SONGS</h2></div>';
        snapshot.forEach((item) => {
          const songItem = item.val();
          addToDOM(songItem.title, songItem.artist, songItem.likes, item.key);
        });
      } else {
        formSavedSection[0].innerHTML =
          '<div class="title-section"> <h2>LIST OF SONGS</h2></div>';
      }
    });
}

function saveSongs(titleValue, artistValue) {
  const dbRef = firebase.database().ref("akash/songs").push();
  dbRef.set(
    {
      title: titleValue,
      artist: artistValue,
      likes: 0,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

function increaseLike(likesValue, KeyValue) {
  firebase
    .database()
    .ref(`akash/songs/${KeyValue}`)
    .update({
      likes: Number(likesValue) + 1,
    });
}

function removeSong(KeyValue) {
  firebase.database().ref(`akash/songs/${KeyValue}`).remove();
}

nameInput.addEventListener("focus", function () {
  nameInput.value = "";
});

artistInput.addEventListener("focus", function () {
  artistInput.value = "";
});

getSongs();
