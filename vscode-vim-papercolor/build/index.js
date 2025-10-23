import * as fs from 'node:fs/promises';
import { resolve } from 'path';
import { dark, light, defaults } from './config.js';

function darken(hColorValue, delta) {
    const r = parseInt(hColorValue.substring(1, 3), 16);
    const g = parseInt(hColorValue.substring(3, 5), 16);
    const b = parseInt(hColorValue.substring(5, 7), 16);
    const calc = c => {
        return Math.max(0, Math.floor(c * (1 - delta))).toString(16).padStart(2, "0");
    };
    return `#${calc(r)}${calc(g)}${calc(b)}`;
}

// https://macromates.com/manual/en/language_grammars
const darkTheme = {
    name: 'PaperColor Dark',
    colors: {
        "editor.background": dark.background,
		"editor.foreground": dark.foreground,
        "editorBracketHighlight.foreground1": dark.turquoise,
        "editorBracketHighlight.foreground2": darken(dark.turquoise, 0.1),
        "editorBracketHighlight.foreground3": dark.turquoise,
        "editorBracketHighlight.foreground4": darken(dark.turquoise, 0.1),
        "editorBracketHighlight.foreground5": dark.turquoise,
        "editorBracketHighlight.foreground6": darken(dark.turquoise, 0.1),
        "editorBracketHighlight.unexpectedBracket.foreground": dark.magenta,
		"activityBarBadge.background": defaults.activityBar,
		"sideBarTitle.foreground": defaults.sideBarFg
    },
    tokenColors: [
        {
            name: "Language", 
            scope: ["constant.language"], 
            settings: { foreground: light.khaki }  
        },
        { 
            name: "Number", 
            scope: ["constant.numeric"], 
            settings: { foreground: dark.pink }
        },
        { 
            name: "Comment",
            scope: ["comment", "string.quoted.triple", "punctuation.definition.comment"],
            settings: { foreground: light.khaki }
        },
        {
            name: "Invalid", 
            scope: ["invalid"], 
            settings: { foreground: dark.magenta }
        },
        {
            name: "Storage type", 
            scope: ["storage.type"], 
            settings: { foreground: dark.lightGreen }
        },
        {
            name: "Storage type, keyword, macro", 
            scope: ["storage.type.function.go", "storage.type.struct.c", "meta.preprocessor.macro.c", "keyword"], 
            settings: { foreground: dark.turquoise }
        },
        {
            name: "Operator, preprocessor", 
            scope: ["keyword.operator", "punctuation.separator.pointer-access.c", "meta.preprocessor.c"], 
            settings: { foreground: dark.blue }
        },
        {
            name: "Other, punctuation", 
            scope: ["keyword.other", "punctuation.terminator", "punctuation.accessor", "punctuation.other.period", "punctuation.separator"], 
            settings: { foreground: dark.turquoise }
        },
        {
            name: "Control", 
            scope: ["keyword.control", "punctuation.separator.colon.python"], 
            settings: { foreground: dark.lilac }
        },
        {
            name: "Python separator",
            scope: ["meta.function.python punctuation.section.function.begin.python"],
            settings: { foreground: dark.turquoise }
        },
        { 
            name: "String", 
            scope: [
                "string", 
                "constant.character", 
                "string.quoted.double", 
                "string.quoted.single", 
                "string.quoted.other.lt-gt.include.c"
            ], 
            settings: { foreground: dark.gold }
        },
        {
            name: "Storage modifier", 
            scope: ["storage.modifier"], 
            settings: { foreground: dark.orange }
        },
        {
            name: "Includes",
            scope: ["meta.preprocessor.include.c keyword.control.directive.include.c"],
            settings: { foreground: dark.green }
        }
    ]
};

const lightTheme = {
    name: 'PaperColor Light',
    colors: {
        "editor.background": light.background,
		"editor.foreground": light.foreground,
		"activityBarBadge.background": defaults.activityBar,
		"sideBarTitle.foreground": defaults.sideBarFg
    },
    tokenColors: []
};

Promise.all([
    fs.writeFile(resolve('themes', 'PaperColorLight.json'), JSON.stringify(lightTheme, null, '\t')),
    fs.writeFile(resolve('themes', 'PaperColorDark.json'), JSON.stringify(darkTheme, null, '\t')),
]).catch(err => console.error(err));

console.log("complete");
