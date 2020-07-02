export const getDateTime = () => {
  const rightNow = new Date(Date.now());
  return rightNow.toLocaleString([], {
    weekday: "short",
    month: "numeric",
    year: "numeric",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
};
function getPromise() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
export const newGame = () => {};
export const loadGame = () => {};

// .catch (err => { throw new Error('High level error' + err.message) })
// .catch (err => console.log(err));

// let day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(weekday); // this gimmicky shit doesn't work
// let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Say'];
// let day = days[rightNow.getDay()]
// let date = rightNow.toLocaleDateString();
// let time = rightNow.toLocaleTimeString([], { hour12: true, hour: "2-digit", minute: "2-digit" });
