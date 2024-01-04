import * as fs from "fs";

const dist_path = "./app/dist";
const popup_html_path = "./popup.html";


fs.readdir(dist_path, (err, files) => {
    if(err) {
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

})
