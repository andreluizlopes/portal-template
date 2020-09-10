import { css } from 'styled-components'

const Button = css`
  .button {
    display: inline-block;
    min-width: 172px;
    height: 40px;
    padding: 8px 22px;
    font-size: var(--be-font-size-body1);
    font-weight: var(--be-font-weight-semibold);
    line-height: var(--be-line-height-body1);
    color: var(--be-text-secondary);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    background: var(--be-brand-secondary);
    border-radius: var(--be-shape-rounded);
    outline: none;
    transition: all 300ms ease 0s;
    appearance: none;

    &:hover {
      color: var(--be-text-secondary);
      filter: grayscale(20%);
    }

    &--secondary {
      color: var(--be-brand-primary);
      background: var(--be-brand-tertiary);

      &:hover {
        color: var(--be-brand-primary);
        filter: grayscale(20%);
      }
    }

    &--light {
      color: var(--be-brand-primary);
      background: var(--be-bg-secondary);
      border: 1px solid var(--be-brand-primary);

      &:hover {
        color: var(--be-text-secondary);
        background: var(--be-brand-secondary);
        filter: grayscale(20%);
      }
    }

    &--large {
      height: 48px;
    }

    &[disabled] {
      pointer-events: none;
      cursor: none;
      background: #b4b4c4;
    }

    &.sky {
      color: #000;
    }

    &.oi {
      color: #000;
    }

    &.nextel {
      color: var(--be-text-secondary);
    }
  }
`

export default Button
