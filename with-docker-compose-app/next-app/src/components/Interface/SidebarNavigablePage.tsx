import { useEffect, useState } from "react";
import styles from "@/components/Interface/css/SidebarNavigablePage.module.css";
import Link from "next/link";

const sectionLinkStyles = [ styles.sidebarLnkLvl1, styles.sidebarLnkLvl2, styles.sidebarLnkLvl3 ];
const getSectionSummary = (sect, lvl) => {
  if (!sect.title || !sect.title.length) return '';
  return (
    <>
      <Link key={sect.id} href={`#${sect.id}`} className={sectionLinkStyles[lvl - 1]}>{sect.title}</Link>
      {(sect.nested && sect.nested.length) ? sect.nested.map((ssect) => getSectionSummary(ssect, lvl + 1)) : ''}
    </>
  );
}
const getSectionHeading = (sect, lvl) => {
  const HeadingTagName = `h${lvl}`;
  return <HeadingTagName id={sect.id}>{sect.title}</HeadingTagName>;
};
const getSectionCode = (sect, lvl) => {
  return (
    <section>
      {getSectionHeading(sect, lvl)}
      {(sect.content && sect.content.length) ? sect.content.map((ctnt) => <p>{ctnt}</p>) : ''}
      {(sect.nested && sect.nested.length) ? sect.nested.map((ssect) => getSectionCode(ssect, lvl + 1)) : ''}
    </section>
  );
};

const getPageSummary = (pageContentAsJson) => {
  const sections = pageContentAsJson.sections;
  return (
    <>
      {sections ? sections.map((sect) => getSectionSummary(sect, 1)) : ''}
    </>
  )
};
const getPageContent = (pageContentAsJson) => {
  const sections = pageContentAsJson.sections;
  return (
    <>
      {sections ? sections.map((sect) => getSectionCode(sect, 1)) : ''}
    </>
  )
};

export default function SidebarNavigablePage({ pageContentAsJson }): JSX.Element {
  const [stickyStyle, setStickyStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.querySelector(
        `.${styles.sidenav}`
      ) as HTMLElement;
      const container = sidebar?.parentElement as HTMLElement;

      if (!sidebar || !container) return;

      const containerRect = container.getBoundingClientRect();
      const sidebarHeight = sidebar.offsetHeight;
      const containerBottom = containerRect.top + containerRect.height;

      if (containerRect.top <= 0 && containerBottom > sidebarHeight) {
        // Scrolling inside container, stick the sidenav
        setStickyStyle({
          position: "fixed",
          top: "0px",
          width: `${containerRect.width}px`,
        });
      } else if (containerBottom <= sidebarHeight) {
        // Bottom of the container reached
        setStickyStyle({
          //position: "absolute",
          top: `${containerRect.height - sidebarHeight}px`,
          width: `${containerRect.width}px`,
        });
      } else {
        // Default position
        setStickyStyle({
          position: "static",
          width: `${containerRect.width}px`,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkList = getPageSummary(pageContentAsJson);
  const sectionList = getPageContent(pageContentAsJson);

  return (
    <div className="container p-4">
      <div className="row mt-5 mb-5">
        <div className="col-12 col-md-4">
          <div className={`${styles.sidenav}`} style={stickyStyle}>
            {linkList}
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className={`${styles.main}`}>{sectionList}</div>
        </div>
      </div>
    </div>
  );
}