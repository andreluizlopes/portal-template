import React from 'react'

import Rating from './Components/Ratings'
import SocialMedia from './Components/SocialMedia'
import ArticlesList from './Components/ArticlesList'
import FBComments from './Components/FbComments'
import UIBase from '../../components/UIBase'

const Relations = ({ relations, rating, articleList, constrains, uid }) =>
  <>
    { (relations.rating === 'true') && <UIBase constrains={constrains} component={Rating} rating={rating} uid={uid} /> }
    { (relations.social_media === 'true') && <UIBase constrains={constrains} component={SocialMedia} /> }
    { (relations.article_list === 'true') && articleList && <UIBase constrains={constrains} component={ArticlesList} items={articleList} /> }
    { (relations.fbcomments === 'true') && <UIBase constrains={constrains} component={FBComments} /> }
  </>

export default Relations
