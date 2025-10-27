export default async function decorate(block, onDataLoaded) {
  block.textContent = 'Content loading...';
  onDataLoaded(async (data) => {
    console.log('Data loaded', data);
    block.textContent = 'Hello World';
  });
}