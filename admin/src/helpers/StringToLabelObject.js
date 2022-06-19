import { cloneElement } from 'react'

export const StringToLabelObject = ({ record, children, ...rest }) =>
  cloneElement(children, {
    record: { label: record },
    ...rest,
  });
