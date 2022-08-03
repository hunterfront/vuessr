export function fetchItem(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, title: `title-${id}` });
    }, 1000);
  });
}
