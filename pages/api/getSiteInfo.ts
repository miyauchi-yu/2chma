import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Data = {
    siteInfo: object[]
}

const GetSiteInfo = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // サイト情報配列
    const siteInfoArray: Array<Object> = []
    
    // サイト情報ファイルが存在しない場合
    if (!fs.existsSync(process.cwd() + '/public/data/sites')) {
        res.status(200).json({ siteInfo: JSON.parse(JSON.stringify(siteInfoArray)) })
        res.status(200).end()
        return
    }

    // サイト情報ファイルの読み込み
    const fileContents = fs.readFileSync(process.cwd() + '/public/data/sites', 'utf8')
    const siteRowArray = fileContents.split('\n')

    // サイト情報ファイルが空ファイルの場合
    if (siteRowArray[0] === '') {
        res.status(200).json({ siteInfo: JSON.parse(JSON.stringify(siteInfoArray)) })
        res.status(200).end()
        return
    }

    // 値を詰め替え
    for (let siteRow of siteRowArray) {
        siteInfoArray.push({ siteRow })
    }

    res.status(200).json({ siteInfo: JSON.parse(JSON.stringify(siteInfoArray)) })
    res.status(200).end()
}

export default GetSiteInfo
