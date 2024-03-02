import { FC } from "react";
import dynamic from "next/dynamic";

const TopNav = dynamic(() => import("@/components/layout/TopNav"));

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
