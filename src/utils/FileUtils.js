import { mtf } from '../constants/MStock';

export const handleData = (data) => {
  const priceData = [];
  const priceNames = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0 || i === 1) continue;
    const name = data[i][2];
    priceData.push({ name: name, price: data[i][5] });
    priceNames.push(name);
  }

  const marginData = mtf.map((stock) => {
    return stock.symbol;
  });

  const commonData = priceNames.filter((name) => marginData.includes(name));

  const response = commonData.map((name) => {
    const margin = mtf.find((stock) => stock.symbol === name);
    const price = priceData.find((stock) => stock.name === name);
    return { name: name, margin: margin.percent, price: price['price'] };
  });

  return response.sort((a, b) => {
    return b.margin - a.margin;
  });
};

export const searchMargin = (query) => {
  if (query === '') return [];

  return mtf.filter((stock) => {
    return (
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
    );
  });
};
