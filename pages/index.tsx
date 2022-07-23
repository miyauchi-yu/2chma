import type { NextPage, GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
        redirect: {
            permanent: false,
            destination: (context.req.headers['user-agent']?.toString().match(/iPhone|Android.+Mobile/)) ? '/new' : '/home'
        }
    }
}

export default Index
