export const fillFormDataWithKeys = (form: FormData, object: string | object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      form.append(key, value);
    }
  });
};

export const formattedPrice = (price: number): string => new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR'
}).format(price).padEnd(4, '0');
