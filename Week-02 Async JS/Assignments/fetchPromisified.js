function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) reject(new Error("Network error"));
        else resolve(res.json());
      })
      .catch(reject);
  });
}

// Usage
fetchData("https://jsonplaceholder.typicode.com/posts/1")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));