const productContentContainer = document.querySelector("#productContent");

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

const moneyFormat = (price) => price.toFixed(2);

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

const generateProductDetails = (product) => {
  const productDetailsContainer = document.createElement("div");
  productDetailsContainer.className = "productDetails";

  productDetailsContainer.innerHTML = `
    ${generateImageContainer(product.productImage, product.product_name)};
    ${generateProductInfo(product)}
  `;
  return productDetailsContainer;
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

const generateMainTemplate = (data) => {
  const content = generateProductTemplate(data);
  console.log(content);
  productContentContainer.innerHTML = content;
};

generateMainTemplate(dummyData);
