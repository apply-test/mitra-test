export async function getProducts(): Promise<any> {
  const response = await fetch(`http://localhost:3000/api/products`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function getProductByCode(kode: string): Promise<any> {
  const response = await fetch(
    `http://localhost:3000/api/products/${kode}`
  ).then((response) => response.json());

  console.log(response);

  return response;
}

export async function getProductById(id: number): Promise<any> {
  const response = await fetch(`http://localhost:3000/api/products/${id}`).then(
    (response) => response.json()
  );

  console.log(response);

  return response;
}
