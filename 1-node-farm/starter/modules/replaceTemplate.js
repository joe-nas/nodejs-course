module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  //! REPLACE this monstrosity
  // .replace(/{%IMAGE%}/g, product.image)
  // .replace(/{%FROM%}/g, product.from)
  // .replace(/{%NUTRIENTS%}/g, product.nutrients)
  // .replace(/{%QUANTITY%}/g, product.quantity)
  // .replace(/{%DESCRIPTION%}/g, product.description)
  // .replace(/{%PRICE%}/g, product.price)
  // .replace(/{%ID%}/g, product.id);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) {
    output.replace(/{%NOTORGANIC%}/g, "not-organic");
  }
  // console.log(output);
  return output;
};
