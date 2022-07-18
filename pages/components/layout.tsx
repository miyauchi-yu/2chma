import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { Flex, Box, Text } from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'

//const { Flex, Box, Text } = require('@chakra-ui/react')

type Props = {
    children?: React.ReactNode
    title?: string
    description?: string
    flexFlg?: boolean
}

const Layout: NextPage<Props> = ({ children, title, description, flexFlg }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />
                <meta httpEquiv="Pragma" content="no-cache" />
                <meta httpEquiv="Cache-Control" content="no-cache" />
                <meta httpEquiv="Expires" content="0" />
                <meta name="google-site-verification" content="36nntOsoj0jgQ6EgddCRpI2nPG3g0AFHatMQJDVg3lg" />
                <script data-ad-client="ca-pub-8322818341292998" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <Flex>
                <Box flex="1" maxW="100%" borderBottomWidth="1px" borderBottomColor="silver">
                    <Text fontSize="xl" margin="10px" fontWeight="bold">
                        <Link href="/home">2chまとめのアンテナ</Link>
                    </Text>
                </Box>
            </Flex>

            <Box maxW="100%" align="center" marginTop="60px">
                <a href="https://twitter.com/2chma2021?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-size="large" data-lang="ja" data-show-count="true">Follow @2chma2021</a>
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </Box>

            <main className={(flexFlg) ? styles.main : styles.sub_main}>{children}</main>

            <footer className={styles.footer}>
                <nav>
                    <ul>
                        {/* <li><Link href="/regist">サイト登録</Link></li> */}
                        <li><Link href="/access">アクセスランキング</Link></li>
                        <li><Link href="/popular">人気記事ランキング</Link></li>
                        <li><Link href="/feed">RSS</Link></li>
                    </ul>
                </nav>
            </footer>
        </>
    )
}

export default Layout
