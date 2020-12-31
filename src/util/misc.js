const chalk = require('chalk');
const green = chalk.rgb(66, 245, 150);
const orange = chalk.rgb(245, 176, 66);
const red = chalk.rgb(245, 66, 132);
const moment = require('moment-timezone');

function getTime() {
    return moment().tz('Asia/Seoul').locale('ko').format('ll dddd LTS');
}

function log(...texts) {
    console.log(chalk.yellow(`[${getTime()}]:     ${texts.join(' ')}`));
}

function changeCommandStringLength(str, limitLen = 8) {
    let tmp = str;
    limitLen -= tmp.length;

    for (let i = 0; i < limitLen; i++) {
        tmp += ' ';
    }

    return tmp;
}

global.log = log;
global.greenChalk = green;
global.orangeChalk = orange;
global.redChalk = red;
global.rlog = (...texts) => log(`${red(texts)}`);
global.glog = (...texts) => log(`${green(texts)}`);
global.olog = (...texts) => log(`${orange(texts)}`);

global.changeCommandStringLength = changeCommandStringLength;
global.helpTitle = changeCommandStringLength;