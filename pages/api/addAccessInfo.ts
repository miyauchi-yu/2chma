import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Res = {
    success: number
}

const AddAccessInfo = (req: NextApiRequest, res: NextApiResponse<Res>) => {
    const url = req.query.url
    const data = url + '\n'

    // アクセス情報ファイルが存在しない場合
    //if (!fs.existsSync(process.cwd() + '/public/data/access')) {
    if (!fs.existsSync('/tmp/access')) {
        // アクセス情報ファイルを作成
        //fs.writeFileSync(process.cwd() + '/public/data/access', '')
        fs.writeFileSync('/tmp/access', '')
        // ファイルパーミッションの変更
        // fs.chmod(process.cwd() + '/public/data/access', 0o777, (err) => {
        //     if (err) throw err
        // })
        fs.chmod('/tmp/access', 0o777, (err) => {
            if (err) throw err
        })
    }

    // アクセス情報ファイルへ書き込み
    // fs.appendFileSync(process.cwd() + '/public/data/access', data)
    fs.appendFileSync('/tmp/access', data)

    res.status(200).json({ success: 0 })
    res.status(200).end()
}

export default AddAccessInfo
