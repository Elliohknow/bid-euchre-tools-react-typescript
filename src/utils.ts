export function formatDateTime(date?: Date): string {
  const rightNow = date ?? new Date(Date.now());
  return rightNow.toLocaleString([], {
    weekday: "short",
    month: "numeric",
    year: "numeric",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function UUID(): string {
  let result = "";
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function keyByNicknameReducer(acc: object, player: any) {
  return { ...acc, [player.nickname]: player };
}

export function getkeyedObjectFromArray(array: Array<any>) {
  let keyedObject: object = array.reduce(keyByNicknameReducer, {});
  return keyedObject;
}
