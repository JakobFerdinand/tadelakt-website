import React from 'react';

import classNames from 'classnames';

import Meta from '../components/Meta';
import Layout from '../components/Layout';

import styles from './index.module.sass';

const Privacy = () => (
  <>
    <Meta
      title="Datenschutz"
      description="Alle rechtlichen Informationen zu unserer Website können Sie auf dieser Seite nachlesen."
    />
    <Layout
      title="Datenschutz"
      headerBackground={`#7b2614 url("/theme/images/alternative-header-background.png")`}
    >
      <div className={classNames(styles.container)}>
        <h2>Erklärung zur Informationspflicht</h2>
        <p className={styles.subText}>(Datenschutzerklärung)</p>
        <div>
          <div>
            <h3>Kontakt für Fragen und Anliegen zu Datenschutz</h3>
              <p>Manfred Wegenschimmel</p>
              <p>Florianigasse 5</p>
              <p>4943 Geinberg</p>
              <p>Email: manfred.wegenschimmel@gmail.com</p>
              <h3>Website</h3>
              <p>Die Nutzung unserer Website ist grundsätzlich ohne Angabe Ihrer personenbezogenen Daten
                  möglich. Erhoben werden lediglich die von Ihrem Internet-Provider und dem verwendeten
                  Browser mitgeteilten Angaben (IP-Adresse, Datum und Uhrzeit, Name der URL, Referrer-URL,
                  Inhalt der Anforderung, HTTP-Status bzw. Zugriffsstatus, übertragene Datenmenge,
                  verwendeter Browser, Betriebssystem, Zugriffsland, Gerätetyp, Browsersprache und Version
                  des Browsers). Diese Daten werden von uns für die Dauer des Website-Besuchs gespeichert
                  und eine Auswertung erfolgt dabei ausschließlich zu statistischen Zwecken unter Wahrung
                  der Anonymität der einzelnen Nutzer. Andere personenbezogene Daten werden weder
                  gespeichert, verarbeitet, noch verkauft. Anonymisierte Daten werden zudem in Logfiles
                  für eine für das System relevante Zeit gespeichert. Die Verwendung dieser Daten hilft
                  uns, einen reibungslosen Verbindungsaufbau und die Systemsicherheit und Stabilität
                  unserer Website bereitzustellen und stellt deswegen ein berechtigtes Interesse gem.
                  Artikel 6 Abs 1 lit f DSGVO für die Verarbeitung dar. Zudem können die oben angeführten
                  Daten unter Umständen auf Servern im EU Ausland verarbeitet werden. Dies ist
                  insbesondere dann der Fall, wenn Sie aus dem Ausland auf unsere Website zugreifen,
                  unsere Infrastruktur in der EU gewartet wird oder ein ausländischer Server schneller auf
                  Anfragen antwortet. Das Nutzen eines verteilten Systems auf allen Kontinenten bietet
                  dabei viele Vorteile wie Ausfallsicherheit oder Zugriffszeitoptimierung und stellt ein
                  berechtigtes Interesse dar. Selbstverständlich gilt der oben angeführten Umgang mit
                  Ihren Daten auch für die verwendeten Server im EU Ausland. Nach dem Zugriff auf die
                  Website und der Verarbeitung der oben angeführten Daten kann keine Verbindung mehr zu
                  Ihnen oder Ihrer Person festgestellt werden und somit können wir auch keine
                  Datenauskünfte oder -änderungen veranlassen. Für das Betreiben der Onlinepräsenzen wird
                  dabei die technische Infrastruktur der Firma Hetzner GmbH
                  (https://www.hetzner.com/legal/terms-and-conditions,
                  https://www.hetzner.com/legal/privacy-policy/) verwendet, mit der ein AV-Vertrag
                  abgeschlossen wurde. Dennoch wird hier explizit darauf
                  hingewiesen, dass Sie das Recht haben auf Auskunft, Berichtigung, Sperrung, Löschung,
                  Übertragung soweit möglich oder einem Widerruf einer erteilten Einwilligung sowie
                  Widerspruch zur Verarbeitung der Daten. Des Weiteren ist es Ihnen möglich eine
                  Beschwerde bei einer Aufsichtsbehörde einzubringen.</p>
              <h3><strong>Cookies</strong></h3>
              <p>Wir verwenden auf dieser Website keine Cookies.</p>
              <h3><strong>Andere Daten (Kontakt mit uns)</strong></h3>
              <p>Daten, die zur Kontaktaufnahme notwendig sind, werden abseits der Website in Form von
                  Email- oder Telefonverkehr für die Dauer der Konversation oder zur Bearbeitung
                  zukünftiger Anfragen aufbewahrt. Daten werden dabei nicht ohne Einwilligung
                  veröffentlicht und nur an Sicherheitsbehörden und zuständige Gerichte weitergegeben,
                  wenn es zu einer rechtswidrigen Nutzung kommt. Sollten Sie eine Löschung, Änderung oder
                  Auskunft der gespeicherten Daten wünschen, kontaktieren Sie uns bitte unter den oben
                  angeführten Kontaktdaten.</p>
          </div>
        </div>
      </div>
    </Layout>
  </>
);

export default Privacy;
