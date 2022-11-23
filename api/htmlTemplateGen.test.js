/**
 * @jest-environment jsdom
 */

const htmlGen = require("./htmlTemplateGen");

describe("htmlTemplateGen", () => {
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

  test("moneyFormat should work as expected", () => {
    const price = 400;

    const res = htmlGen.moneyFormat(price);
    const expected = "400.00";

    expect(res).toBe(expected);
  });

  test("string Format is parsed when  using moneyFormat", () => {
    const price = "400";

    const res = htmlGen.moneyFormat(price);
    const expected = "400.00";

    expect(res).toBe(expected);
  });

  test("generateControls works as expected", () => {
    const res = htmlGen.generateControls();

    const expected = `
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

    expect(res).toBe(expected);
  });

  test("generateProductTemplate Works as expected", () => {
    const res = htmlGen.generateProductInfo(dummyData[0]);
    console.log(res)
    const expected = `
   <div class="imgContainer">
   <img
     src=https://imgs.search.brave.com/6GQdp1OmFWVnW4qsDQVwqnkjEt128D4GR_SLeNfCe3I/rs:fit:1200:1000:1/g:ce/aHR0cHM6Ly9zdGF0/aWMuaGlnaHNub2Jp/ZXR5LmNvbS90aHVt/Ym9yL1N4NGhEUWJM/UkxKREZGYW44MVRT/aS11OFQxTT0vMTUw/MHgxMDAwL2h0dHBz/Oi8vd2hhdGRyb3Bz/bm93LnMzLmFtYXpv/bmF3cy5jb20vcHJv/ZHVjdF9pbWFnZS8x/NzE0Mzgvc2hyaW5l/X2ltYWdlL2NhMzgw/ZGI5NmUzNzZhNzFj/ZTdiNmM0NWVlNTIy/MzA1LmpwZw
     alt=Playstation 5 console
   />
 </div>
 <div class="productInfo">
    <h3 class="productTitle">Playstation 5 console</h3>
    <span class="price">$450.00</span>
    <span class="inStock">out of stock</span>
    <button class="addBtn">Add to cart</button>
 </div>
`;

    expect(res).toBe(expected);
  });
});
