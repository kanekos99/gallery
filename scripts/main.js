const home_section_name = "#home_section";
const home_section = $(home_section_name);

const original_illustration_gallery_name = "#original_illustration_gallery";
const original_illustration_gallery = $(original_illustration_gallery_name);

const original_chibis_gallery_name = "#original_chibis_gallery";
const original_chibis_gallery = $(original_chibis_gallery_name);

const modalImg = document.getElementById("modal-image");
const modal_loader = document.getElementById("modal-loader");

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
      let galleryClass = "gallery-thumbnail";
      if (category.categoryName === "original_chibis") {
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

$(window).on("hashchange", handleHashChange);

function handleHashChange() {
  if (sections.includes(window.location.hash)) {
    const selectedSection = window.location.hash;
    jumpToSection(selectedSection);
  } else {
    backToHome();
  }
}


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
  modal_loader.style.display = "block"; 
  modalImg.style.display = "none"; 
  modalImg.src = src;

  modalImg.onload = function () {
    modal_loader.style.display = "none"; 
    modalImg.style.display = "block"; 
  };
}
