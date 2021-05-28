import merge from 'deepmerge';
// use createSpaConfig for bundling a Single Page App
import { createSpaConfig } from '@open-wc/building-rollup';

import rollupPluginInjectProcessEnv from "rollup-plugin-inject-process-env";

// use createBasicConfig to do regular JS to JS bundling
// import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  // use the outputdir option to modify where files are output
  // outputDir: 'dist',

  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === 'true',

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
});

const name = 'rollup-plugin-inject-process-env';

// The virtual id for our shared "process" mock.
// We prefix it with \0 so that other plugins ignore it
// rollup.config.js
// The virtual id for our shared "process" mock. We prefix it with \0 so that other plugins ignore it
const INJECT_PROCESS_MODULE_ID = `\0${ name }`;

export default merge(baseConfig, {
  // if you use createSpaConfig, you can use your index.html as entrypoint,
  // any <script type="module"> inside will be bundled by rollup
  input: './index.html',

  // alternatively, you can use your JS as entrypoint for rollup and
  // optionally set a HTML template manually
  // input: './app.js',
  plugins: [
    //rollupPluginInjectProcessEnv(process.env)

    /*
    {
      name,
      // eslint-disable-next-line consistent-return
      resolveId(id) {
        console.log(id);
        // this tells Rollup not to try to resolve imports from our virtual id
        if (id === INJECT_PROCESS_MODULE_ID) {
          return INJECT_PROCESS_MODULE_ID;
        }
      },
      // eslint-disable-next-line consistent-return
      load(id) {
        console.log(id);
        if (id === INJECT_PROCESS_MODULE_ID) {
          // All fields of 'process' we want to mock are top level exports of the module.
          // For now I hardcoded "NODE_ENV" but you probably want to put more logic here.
          return `
            export const env = {NODE_ENV: 'production'};\n
          `
        }
      },
      // eslint-disable-next-line consistent-return
      transform(code, id) {
        console.log(code, id);
        // Each module except our virtual module gets the process mock injected.
        // Tree-shaking will make sure the import is removed from most modules later.
        // This will produce invalid code if a module defines a top-level "process" variable, so beware!
        if (id !== INJECT_PROCESS_MODULE_ID) {
          return `import * as process from '${INJECT_PROCESS_MODULE_ID}';\n${code}`;
        }
      }
    }

     */


  ],
});

