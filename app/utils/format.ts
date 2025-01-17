export const formatPhone = (value: string) => {
    // Remove non-numeric characters
    let formatted = value.replace(/[^\d]/g, '');
    
    // Add formatting (e.g. (123) 456-7890)
    if (formatted.length > 3 && formatted.length <= 6) {
      formatted = `(${formatted.slice(0, 3)}) ${formatted.slice(3)}`;
    } else if (formatted.length > 6) {
      formatted = `(${formatted.slice(0, 3)}) ${formatted.slice(3, 6)}-${formatted.slice(6, 10)}`;
    }
    return formatted;
  };


  