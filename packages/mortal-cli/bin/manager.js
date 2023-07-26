const path = require('path');
const { exec } = require('child_process');
const ora = require("ora");

const LibraryMap = {
  'Ant Design': 'antd',
  'iView': 'view-ui-plus',
  'Ant Design Vue': 'ant-design-vue',
  'Element': 'element-plus',
}

function install(cmdPath, options) {
  const { frame, library } = options;
  const command = `pnpm add ${frame} && pnpm add ${LibraryMap[library]}`
  return new Promise(function (resolve, reject) {
    const spinner = ora();
    spinner.start(
      `正在安装依赖，请稍等`
    );
    exec(
      command,
      {
        cwd: path.resolve(cmdPath),
      },
      function (error) {
        if (error) {
          reject();
          spinner.fail(`依赖安装失败`);
          return;
        }
        spinner.succeed(`依赖安装成功`);
        resolve()
      }
    )
  })
}

exports.install = install;
