"use server";
import { redirect } from "next/navigation";

export async function getAllSales(search = "", sort = ""): Promise<any> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (sort) params.append("sort", sort);

  const response = await fetch(
    `http://localhost:3000/api/sales?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function addTransaction(transactionData: Object): Promise<any> {
  try {
    const response = await fetch("http://localhost:3000/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to add transaction");
    }

    const result = await response.json();
    return redirect("/");
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
}
