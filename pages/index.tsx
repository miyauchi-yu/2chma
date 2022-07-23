import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { isMobile } from 'react-device-detect'
import Head from 'next/head'

const Index: NextPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <Head>
                <title>2chまとめのアンテナ</title>
                <meta name="description" content="2chまとめサイトのアンテナサイトです。" />
                {/* <meta httpEquiv="refresh" content="0;URL='/home'" /> */}
            </Head>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            permanent: false,
            destination: (isMobile) ? '/new' : '/home'
        }
    }
}

export default Index
