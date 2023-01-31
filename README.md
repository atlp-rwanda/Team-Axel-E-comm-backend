# Team-Axel-E-comm-backend

<br>

![](https://img.shields.io/badge/Maintained-Yes-green)
![](https://img.shields.io/badge/Pull_Requests-Accepting-green)
![](https://img.shields.io/badge/Contributions-Accepting-cyan)

<br>

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#live-demo">Live Demo</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is an e-commerce backend app

### Folder Structure

    .
    ├── /build                   # Compiled files (ignored)
    ├── /docs                    # Documentation files
    ├── /src                     # Source files
    ├── /test                    # Automated tests
    ├── .env                     # Environment variables
    ├── .gitignore
    ├── nodemon.json             # Configuration for nodemon as a dev-dependency
    ├── package.json
    ├── pnpm-lock.yaml
    ├── README.md                # Documentation
    └── tsconfig.json

#### src

    ./src
    ├── /controllers                   # Functions fired when hitting a route
    ├── /db
    │   ├── /schemas                   # Schema definitions
    │   └── config.ts                  # db connection configuration
    ├── /interfaces                    # For Ts declarations
    ├── /middleware
    │   ├── /auth
    │   └── /validation
    ├── /routes                        # All endpoints
    ├── /services                      # Communication with the db
    ├── app.ts                         # Configuration for required packages
    └── server.ts                      # Entry point

### folder structure

This is the structure for any folder. The same applies for next folders.
./folder
├── \_index.ts # Handles all exports of that folder
└── file.ts # All its exports, but handled by its index.ts

### Tech Stack

    * Node.js
    * Typescript
    * Express
    * Postgres DB
    * Sequelize ORM

<!-- LIVE DEMO -->

## Live Demo

Not yet live 🙂

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

    * Node.js
    * Package manager. We are using [pnpm](https://pnpm.io/)
    * Postgres DB

If you are wondering why pnpm, take a look at [why](https://www.atatus.com/blog/npm-vs-yarn-vs-pnpm/)

### Installation

1. Clone the repo 🌀
   ```sh
   git clone https://github.com/atlp-rwanda/Team-Axel-E-comm-backend.git
   ```
2. Install packages 📦.
   ```sh
   pnpm install
   ```
3. Create a `.env` file and add the following keys ,or, just grab the content in `.env.example` :
   ```sh
    PORT=
   ```
4. Start your local development server

```sh
pnpm dev
```

<!-- CONTRIBUTING -->

## Contributing

To make contributions...

1. Clone the repo
1. Create your Feature Branch (`git checkout -b ft-some-feature`)
1. Commit your Changes (`git commit -m 'ft: add some feature'`)
1. Push to the Branch (`git push origin ft-some-feature`)
1. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License.

<!-- CONTACT -->

## Contact

You can reach out to the team lead, [Alex](mailto:mucyoalexaxel@gmail.com)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- []() The Andela Team
