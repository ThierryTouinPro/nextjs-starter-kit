import { useMemo } from 'react';
import styles from "@/components/Interface/css/SidebarNavigablePage.module.css";
import Link from "next/link";

export default function SidebarNavigablePage({ sections, sidebarWidth }): JSX.Element {

  const sidebarStyle = useMemo(() => { width: sidebarWidth }, [sidebarWidth]);
  const mainContainerStyle = useMemo(() => { marginLeft: sidebarWidth }, [sidebarWidth]);

  const linkList = sections.map(sect =>
    <Link href={`#${sect.id}`}>
      {sect.title}
    </Link>
  );
  const sectionList = sections.map(sect =>
    <section>
      <h2 id={sect.id}>{sect.title}</h2>
      <div>{sect.content}</div>
    </section>
  );

  return (
    <>
      <div className={`${styles.sidenav}`} style={sidebarStyle}>
        {linkList}
      </div>
      <div className={`${styles.main}`} style={mainContainerStyle}>
        {sectionList}
      </div>
    </>
  );
}