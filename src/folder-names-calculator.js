export const seasonSubFolderCalculator = number => {
  if (number === 1) {
    return '';
  }

  return 'Season ' + number.toString().padStart(2, '0') + '/';
};

export const subFolderCalculator = number => {
  let check = 100;
  while (check <= number) {
    check += 100;
  }

  return `${check - 99}-${check}`;
};
