import pt_br from './pt_br';

const getStrings = (language: string): Strings => {
  switch (language) {
    default:
      return pt_br;
  }
};

export default getStrings;
