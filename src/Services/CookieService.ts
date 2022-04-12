export function setCookie(key: string, value: string, expiresInDays: number) {
  const date = new Date();
  date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
  const expiration = "expires=" + date.toUTCString();
  const cookievalue = key + "=" + value + ";secure;" + expiration + ";path=/";
  document.cookie = cookievalue;
}

export function getCookie(key: string): string {
  const prefix = key + "=";
  const cookies = decodeURIComponent(document.cookie);
  const parts = cookies.split(";");
  for (var i = 0; i < parts.length; i++) {
    let part = parts[i];
    while (part.charAt(0) === " ") {
      part = part.substring(1);
    }
    if (part.indexOf(prefix) === 0) {
      return part.substring(prefix.length, part.length);
    }
  }
  return "";
}
