"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarModal from "@/components/sidebar/modal";
import { MenuIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

const sidebarLinks = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/customers", text: "Customers" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen">
          <div className="hidden lg:block">
            <Sidebar links={sidebarLinks} />
          </div>
          <div className="flex flex-col w-full min-h-screen bg-gray-100">
            <div className="block lg:hidden p-4">
              <button onClick={toggleModal}>
                <MenuIcon />
              </button>
            </div>
            <div className="flex-grow p-4 lg:p-24">{children}</div>
          </div>
        </main>
        <SidebarModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          links={sidebarLinks}
        />
      </body>
    </html>
  );
}
