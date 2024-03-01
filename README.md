# @rubakas/metrica-typus

> Text capsizing and whitespace trimming

Install the plugin from npm:

```
$ npm install @rubakas/metrica-typus
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'berkeley-mono': ['Berkeley Mono Variable', 'sans-serif'],
      },
      fontMetrics: {
        //...
        // get font metrics at https://seek-oss.github.io/capsize/
        'berkeley-mono': {
          capHeight: 680,
          ascent: 956,
          descent: -244,
          lineGap: 0,
          unitsPerEm: 1000,
          xHeight: 522,
          xWidthAvg: 600
        },
        //...
      }
    }
  },

  plugins: [
    // ...
    require('@rubakas/metrica-typus'),
    // ...
  ],
};
```

Now you are able to use utility classes:

`metrica-font-berkeley-mono` for `berkeley-mono` font in this example.

Font utility class unlocks features of Metrica Typus:
- Capsizing:
  use REM values
  `metrica-capsize-rem-[2]`
  or REM fractions
  `metrica-capsize-rem-[6/4]`
  or pixel integers
  `metrica-capsize-px-[24]`
  to set the desired capital letter size of your element.
- Same for line-height use
  `metrica-leading-rem-[4]`
  `metrica-leading-rem-[12/4]`
  `metrica-leading-px-[48]`

- Whitespace trimming
  use `metrica-trim` to trim whitespace


## Font metrics

Don't forget to add font-metric data to your tailwind config, use [capsize](https://seek-oss.github.io/capsize/) or [FontDrop](https://fontdrop.info/) to extract font metrics data.


## License

@rubakas/metrica-typus is licensed under the MIT License.

## Credits

Based on [capsize](https://github.com/seek-oss/capsize)

Created with [create-tailwind-plugin](https://github.com/Landish/create-tailwind-plugin).
