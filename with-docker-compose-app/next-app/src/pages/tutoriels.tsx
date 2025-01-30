import SidebarNavigablePage from "@/components/Interface/SidebarNavigablePage";
 
export default function TutorialsPage(): JSX.Element {
  const sections = [
    {
      id: "0",
      title: "Cur deinde Metrodori liberos commendas?",
      content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hoc uno captus Erillus scientiam summum bonum esse defendit nec rem ullam aliam per se expetendam. Scientiam pollicentur, quam non erat mirum sapientiae cupido patria esse cariorem. Bork Duo Reges: constructio interrete."],
    },
    {
      id: "1",
      title: "Atqui iste locus est, Piso, tibi etiam atque etiam confirmandus, inquam;",
      content: ["Non prorsus, inquit, omnisque, qui sine dolore sint, in voluptate, et ea quidem summa, esse dico. Sed haec omittamus; Bork Videmusne ut pueri ne verberibus quidem a contemplandis rebus perquirendisque deterreantur? Conferam tecum, quam cuique verso rem subicias; Tecum optime, deinde etiam cum mediocri amico. Ergo hoc quidem apparet, nos ad agendum esse natos. Ut proverbia non nulla veriora sint quam vestra dogmata. Ut aliquid scire se gaudeant?"]
    },
    {
      id: "2",
      title: "Haec para/doca illi, nos admirabilia dicamus.",
      content: ["Primum divisit ineleganter; Callipho ad virtutem nihil adiunxit nisi voluptatem, Diodorus vacuitatem doloris. Qui-vere falsone, quaerere mittimus-dicitur oculis se privasse; Quae similitudo in genere etiam humano apparet. In contemplatione et cognitione posita rerum, quae quia deorum erat vitae simillima, sapiente visa est dignissima. Tanta vis admonitionis inest in locis; Sic enim censent, oportunitatis esse beate vivere. Aliam vero vim voluptatis esse, aliam nihil dolendi, nisi valde pertinax fueris, concedas necesse est. Est igitur officium eius generis, quod nec in bonis ponatur nec in contrariis. Quicquid enim a sapientia proficiscitur, id continuo debet expletum esse omnibus suis partibus; Huc et illuc, Torquate, vos versetis licet, nihil in hac praeclara epistula scriptum ab Epicuro congruens et conveniens decretis eius reperietis. Nec vero alia sunt quaerenda contra Carneadeam illam sententiam."],
    },
    {
      id: "3",
      title: "Num igitur utiliorem tibi hunc Triarium putas esse posse, quam si tua sint Puteolis granaria?",
      content: ["Nisi enim id faceret, cur Plato Aegyptum peragravit, ut a sacerdotibus barbaris numeros et caelestia acciperet? In his igitur partibus duabus nihil erat, quod Zeno commutare gestiret. Illa argumenta propria videamus, cur omnia sint paria peccata."],
      nested: [
        {
          id: "5",
          title: "A mene tu?",
          content: ["Id enim volumus, id contendimus, ut officii fructus sit ipsum officium."],
        },
        {
          id: "6",
          title: "Bork",
          content: ["Sint modo partes vitae beatae."]
        },
        {
          id: "6b",
          title: "Bork",
          content: ["Nonne videmus quanta perturbatio rerum omnium consequatur, quanta confusio?"]
        },
        {
          id: "6c",
          title: "Pollicetur certe.",
          content: ["Audi, ne longe abeam, moriens quid dicat Epicurus, ut intellegas facta eius cum dictis discrepare: Epicurus Hermarcho salutem."]
        },
      ],
    },
    {
      id: "4",
      title: "Ita multo sanguine profuso in laetitia et in victoria est mortuus.",
      content: ["Laelius clamores sofòw ille so lebat Edere compellans gumias ex ordine nostros. Et si in ipsa gubernatione neglegentia est navis eversa, maius est peccatum in auro quam in palea. Quoniam, si dis placet, ab Epicuro loqui discimus. Quare attendo te studiose et, quaecumque rebus iis, de quibus hic sermo est, nomina inponis, memoriae mando; Hi curatione adhibita levantur in dies, valet alter plus cotidie, alter videt. De quibus cupio scire quid sentias."],
      nested: [
        {
          id: "41",
          content: ["1. Mihi vero, inquit, placet agi subtilius et, ut ipse dixisti, pressius."],
        },
        {
          id: "42",
          content: ["2. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum."]
        },
        {
          id: "43",
          content: ["3. Iubet igitur nos Pythius Apollo noscere nosmet ipsos."]
        },
      ],
    },
  ];
  return (
    <>
      <SidebarNavigablePage sections={sections} />
    </>
  );
}