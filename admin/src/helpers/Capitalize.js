export const Capitalize = (text) => {
  const textArray = text.split(" ");
  for (var i = 0; i < textArray.length; i++) {
    textArray[i] = textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1);
  }
  return textArray.join(" ");
}
