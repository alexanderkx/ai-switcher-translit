const config = require('./bin/config');

exports.getSwitch = function(str, settings) {
    let type = (settings && settings.hasOwnProperty('type')) ? settings.type : false;
    switch (type) {
        case "rueng":
            {
                config.default = config.dictionary.keys;
                break;
            }
        case "engru":
            {
                config.default = _flip(config.dictionary.keys);
                break;
            }
        case "translit":
            {
                config.default = config.dictionary.translit;
                break;
            }
        case "retranslit":
            {
                config.default = _flip(config.dictionary.translit);
                str = _fix(str);
                break;
            }
        case "custom":
            {
                config.custom = true;
                config.dictionary.retranslit = settings.input;
                str = _fix(str);
                break;
            }
        default:
            {
                config.default = _flip(config.dictionary.keys);
                break;
            }
    }
    let textToArray = str.split(''), result = [];
    if (!config.custom) {
        let obj = config.default;
        if (settings.input) {
            obj = Object.assign(obj, settings.input);
        }
        textToArray.forEach(function(sym, i) {
            if (obj.hasOwnProperty(textToArray[i])) {
                result.push(obj[textToArray[i]]);
            } else {
                result.push(sym);
            }
        });
        if (settings && settings.hasOwnProperty('normal') && settings.normal) {
            return _normalize(result.join(''));
        } else {
            return result.join('');
        }
    } else {
        return str;
    }
};

const _normalize = function(str) {
    str = str.replace(/(Ю\s|Б\s|Ь\s)/g, (s) => {
        return config.words[s];
    }).replace(/\s{2,}/g, ' ').trim();
    return str;
};

const _fix = function(str) {
    let obj = config.dictionary.retranslit;
    Object.keys(obj).map(function(key, v) {
        let reg = new RegExp('(' + key + ')', 'g');
        str = str.replace(reg, (s) => {
            return obj[s];
        })
    });
    return str;
};

const _flip = function(trans) {
    let key, tmp = {};
    for (key in trans) {
        tmp[trans[key]] = key;
    }
    return tmp;
};