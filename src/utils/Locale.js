export const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const dateFormatter = {
    formatDate(date) {
        if (!date) return '';
        date = date instanceof Date ? date : new Date(date);
        return date ? date.toLocaleDateString() : '';
    },
};
