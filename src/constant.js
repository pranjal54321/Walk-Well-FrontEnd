export const SERVER = "https://localhost:7257";

export function createURL(path) {
  return `${SERVER}/${path}`;
}