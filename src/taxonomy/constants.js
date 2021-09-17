
const CHROMOSOME_COUNT = {
  2: 'Diploid x2',
  3: 'Triploid x3',
  4: 'Tetraploid x4',
  5: 'Pentaploid x5',
  6: 'Hexaploid x6',
  8: 'Octoploid x8',
}

const RIPENING_MODIFIER = {
  Early: 'Early',
  Mid: 'Mid',
  Late: 'Late',
}

const RIPENING_MONTHS = {
  January: 'January',
  February: 'February',
  March: 'March',
  April: 'April',
  May: 'May',
  June: 'June',
  July: 'July',
  August: 'August',
  September: 'September',
  October: 'October',
  November: 'November',
  December: 'December',
}

const FRUIT_USES = {
  Baking: 'Baking',
  Cooking: 'Cooking',
  Cider: 'Cider',
  Drying: 'Drying',
  ['Fresh Eating']: 'Fresh Eating',
  Juice: 'Juice',
  Preserves: 'Preserves',
  Medicine: 'Medicine',
  Storage: 'Storage',
  Tea: 'Tea',
  Wine: 'Wine',
}

const MAX_BRIEF_DESCRIPTION = 300
const MAX_HISTORY = 5000


module.exports = {
  RIPENING_MONTHS,
  CHROMOSOME_COUNT,
  RIPENING_MODIFIER,
  FRUIT_USES,
  MAX_BRIEF_DESCRIPTION,
  MAX_HISTORY,
}