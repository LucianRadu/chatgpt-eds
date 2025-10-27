export default async function decorate(block, onDataLoaded) {
  block.textContent = 'Content loading...';
  onDataLoaded(async (data) => {
    // eslint-disable-next-line no-console
    console.log('Data loaded', data);
    block.textContent = 'Hello World';
  });
}
