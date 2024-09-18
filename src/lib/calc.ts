export const pmt = (
  principal: number,
  interest: number,
  periods: number
): number => {
  return (
    principal *
    ((interest * Math.pow(1 + interest, periods)) /
      (Math.pow(1 + interest, periods) - 1))
  );
};
