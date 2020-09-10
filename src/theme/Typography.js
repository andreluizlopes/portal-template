import { css } from 'styled-components'

const Typography = css`

  :root {
    --font-family-primary: 'Montserrat', sans-serif;

  }

  html, body, p, ul, ol, h1, h2, h3, h4 {
    font-family: var(--font-family-primary);
    font-weight: var(--be-font-weight-regular);
    color: var(--be-text-primary);
  }

  p, ul, ol, h1, h2, h3, h4 {
    margin-bottom: var(--be-spacing-layout-02);
  }

  strong, b {
    font-weight: var(--be-font-weight-semibold);
  }

  /* Default */
  h2 { font-size: var(--be-font-size-title2); }

  h3 { font-size: var(--be-font-size-title3); }

  h4 { font-size: var(--be-font-size-title4); }

  p {
    font-size: var(--be-font-size-body1);
    line-height: var(--be-line-height-body1);
  }

  ul, ol {
    list-style-position: inside;

    li {
      margin-bottom: var(--be-spacing-layout-01);
      line-height: var(--be-line-height-link3);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ul { list-style-type: disc; }

  ol { list-style-type: decimal; }

  a {
    color: var(--be-brand-primary);
    text-decoration: none;
    transition: color .2s ease;

    &:hover {
      color: inherit;
      color: var(--be-brand-highlight);
    }
  }

  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
`

export default Typography
