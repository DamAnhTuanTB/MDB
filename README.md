# My dermbox landing

## Introduction

**Read and understand this document carefully before starting.**

This project use [NextJS](https://nextjs.org/docs) and build **SSR**.

Technical list:

- [Nextjs 13](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind Css](https://tailwindcss.com/)
- [Recoil](https://recoiljs.org/)
- [Mobile detect](https://hgoebl.github.io/mobile-detect.js/)
- [libphonenumber](https://www.npmjs.com/package/libphonenumber-js)

## Sites

| Env        | URL                            |
| :--------- | :----------------------------- |
| Production | https://mydermbox.com/         |
| Staging    | https://staging.mydermbox.com/ |

## Setup development environment

### Setup git, dev and build

1. Setup git hook to run eslint before commit changes

```shell
make setup-git-hook
```

2. Install packages

```shell
npm ci
```

3. Run development server

```shell
npm run dev
```

4. Build development

```shell
npm run build:dev
```

5. Build production

```shell
npm run build:prod
```

### Setup VSCode Extensions

- Install these extensions for better support in vscode

```json
{
  "recommendations": ["editorconfig.editorconfig", "dbaeumer.vscode-eslint", "esbenp.prettier-vscode", "bradlc.vscode-tailwindcss", "Gruntfuggly.todo-tree", "ms-vscode.makefile-tools"]
}
```

- VSCode settings

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  },
  "eslint.codeActionsOnSave.rules": null,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Folder structures

```
├── environment.yml
├── next.config.js
├── package.json
├── postcss.config.js
├── public
├── src
│   ├── app
│   ├── components
│   ├── configs
│   │   ├── index.ts
│   ├── data
│   │   ├── country-code.json
│   │   └── regions-to-contries.json
│   ├── hooks
│   │   └── use-custom-form.ts
│   ├── index.d.ts
│   ├── models
│   ├── recoil
│   │   └── store.ts
│   ├── routes.ts
│   ├── styles
│   │   ├── globals.scss
│   │   └── modules
│   └── utils
│       ├── helper.ts
│       └── platform-detector.ts
├── tailwind.config.js
```

## Usage

### Environment

- File: `environtment.yml`
- Define public env variables here.
- It will automatic generate .env.\* file depends on what environment is: `development` or `production`
- Default setup:

```shell
  # generate .env.development
  npm run dev

  # generate .env.development
  npm run build:dev

  # generate .env.production
  npm run build:prod
```

```yml
development:
  NEXT_PUBLIC_ENV: 'development'
  NEXT_PUBLIC_API_BASE_URL: '***'

production:
  NEXT_PUBLIC_ENV: 'production'
  NEXT_PUBLIC_API_BASE_URL: '***'
```

### Common components

- Directory: `src/components/common`
- Add new common component in this directory which is use for others components.

### Custom Form

- Use [react-hook-form](https://react-hook-form.com/) to custom form in react app.
- Use [zod](https://zod.dev/) to define schema for validating input.
- Custom input directory: `src/components/form/`
- Custom hooks: `src/hooks/use-custom-form.ts`
- Read [this document](./src/components/form/DOCS.md) for more detail
- Simple example:

```tsx
import CustomForm from '@/components/form/index'
import TextInput from '@/components/form/text-input'

type Form = {
  phone: string
}

const schema = z.object({
  phone: z.string().refine((value) => isMatch(value, /^\d{3} \d{3} (\d{2}|\d{3}|\d{4})$/), { message: 'Please enter a valid mobile number' }),
  code: z.string().optional()
}) satisfies ZodType<Form>

<CustomForm schema={schema} onSubmit={handleSubmit} onError={handleFormError}>
  <>
    <TextInput name="phone" placeholder="000 000 0000" type="tel" />
    <Button label="Submit" type="submit" />
  </>
</CustomForm>
```

### Image

- Directory: `public/images`
- Icon should be svg or html svg

### Routes

- File: `/routes.ts`
- Should define route before create a new page.
- Get url from routes whenever use link in project.

```ts
export default {
  homePage: () => '/'
}
```

### Styling

- Use [tailwindcss](https://tailwindcss.com/), scss, css module
- Directory: `src/styles/`
- Every css code should be in here, **DO NOT** style css direct in the html code, exceptions for small custom space.
- Css module for components in directory `src/styles/modules`, create a css module files for each component,
- Css module for pages in directory `src/styles/modules/pages`, create a css module files for each page.
- Custom tailwind in `/src/styles/global.scss` and `tailwind.config.js`

### Store

- Directory: `src/recoil/store.ts`
- Example:

```ts
export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false
})
```

### Global configurations

- Directory: `src/configs/`
- Config global variables and metadata or every variable that use in multiple components.

## Git flow

### Under development

1. Create branch from branch `dev`, with prefix is `feature/[TASK-ID]` or `hotfix/[TASK-ID]`.
2. Create pull request and merge feature branch into `dev`.
3. Run `pipeline dev` to deploy on development site.

### Released

1. Create branch from branch `prod`, with prefix is `feature/[TASK-ID]` or `hotfix/[TASK-ID]`.
2. Merge feature branch into `dev` and run `pipeline dev` to deploy on development site.
3. When test done, everything work well, merge feature branch into `prod`.
4. Run `pipeline prod` to deploy on production site.
