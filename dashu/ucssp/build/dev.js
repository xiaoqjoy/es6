const fs = require("fs");
const os = require("os");
const path = require("path");
const { exec } = require("child_process");
const prompts = require("prompts");

if (process.argv.length > 2) {
  let content = `
import routers from "./all.js";
export default routers;
`;
  fs.writeFile(path.resolve(__dirname, "../src/system/js/router/index.js"), content, (err) => {
    if (err) throw err;
  });
} else {
  fs.readFile(path.resolve(__dirname, "../src/system/js/router/all.js"), (err, data) => {
    let choices = [];
    let obj = {};
    let content = data.toString();
    let modules = content.match(/import.+?['"].+?['"]/g);
    modules.forEach((item) => {
      let matchs = item.match(/import\s(.+?)\s.+(['"].+?['"])/);
      if (matchs && matchs.length >= 2) {
        obj[matchs[1]] = matchs[2];
        choices.push({
          title: matchs[1],
          value: matchs[1]
        });
      }
    });
    choices.sort((a, b) => {
      let nameA = a.value.toUpperCase();
      let nameB = b.value.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    (async () => {
      const response = await prompts({
        type: 'multiselect',
        name: 'value',
        instructions: false,
        message: '请选择开发模块',
        choices,
        hint: '- 空格选择，回车确定'
      });
      if (response.value) {
        run(response.value);
      }
    })();
  });
}


const run = (devModules) => {
  fs.readFile(path.resolve(__dirname, "../src/system/js/router/all.js"), (err, data) => {
    let obj = {};
    let content = data.toString();
    let modules = content.match(/import.+?['"].+?['"]/g);
    modules.forEach((item) => {
      let matchs = item.match(/import\s(.+?)\s.+(['"].+?['"])/);
      if (matchs && matchs.length >= 2) {
        obj[matchs[1]] = matchs[2];
      }
    });
    let str = "import systemPage from '@system/system_page/js/router';\n";
    let childrens = ["systemPage"];
    devModules.forEach((item) => {
      str += `import ${item} from ${obj[item]};\n`;
      childrens.push(item);
    });
    let children = childrens.join(",\n    ");
    str += `
export default {
  name: 'system',
  path: '/system',
  component: resolve => require(['@system/index'], resolve),
  meta: { requireAuth: true },
  children: [
    ${children}
  ]
};
`;
    fs.writeFile(path.resolve(__dirname, "../src/system/js/router/module.js"), str, (err) => {
      if (err) throw err;
      let content = `
import routers from "./module.js";
export default routers;
`;
      fs.writeFile(path.resolve(__dirname, "../src/system/js/router/index.js"), content, (err) => {
        if (err) throw err;
        let command = "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js";
        if (os.platform() === "win32") {
          command = "start npx --node-arg=--max_old_space_size=4096 " + command;
        }
        let bat = exec(command, (err) => {
          if (err) throw err;
        });
        bat.stdout.on('data', (data) => {
          console.log(data);
        });
      });
    });
  });
}