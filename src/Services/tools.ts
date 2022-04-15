import appSettings from "../static.json";

export function uriBuilder(uri: string) {
  return appSettings.apiBase + uri;
}

export function toCurrency(value: number): string {
  return "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function randomFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export function generateSku(length: number) {
  var builder = [];
  for (let i = 0; i < length; i++) {
    var ix = 0;
    if (i === 0) {
      ix = randomFromInterval(1, 9);
    } else {
      ix = randomFromInterval(0, 9);
    }
    builder.push(digits[ix]);
  }
  return builder.join("");
}

const loremIpsumSource =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duisaute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sintoccaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";

export function GenerateLoremIpsum(
  minWords: number,
  maxWords: number,
  minSentences: number,
  maxSentences: number,
  paragraphs: number
) {
  const words = [...new Set(loremIpsumSource.split(" "))];
  if (minWords > maxWords) {
    [minWords, maxWords] = [maxWords, minWords];
  }
  if (minSentences > maxSentences) {
    [minSentences, maxSentences] = [maxSentences, minSentences];
  }
  const numSentences =
    minSentences === maxSentences
      ? minSentences
      : randomFromInterval(minSentences, maxSentences);
  const builder = [];
  for (let p = 0; p < paragraphs; p++) {
    for (let s = 0; s < numSentences; s++) {
      const numWords =
        minWords === maxWords
          ? minWords
          : randomFromInterval(minWords, maxWords);
      for (let w = 0; w < numWords; w++) {
        var word = words[Math.floor(Math.random() * words.length)];
        if (w === 0) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        builder.push(word);
        if (w !== numWords - 1) {
          builder.push(" ");
        }
      }
      builder.push(". ");
    }
    builder.push("\n");
  }
  return builder.join("");
}

export function statusDescription(
  status: number,
  capitalize: boolean = true
): string {
  switch (status) {
    case 1:
      return capitalize ? "Pending" : "pending";
    case 2:
      return capitalize ? "Open" : "open";
    case 3:
      return capitalize ? "Canceled by customer" : "canceled by customer";
    case 4:
      return capitalize ? "Canceled by store" : "canceled by store";
    case 5:
      return capitalize ? "In progress" : "in progress";
    case 6:
      return capitalize ? "Shipped" : "shipped";
    case 7:
      return capitalize ? "Back ordered" : "back ordered";
    case 8:
      return capitalize ? "Out of stock" : "out of stock";
    default:
      return capitalize ? "Unknown" : "unknown";
  }
}
