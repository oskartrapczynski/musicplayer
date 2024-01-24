const createSliderMarks = (hotCues: (number | null)[]) => {
  const labels = ['A', 'B', 'C', 'D']
  const marks: { label: string; value: number }[] = []
  for (const [key, value] of hotCues.entries()) {
    if (!value) continue
    marks.push({ label: labels[key], value })
  }
  return marks.length ? marks : undefined
}

export default createSliderMarks
