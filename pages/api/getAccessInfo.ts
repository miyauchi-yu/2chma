import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Data = {
    accessRankingInfo: object[]
}

const GetAccessInfo = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // アクセスランキング情報配列
    const accessRankingInfoArray: Array<object> = []

    // アクセス情報ファイルの読み込み
    const fileContents = fs.readFileSync('./public/data/access', 'utf8')
    const accessRowArray = fileContents.split('\n')

    // アクセス情報ファイルが空ファイルの場合
    if (accessRowArray[0] === '') {
        for (let i=0; i<20; i++) {
            accessRankingInfoArray.push({name: '-', count: 0})
        }
    } else {
        // Twitterカウント
        let twitterCount = 0
        // Googleカウント
        let googleCount = 0
        // Yahooカウント
        let yahooCount = 0
        // その他カウント
        let otherCount = 0
        for (let url of accessRowArray) {
            // Twitterアクセスカウント
            if (url.indexOf('t.co') !== -1 || url.indexOf('twitter') !== -1) {
                twitterCount++
            }
            // Googleアクセスカウント
            else if (url.indexOf('google') !== -1) {
                googleCount++
            }
            // Yahooアクセスカウント
            else if (url.indexOf('yahoo') !== -1) {
                yahooCount++
            }
            // 上記以外
            else {
                otherCount++
            }
        }

        if (twitterCount !== 0) {
            accessRankingInfoArray.push({name: 'Twitter', count: twitterCount})
        }
        if (googleCount !== 0) {
            accessRankingInfoArray.push({name: 'Google', count: googleCount})
        }
        if (yahooCount !== 0) {
            accessRankingInfoArray.push({name: 'Yahoo', count: yahooCount})
        }
        if (otherCount !== 0) {
            accessRankingInfoArray.push({name: 'その他', count: otherCount})
        }
        for (let i=accessRankingInfoArray.length; i<=20; i++) {
            accessRankingInfoArray.push({name: '-', count: 0})
        }
    }

    // アクセス数の降順でソート
    let items = JSON.parse(JSON.stringify(accessRankingInfoArray))
    items.sort((a: { count: number }, b: { count: number }) => {
        if (a.count < b.count) return 1
        if (a.count > b.count) return -1
        return 0
    })

    res.status(200).json({ accessRankingInfo: items })
    res.status(200).end()
}

export default GetAccessInfo
