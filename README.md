# 🎨 Happy Color – Malen nach Zahlen (PWA)

Eine entspannende **Color-by-Numbers** Progressive Web App – inspiriert von Apps wie *Happy Color*.

## Features

- 6 fertige Bilder (Herz, Stern, Blume, Katze, Regenbogen, Haus)
- Tippe die passenden Zahlen an und male sie aus
- Fortschritt wird lokal gespeichert
- Hinweis-Funktion (💡)
- Vollständig offline nutzbar
- Installierbar auf Smartphone & Desktop (PWA)
- Modernes, dunkles Design

## So spielst du

1. Wähle ein Bild aus der Übersicht
2. Tippe unten eine Farbe an
3. Tippe alle Felder mit der gleichen Zahl an
4. Wenn eine Farbe fertig ist, wird sie abgehakt und die nächste ausgewählt
5. Fertig? 🎉 Nächstes Bild oder zurück zur Übersicht

## Auf GitHub Pages hosten

### 1. Neues Repository erstellen
- Gehe zu [github.com/new](https://github.com/new)
- Name z. B. `happy-color-pwa`
- Public wählen → **Create repository**

### 2. Dateien hochladen
Entweder per Web-Upload:
- Alle Dateien und den `icons`-Ordner in das Repo ziehen

Oder per Git:
```bash
git clone https://github.com/DEIN-USERNAME/happy-color-pwa.git
cd happy-color-pwa
# Alle Dateien aus diesem Ordner hier reinkopieren
git add .
git commit -m "Initial commit – Happy Color PWA"
git push
```

### 3. GitHub Pages aktivieren
1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` (oder `master`), Ordner: `/ (root)`
4. Speichern

Nach 1–2 Minuten ist die App erreichbar unter:
```
https://DEIN-USERNAME.github.io/happy-color-pwa/
```

### 4. Als App installieren
- Auf dem Smartphone die URL öffnen
- Im Browser-Menü „Zum Startbildschirm hinzufügen“ / „Installieren“ wählen

## Dateien

```
├── index.html      # Hauptseite
├── styles.css      # Design
├── app.js          # Spiellogik
├── levels.js       # Alle Bilder & Farben
├── manifest.json   # PWA-Manifest
├── sw.js           # Service Worker (Offline)
├── icons/          # App-Icons
└── README.md
```

## Eigene Bilder hinzufügen

In `levels.js` ein neues Objekt anlegen:

```js
{
  id: "mein-bild",
  name: "Mein Bild",
  size: 10,               // Grid-Größe
  colors: [
    null,                 // Index 0 = leer
    "#e74c3c",            // 1
    "#3498db",            // 2
    // ...
  ],
  grid: [
    [0,1,1,0,...],
    [1,2,2,1,...],
    // size × size Matrix
  ]
}
```

Viel Spaß beim Ausmalen! 🎨
