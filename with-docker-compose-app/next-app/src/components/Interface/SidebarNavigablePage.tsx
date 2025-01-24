import styles from "@/components/Interface/css/SidebarNavigablePage.module.css";
import Link from "next/link";

export function getSectionCode(sect) {
  return (<section>
    <h2 id={sect.id}>{sect.title}</h2>
    <div>{sect.content}</div>
  </section>);
};

export default function SidebarNavigablePage({ sections, sidebarWidth }): JSX.Element {

  const pageStyle = {
    sidebarStyle: {
      width: sidebarWidth + 'px'
    },
    mainContainerStyle: {
      marginLeft: sidebarWidth + 'px'
    },
  };

  const linkList = sections.map(sect =>
    <Link href={`#${sect.id}`}>
      {sect.title}
    </Link>
  );
  const sectionList = sections.map(sect => getSectionCode(sect));

  return (
    <>
      <div className={`${styles.sidenav}`} style={pageStyle.sidebarStyle}>
        {linkList}
      </div>
      <div className={`${styles.main}`} style={pageStyle.mainContainerStyle}>
        {sectionList}
      </div>
    </>
  );
}