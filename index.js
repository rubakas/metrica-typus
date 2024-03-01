const plugin = require('tailwindcss/plugin')

import {
  computeCapHeightScale,
  computeXHeightScale,
  computeBaseLineTrimFactor,
  computeCapHeightTrimFactor,
  computeLineHeightScale,
  round
} from "./utils.js"

module.exports =
  // prefix: 'metrica-',
  // important: true,
  plugin(
    function({ addUtilities, matchUtilities, theme, variants }) {

      let utilities = {}

      let metricaSizedUtility = {
          ".metrica-sized": {
            "--metrica-font-size-cap-scale": "var(--metrica-cap-size-unitless) / var(--metrica-precomputed-cap-height-scale)",
            "--metrica-font-size-scale": "var(--metrica-font-size-cap-scale)",
            "--metrica-font-size": "calc( var(--metrica-font-size-scale) * var(--metrica-size-unit))",
            "font-size": "var(--metrica-font-size)"

          }
        }

      utilities = Object.assign(utilities, metricaSizedUtility)

      let trimUtility = {
        ".metrica-trim": {
          "--metrica-cap-height-trim" : `calc(
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
          )`,

          "--metrica-baseline-trim" : `calc(
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
          )`
        },
        ".metrica-trim::before" : {
          "content": "' '",
          "display": "table",
          "margin-bottom": "calc(var(--metrica-cap-height-trim) * 1em)"
        },
        ".metrica-trim::after" : {
          "content": "' '",
          "display": "table",
          "margin-top": "calc(var(--metrica-baseline-trim) * 1em)"
        },
      }

      utilities = Object.assign(utilities, trimUtility)


      Object.keys(theme('fontFamily'))
        .forEach((familyKey) => {

          let utilityKey = `.metrica-font-${familyKey}`;
          let metrics = theme('fontMetrics')[familyKey];
          // console.warn(familyKey, metrics)

          let buildFontFamilyUtility = (metrics) => {
            return {
              // arrays won't do here - concatenate them font-families!
              'fontFamily': theme('fontFamily')[familyKey].join(),
              '--metrica-precomputed-cap-height-scale':       round(computeCapHeightScale(metrics)),
              '--metrica-precomputed-baseline-trim-factor':   round(computeBaseLineTrimFactor(metrics)),
              '--metrica-precomputed-cap-height-trim-factor': round(computeCapHeightTrimFactor(metrics)),
              '--metrica-precomputed-line-height-scale':      round(computeLineHeightScale(metrics)),
            }
          }

          if(metrics == undefined) {
            return;
          } else {
            let utility = {
              [utilityKey] : buildFontFamilyUtility(metrics)
            }

            //merge with previous utilities
            utilities = Object.assign(utilities, utility)
          }
        })

      addUtilities(utilities)

      //TODO: extract -rem, -em, -px as variants?
      matchUtilities(
        {
          'metrica-capsize-rem': (value) => {
            return {
              '--metrica-cap-size-unitless': `${round(eval(value))}`,
              '--metrica-size-unit': '1rem',
              '@apply metrica-sized': {},
            }
          },

          'metrica-cap-size-px': (value) => {
            return {
              '--metrica-cap-size-unitless': `${round(eval(value))}`,
              '--metrica-size-unit': '1px',
              '@apply metrica-sized': {},
            }
          },

          'metrica-leading-rem': (value) => {
            return {
              '--metrica-line-height-unitless': `${round(eval(value))}`,
              '--metrica-height-unit': '1rem',
              'line-height': 'calc( var(--metrica-line-height-unitless) * var(--metrica-height-unit))'
            }
          },

          'metrica-leading-px': (value) => {
            return {
              '--metrica-line-height-unitless': `${round(eval(value))}`,
              '--metrica-height-unit': '1px',
              'line-height': 'calc( var(--metrica-line-height-unitless) * var(--metrica-height-unit))'
            }
          },

        }
      )
    }
  )