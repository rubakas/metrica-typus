export function round(value) {
	return parseFloat(value.toFixed(4)).toString()
}

export const computeCapHeightScale = (metrics) => {
  return  metrics.capHeight
          /
          metrics.unitsPerEm
}

export const computeLineHeightScale = (metrics) => {
  return  _contentArea(metrics)
          /
          metrics.unitsPerEm
}

export const computeCapHeightTrimFactor = (metrics) => {
  return  _ascentScale(metrics)
          -
          _capHeightScale(metrics)
          +
          (_lineGapScale(metrics) / 2 )
}

const _ascentScale = (metrics) => {
  return  metrics.ascent
          /
          metrics.unitsPerEm
}

const _capHeightScale = (metrics) => {
  return  metrics.capHeight
          /
          metrics.unitsPerEm
}

export const computeBaseLineTrimFactor = (metrics) => {
  return  _absoluteDescentScale(metrics)
          +
          (_lineGapScale(metrics) / 2)
}

const _absoluteDescentScale = (metrics) => {
  return  _absoluteDescent(metrics)
          /
          metrics.unitsPerEm
}

const _absoluteDescent = (metrics) => {
  return  Math.abs( metrics.descent )
}

const _lineGapScale = (metrics) => {
  return  metrics.lineGap
          /
          metrics.unitsPerEm
}

const _contentArea = (metrics) => {
  return  metrics.ascent
          +
          metrics.lineGap
          +
          _absoluteDescent(metrics)
}