export async function getCustomers(): Promise<any> {
  const response = await fetch(`http://localhost:3000/api/customers`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function getCustomerByCode(kode: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/api/customers/${kode}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
