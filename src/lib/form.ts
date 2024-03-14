export const fillFormDataWithKeys = (form: FormData, object: string | object) => {
  Object.entries(object).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      form.append(key, value);
    }
  });
};
