const fullChart = document.getElementById("neurochart-wrapper");
const neurochart = document.getElementById("neurochart");
const form = document.getElementById("form");
const fileImageUpload = document.getElementById("file-image-upload");
const urlImageUpload = document.getElementById("url-image-upload");
const imageUploadType = document.getElementById("image-upload-type");
const linearLateralSlider = document.getElementById("linear-lateral");
const lexicalImpressionistSlider = document.getElementById(
  "lexical-impressionist"
);

const allImages = [];
const imagePlacementCursor = document.createElement("img");
imagePlacementCursor.src = "./white-square.png";
imagePlacementCursor.style.top = `${100 - (100 / 16) * 8}%`;
imagePlacementCursor.style.left = `${(100 / 16) * 8 - 0 * 2.5}%`;
imagePlacementCursor.style.opacity = "20%";

neurochart.appendChild(imagePlacementCursor);

allImages.push(imagePlacementCursor);

linearLateralSlider.addEventListener("input", sliderOnChange);
lexicalImpressionistSlider.addEventListener("input", sliderOnChange);
imageUploadType.addEventListener("change", imageSelectOnChange);
form.addEventListener("submit", submit);

updateImage();

function sliderOnChange(event) {
  event.preventDefault();

  if (event.target.name == "linear-lateral") {
    imagePlacementCursor.style.top = `${
      100 - (100 / 16) * event.target.value
    }%`;
  } else {
    imagePlacementCursor.style.left = `${
      (100 / 16) * event.target.value - 0 * 2.5
    }%`;
  }
}

function imageSelectOnChange(event) {
  if (event.target.value === "file") {
    fileImageUpload.style.visibility = "visible";
    urlImageUpload.style.visibility = "hidden";
  } else {
    fileImageUpload.style.visibility = "hidden";
    urlImageUpload.style.visibility = "visible";
  }
}

function submit(event) {
  event.preventDefault();

  const lateralLinear = event.target["linear-lateral"].value;
  const lexicalImpressionist = event.target["lexical-impressionist"].value;

  const image = document.createElement("img");
  allImages.push(image);

  const imageIndex = allImages.indexOf(image);

  image.style.top = `${100 - (100 / 16) * lateralLinear}%`;
  image.style.left = `${(100 / 16) * lexicalImpressionist - imageIndex * 2.5}%`;

  if (event.target["image-upload-type"].value === "file") {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target["avatar-file"].files[0]);

    fileReader.onload = (event) => {
      if (event.target.readyState === FileReader.DONE) {
        image.src = event.target.result;
        neurochart.appendChild(image);
      }

      updateImage();
    };
  } else {
    image.src = event.target["avatar-url"].value;
    neurochart.appendChild(image);

    updateImage();
  }
}

function updateImage() {
  domtoimage
    .toPng(document.getElementById("neurochart-wrapper"))
    .then((dataUrl) => {
      document.getElementById("image-save").href = dataUrl;
    });
}
