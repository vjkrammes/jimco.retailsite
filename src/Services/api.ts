export function getData(url: string) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw Error("There was an error fetching data: " + response.statusText);
    }
    return response.json();
  });
}
