

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';



const path = require('path');
// const chalk = require('react-dev-utils/chalk');
// const fs = require('fs-extra');
const webpack = require('webpack');
const configFactory = require('../config/webpack.prod');
const paths = require('../config/paths');
// const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const { library } = require('webpack');
// const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
// const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
// const printBuildError = require('react-dev-utils/printBuildError');

// const measureFileSizesBeforeBuild =
//   FileSizeReporter.measureFileSizesBeforeBuild;
// const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
// const useYarn = fs.existsSync(paths.yarnLockFile);
// Generate configuration
const config = configFactory('production');

config.entry = [path.join(__dirname, '../src/components/video/index.tsx')];
// config.entry = [paths.videoIndexJs];
config.output = {
  filename: 'index.js',
  path: path.join(__dirname, '../lib'),
  libraryTarget:'umd',
  library:'Videocz',
  libraryExport:'default'
}

config.plugins = [config.plugins[5]];
// config.output.library = pkg.name;
// config.output.libraryTarget = 'umd';
config.mode = 'none'

config.externals = {
  'react': 'react',
  'react-dom': 'react-dom'
};


// config.externals = {
//   react: {
//     root: 'React',
//     commonjs2: 'react',
//     commonjs: 'react',
//     amd: 'react',
//   },
//   'react-dom': {
//     root: 'ReactDOM',
//     commonjs2: 'react-dom',
//     commonjs: 'react-dom',
//     amd: 'react-dom',
//   },
// };
lib();



// Create the production build and print the deployment instructions.
function lib() {
  // We used to support resolving modules according to `NODE_PATH`.
  // This now has been deprecated in favor of jsconfig/tsconfig.json
  // This lets you use absolute paths in imports inside large monorepos:
  if (process.env.NODE_PATH) {
    console.log(
      chalk.yellow(
        'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
      )
    );
    console.log();
  }

  console.log('Creating an optimized production build...');

  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        let errMessage = err.message;

        // Add additional information for postcss errors
        if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
          errMessage +=
            '\nCompileError: Begins at CSS selector ' +
            err['postcssNode'].selector;
        }

        messages = formatWebpackMessages({
          errors: [errMessage],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        );
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      // return resolve({
      //   stats,
      //   // previousFileSizes,
      //   warnings: messages.warnings,
      // });
    });
  });
}
