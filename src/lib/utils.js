export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function mod(value, total) {
  return ((value % total) + total) % total;
}

