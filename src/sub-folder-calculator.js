export default number => {
  let check = 100;
  while (check <= number) {
    check += 100;
  }

  return `${check - 99}-${check}`;
};
