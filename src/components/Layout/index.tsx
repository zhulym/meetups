// libraries
import React, { FC, ReactNode, useEffect } from 'react';
import { useLocation } from "react-router-dom";
// components
import Header from './Header/index';
// styles
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode
};

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        {children}
      </div>
    </>
  );
};

export default Layout;
