
const NavText = ({ name }: { name: string }) => {
  return (
    <span
      className="cursor-pointer font-bold text-muted-foreground relative transition-all duration-200 ease-in-out hover:text-primary after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
    >
      {name}
    </span>
  );
};

export default NavText;
