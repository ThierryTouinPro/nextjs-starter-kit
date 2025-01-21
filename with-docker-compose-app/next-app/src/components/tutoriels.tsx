import MenuNavigablePage from "@/components/Interface/MenuNavigablePage";

export default function TutorialsPage(): JSX.Element {
  const sections = [{
      id: "0",
      title: 'Creola Katherine Johnson',
      content: 'mathematician',
    }, {
      id: "1",
      title: 'Mario José Molina-Pasquel Henríquez',
      content: 'chemist',
    }, {
      id: "2",
      title: 'Mohammad Abdus Salam',
      content: 'physicist',
    }, {
      id: "3",
      title: 'Percy Lavon Julian',
      content: 'chemist',  
    }, {
      id: "4",
      title: 'Subrahmanyan Chandrasekhar',
      content: 'astrophysicist',
    }];
  return (
    <>
      <MenuNavigablePage sections={sections} />
    </>
  );
}
