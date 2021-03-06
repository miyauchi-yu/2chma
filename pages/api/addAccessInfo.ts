import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Res = {
    success: number
}

const AddAccessInfo = (req: NextApiRequest, res: NextApiResponse<Res>) => {
    const url = req.query.url
    const data = url + '\n'

    // アクセス情報ファイルが存在しない場合
    if (!fs.existsSync(process.env.ROOT_DIR + 'tmp/access')) {
        // アクセス情報ファイルを作成
        fs.writeFileSync(process.env.ROOT_DIR + 'tmp/access', '')
        // ファイルパーミッションの変更
        fs.chmod(process.env.ROOT_DIR + 'tmp/access', 0o777, (err) => {
            if (err) throw err
        })
    }

    // アクセス情報ファイルへ書き込み
    fs.appendFileSync(process.env.ROOT_DIR + 'tmp/access', data)

    res.status(200).json({ success: 0 })
    res.status(200).end()
}

export default AddAccessInfo
