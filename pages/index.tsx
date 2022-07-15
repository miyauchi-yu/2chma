import type { NextPage, GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

const Index: NextPage = ({ referer }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <Head>
                <title>2chまとめのアンテナ</title>
                <meta name="description" content="2chまとめサイトのアンテナサイトです。" />
                <meta httpEquiv="refresh" content="0;URL='/home'" />
            </Head>
        </>
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

    return {
        props: {
            referer
        }
    }
}

export default Index
