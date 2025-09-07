const home_section_name = "#home_section";
const home_section = $(home_section_name);

//-------------------- sub categories-------------------------//

const original_illustration_gallery_name = "#original_illustration_gallery";
const original_illustration_gallery = $(original_illustration_gallery_name);

const original_chibis_gallery_name = "#original_chibis_gallery";
const original_chibis_gallery = $(original_chibis_gallery_name);

const original_character_designs_gallery_name =
  "#original_character_designs_gallery";
const original_character_designs_gallery = $(
  original_character_designs_gallery_name
);

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
    categoryArray: original_character_designs,
    categoryElementId: original_character_designs_gallery,
    categoryName: "original_character_designs",
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
  },
};

app.init();

function loadImages() {
  imageCategories.forEach((category) => {
    category.categoryArray.forEach((image) => {

      //FOR NEOCITIES GALLERY - REPLACE SRC WITH THIS URL INSTEAD
      let externalUrl =
        "https://kanekos99.github.io/gallery" + image.substring(1);
        
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
        src="${image}"
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
  .querySelectorAll("img.gallery-thumbnail, img.chibi-gallery-thumbnail")
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
