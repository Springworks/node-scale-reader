import program from 'commander';
import main from '../index';

const api = {

  run(process) {
    program
        .option('-F, --filename <path to file>', 'Path to file to read weight from')
        .option('-T, --target-url <url to PATCH endpoint>', 'Target URL')
        .parse(process.argv);

    console.log('');
    console.log('Reading weight from %s, sending changes to %s', program.filename, program.targetUrl);
    console.log('');

    main.run(program.filename, program.targetUrl);

    console.log('Waiting...');
  },

};

export default api;
