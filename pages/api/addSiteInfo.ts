import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Res = {
    success: number
}

const AddSiteInfo = (req: NextApiRequest, res: NextApiResponse<Res>) => {
    const url = req.query.url
    const data = '\n' + url
    fs.appendFileSync('./public/data/sites', data)
    res.status(200).json({ success: 0 })
}

export default AddSiteInfo
