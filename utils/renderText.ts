const renderText = (text: string, word: number = 20) => {
  if (text.length > word) {
    return text.slice(0, word) + "...";
  } else {
    return text;
  }
};

export default renderText;
