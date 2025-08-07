# Scalekit Documentation

This repository contains the source code for the official Scalekit documentation, available at [docs.scalekit.com](https://docs.scalekit.com).

The documentation is built using [Astro](https://astro.build/) and the [Starlight](https://starlight.astro.build/) theme.

## Getting Started

Follow these instructions to set up a local development environment.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.x or higher recommended)
- [pnpm](https://pnpm.io/)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/scalekit-inc/developer-docs.git
    cd developer-docs
    ```

2.  Install the dependencies using pnpm:
    ```bash
    pnpm install
    ```

## Development

To start the local development server, run the following command:

```bash
pnpm dev
```

This will start a development server, typically at `http://localhost:4321`. The server will automatically reload when you make changes to the source files.

## Building

To create a production-ready build of the website, run the following command:

```bash
pnpm build
```

The output will be generated in the `dist/` directory.

## Key Technologies

- [Astro](https://astro.build/): The web framework for building the documentation site.
- [Starlight](https://starlight.astro.build/): An official Astro theme for building documentation websites.
- [React](https://react.dev/): Used for some interactive components.
- [Vue](https://vuejs.org/): Used for some interactive components, including the API reference.
- [Tailwind CSS](https://tailwindcss.com/): For styling.
- [MDX](https://mdxjs.com/): Allows for the use of JSX components within Markdown files.

## Project Structure

- `src/content/docs/`: Contains the Markdown and MDX files for the documentation pages. This is where most of the content lives.
- `src/components/`: Contains reusable Astro, React, and Vue components.
- `src/styles/`: Contains custom CSS and Tailwind CSS configuration.
- `astro.config.mjs`: The main configuration file for Astro and Starlight.
- `public/`: Contains static assets like images, fonts, and Swagger API files.
- `package.json`: Defines the project's dependencies and scripts.

## Contributing

Contributions to the documentation are welcome! You can suggest changes by opening a pull request.

The "Edit this page" link on each documentation page will take you directly to the corresponding file in the GitHub repository, making it easy to propose edits.
