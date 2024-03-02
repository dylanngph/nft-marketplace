import TopNav from "@/components/layout/TopNav";
import { FC } from "react";

interface AppLayoutProps extends React.PropsWithChildren<{}> {}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <TopNav />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
