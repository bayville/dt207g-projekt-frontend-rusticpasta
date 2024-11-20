# RusticPasta
Detta repo är webbplats för restaurangen Rustic Pasta och är skapat med Angular. Webbplatsen består av en publik del med startsida samt ett enklare ordersystem. Det finns även ett enklare CMS-system där en administratör kan lägga till, ändra och ta bort maträtter i menyn, lägga till och hantera kategorier och öppettider, samt hantera inkommande ordrar. Webbplatsen kommunicerar med en webbtjänst för att hantera all kommunikation med databasen, [repot för webbtjänsten.](https://github.com/bayville/dt207g-projekt-backend).

[Livedemo av webbplatsen](https://rusticpasta.bayville.se)

Inloggningsuppgifter för admin:
- [Inloggning](https://rusticpasta.bayville.se/login)
- Användarnamn: demo
- Lösenord: demo1234
----
### Screenshots
![Rustic Pasta Home Page](https://github.com/bayville/dt207g-projekt-frontend-rusticpasta/blob/master/rp1.png)
![Rustic Pasta Order Page](https://github.com/bayville/dt207g-projekt-frontend-rusticpasta/blob/master/rp2.png)
![Rustic Pasta Admin Page](https://github.com/bayville/dt207g-projekt-frontend-rusticpasta/blob/master/rp3.png)

### Installation

För att installera och köra projektet lokalt, följ dessa steg:

1. Klona GitHub-repot:

```bash
git clone https://github.com/bayville/dt207g-projekt-frontend-rusticpasta.git
npm install
ng serve
```
2. Konfigurera filen i mappen app/config för att ändra adressen till din webbtjänst: t.ex. 127.0.0.1/api. 

3. Om du startar repot på localhost kan du starta med flaggan --host för att göra den tillgänglig via lan. t.ex: ng serve --host 0.0.0.0 

### Om webbplatsen samt mappstruktur

- Styling av webbplatsen är gjord med SCSS.
- Administrationsgränssnittet använder Material UI
- Även vissa delar av webbplatsen som kassan och kundkorgen använder sig av funktionalitet från Material UI
- Använder sig av Services för att sköta all kommunikation med webbtjänsten

### Mappstruktur
``` bash
.
│
├── app
│   ├── components
│   ├── config
│   ├── guards
│   ├── interceptors
│   ├── models
│   ├── pages
│   └── services
├── assets
│   └── img
└── styles
    ├── abstracts
    ├── base
    └── components
```
----

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
