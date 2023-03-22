import { TagType } from "./../types/index";
import { formatStr } from "./string";

export function searchTagsByKeywords(keywords: string, dataset: TagType[]) {
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
