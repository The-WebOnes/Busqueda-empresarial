const SEARCH_SERVICE = `   `;
const STORE_SERVICE = `http://localhost/projects/Busqueda-empresarial/Server/services/storeService.php`;

const SEARCH_INPUT = document.getElementById("SearchInput");
const SEARCH_BUTTON = document.getElementById("buttonSearch");
const CONTAINER_RESULTS = document.getElementById("results");
const FILES_INPUT = document.getElementById("FilesInput");
const SUMMIT_BUTTON = document.getElementById("SummitButton");

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
    let data = await response.text();
    console.log(data);
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
