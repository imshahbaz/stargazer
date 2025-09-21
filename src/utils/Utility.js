import { readFile, writeFileSync } from 'fs';

// Convert CSV string to JSON string with mapping
function csvToJson(
  csv,
  columnMapping,
  numberFields = [],
  leverageThreshold = 0
) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');

  const result = lines
    .slice(1)
    .map((line) => {
      const values = line.split(',');
      let obj = {};

      Object.entries(columnMapping).forEach(([csvCol, jsonKey]) => {
        const idx = headers.indexOf(csvCol);
        if (idx !== -1) {
          let val = values[idx] ? values[idx].trim() : null;

          // Convert to number if this field is numeric
          if (val !== null && numberFields.includes(jsonKey)) {
            val = Number(val);
          }

          obj[jsonKey] = val;
        }
      });

      return obj;
    })
    // Filter only where leverage > threshold
    .filter((item) => item.leverage > leverageThreshold);

  return JSON.stringify(result, null, 2);
}

// Read CSV file
const fileName = 'data.csv'; // same folder

// Set leverage threshold here
const leverageThreshold = 3; // ✅ only include rows with leverage > 3

readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Error reading file:', err);
    return;
  }

  // Define mapping: { "CSV_Column_Name": "JSON_Key_Name" }
  const columnMapping = {
    tradingsymbol: 'symbol',
    margin: 'margin',
    leverage: 'leverage',
  };

  // Fields that should be numbers
  const numberFields = ['margin', 'leverage'];

  const jsonString = csvToJson(
    data,
    columnMapping,
    numberFields,
    leverageThreshold
  );

  writeFileSync('output.json', jsonString, 'utf8');
  console.log('📂 JSON saved to output.json');
});
