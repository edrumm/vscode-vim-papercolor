import * as fs from 'node:fs/promises';
import { resolve } from 'path';
import { dark, light, defaults } from './config.js';

const darkTheme = {
    name: 'PaperColor Dark',
    colors: {
        "editor.background": dark.background,
		"editor.foreground": dark.foreground,
		"activityBarBadge.background": defaults.activityBar,
		"sideBarTitle.foreground": defaults.sideBarFg
    },
    tokenColors: []
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
    fs.writeFile(resolve('themes', 'PaperColorLight.json'), JSON.stringify(lightTheme)),
    fs.writeFile(resolve('themes', 'PaperColorDark.json'), JSON.stringify(darkTheme)),
]).catch(err => console.error(err));
