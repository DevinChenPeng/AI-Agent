import useSinglePostSSEClient from '@renderer/hooks/useSinglePostSSEClient'
import SSEClient from '@renderer/utils/SSEClient'
import { useEffect, useRef, useState } from 'react'
// 定义返回值类型
type UseBaseHooksReturn = {
  connect: () => void
  connect2: () => void
  close: () => void
  markdown: string
  text: string
  setText: (text: string) => void
  listRef: React.RefObject<HTMLDivElement | null>
}
const PAGE_BROADCAST = (event): void => {
  console.log(event)
}
export const useBaseHooks = (): UseBaseHooksReturn => {
  const [markdown, setMarkdown] = useState('')
  const [text, setText] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)
  const pageSSEClient = useSinglePostSSEClient(
    'https://qa-tyxk.meosedge.com/meos-control-server-edge/server-event/sse/subscribe'
  )
  const chartSSEClient = useSinglePostSSEClient('http://localhost:1234/api/llm/chart')
  useEffect(() => {
    pageSSEClient?.addEventListener('PAGE_BROADCAST', PAGE_BROADCAST)
  }, [pageSSEClient])
  useEffect(() => {
    chartSSEClient?.addEventListener('message', event => {
      const data = event?.data
      console.log(data)
      if (data && typeof data === 'object' && 'message' in data) {
        const message = (data as Record<string, unknown>).message
        if (typeof message === 'string') {
          setMarkdown(prev => prev + message)
        }
      }
      listRef.current?.scrollTo(0, listRef.current.scrollHeight)
    })
  }, [chartSSEClient])
  const connect = (): void => {
    pageSSEClient?.setOptions({
      method: 'POST',
      data: [
        {
          subscribeType: 'AIR_CONDITIONING_COLD_SOURCE',
          projectId: 'Pj9522457558',
          instanceId: 'Pj9522457558',
          instanceType: 'PROJECT',
          claasCode2objectIds: {
            ACCCOF: [
              'Eq7480382824dff89c123e444690a633a6c6abc139e5',
              'Eq74803828245d802b78e41645aab131deb78f291466',
              'Eq74803828249892851a115d4c0b8e01c9f18358bdcd',
              'Eq7480382824e8cde29b0b5b43eebb052e6eab159d05',
              'Eq7480382824f7a1fb675c914ac8844de3d6db2b2ff7',
              'Eq7480382824fddffd792e66468596b037d2ad8a5f73',
              'Eq74803828244a03f75614bd491ab123205b625527e9',
              'Eq74803828244a03f75614bd491ab123205b625527e9',
              'Eq74803828245d802b78e41645aab131deb78f291466',
              'Eq74803828249892851a115d4c0b8e01c9f18358bdcd',
              'Eq7480382824dff89c123e444690a633a6c6abc139e5',
              'Eq7480382824e8cde29b0b5b43eebb052e6eab159d05',
              'Eq7480382824f7a1fb675c914ac8844de3d6db2b2ff7',
              'Eq7480382824fddffd792e66468596b037d2ad8a5f73'
            ],
            ACCCOP: [
              'Eq7480382824bba26923e2784ca7b57daeed6bd1d748',
              'Eq7480382824bc50d5852a9f45d297818ac36b9c26ba',
              'Eq7480382824bfec814b78ea4094871bcae675b7984d',
              'Eq748038282485f8c7a4c54f4dada46cf613a3ab592a',
              'Eq7480382824a2e95e8c2d574832894cba399266dda7'
            ],
            ACCCSC: ['Eq7480382824cd6e2ed36f6941d0bfebc0e6a3b2e621'],
            ACCCCC: [
              'Eq74803828246c33c16b804f4de4a431a7a8aaa048a5',
              'Eq7480382824bbf30fb411de49edb37d496d884cd2a6',
              'Eq74803828247411180c930f4dda8ef5ee31d231a956'
            ],
            ACCCCP: [
              'Eq74803828245c3ff94d5ca54cb9a0e98300f0818664',
              'Eq74803828248504e8db33fb457a8f03639a3823dd89',
              'Eq7480382824769fdd49dd794146ae100a5c196d2190',
              'Eq74803828242a116f39ffaf403e99829a50257afab7',
              'Eq74803828247b5bd18ac0e04f2d96c668c9bd4f88c2'
            ],
            ACGEDB: ['Eq748038282447c14bfe3d3b406d9ec6ce6ea452f44b'],
            ACGECL: ['Eq74803828246ef87cb4793e4f97bf44206c2b2b8ffe'],
            ACOTU: [
              'Eg9522457558bbe85ef0ddcf462abc2bb46092de8fa5',
              'Eg9522457558d3f69613f31b4d899c8042b2e7aaa951',
              'Eg952245755848a663ae84474bd29ba081196d4667ab',
              'Eg9522457558608013dd59064e01a65d22e7f79986cd',
              'Eg95224575587a47b1e86a904636a741d71cddfea018',
              'Eg95224575581a1299b5509741c18f249bc07780f86a',
              'Eg95224575588b31814eb5ea4a089f6e41f816a0e243'
            ],
            ACCCOT: [
              'Eq7480382824b33ab2c50277469884f1e66a59c33517',
              'Eq74803828245c5d7f80ad0442c8a07545529866731d',
              'Eq7480382824219f3a04cedd419aa40fa4ac5a84ab1e',
              'Eq7480382824add7ca662f7e4dd8ba68a744e668a20b',
              'Eq7480382824e7a9877c0852470bba82ec4bf15c4c06',
              'Eq7480382824f3268355aeac403e9cd8ee25613aba3e',
              'Eq748038282447bfb3fc8f2f491b94cb99f8c4d8f277',
              'Eq7480382824219f3a04cedd419aa40fa4ac5a84ab1e',
              'Eq748038282447bfb3fc8f2f491b94cb99f8c4d8f277',
              'Eq74803828245c5d7f80ad0442c8a07545529866731d',
              'Eq7480382824add7ca662f7e4dd8ba68a744e668a20b',
              'Eq7480382824b33ab2c50277469884f1e66a59c33517',
              'Eq7480382824e7a9877c0852470bba82ec4bf15c4c06',
              'Eq7480382824f3268355aeac403e9cd8ee25613aba3e'
            ],
            WESSFL: [
              'Eq7480382824fb880db8d7b64fcbb8700e4693bbb218',
              'Eq9522457558bc11c492fe5e4372b9c4a93c691a6b38',
              'Eq7480382824742558308763494eb3efd1ebd0df587f',
              'Eq95224575585ae59ff561504b5994bbf543e0714c73',
              'Eq7480382824f901a8e865c04a2b85aa439bedfaee48',
              'Eq7480382824eaeba7256b7d470e96774d13581b6ed4',
              'Eq7480382824417566a71dea45f88ba45147dc8949fb',
              'Eq9522457558e69bbe620c0445bd96e87d7677ec8846',
              'Eq748038282492a70045c70e4ebaa7d53672218d60d0',
              'Eq748038282471609ac1952641c89e0d0e0e3a2ed7b1',
              'Eq7480382824e69ca107d3604c3e987a5f8919b27085',
              'Eq748038282409676e5030bf44349d0ab1e3604376d9',
              'Eq7480382824257296b2dd0845048ba2fb625e3684aa',
              'Eq7480382824c3bc14cf56854328b605c39724eb829e'
            ],
            WESSHS: ['Eq95224575580f49da92f7a34e5fb9159055c0cff475', 'Eq9522457558618d6e24053f45f99a13e5b226309b49'],
            WESSPM: [
              'Eq9522457558bf17623fa0e14bd78583ad25e58b3e76',
              'Eq9522457558712ea14ff9b24b94a975532f825dd4ee',
              'Eq9522457558cfd5b4bd88bc47f2b76b200e8c8681cb',
              'Eq9522457558bdfbd0cf03194b02aabef596029bb01d'
            ],
            WESSTP: ['Eq7480382824d00ebf18fb8943dca3a61bfa0c71be11', 'Eq7480382824bc1db5bc140849958c0119d0754cfe62'],
            ACVVEO: [
              'Eq9522457558c7cdfa44ec55404e908e8623f309775b',
              'Eq9522457558ce4aee6427bd4da0be11906b6c673a73',
              'Eq95224575580900db621d3e433eb9328fd209a3f879',
              'Eq95224575584dbeb546438147899a2b523a88c60b95',
              'Eq95224575585bcb8068947245118ebc0064a8c0a3bd',
              'Eq9522457558d973fe0e45ae4c3b83538cb737c059b4',
              'Eq9522457558acd1287be8ed4354b25a7487cb1ca6c0',
              'Eq95224575580900db621d3e433eb9328fd209a3f879',
              'Eq95224575584dbeb546438147899a2b523a88c60b95',
              'Eq95224575585bcb8068947245118ebc0064a8c0a3bd',
              'Eq9522457558acd1287be8ed4354b25a7487cb1ca6c0',
              'Eq9522457558c7cdfa44ec55404e908e8623f309775b',
              'Eq9522457558ce4aee6427bd4da0be11906b6c673a73',
              'Eq9522457558d973fe0e45ae4c3b83538cb737c059b4'
            ],
            ACAC: ['Sy95224575586450450ecf5a4178be59db37e4aee276']
          },
          eventParamMap: {
            CLOUD_IOT_DATA_CHANGE: {
              templateTypes: ['CUSTOM_IOT'],
              objectIdAndInfoCodes: {
                Eq7480382824dff89c123e444690a633a6c6abc139e5: [
                  'powerStatus',
                  'fanGear',
                  'onlineStatus',
                  'freq',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq74803828245d802b78e41645aab131deb78f291466: [
                  'powerStatus',
                  'fanGear',
                  'onlineStatus',
                  'freq',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq74803828249892851a115d4c0b8e01c9f18358bdcd: [
                  'powerStatus',
                  'fanGear',
                  'onlineStatus',
                  'freq',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq7480382824e8cde29b0b5b43eebb052e6eab159d05: [
                  'powerStatus',
                  'fanGear',
                  'onlineStatus',
                  'freq',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq7480382824f7a1fb675c914ac8844de3d6db2b2ff7: [
                  'powerStatus',
                  'fanGear',
                  'onlineStatus',
                  'freq',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq7480382824fddffd792e66468596b037d2ad8a5f73: [
                  'powerStatus',
                  'fanGear',
                  'onlineStatus',
                  'freq',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq74803828244a03f75614bd491ab123205b625527e9: [
                  'powerStatus',
                  'fanGear',
                  'onlineStatus',
                  'freq',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq7480382824bba26923e2784ca7b57daeed6bd1d748: [
                  'workFreq',
                  'onlineStatus',
                  'orderFailAlarm',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq7480382824bc50d5852a9f45d297818ac36b9c26ba: [
                  'workFreq',
                  'onlineStatus',
                  'orderFailAlarm',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq7480382824bfec814b78ea4094871bcae675b7984d: [
                  'workFreq',
                  'onlineStatus',
                  'orderFailAlarm',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq748038282485f8c7a4c54f4dada46cf613a3ab592a: [
                  'workFreq',
                  'onlineStatus',
                  'orderFailAlarm',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq7480382824a2e95e8c2d574832894cba399266dda7: [
                  'workFreq',
                  'onlineStatus',
                  'orderFailAlarm',
                  'faultStatus',
                  'runStatus',
                  'rcRunStatus'
                ],
                Eq7480382824cd6e2ed36f6941d0bfebc0e6a3b2e621: [
                  'coolP',
                  'condWaterOutPress',
                  'cOP',
                  'onlineStatus',
                  'condWaterInTemp',
                  'faultStatus',
                  'evapWaterInTemp',
                  'evapWaterOutPress',
                  'powerStatus',
                  'condWaterOutTemp',
                  'evapWaterOutTemp',
                  'chillWaterValveSwitch',
                  'orderFailAlarm',
                  'condWaterInPress',
                  'elecConsumP',
                  'coolWaterValveSwitch',
                  'iPLR',
                  'runStatus',
                  'evapWaterInPress',
                  'condPress',
                  'condTemp',
                  'condApproachTemp',
                  'lubeTemp',
                  'localAndManualStatus',
                  'localRemoteStatus',
                  'rcRunStatus'
                ],
                Eq74803828246c33c16b804f4de4a431a7a8aaa048a5: [
                  'coolP',
                  'condWaterOutPress',
                  'cOP',
                  'onlineStatus',
                  'condWaterInTemp',
                  'faultStatus',
                  'evapWaterInTemp',
                  'evapWaterOutPress',
                  'powerStatus',
                  'condWaterOutTemp',
                  'evapWaterOutTemp',
                  'chillWaterValveSwitch',
                  'orderFailAlarm',
                  'condWaterInPress',
                  'elecConsumP',
                  'coolWaterValveSwitch',
                  'iPLR',
                  'runStatus',
                  'evapWaterInPress',
                  'rcRunStatus'
                ],
                Eq7480382824bbf30fb411de49edb37d496d884cd2a6: [
                  'coolP',
                  'condWaterOutPress',
                  'cOP',
                  'onlineStatus',
                  'condWaterInTemp',
                  'faultStatus',
                  'evapWaterInTemp',
                  'evapWaterOutPress',
                  'powerStatus',
                  'condWaterOutTemp',
                  'evapWaterOutTemp',
                  'chillWaterValveSwitch',
                  'orderFailAlarm',
                  'condWaterInPress',
                  'elecConsumP',
                  'coolWaterValveSwitch',
                  'iPLR',
                  'runStatus',
                  'evapWaterInPress',
                  'rcRunStatus'
                ],
                Eq74803828247411180c930f4dda8ef5ee31d231a956: [
                  'coolP',
                  'condWaterOutPress',
                  'cOP',
                  'onlineStatus',
                  'condWaterInTemp',
                  'faultStatus',
                  'evapWaterInTemp',
                  'evapWaterOutPress',
                  'powerStatus',
                  'condWaterOutTemp',
                  'evapWaterOutTemp',
                  'chillWaterValveSwitch',
                  'orderFailAlarm',
                  'condWaterInPress',
                  'elecConsumP',
                  'coolWaterValveSwitch',
                  'iPLR',
                  'runStatus',
                  'evapWaterInPress',
                  'rcRunStatus'
                ],
                Eq74803828245c3ff94d5ca54cb9a0e98300f0818664: [
                  'head',
                  'powerStatus',
                  'workFreq',
                  'onlineStatus',
                  'i',
                  'orderFailAlarm',
                  'faultStatus',
                  'elecConsumP',
                  'runStatus',
                  'flow',
                  'rcRunStatus'
                ],
                Eq74803828248504e8db33fb457a8f03639a3823dd89: [
                  'head',
                  'powerStatus',
                  'workFreq',
                  'onlineStatus',
                  'i',
                  'orderFailAlarm',
                  'faultStatus',
                  'elecConsumP',
                  'runStatus',
                  'flow',
                  'rcRunStatus'
                ],
                Eq7480382824769fdd49dd794146ae100a5c196d2190: [
                  'head',
                  'powerStatus',
                  'workFreq',
                  'onlineStatus',
                  'i',
                  'orderFailAlarm',
                  'faultStatus',
                  'elecConsumP',
                  'runStatus',
                  'flow',
                  'rcRunStatus'
                ],
                Eq74803828242a116f39ffaf403e99829a50257afab7: [
                  'head',
                  'powerStatus',
                  'workFreq',
                  'onlineStatus',
                  'i',
                  'orderFailAlarm',
                  'faultStatus',
                  'elecConsumP',
                  'runStatus',
                  'flow',
                  'rcRunStatus'
                ],
                Eq74803828247b5bd18ac0e04f2d96c668c9bd4f88c2: [
                  'head',
                  'powerStatus',
                  'workFreq',
                  'onlineStatus',
                  'i',
                  'orderFailAlarm',
                  'faultStatus',
                  'elecConsumP',
                  'runStatus',
                  'flow',
                  'rcRunStatus'
                ],
                Eq748038282447c14bfe3d3b406d9ec6ce6ea452f44b: ['onlineStatus', 'tankPress', 'rcRunStatus'],
                Eq74803828246ef87cb4793e4f97bf44206c2b2b8ffe: ['onlineStatus', 'tankPress', 'rcRunStatus'],
                Eq7480382824fb880db8d7b64fcbb8700e4693bbb218: ['onlineStatus', 'rcRunStatus'],
                Eq9522457558bc11c492fe5e4372b9c4a93c691a6b38: ['onlineStatus', 'rcRunStatus'],
                Eq95224575580f49da92f7a34e5fb9159055c0cff475: ['onlineStatus', 'rcRunStatus'],
                Eq9522457558bf17623fa0e14bd78583ad25e58b3e76: ['onlineStatus', 'rcRunStatus'],
                Eq7480382824742558308763494eb3efd1ebd0df587f: ['onlineStatus', 'rcRunStatus'],
                Eq9522457558712ea14ff9b24b94a975532f825dd4ee: ['onlineStatus', 'rcRunStatus'],
                Eq7480382824d00ebf18fb8943dca3a61bfa0c71be11: ['onlineStatus', 'rcRunStatus'],
                Eq95224575585ae59ff561504b5994bbf543e0714c73: ['onlineStatus', 'rcRunStatus'],
                Eq9522457558618d6e24053f45f99a13e5b226309b49: ['onlineStatus', 'rcRunStatus'],
                Eq9522457558cfd5b4bd88bc47f2b76b200e8c8681cb: ['onlineStatus', 'rcRunStatus'],
                Eq7480382824bc1db5bc140849958c0119d0754cfe62: ['onlineStatus', 'rcRunStatus'],
                Eq7480382824f901a8e865c04a2b85aa439bedfaee48: ['onlineStatus', 'rcRunStatus'],
                Eq7480382824eaeba7256b7d470e96774d13581b6ed4: ['onlineStatus', 'rcRunStatus'],
                Eq9522457558c7cdfa44ec55404e908e8623f309775b: ['onlineStatus', 'switchStatus', 'rcRunStatus'],
                Eq9522457558ce4aee6427bd4da0be11906b6c673a73: ['onlineStatus', 'switchStatus', 'rcRunStatus'],
                Eq95224575580900db621d3e433eb9328fd209a3f879: ['onlineStatus', 'switchStatus', 'rcRunStatus'],
                Eq95224575584dbeb546438147899a2b523a88c60b95: ['onlineStatus', 'switchStatus', 'rcRunStatus'],
                Eq7480382824417566a71dea45f88ba45147dc8949fb: ['onlineStatus', 'rcRunStatus'],
                Eq95224575585bcb8068947245118ebc0064a8c0a3bd: ['onlineStatus', 'switchStatus', 'rcRunStatus'],
                Eq9522457558d973fe0e45ae4c3b83538cb737c059b4: ['onlineStatus', 'switchStatus', 'rcRunStatus'],
                Eq9522457558acd1287be8ed4354b25a7487cb1ca6c0: ['onlineStatus', 'switchStatus', 'rcRunStatus'],
                Eq9522457558e69bbe620c0445bd96e87d7677ec8846: ['onlineStatus', 'rcRunStatus'],
                Eq9522457558bdfbd0cf03194b02aabef596029bb01d: ['onlineStatus', 'rcRunStatus'],
                Eq748038282492a70045c70e4ebaa7d53672218d60d0: ['onlineStatus', 'rcRunStatus'],
                Eq748038282471609ac1952641c89e0d0e0e3a2ed7b1: ['onlineStatus', 'rcRunStatus'],
                Eq7480382824e69ca107d3604c3e987a5f8919b27085: ['onlineStatus', 'rcRunStatus'],
                Eq748038282409676e5030bf44349d0ab1e3604376d9: ['onlineStatus', 'rcRunStatus'],
                Eq7480382824257296b2dd0845048ba2fb625e3684aa: ['onlineStatus', 'rcRunStatus'],
                Eq7480382824c3bc14cf56854328b605c39724eb829e: ['onlineStatus', 'rcRunStatus'],
                Sy95224575586450450ecf5a4178be59db37e4aee276: ['currentOperatingMode']
              }
            }
          },
          eventType: ['IOT_DATA_CHANGE', 'CLOUD_IOT_DATA_CHANGE']
        }
      ],
      headers: {
        accept: 'text/event-stream',
        'group-code': 'TYXK',
        groupcode: 'TYXK',

        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJkZXZpY2VUeXBlIjoxLCJhdWQiOiJ5dXNodS1zYWFzLWNsaWVudCIsInN1YiI6Inl1c2h1LXVzZXIiLCJhY2NvdW50SWQiOiIxNTA5ODMyMjM3NjE3MTgwNjc0IiwiYWNjb3VudE5hbWUiOiIxODA4ODg4ODEwMCIsImFjY291bnRUeXBlIjoiMiIsImlzcyI6Inl1c2h1IiwianRpIjoiNTMyNjY5MDMtNWQ2Zi00MDUyLWJmNzYtMzQ2YTI2YTUzOTExIn0.wM1XXhdqjFxvkIu6xCEnlcINfzkvSEtEtLKlQtmdoKY'
      }
    })

    console.log(pageSSEClient)
  }
  const connect2 = (): void => {
    if (!text) {
      return
    }
    chartSSEClient?.setOptions({
      method: 'POST',
      data: {
        text
      }
    })
  }
  const close = (): void => {
    chartSSEClient?.close()
  }
  return { connect, connect2, markdown, close, text, setText, listRef }
}
