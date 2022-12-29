export const stringFormat = (input: string, ...replacer: string[]) => {
  for (let i = 0; i < replacer.length; i++) {
    input = input.replaceAll(`{${i}}`, replacer[i]);
  }
  return input;
};
