/**
 * Validates a product object to ensure all fields meet required criteria.
 *
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The product title (must be between 10 and 80 characters).
 * @param {string} product.description - The product description (must be between 10 and 900 characters).
 * @param {string} product.imageURL - The image URL (must be a valid URL format).
 * @param {string} product.price - The product price (must be a valid number).
 * @returns {Object} An object containing error messages for each invalid field, or empty strings if valid.
 */
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  // imgUrl regex
  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  // title
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 characters";
  }
  //   description
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description must be between 10 and 900 characters";
  }
  //   imageUrl
  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid image URL is required";
  }
  // price
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid price is required";
  }
  return errors;
};
