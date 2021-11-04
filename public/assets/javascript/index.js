const SEARCH_SERVICE = `http://localhost/Busqueda-empresarial/Server/services/queryService.php`;
const STORE_SERVICE = `http://localhost/Busqueda-empresarial/Server/services/storeService.php`;

const SEARCH_INPUT = document.getElementById("SearchInput");
const SEARCH_BUTTON = document.getElementById("buttonSearch");
const CONTAINER_RESULTS = document.getElementById("results");
const FILES_INPUT = document.getElementById("FilesInput");
const SUMMIT_BUTTON = document.getElementById("SummitButton");
const LOADING = document.getElementById("loading");
const CHECK = document.getElementById("check");

let waitTime;

LOADING.style.display = "none";
CHECK.style.display = "none";

const getResponse = async (direction) => {
  try {
    let Search = SEARCH_INPUT.value;
    const response = await fetch(direction + `?q=${Search}`);
    let data = await response.text();
    console.log(data);
    CONTAINER_RESULTS.innerHTML = data;
  } catch (error) {
    console.log(error);
    CONTAINER_RESULTS.innerHTML = "ocurrio un error indesperado";
  }
};

const summitFiles = async (direction) => {
  try {
    let files = FILES_INPUT.files;

    if (files.length <= 0) {
      alert("Ingrese un archivo");
      return;
    }
    const formData = new FormData();

    for (const file of files) {
      formData.append("files[]", file);
    }

    const response = await fetch(`${direction}`, {
      method: "POST",
      body: formData,
    });
    LOADING.style.display = "block";
    let data = await response.text();
    console.log(data);
    delayTemp();
    CHECK.style.display = "none!important";
    
  } catch (error) {
    console.log(error);
  }
};

SEARCH_BUTTON.addEventListener("click", () => {
  getResponse(SEARCH_SERVICE);
});

SUMMIT_BUTTON.addEventListener("click", () => {
  summitFiles(STORE_SERVICE);
});


function delayTemp() {
  waitTime = setTimeout(delay, 1500);
}

function delay() {
  LOADING.style.display = "none";
  FILES_INPUT.value = "";
  CHECK.style.display = "block";
  setTimeout(()=>{
    CHECK.style.display = "none";
},500);
}
