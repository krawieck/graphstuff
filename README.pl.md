

# Wizualizacja Grafów

Projekt realizowany w ramach studiów na UKSW w ramach przedmiotu _Projekt Programistyczny Indywidualny_. Poniżej zostały umieszczone wybrane fragmenty dokumentacji.

## Wstęp

Celem projektu jest stworzenie aplikacji okienkowej umożliwiającej użytkownikowi
wizualne tworzenie grafów skierowanych oraz sprawdzanie czy zawierają one cykl
Eulera, ścieżkę Eulera, cykl Hamiltona, ścieżkę Hamiltona oraz znajdowanie najkrótszej
(zawierającą najmniejszą ilość krawędzi) trasy między punktami.

Wersja webowa aplikacji jest dostępna [tutaj](https://krawieck.github.io/graphstuff/).

Oficjalna dokumentacja w formacie PDF jest dostępna [tutaj](https://github.com/krawieck/graphstuff/blob/main/docs/Projekt%20Programistyczny%20Indywidualny.pdf).

## Opis programu

Program został stworzony z użyciem następujących technologi webowych:

* został napisany w języku **TypeScript**
* do tworzenia interfejsu została użyta biblioteka **React**
* do wizualizowania grafu została wykorzystana biblioteka **Konva**
* do stylowania została użyta biblioteka **Tailwind.css**
* do zarządzania narzędziami został użyty Vite, a projekt był bazowany na gotowym
template **React+TypeScript**
* do zarządzania stanem aplikacji została wykorzystana biblioteka **zustand**
* do testów jednostkowych została użyta biblioteka **vitest**

Następnie ten program został przetworzony na aplikację okienkową z użyciem
technologii **Tauri**.
Platformy docelowe to macOS i Windows.

## Zrzuty ekranu

<img width="1012" height="812" alt="Screenshot 2023-06-30 at 01 46 08" src="https://github.com/user-attachments/assets/dfedb566-7e90-4b61-a633-48df44aac632" />


<img width="1012" height="812" alt="Screenshot 2023-06-30 at 01 47 47" src="https://github.com/user-attachments/assets/a4e494d8-3930-4d4a-bf96-ac2f1ff9c923" />
