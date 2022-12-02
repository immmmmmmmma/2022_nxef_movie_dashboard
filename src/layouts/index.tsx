import { Outlet } from "react-router";
import Menu from "./HeaderMenu";

interface LayoutDefaultProps {
  children?: React.ReactElement;
}

const DefaultLayout = ({ children }: LayoutDefaultProps) => {
  return (
    <div>
      <Menu />
      <main>{children || <Outlet />}</main>
    </div>
  );
};

export default DefaultLayout;
