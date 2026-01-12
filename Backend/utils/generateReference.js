const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const generateReference = (length = 8) => {
  let reference = '';
  for (let index = 0; index < length; index += 1) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    reference += alphabet[randomIndex];
  }
  return `RB-${reference}`;
};

export default generateReference;
