import type { NextPage, GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Box, Image, Link } from '@chakra-ui/react'
import Layout from './components/layout'
import React from 'react'
import { ReactNode } from 'react'
import styles from '../styles/Home.module.css'

//const { Box, Image, Link } = require('@chakra-ui/react')

const Home: NextPage = ({ items, reqDispId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Layout
            title="2chまとめのアンテナ"
            description="2chまとめサイトのアンテナサイトです。"
            subTitle="最新記事"
            flexFlg={true}
        >
            {items.map((item: {
                link: string | undefined;
                url: string | undefined;
                image: string | undefined;
                title: string | undefined;
                name: ReactNode;
                updated: ReactNode
            }) => {
                return (
                    <Box
                        key={item.link}
                        w="350px"
                        borderWidth="1px"
                        borderColor="silver"
                        borderRadius="lg"
                        margin="2"
                        overflow="hidden"
                    >
                        <Link href={item.link} onClick={e => addPopularInfo(e)}>
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
                                <Link href={item.link} title={item.title} onClick={e => addPopularInfo(e)}>{item.title}</Link>
                            </Box>
                            <Box color="gray.500" fontWeight="semibold" fontSize="xs">
                                <Link href={item.url}>{item.name}</Link>
                            </Box>
                            <Box color="gray.500" fontSize="xs">
                                {item.updated}
                            </Box>
                        </Box>
                    </Box>
                )
            })}
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
    await fetch(process.env.WEBAPP_URL + 'api/addAccessInfo?url=' + referer)

    // クエリパラメータのdispIdを取得
    let reqDispId = context.query.dispId
    if (reqDispId === undefined) {
        reqDispId = 'null'
    }

    // RSS情報取得APIの呼び出し
    const apiResponse = await fetch(process.env.WEBAPP_URL + 'api/getRssInfo')
    const rssInfo = await apiResponse.json()

    const items = rssInfo.rssFeedInfo
    return {
        props: {
            items,
            reqDispId
        }
    }
}

const addPopularInfo = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const href = e.currentTarget.href

    // 人気記事情報追加APIの呼び出し
    await fetch('api/addPopularInfo?url=' + href)

    // 画面遷移
    window.location.href = href
}

export default Home
