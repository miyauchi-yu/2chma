import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Box, Image, Link } from '@chakra-ui/react'
import React from 'react'
import { ReactNode } from 'react'
import Layout from './components/layout'
import styles from '../styles/Home.module.css'

const Popular: NextPage = ({ items }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Layout
            title="人気記事ランキング | 2chまとめのアンテナ"
            description="2chまとめのアンテナの人気記事ランキングです。"
            flexFlg={true}
        >
            {items.map((item: {
                link: string | undefined;
                url: string | undefined;
                image: string | undefined;
                title: string | undefined;
                name: ReactNode;
                updated: ReactNode;
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
                            <Box color="gray.500" fontWeight="semibold" fontSize="xs">
                                <Link href={item.url}>{item.name}</Link>
                            </Box>
                            <Box color="gray.500" fontSize="xs">
                                {item.updated}
                            </Box>
                            <Box color="gray.500" fontSize="xs">
                                {item.count} アクセス
                            </Box>
                        </Box>
                    </Box>
                )
            })}
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    // 人気記事情報取得APIの呼び出し
    const apiResponse = await fetch(process.env.WEBAPP_URL + 'api/getPopularInfo')
    const popularInfo = await apiResponse.json()

    const items = popularInfo.popularRankingInfo
    return {
        props: {
            items
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

export default Popular
