# gallery
Simple art portfolio website inspired by carrd

## TO-DO and Bugs:
* Think of how to load sections dynamically
* Add character design sub category

This is really horrible and only for my own reference, please ignore. 

## How to add new images
1. In ``images.js``, locate the sub-category it belongs to and put its source in the respective array

## How to add new sub-category

1. In ``images.js``, create a new array (e.g. new_subcategory) and add all images sources to it

Example:
```
const original_chibis = [
  "./assets/artwork/original/chibis/Standee.png",
  "./assets/artwork/original/chibis/tail_wag.png",
  "./assets/artwork/original/chibis/az.png",
  "./assets/artwork/original/chibis/vampwolf.png",
  "./assets/artwork/original/chibis/Jules_Halloween.png",
  "./assets/artwork/original/chibis/Jianqing_Chibi_Doodle.png",
  "./assets/artwork/original/chibis/Qiu_Ye_Chibi_Doodle.png",
  "./assets/artwork/original/chibis/design_2.png",
  "./assets/artwork/original/chibis/design_1.png",
];
```

2. In ```index.html```, add the following under the section's ``content-box``:

```
<div class="sub-heading row justify-content-center">chibis</div>
    <div
        class="d-flex flex-row flex-wrap justify-content-center mt-3 gallery-container"
        id="original_chibis_gallery"
    ></div>
<hr class="dashed mt-3" />

```

3. In ```main.js```, add the following under the ``imageCategories`` array:

```
  {
    categoryArray: original_chibis, //this must match name of array created in step 1
    categoryElementId: original_chibis_gallery, //this must match id in step 2
    categoryName: "original_chibis" //this is categoryArray but a string
  }
```

If any special handling is required, ``loadImages()`` function does a check for the categoryName

4. In ```main.js```, add the following at the start of the JS file:

```
//This should be the same name as the id of your sub-category
const original_chibis_gallery_name = "#original_chibis_gallery";
const original_chibis_gallery = $(original_chibis_gallery_name);
```

## How to add new section

1. In ```images.js```, add the name of the sections array:

```const sections = ["#original"];```

2. In ```index.html```, create the new section

Example section:

```

<div
    class="row justify-content-center content-box mb-5 pb-4 px-5"
    id="original"
          style="display: none"
>
    <h1 class="site-heading mt-5">Original Art</h1>
    <hr class="dashed mt-3" />

    <!---------------------------Sub-categories start----------------------------->

    <!---------------------------Sub-categories end----------------------------->

    <!---------------------------Footer----------------------------->
    <div
        class="d-flex flex-row flex-wrap justify-content-between mt-2 footer-buttons"
    >
        <button 
            class="footer-btn px-3" 
            onclick="backToHome();">
            <div
                class="d-flex flex-row justify-content-between align-items-center"
            >
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                <span>back</span>
              </div>
        </button>
        <button 
            class="footer-btn px-3" 
            onclick="window.scrollTo({top:0,behavior:'smooth'})">
            <div
                class="d-flex flex-row justify-content-between align-items-center"
            >
                <i class="fa fa-arrow-up" aria-hidden="true"></i>
                <span>top</span>
            </div>
        </button>
    </div>
</div>

```

3. In the home section of ```index.html```, add a button for the new section

Example:

```
<a
    class="main-btn d-flex justify-content-between align-items-center"
    onclick="jumpToSection('#original');"
>
    <span>original art</span>
    <i class="fa fa-paint-brush btn-icon" aria-hidden="true"></i>
</a>

```

4. Follow steps for "How to add new sub-category" for any sub-categories required


