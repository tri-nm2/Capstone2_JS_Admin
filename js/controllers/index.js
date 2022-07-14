let productList = new Array();
const indexValidation = new IndexValidation();

function renderProductList(data = productList) {
  let tag = ``;
  for (let i = 0; i < data.length; i++) {
    tag += `<tr>
              <td>${data[i].name}</td>
              <td>${data[i].price}</td>
              <td>${data[i].screen}</td>
              <td>${data[i].backCamera}</td>
              <td>${data[i].frontCamera}</td>            
              <td>
                <img src="${data[i].img}" alt="error" />
              </td>
              <td>${data[i].desc}</td>
              <td>${data[i].type}</td>
              <td class="text-center">
                <button id="btnShow" class="btn btn-primary mb-2" onclick="showProduct('${data[i].id}')" 
                data-toggle="modal" data-target="#myModal">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button id="btnDelete" class="btn btn-danger" onclick="showConfirm('${data[i].id}')"
                data-toggle="modal" data-target="#confirmModal">
                    <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>`;
  }

  document.getElementById("tblDanhSachSP").innerHTML = tag;
}

function findProductByID(data, id) {
  let leftIndex = 0;
  let rightIndex = data.length - 1;
  let midIndex = Math.floor((leftIndex + rightIndex) / 2);

  while (rightIndex >= leftIndex) {
    if (data[midIndex].id === id) {
      return data[midIndex];
    } else if (data[midIndex].id > id) {
      rightIndex = midIndex - 1;
      midIndex = Math.floor((leftIndex + rightIndex) / 2);
    } else {
      leftIndex = midIndex + 1;
      midIndex = Math.floor((leftIndex + rightIndex) / 2);
    }
  }

  return null;
}

function getProductList() {
  axios({
    url: "https://62c57c08134fa108c253a9cb.mockapi.io/api/product",
    method: "GET",
  }).then((response) => {
    productList = response.data;
    renderProductList();
  });
}

window.onload = function () {
  getProductList();
};

function clearModal() {
  document.getElementById("txtName").value = "";
  document.getElementById("txtPrice").value = "";
  document.getElementById("txtScreen").value = "";
  document.getElementById("txtBackCamera").value = "";
  document.getElementById("txtFrontCamera").value = "";
  document.getElementById("txtImage").value = "";
  document.getElementById("txtDescription").value = "";
  document.getElementById("slType").value = "Samsung";
}

function clearMessage() {
  document.getElementById("nameErrorMessage").classList.remove("d-block");
  document.getElementById("priceErrorMessage").classList.remove("d-block");
  document.getElementById("screenErrorMessage").classList.remove("d-block");
  document.getElementById("backCameraErrorMessage").classList.remove("d-block");
  document
    .getElementById("frontCameraErrorMessage")
    .classList.remove("d-block");
  document.getElementById("imageErrorMessage").classList.remove("d-block");
}

document.getElementById("btnAdd").onclick = () => {
  clearModal();
  clearMessage();
  document.getElementById("btnCreate").style.display = "block";
  document.getElementById("btnUpdate").style.display = "none";
};

function showProduct(id) {
  clearMessage();
  const product = findProductByID(productList, id);

  document.getElementById("txtName").value = product.name;
  document.getElementById("txtPrice").value = product.price;
  document.getElementById("txtScreen").value = product.screen;
  document.getElementById("txtBackCamera").value = product.backCamera;
  document.getElementById("txtFrontCamera").value = product.frontCamera;
  document.getElementById("txtImage").value = product.img;
  document.getElementById("txtDescription").value = product.desc;
  if (product.type.toLowerCase() === "samsung") {
    document.getElementById("slType").value = "Samsung";
  } else {
    document.getElementById("slType").value = "Iphone";
  }
  document.getElementById("txtProductID").value = id;

  document.getElementById("btnCreate").style.display = "none";
  document.getElementById("btnUpdate").style.display = "block";
}

function showConfirm(id) {
  document.getElementById("txtDeleteID").value = id;
}

function createProduct() {
  if (!indexValidation.isValidForm()) return;

  const name = document.getElementById("txtName").value;
  const price = document.getElementById("txtPrice").value;
  const screen = document.getElementById("txtScreen").value;
  const backCamera = document.getElementById("txtBackCamera").value;
  const frontCamera = document.getElementById("txtFrontCamera").value;
  const img = document.getElementById("txtImage").value;
  const desc = document.getElementById("txtDescription").value;
  const type = document.getElementById("slType").value;

  const product = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  axios({
    url: "https://62c57c08134fa108c253a9cb.mockapi.io/api/product",
    method: "POST",
    data: product,
  })
    .then((response) => {
      getProductList();
      document.getElementById("btnClose").click();
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateProduct() {
  if (!indexValidation.isValidForm()) return;

  const id = document.getElementById("txtProductID").value;
  let product = findProductByID(productList, id);
  product.name = document.getElementById("txtName").value;
  product.price = document.getElementById("txtPrice").value;
  product.screen = document.getElementById("txtScreen").value;
  product.backCamera = document.getElementById("txtBackCamera").value;
  product.frontCamera = document.getElementById("txtFrontCamera").value;
  product.img = document.getElementById("txtImage").value;
  product.desc = document.getElementById("txtDescription").value;
  product.type = document.getElementById("slType").value;

  axios({
    url: "https://62c57c08134fa108c253a9cb.mockapi.io/api/product/" + id,
    method: "PUT",
    data: product,
  })
    .then((response) => {
      getProductList();
      document.getElementById("btnClose").click();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteProduct() {
  const id = document.getElementById("txtDeleteID").value;

  axios({
    url: "https://62c57c08134fa108c253a9cb.mockapi.io/api/product/" + id,
    method: "DELETE",
  })
    .then((response) => {
      getProductList();
      document.getElementById("btnConfirmClose").click();
    })
    .catch((error) => {
      console.log(error);
    });
}

function debounceSearch(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function searchProduct() {
  const keyWord = document.getElementById("txtSearch").value;
  let searchList = new Array();

  for (let item of productList) {
    if (item.name.toLowerCase().includes(keyWord.toLowerCase().trim())) {
      searchList.push(item);
    }
  }

  renderProductList(searchList);
}

document.getElementById("txtSearch").oninput = debounceSearch(() => {
  searchProduct();
});
