import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Res = {
    success: number
}

const AddPopularInfo = (req: NextApiRequest, res: NextApiResponse<Res>) => {
    const url = req.query.url
    const data = url + '\n'

    // 人気記事情報ファイルが存在しない場合
    if (!fs.existsSync(process.env.ROOT_DIR + 'tmp/popular')) {
        // 人気記事情報ファイルを作成
        fs.writeFileSync(process.env.ROOT_DIR + 'tmp/popular', '')
        // ファイルパーミッションの変更
        fs.chmod(process.env.ROOT_DIR + 'tmp/popular', 0o777, (err) => {
            if (err) throw err
        })
    }

    // 人気記事情報ファイルへ書き込み
    fs.appendFileSync(process.env.ROOT_DIR + 'tmp/popular', data)

    res.status(200).json({ success: 0 })
    res.status(200).end()
}

export default AddPopularInfo
