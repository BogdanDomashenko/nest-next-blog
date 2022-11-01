type YupError = {
  [key: string]: { type: string; message: string };
};

export const errorToField = (errors: any, field: string) => {
  const error = errors[field] as YupError;

  if (error) {
    return {
      error: !!error,
      helperText: error.message,
    } as any;
  }

  return;
};
