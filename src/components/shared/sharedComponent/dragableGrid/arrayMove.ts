const arrayMoveMutate = (array: any[], from: any, to: number): any => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

const arrayMove = (array: any[], from: any, to: number): any => {
  // eslint-disable-next-line no-param-reassign
  array = array.slice();
  arrayMoveMutate(array, from, to);
  return array;
};

export default arrayMove;
