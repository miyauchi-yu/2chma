import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import XMLParser from 'xml2js'
import moment from 'moment'
import IsoFetch from 'isomorphic-unfetch'

type Data = {
    popularRankingInfo: object[]
}

type PopularRankingInfo = {
    url: string
    count: number
}

const GetPopularInfo = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // 人気記事ランキング情報配列
    const popularRankingInfoArray: Array<PopularRankingInfo> = []

    // 人気記事情報ファイルが存在しない場合
    if (!fs.existsSync(process.env.ROOT_DIR + 'tmp/popular')) {
        res.status(200).json({ popularRankingInfo: JSON.parse(JSON.stringify(popularRankingInfoArray)) })
        res.status(200).end()
    }
    
    // 人気記事情報ファイルの読み込み
    const fileContents1 = fs.readFileSync(process.env.ROOT_DIR + 'tmp/popular', 'utf8')
    const popularRowArray = fileContents1.split('\n')

    // 人気記事情報ファイルが空ファイルの場合
    if (popularRowArray[0] === '') {
        res.status(200).json({ popularRankingInfo: JSON.parse(JSON.stringify(popularRankingInfoArray)) })
        res.status(200).end()
    }

    // 重複削除
    const uniquePopularRowArray = popularRowArray.filter((val, index, self) => {
        return self.indexOf(val) === index
    })

    // カウント
    let count = 0
    for (let uniquePopularRow of uniquePopularRowArray) {
        for (let popularRow of popularRowArray) {
            if (popularRow === uniquePopularRow) {
                count++
            }
        }
        popularRankingInfoArray.push({ url: uniquePopularRow, count: count })
        count = 0
    }

    // 登録済みサイト情報の取得
    const fileContents2 = fs.readFileSync(process.cwd() + '/public/data/sites', 'utf8')
    const siteArray = fileContents2.split('\n')
    const objArray: Array<object> = []
    for (let url of siteArray) {
        const articles = await getArticles(url)
        articles.forEach((article: object) => {
            objArray.push(article)
        })
    }

    // カウント数を付与
    let items = JSON.parse(JSON.stringify(objArray))
    for (let popularRankingInfo of popularRankingInfoArray) {
        for (let item of items) {
            if (popularRankingInfo.url === item.link) {
                item.count = popularRankingInfo.count
            }
        }
    }

    // nullオブジェクトを排除
    items = items.filter((item: { count: number }) => {
        return item.count != null
    })

    // アクセス数の降順でソート
    items.sort((a: { count: number }, b: { count: number }) => {
        if (a.count < b.count) return 1
        if (a.count > b.count) return -1
        return 0
    })

    res.status(200).json({ popularRankingInfo: items })
    res.status(200).end()
}

const getArticles = async (url: string) => {
    const xml = await fetchXML(url)
    const parsedXml = await XMLParser.parseStringPromise(xml).catch(null)
    const articles = parsedXml['rdf:RDF'].item.map((article: { [x: string]: {}[]; title: { toString: () => any }[]; link: { toString: () => any }[] }) => {
        // 画像の取得
        const imageValue = article['content:encoded'][0].toString().match(/src="(.+)"/)
        let image = imageValue ? imageValue[1] : 'https://react.semantic-ui.com/images/wireframe/image.png'
        if (image.indexOf("\"") !== -1) {
            image = image.substring(0, image.indexOf("\""))
        }
        if (image.indexOf(".js") >= 1) {
            image = 'https://react.semantic-ui.com/images/wireframe/image.png'
        }

        // 日付のフォーマット
        let date = moment(article['dc:date'][0].toString()).format('YYYY/MM/DD HH:mm');

        return {
            title: article.title.toString(),
            link: article.link.toString(),
            updated: date,
            image: image,
            url: parsedXml['rdf:RDF'].channel[0].link[0],
            name: parsedXml['rdf:RDF'].channel[0].title[0]
        }
    })
    return articles
}

const fetchXML = async (url: string) => {
    const response = await IsoFetch(url)
    const xml = await response.text()
    return xml
}

export default GetPopularInfo
