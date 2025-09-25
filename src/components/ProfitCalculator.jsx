import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
  Stack,
  MenuItem,
  Select,
  InputAdornment,
  FormControl,
} from '@mui/material';
import { ColorCodes } from '../constants/ColorCodes';
import AlertInfo from './AlertInfo';

// Reusable InputField component
const InputField = ({
  label,
  value,
  onChange,
  type = 'number',
  placeholder,
  readOnly = false,
  startAdornment,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: { xs: '100%', sm: 200 },
      mb: 2,
    }}
  >
    <span
      style={{ marginBottom: 4, fontWeight: 'bold', color: ColorCodes.new }}
    >
      {label}
    </span>
    <TextField
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder || label}
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : null,
        readOnly,
        required: true,
      }}
      sx={{
        flex: 1,
        minWidth: 100,
        background: ColorCodes.main,
        '& .MuiOutlinedInput-input': { color: ColorCodes.new },
        '& .MuiOutlinedInput-root fieldset': { borderColor: ColorCodes.new },
        '& .MuiOutlinedInput-root:hover fieldset': {
          borderColor: ColorCodes.new,
        },
        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
          borderColor: ColorCodes.new,
        },
      }}
    />
  </Box>
);

const ProfitCalculator = ({ defaultValues = {} }) => {
  const [buyPrice, setBuyPrice] = useState(defaultValues.buyPrice || '');
  const [sellPrice, setSellPrice] = useState(defaultValues.sellPrice || '');
  const [quantity, setQuantity] = useState(defaultValues.quantity || '');
  const [leverage, setLeverage] = useState(defaultValues.leverage || 1);
  const [daysHeld, setDaysHeld] = useState(defaultValues.daysHeld || '');
  const [quantityType, setQuantityType] = useState(
    defaultValues.quantityType || 'investment'
  );
  const [sellType, setSellType] = useState(defaultValues.sellType || 'percent');
  const [result, setResult] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (defaultValues.leverage) setLeverage(defaultValues.leverage);
  }, [defaultValues]);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const calculateReturns = () => {
    const bp = Number(buyPrice);
    let sp = Number(sellPrice);
    const qty = Number(quantity);
    const lev = Number(leverage);
    const days = Number(daysHeld);

    if (!bp || !sp || !qty || !lev || days < 0 || !quantityType || !sellType) {
      setAlertMessage('Please enter valid values.');
      setAlertOpen(true);
      return;
    }

    sp = sellType === 'exact' ? sp : bp + (bp * sp) / 100;
    const totalInvestment =
      quantityType === 'quantity' ? bp * qty : qty * leverage;
    const margin = quantityType === 'quantity' ? totalInvestment / lev : qty;
    const fundingAmount = totalInvestment - margin;
    const shares =
      quantityType === 'quantity' ? qty : Math.trunc(totalInvestment / bp);

    const profit = (sp - bp) * shares;
    const turnover = (bp + sp) * shares;
    const brokerage = 20 * 2;
    const STT = days > 0 ? turnover * 0.001 : shares * sp * 0.00025;
    const stampCharges = shares * bp * (days > 0 ? 0.00015 : 0.00003);
    const transactionCharges = turnover * 0.0000297;
    const sebiCharges = turnover * 0.000001;
    const gst = 0.18 * (sebiCharges + brokerage + transactionCharges);
    const totalCharges =
      brokerage + STT + sebiCharges + stampCharges + transactionCharges + gst;
    const netProfit =
      profit - (fundingAmount * 0.15 * days) / 365 - totalCharges;
    const profitPercent = (netProfit / margin) * 100;

    setResult({
      totalInvestment: Number(totalInvestment.toFixed(2)),
      margin: Number(margin.toFixed(2)),
      fundingAmount: Number(fundingAmount.toFixed(2)),
      interest: Number(((fundingAmount * 0.15 * days) / 365).toFixed(2)),
      profit: Number(profit.toFixed(2)),
      totalCharges: Number(totalCharges.toFixed(2)),
      netProfit: Number(netProfit.toFixed(2)),
      profitPercent: Number(profitPercent.toFixed(2)),
    });
  };

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: ColorCodes.main,
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: 0,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          flexWrap="wrap"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <InputField
            label="Buy Price"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
          />

          <InputField
            label="Sell Price / Percent"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            startAdornment={
              <FormControl variant="standard">
                <Select
                  value={sellType}
                  onChange={(e) => setSellType(e.target.value)}
                  disableUnderline
                  sx={{
                    minWidth: 80,
                    background: ColorCodes.main,
                    color: ColorCodes.new,
                  }}
                >
                  <MenuItem value="percent">Percent</MenuItem>
                  <MenuItem value="exact">Exact</MenuItem>
                </Select>
              </FormControl>
            }
          />

          <InputField
            label="Leverage"
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            readOnly
          />

          <InputField
            label="Days Held"
            value={daysHeld}
            onChange={(e) => setDaysHeld(e.target.value)}
          />

          <InputField
            label="Quantity / Investment"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            startAdornment={
              <FormControl variant="standard">
                <Select
                  value={quantityType}
                  onChange={(e) => setQuantityType(e.target.value)}
                  disableUnderline
                  sx={{
                    minWidth: 80,
                    background: ColorCodes.main,
                    color: ColorCodes.new,
                  }}
                >
                  <MenuItem value="quantity">Quantity</MenuItem>
                  <MenuItem value="investment">Investment</MenuItem>
                </Select>
              </FormControl>
            }
          />
        </Stack>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button
          variant="outlined"
          onClick={calculateReturns}
          sx={{
            mb: 2,
            backgroundColor: ColorCodes.main,
            color: ColorCodes.new,
            borderColor: ColorCodes.new,
          }}
        >
          Calculate
        </Button>
      </Box>
      {result && (
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ mb: 1, borderColor: ColorCodes.new }} />
          <Stack
            spacing={1}
            sx={{ color: ColorCodes.new, alignItems: 'center' }}
          >
            <Typography>
              Total Investment (Leveraged): ₹{result.totalInvestment}
            </Typography>
            <Typography>Margin (Your Investment): ₹{result.margin}</Typography>
            <Typography>Funding Amount: ₹{result.fundingAmount}</Typography>
            <Typography>Interest (15% p.a.): ₹{result.interest}</Typography>
            <Typography>Profit/Loss (Leveraged): ₹{result.profit}</Typography>
            <Typography>
              <strong>Total Charges: ₹{result.totalCharges}</strong>
            </Typography>
            <Typography>
              <strong>Net Profit/Loss: ₹{result.netProfit}</strong>
            </Typography>
            <Typography
              sx={{
                display: 'inline-block',
                fontWeight: 'bold',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                color: result.profitPercent >= 0 ? 'lightgreen' : 'tomato',
                backgroundColor: ColorCodes.main,
              }}
            >
              Profit % on Your Investment: {result.profitPercent}%
            </Typography>
          </Stack>
        </Box>
      )}

      {/* Snackbar alert */}
      <AlertInfo
        open={alertOpen}
        handleClose={handleAlertClose}
        message={alertMessage}
      />
    </Paper>
  );
};

export default ProfitCalculator;
