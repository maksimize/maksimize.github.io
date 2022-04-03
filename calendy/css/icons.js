const fs = require('fs');
const flagsFolder = '../img/flags/';
const doodlesFolder = '../img/doodles/';

fs.readdir(flagsFolder, (err, files) => {
    files.forEach(file => {
        if (file != '.DS_Store') {
            let country = file.substring(0, file.length - 4);
            console.log(".flag-" + country + " {");
            console.log("   background-image: url('../img/flags/" + file + "');");
            console.log("}");
        }
    });
});

fs.readdir(flagsFolder, (err, files) => {
    files.forEach(fileX => {
        files.forEach(fileY => {
            if (fileX != '.DS_Store' && fileY != '.DS_Store') {
                let countryX = fileX.substring(0, fileX.length - 4);
                let countryY = fileY.substring(0, fileY.length - 4);

                console.log(".flag-" + countryX + "-" + countryY + ":before {");
                console.log("   background-image: url('../img/flags/" + fileX + "');");
                console.log("}");

                console.log(".flag-" + countryX + "-" + countryY + ":after {");
                console.log("   background-image: url('../img/flags/" + fileY + "');");
                console.log("}");
            }
        })
    });
});


// fs.readdir(doodlesFolder, (err, files) => {
//     files.forEach(file => {
//         if (file != '.DS_Store') {
//             let country = file.substring(0, file.length - 4);
//             console.log(".doodle-" + country + " {");
//             console.log("   background-image: url('../img/doodles/" + file + "');");
//             console.log("}");
//         }
//     });
// });