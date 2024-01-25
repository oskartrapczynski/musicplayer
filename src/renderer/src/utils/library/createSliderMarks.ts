import { HOT_CUE_LABELS } from '@renderer/constants'

const createSliderMarks = (hotCues: (number | null)[]) => {
  const marks: { label: string; value: number }[] = []
  if (!hotCues) return undefined
  for (const [key, value] of hotCues.entries()) {
    if (!value) continue
    marks.push({ label: HOT_CUE_LABELS[key], value })
  }
  return marks.length ? marks : undefined
}

export default createSliderMarks
