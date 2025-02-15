/**
 *
 * @param {string} text -the input text to be sliced
 * @param {number} [maxLength=50]  - the maximum length of the sliced text
 * @returns the sliced text with an ellipsis
 */
export function textSlice(text: string, maxLength: number = 50) {
  if (text.length >= maxLength) return `${text.slice(0, maxLength)}...`;
  return text;
}




/**
 * Converts a string price to a number and formats it with commas
 * @param {string} price - the price to be formatted
 * @returns the formatted price as a string
 */
export function formatPrice(price: string): string {
  const formattedPrice = Number(price).toLocaleString();
  return formattedPrice;
}
