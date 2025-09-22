import { mtf } from '../constants/MStock';
import { zerodhaMtf } from '../constants/Zerodha';

export const handleData = (data, broker) => {
  if (!data || data.length < 3) return [];

  // Extract price data from Excel
  const priceData = data.slice(2).map((row) => ({
    name: row[2],
    price: row[5],
  }));

  const priceNames = priceData.map((p) => p.name);

  // Select broker data
  const brokerData = broker === 'MSTOCK' ? mtf : zerodhaMtf;
  const marginMap = Object.fromEntries(
    brokerData.map((stock) => [
      stock.symbol,
      broker === 'MSTOCK' ? stock.percent : stock.leverage,
    ])
  );

  // Find common stocks and combine data
  const response = priceNames
    .filter((name) => marginMap[name] !== undefined)
    .map((name) => ({
      name,
      margin: marginMap[name],
      price: priceData.find((p) => p.name === name).price,
    }));

  // Sort by margin descending
  return response.sort((a, b) => b.margin - a.margin);
};

// Search stocks by symbol
export const searchMargin = (query) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();

  return zerodhaMtf.filter((stock) =>
    stock.symbol.toLowerCase().includes(lowerQuery)
  );
};
