import type { NextPage, GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Layout from './components/layout'
import React from 'react'
import IsoFetch from 'isomorphic-unfetch'
import XMLParser from 'xml2js'
import moment from 'moment'
import fs from 'fs'
import { v4 } from 'uuid'
import styles from '../styles/Home.module.css'

const { Box, Image, Link } = require('@chakra-ui/react')

const Home: NextPage = ({ items, reqDispId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Layout
            title="2chまとめのアンテナ"
            description="2chまとめサイトのアンテナサイトです。"
            flexFlg={true}
        >
            {React.Children.toArray(
                items.map((item: { link: string | undefined; image: string | undefined; title: string | undefined; dispId: string; url: string | undefined; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; updated: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
                    return (
                        <Box
                            key={item.dispId}
                            w="350px"
                            borderWidth="1px"
                            borderColor="silver"
                            borderRadius="lg"
                            margin="2"
                            overflow="hidden"
                        >
                            <Link href={item.link} isExternal>
                                <Box display="block" h="290px" bgColor="black" overflow="hidden">
                                    <Image src={item.image} className={styles.image_position} alt={item.title} title={item.title} />
                                </Box>
                            </Link>
                            <Box display="block" p="3" alignItems="baseline">
                                <Box
                                    mt="1"
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    color={(reqDispId === item.link) ? "red" : "black"}
                                    isTruncated
                                >
                                    <Link href={item.link} title={item.title} isExternal>{item.title}</Link>
                                </Box>
                                <Box color="gray.500" fontWeight="semibold" fontSize="xs">
                                    <Link href={item.url} isExternal>{item.name}</Link>
                                </Box>
                                <Box color="gray.500" fontSize="xs">
                                    {item.updated}
                                </Box>
                            </Box>
                        </Box>
                    )
                })
            )}
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    // 遷移元URLの取得
    let referer = context.req.headers.referer;
    if (referer === undefined) {
        referer = 'null'
    }

    // アクセス情報追加APIの呼び出し
    const result = await fetch(process.env.WEBAPP_URL + 'api/addAccessInfo?url=' + referer)

    // クエリパラメータのdispIdを取得
    let reqDispId = context.query.dispId
    if (reqDispId === undefined) {
        reqDispId = 'null'
    }

    // 登録済みサイト情報の取得
    const fileContents = fs.readFileSync('./public/data/sites', 'utf8')
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
    items = items.map((item: { dispId: string }) => {
        item.dispId = v4()
        return item
    })

    return {
        props: {
            items,
            reqDispId
        }
    }
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

export default Home
