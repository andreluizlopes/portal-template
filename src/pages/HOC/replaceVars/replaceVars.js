import React from 'react'

function replaceVars (WrappedComponent) {
  const ReplaceVars = ({ document, ...props }) => {
    let newDocument = JSON.stringify(document)
    const vars = document.data.layout.data.vars || []

    vars.forEach((v, i) => {
      if (!v.name || !v.name.startsWith('__')) return null
      const re = new RegExp(`${v.name}`, 'gi')
      newDocument = newDocument.replace(re, vars[i].value || '')
    })
    document = JSON.parse(newDocument)

    return <WrappedComponent document={document} {...props} />
  }
  ReplaceVars.getInitialProps = WrappedComponent.getInitialProps

  return ReplaceVars
}

export default replaceVars
