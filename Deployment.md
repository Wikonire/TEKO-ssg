
# Deployment und Hosting

## Gewählter Hosting-Anbieter

**GitHub Pages** – ideal für statische Websites, direkt integrierbar mit GitHub Actions, kostenlos und zuverlässig. Die Seite wird automatisch aus dem Build-Ordner `_site/` veröffentlicht, der durch Eleventy generiert wird.

## Deployment-Prozess

Das Deployment erfolgt automatisch via **GitHub Actions**. Der Workflow wird bei jedem Push auf den Branch `master` ausgelöst. Dabei wird die Seite mit Eleventy gebaut und der generierte Ordner `_site/` in den Branch `gh-pages` veröffentlicht.

### Workflow-Datei: `.github/workflows/deploy.yml`

```yaml
name: Deploy Eleventy to GitHub Pages

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Build Eleventy Site
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

---

## Problem beim ersten Deployment

Beim ersten Ausführen des Workflows trat folgender Fehler auf:

```
remote: Permission to Wikonire/TEKO-ssg-11ty.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/Wikonire/TEKO-ssg-11ty.git/': The requested URL returned error: 403
Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

### Ursache

GitHub Actions verwendet ein internes Zugriffstoken (`GITHUB_TOKEN`) zum Pushen in das Repository. Standardmässig hat dieses Token **nur Leserechte**, was das Schreiben in den Branch `gh-pages` verhinderte.

---

## Lösung

Die Berechtigung wurde wie folgt angepasst:

1. GitHub Repository öffnen → **Settings** > **Actions** > **General**
2. Abschnitt **"Workflow permissions"**
3. Option **„Read and write permissions“** aktivieren
4. Änderungen speichern
5. Workflow erneut ausführen

→ Danach konnte der Bot den Branch `gh-pages` korrekt erstellen und die Website wurde veröffentlicht.

---

## Empfehlung

Für automatisiertes Deployment mit `peaceiris/actions-gh-pages` sollte **immer die Schreibberechtigung für `GITHUB_TOKEN` aktiviert werden**. Diese Einstellung ist notwendig, damit GitHub Actions den Veröffentlichungsbranch verwalten kann.

---

## Quellen

- Quick Start von 11ty.dev: https://www.11ty.dev/#quick-start 
- GitHub Actions Doku: https://docs.github.com/actions
- peaceiris/actions-gh-pages: https://github.com/peaceiris/actions-gh-pages
