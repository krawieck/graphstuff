# Graph Visualization

This project was carried out as part of studies at UKSW (Cardinal Stefan Wyszyński University in Warsaw)
within the course Individual Programming Project. Selected excerpts from the documentation are presented below.

## Introduction

The goal of the project is to create a desktop application that allows the user to visually create directed graphs
and check whether they contain a Eulerian cycle, Eulerian path, Hamiltonian cycle, Hamiltonian path, and find the shortest path
(containing the fewest edges) between points.

You can run the web app version [here](https://krawieck.github.io/graphstuff/).

You can read the official documentation PDF [here](https://github.com/krawieck/graphstuff/blob/main/docs/Projekt%20Programistyczny%20Indywidualny.pdf) (in Polish).

## Technologies

The program was created using the following web technologies:

* written in **TypeScript**
* user interface designed using **React**
* graphs visualized using **Konva** library
* styles applied using **Tailwind.css**
* build tool of choice was **Vite**
* state management library was **zustand**
* unit tests written using **vitest**

The program was then converted into a desktop application using the **Tauri** framework.
Target platforms are macOS and Windows.

## Screenshots

<img width="1012" height="812" alt="Application window without any graphs" src="https://github.com/user-attachments/assets/dfedb566-7e90-4b61-a633-48df44aac632" />


<img width="1012" height="812" alt="Application window containing a graph consisting of 4 points" src="https://github.com/user-attachments/assets/a4e494d8-3930-4d4a-bf96-ac2f1ff9c923" />
