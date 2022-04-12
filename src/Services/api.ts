import { ICart } from "../Interfaces/ICart";
import { uriBuilder } from "./tools";

export function getData(url: string) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw Error("There was an error fetching data: " + response.statusText);
    }
    return response.json();
  });
}

export function getHash(plaintext: string) {
  console.log("hashing, string = " + plaintext);
  return fetch(uriBuilder("Utility/Hash"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: plaintext,
  }).then((response) => {
    if (!response.ok) {
      throw Error("There was an error fetching hash: " + response.statusText);
    }
    return response;
  });
}
