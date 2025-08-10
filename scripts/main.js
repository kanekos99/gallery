const original_illustration_gallery_name = "#original_illustration_gallery";
const original_illustration_gallery = $(original_illustration_gallery_name);

const original_chibis_gallery_name = "#original_chibis_gallery";
const original_chibis_gallery = $(original_chibis_gallery_name);

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
      />`;
      category.categoryElementId.append(imageThumbnailHTML);
    });
  });
}
