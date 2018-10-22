const program = require('commander');
const exec = require('shell-exec')
const exectSh = require('exec-sh');
program
    .version(1.0)
    .description('Node Testing Tool')
program
    .command('t <file> <type>')
    .description('Test a file with coverage + mocha')
    .action((file, type) => {
        console.log(`nyc --reporter=${type} mocha ` + file)
        exectSh(`nyc --reporter=${type} mocha ` + file, {
            cwd: "./"
        }, err => {
            if (err) {
                console.log("Exit code: ", err.code);
            }
        })
        if (type == 'html') {
            console.log('serve coverage')
            exectSh(`serve coverage`, res => {
                console.log(res)
            })
        }
    })
program.parse(process.argv)