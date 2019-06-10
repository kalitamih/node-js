const retrieveData = (resource) => {
  const url = `https://swapi.co/api/${resource}/`;
  const chunk = 10;
  fetch(url)
    .then(body => body.json())
    .then(data => data.count)
    .then((chunkCount) => {
      const arrReq = [];
      for (let i = 1; i <= chunkCount; i += 1) {
        arrReq.push(
          fetch(`${url}?page=${i}`)
            .then(body => body.json())
            .then(data => data.results)
            .then(data => {
              const array = [];
              const method = 'POST';
              const headers = {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
              };
              for (let i = 0; i < data.length; i += 1) {
                const body = JSON.stringify(data[i]);
                array.push(fetch('http://localhost:3000', { method, headers, body }));
              }
            }),
        );
      }
      return arrReq;
    });
};

export default retrieveData;
