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
      fontFamily: {
        'berkeley-mono': [
          'Berkeley Mono Variable',
          'sans-serif'
        ],
      },
      fontMetrics: {
        'berkeley-mono': {
          capHeight: 680,
          ascent: 956,
          descent: -244,
          lineGap: 0,
          unitsPerEm: 1000,
          xHeight: 522,
          xWidthAvg: 600
        },
      }
    },
    corePlugins: true,
    plugins: [customPlugin],
  };

  return postcss(tailwindcss(merge(config, overrides)))
    .process('div { @apply metrica-font-berkeley-mono metrica-capsize-rem-[3/2] metrica-leading-rem-[4] metrica-trim; }', {
      from: `${path.resolve(__filename)}`,
    })
    .then(({ css }) => css);
}

test('utility classes can be generated', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
    div {
      --metrica-cap-height-trim: calc(
              (
                ( var(--metrica-precomputed-cap-height-trim-factor) )
                -
                (
                  (
                    (
                      var(--metrica-precomputed-line-height-scale)
                      *
                      var(--metrica-font-size-scale)
                    )
                    -
                    ( var(--metrica-line-height-unitless) )
                  )
                  /
                  2
                  /
                  ( var(--metrica-font-size-scale) )
                )
              )
              *
              (-1)
            );
      --metrica-baseline-trim: calc(
              (
                ( var(--metrica-precomputed-baseline-trim-factor) )
                -
                (
                  (
                    (
                      var(--metrica-precomputed-line-height-scale)
                      *
                      var(--metrica-font-size-scale)
                    )
                    -
                    ( var(--metrica-line-height-unitless) )
                  )
                  /
                  2
                  /
                  ( var(--metrica-font-size-scale) )
                )
              )
              *
              (-1)
            )
  }
  div::before {
      content: ' ';
      display: table;
      margin-bottom: calc(var(--metrica-cap-height-trim) * 1em)
  }
  div::after {
      content: ' ';
      display: table;
      margin-top: calc(var(--metrica-baseline-trim) * 1em)
  }
  div {
      font-family: Berkeley Mono Variable,sans-serif;
      --metrica-precomputed-cap-height-scale: 0.68;
      --metrica-precomputed-baseline-trim-factor: 0.244;
      --metrica-precomputed-cap-height-trim-factor: 0.276;
      --metrica-precomputed-line-height-scale: 1.2;
      --metrica-cap-size-unitless: 1.5;
      --metrica-size-unit: 1rem;
      --metrica-font-size-cap-scale: var(--metrica-cap-size-unitless) / var(--metrica-precomputed-cap-height-scale);
      --metrica-font-size-scale: var(--metrica-font-size-cap-scale);
      --metrica-font-size: calc( var(--metrica-font-size-scale) * var(--metrica-size-unit));
      font-size: var(--metrica-font-size);
      --metrica-line-height-unitless: 4;
      --metrica-height-unit: 1rem;
      line-height: calc( var(--metrica-line-height-unitless) * var(--metrica-height-unit))
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