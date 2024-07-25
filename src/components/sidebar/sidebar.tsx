import Link from "next/link";

interface SidebarProps {
  links: { to: string; text: string }[];
}

const Sidebar = ({ links }: SidebarProps) => {
  return (
    <div className="w-64 border-r border-gray-200 bg-white hidden md:block">
      <h1 className="font-bold text-xl ml-3 mt-5 mb-5">Store App</h1>
      <div className="flex flex-col gap-5 m-5 ml-5">
        {links.map((link, index) => (
          <Link key={index} href={link.to}>
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
