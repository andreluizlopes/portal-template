import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import GlobalStyle from '../src/theme'
import StoryRouter from 'storybook-react-router'
import { GlobalState } from '../src/hooks/useGlobalState'

addDecorator(storyFn => (
  <>
    <GlobalState>
      <GlobalStyle />
      {storyFn()}
    </GlobalState>
  </>
))

addDecorator(StoryRouter())

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
});

