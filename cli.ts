import fs from 'fs'
const qoa = require('qoa')

enum Select {
  CREATE_REPO = 'Create_Repo',
  DELETE_REPO = 'Delete_Repo',
}

const selectCli = async (msg: string, select: string[]): Promise<string> => {
  const interactive = {
    type: 'interactive',
    query: msg,
    handle: 'treat',
    symbol: '>',
    menu: select,
  }

  const selectResult = await qoa.prompt([interactive])
  return selectResult.treat
}

const writeCli = async (): Promise<string> => {
  const input = {
    type: 'input',
    query: 'Write file : ',
    handle: 'filename',
  }

  const writeResult = await qoa.input(input)
  return (<string>writeResult.filename).toLowerCase()
}

const init = async () => {
  const select = await selectCli('What Command ? ', [Select.CREATE_REPO, Select.DELETE_REPO])

  if (select === Select.CREATE_REPO) {
    const write = await writeCli()

    fs.mkdirSync(write)
    fs.mkdirSync(`${write}/src`)
    fs.writeFileSync(
      `${write}/tsconfig.app.json`,
      `{
          "extends": "../tsconfig.json",
          "compilerOptions": {
            "declaration": false,
            "outDir": "../dist/${write}"
          },
          "include": ["src/**/*"],
          "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
        }
        `,
      'utf-8'
    )

    console.log(`Create Repository ${write}`)
    return
  }

  if (select === Select.DELETE_REPO) {
    const exceptFile = [
      '.eslintrc.js',
      '.git',
      '.gitignore',
      '.prettierrc',
      'Makefile',
      'README.md',
      'babel.config.js',
      'cli.ts',
      'node_modules',
      'package-lock.json',
      'package.json',
      'tsconfig.json',
    ]
    const apiDir = fs.readdirSync('./', 'utf-8').filter((dir) => !exceptFile.includes(dir))
    const delFolder = await selectCli('Delete Repository ? ', apiDir)
    fs.rmdir(`./${delFolder}`, { recursive: true }, (err: any) => {
      if (err) throw new Error(err)
    })
    return
  }
}

;(async () => {
  await init()
})()
