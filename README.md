# Börries' Design Site

Hallo, papa!
Hier sind ein paar wichtige Punkte:
- Du kannst andere Seiten mit `.html` Dateien machen.
  - Die `.html` sind im projekt order (also nicht `src` order `public`).
  - Die Ordner in dem sie genested sind bestimmen den Link/Path.
- Für Assets, eignet sich der `src` Ordner. Dies ist jedoch nicht obligatorisch. Du kannst den Ablegeort frei wählen.
- Sollte es wichtig sein dass ein Asset eins zu eins übernommen werden muss (also dass z. B. /favicon.ico auch /favicon.ico bleibt und nicht verarbeitet wird) musst du es in den `public` Order legen. (Es sei denn es ist eine `html` Datei)
- So wie dein Projekt jetzt aussieht, ist es nicht geeignet so in dem Zustand gehosted zu werden. Du must dein Projekt mit `bun run build` bauen. Das gibt dir einen `dist` Ordner, welche eine packetierte, optimierte Version deiner Seite beinhalted. Solltest du `Vercel` verwende, so passiert dies automatisch sobald du deine Änderungen aug GitHub lädst.
- Solltest du ein Packet benötigen (Packete findest du auf [npm](www.npmjs.com)) so installiere sie mit `bun i [packet name hier]`.

Hier sind noch ein paar Erklärungen:
- `README.md - Das liest du gerade
- `bun.lockb` - Hier werden die Versionen der Packete gemerkt. Nicht lesbar für dich und gedacht für `bun`.
- `package.json` - Hier werden die benötigten Packete festgehalten. Solltest du ein Packet benötigen installiere es mit `bun i [packet name hier]`. Das fügt das packet automatisch in diese Datei ein.
- `.gitignore` - Eine Liste von dateien die du nicht willst, dass sie auf GitHub landen. (Wie z. B. `dist` oder `node_modules`)
- `node_modules` - Hier werden die eigentlichen Packete gespeichert. Du solltest diesen nie bearbeiten. Er wird auch nicht mit GitHub synchronisiert, weil er sehr viel speicher einnimmt. Deswegen listen wir die packete einfach in `package.json` auf. Deswegen musst du auch `bun i` um die packte, welche aufgelisted sind tatsächlich zu installieren.