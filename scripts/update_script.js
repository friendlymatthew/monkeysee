"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const dist_path = "./app/dist";
const popup_html_path = "./popup.html";
fs.readdir(dist_path, (err, files) => {
    if (err) {
        console.error("Unable to list directory: ", err);
        return;
    }
    const jsFile = files.find(file => file.endsWith(".js"));
    if (!jsFile) {
        console.error("Unable to find .js file");
        return;
    }
    const script_path = `./app/dist/${jsFile}`;
    fs.readFile(popup_html_path, 'utf-8', (err, popup_html) => {
        if (err) {
            console.error('Unable to read popup.html:', err);
            return;
        }
        const updated_html = popup_html.replace(/src=".*?"/, `src="${script_path}"`);
        fs.writeFile(popup_html_path, updated_html, err => {
            if (err) {
                console.error('Error writing to popup.html:', err);
                return;
            }
            console.log('Successfully updated popup.html with new script path:', script_path);
        });
    });
});
