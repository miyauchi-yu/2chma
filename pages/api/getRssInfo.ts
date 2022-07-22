import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import XMLParser from 'xml2js'
import moment from 'moment'
import IsoFetch from 'isomorphic-unfetch'

type Data = {
    rssFeedInfo: object[]
}

type RssFeedInfo = {
    title: string,
    link: string,
    updated: string,
    image: string,
    url: string,
    name: string
}

const GetRssInfo = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // RSS情報配列
    const rssFeedInfoArray: Array<RssFeedInfo> = []

    // サイト情報ファイルが存在しない場合
    if (!fs.existsSync(process.cwd() + '/public/data/sites')) {
        res.status(200).json({ rssFeedInfo: JSON.parse(JSON.stringify(rssFeedInfoArray)) })
        res.status(200).end()
        return
    }

    // サイト情報ファイルの読み込み
    const fileContents = fs.readFileSync(process.cwd() + '/public/data/sites', 'utf8')
    const siteRowArray = fileContents.split('\n')

    // サイト情報ファイルが空ファイルの場合
    if (siteRowArray[0] === '') {
        res.status(200).json({ rssFeedInfo: JSON.parse(JSON.stringify(rssFeedInfoArray)) })
        res.status(200).end()
        return
    }

    // 外部サイトのRSS取得
    const objArray: Array<object> = []
    for (let url of siteRowArray) {
        const articles = await getArticles(url)
        articles.forEach((article: object) => {
            objArray.push(article)
        })
    }

    // 日付で降順ソート
    let items = JSON.parse(JSON.stringify(objArray))
    items.sort((a: { updated: number }, b: { updated: number }) => {
        if (a.updated < b.updated) return 1
        if (a.updated > b.updated) return -1
        return 0
    })

    res.status(200).json({ rssFeedInfo: items })
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

export default GetRssInfo
