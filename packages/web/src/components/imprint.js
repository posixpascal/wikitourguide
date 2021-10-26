import React from 'react';
import styled from 'styled-components';

const ImprintWrapper = styled.div`
  padding: 60px 40px;
`;

export function Imprint() {
  return (
    <ImprintWrapper>
      <h1>Impressum</h1>

      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p>
        Pascal Raszyk
        <br />
        Frankfurterstra&szlig;e 6<br />
        63263 Neu-Isenburg
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: 0151 700 222 32
        <br />
        E-Mail: pascal@raszyk.de
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a
        Umsatzsteuergesetz:
        <br />
        DE318505781
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        Pascal Raszyk
        <br />
        Frankfurterstr. 6, 63263 Neu-Isenburg
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europ&auml;ische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{' '}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        .<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>
        Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
      </h2>
      <p>
        Wir nehmen an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teil. Zust&auml;ndig ist die
        Universalschlichtungsstelle des Zentrums f&uuml;r Schlichtung e.V.,
        Stra&szlig;burger Stra&szlig;e 8, 77694 Kehl am Rhein (
        <a
          href="https://www.verbraucher-schlichter.de"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://www.verbraucher-schlichter.de
        </a>
        ).
      </p>

      <p>
        Quelle: <a href="https://www.e-recht24.de">eRecht24</a>
      </p>
    </ImprintWrapper>
  );
}
