 export const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "IDR",
        userGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};