const searchForm = document.querySelector("#searchForm");
const searchBtn = document.querySelector("#submitBtn");
const productInfo = document.querySelector("#productContent");
const searchInput = document.querySelector("#searchInput")

let currentStore = "";

const dummyData = [
  {
    store: "Amazon",
    product_name: "Playstation 5 console",
    price: 450,
    is_in_stock: false,
    productImage:
      "https://imgs.search.brave.com/6GQdp1OmFWVnW4qsDQVwqnkjEt128D4GR_SLeNfCe3I/rs:fit:1200:1000:1/g:ce/aHR0cHM6Ly9zdGF0/aWMuaGlnaHNub2Jp/ZXR5LmNvbS90aHVt/Ym9yL1N4NGhEUWJM/UkxKREZGYW44MVRT/aS11OFQxTT0vMTUw/MHgxMDAwL2h0dHBz/Oi8vd2hhdGRyb3Bz/bm93LnMzLmFtYXpv/bmF3cy5jb20vcHJv/ZHVjdF9pbWFnZS8x/NzE0Mzgvc2hyaW5l/X2ltYWdlL2NhMzgw/ZGI5NmUzNzZhNzFj/ZTdiNmM0NWVlNTIy/MzA1LmpwZw",
  },
  {
    store: "Best Buy",
    product_name: "Playstation 5 console",
    price: 450,
    is_in_stock: false,
    productImage:
      "https://imgs.search.brave.com/6GQdp1OmFWVnW4qsDQVwqnkjEt128D4GR_SLeNfCe3I/rs:fit:1200:1000:1/g:ce/aHR0cHM6Ly9zdGF0/aWMuaGlnaHNub2Jp/ZXR5LmNvbS90aHVt/Ym9yL1N4NGhEUWJM/UkxKREZGYW44MVRT/aS11OFQxTT0vMTUw/MHgxMDAwL2h0dHBz/Oi8vd2hhdGRyb3Bz/bm93LnMzLmFtYXpv/bmF3cy5jb20vcHJv/ZHVjdF9pbWFnZS8x/NzE0Mzgvc2hyaW5l/X2ltYWdlL2NhMzgw/ZGI5NmUzNzZhNzFj/ZTdiNmM0NWVlNTIy/MzA1LmpwZw",
  },
];

const dummyStores = [
  { name: "Best Buy", logo: "Best Buy", buttonVal: "bestBuy" },
  { name: "Amazon", logo: "Amazon", buttonVal: "amazon" },
];

const moneyFormat = (price) => parseInt(price).toFixed(2);

const generateControls = () => `
  <span class="update">Update</span>
  <div class="updateHourly">
    <label for="">update every(hour):</label>
    <input type="number" placeholder="1"/>
  </div>
  <div class="cartFunctionality">
    <label for="">Add to cart automatically:</label>
    <input type="checkbox" name="automatic" id="" />
  </div>
  `;

const generateProductInfo = (productInfo) => {
  const { product_name, price, is_in_stock, productImage } = productInfo;

  const inStockText = is_in_stock ? "in stock" : "out of stock";

  const res = `
   <div class="imgContainer">
   <img
     src=${productImage}
     alt=${product_name}
   />
 </div>
 <div class="productInfo">
    <h3 class="productTitle">${product_name}</h3>
    <span class="price">$${moneyFormat(price)}</span>
    <span class="inStock">${inStockText}</span>
    <button class="addBtn">Add to cart</button>
 </div>
`;

  return res;
};

const generateProductTemplate = (data) => {
  let res = "";

  data.map((product) => {
    res += `
    <section class="productContainer">
    <article class="contentContainer">
      <div class="title">
        <h2>${product.store}</h2>
      </div>
      <section class="product">
        <div class="productDetails">${generateProductInfo(product)}</div>
        <div class="controls">${generateControls()}</div>
      </section>
    </article>
  </section>
    `;
  });
  return res;
};

const getSibling = (nodeEl, className) => {
  if (!nodeEl) {
    return;
  }
  if (nodeEl.className !== className) {
    return getSibling(nodeEl.previousElementSibling, className);
  } else {
    return nodeEl;
  }
};

const generateMainTemplate = (data) => {
  const productContentContainer = document.querySelector("#productContent");

  const content = generateProductTemplate(data);
  productContentContainer.innerHTML = content;

  productInfo.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className === "addBtn") {
      let sibling = e.target.previousElementSibling;
      let titleEl = "";
      while (!titleEl) {
        titleEl = getSibling(sibling, "productTitle");
      }
      const title = titleEl.innerText;
      console.log(title);
    }
  });
};

const homePageStoreTemplate = (stores) => {
  const title = `<h1>Pick A Website</h1>`;
  let storeSection = "";
  for (let store of stores) {
    storeSection += `<button id=${store.name} value=${store.buttonVal}>${store.logo}</button>`;
  }
  const res = `<section>
  ${title}
  <div>
  ${storeSection}
  </div>
  </section>`;

  return res;
};

const searchProductRequest = async (store, product) => {
  const url = `http://localhost:8080/product/${store}/$${product}`;

  try {
    const res = await fetch(url);
    console.log(product)
    const data = res.json();
    console.log(data);
    return data
  } catch (error) {
    console.log(error);
  }
};

const generateHomePageTemplate = (stores) => {
  const productContentContainer = document.querySelector("#homeTemplate");

  const storesTemplate = homePageStoreTemplate(stores);

  productContentContainer.innerHTML += storesTemplate;

  productContentContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName === "BUTTON") {
      currentStore = e.target.value;
    }
  });
};

generateHomePageTemplate(dummyStores);

console.log("hello");

searchBtn.addEventListener("click", async(e) => {
  e.preventDefault();
  console.log("clicked");
  const title = searchInput.value
  const productData = await searchProductRequest(currentStore, title)
  console.log(productData)
  generateMainTemplate(dummyData);
});

searchForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  generateMainTemplate(dummyData);
});

console.log(productInfo);

module.exports = {
  moneyFormat,
  generateControls,
  generateProductInfo,
  generateMainTemplate,
};
