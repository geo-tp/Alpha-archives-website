export function formatStr(string: string) {
  return string
    .toLowerCase()
    .replace(/[éèêë]/g, "e")
    .replace(/[àäâ]/g, "a")
    .replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o")
    .replace(/[ùûû]/g, "u")
    .replace(/[ç]/g, "c");
}
