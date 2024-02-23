const promise1 = Promise.resolve(3);
const promise2 = Promise.reject(new Error('error'));
// const promise3 = new Promise((resolve, reject) => {
  // setTimeout(resolve, 100, 'foo');
// });
const promise4 = Promise.reject();

const testing = async () => {
  const promises = [promise1, promise2, promise4];
  const test = await Promise.all(promises.map(async (promise) => {
    try {
      const hi = await promise;
      return hi;
    } catch (error) {
      console.log('CATCH >>>', error);
      return {
        name: "MaxNumUserGroups",
        type: "Groups",
        limitValue: 10
      }
    }
  }))
  console.log('TEST', test);
  return test;
}

await testing()

export { };
