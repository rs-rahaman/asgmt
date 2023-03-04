// load api and
let loadAPI = () => {
  let allDataUrl = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(allDataUrl)
    .then((res) => res.json())
    .then((data) => displayProduct(data.data.tools));
  toggleSpinier(true);
};

// During the first API load, 6 data are loaded the slice through
let displayProduct = (data) => {
  data = data.slice(0, 6);
  func(data);
  toggleSpinier(false);
};
let func = (data) => {
  data.forEach((element) => {
    let getProductContainer = document.getElementById("productContainer");
    let crtDiv = document.createElement("div");
    crtDiv.innerHTML = `
    <div class="card col-12  m-5 col-sm-6 col-md-4">
    <img src="${element.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h4 class="card-title">Features</h4>
      <ol class="" id="ol">
      <li class=" ">${
        element.features[0] ? element.features[0] : "no data found"
      }</li>
      <li class="">${
        element.features[2] ? element.features[2] : "no data found"
      }</li>
      <li class="">${
        element.features[3] ? element.features[3] : "no data found"
      }</li>
      </ol>
      <div class="cardFooter">
        <h4 class="card-title">${element.name}</h4>
        <div class="date d-flex align-items-center justify-content-between">
          <div class="img d-flex">
            <img
              src="./img/dateIMg.png"
              class="me-2"
              alt=""
              width="25px"
              height="25px"
            />
            <p>${element.published_in}</p>
          </div>
          <i id="modalBtn"
          onclick="loadWithId('${element.id}')"
            class="fa-solid fa-arrow-right"
            data-bs-target="#exampleModalToggle"
            data-bs-toggle="modal"
          ></i>
        </div>
      </div>
    </div>
    </div>
  `;
    getProductContainer.appendChild(crtDiv);
    loadWithId(element.id);
  });
};

// show all data to click see more button
let loadAllData = () => {
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then((res) => res.json())
    .then((data) => displayAllData(data.data.tools));
};
let displayAllData = (data) => {
  data = data.slice(6, 12);
  func(data);
};

// load api to show data on modal agin and dynamic the url for modal`s dates
let loadAllDataForID = () => {
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then((res) => res.json())
    .then((id) => loadWithId(id));
};
let loadWithId = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => displayWithId(data.data));
};

// create a modal and show all data on modal dynamically
let displayWithId = (data) => {
  let getModalContainer = document.getElementById("modalBody");
  getModalContainer.innerHTML = `
      <div class="card m-0 ms-5 mb-5 col-12 col-sm-6" style="width: 28rem">
        <div class="card-body">
          <h4 class="card-title">${data.tool_name}</h4>
          <h6>${data.description}</h6>;
        </div>
        <div class="d-flex">
          <div class="card m-2 bg-muted text-primary">
            <div class="card-body">
              <h6 class="text-primary">${data.pricing[0].plan}</h6>
              <h6 class="text-dark">${
                data.pricing[0].price
                  ? data.pricing[0].price
                  : data.pricing[0].price === "0"
                  ? "Free of Cost/Basic"
                  : "Free of Cost/Basic"
              }</h6>
            </div>
          </div>
          <div class="card m-2 bg-danger-subtle text-success">
            <div class="card-body">
              <h6 class="text-primary">${data.pricing[1].plan}</h6>
              <h6>${
                data.pricing[1].price
                  ? data.pricing[1].price
                  : data.pricing[1].price === "0"
                  ? "Free Of Cost/Pro"
                  : "Free Of Cost/Pro"
              }</h6>
            </div>
          </div>
          <div class="card m-2 bg-warning-subtle text-danger">
            <div class="card-body">
              <h6 class="text-primary">${data.pricing[2].plan}</h6>
              <h6>${
                data.pricing[2].price
                  ? data.pricing[2].price
                  : data.pricing[2].price === "0"
                  ? "Free of Cost /Enterprise"
                  : "Free of Cost /Enterprise"
              }</h6>
            </div>
            </div>
        </div>
          <div class="d-flex">
            <div class="ul ms-3">
              <h5>Features</h5>
              <ul>
                <li>${
                  data.features[1].feature_name
                    ? data.features[1].feature_name
                    : "no data font "
                }</li>
                <li>${
                  data.features[2].feature_name
                    ? data.features[2].feature_name
                    : "no data found"
                }</li>
                <li>${
                  data.features[3].feature_name
                    ? data.features[3].feature_name
                    : "no data found"
                }</li>
              </ul>
            </div>
          <div class="ul ms-3 ">
            <h5>Integrations</h5>
            <ul>
              <li>${
                data.integrations[0] ? data.integrations[0] : "no data found"
              }</li>
              <li>${
                data.integrations[1] ? data.integrations[1] : "no data found"
              }</li>
              <li>${
                data.integrations[2] ? data.integrations[2] : "no data found"
              }</li>
            </ul>
          </div>
        </div>
    </div>
      <div class="card ms-5 col-12 col-sm-6 " style="width: 28rem">
          <div class="d-flex ms-5 imgFull position-relative"> 
            <img src="${
              data.image_link[0]
                ? data.image_link[0]
                : "There is no image found"
            }" class="card-img-top  img-fluid" alt="..." />
            <h5 class="position-absolute end-0 me-0">
            <span class="badge bg-danger scoreBadge">
              ${data.accuracy.score ? data.accuracy.score : "NAN"}%
            </span>
            </h5>
          </div>
          <div class="">
            <h5 class="ms-3 mt-5">${data.input_output_examples[0].input}</h5>
            <p class="ms-3 mt-3">${data.input_output_examples[0].output}</p>
          </div>
      </div>
        `;
};
loadAllDataForID();

// dynamic the show more button and hide the button when all data is loaded
document.getElementById("seeMoreBtn").addEventListener("click", function () {
  loadAllData();
  let seeMoreBtn = document.getElementById("seeMoreBtn");
  seeMoreBtn.classList.add("d-none");
});

// dynamic spinier and show the spinier when load data
let toggleSpinier = (isLodging) => {
  let getLoader = document.getElementById("loader");
  if (isLodging) {
    getLoader.classList.remove("d-none");
  } else {
    getLoader.classList.add("d-none");
  }
};
loadAPI();
