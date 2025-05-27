export const formatPrice = (price: number, currency: string = "RWF") => {
    return new Intl.NumberFormat("rw-RW", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

export const formatDate = (date: Date | string): string => {
    return new Intl.DateTimeFormat("rw-RW", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
};

// frontend/src/utils/format.ts

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle local format (07xx)
  if (cleaned.startsWith('07')) {
    const match = cleaned.match(/^07(\d{2})(\d{3})(\d{3})$/);
    return match ? `07${match[1]} ${match[2]} ${match[3]}` : phone;
  }
  
  // Handle international format (+250)
  if (cleaned.startsWith('250')) {
    const match = cleaned.match(/^250(\d{2})(\d{3})(\d{3})$/);
    return match ? `+250 ${match[1]} ${match[2]} ${match[3]}` : phone;
  }
  
  // If number doesn't match either format, return as is
  return phone;
};

export const formatAddres = (address: {
    street?: string;
    city?: string;
    district?: string;
    country: string;
}): string => {
    return `${address.street}, ${address.city}, ${address.district}, ${address.country}`;
};
