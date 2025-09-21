import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { ColorCodes } from '../constants/ColorCodes';

const ProfitCalculator = ({ defaultValues = {} }) => {
  const [buyPrice, setBuyPrice] = useState(defaultValues.buyPrice || '');
  const [sellPrice, setSellPrice] = useState(defaultValues.sellPrice || '');
  const [quantity, setQuantity] = useState(defaultValues.quantity || '');
  const [leverage, setLeverage] = useState(defaultValues.leverage || 1);
  const [daysHeld, setDaysHeld] = useState(defaultValues.daysHeld || '');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (defaultValues.leverage) setLeverage(defaultValues.leverage);
  }, [defaultValues]);

  const calculateReturns = () => {
    const bp = Number(buyPrice);
    const sp = Number(sellPrice);
    const qty = Number(quantity);
    const lev = Number(leverage);
    const days = Number(daysHeld);

    if (!bp || !sp || !qty || !lev || days < 0) {
      alert('Please enter valid values.');
      return;
    }

    const totalInvestment = bp * qty;
    const margin = totalInvestment / lev;
    const fundingAmount = totalInvestment - margin;
    const interest = (fundingAmount * 0.15 * days) / 365;
    const profit = (sp - bp) * qty * lev;
    const turnover = (bp + sp) * qty;
    const brokerage = 20 * 2;
    const STT = turnover * 0.001;
    const otherTaxes = turnover * 0.0005;
    const totalCharges = brokerage + STT + otherTaxes;
    const netProfit = profit - interest - totalCharges;
    const profitPercent = (netProfit / margin) * 100;

    setResult({
      totalInvestment,
      margin,
      fundingAmount,
      interest: interest.toFixed(2),
      profit: profit.toFixed(2),
      brokerage: brokerage.toFixed(2),
      STT: STT.toFixed(2),
      otherTaxes: otherTaxes.toFixed(2),
      totalCharges: totalCharges.toFixed(2),
      netProfit: netProfit.toFixed(2),
      profitPercent: profitPercent.toFixed(2),
    });
  };

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: ColorCodes.main,
        color: ColorCodes.element,
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: 0,
      }}
    >
      {/* Inputs: responsive row layout */}
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        flexWrap="wrap"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <TextField
          label="Buy Price"
          variant="outlined"
          size="small"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 100,
            background: ColorCodes.element,
            color: ColorCodes.text,
          }}
          InputProps={{ required: true }}
          type="number"
        />
        <TextField
          label="Sell Price"
          variant="outlined"
          size="small"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 100,
            background: ColorCodes.element,
            color: ColorCodes.text,
          }}
          InputProps={{ required: true }}
          type="number"
        />
        <TextField
          label="Quantity"
          variant="outlined"
          size="small"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 100,
            background: ColorCodes.element,
            color: ColorCodes.text,
          }}
          InputProps={{ required: true }}
          type="number"
        />
        <TextField
          label="Leverage"
          variant="outlined"
          size="small"
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
          sx={{ flex: 1, minWidth: 100 }}
          InputProps={{ style: { color: ColorCodes.text }, readOnly: true }}
        />
        <TextField
          label="Days Held"
          variant="outlined"
          size="small"
          value={daysHeld}
          onChange={(e) => setDaysHeld(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 100,
            background: ColorCodes.element,
            color: ColorCodes.text,
          }}
          type="number"
          InputProps={{ required: true }}
        />
      </Stack>

      <Button
        variant="contained"
        onClick={calculateReturns}
        sx={{ mb: 2, backgroundColor: ColorCodes.Button }}
      >
        Calculate
      </Button>

      {result && (
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ mb: 1, borderColor: ColorCodes.border }} />
          <Stack spacing={1}>
            <Typography>
              Total Investment (Leveraged): ₹{result.totalInvestment}
            </Typography>
            <Typography>Margin (Your Investment): ₹{result.margin}</Typography>
            <Typography>Funding Amount: ₹{result.fundingAmount}</Typography>
            <Typography>Interest (15% p.a.): ₹{result.interest}</Typography>
            <Typography>Profit/Loss (Leveraged): ₹{result.profit}</Typography>
            <Typography>Brokerage: ₹{result.brokerage}</Typography>
            <Typography>STT: ₹{result.STT}</Typography>
            <Typography>Other Taxes: ₹{result.otherTaxes}</Typography>
            <Typography>
              <strong>Total Charges: ₹{result.totalCharges}</strong>
            </Typography>
            <Typography>
              <strong>Net Profit/Loss: ₹{result.netProfit}</strong>
            </Typography>
            <Typography
              sx={{
                color: result.profitPercent >= 0 ? 'lightgreen' : 'tomato',
              }}
            >
              <strong>
                Profit % on Your Investment: {result.profitPercent}%
              </strong>
            </Typography>
          </Stack>
        </Box>
      )}
    </Paper>
  );
};

export default ProfitCalculator;
