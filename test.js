const path = require('path');
const merge = require('lodash/merge');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const customPlugin = require('./index.js');

expect.extend({
  toMatchCss: cssMatcher,
});

function generatePluginCss(overrides) {
  const config = {
    theme: {
      // Default options for your plugin.
      // rubakasMediaResponsum: {
      //    YOUR_PLUGIN_CUSTOM_OPTION: false,
      // },
    },
    corePlugins: true,
    plugins: [customPlugin],
  };

  return postcss(tailwindcss(merge(config, overrides)))
    .process('html { @apply visible tablet:invisible laptop:visible desktop:invisible desktop-4k:visible }', {
      from: `${path.resolve(__filename)}`,
    })
    .then(({ css }) => css);
}

test('utility classes can be generated', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`    
    html {
      visibility: visible
  }
  @media (min-width: 507px) and (min-height: 507px) {
      html {
          visibility: hidden
      }
  }
  @media (min-width: 1200px) {
      html {
          visibility: visible
      }
  }
  @media (min-width: 1537px) {
      html {
          visibility: hidden
      }
  }
  @media (min-width: 2049px) {
      html {
          visibility: visible
      }
  }
    `);
  });
});

// test('options can be customized', () => {
//   return generatePluginCss({
//     theme: {
//       rubakasMediaResponsum: {
//         YOUR_PLUGIN_CUSTOM_OPTION: true,
//       },
//     },
//   }).then(css => {
//     expect(css).toMatchCss(`    
//     .example-utility-class {
//       display: block
//     }
//     .custom-utility-class {
//       background-color: red
//     }
//     `);
//   });
// });