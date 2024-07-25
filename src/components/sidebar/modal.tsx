import { X } from "lucide-react";
import Link from "next/link";

interface SidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: { to: string; text: string }[];
}

const SidebarModal = ({ isOpen, onClose, links }: SidebarModalProps) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-bold">Store App</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <X />
        </button>
      </div>
      <div className="flex flex-col gap-5 p-4">
        {links.map((link, index) => (
          <Link key={index} href={link.to} onClick={onClose}>
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarModal;
