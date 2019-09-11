export const displayTime = (label: string, time: number) => {
  console.log(label + ": " + time + " ms");
};

export const runBefore = ({ first, last }: any = {}) => {
  const time = new Date().getTime();
  return time;
};

export const runAfter = (
  beforeTime: number,
  { chain, first, last }: any = {}
) => {
  const time = new Date().getTime();
  const diffTime = time - beforeTime;
  const chainWrds = `${first}-${last}`;
  const chainLength = chain.length;
  const chainComma = chain.join(",");
  console.log(chainWrds);
  displayTime(`${chainLength} ${chainComma} :: time`, diffTime);
  return time;
};
