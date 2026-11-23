import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faGlobe,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import styles from './flyer.module.sass';

const title = 'Flyer | Atelier Manfred Wegenschimmel';
const description =
  'Flyer des Ateliers Manfred Wegenschimmel: Zwischen Wandlung und tätiger Hoffnung, Materialethik, die Große Göttin, das I Ging, das Labyrinth und die QR-Code-Arbeiten Empört Euch – Indignez-vous.';
const url = 'https://www.tadelakt.at/flyer/';

function SectionNumber({ number }: { number: number }) {
  return (
    <span className={styles.number} aria-hidden="true">
      <span>{number}</span>
    </span>
  );
}

export default function Flyer() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href={url} />
        <link rel="icon" href="/theme/favicons/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_AT" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta
          property="og:image"
          content="https://www.tadelakt.at/flyer/grosse-goettin-2.webp"
        />
        <meta
          property="og:image:alt"
          content="Drei Tadelakt-Reliefs in Weiß, Rot und Schwarz mit kreisförmigen Vertiefungen"
        />
        <link
          rel="preload"
          href="/flyer/fonts/Saans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/flyer/fonts/SaansMono-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <main id="main" lang="de" className={styles.page}>
        {/* First printed sheet: section 1, about, material ethics, partners, contact. */}
        <section
          className={styles.sheet}
          aria-label="Flyer Seite 1: Zwischen Wandlung und tätiger Hoffnung"
        >
          <div className={styles.masthead}>
            <div>
              <h2 className={styles.workTitle} id="taetige-hoffnung">
                <SectionNumber number={1} />
                Zwischen Wandlung und tätiger Hoffnung
              </h2>
              <p>
                Die ungehemmte Kreativität und die eigenwillige Formensprache
                der Berberfrauen, tradiert in der Textilkunst, öffnen Manfred
                Wegenschimmel einen Raum für freie künstlerische Ausdruckskraft.
                Aus der Vogelperspektive betrachtet, verwandeln sich
                strukturierte Kulturlandschaften in abstrakte Bildwelten. Die
                Serie Überflug erzählt von diesem Wechsel des Blickwinkels, von
                Nähe und Distanz, von Ordnung und Auflösung.
              </p>
              <p>
                Die Serie Tätige Hoffnung entspringt einer anderen Bewegung: der
                Entscheidung, schwierigen Zeiten nicht mit Selbstmitleid zu
                begegnen, sondern ihnen handelnd entgegenzutreten. Hoffnung wird
                hier nicht erwartet, sondern getan. Sie entsteht im Tun, im
                Widerstand gegen Erstarrung, im Mut, etwas in Bewegung zu
                setzen.
              </p>
              <p>
                Das verbindende Element dieser unterschiedlichen Impulse findet
                Wegenschimmel im Tadelakt, einer traditionellen marokkanischen
                Kalkputztechnik. Das Material wird zu mehr als Werkstoff: Es
                wird zum Ausdruck eines Denkens, das Veränderung nicht als
                Ausnahme, sondern als grundlegende Bedingung des Seins begreift.
                Panta rhei – alles fließt. Der Heraklit von Ephesos (ca. 535–475
                v. Chr.) zugeschriebene Gedanke durchzieht die Arbeit wie ein
                unsichtbarer Faden.
              </p>
              <p>
                Zwischen Landschaft und Abstraktion, überlieferter
                Handwerkskunst und freiem Ausdruck, zwischen Widerstand und
                Hingabe entstehen Arbeiten, die den Wandel nicht festhalten
                wollen, sondern ihm eine Form geben. Eine Form, die im Entstehen
                bereits wieder offen ist für Veränderung.
              </p>
            </div>
            <figure className={styles.portrait}>
              <img
                src="/flyer/atelier-portrait.webp"
                width={523}
                height={784}
                alt="Manfred Wegenschimmel arbeitet an Reliefplatten mit I-Ging-Hexagrammen"
                decoding="async"
              />
            </figure>
            <div className={styles.about}>
              <h2 className={styles.headline} id="ueber-atelier">
                Über Atelier <span>Manfred Wegenschimmel</span>
              </h2>
              <p>
                Manfred Wegenschimmel, geboren 1960, lebt und arbeitet in
                Geinberg. Seine künstlerische Arbeit verbindet langjährige
                handwerkliche Erfahrung mit einer intensiven Auseinandersetzung
                mit historischen Materialien, Zeichen und kulturellen Symbolen.
              </p>
              <p>
                Nach seiner Ausbildung zum Maler und Anstreicher und zum
                Vergolder war Wegenschimmel zunächst vor allem in der
                Restaurierung tätig. Seit den frühen 1980er-Jahren arbeitet er
                parallel als Künstler. Eine zentrale Entwicklung nahm seine
                Arbeit ab den 2000er-Jahren mit der intensiven Beschäftigung mit
                Kalk und der marokkanischen Tadelakt-Technik, die er zunehmend
                als eigenständiges künstlerisches Medium einsetzt. In seinen
                Arbeiten verbindet er traditionelle Materialien und
                handwerkliche Techniken mit philosophischen und
                gesellschaftlichen Themen. Das I Ging, das Labyrinth und die
                QR-Code-Arbeiten bilden wichtige Werkgruppen, in denen sich
                seine Beschäftigung mit Wandlung, Zeichen, Ordnung und
                Kommunikation zeigt.
              </p>
              <p>
                In den vergangenen Jahren hat Wegenschimmel diese
                Auseinandersetzung weitergeführt und unterschiedliche
                künstlerische Positionen und Techniken miteinander verbunden.
                2020 arbeitete er als Freskoassistent für Tobias Pils in
                Paris-Saclay. 2025 präsentierte er Tadelaktarbeiten in
                Verbindung mit Kalkfresko, I Ging und QR-Codes in der Galerie
                Forum Wels. 2025 und 2026 folgten weitere Gruppen- und
                Jahresausstellungen, unter anderem mit der Galerie Forum Wels,
                der IKG Ried und der Galerie der Stadt Traun.
              </p>
              <p>
                Heute steht in Wegenschimmels Arbeit besonders das Zusammenspiel
                von Material, handwerklicher Tradition, Zeichen und
                zeitgenössischer Wahrnehmung im Mittelpunkt.
              </p>
            </div>
            <div className={styles.brand}>
              <h1 className={styles.brandName}>
                <span>Atelier</span> <span>Manfred</span>{' '}
                <span>Wegenschimmel</span>
              </h1>
              <p className={styles.brandFields}>
                <span>Künstler</span>
                <span>Kunst</span>
                <span>Materie</span>
              </p>
            </div>
          </div>
          <div className={styles.material}>
            <figure className={styles.textures}>
              <img
                src="/flyer/materialethik-1.webp"
                width={506}
                height={513}
                alt="Marmorierte Kalkoberfläche in Braun- und Rottönen"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/flyer/materialethik-2.webp"
                width={507}
                height={513}
                alt="Rote Kalkoberfläche mit vertikalen Verläufen"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/flyer/materialethik-3.webp"
                width={506}
                height={513}
                alt="Grüne Kalkoberfläche mit vertikalen Verläufen"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div>
              <h2 className={styles.headline} id="materialethik">
                Materialethik
              </h2>
              <p>
                Kalk ist ein Werkstoff mit einer langen Geschichte und begleitet
                Manfred Wegenschimmels handwerkliche und künstlerische Arbeit
                seit seiner Ausbildung zum Maler und Anstreicher sowie zum
                Vergolder. Auch während seiner langjährigen Tätigkeit in der
                Restaurierung setzte er sich intensiv mit den Eigenschaften und
                Anwendungsmöglichkeiten dieses Materials auseinander. Seine
                Beschäftigung mit Kalk beruht damit nicht allein auf einer
                gestalterischen Entscheidung, sondern auf einer über Jahre
                gewachsenen praktischen Erfahrung.
              </p>
              <p>
                Eine wesentliche Erweiterung dieser Auseinandersetzung bildet
                die marokkanische Tadelakt-Technik, die Wegenschimmel auf einer
                Baustelle in der Medina von Marrakesch kennenlernte. Bei diesem
                pigmentierten Kalkputz wird die Oberfläche nach dem Auftrag mit
                geeigneten Steinen verdichtet und anschließend mit Olivenölseife
                behandelt. Durch diesen aufwendigen Prozess entsteht eine
                charakteristische Glätte mit weichem Glanz, deren Wirkung sich
                deutlich von rauen und matten Oberflächen unterscheidet.
              </p>
              <p>
                In Verbindung mit der Sgraffito-Technik entwickelt Wegenschimmel
                Wandobjekte, in denen unterschiedliche Oberflächenqualitäten und
                Positiv- und Negativformen aufeinandertreffen. Das Material wird
                dabei nicht lediglich zum Träger eines Motivs. Seine Struktur,
                Haptik und Lichtwirkung bestimmen wesentlich die Wahrnehmung der
                Arbeit.
              </p>
              <p>
                Wegenschimmels Umgang mit Kalk zeigt, wie sich überlieferte
                Techniken in eine zeitgenössische Bildsprache überführen lassen.
                Die historische Herkunft des Materials bleibt erfahrbar, während
                seine Verarbeitung neue formale Möglichkeiten eröffnet.
                Handwerkliches Wissen und künstlerische Reflexion verbinden sich
                zu einer Praxis, in der die Eigenschaften des Materials nicht
                verborgen, sondern bewusst zum Bestandteil des Werkes werden.
              </p>
            </div>
            <p className={styles.quote}>Wandlung ist das Wesen der Materie.</p>
          </div>
          <div className={styles.cooperation}>
            <h2 className={styles.dotTitle}>Cooperation Partners</h2>
            <ul>
              <li>Cornelia Wegenschimmel</li>
              <li>Jakob Wegenschimmel</li>
              <li>
                Paula Wegenschimmel &amp; Matthias Warter
                <p>PamaPama Creative Collective for Photography</p>
                <p>Communication Design &amp; Interior Architecture</p>
                <p>based in Salzburg</p>
                <p>
                  <a href="mailto:hello@pamapama.com">hello@pamapama.com</a>
                </p>
                <p>
                  <a href="tel:+43662231638">0043 662 231638</a>
                </p>
              </li>
            </ul>
          </div>
          <div className={styles.contactBar}>
            <a href="tel:+436766258629">
              <FontAwesomeIcon icon={faPhone} fixedWidth />
              0043 676 6258629
            </a>
            <a href="mailto:m.wegenschimmel@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} fixedWidth />
              M.WEGENSCHIMMEL@GMAIL.COM
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faGlobe} fixedWidth />
              MANFREDWEGENSCHIMMEL.COM
            </a>
            <a href="https://www.instagram.com/manfred_wegenschimmel/">
              <FontAwesomeIcon icon={faInstagram} fixedWidth />
              MANFRED_WEGENSCHIMMEL
            </a>
            <address>
              <FontAwesomeIcon icon={faLocationDot} fixedWidth />
              KIRCHENPLATZ 5, 4943 GEINBERG
            </address>
          </div>
        </section>
        {/* Second printed sheet: sections 2 to 5. */}
        <section
          className={styles.sheet}
          aria-label="Flyer Seite 2: Die Große Göttin, I Ging, das Labyrinth und Empört Euch"
        >
          <article className={styles.work}>
            <h2 className={styles.workTitle}>
              <SectionNumber number={2} />
              Die Große Göttin
            </h2>
            <div className={styles.goettin}>
              <div className={styles.columnText}>
                <p>
                  Was gibt dem Lauf der Welt Stabilität, wenn Geburt, Wachstum
                  und Tod in einem fortwährenden Kreislauf aufeinanderfolgen?
                  Die Vorstellung einer dreifaltigen Göttin verweist auf ein
                  Weltbild, in dem unterschiedliche Lebensphasen als
                  Erscheinungsformen einer übergeordneten Einheit verstanden
                  werden. Vergleichbare Vorstellungen finden sich in den
                  griechischen Horen, die mit dem Lauf der Zeit verbunden sind,
                  und den römischen Parzen, die das Schicksal der Menschen
                  bestimmen. Der Schriftsteller Robert Graves prägte mit seinem
                  Buch „Die Weiße Göttin“ die Auseinandersetzung mit Poesie und
                  Mythos mit der Vorstellung einer universellen Muttergottheit.
                </p>
                <p>
                  Die Weiße, die Rote und die Schwarze Göttin stehen für
                  unterschiedliche Phasen des natürlichen Kreislaufs. Die Weiße
                  Göttin verkörpert Licht, Jugend und Neubeginn. Mit Brigid, der
                  keltischen Lichtjungfrau und Hüterin des Feuers, beginnt
                  Anfang Februar die Rückkehr des Lichts. Die Rote Göttin steht
                  für Fruchtbarkeit, Wachstum und die Fülle des Lebens, die
                  ihren Höhepunkt zur Sommersonnenwende erreicht. Mit dem
                  Rückzug der Natur beginnt die Schwarze Phase. Sie verkörpert
                  Alter, Dunkelheit und Tod, trägt jedoch bereits den Keim des
                  neuen Lebens in sich.
                </p>
              </div>
              <figure>
                <img
                  src="/flyer/grosse-goettin-1.webp"
                  width={827}
                  height={651}
                  alt="Weißes Tadelakt-Relief mit kreisförmiger Vertiefung"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure>
                <img
                  src="/flyer/grosse-goettin-2.webp"
                  width={818}
                  height={651}
                  alt="Drei Tadelakt-Reliefs in Weiß, Rot und Schwarz mit kreisförmigen Vertiefungen"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <p className={styles.spansFromSecond}>
                Manfred Wegenschimmels Auseinandersetzung mit der Großen Göttin
                führt zu einem Weltbild, in dem Werden und Vergehen untrennbar
                miteinander verbunden sind. Die drei Erscheinungsformen lassen
                sich als unterschiedliche Zustände eines einzigen
                Wandlungsprozesses verstehen. Das Motiv eröffnet damit einen
                Zugang zu einem zyklischen Zeitverständnis, in dem das Ende
                nicht als endgültiger Abschluss erscheint, sondern als
                Voraussetzung für Erneuerung und Neubeginn.
              </p>
            </div>
          </article>
          <article className={styles.work}>
            <h2 className={styles.workTitle}>
              <SectionNumber number={3} />I Ging – das Buch der Wandlungen
            </h2>
            <div className={styles.quad}>
              <figure>
                <img
                  src="/flyer/i-ging-1.webp"
                  width={827}
                  height={651}
                  alt="Wand aus Tadelakt-Reliefs mit eingeritzten I-Ging-Hexagrammen"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure>
                <img
                  src="/flyer/i-ging-2.webp"
                  width={827}
                  height={642}
                  alt="Ockerfarbenes Tadelakt-Relief mit sechs eingeritzten Streifen"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className={styles.columnText}>
                <p>
                  Das I Ging, das Buch der Wandlungen, gehört zu den ältesten
                  klassischen Texten der chinesischen Kultur. Das Schöpferische
                  und das Empfangende, bekannt als Yin und Yang, bilden die
                  beiden grundlegenden Pole dieses Weltverständnisses.
                </p>
                <p>
                  Das Buch beschreibt die Welt in 64 Hexagrammen, die jeweils
                  aus sechs durchgehenden oder unterbrochenen Linien bestehen.
                  Die Hexagramme entstehen aus der Kombination zweier Trigramme
                  mit je drei Linien. Aus diesen beiden elementaren Zeichentypen
                  entwickelt sich ein komplexes System unterschiedlicher
                  Konstellationen. Die Linien stehen für feste und weiche, helle
                  und dunkle Kräfte, deren Verhältnis zueinander die jeweilige
                  Erscheinung bestimmt.
                </p>
              </div>
              <div className={styles.columnText}>
                <p>
                  Aus der Beobachtung der Natur hervorgegangen, beschreiben die
                  Hexagramme Zustände und Möglichkeiten der Veränderung.
                  Ursprünglich als Orakel verwendet und mündlich überliefert,
                  reicht die Entstehungsgeschichte des I Ging weit zurück. Durch
                  die Übersetzung des Sinologen Richard Wilhelm im Jahr 1924
                  wurde es auch im europäischen Kulturkreis einem breiteren
                  Publikum zugänglich.
                </p>
                <p>
                  Für Manfred Wegenschimmel liegt die besondere Faszination des
                  I Ging in der Verbindung von formaler Klarheit und
                  inhaltlicher Vieldeutigkeit. Aus wenigen elementaren Formen
                  entsteht ein offenes System, das unterschiedliche Zustände und
                  Beziehungen sichtbar macht.
                </p>
              </div>
            </div>
          </article>
          <article className={styles.work}>
            <h2 className={styles.workTitle}>
              <SectionNumber number={4} />
              Das Labyrinth
            </h2>
            <div className={styles.quad}>
              <div className={styles.columnText}>
                <p>
                  Im Labyrinth gibt es nur einen Weg, und dieser führt zur
                  Mitte. Seit Jahrtausenden stellt das Labyrinth ein
                  geheimnisvolles Symbol der Selbstfindung und der Suche nach
                  Orientierung dar. Anders als ein Irrgarten, der durch
                  Abzweigungen und Sackgassen verwirrt, folgt das klassische
                  Labyrinth einem zusammenhängenden Weg, dessen Verlauf sich
                  erst Schritt für Schritt erschließt. Das Labyrinth ist eine
                  Schule der Langsamkeit. Jeder Wendepunkt verändert die
                  Blickrichtung und eröffnet eine neue Perspektive auf den Weg
                  und sein Ziel. Die Mitte wird nicht unmittelbar erreicht,
                  sondern durch Bewegung, Geduld und die Bereitschaft erfahren,
                  Umwege als Teil des Ganzen anzunehmen.
                </p>
              </div>
              <div className={styles.columnText}>
                <p>
                  In Manfred Wegenschimmels Auseinandersetzung wird das
                  Labyrinth als Bild eines Weges lesbar, dessen Bedeutung sich
                  erst durch das Zurücklegen seiner verschlungenen Pfade
                  erschließt. Seine Struktur verbindet eine klare Ordnung mit
                  einer individuellen Erfahrung von Bewegung und Orientierung.
                  Die Mitte ist dabei nicht nur ein räumliches Ziel, sondern
                  auch ein Symbol innerer Sammlung. Das Labyrinth vermittelt
                  Zuversicht: Wer seinem Weg folgt, muss sich nicht verlieren.
                  Seine Wendungen können als notwendige Stationen eines
                  Prozesses verstanden werden, in dem Erfahrungen allmählich
                  einen Zusammenhang bilden.
                </p>
              </div>
              <figure>
                <img
                  src="/flyer/labyrinth-1.webp"
                  width={827}
                  height={651}
                  alt="Beiges Tadelakt-Relief mit klassischem Labyrinth"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure>
                <img
                  src="/flyer/labyrinth-2.webp"
                  width={827}
                  height={642}
                  alt="Dunkles Tadelakt-Relief mit Spiral-Labyrinth auf ziegelrotem Rand"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </article>
          <article className={styles.work}>
            <h2 className={styles.workTitle}>
              <SectionNumber number={5} />
              Empört euch – Indignez-vous
            </h2>
            <div className={styles.empoert}>
              <p>
                Wie verändert sich die Bedeutung eines Bildes, wenn es nicht nur
                betrachtet, sondern auch gelesen werden kann? In seinen
                QR-Code-Arbeiten verbindet Manfred Wegenschimmel eine abstrakt
                wirkende Bildsprache mit der Möglichkeit digitaler
                Informationsvermittlung. Die quadratische Matrix aus schwarzen
                und weißen Punkten bildet ein binäres Zeichensystem, in dem
                Informationen nach einem festgelegten Muster codiert werden. Was
                zunächst als geometrische Komposition erscheint, kann mithilfe
                eines Smartphones entschlüsselt werden und eine dahinterliegende
                Botschaft zugänglich machen.
              </p>
              <div className={styles.columnText}>
                <p>
                  Die Auseinandersetzung mit dieser Form der Codierung knüpft an
                  frühere Arbeiten Wegenschimmels an, in denen ihn die
                  geometrische Ornamentik der kufischen Schrift und die
                  Systematik der 64 Hexagramme des I Ging beschäftigten. In all
                  diesen Zeichensystemen entsteht aus begrenzten Elementen eine
                  komplexe Ordnung. Die sichtbare Form verweist dabei auf eine
                  Bedeutung, die sich nicht unmittelbar erschließt.
                </p>
                <p>
                  Im 2011 begonnenen Projekt „EMPÖRT EUCH!“ erhält dieses
                  Prinzip eine gesellschaftliche Dimension. Inspiriert vom
                  gleichnamigen Pamphlet des französischen Autors Stéphane
                  Hessel, das sich gegen den Finanzkapitalismus positioniert und
                  für die Werte der Menschenrechte eintritt, übersetzt
                  Wegenschimmel die Aufforderung zur Empörung in QR-Codes
                  verschiedener Sprachen.
                </p>
                <p>
                  Das Projekt ist als wachsender Prozess angelegt, der durch
                  weitere Übersetzungen ergänzt werden kann. Die Betrachtenden
                  werden eingeladen, selbst aktiv zu werden und die verborgenen
                  Inhalte zu erschließen. So wird der QR-Code nicht nur zum
                  Gestaltungselement, sondern auch zum Medium gesellschaftlicher
                  Kommunikation und zur Aufforderung, die eigene Haltung zu
                  hinterfragen.
                </p>
              </div>
              <div className={styles.qrRow}>
                {[1, 2, 3, 4].map((number) => (
                  <figure key={number}>
                    <img
                      src={`/flyer/empoert-euch-${number}.webp`}
                      width={394}
                      height={403}
                      alt={`Tadelakt-Relief mit QR-Code, Aufnahme ${number}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
