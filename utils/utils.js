export const ConvertToCurrency = (amount) => {
    return "$" + Number(amount || 0).toFixed(2);
};