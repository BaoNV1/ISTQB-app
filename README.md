# ISTQB App

A local-friendly ISTQB CTFL study package built as a static web app.

## What is included

- A bilingual study page with English and Vietnamese content
- Chapter-based summaries, glossaries, and mind maps
- Flashcards, quizzes, mock exam sections, and progress tracking
- One-page summary and a 2.5-month study plan

## Project structure

- `istqb-quest-v4.html` – main study page
- `doc/` – chapter materials, summaries, and study plan
- `doc/chapter1` to `doc/chapter6` – chapter-specific glossary and mind map files
- `doc/one_page_summary.html` – one-page revision summary

## How to use

1. Open the project folder in a browser or serve it locally.
2. Start a simple local server from the project root, for example:
   ```bash
   python -m http.server 8000
   ```
3. Open:
   ```text
   http://127.0.0.1:8000/istqb-quest-v4.html
   ```

## Notes

- The markdown preview feature works best when the page is served from a local web server.
- You can switch between English and Vietnamese using the language toggle on the page.

## License

This project is intended for educational purposes.
