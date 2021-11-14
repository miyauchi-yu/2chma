import type { NextPage } from 'next'
import Layout from './components/layout'
import { FormEvent } from 'react'

const {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button,
    Text,
    Link
} = require('@chakra-ui/react')

const Regist: NextPage = () => {
    return (
        <Layout
            title="サイト登録 | 2chまとめのアンテナ"
            description="2chまとめサイトのアンテナサイトです。"
        >
            <form method="POST" onSubmit={e => validateUrl(e)}>
                <FormControl id="rss_url">
                    <FormLabel>RSS URL</FormLabel>
                    <Input id="url" placeholder="https://～/index.rdf" size="md" />
                    <FormHelperText>※RSS 1.0に対応</FormHelperText>
                    <FormHelperText>※形式）<Text display="inline" color="red">https</Text>://～/index.rdf</FormHelperText>
                </FormControl><br />
                <Button type="submit" colorScheme="teal" size="sm">サイト登録</Button><br /><br />
                <Link href="/">戻る</Link>
            </form>
        </Layout>
    )
}

const validateUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
        url: { value: string }
    }
    const inputUrl = target.url.value

    // 未入力チェック
    if (inputUrl === '') {
        alert('URLを入力してください。')
        return false
    }

    // 形式チェック
    if (inputUrl.indexOf('index.rdf') === -1) {
        alert('RSS 1.0に対応していません。')
        return false
    }

    // プロトコルチェック
    if (inputUrl.indexOf('https') === -1) {
        alert('HTTPSに対応していません。')
        return false
    }

    // 重複チェック
    const response = await fetch('api/siteInfo')
    const siteInfo = await response.json()
    for (let url of siteInfo.sites) {
        if (url === inputUrl) {
            alert('すでに登録済みのURLです。')
            return false
        }
    }

    // URL登録
    const result = await fetch('api/addSiteInfo?url=' + inputUrl)
    const success = await result.json()
    if (success.success === 0) {
        alert('サイト登録が完了しました。')
    } else {
        alert('サイト登録に失敗しました。')
    }

}

export default Regist
