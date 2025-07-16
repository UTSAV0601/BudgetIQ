export const formatCurrency = (amount: number, currency = 'USD') => 
  new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency 
  }).format(amount);

export const formatDate = (dateString: string) => 
  new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

export const formatPercentage = (value: number) => 
  `${value.toFixed(1)}%`;

export const CHART_COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', 
  '#FF8042', '#8884D8', '#82CA9D'
];