export function getFullname(data) {
  return `${data.firstName}, ${data.lastName} ${data.middleName[0]}`;
}

export function getAddress(data) {
  return `${data.street}, ${data.barangay}`;
}
