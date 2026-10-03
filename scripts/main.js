const home_section_name = "#home_section";
const home_section = $(home_section_name);

//-------------------- sub categories-------------------------//

const original_illustration_gallery_name = "#original_illustration_gallery";
const original_illustration_gallery = $(original_illustration_gallery_name);

const original_chibis_gallery_name = "#original_chibis_gallery";
const original_chibis_gallery = $(original_chibis_gallery_name);

const chara_refs_gallery_name = "#charas_refs_gallery";
const charas_refs_gallery = $(chara_refs_gallery_name);

const charas_drafts_gallery_name = "#charas_drafts_gallery";
const charas_drafts_gallery = $(charas_drafts_gallery_name);

const fanart_illustrations_gallery_name = "#fanart_illustrations_gallery";
const fanart_illustrations_gallery = $(fanart_illustrations_gallery_name);

const fanart_sticker_sheets_gallery_name = "#fanart_sticker_sheets_gallery";
const fanart_sticker_sheets_gallery = $(fanart_sticker_sheets_gallery_name);

const sketches_gallery_name = "#sketches_gallery";
const sketches_gallery = $(sketches_gallery_name);

const comics_xuehua_gallery_name = "#comics_xuehua_gallery";
const comics_xuehua_gallery = $(comics_xuehua_gallery_name);

const comics_childhood_dream_gallery_name = "#comics_childhood_dream_gallery";
const comics_childhood_dream_gallery = $(comics_childhood_dream_gallery_name);

const comics_snowy_day_name = "#comics_snowy_day_gallery";
const comics_snowy_day_gallery = $(comics_snowy_day_name);

const animation_gallery_name = "#animation_gallery";
const animation_gallery = $(animation_gallery_name);

//-------------------- sub categories-------------------------//

const modalImg = document.getElementById("modal-image");
const modalVid = document.getElementById("modal-video");

const imageCategories = [
  {
    categoryArray: original_illustrations,
    categoryElementId: original_illustration_gallery,
    categoryName: "original_illustrations",
  },
  {
    categoryArray: original_chibis,
    categoryElementId: original_chibis_gallery,
    categoryName: "original_chibis",
  },
  {
    categoryArray: charas_refs,
    categoryElementId: charas_refs_gallery,
    categoryName: "charas_refs",
  },
  {
    categoryArray: charas_drafts,
    categoryElementId: charas_drafts_gallery,
    categoryName: "charas_drafts",
  },
  {
    categoryArray: fanart_illustrations,
    categoryElementId: fanart_illustrations_gallery,
    categoryName: "fanart_illustrations",
  },
  {
    categoryArray: fanart_sticker_sheets,
    categoryElementId: fanart_sticker_sheets_gallery,
    categoryName: "fanart_sticker_sheets",
  },
  {
    categoryArray: sketches,
    categoryElementId: sketches_gallery,
    categoryName: "sketches",
  },
  {
    categoryArray: xuehua_comic,
    categoryElementId: comics_xuehua_gallery,
    categoryName: "xuehua_comic",
  },
  {
    categoryArray: childhood_dream_comic,
    categoryElementId: comics_childhood_dream_gallery,
    categoryName: "childhood_dream_comic",
  },
  {
    categoryArray: snowy_day_comic,
    categoryElementId: comics_snowy_day_gallery,
    categoryName: "snowy_day_comic",
  },
];

const app = {
  init: function () {
    loadImages();
    loadVideos();
  },
};

app.init();

function isNeocities() {
  const neocitiesHost = "https://kanekos.neocities.org";
  const currentUrl = window.location.href;
  if (currentUrl.startsWith(neocitiesHost)) {
    return true;
  } else {
    return false;
  }
}

function loadImages() {
  imageCategories.forEach((category) => {
    category.categoryArray.forEach((image) => {
      let imageSrc = image;
      if (isNeocities()) {
        imageSrc = "https://kanekos99.github.io/gallery" + image.substring(1);
      }
      let galleryClass = "gallery-thumbnail";
      if (
        category.categoryName === "original_chibis" ||
        category.categoryName === "fanart_sticker_sheets"
      ) {
        galleryClass = "chibi-gallery-thumbnail";
      }

      //Lazy Load Option 1 - using small image placeholder
      //const smallImage = image.replace(/(.*\/)([^\/]+)$/, "$1small/$2");
      // const imageThumbnailHTML = `
      // <img
      //   src="${smallImage}"
      //   data-src="${image}"
      //   loading="lazy"
      //   class="${galleryClass} img-fluid"
      //   onclick="showImage(this.src)"
      //   data-bs-toggle="modal"
      //   data-bs-target="#galleryModal"
      // />`;

      //Lazy Load Option 2 - no small image placeholder
      const imageThumbnailHTML = `
      <img
        src="${imageSrc}"
        loading="lazy"
        class="${galleryClass} img-fluid"
        onclick="showImage(this.src)"
        data-bs-toggle="modal"
        data-bs-target="#galleryModal"
      />`;

      category.categoryElementId.append(imageThumbnailHTML);
    });
  });
}

