#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const { inquirerPrompt } = require("./inquirer");
const { copyTemplate, checkMkdirExists } = require("./copy");
const { install } = require('./manager');

yargs.command(
  ['create', 'c'],
  '新建一个模板',
  function (yargs) {
    return yargs.option('name', {
      alias: 'n',
      demand: true,
      describe: '模板名称',
      type: 'string'
    })
  },
  function (argv) {
    inquirerPrompt(argv).then(answers => {
      const { name, type } = answers;
      const isMkdirExists = checkMkdirExists(
        path.resolve(process.cwd(),`./src/pages/${name}/index.js`)
      );
      if (isMkdirExists) {
        console.log(`${name}/index.js文件已经存在`)
      } else {
        copyTemplate(
          path.resolve(__dirname, `./template/${type}/index.tpl`),
          path.resolve(process.cwd(), `./src/pages/${name}/index.js`),
          {
            name,
          }
        )
        install(process.cwd(), answers);
      }
    })
  }
).argv;