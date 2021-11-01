import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Box, Text } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

type Props = {
    children?: React.ReactNode
    title?: string
    description?: string
}

const Layout: NextPage<Props> = ({ children, title, description }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <Flex>
                <Box flex="1" maxW="100%" borderBottomWidth="1px" borderBottomColor="silver">
                    <Text fontSize="xl" margin="10px" fontWeight="bold">
                        <Link href="/">2chまとめのアンテナ</Link>
                    </Text>
                </Box>
            </Flex>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
                <nav>
                    <ul>
                        <li><Link href="/regist">サイト登録</Link></li>
                        <li><Link href="/feed">RSS</Link></li>
                    </ul>
                </nav>
            </footer>
        </>
    )
}

export default Layout
