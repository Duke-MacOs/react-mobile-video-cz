import replace from '@rollup/plugin-replace';
import sass from 'rollup-plugin-sass';
import { terser as minify } from 'rollup-plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';

const peerDependencies = ["react", "react-dom"];
const dependencies = ["@babel/runtime", "classnames", "lodash.throttle", "prop-types","redux"];

function globals() {
  return {
    react: 'React',
    'react-dom': 'ReactDOM'
  };
}

function baseConfig() {
  return {
    input: 'src/components/video/index.tsx',
    plugins: [
			image(),
      sass({
        output: 'lib/video-react.css'
			}),
			
			nodeResolve(),
			// url({
			// 	limit: 10 * 1024, // inline files < 10k, copy files > 10k
  		// 	include: ["**/*.svg"], // defaults to .svg, .png, .jpg and .gif files
  		// 	emitFiles: true // defaults to true
			// }),
      commonjs({
				include: ['node_modules/**', 'src/**']
			}),
      typescript(),
      babel({
        babelrc: false,
        presets: [
          [
            '@babel/env',
            {
              loose: true,
              shippedProposals: true,
              modules: false,
              targets: {
                ie: 9
              }
            }
          ],
          '@babel/react'
        ]
      })
    ]
  };
}

function baseUmdConfig(minified) {
  const config = Object.assign(baseConfig(), {
    external: peerDependencies
  });
  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  );

  if (minified) {
    config.plugins.push(minify());
  }

  return config;
}

/*
  COMMONJS / MODULE CONFIG
  ------------------------

  Goal of this configuration is to generate bundles to be consumed by bundlers.
  This configuration is not minimized and will import all dependencies.
*/
const libConfig = baseConfig();
// Do not include any of the dependencies
libConfig.external = peerDependencies.concat(dependencies);
libConfig.output = [
  {
    sourcemap: true,
    name: 'video-react',
    file: 'lib/video-react.cjs.js',
    format: 'cjs'
  },
  {
    sourcemap: true,
    name: 'video-react',
    file: 'lib/video-react.es.js',
    format: 'es'
  }
];

/*
  UMD CONFIG
  ----------

  Goal of this configuration is to be directly included on web pages.
  This configuration is minimized and will include dependencies that are not
  marked as peer dependencies. ** See below

  Defining this config will also check that all peer dependencies are set up
  correctly in the globals entry.

  video-react has two versions:

  1) `video-react.min.js`
      This file excludes `redux` from
      the lib build where they need to be manually required if any
      application uses components that require these features.

  2) `video-react.full.min.js`
      This file includes all dependencies.

  For both versions the peer dependencies are always excluded and must be manually
  included - `react` and `react-dom`.

*/
const umdFullConfig = baseUmdConfig(false);
umdFullConfig.output = [
  {
    globals: globals(),
    sourcemap: true,
    name: 'video-react',
    file: 'lib/video-react.full.js',
    format: 'umd'
  }
];

// Validate globals in main UMD config
const missingGlobals = peerDependencies.filter(dep => !(dep in globals()));
if (missingGlobals.length) {
  console.error(
    'All peer dependencies need to be mentioned in globals, please update rollup.config.js.'
  );
  console.error(`Missing: ${missingGlobals.join(', ')}`);
  console.error('Aborting build.');
  process.exit(1);
}

const umdFullConfigMin = baseUmdConfig(true);
umdFullConfigMin.output = [
  {
    globals: globals(),
    sourcemap: true,
    name: 'video-react',
    file: 'lib/video-react.full.min.js',
    format: 'umd'
  }
];

const external = umdFullConfig.external.slice();
external.push('redux');

const allGlobals = Object.assign({}, globals(), {
  redux: 'Redux'
});

const umdConfig = baseUmdConfig(false);
umdConfig.external = external;
umdConfig.output = [
  {
    globals: allGlobals,
    sourcemap: true,
    name: 'video-react',
    file: 'lib/video-react.js',
    format: 'umd'
  }
];

const umdConfigMin = baseUmdConfig(true);
umdConfigMin.external = external;
umdConfigMin.output = [
  {
    globals: allGlobals,
    sourcemap: true,
    name: 'video-react',
    file: 'lib/video-react.min.js',
    format: 'umd'
  }
];

export default [
  libConfig,
  umdConfig,
  umdConfigMin
];
