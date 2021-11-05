import { NextPage, GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import fs from 'fs'
import IsoFetch from 'isomorphic-unfetch'
import XMLParser from 'xml2js'
import { Feed } from 'feed'

export const getServerSideProps: GetServerSideProps = async ({ res }: GetServerSidePropsContext) => {
    // フィードのXMLを生成
    const xml = await generateFeedXml()

    res.statusCode = 200
    // 24時間キャッシュ
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
    res.setHeader('Content-Type', 'text/xml')
    res.end(xml)

    return {
        props: {}
    }
}

const generateFeedXml = async () => {
    // 登録済みサイト情報の取得
    const fileContents = fs.readFileSync(process.cwd() + '/public/data/sites', 'utf8')
    const siteArray = fileContents.split('\n')

    // 外部サイトのRSS取得
    const objArray: Array<object> = []
    for (let url of siteArray) {
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

    // dispIdを付加
    let dispId: number = 0
    items = items.map((item: { dispId: number }) => {
        item.dispId = ++dispId
        return item
    })

    // RSS feed生成
    const feed = new Feed({
        title: '2chまとめのアンテナ',
        description: '2chまとめサイトのアンテナサイトです。',
        id: process.env.WEBAPP_URL as string,
        link: process.env.WEBAPP_URL,
        language: 'ja',
        copyright: 'All rights reserved',
        updated: new Date()
    })
    items?.forEach((item: { title: any; updated: string | number | Date; dispId: number }) => {
        feed.addItem({
            title: item.title,
            date: new Date(item.updated),
            link: process.env.WEBAPP_URL + '?dispId=' + item.dispId
        })
    })

    return feed.rss2()
}

const getArticles = async (url: string) => {
    const xml = await fetchXML(url)
    const parsedXml = await XMLParser.parseStringPromise(xml).catch(null)
    const articles = parsedXml['rdf:RDF'].item.map((article: { [x: string]: { toString: () => any }[]; title: { toString: () => any }[] }) => {
        return {
            title: article.title.toString(),
            updated: article['dc:date'][0].toString()
        }
    })
    return articles
}

const fetchXML = async (url: string) => {
    const response = await IsoFetch(url)
    const xml = await response.text()
    return xml
}

const Page: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return data
}
export default Page
