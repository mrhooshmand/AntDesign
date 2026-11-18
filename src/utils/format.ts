const numberFormatter = new Intl.NumberFormat('en-US');

/**
 * Format a number with thousand separators.
 * Replaces numeral(val).format('0,0')
 */
export const formatNumber = (val: number | string): string => {
  const parsed = Number(val);
  return Number.isFinite(parsed) ? numberFormatter.format(parsed) : '';
};

/**
 * Format a number as US dollar currency string.
 * Replaces `$ ${numeral(val).format('0,0')}`
 */
export const formatDollar = (val: number | string) => `$ ${formatNumber(val)}`;
