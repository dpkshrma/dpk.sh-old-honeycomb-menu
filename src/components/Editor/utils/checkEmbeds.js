import videoUrlParser from 'js-video-url-parser/dist/jsVideoUrlParser.min'
import { Block } from '../constants'

export const checkCodeEmbeds = (text = '') => {
  const embedRegex = {
    codesandbox: [
      /(?:https?:\/\/)?codesandbox.io\/s\/([^/]+)/,
      /(?:https?:\/\/)?codesandbox.io\/embed\/([^/]+)/
    ],
    jsfiddle: [/(?:https?:\/\/)?jsfiddle.net\/([^/]+)\/([^/]+)/],
    codepen: [
      /(?:https?:\/\/)?codepen.io\/([^/]+)\/pen\/([^/]+)/,
      /(?:https?:\/\/)?codepen.io\/([^/]+)\/embed\/([^/]+)/
    ]
  }
  const embedUrl = {
    codesandbox: id => `https://codesandbox.io/embed/${id}`,
    jsfiddle: (userId, id) => `https://jsfiddle.net/${userId}/${id}/embedded`,
    codepen: (userId, id) =>
      `https://codepen.io/${userId}/embed/${id}/?theme-id=0&default-tab=html,result&embed-version=2`
    // githubGist: (handle, id) => `https://gist.github.com/${handle}/${id}`
  }

  let match, matchedProvider
  Object.entries(embedRegex).some(([provider, regexes]) => {
    regexes.some(regex => {
      match = text.match(regex)
      matchedProvider = provider
      return match !== null
    })
    return match !== null
  })

  if (match) {
    const [, ...matchGroups] = match
    const src = embedUrl[matchedProvider](...matchGroups)
    return {
      matched: true,
      blockType: Block.VIDEO,
      data: { src }
    }
  }
  return null
}

export const checkVideoEmbeds = text => {
  const SUPPORTED_PROVIDERS = ['youtube', 'vimeo', 'dailymotion', 'twitch']
  const SUPPORTED_MEDIA = ['video']
  const videoInfo = videoUrlParser.parse(text) || {}
  if (
    SUPPORTED_MEDIA.indexOf(videoInfo.mediaType) !== -1 &&
    SUPPORTED_PROVIDERS.indexOf(videoInfo.provider) !== -1
  ) {
    const src = videoUrlParser.create({ videoInfo, format: 'embed' })
    return {
      matched: true,
      blockType: Block.VIDEO,
      data: { src }
    }
  }
  return null
}

export const checkQnaEmbeds = (text = '') => {
  const SUPPORTED_SE_SITES = [
    'stackoverflow.com',
    'serverfault.com',
    'superuser.com',
    'askubuntu.com',
    'softwareengineering.stackexchange.com',
    'security.stackexchange.com',
    'apple.stackexchange.com',
    'graphicdesign.stackexchange.com',
    'ux.stackexchange.com',
    'unix.stackexchange.com',
    'cstheory.stackexchange.com',
    'cs.stackexchange.com',
    'dba.stackexchange.com',
    'codereview.stackexchange.com',
    'math.stackexchange.com',
    'android.stackexchange.com'
  ].join('|')
  const urlRegex = new RegExp(
    `(?:https?://)?(${SUPPORTED_SE_SITES})/q(?:uestions)?/([^/]+)`
  )
  const match = text.match(urlRegex)
  const [url, site] = match || []
  if (SUPPORTED_SE_SITES.indexOf(site) !== -1) {
    return {
      matched: true,
      blockType: Block.QNA,
      data: { url }
    }
  }
  return null
}

export default text => {
  const videoEmbeds = checkVideoEmbeds(text)
  if (videoEmbeds) return videoEmbeds

  const codeEmbeds = checkCodeEmbeds(text)
  if (codeEmbeds) return codeEmbeds

  const qnaEmbeds = checkQnaEmbeds(text)
  if (qnaEmbeds) return qnaEmbeds

  return { matched: false }
}
