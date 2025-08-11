const home_section_name = "#home_section";
const home_section = $(home_section_name);

//-------------------- sub categories-------------------------//

const original_illustration_gallery_name = "#original_illustration_gallery";
const original_illustration_gallery = $(original_illustration_gallery_name);

const original_chibis_gallery_name = "#original_chibis_gallery";
const original_chibis_gallery = $(original_chibis_gallery_name);

const fanart_illustrations_gallery_name = "#fanart_illustrations_gallery";
const fanart_illustrations_gallery = $(fanart_illustrations_gallery_name);

const fanart_sticker_sheets_gallery_name = "#fanart_sticker_sheets_gallery";
const fanart_sticker_sheets_gallery = $(fanart_sticker_sheets_gallery_name);

const sketches_gallery_name = "#sketches_gallery";
const sketches_gallery = $(sketches_gallery_name);

const comics_xuehua_gallery_name = "#comics_xuehua_gallery";
const comics_xuehua_gallery = $(comics_xuehua_gallery_name);

//-------------------- sub categories-------------------------//

const modalImg = document.getElementById("modal-image");

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
];

const app = {
  init: function () {
    loadImages();
    hideLoadingScreen();
  },
};

app.init();

function loadImages() {
  imageCategories.forEach((category) => {
    category.categoryArray.forEach((image) => {
      let galleryClass = "gallery-thumbnail";
      if (
        category.categoryName === "original_chibis" ||
        category.categoryName === "fanart_sticker_sheets"
      ) {
        galleryClass = "chibi-gallery-thumbnail";
      }

      const imageThumbnailHTML = `
      <img
        src="${image}"
        class="${galleryClass} img-fluid"
        onclick="showImage(this.src)"
        data-bs-toggle="modal"
        data-bs-target="#galleryModal"
      />`;

      category.categoryElementId.append(imageThumbnailHTML);
    });
  });
}

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

function hideLoadingScreen() {
  const images = document.querySelectorAll(
    ".gallery-thumbnail, .chibi-gallery-thumbnail"
  ); // your gallery images
  let loadedCount = 0;

  if (images.length === 0) {
    // no images, hide immediately
    document.getElementById("loading-screen").style.display = "none";
    return;
  }

  images.forEach((img) => {
    // If image already loaded (from cache), count immediately
    if (img.complete && img.naturalHeight !== 0) {
      loadedCount++;
      if (loadedCount === images.length) {
        document.getElementById("loading-screen").style.display = "none";
      }
    } else {
      // listen for load event
      img.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === images.length) {
          document.getElementById("loading-screen").style.display = "none";
        }
      });
    }
  });
}