//Lazy Load Option 1 - using small image placeholder
// document
//   .querySelectorAll("img.gallery-thumbnail, img.chibi-gallery-thumbnail")
//   .forEach((img) => {
//     if (img.complete) {
//       img.src = img.dataset.src;
//     } else {
//       img.addEventListener("load", () => {
//         img.src = img.dataset.src;
//       });
//     }
//   });

//Lazy Load Option 2 - no small image placeholder
document
  .querySelectorAll(
    "img.gallery-thumbnail, img.chibi-gallery-thumbnail, vid.chibi-gallery-thumbnail",
  )
  .forEach((img) => {
    img.style.opacity = 0; // start hidden
    img.addEventListener("load", () => {
      img.style.transition = "opacity 0.7s ease";
      img.style.opacity = 1; // fade in once loaded
    });
  });

function jumpToSection(sectionId) {
  const selectedSection = $(sectionId);

  // hide all active sections
  $(".active").hide().removeClass("active");

  //show selected section
  selectedSection.show();
  selectedSection.addClass("active");
  location.hash = sectionId;
}

function backToHome() {
  // hide all active sections
  $(".active").hide().removeClass("active");

  //show home section
  home_section.show();
  home_section.addClass("active");
  location.hash = "";
}

function handleHashChange() {
  if (sections.includes(window.location.hash)) {
    const selectedSection = window.location.hash;
    jumpToSection(selectedSection);
  } else {
    backToHome();
  }
}

$(window).on("hashchange", handleHashChange);
window.addEventListener("DOMContentLoaded", () => {
  const currentHash = window.location.hash;
  handleHashChange(currentHash);
});

function showNextOrPrevImg(direction) {
  const visibleImages = $("img:visible").not("#modal-image").toArray();
  const currentSrc = modalImg.src;
  let currentIndex = visibleImages.findIndex((img) => img.src === currentSrc);
  let nextIndex = currentIndex + direction;
  if (direction === 1 && nextIndex >= visibleImages.length) {
    nextIndex = 0;
  } else if (direction === -1 && nextIndex === -1) {
    nextIndex = visibleImages.length - 1;
  }
  showImage($(visibleImages[nextIndex]).attr("src"));
}

function showImage(src) {
  modalImg.style.display = "none";
  modalImg.src = src;

  modalImg.onload = function () {
    modalImg.style.display = "block";
  };
}

/*-------------- for animation gallery ---------------*/

const videoYTLink = document.getElementById("video_yt_link");
const videoModal = document.getElementById("videoModal");

function loadVideos() {
  animations.forEach((video) => {
    let thumbnailSrc = video.thumbnail;
    if (isNeocities()) {
      thumbnailSrc =
        "https://kanekos99.github.io/gallery" + video.thumbnail.substring(1);
    }
    const videoThumbnailHTML = `
    <div class="vid-thumb-container">
        <img
          src="${thumbnailSrc}"
          loading="lazy"
          class="vid-gallery-thumbnail img-fluid"
          onclick="getVideoByName(this)"
          data-vid-name = "${video.name}"
          data-bs-toggle="modal"
          data-bs-target="#videoModal"
        />
        <div class="play-overlay">
          <i class="fa fa-play-circle" aria-hidden="true"></i>
        </div>
    </div>`;
    animation_gallery.append(videoThumbnailHTML);
  });
}

function getVideoByName(video) {
  const targetVideoName = video.dataset.vidName;
  showVideo(targetVideoName);
}

function showVideo(videoName) {
  modalVid.innerHTML = "";
  const targetVideo = animations.find(
    (animation) => animation.name === videoName,
  );
  const source = document.createElement("source");
  let videoSource = targetVideo.link;
  if (isNeocities()) {
    videoSource =
      "https://kanekos99.github.io/gallery" + targetVideo.link.substring(1);
  }
  source.src = videoSource;
  source.type = "video/mp4";
  source.id = "video_source";
  source.dataset.vidName = videoName;
  modalVid.appendChild(source);
  videoYTLink.href = targetVideo.yt_link;
  modalVid.load();
}

videoModal.addEventListener("hidden.bs.modal", function () {
  modalVid.pause();
  modalVid.currentTime = 0;
});

function showNextOrPrevVid(direction) {
  const videoSource = document.getElementById("video_source");
  const currentVidName = videoSource.dataset.vidName;
  let currentVidIndex = animations.findIndex(
    (vid) => vid.name === currentVidName,
  );
  let nextIndex = currentVidIndex + direction;
  if (direction === 1 && nextIndex >= animations.length) {
    nextIndex = 0;
  } else if (direction === -1 && nextIndex === -1) {
    nextIndex = animations.length - 1;
  }
  modalVid.pause();
  showVideo(animations[nextIndex].name);
}
