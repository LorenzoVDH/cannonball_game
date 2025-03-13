const graphCanvas = document.getElementById("graphCanvas")
const ctx = graphCanvas.getContext("2d")
const dataPoints = []
function computeRegression() {
  if (!dataPoints.length) return { slope: 0, intercept: 0 }
  let n = dataPoints.length, sumX = 0, sumY = 0, sumXY = 0, sumXX = 0
  dataPoints.forEach(({ cannonAngle, targetHeight }) => {
    sumX += cannonAngle
    sumY += targetHeight
    sumXY += cannonAngle * targetHeight
    sumXX += cannonAngle * cannonAngle
  })
  const initialSlope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1)
  const initialIntercept = (sumY - initialSlope * sumX) / n
  const residuals = dataPoints.map(({ cannonAngle, targetHeight }) =>
    Math.abs(targetHeight - (initialSlope * cannonAngle + initialIntercept))
  )
  const sortedResiduals = [...residuals].sort((a, b) => a - b)
  const medianResidual = sortedResiduals[Math.floor(sortedResiduals.length / 2)]
  const threshold = 2 * medianResidual
  const filteredPoints = dataPoints.filter(({ cannonAngle, targetHeight }) =>
    Math.abs(targetHeight - (initialSlope * cannonAngle + initialIntercept)) <= threshold
  )
  if (filteredPoints.length < 2) return { slope: initialSlope, intercept: initialIntercept }
  n = filteredPoints.length
  sumX = 0; sumY = 0; sumXY = 0; sumXX = 0
  filteredPoints.forEach(({ cannonAngle, targetHeight }) => {
    sumX += cannonAngle
    sumY += targetHeight
    sumXY += cannonAngle * targetHeight
    sumXX += cannonAngle * cannonAngle
  })
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1)
  const intercept = (sumY - slope * sumX) / n
  return { slope, intercept }
}
function drawGraph() {
  ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height)
  const left = 40, right = graphCanvas.width - 10, top = 10, bottom = graphCanvas.height - 20
  ctx.strokeStyle = "#000"
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(left, top); ctx.lineTo(left, bottom); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(left, bottom); ctx.lineTo(right, bottom); ctx.stroke()
  ctx.fillStyle = "#000"
  ctx.font = "12px sans-serif"
  ctx.fillText("Cannon Angle", right - 70, bottom + 15)
  ctx.save(); ctx.translate(15, top + 70); ctx.rotate(-Math.PI / 2); ctx.fillText("Shot Height", 0, 0); ctx.restore()
  const minX = 0, maxX = 135, minY = 0, maxY = 720
  const xScale = (right - left) / (maxX - minX)
  const yScale = (bottom - top) / (maxY - minY)
  ctx.fillStyle = "#00f"
  dataPoints.forEach(({ cannonAngle, targetHeight }) => {
    const x = left + (cannonAngle - minX) * xScale
    const y = bottom - (targetHeight - minY) * yScale
    ctx.beginPath(); ctx.arc(x, y, 3, 0, 2 * Math.PI); ctx.fill()
  })
  if (dataPoints.length > 1) {
    const { slope, intercept } = computeRegression()
    const x0 = minX, y0 = slope * x0 + intercept, x1 = maxX, y1 = slope * x1 + intercept
    const px0 = left + (x0 - minX) * xScale, py0 = bottom - (y0 - minY) * yScale
    const px1 = left + (x1 - minX) * xScale, py1 = bottom - (y1 - minY) * yScale
    ctx.strokeStyle = "#f00"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(px0, py0)
    ctx.lineTo(px1, py1)
    ctx.stroke()
  }
}
export function addDataPoint(cannonAngle, targetHeight) {
  dataPoints.push({ cannonAngle, targetHeight })
  drawGraph()
}
