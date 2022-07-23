import type { NextPage, GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Box, Image, Link, Flex, Text, List, ListItem, Spacer } from '@chakra-ui/react'
import Layout from './components/layout'
import React from 'react'
import { ReactNode } from 'react'
import styles from '../styles/Home.module.css'

//const { Box, Image, Link } = require('@chakra-ui/react')

const Home: NextPage = ({ items, items2, items3, reqDispId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Layout
            title="2chまとめのアンテナ"
            description="2chまとめサイトのアンテナサイトです。"
            flexFlg={true}
        >
            <Flex>
                <Box w="365px">
                    <Box maxW="100%" align="center">
                        <Text fontWeight="bold" fontSize="lg">人気記事</Text>
                    </Box>
                    {items2.map((item: {
                        link: string | undefined;
                        image: string | undefined;
                        title: string | undefined;
                        count: ReactNode
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
                                        color="black"
                                        isTruncated
                                    >
                                        <Link href={item.link} title={item.title} onClick={e => addPopularInfo(e)}>{item.title}</Link>
                                    </Box>
                                    <Box color="gray.500" fontSize="xs">
                                        {item.count} アクセス
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                <Box w="800px">
                    <Box maxW="100%" align="center">
                        <Text fontWeight="bold" fontSize="lg">最新記事</Text>
                    </Box>
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
                                maxW="100%"
                                borderWidth="1px"
                                borderColor="silver"
                                borderRadius="lg"
                                margin="2"
                                padding="2"
                                overflow="hidden"
                            >
                                <Flex>
                                    <Link href={item.link} onClick={e => addPopularInfo(e)}>
                                        <Box display="block" w="200px" h="140px" bgColor="black" overflow="hidden">
                                            <Image src={item.image} className={styles.image_position} alt={item.title} title={item.title} />
                                        </Box>
                                    </Link>
                                    <Box paddingLeft="3" alignItems="baseline" maxW="100%">
                                        <Box
                                            mt="1"
                                            fontWeight="semibold"
                                            as="h4"
                                            lineHeight="tight"
                                            color={(reqDispId === item.link) ? "red" : "black"}
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
                                </Flex>
                            </Box>
                        )
                    })}
                </Box>
                <Box w="365px">
                    <Box maxW="100%" align="center">
                        <Text fontWeight="bold" fontSize="lg">アクセスランキング</Text>
                    </Box>
                    <List margin="8px">
                        <ListItem
                            borderTop="1px solid silver"
                            borderLeft="1px solid silver"
                            borderRight="1px solid silver"
                        >
                            <Flex>
                                <Box bg="gold" w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                    <Text>1</Text>
                                </Box>
                                <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                    <Text>{items3[0].name}</Text>
                                </Box>
                                <Spacer />
                                <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                    <Text>{items3[0].count} アクセス</Text>
                                </Box>
                            </Flex>
                        </ListItem>
                        <ListItem
                            borderTop="1px solid silver"
                            borderLeft="1px solid silver"
                            borderRight="1px solid silver"
                        >
                            <Flex>
                                <Box bg="silver" w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                    <Text>2</Text>
                                </Box>
                                <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                    <Text>{items3[1].name}</Text>
                                </Box>
                                <Spacer />
                                <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                    <Text>{items3[1].count} アクセス</Text>
                                </Box>
                            </Flex>
                        </ListItem>
                        <ListItem
                            borderTop="1px solid silver"
                            borderLeft="1px solid silver"
                            borderRight="1px solid silver"
                        >
                            <Flex>
                                <Box bg="brown" w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                    <Text>3</Text>
                                </Box>
                                <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                    <Text>{items3[2].name}</Text>
                                </Box>
                                <Spacer />
                                <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                    <Text>{items3[2].count} アクセス</Text>
                                </Box>
                            </Flex>
                        </ListItem>
                        <ListItem
                            borderTop="1px solid silver"
                            borderLeft="1px solid silver"
                            borderRight="1px solid silver"
                            borderBottom="1px solid silver"
                        >
                            <Flex>
                                <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                    <Text>4</Text>
                                </Box>
                                <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                    <Text>{items3[3].name}</Text>
                                </Box>
                                <Spacer />
                                <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                    <Text>{items3[3].count} アクセス</Text>
                                </Box>
                            </Flex>
                        </ListItem>
                        {/* You can also use custom icons from react-icons */}
                    </List>
                    <Box padding="10px" align="center">
                        <a href="https://twitter.com/2chma2021?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-size="large" data-lang="ja" data-show-count="true">Follow @2chma2021</a>
                        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                    </Box>
                </Box>
            </Flex>
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

    // モバイルアクセスの場合、リダイレクト
    if (context.req.headers['user-agent']?.toString().match(/iPhone|Android.+Mobile/)) {
        return {
            redirect: {
                permanent: false,
                destination: '/new'
            }
        }
    }

    // RSS情報取得APIの呼び出し
    const apiGetRssInfoResponse = await fetch(process.env.WEBAPP_URL + 'api/getRssInfo')
    const rssInfo = await apiGetRssInfoResponse.json()
    const items = rssInfo.rssFeedInfo

    // 人気記事情報取得APIの呼び出し
    const apiGetPopularInfoResponse = await fetch(process.env.WEBAPP_URL + 'api/getPopularInfo')
    const popularInfo = await apiGetPopularInfoResponse.json()
    const items2 = popularInfo.popularRankingInfo

    // アクセス情報取得APIの呼び出し
    const apiGetAccessInfoResponse = await fetch(process.env.WEBAPP_URL + 'api/getAccessInfo')
    const accessInfo = await apiGetAccessInfoResponse.json()
    let items3: Array<object> = []
    for (let rankingInfoRow of accessInfo.accessRankingInfo) {
        items3.push(rankingInfoRow)
    }

    return {
        props: {
            items,
            items2,
            items3,
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
