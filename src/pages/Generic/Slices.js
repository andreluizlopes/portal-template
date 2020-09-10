import React from 'react'

import CheckZipCode from '../../components/CheckZipCode'
import Tabs from '../../components/Tabs'
import Sitemap from '../../components/Sitemap'
import CardImage from '../../components/CardImage'
import ModalLead from '../../components/ModalLead'
import ModalZipCode from '../../components/ModalZipCode'

import {
  UIBase,
  Title,
  FeatureCard,
  TextBlock,
  Banner,
  BannerButton,
  CardPrice,
  CardText,
  HorizontalBar,
  Accordion,
  Table,
  Benefits,
  IconText,
  TextButton,
  Counter,
  HtmlBlock,
  MiniCards,
  InfoCard,
  Indexes,
  ModalContact,
  Box
} from '@escaletech/escale-components'

export default function ({ slices, provider, rating, ...props }) {
  return slices.map((slice, index) => {
    switch (slice.slice_type) {
      case 'heading':
        return <UIBase key={index} constrains={895} component={Title} primary={slice.primary} />
      case 'banner':
        return (
          <UIBase
            key={index}
            component={Banner}
            image={slice.primary.image}
            title={slice.primary.title}
            description={slice.primary.description}
            pricetitle={slice.primary.pricetitle}
            pricevalue={slice.primary.pricevalue}
            periodicity={slice.primary.periodicity}
            pricecaption={slice.primary.pricecaption}
            attribute={slice.primary.attribute}
            cta={slice.primary.cta}
            ctalink={slice.primary.ctalink}
            ctacolor={slice.primary.ctacolor}
            color={slice.primary.color}
            items={slice.items}
            horizontalMargin={0}
            marginTop={0}
            provider={provider}
          />)
      case 'bannerbutton':
        return <UIBase key={index} component={BannerButton} primary={slice.primary} items={slice.items} horizontalMargin={0} marginTop={0} />
      case 'text_block':
        return <UIBase key={index} constrains={895} component={TextBlock} primary={slice.primary} />
      case 'cards':
        return <UIBase key={index} constrains={1028} component={CardPrice} items={slice.items} primary={slice.primary} />
      case 'features':
        return <UIBase key={index} constrains={895} component={FeatureCard} items={slice.items} />
      case 'card_text':
        return <UIBase key={index} constrains={895} component={CardText} primary={slice.primary} items={slice.items} />
      case 'horizontal_bar':
        return <UIBase key={index} constrains={895} component={HorizontalBar} primary={slice.primary} />
      case 'check_availability':
        return <UIBase key={index} constrains component={CheckZipCode} horizontalMargin={0} marginTop={24} primary={slice.primary} provider={provider} />
      case 'accordion':
        return <UIBase key={index} constrains={895} component={Accordion} items={slice.items} primary={slice.primary} background='var(--be-bg-secondary)' />
      case 'table':
        return <UIBase key={index} constrains={895} component={Table} primary={slice.primary} />
      case 'tabs':
        return <UIBase key={index} constrains={895} component={Tabs} items={slice.items} primary={slice.primary} />
      case 'sitemap':
        return <UIBase key={index} constrains component={Sitemap} items={slice.items} />
      case 'benefits':
        return <UIBase key={index} constrains={895} component={Benefits} items={slice.items} primary={slice.primary} background='var(--be-bg-secondary)' />
      case 'icon_text':
        return <UIBase key={index} constrains={895} component={IconText} items={slice.items} primary={slice.primary} background='var(--be-bg-secondary)' />
      case 'textbutton':
        return <UIBase key={index} constrains={895} component={TextButton} items={slice.items} />
      case 'counter':
        return <UIBase key={index} constrains component={Counter} primary={slice.primary} items={slice.items} />
      case 'html_block':
        return <UIBase key={index} constrains={895} component={HtmlBlock} primary={slice.primary} />
      case 'mini_cards':
        return <UIBase key={index} constrains={895} component={MiniCards} items={slice.items} primary={slice.primary} />
      case 'infocard':
        return <UIBase key={index} constrains component={InfoCard} items={slice.items} />
      case 'image_card':
        return <UIBase key={index} constrains={1028} component={CardImage} items={slice.items} />
      case 'modal_zip_code':
        return <UIBase key={index} constrains horizontalMargin={0} component={ModalZipCode} provider={provider} primary={slice.primary} items={slice.items} />
      case 'indexes':
        return <UIBase key={index} constrains={1028} component={Indexes} items={slice.items} />
      case 'modal_lead':
        return <UIBase key={index} component={ModalLead} primary={slice.primary} items={slice.items} />
      case 'modalcontact':
        return <ModalContact key={index} items={slice.items} primary={slice.primary} />
      case 'mobile_box':
        return <UIBase key={index} component={Box} items={slice.items} />
      default:
        return null
    }
  })
}
