function formatStr(string) {
  return string
    .toLowerCase()
    .replace(/[éèêë]/g, "e")
    .replace(/[àäâ]/g, "a")
    .replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o")
    .replace(/[ùûû]/g, "u")
    .replace(/[ç]/g, "c");
}

export function searchTagsByKeywords(keywords, dataset) {
  //   const keywordsFormatted = formatKeywords(keywords);

  let elementsResults = [];
  const formattedKeywords = formatStr(keywords);
  for (let element of dataset) {
    let formattedName = formatStr(element.name);

    if (formattedName.includes(formattedKeywords)) {
      elementsResults.push(element);
    }
  }

  return elementsResults;
}
