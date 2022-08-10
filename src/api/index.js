import baseUrl from './environment';

export function fetchItem(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, title: `title-${id}====${baseUrl}` });
    }, 1000);
  });
}
